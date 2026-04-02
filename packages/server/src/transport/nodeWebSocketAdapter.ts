import { getLogger } from 'opcjs-base'
import type { WebSocketLike } from 'opcjs-base'
import type { WebSocket as WsWebSocket, RawData } from 'ws'

/**
 * Adapts a Node.js `ws.WebSocket` to the {@link WebSocketLike} interface so
 * that the base-package {@link WebSocketReadableStream} and
 * {@link WebSocketWritableStream} can be reused on the server side without
 * modification.
 *
 * The `ws` package delivers messages as `Buffer | Buffer[] | ArrayBuffer`
 * depending on the `binaryType` option; this adapter normalises all variants
 * to a plain `Uint8Array` before calling the registered handler.
 */
export class NodeWebSocketAdapter implements WebSocketLike {
  private readonly logger = getLogger('transport.NodeWebSocketAdapter')

  send(data: Uint8Array): void {
    this.logger.trace(`Sending ${data.byteLength} bytes`)
    this.ws.send(data)
  }

  close(): void {
    try {
      this.ws.close()
    } catch {
      /* already closed */
    }
  }

  setOnMessage(handler: (data: Uint8Array) => void): void {
    this.ws.on('message', (raw: RawData) => {
      let chunk: Uint8Array
      if (Buffer.isBuffer(raw)) {
        // Most common case: ws delivers a Node.js Buffer.
        chunk = new Uint8Array(raw.buffer, raw.byteOffset, raw.byteLength)
      } else if (raw instanceof ArrayBuffer) {
        chunk = new Uint8Array(raw)
      } else {
        // Buffer[] — concatenate before converting.
        const concatenated = Buffer.concat(raw as Buffer[])
        chunk = new Uint8Array(concatenated.buffer, concatenated.byteOffset, concatenated.byteLength)
      }
      handler(chunk)
    })
  }

  setOnClose(handler: () => void): void {
    this.ws.on('close', handler)
  }

  setOnError(handler: (err: unknown) => void): void {
    this.ws.on('error', handler)
  }

  constructor(private readonly ws: WsWebSocket) {}
}
