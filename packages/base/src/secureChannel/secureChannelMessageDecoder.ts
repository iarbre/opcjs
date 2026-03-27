import { BinaryReader } from "../codecs/binary/binaryReader";
import { getLogger } from "../utils/logger/loggerProvider";
import { MsgAsymmetric } from "./messages/msgAsymmetric";
import { MsgBase } from "./messages/msgBase";
import { MsgHeader } from "./messages/msgHeader";
import { MsgSecurityHeaderAsymmetric } from "./messages/msgSecurityHeaderAsymmetric";
import { MsgSecurityHeaderSymmetric } from "./messages/msgSecurityHeaderSymmetric";
import { MsgSymmetric } from "./messages/msgSymmetric";
import {
  MsgTypeAbort,
  MsgTypeChunk,
  MsgTypeCloseFinal,
  MsgTypeFinal,
  MsgTypeOpenChunk,
  MsgTypeOpenFinal,
} from "./messages/msgType";
import { SecureChannelContext } from "./secureChannelContext";

/** Wrap-around threshold matching the outgoing counter in SecureChannelContext. */
const SEQ_WRAP_THRESHOLD = 0xFFFFFFFF - 1024
/** Valid range for the first sequence number after a wrap. */
const SEQ_WRAP_MAX = 1024

/**
 * Deframing transform for pipe use.
 *
 * Accepts raw OPC UA secure-conversation frame bytes, strips the message
 * framing, and emits decoded {@link MsgBase} objects.
 * Routing (pending request settlement vs. unsolicited) is the caller’s
 * responsibility — use {@link SecureChannelFacade} for that.
 *
 * ```ts
 * tcpReadable
 *   .pipeThrough(new SecureChannelDeframingTransform(context))
 *   .pipeTo(routerWritable);
 * ```
 */
export class SecureChannelMessageDecoder extends TransformStream<Uint8Array, MsgBase> {
  private logger = getLogger("secureChannel.SecureChannelMessageDecoder");

  /**
   * Validates that `sequenceNumber` is monotonically increasing from the
   * highest seen remote sequence.  Allows UInt32 wrap-around per token.
   *
   * Over TLS/WSS the transport already provides integrity and replay
   * protection, so small out-of-order deliveries (caused by multi-threaded
   * server writes) are tolerated with a warning rather than tearing down the
   * channel.  Only truly anomalous conditions (e.g. a very large backward
   * jump that could indicate corruption) are treated as errors.
   */
  private validateSequenceNumber(sequenceNumber: number, msgType: string): boolean {
    const last = this.context.lastRemoteSequenceNumber

    if (last === undefined) {
      // First received message — accept any starting value (non-ECC profiles).
      this.context.lastRemoteSequenceNumber = sequenceNumber
      this.logger.debug(`[${msgType}] Sequence number initialized to ${sequenceNumber}`)
      return true
    }

    const isWrap = last >= SEQ_WRAP_THRESHOLD && sequenceNumber < SEQ_WRAP_MAX

    if (isWrap) {
      this.context.lastRemoteSequenceNumber = sequenceNumber
      this.logger.debug(`[${msgType}] Sequence number wrapped: ${last} → ${sequenceNumber}`)
      return true
    }

    if (sequenceNumber === last + 1) {
      // Normal sequential increment — the common fast path.
      this.context.lastRemoteSequenceNumber = sequenceNumber
      this.logger.debug(`[${msgType}] Sequence number advanced: ${last} → ${sequenceNumber}`)
      return true
    }

    if (sequenceNumber > last + 1) {
      // Forward gap — the server skipped one or more numbers (e.g. cancelled
      // internal response, multi-threaded write reordering).  Accept, warn.
      this.logger.warn(`[${msgType}] Remote sequence number gap: expected ${last + 1}, got ${sequenceNumber} (skipped ${sequenceNumber - last - 1})`)
      this.context.lastRemoteSequenceNumber = sequenceNumber
      return true
    }

    // Backward / duplicate — likely out-of-order delivery from a multi-threaded
    // server.  Over TLS/WSS this is not a security concern.  Accept with a
    // warning but do NOT update the high-water mark so future messages are
    // still validated against the highest sequence seen.
    this.logger.warn(`[${msgType}] Out-of-order remote sequence number: highest seen ${last}, got ${sequenceNumber}`)
    return true
  }

