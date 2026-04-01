# Base Info Client Estimated Return Time

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ✅ Implemented  

## Description

When a server is about to shut down, it publishes an `EstimatedReturnTime` property under the `Server` object.  
A client claiming this conformance unit uses that timestamp to schedule reconnect attempts intelligently, rather than polling at a fixed rate.

### EstimatedReturnTime node

| Attribute | Value |
|-----------|-------|
| NodeId | `ns=0; i=2992` |
| BrowseName | `EstimatedReturnTime` |
| DataType | `DateTime` |
| Description | UTC time when the server is expected to become available again. `MinDateTime` means the server does not expect to return. |

### Client behaviour

When the server announces a shutdown (`ServerStatus/State = Shutdown`) the client should:
1. Read `Server/ServerStatus/EstimatedReturnTime` (NodeId `ns=0; i=2992`).
2. If the value is a valid future timestamp, schedule the first reconnect attempt at that time.
3. If the value is `MinDateTime` (server not expected to return), notify the application and do not retry automatically.
4. Apply exponential backoff for subsequent retries if the server is not yet available at the estimated time.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 §12.6 | ServerStatus | Contains `EstimatedReturnTime` and `State` |
| OPC 10000-5 §12.6.3 | ServerState | Enumeration: Running, Failed, NoConfiguration, Suspended, Shutdown, Test, CommunicationFault, Unknown |
| OPC 10000-4 §5.7.3 | ActivateSession | Used during reconnect to reactivate an existing session |

Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/12.6

## Implementation

✅ Implemented.

### `Client.computeReconnectDelayMs()` (private, `src/client.ts`)

Reads `Server/ServerStatus/EstimatedReturnTime` (ns=0, i=2992) after shutdown is detected and
returns the reconnect delay:

| Server response | Client behaviour |
|---|---|
| Valid future `DateTime` | delay = `EstimatedReturnTime − now` |
| Past `DateTime` | delay = 1 s (server should already be back) |
| OPC UA `MinDateTime` (1601-01-01) | returns `null` → fire `onPermanentShutdown`, no reconnect |
| `null` / non-Date / read error | fall back to `configuration.shutdownReconnectDelayMs` |

### `Client.handleServerShutdownDetected()` (private)

Now calls `computeReconnectDelayMs()` before scheduling the reconnect `setTimeout`.
When `null` is returned, fires `Client.onPermanentShutdown?.()` without scheduling a reconnect.

### `Client.onPermanentShutdown?: () => void` (public)

Fires when the server sends `MinDateTime` for `EstimatedReturnTime`, indicating it will not
restart. The application layer is responsible for deciding whether to re-use or dispose the
`Client` instance.

### Constants added

| Constant | Value | Purpose |
|---|---|---|
| `ESTIMATED_RETURN_TIME_NODE_ID` | `ns=0; i=2992` | Node to read |
| `OPC_UA_MIN_DATE_TIME_MS` | `-11_644_473_600_000` | MinDateTime in JS epoch ms |
| `MIN_RECONNECT_DELAY_MS` | `1_000` | Minimum delay when ERT is in the past |

### Tests

`tests/unit/estimatedReturnTime.test.ts` — 11 tests covering `computeReconnectDelayMs` and the
full `handleServerShutdownDetected` integration path.

## Related Conformance Units

- [Session Client Auto Reconnect](./session-client-auto-reconnect.md)
- [Session Client Detect Shutdown](./session-client-detect-shutdown.md)
