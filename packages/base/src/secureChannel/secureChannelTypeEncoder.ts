import { Encoder } from "../codecs/encoder";
import { IOpcType } from "../types/iOpcType";
import { MsgBase } from "./messages/msgBase";

/**
 * TransformStream that binary-encodes each {@link IOpcType} chunk into a
 * {@link Uint8Array} using the supplied {@link Encoder}.
 *
 * Use this to separate the OPC UA service-encoding step from the secure-channel
 * framing step, keeping each stage composable:
 *
 * ```ts
 * requestStream
 *   .pipeThrough(new SecureChannelTypeEncoder(config.encoder))
 *   .pipeThrough(new SecureChannelFramingTransform(context))
 *   .pipeTo(wsSendable);
 * ```
 */
export class SecureChannelTypeEncoder extends TransformStream<MsgBase, MsgBase> {
  constructor(encoder: Encoder) {
    super({
      transform(msg, controller) {
        msg.body = encoder.encode(msg.body as IOpcType, "binary");
        controller.enqueue(msg);
      },
    });
  }
}
