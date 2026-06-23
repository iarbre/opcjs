# Base Info Server Capabilities MaxMonitoredItemsQueueSize

**Facet**: Embedded DataChange Subscription 2022 Server Facet  
**Type**: Required  
**Status**: ❌ Not implemented

## Description

> Exposes MaxMonitoredItemsQueueSize of the ServerCapabilities Object.

Required node:

| BrowseName | NodeId (ns=0) | Type |
|------------|---------------|------|
| `MaxMonitoredItemsQueueSize` | 24098 | UInt32 |

The opcjs server enforces `queueSize >= 1` per Monitored Item but does not yet expose a configured maximum.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 §6.3.10 | ServerCapabilities | `MaxMonitoredItemsQueueSize` |

Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/6.3.10
