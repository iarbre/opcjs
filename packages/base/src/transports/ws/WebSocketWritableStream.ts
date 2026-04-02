import { getLogger } from "../../utils/logger/loggerProvider";
import type { WebSocketLike } from "./webSocketLike";

// ─── Writable stream ──────────────────────────────────────────────────────────
export class WebSocketWritableStream extends WritableStream<Uint8Array> {
  private logger = getLogger("transport.WebSocketWritableStream");

  private sinkOnWrite(chunk: Uint8Array): void {
    this.ws.send(chunk);
    this.logger.trace(`WebSocket sent ${chunk.byteLength} bytes`);
  }

  private sinkOnClose() {
    this.logger.debug("WritableStream closed, closing WebSocket.");
    try { this.ws.close(); } catch { /* ignore */ }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private sinkOnAbort(reason: any) {
    this.logger.warn("WritableStream aborted:", reason);
    try { this.ws.close(); } catch { /* ignore */ }
  }

  constructor(private ws: WebSocketLike) {
    super({
      write: (chunk) => this.sinkOnWrite(chunk),
      close: () => this.sinkOnClose(),
      abort: (reason) => this.sinkOnAbort(reason),
    });
  }
}
