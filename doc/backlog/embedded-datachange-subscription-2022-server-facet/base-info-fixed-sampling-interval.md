# Base Info Fixed SamplingInterval

**Facet**: Embedded DataChange Subscription 2022 Server Facet  
**Type**: Required  
**Status**: ❌ Not implemented

## Description

> Exposes diagnostic information on fixed sampling intervals (`SamplingIntervalDiagnosticsArray`) when the Server is handling subscriptions with fixed sampling intervals and the `EnabledFlag` in the `ServerDiagnostics` Object is set to TRUE.

Required node:

| BrowseName | NodeId (ns=0) | Type |
|------------|---------------|------|
| `SamplingIntervalDiagnosticsArray` | 2945 | `SamplingIntervalDiagnosticsDataType[]` |

The opcjs server does not yet maintain sampling-interval diagnostics. Until per-item sampling intervals are added (see [monitor-value-change-v2.md](./monitor-value-change-v2.md)), this CU cannot be implemented meaningfully.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 §6.3.13 | ServerDiagnostics | `SamplingIntervalDiagnosticsArray` |

Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/6.3.13
