import { getLogger } from "../utils/logger/loggerProvider";
import { MsgBase } from "./messages/msgBase";
import {
  MsgTypeChunk,
  MsgTypeFinal,
} from "./messages/msgType";
import { SecureChannelContext } from "./secureChannelContext";

export class SecureChannelChunkReader extends TransformStream<MsgBase, MsgBase> {
    private logger = getLogger("secureChannel.SecureChannelChunkReader");

  private prependChunk(chunk: Uint8Array, body: Uint8Array): Uint8Array {
    const result = new Uint8Array(chunk.byteLength + body.byteLength);
    result.set(chunk, 0);
    result.set(body, chunk.byteLength);
    return result;
  }

  private transform(
    msg: MsgBase,
    context: SecureChannelContext,
    controller: TransformStreamDefaultController<MsgBase>,
  ): void {

    switch (msg.header.msgType) {
      
      case MsgTypeChunk: {
        this.logger.debug("Received Chunk message");
        context.chunkBuffers.push(msg.body as Uint8Array);
        break;
      }

      case MsgTypeFinal: {
        this.logger.debug("Received Final message");;


        while (context.chunkBuffers.length > 0) {
          const chunk = context.chunkBuffers.pop()!;
          msg.body = this.prependChunk(chunk, msg.body as Uint8Array);
        }
        controller.enqueue(msg);
        break;
      }

      default:
        controller.enqueue(msg);
        break;
    }
  }

  constructor(context: SecureChannelContext) {
    super({
      transform: (data, controller)=> this.transform(data, context, controller),
    });
  }
}
