# OPC UA Server Implementation — Todo

Basic OPC UA server in `opcjs-server` (Node.js only). WebSocket transport, SecurityPolicy None, anonymous auth.
Conformance units: Attribute Read, Session Base, Session General Service Behaviour.
Includes GetEndpoints/FindServers stubs. Tested with `opcjs-client`.

---

## Phase 1: Configuration & Transport

- [ ] **1.1** Create `ConfigurationServer` — `src/configuration/configurationServer.ts`
  - Extends base `Configuration` (mirrors `ConfigurationClient.getSimple()`)
  - Properties: `port`, `hostname`, `endpointPath`, `sessionTimeoutMs`, `maxSessions`
  - Static `getSimple()` factory registering binary encoders/decoders

- [ ] **1.2** Create WebSocket listener — `src/transport/webSocketListener.ts`
  - Uses `ws` npm package (`WebSocketServer`)
  - Accepts incoming connections, emits per-connection callback
  - Add `ws` + `@types/ws` to `package.json`

- [ ] **1.3** Create per-connection handler — `src/transport/connectionHandler.ts`
  - Builds inbound pipeline: `TcpMessageDecoupler` → `SecureChannelMessageDecoder` → `SecureChannelChunkReader` → `SecureChannelTypeDecoder`
  - Builds outbound pipeline: `SecureChannelTypeEncoder` → `SecureChannelChunkWriter` → `SecureChannelMessageEncoder` → `TcpMessageInjector`
  - Owns a `SecureChannelContext` per connection

- [ ] **1.4** Create server TCP handshake — `src/transport/tcpHandshakeHandler.ts`
  - Receives Hello, validates, sends Ack (inverse of client `TcpConnectionHandler`)
  - Negotiates buffer sizes per OPC UA Part 6 §7.1.2

- [ ] **1.5** Create server secure channel handler — `src/secureChannel/secureChannelServer.ts`
  - Accepts `OpenSecureChannelRequest` (Issue/Renew)
  - Generates channelId + tokenId, manages token lifetime
  - SecurityPolicy None only
  - Routes subsequent requests to service dispatcher

- [ ] **1.6** Base package modifications (backward-compatible)
  - Add `static decode()` to `MsgHello` in `base/src/transports/messages/msgHello.ts`
  - Add optional Hello callback to `TcpMessageDecoupler` in `base/src/transports/ws/tcpMessageDecoupler.ts`

---

## Phase 2: Session Management

*Depends on Phase 1*

- [ ] **2.1** Create `Session` model — `src/sessions/session.ts`
  - `sessionId` (NodeId), `authenticationToken` (NodeId), `serverNonce`, `timeout`, `boundChannelId`, `activated`, `createdAt`, `lastActivity`

- [ ] **2.2** Create `SessionManager` — `src/sessions/sessionManager.ts`
  - `createSession()`: unique IDs + nonce
  - `activateSession()`: validate anonymous token, bind to channel
  - `closeSession()`: remove state
  - Timeout-based cleanup, max sessions cap

- [ ] **2.3** Create `AnonymousAuthenticator` — `src/security/anonymousAuthenticator.ts`
  - Validates `AnonymousIdentityToken`

---

## Phase 3: Service Dispatch & Handlers

*Depends on Phase 2*

- [ ] **3.1** Create service dispatcher — `src/services/serviceDispatcher.ts`
  - Routes `IOpcType` requests by type to service handlers
  - Validates `authenticationToken` via `SessionManager` (General Service Behaviour)
  - Echoes `requestHandle` in ResponseHeader
  - Respects `timeoutHint`
  - Returns `Bad_SessionIdInvalid` / `Bad_SessionClosed` for bad tokens
  - Discovery services bypass session check

- [ ] **3.2** Create server `SessionService` — `src/services/sessionService.ts`
  - `CreateSessionRequest` → `CreateSessionResponse` (with `EndpointDescription[]`)
  - `ActivateSessionRequest` → `ActivateSessionResponse`
  - `CloseSessionRequest` → `CloseSessionResponse`

- [ ] **3.3** Create server `AttributeService` — `src/services/attributeService.ts`
  - `ReadRequest` → `ReadResponse`
  - Reads from address space, supports `maxAge`, `timestampsToReturn`
  - `Bad_AttributeIdInvalid`, `Bad_NodeIdUnknown`

- [ ] **3.4** Create `DiscoveryService` stubs — `src/services/discoveryService.ts`
  - `GetEndpointsRequest` → single endpoint (SecurityPolicy None, Anonymous)
  - `FindServersRequest` → self-description

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
