import { BinaryReader } from "../../codecs/binary/binaryReader";
import { getLogger } from "../../utils/logger/loggerProvider";
import { MsgAck } from "../messages/msgAck";
import { MsgBase } from "../messages/msgBase";
import { MsgError } from "../messages/msgError";
import { MsgHeader } from "../messages/msgHeader";
import { MsgTypeAck, MsgTypeError, MsgTypeHello, MsgTypeReverseHello } from "../messages/msgTypes";

// Having a message injector allows us to send messages from outside the normal transform flow, which is necessary for the initial Hello message in the handshake, and also allows us to keep the handshake logic encapsulated within the TcpConnectionHandler instead of leaking it out to the client or secure channel facade.
export class TcpMessageDecoupler extends TransformStream<Uint8Array, Uint8Array> {
  private logger = getLogger("transport.TcpMessageDecoupler");

  private transform(chunk: Uint8Array, controller: TransformStreamDefaultController<Uint8Array>) {

    while (chunk.length > 0) {
      const reader = new BinaryReader(chunk);
      const header = MsgHeader.decode(reader);

      switch (header.messageType) {
        case MsgTypeAck:
          this.logger.debug("Received Acknowledge message from server.");
          this.onTcpMessage(MsgAck.decode(header, reader));
          break;

        case MsgTypeHello:
          // Pass Hello bytes through so a server-side TransformStream can handle
          // them; on the client this path is never reached in practice.
          this.logger.debug("Received Hello message, passing through to pipeline.");
          controller.enqueue(chunk.subarray(0, header.messageSize));
          break;

        case MsgTypeError:
          this.logger.debug("Received Error message from server.");
          this.onTcpMessage(MsgError.decode(header, reader));
          break;

        case MsgTypeReverseHello:
          this.logger.error("Unexpected ReverseHello message from server.");
          break;

        default:
          this.logger.debug(`Received message from server that will be passed downstream.`);
          controller.enqueue(chunk.subarray(0, header.messageSize));
          break;
      }

      chunk = chunk.subarray(header.messageSize);
    }
  }

  /** @param onTcpMessage Callback for TCP-level Ack/Error messages from the remote. */
  constructor(private onTcpMessage: (message: MsgBase) => void) {
    super({
      transform: (chunk, controller) => this.transform(chunk, controller),
    });
  }
}