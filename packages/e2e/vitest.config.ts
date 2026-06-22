import { defineConfig } from 'vitest/config'

/**
 * Vitest config for the end-to-end test package.
 *
 * `setupFiles` runs once per test file before any test executes — we use it
 * to install the `ws`-backed `WebSocket` polyfill so that the browser-only
 * `WebSocketFascade` used by `opcjs-client` can talk to the unencrypted
 * `ws://` listener exposed by `opcjs-server`.
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    setupFiles: ['./tests/setup/webSocketPolyfill.ts'],
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
})
