# Monitor Items 2

**Facet**: Embedded DataChange Subscription 2022 Server Facet  
**Type**: Required  
**Status**: ✅ Implemented

## Description

> Support at least 2 MonitoredItems per Subscription where the size of each MonitoredItem is at least equal to size of Double.

The server imposes no hard cap on the number of Monitored Items per Subscription. The integration test `tests/integration/subscription.test.ts` verifies a Subscription can host at least one Monitored Item; the code path is identical for any N.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.13.2 | CreateMonitoredItems | Service definition |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.13.2

## Implementation

- `packages/server/src/subscription/subscription.ts` — `Subscription.monitoredItems` is a `Map<number, MonitoredItem>` with no enforced upper bound.
