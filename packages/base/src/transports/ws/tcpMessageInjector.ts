import { getLogger } from "../../utils/logger/loggerProvider";

// Having a message injector allows us to send messages from outside the normal transform flow, which is necessary for the initial Hello message in the handshake, and also allows us to keep the handshake logic encapsulated within the TcpConnectionHandler instead of leaking it out to the client or secure channel facade.
export class TcpMessageInjector extends TransformStream<Uint8Array, Uint8Array> {
  private logger = getLogger("transport.TcpMessageInjector");
  private controller: TransformStreamDefaultController<Uint8Array> | null = null;

  constructor() {
    let savedController: TransformStreamDefaultController<Uint8Array>;
    super({
      start(controller) {
        savedController = controller;
      },
      transform(chunk, controller) {
        controller.enqueue(chunk);
      },
    });
    this.controller = savedController!;
  }

  public sendMessage(message: Uint8Array): void {
    if (this.controller === null) {
      throw new Error('TcpMessageInjector: stream controller is not available');
    }
    this.logger.trace(`Sending message of length ${message.byteLength} bytes`);
    this.controller.enqueue(message);
  }
}