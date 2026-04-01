# Session Client Auto Reconnect

**Facet**: Core 2022 Client Facet  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

The Session Client Auto Reconnect conformance unit requires that a client is able to recover its session after a transport-level disconnect without requiring application-level intervention.

The recovery procedure has two tiers:

### Tier 1 — Reuse the existing session (recommended)

When the SecureChannel drops but the session timeout has **not** expired:

1. Re-open the WebSocket / TCP connection.
2. Re-open the SecureChannel (`OpenSecureChannel` with `RequestType = Renew`).
3. Send `ActivateSession` on the **new** SecureChannel, referencing the **existing** `sessionId` and `authenticationToken`.
4. If the server accepts, the session is reactivated and the client continues as if nothing happened.

### Tier 2 — Create a new session

When the existing session has expired, or the server returns `Bad_SessionIdInvalid` / `Bad_SessionNotActivated`:

1. Send `CloseSession` if feasible (best-effort; may fail).
2. Re-open the SecureChannel.
3. Send `CreateSession` followed by `ActivateSession`.
4. Re-establish any subscriptions and monitored items.

### Error conditions that trigger reconnect

| Condition | Source |
|-----------|--------|
| WebSocket `close` event | Transport |
| WebSocket `error` event | Transport |
| `Bad_SecureChannelIdInvalid` | SecureChannel layer |
| `Bad_SecureChannelClosed` | SecureChannel layer |
| `Bad_SessionIdInvalid` | Session layer |
| `Bad_SessionNotActivated` | Session layer |
| `Bad_TcpEndpointUrlInvalid` | TCP layer |

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.6.2 | OpenSecureChannel | `RequestType`: Issue vs Renew |
| OPC 10000-4 §5.7.2 | CreateSession | Initial session establishment |
| OPC 10000-4 §5.7.3 | ActivateSession | Reactivation on a new SecureChannel |
| OPC 10000-4 §5.7.4 | CloseSession | Graceful session teardown |
| OPC 10000-4 §6 | Service Behaviours | Reconnect and re-subscription behaviors |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.6.2  
Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.7.3

## Implementation

**File**: `src/client.ts`  

Key method: `withSessionRefresh()` — wraps every service call and catches:
- `SessionInvalidError` → calls `reconnectAndReactivate()`
- Transport-level errors (WebSocket close/error) → calls `reconnectAndReactivate()`

`reconnectAndReactivate()`:
1. Calls `tcpConnectionHandler.reconnect()` to re-open the WebSocket/TCP layer.
2. Calls `secureChannelFacade.reopen()` — sends `OpenSecureChannel` (Issue on new channel).
3. Attempts `sessionHandler.activateExistingSession()` with the existing `authenticationToken`.
4. Falls back to `sessionHandler.createAndActivateNewSession()` if step 3 fails.

## Backlog

- [ ] Configurable reconnect backoff strategy (currently retries immediately).
- [ ] Maximum reconnect attempt count / give-up policy.
- [ ] Restore MonitoredItems after a full session re-creation.

## Related Conformance Units

- [Session Client Base](./session-client-base.md)
- [Session Client KeepAlive](./session-client-keepalive.md)
- [UA Secure Conversation](../ua-tcp-ua-sc-ua-binary/ua-secure-conversation.md)
