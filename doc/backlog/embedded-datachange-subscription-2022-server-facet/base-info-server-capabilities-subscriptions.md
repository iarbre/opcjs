# Base Info Server Capabilities Subscriptions

**Facet**: Embedded DataChange Subscription 2022 Server Facet  
**Type**: Required  
**Status**: ❌ Not implemented

## Description

> Exposes AggregateFunctions, MaxSubscriptions, MaxMonitoredItems, MaxSubscriptionsPerSession and MaxMonitoredItemsPerSubscription of the ServerCapabilities Object as well as MaxMonitoredItemsPerCall of the OperationLimits Object.

These nodes live under `Server/ServerCapabilities` and `Server/ServerCapabilities/OperationLimits` in the namespace-0 address space (Part 5 §6.3.10). The opcjs server does not yet populate them.

Required nodes (Part 5):

| BrowseName | NodeId (ns=0) | Type |
|------------|---------------|------|
| `MaxSubscriptions` | 2735 | UInt32 |
| `MaxSubscriptionsPerSession` | 11702 | UInt32 |
| `MaxMonitoredItems` | 11572 | UInt32 |
| `MaxMonitoredItemsPerSubscription` | 11573 | UInt32 |
| `MaxMonitoredItemsPerCall` (OperationLimits) | 11574 | UInt32 |
| `AggregateFunctions` (folder) | 2997 | Folder of `AggregateFunctionType` |

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 §6.3.10 | ServerCapabilities | Capability variables |
| OPC 10000-5 §6.3.11 | OperationLimits | Per-service limits |

Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/6.3.10
