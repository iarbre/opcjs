import { BinaryWriter } from "../../codecs/binary/binaryWriter";
import { SecureChannelContext } from "../../secureChannel/secureChannelContext";
import { getLogger } from "../../utils/logger/loggerProvider";
import { MsgAck } from "../messages/msgAck";
import { MsgBase } from "../messages/msgBase";
import { MsgHello } from "../messages/msgHello";
import {
  MsgTypeAck,
  MsgTypeError,
} from "../messages/msgTypes";
import { TcpMessageInjector } from "./tcpMessageInjector";

export class TcpConnectionHandler {
  // Pending Hello/Acknowledge handshake resolver
  private connectResolve?: (success: boolean) => void;
  private logger = getLogger("transport.TcpConnectionHandler");

  // Byte accumulator for incomplete message fragments
  private buf = new Uint8Array(0);

  // ─── Handshake ─────────────────────────────────────────────────────────────

  /**
   * Sends the OPC UA Hello message over `wsSendable` and waits for the server
   * Acknowledge.  The WebSocket readable **must** already be piped into
   * `this.writable` before calling this method.
   *
   * @param endpointUrl  The OPC UA endpoint URL (e.g. `"opc.wss://host:4840/"`).
   * @param wsSendable   The writable side of the WebSocket duplex, used for
   *                     sending the Hello frame.
   * @returns `true` on a successful Acknowledge, `false` on a server Error.
   */
  async connect(
    endpointUrl: string
  ): Promise<boolean> {
    const connectionResolverPromise = new Promise<boolean>((resolve) => {
      this.connectResolve = resolve;
    });

    const msg = new MsgHello(
      0,
      this.context.maxSendBufferSize,
      this.context.maxRecvBufferSize,
      0,
      0,
      endpointUrl,
    );

    const bufferWriter = new BinaryWriter();
    msg.encode(bufferWriter);

    this.logger.debug(`Sending Hello message to ${endpointUrl}...`);
    await this.injector.sendMessage(bufferWriter.getData());

    return connectionResolverPromise;
  }

  public onTcpMessage(msg: MsgBase): void {

    switch (msg.header.messageType) {
      case MsgTypeAck:
        this.logger.debug(`Received Ack message during handshake. Resolving connect.`);
        this.context.maxSendBufferSize = Math.min(this.context.maxSendBufferSize, (msg as MsgAck).SendBufferSize);
        this.context.maxRecvBufferSize = Math.min(this.context.maxRecvBufferSize, (msg as MsgAck).ReceiveBufferSize);

        if (this.connectResolve) {
          this.connectResolve(true);
          this.connectResolve = undefined;
        }
        break;

      case MsgTypeError:
        this.logger.error("Error message received from server:", msg);
        if (this.connectResolve) {
          this.connectResolve(false);
          this.connectResolve = undefined;
        }
        break;

      default:
        this.logger.error(`Unexpected message type ${msg.header.messageType} during handshake.`);
    }
  }

  constructor(private injector: TcpMessageInjector,
    // todo: namespace mix. How to handle that the max buffer size comes from Ack and is used in SecureChannel?
    private context: SecureChannelContext) {
  }
}
