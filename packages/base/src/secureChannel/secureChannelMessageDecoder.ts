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
   * Validates that `sequenceNumber` is strictly increasing from the last
   * seen remote sequence.  Allows exactly one UInt32 wrap-around per token.
   * Returns false and logs an error if the number is a duplicate or out of order.
   */
  private validateSequenceNumber(sequenceNumber: number, msgType: string, controller: TransformStreamDefaultController<MsgBase>): boolean {
    const last = this.context.lastRemoteSequenceNumber

    if (last === undefined) {
      // First received message — accept any starting value (non-ECC profiles).
      this.context.lastRemoteSequenceNumber = sequenceNumber
      this.logger.debug(`[${msgType}] Sequence number initialized to ${sequenceNumber}`)
      return true
    }

    const isIncrement = sequenceNumber === last + 1
    const isWrap = last >= SEQ_WRAP_THRESHOLD && sequenceNumber < SEQ_WRAP_MAX

    if (!isIncrement && !isWrap) {
      this.logger.error(`[${msgType}] Invalid remote sequence number: expected ${last + 1}, got ${sequenceNumber}`)
      controller.error(new Error(`Invalid remote sequence number: expected ${last + 1}, got ${sequenceNumber}`))
      return false
    }

    this.logger.debug(`[${msgType}] Sequence number advanced: ${last} → ${sequenceNumber}`)
    this.context.lastRemoteSequenceNumber = sequenceNumber
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
        if (!this.validateSequenceNumber(msgAsym.sequenceHeader.sequenceNumber, 'OPN', controller)) return
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
          if (!this.validateSequenceNumber(msgSym.sequenceHeader.sequenceNumber, 'MSG-A', controller)) return
        controller.enqueue(msgSym);
        break;
      }

      case MsgTypeChunk: {
        this.logger.debug("SecureChannel received Chunk message.");
        const secHeader = MsgSecurityHeaderSymmetric.decode(buffer);
        const msgSym = MsgSymmetric.decode(buffer, header, secHeader, this.context.securityAlgorithm!);
          if (!this.validateSequenceNumber(msgSym.sequenceHeader.sequenceNumber, 'MSG-C', controller)) return
        controller.enqueue(msgSym);
        break;
      }

      case MsgTypeFinal: {
        this.logger.debug("SecureChannel received Final message");
        const secHeader = MsgSecurityHeaderSymmetric.decode(buffer);
        const msgSym = MsgSymmetric.decode(buffer, header, secHeader, this.context.securityAlgorithm!);
          if (!this.validateSequenceNumber(msgSym.sequenceHeader.sequenceNumber, 'MSG-F', controller)) return
        controller.enqueue(msgSym);
        break;
      }

      case MsgTypeCloseFinal: {
        this.logger.warn("SecureChannel received CloseFinal message.");
        const secHeader = MsgSecurityHeaderSymmetric.decode(buffer);
        const msgSym = MsgSymmetric.decode(buffer, header, secHeader, this.context.securityAlgorithm!);
        // Keep the sequence counter in sync even though CLO handling is not fully
        // implemented; without this, the next MSG would fail validation.
          this.validateSequenceNumber(msgSym.sequenceHeader.sequenceNumber, 'CLO-F', controller);
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
