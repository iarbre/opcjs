# Documentation – Core Capacities

**Facet**: Core 2022 Client Facet  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

The OPC UA specification requires that a client document the limits it imposes on core OPC UA resources.  
This documentation must be publicly available (e.g. in the product README or manual) so that servers and integrators know what to expect when connecting to this client.

The following capacities must be stated:

| Resource | Required Documentation |
|----------|----------------------|
| SecureChannels | Maximum number of simultaneous SecureChannels the client can maintain |
| Sessions | Maximum number of simultaneous Sessions |
| ContinuationPoints per Session | Maximum browse continuation points the client may hold open at once |
| Subscriptions | Maximum number of Subscriptions per Session |
| MonitoredItems | Maximum total number of MonitoredItems |
| Publish requests in flight | Maximum number of outstanding Publish requests sent to the server |

This is a **documentation-only** conformance unit; no runtime behaviour is tested, but the absence of published capacity information disqualifies the client from certification.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-7 §6 | Core 2022 Client Facet definition | Lists "Documentation – Core Capacities" as a required conformance unit |
| OPC 10000-4 §5.8.2 | Browse Service | Describes continuation points |
| OPC 10000-4 §5.13.1 | CreateSubscription | Subscription resource management |

Online: https://reference.opcfoundation.org/Core/Part7/v105/docs/  
Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.8.2

## Implementation

**File**: `README.md` — "Core Capacities" section  

Current published limits:

| Resource | Limit |
|----------|-------|
| SecureChannels | 1 (one per `Client` instance) |
| Sessions | 1 (one per `Client` instance) |
| ContinuationPoints | No client-side hard limit; server-imposed limit respected |
| Subscriptions | No client-side hard limit |
| MonitoredItems | No client-side hard limit |
| Publish requests | 1 outstanding at a time (sequential publish loop) |

## Related Conformance Units

- [Session Client Base](./session-client-base.md)
- [Session Client KeepAlive](./session-client-keepalive.md)
