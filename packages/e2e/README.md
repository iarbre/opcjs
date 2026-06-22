# opcjs-e2e

End-to-end tests that wire the real `opcjs-client` and `opcjs-server` packages
together inside a single Node process. Each test starts an in-process
`OpcUaServer` on an OS-assigned port, drives it with the high-level `Client`,
and shuts everything down afterwards.

## Framework

[Vitest](https://vitest.dev/) — already used across the rest of the monorepo
(`opcjs-base`, `opcjs-client`, `opcjs-server`, `opcjs-generator`), so no new
test toolchain is introduced.

## Layout

```
tests/
  setup/
    webSocketPolyfill.ts   ← installs a ws-backed global WebSocket that rewrites
                              wss:// → ws:// so opcjs-client can reach the
                              unencrypted opcjs-server listener
  integration/
    readNode.test.ts       ← first end-to-end test: anonymous connect + read
```

## Running

```bash
cd packages/e2e
npm test            # vitest run
npm run test:dev    # vitest watch mode
```
