# Subscription Publish Basic

**Facet**: Embedded DataChange Subscription 2022 Server Facet  
**Type**: Required  
**Status**: ⚠️ Partial – only one Publish request is buffered per Subscription at a time

## Description

> Support at least 2 Publish Service requests per Session.

The current implementation accepts and parks at most one outstanding Publish request per Subscription via `Subscription.enqueuePublishCallback`. A second concurrent Publish on the same Subscription will resolve only after the first has resolved.

A future change will move the queue up to the Session level so up to N (≥ 2) concurrent Publish requests can be parked across all Subscriptions of a Session.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.14.5 | Publish | Service definition |
| OPC 10000-4 §5.14.1.3 | Publish request queue | Recommended depth |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14.5

## Implementation

- `packages/server/src/subscription/subscription.ts` — `enqueuePublishCallback` parks the pending Publish on the Subscription chosen by priority.
- `packages/server/src/services/subscriptionService.ts` — for each Publish request, picks the highest-priority owned Subscription and enqueues the callback there.
