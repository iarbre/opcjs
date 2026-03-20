import { Decoder } from "../codecs/decoder";
import { IOpcType } from "../types/iOpcType";
import { MsgBase } from "./messages/msgBase";
import { MsgTypeAbort } from "./messages/msgType.js";

/**
 * TransformStream that binary-decodes each raw-body {@link Uint8Array} into
 * the corresponding {@link IOpcType} using the supplied {@link Decoder}.
 *
 * Abort messages (MSG+A) carry a transport-level StatusCode+Reason payload,
 * not an OPC UA service response, so their bodies are passed through as-is
 * for the {@link SecureChannelFacade} to decode and report.
 *
 * Use this to separate the OPC UA service-decoding step from the secure-channel
 * framing step, keeping each stage composable:
 *
 * ```ts
 * bodyBytesReadable
 *   .pipeThrough(new BinaryDecoderTransform(config.decoder))
 *   .pipeTo(responseHandler.writable);
 * ```
 */
export class SecureChannelTypeDecoder extends TransformStream<MsgBase, MsgBase> {
  constructor(decoder: Decoder) {
    super({
      transform(msg, controller) {
        // Abort bodies are raw StatusCode+Reason bytes, not OPC UA service types.
        if (msg.header.msgType !== MsgTypeAbort) {
          msg.body = decoder.decode(msg.body as IOpcType, "binary")
        }
        controller.enqueue(msg)
      },
    })
  }
}
