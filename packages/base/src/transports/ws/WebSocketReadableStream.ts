import { getLogger } from "../../utils/logger/loggerProvider";
import type { WebSocketLike } from "./webSocketLike";

// ─── Readable stream ──────────────────────────────────────────────────────────
export class WebSocketReadableStream extends ReadableStream<Uint8Array> {
  private readonly ws: WebSocketLike;
  private readonly maxBufferedMessages: number;
  private readonly logger = getLogger("transport.WebSocketReadableStream");
  private buffer: Uint8Array[] = [];
  private closed = false;
  private errored: unknown = null;
  private notifyPull: (() => void) | null = null;

  private bufferPush(chunk: Uint8Array): void {
    if (this.buffer.length >= this.maxBufferedMessages) {
      this.errored = new Error("Inbound buffer overflow");
      this.cleanup();
      this.notifyPull?.();
      return;
    }
    this.buffer.push(chunk);
    this.notifyPull?.();
  }

  private cleanup(): void {
    this.ws.close();
  }

  private sourceOnPull(
    controller: ReadableStreamDefaultController<Uint8Array>
  ): void | Promise<void> {
    this.logger.trace("ReadableStream pull requested, buffer length =", this.buffer.length);
    if (this.errored) {
      controller.error(this.errored);
      this.cleanup();
      return;
    }

    const next = this.buffer.shift();
    if (next) {
      controller.enqueue(next);
      return;
    }

    if (this.closed) {
      controller.close();
      this.cleanup();
      return;
    }

    return new Promise<void>((resolve) => {
      this.notifyPull = () => {
        this.notifyPull = null;
        // Enqueue (or signal error/close) before resolving. This is critical: it
        // keeps [[pulling]] = true when controller.enqueue() runs, which causes
        // the stream to set [[pullAgain]] = true. When the promise then resolves,
        // [[pullAgain]] triggers another pull() call — without this the browser's
        // WHATWG ReadableStream never re-calls pull() and the pipeline deadlocks.
        if (this.errored) {
          controller.error(this.errored);
          this.cleanup();
        } else {
          const chunk = this.buffer.shift();
          if (chunk !== undefined) {
            controller.enqueue(chunk);
          } else if (this.closed) {
            controller.close();
            this.cleanup();
          }
        }
        resolve();
      };
    });
  }

  private sourceOnCancel(reason: unknown): void {
    this.logger.warn("ReadableStream cancelled:", reason);
    this.cleanup();
  }

  private wsOnMessage(data: Uint8Array): void {
      this.logger.trace("WebSocket received data of size", data.byteLength, "bytes");
      this.bufferPush(data);
    }

  constructor(ws: WebSocketLike, maxBufferedMessages: number) {
    super({
      pull: (controller) => this.sourceOnPull(controller),
      cancel: (reason) => this.sourceOnCancel(reason),
    });

    this.ws = ws;
    this.maxBufferedMessages = maxBufferedMessages;

    ws.setOnMessage(this.wsOnMessage.bind(this));

    ws.setOnError((e) => {
      this.errored = e;
      this.logger.error("WebSocket error observed:", e);
      this.notifyPull?.();
    });

    ws.setOnClose(() => {
      this.closed = true;
      this.logger.debug("WebSocket connection closed.");
      this.notifyPull?.();
    });
  }
}
