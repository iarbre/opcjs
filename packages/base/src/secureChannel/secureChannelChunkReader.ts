import { getLogger } from "../utils/logger/loggerProvider";
import { MsgBase } from "./messages/msgBase";
import {
  MsgTypeChunk,
  MsgTypeFinal,
  MsgTypeOpenChunk,
  MsgTypeOpenFinal,
} from "./messages/msgType";
import { SecureChannelContext } from "./secureChannelContext";

export class SecureChannelChunkReader extends TransformStream<MsgBase, MsgBase> {
  private logger = getLogger("secureChannel.SecureChannelChunkReader");

  private transform(
    msg: MsgBase,
    context: SecureChannelContext,
    controller: TransformStreamDefaultController<MsgBase>,
  ): void {
    const requestId = msg.sequenceHeader.requestId

    switch (msg.header.msgType) {
      case MsgTypeChunk:
      case MsgTypeOpenChunk: {
        this.logger.debug("Received Chunk message");
        // Buffer intermediate chunk bodies keyed by requestId.
        const chunks = context.chunkBuffers.get(requestId) ?? []
        chunks.push(msg.body as Uint8Array)
        context.chunkBuffers.set(requestId, chunks)
        break
      }

      case MsgTypeFinal:
      case MsgTypeOpenFinal: {
        this.logger.debug("Received Final message");
        // Reassemble any buffered intermediate chunks in FIFO order.
        const chunks = context.chunkBuffers.get(requestId)
        if (chunks && chunks.length > 0) {
          const finalBody = msg.body as Uint8Array
          const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0) + finalBody.byteLength
          const assembled = new Uint8Array(totalLength)
          let offset = 0
          for (const chunk of chunks) {
            assembled.set(chunk, offset)
            offset += chunk.byteLength
          }
          assembled.set(finalBody, offset)
          msg.body = assembled
          context.chunkBuffers.delete(requestId)
        }
        controller.enqueue(msg)
        break
      }

      default:
        controller.enqueue(msg)
        break
    }
  }

  constructor(context: SecureChannelContext) {
    super({
      transform: (data, controller) => this.transform(data, context, controller),
    })
  }
}
