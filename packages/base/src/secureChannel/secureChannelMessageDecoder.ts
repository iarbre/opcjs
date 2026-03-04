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
  MsgTypeOpenFinal,
} from "./messages/msgType";
import { SecureChannelContext } from "./secureChannelContext";

/**
 * Deframing transform for pipe use.
 *
 * Accepts raw OPC UA secure-conversation frame bytes, strips the message
 * framing, and emits decoded {@link DecodedFrame} objects.
 * Routing (pending request settlement vs. unsolicited) is the caller's
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

  private transform(
    data: Uint8Array,
    controller: TransformStreamDefaultController<MsgBase>,
  ): void {
    const buffer = new BinaryReader(data);
    const header = MsgHeader.decode(buffer);

    switch (header.msgType) {
      case MsgTypeOpenFinal: {
        this.logger.debug("SecureChannel received OpenFinal message");
        const secHeader = MsgSecurityHeaderAsymmetric.decode(buffer);
        const msgAsym = MsgAsymmetric.decode(
          buffer,
          header,
          secHeader,
          this.context.securityAlgorithm!,
        );
        controller.enqueue(msgAsym);
        break;
      }

      case MsgTypeAbort:
        this.logger.warn("Unimplemented Abort message");
        break;

      case MsgTypeChunk: {
        this.logger.debug("SecureChannel received Chunk message.");
        const secHeader = MsgSecurityHeaderSymmetric.decode(buffer);
        const msgSym = MsgSymmetric.decode(buffer, header, secHeader, this.context.securityAlgorithm!);

        controller.enqueue(msgSym);

        break;
      }

      case MsgTypeFinal: {
        this.logger.debug("SecureChannel received Final message");
        const secHeader = MsgSecurityHeaderSymmetric.decode(buffer);
        const msgSym = MsgSymmetric.decode(buffer, header, secHeader, this.context.securityAlgorithm!);

        controller.enqueue(msgSym);
        break;
      }

      case MsgTypeCloseFinal:
        this.logger.warn("Unimplemented  CloseFinal message. ");
        break;

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
