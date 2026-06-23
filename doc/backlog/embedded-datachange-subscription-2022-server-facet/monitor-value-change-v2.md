# Monitor Value Change V2

**Facet**: Embedded DataChange Subscription 2022 Server Facet  
**Type**: Required  
**Status**: ⚠️ Partial – `IndexRange` not yet honoured

## Description

> Support creation of MonitoredItems for Attribute value changes. This includes support of the IndexRange to select a single element or a range of elements when the Attribute value is an array.
>
> This ConformanceUnit does not require queuing when multiple value changes occur during a "publish period". I.e. the latest change will be sent in the Notification.

The implementation:

- Samples the Value attribute on each publishing tick.
- Compares against the last reported value via `Variant.equals` (JSON-based comparison).
- Emits a `DataChangeNotification` only when the sampled value differs from the previously reported value.
- Queues at most `max(1, queueSize)` items; on overflow the oldest is discarded (queue size of 1 = "latest value wins").

Pending:
- `IndexRange` parsing and slicing on the sampled `Variant`.
- `DataChangeFilter` (deadband, status/value filtering) — Part 4 §7.22.
- Per-item `samplingInterval` (currently every item samples on the Subscription's publishing tick).

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.13.2 | CreateMonitoredItems | Including `IndexRange` |
| OPC 10000-4 §7.22 | DataChangeFilter | Deadband / change trigger |
| OPC 10000-4 §7.21 | MonitoringParameters | `samplingInterval`, `queueSize`, `discardOldest` |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.13.2

## Implementation

- `packages/server/src/subscription/monitoredItem.ts` — sampling, change detection, queue.
