/**
 * Test-only WebSocket polyfill.
 *
 * `opcjs-client` uses {@link WebSocketFascade} which delegates to the
 * WHATWG global `WebSocket` and forces the `wss://` scheme. The in-process
 * `opcjs-server` exposes only an unencrypted `ws://` listener, so we install
 * a global `WebSocket` that wraps the Node `ws` package and rewrites any
 * `wss://` URL to `ws://` before opening the underlying socket.
 *
 * This is loaded automatically by Vitest via `setupFiles` in vitest.config.ts
 * and must run before any test imports `opcjs-client`.
 */

import { WebSocket as WsWebSocket } from 'ws'

class TestWebSocket extends WsWebSocket {
  constructor(address: string | URL, protocols?: string | string[]) {
    const url = typeof address === 'string' ? address : address.toString()
    const wsUrl = url.replace(/^wss:\/\//, 'ws://')
    super(wsUrl, protocols)
  }
}

// Expose on globalThis so `new WebSocket(...)` inside opcjs-base resolves to us.
;(globalThis as unknown as { WebSocket: typeof WsWebSocket }).WebSocket =
  TestWebSocket as unknown as typeof WsWebSocket
