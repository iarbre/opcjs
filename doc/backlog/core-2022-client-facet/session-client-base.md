# Session Client Base

**Facet**: Core 2022 Client Facet  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

The Session Client Base conformance unit covers the three fundamental session lifecycle services that every OPC UA Client must implement:

### CreateSession (OPC 10000-4 §5.7.2)

Establishes a new logical session with the server.

**Client responsibilities**:
- Send `CreateSessionRequest` with:
  - `clientDescription` (ApplicationDescription with `applicationType = Client`)
  - `serverUri` (matched against the server's certificate for security validation)
  - `endpointUrl`
  - `sessionName` (human-readable, for diagnostics)
  - `clientNonce` (randomly generated 32-byte ByteString; null for SecurityPolicy None)
  - `clientCertificate` (DER-encoded application instance certificate; null for SecurityPolicy None)
  - `requestedSessionTimeout` (milliseconds)
  - `maxResponseMessageSize`
- Receive `CreateSessionResponse`:
  - `sessionId` — NodeId identifying the session on the server
  - `authenticationToken` — opaque token sent in every subsequent request header
  - `revisedSessionTimeout` — the server may revise the requested timeout
  - `serverNonce` — used by `ActivateSession` signature
  - `serverCertificate` — must be validated against the trusted CA list

### ActivateSession (OPC 10000-4 §5.7.3)

Activates a created session and authenticates the user.  
Must be called after `CreateSession` and after every SecureChannel renewal.

**Client responsibilities**:
- Send `ActivateSessionRequest` with:
  - `clientSignature` — signature over `serverCertificate + serverNonce` using the client's private key (null for SecurityPolicy None)
  - `clientSoftwareCertificates` — list of software certificates (may be empty)
  - `localeIds` — requested locales for localised text responses
  - `userIdentityToken` — the user authentication token (AnonymousIdentityToken for anonymous login)
  - `userTokenSignature` — signature over the user token (null for anonymous)

### CloseSession (OPC 10000-4 §5.7.4)

Gracefully terminates a session.

**Client responsibilities**:
- Send `CloseSessionRequest` with `deleteSubscriptions = true` to allow the server to clean up any server-side resources.
- Called during `client.disconnect()`.

### Request Header

Every request sent within a session includes a `RequestHeader` (OPC 10000-4 §7.28) containing:
- `authenticationToken` — the token received from `CreateSession`
- `timestamp` — UTC time of the request (for time-validation)
- `requestHandle` — client-assigned handle for correlating responses and cancellation
- `returnDiagnostics` — bitmask requesting optional diagnostic information
- `auditEntryId` — optional audit trail identifier
- `timeoutHint` — client-side timeout hint in milliseconds

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.7 | Session Service Set | Overview of all session services |
| OPC 10000-4 §5.7.2 | CreateSession | Request/response parameters and result codes |
| OPC 10000-4 §5.7.2 Table 15 | CreateSession Parameters | Full parameter list |
| OPC 10000-4 §5.7.3 | ActivateSession | User identity tokens and signatures |
| OPC 10000-4 §5.7.4 | CloseSession | Graceful session termination |
| OPC 10000-4 §7.28 | RequestHeader | Common request header structure |
| OPC 10000-4 §7.29 | ResponseHeader | Includes `serviceResult` and `serviceDiagnostics` |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.7.2  
Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.7.3  
Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.7.4

## Implementation

**Files**:
- `src/services/sessionService.ts` — `createSession()`, `activateSession()`, `closeSession()`
- `src/sessions/sessionHandler.ts` — orchestrates create/activate lifecycle, holds `authenticationToken`
- `src/client.ts` — exposes `connect()` (creates + activates) and `disconnect()` (closes session then tears down channel)

Sequence in `connect()`:
1. Open WebSocket
2. TCP Hello/Ack handshake
3. `OpenSecureChannel`
4. `CreateSession`
5. `ActivateSession`

Sequence in `disconnect()`:
1. `CloseSession` (with `deleteSubscriptions = true`)
2. `CloseSecureChannel`
3. Close WebSocket

## Related Conformance Units

- [Session Client Auto Reconnect](./session-client-auto-reconnect.md)
- [Session Client General Service Behaviour](./session-client-general-service-behaviour.md)
- [Session Client KeepAlive](./session-client-keepalive.md)
- [UA Secure Conversation](../ua-tcp-ua-sc-ua-binary/ua-secure-conversation.md)
