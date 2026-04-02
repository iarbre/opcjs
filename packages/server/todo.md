# OPC UA Server Implementation — Todo

Basic OPC UA server in `opcjs-server` (Node.js only). WebSocket transport, SecurityPolicy None, anonymous auth.
Conformance units: Attribute Read, Session Base, Session General Service Behaviour.
Includes GetEndpoints/FindServers stubs. Tested with `opcjs-client`.

---

## Phase 1: Configuration & Transport ✅ COMPLETE

- [x] **1.1** `ConfigurationServer` — `src/configuration/configurationServer.ts`
  - Merged `ServerOptions` type; `fromOptions()`, `getSimple()` factories
  - Properties: `port`, `hostname`, `endpointPath`, `minSessionTimeoutMs`, `maxSessionTimeoutMs`, `maxSessions`

- [x] **1.2** WebSocket listener — `src/transport/webSocketListener.ts`
  - Wraps `ws.WebSocketServer`; `start()`/`stop()` as Promises; `onConnection` callback

- [x] **1.3** Per-connection handler — `src/transport/connectionHandler.ts`
  - Full inbound + outbound pipeline using `WebSocketLike` streams from base
  - `NodeWebSocketAdapter` bridges `ws.WebSocket` → `WebSocketLike`
  - `TcpServerHandshakeTransform` downstream `TransformStream` handles Hello/Ack
  - `SecureChannelServer` wired with placeholder `ServerServiceHandler`

- [x] **1.4** TCP handshake — `src/transport/tcpServerHandshakeTransform.ts`
  - `TransformStream<Uint8Array,Uint8Array>`; intercepts Hello, sends Ack via `TcpMessageInjector`

- [x] **1.5** Server secure channel — `src/secureChannel/secureChannelServer.ts`
  - `OpenSecureChannelRequest` Issue/Renew; channelId/tokenId generation
  - Routes MSG frames to injected `ServerServiceHandler`

- [x] **1.6** Base package modifications
  - `MsgHello.static decode()`, `WebSocketLike` interface
  - Base streams updated to accept `WebSocketLike`; Hello passes through `TcpMessageDecoupler`

---

## Phase 2: Session Management ✅ COMPLETE

- [x] **2.1** `Session` type — `src/sessions/session.ts`
  - `sessionId`, `authenticationToken`, `serverNonce`, `revisedTimeoutMs`, `boundChannelId`, `isActivated`, `createdAt`, `lastActivityAt`

- [x] **2.2** `SessionManager` — `src/sessions/sessionManager.ts`
  - `createSession(channelId, requestedTimeoutMs)`: unique NodeId pair, 32-byte nonce, clamped timeout
  - `activateSession(authToken, userIdentityToken, channelId)`: validates anonymous token, sets `isActivated`
  - `closeSession(authToken)`: removes session + cancels timer (idempotent)
  - `validateSession(authToken)`: throws `SessionError(BadSessionIdInvalid/BadSessionClosed)`
  - `touchSession(authToken)`: updates `lastActivityAt`, resets timer
  - Enforces `maxSessions`; idle-timeout cleanup via `setTimeout`

- [x] **2.3** `AnonymousAuthenticator` — `src/security/anonymousAuthenticator.ts`
  - `validateAnonymousToken(token)`: throws `AuthenticationError(BadIdentityTokenInvalid)` for non-anonymous tokens
  - `AuthenticationError` carries `statusCode` field

---

## Phase 3: Service Dispatch & Handlers ✅ COMPLETE

- [x] **3.1** `ServiceDispatcher` — `src/services/serviceDispatcher.ts`
  - Routes by `instanceof`; discovery + CreateSession bypass session check
  - Validates session via `SessionManager.validateSession()`; returns `ServiceFault` on error
  - Echoes `requestHandle` in all response headers
  - Returns `BadServiceUnsupported` for unknown request types
  - `IAddressSpace` interface exposed at `src/addressSpace/iAddressSpace.ts`

- [x] **3.2** `SessionService` — `src/services/sessionService.ts`
  - `CreateSessionRequest` → `CreateSessionResponse` (with `EndpointDescription[]`, serverNonce, sessionId, authenticationToken)
  - `ActivateSessionRequest` → `ActivateSessionResponse` (validates anonymous token via `SessionManager`)
  - `CloseSessionRequest` → `CloseSessionResponse`

