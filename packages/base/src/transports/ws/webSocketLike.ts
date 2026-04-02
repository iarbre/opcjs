/**
 * Minimal interface for a WebSocket connection used by the OPC UA transport layer.
 *
 * Normalises the browser {@link WebSocket} event model and the Node.js `ws`
 * EventEmitter API to a single abstraction so that
 * {@link WebSocketReadableStream} and {@link WebSocketWritableStream} can be
 * shared across both environments.
 *
 * Implementors:
 * - `WebSocketFascade` — browser / WHATWG WebSocket
 * - `NodeWebSocketAdapter` (server package) — Node.js `ws` WebSocket
 */
export type WebSocketLike = {
  /** Sends a binary frame. */
  send(data: Uint8Array): void
  /** Closes the connection. */
  close(): void
  /** Registers the handler called whenever a binary message is received. */
  setOnMessage(handler: (data: Uint8Array) => void): void
  /** Registers the handler called when the connection is closed. */
  setOnClose(handler: () => void): void
  /** Registers the handler called on a connection error. */
  setOnError(handler: (err: unknown) => void): void
}
