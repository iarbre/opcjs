# Session Client General Service Behaviour

**Facet**: Core 2022 Client Facet  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

This conformance unit covers the cross-cutting rules that apply to **every** service call a client makes, regardless of service type. It ensures correct construction of request headers, evaluation of response status codes, and consistent error propagation.

### Request Header (OPC 10000-4 §7.28)

Every service request uses a `RequestHeader` structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `authenticationToken` | NodeId | Yes | Token from `CreateSessionResponse`; identifies the session |
| `timestamp` | DateTime | Yes | UTC time when the request was created |
| `requestHandle` | UInt32 | Yes | Client-assigned unique per-request identifier; echoed in the response |
| `returnDiagnostics` | UInt32 | No | Bitmask requesting additional diagnostic info (see §7.28) |
| `auditEntryId` | String | No | Audit trail identifier |
| `timeoutHint` | UInt32 | No | Milliseconds; server should discard the request if it cannot be processed within this time |
| `additionalHeader` | ExtensionObject | No | Extensibility point |

### Response Header (OPC 10000-4 §7.29)

Every service response contains a `ResponseHeader`:

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | DateTime | Server UTC time when the response was sent |
| `requestHandle` | UInt32 | Echoed from the request; used to correlate async responses |
| `serviceResult` | StatusCode | Top-level service result. `Good` (0x00000000) means success |
| `serviceDiagnostics` | DiagnosticInfo | Diagnostic details (present only when `returnDiagnostics` was set) |
| `stringTable` | String[] | String pool referenced by `DiagnosticInfo` entries |
| `additionalHeader` | ExtensionObject | Extensibility point |

### ServiceResult evaluation

The client must:
1. Check `responseHeader.serviceResult` before accessing any other response fields.
2. Throw / reject with a typed error if `serviceResult` is not `Good` or `GoodWithOverallUncertainty`.
3. Propagate `Bad_*` status codes to the caller as structured errors, not raw integers.

### RequestHandle uniqueness

The client must assign a unique `requestHandle` to each in-flight request.  
If a response arrives with an unknown `requestHandle`, it must be discarded.

### Timestamp requirements

Timestamps sent in requests must be reasonably accurate UTC times.  
Servers may reject requests with timestamps that diverge too far from server time (see [Security Time Synchronization](../security-time-synchronization/README.md)).

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §6.1 | Service Behaviours – General | Rules governing all services |
| OPC 10000-4 §7.28 | RequestHeader | Request header data type and field semantics |
| OPC 10000-4 §7.29 | ResponseHeader | Response header data type and field semantics |
| OPC 10000-4 §7.34 | StatusCode | Status code structure, severity bits, and well-known codes |
| OPC 10000-4 Table 176 | Common result codes | Definitions of well-known status codes (e.g. `Bad_SessionIdInvalid`) |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/6.1  
Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/7.28

## Implementation

**File**: `src/services/serviceBase.ts`

- Constructs `RequestHeader` for every outgoing request (auth token, timestamp, monotonically increasing `requestHandle`).
- Reads `ResponseHeader.serviceResult`; throws `OpcUaStatusError(statusCode)` when not `Good`.
- `returnDiagnostics` is forwarded from `RequestOptions` (see [Base Services Client Diagnostics](./base-services-client-diagnostics.md)).

## Related Conformance Units

- [Session Client Base](./session-client-base.md)
- [Base Services Client Diagnostics](./base-services-client-diagnostics.md)
- [Security Time Synchronization](../security-time-synchronization/README.md)