- [x] **3.3** `AttributeService` — `src/services/attributeService.ts`
  - `ReadRequest` → `ReadResponse` via `IAddressSpace.read()`
  - Applies `timestampsToReturn` (Source / Server / Both / Neither)
  - Returns `BadNodeIdInvalid` for null nodeId items
  - `StubAddressSpace` (returns `BadNodeIdUnknown`) used until Phase 4

- [x] **3.4** `DiscoveryService` — `src/services/discoveryService.ts`
  - `GetEndpointsRequest` → single endpoint (SecurityPolicy None, Anonymous)
  - `FindServersRequest` → self-description (`ApplicationDescription`)

- [x] **3.5** Wired into `OpcUaServer`
  - Real `ServiceDispatcher` replaces placeholder handler
  - `OpcUaServer.addressSpace` property lets callers inject a real address space

---

## Phase 4: Address Space

*Parallel with Phases 2–3*

- [ ] **4.1** Create `Node` model — `src/addressSpace/node.ts`
  - Attributes as `Map<number, DataValue>` (attributeId → value)
  - Variable and Object node classes

- [ ] **4.2** Create `AddressSpace` — `src/addressSpace/addressSpace.ts`
  - In-memory `Map<string, Node>` keyed by NodeId string
  - Pre-populate required nodes:
    - Server (i=2253), ServerStatus (i=2256), NamespaceArray (i=2255), ServerArray (i=2254)
  - Simple `addVariable()` API for user nodes

---

## Phase 5: Wire Up

*Depends on all above*

- [ ] **5.1** Update `ServerOptions` — add `port`, `hostname`, `endpointPath`, `sessionTimeoutMs`, `maxSessions` (optional with defaults)
- [ ] **5.2** Update `OpcUaServer.start()` — create ConfigurationServer, AddressSpace, SessionManager, WebSocketListener, ConnectionHandler pipeline, ServiceDispatcher
- [ ] **5.3** Update `OpcUaServer.stop()` — close sessions, stop listener, clean up connections
- [ ] **5.4** Update `index.ts` — export all new public types

---

## Phase 6: Tests

### Unit tests

- [ ] **6.1** `tests/unit/sessionManager.test.ts`
  - Unique IDs, activate anonymous, close, timeout, max sessions, token validation

- [ ] **6.2** `tests/unit/serviceDispatcher.test.ts`
  - Routing, requestHandle echo, Bad_SessionIdInvalid, Bad_SessionClosed

- [ ] **6.3** `tests/unit/attributeService.test.ts`
  - Read Value, Bad_NodeIdUnknown, Bad_AttributeIdInvalid, timestampsToReturn

- [ ] **6.4** `tests/unit/tcpHandshakeHandler.test.ts`
  - Hello → Ack, buffer negotiation

### Integration tests (use opcjs-client)

- [ ] **6.5** `tests/integration/clientServerSession.test.ts`
  - Start server → connect client → CreateSession → ActivateSession (anon) → Read ServerStatus → Read NamespaceArray → CloseSession → disconnect

- [ ] **6.6** `tests/integration/attributeRead.test.ts`
  - Read various nodes, Bad_NodeIdUnknown, timestampsToReturn variants

---

## Verification

1. `npx tsc --noEmit` — zero errors (server + base)
2. `npx eslint .` — zero errors
3. `npm test` — all unit + integration tests pass

---

## Decisions

| Decision | Resolution |
|----------|-----------|
| Browser support | Dropped — server is Node.js only |
| GetEndpoints/FindServers | Stub implementations included |
| WebSocket server | `ws` npm package |
| Security | SecurityPolicy None only, no certs/encryption |
| Authentication | Anonymous only (`AnonymousIdentityToken`) |
| Transport | WebSocket only (no raw TCP) |
| Scope exclusions | No subscriptions, browse, write |
| Address space | Minimal required server nodes + `addVariable()` |
| Base changes | `MsgHello.decode()` + configurable `TcpMessageDecoupler` Hello callback (backward-compatible) |
