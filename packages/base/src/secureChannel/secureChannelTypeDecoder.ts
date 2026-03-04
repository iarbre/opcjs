import { Decoder } from "../codecs/decoder";
import { IOpcType } from "../types/iOpcType";
import { MsgBase } from "./messages/msgBase";

/**
 * TransformStream that binary-decodes each raw-body {@link Uint8Array} into
 * the corresponding {@link IOpcType} using the supplied {@link Decoder}.
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
        msg.body = decoder.decode(msg.body as IOpcType, "binary");
        controller.enqueue(msg);
      },
    });
  }
}