  private transform(
    data: Uint8Array,
    controller: TransformStreamDefaultController<MsgBase>,
  ): void {
    const buffer = new BinaryReader(data);
    const header = MsgHeader.decode(buffer);

    switch (header.msgType) {
      case MsgTypeOpenFinal:
      case MsgTypeOpenChunk: {
        this.logger.debug("SecureChannel received OpenFinal/OpenChunk message");
        const secHeader = MsgSecurityHeaderAsymmetric.decode(buffer);
        const msgAsym = MsgAsymmetric.decode(
          buffer,
          header,
          secHeader,
          this.context.securityAlgorithm!,
        );
        // Per OPC UA Part 6 §6.7.2.4, a Renew continues the existing sequence
        // counter — only the initial Issue starts a fresh one.  The very first
        // OPN (Issue) is already handled because lastRemoteSequenceNumber starts
        // as undefined, so validateSequenceNumber accepts any starting value.
        if (!this.validateSequenceNumber(msgAsym.sequenceHeader.sequenceNumber, 'OPN')) return
        controller.enqueue(msgAsym);
        break;
      }

      case MsgTypeAbort: {
        // MSG+A: decrypt the body so the facade can read StatusCode + Reason.
        // The decoded body is passed through as raw bytes (not decoded as IOpcType).
        // Sequence number must still be validated and the counter updated so that
        // subsequent messages on the same channel are not incorrectly rejected.
        this.logger.warn("SecureChannel received Abort message");
        const secHeader = MsgSecurityHeaderSymmetric.decode(buffer);
        const msgSym = MsgSymmetric.decode(buffer, header, secHeader, this.context.securityAlgorithm!);
          if (!this.validateSequenceNumber(msgSym.sequenceHeader.sequenceNumber, 'MSG-A')) return
        controller.enqueue(msgSym);
        break;
      }

      case MsgTypeChunk: {
        this.logger.debug("SecureChannel received Chunk message.");
        const secHeader = MsgSecurityHeaderSymmetric.decode(buffer);
        const msgSym = MsgSymmetric.decode(buffer, header, secHeader, this.context.securityAlgorithm!);
          if (!this.validateSequenceNumber(msgSym.sequenceHeader.sequenceNumber, 'MSG-C')) return
        controller.enqueue(msgSym);
        break;
      }

      case MsgTypeFinal: {
        this.logger.debug("SecureChannel received Final message");
        const secHeader = MsgSecurityHeaderSymmetric.decode(buffer);
        const msgSym = MsgSymmetric.decode(buffer, header, secHeader, this.context.securityAlgorithm!);
          if (!this.validateSequenceNumber(msgSym.sequenceHeader.sequenceNumber, 'MSG-F')) return
        controller.enqueue(msgSym);
        break;
      }

      case MsgTypeCloseFinal: {
        this.logger.warn("SecureChannel received CloseFinal message.");
        const secHeader = MsgSecurityHeaderSymmetric.decode(buffer);
        const msgSym = MsgSymmetric.decode(buffer, header, secHeader, this.context.securityAlgorithm!);
        // Keep the sequence counter in sync even though CLO handling is not fully
        // implemented; without this, the next MSG would fail validation.
          this.validateSequenceNumber(msgSym.sequenceHeader.sequenceNumber, 'CLO-F');
        break;
      }

      default:
        this.logger.warn("SecureChannel received unknown message type:", header.msgType);
        break;
    }
  }

  constructor(private context: SecureChannelContext) {
    super({
      transform: (data, controller) => this.transform(data, controller),
    });
  }
}
