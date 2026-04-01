# Session Client Cancel

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ✅ Implemented  

## Description

The Cancel service allows a client to request that the server abandon processing of one or more previously-sent service requests.

### Use cases

- A request has been outstanding longer than the application's patience.
- A user has navigated away from a view that triggered a costly Browse or Read.
- The client is shutting down and wants to release server resources promptly.

### Cancel service (OPC 10000-4 §5.7.5)

**Request parameters**:

| Field | Type | Description |
|-------|------|-------------|
| `requestHeader` | RequestHeader | Standard header with `authenticationToken` |
| `requestHandle` | UInt32 | The `requestHandle` from the request to cancel |

**Response parameters**:

| Field | Type | Description |
|-------|------|-------------|
| `responseHeader` | ResponseHeader | Standard response header |
| `cancelCount` | UInt32 | Number of requests that were successfully cancelled |

**Notes**:
- The server makes a best-effort attempt to cancel; the request may have already been processed.
- If `cancelCount = 0` the request was not found (already completed or never received).
- The original request may still return a response after cancellation with status `Bad_RequestCancelledByClient`.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.7.5 | Cancel Service | Request/response parameters |
| OPC 10000-4 §7.28 | RequestHeader | `requestHandle` field used to identify the target request |
| OPC 10000-4 Table 176 | `Bad_RequestCancelledByClient` | Status code returned for cancelled requests |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.7.5

## Implementation

**File**: `src/services/sessionService.ts`  
The `CancelRequest` and `CancelResponse` schema types exist in the generated schema.  
A `cancel(requestHandle: number): Promise<number>` method is exposed via `sessionService` and forwarded from `client.cancel()`.

## Related Conformance Units

- [Session Client Base](./session-client-base.md)
- [Session Client General Service Behaviour](./session-client-general-service-behaviour.md)
