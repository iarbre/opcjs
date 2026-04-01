# Session Client KeepAlive

**Facet**: Core 2022 Client Facet  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

Sessions time out on the server if the client sends no requests within the `revisedSessionTimeout` period negotiated during `CreateSession`.  
The Session Client KeepAlive conformance unit requires the client to send periodic requests to prevent session expiry when no application-level traffic is flowing.

### Strategy

The OPC UA specification does not mandate a specific keep-alive mechanism; a client may use any service call.  
The common strategy is to issue a `Read` of `Server/ServerStatus` (NodeId `ns=0; i=2256`) which:
- Is cheap (single scalar value, no security implications).
- Returns the server's state, allowing the client to detect an unexpected shutdown.
- Consumes a session slot, resetting the idle timer.

### Keep-alive interval

The keep-alive interval should be:
- Less than `revisedSessionTimeout` (typically 60 s default on servers).
- Sufficient to detect server unavailability without flooding the server.

A typical interval is **`revisedSessionTimeout * 0.5`**, or a fixed 25–30 seconds for sessions with default timeouts.

### Interaction with Subscriptions

When a `Publish` loop is active (one or more active subscriptions), the Publish requests themselves act as keep-alive traffic; a separate keep-alive timer is redundant and should be suppressed to reduce load.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.7.2 | CreateSession | `requestedSessionTimeout` and `revisedSessionTimeout` |
| OPC 10000-4 §5.6 | SecureChannel Service Set | SecureChannel lifetimes (separate from session) |
| OPC 10000-5 §12.6 | ServerStatus | NodeId `ns=0; i=2256`, contains `State`, `BuildInfo`, `CurrentTime`, etc. |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.7.2  
Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/12.6

## Implementation

**File**: `src/client.ts`

- `startKeepAlive()` — starts a `setInterval` timer (25 s period) that reads `Server_ServerStatus` (ns=0, i=2256) using `attributeService.read()`.
- `stopKeepAlive()` — cancels the timer; called on `disconnect()`.
- The timer is **skipped** for a given tick when `subscriptionHandler.hasActiveSubscription()` returns `true`, because the Publish loop is already keeping the session alive.

## Open Items

- [ ] Read `revisedSessionTimeout` from `CreateSessionResponse` and derive the interval dynamically instead of using a fixed 25 s value.
- [ ] Surface any keep-alive failures to the application layer before triggering reconnect.

## Related Conformance Units

- [Session Client Base](./session-client-base.md)
- [Session Client Auto Reconnect](./session-client-auto-reconnect.md)
- [Session Client Detect Shutdown](./session-client-detect-shutdown.md) (optional, related)
