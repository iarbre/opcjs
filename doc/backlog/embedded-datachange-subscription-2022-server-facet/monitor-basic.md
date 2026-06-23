# Monitor Basic

**Facet**: Embedded DataChange Subscription 2022 Server Facet  
**Type**: Required  
**Status**: ⚠️ Partial – `ModifyMonitoredItems` and `SetMonitoringMode` not exposed via service dispatcher

## Description

> Support the following MonitoredItem Services: `CreateMonitoredItems`, `ModifyMonitoredItems`, `DeleteMonitoredItems` and `SetMonitoringMode`.

| Service | Spec § | Status | Notes |
|---------|--------|--------|-------|
| CreateMonitoredItems | 5.13.2 | ✅ | Returns `BadSubscriptionIdInvalid` / `BadNodeIdInvalid` per Part 4. |
| ModifyMonitoredItems | 5.13.3 | ❌ | Not yet wired into `ServiceDispatcher`. |
| SetMonitoringMode | 5.13.4 | ⚠️ | `MonitoredItem.setMonitoringMode` exists; the service entry point is not yet wired up. |
| DeleteMonitoredItems | 5.13.6 | ✅ | Returns `BadMonitoredItemIdInvalid` for unknown items. |

`MonitoredItem` honours `MonitoringMode.Disabled`, `MonitoringMode.Sampling`, and `MonitoringMode.Reporting` when sampling and when draining notifications.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.13 | Monitored Items service set | Overview |
| OPC 10000-4 §5.13.2 | CreateMonitoredItems | Service definition |
| OPC 10000-4 §5.13.3 | ModifyMonitoredItems | Service definition |
| OPC 10000-4 §5.13.4 | SetMonitoringMode | Service definition |
| OPC 10000-4 §5.13.6 | DeleteMonitoredItems | Service definition |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.13

## Implementation

- `packages/server/src/subscription/monitoredItem.ts` — per-item sampling state.
- `packages/server/src/services/monitoredItemService.ts` — CreateMonitoredItems / DeleteMonitoredItems.
- `packages/server/src/services/serviceDispatcher.ts` — routes both services to the new `MonitoredItemService`.
