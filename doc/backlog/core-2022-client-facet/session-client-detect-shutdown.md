# Session Client Detect Shutdown

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ❌ Not implemented  

## Description

A server that is about to shut down announces this through the `ServerStatus/State` variable before closing connections. This conformance unit requires the client to monitor `ServerStatus/State` and respond appropriately when a shutdown is announced.

### Server shutdown sequence

1. Server sets `ServerStatus/State` to `Shutdown` (value = 4).
2. Server may set `ServerStatus/EstimatedReturnTime` to indicate when it expects to be back.
3. Server sends a `StatusChangeNotification` with `Bad_ServerHalted` to all active subscriptions.
4. Server begins closing sessions and SecureChannels.

### Client behaviour

When `ServerStatus/State = Shutdown` is detected (via subscription notification or keep-alive read), the client should:
1. Stop sending new service requests.
2. Read `EstimatedReturnTime` (see [Base Info Client Estimated Return Time](./base-info-client-estimated-return-time.md)).
3. Notify the application that the server is shutting down.
4. Schedule a reconnect attempt at the appropriate time.

### Detection mechanism options

| Method | Description |
|--------|-------------|
| Subscription to `ServerStatus/State` | `CreateMonitoredItem` on NodeId `ns=0; i=2259`. Most efficient; server pushes changes. |
| Periodic `Read` in keep-alive loop | Read `ServerStatus/State` every keep-alive tick. Less efficient but works without subscriptions. |
| `StatusChangeNotification` | Subscription `PublishResponse` may contain a `StatusChangeNotification` with `Bad_ServerHalted`. |

NodeId for `Server/ServerStatus/State`: `ns=0; i=2259`

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 §12.6 | ServerStatus | Variable containing `State`, `CurrentTime`, `EstimatedReturnTime` etc. |
| OPC 10000-5 §12.6.3 | ServerState | Enumeration: `Running=0`, `Failed=1`, `Shutdown=4`, etc. |
| OPC 10000-4 §5.13.5 | Publish / StatusChangeNotification | How `Bad_ServerHalted` is delivered via subscriptions |

Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/12.6  
Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.13.5

## Implementation Gap

The keep-alive loop in `src/client.ts` reads `Server_ServerStatus` (ns=0, i=2256) but does not inspect the `State` field within the result.  
No `StatusChangeNotification` handler checks for `Bad_ServerHalted`.

## Work Required

1. In the keep-alive read callback, decode `ServerStatus.State` and emit a `serverShutdown` event if `State = Shutdown`.
2. In `subscriptionService.ts`, handle `StatusChangeNotification` with `Bad_ServerHalted` status code.
3. Wire both paths into the reconnect / backoff logic and the `EstimatedReturnTime` reader.
4. Expose an `onServerShutdown` callback / event on the `Client` API.

## Related Conformance Units

- [Session Client KeepAlive](./session-client-keepalive.md)
- [Session Client Auto Reconnect](./session-client-auto-reconnect.md)
- [Base Info Client Estimated Return Time](./base-info-client-estimated-return-time.md)
