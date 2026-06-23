# Subscription PublishRequest Queue Overflow

**Facet**: Embedded DataChange Subscription 2022 Server Facet  
**Type**: Required  
**Status**: ❌ Not implemented

## Description

> If the maximum supported number of PublishRequests has been queued and a new PublishRequest arrives, the "oldest" PublishRequest has to be discarded by returning the proper error.

Per Part 4 §5.14.5, when a Session has reached its configured limit of pending Publish requests and another arrives, the Server must respond to the oldest queued Publish request with `Bad_TooManyPublishRequests` so the Client can immediately re-issue it.

This requires:
1. Tracking the number of pending Publish requests per Session.
2. A configurable cap (suggested: 2 for Embedded, larger for Standard).
3. On overflow: resolve the oldest pending Publish with `Bad_TooManyPublishRequests` and accept the new one.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.14.5 | Publish | Overflow handling |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.14.5
