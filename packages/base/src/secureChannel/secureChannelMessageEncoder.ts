import { BinaryWriter } from "../codecs/binary/binaryWriter";
import { MsgBase } from "./messages/msgBase";
import { SecureChannelContext } from "./secureChannelContext";

/**
 * Framing-only transform for pipe use.
 *
 * Accepts a stream of pre-encoded binary body {@link Uint8Array}s, wraps each
 * in a symmetric OPC UA message frame, and emits the framed bytes.
 * Pipe the output directly to the wire transport.
 * No request/response correlation is performed — use {@link SecureChannelFacade}
 * for that. Pair with {@link BinaryEncoderTransform} upstream:
 *
 * ```ts
 * requestStream
 *   .pipeThrough(new SecureChannelTypeEncoder(config.encoder))
 *   .pipeThrough(new SecureChannelMesssageEncoder(context))
 *   .pipeTo(wsSendable);
 * ```
 */
export class SecureChannelMessageEncoder extends TransformStream<MsgBase, Uint8Array> {
  constructor(context: SecureChannelContext) {
    super({
      transform(msg, controller) {
       
        const msgEncoder = new BinaryWriter();
        msg.encode(msgEncoder, context.securityAlgorithm!);

        controller.enqueue(msgEncoder.getData());
      },
    });
  }
}
