# Time Sync – Configure Clock Skew

**Facet**: Security Time Synchronization  
**Type**: Optional  
**Status**: ❌ Not implemented  

## Description

This conformance unit allows an operator or application layer to manually configure a fixed clock skew correction value that is applied when generating `RequestHeader.timestamp` values.

This is useful in environments where:
- True NTP is not available (air-gapped networks, embedded systems).
- The OS clock is known to drift by a measurable amount.
- The client clock and server clock are intentionally offset.

### Expected behaviour

| Parameter | Description |
|-----------|-------------|
| `clockSkewMs` | Integer milliseconds; positive = client time is behind server, negative = client time is ahead |

When `clockSkewMs` is set, all `RequestHeader.timestamp` values are calculated as:  
`timestamp = Date.now() + clockSkewMs`

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-7 §8 | Time Synchronization | Configure Clock Skew optional CU |
| OPC 10000-4 §7.28 | RequestHeader.timestamp | Where the correction is applied |

Online: https://reference.opcfoundation.org/Core/Part7/v105/docs/

## Implementation Gap

No `clockSkewMs` or equivalent setting in `SecurityConfiguration` or `ClientConfiguration`.  
All timestamps are generated directly from `Date.now()`.

## Work Required

1. Add `clockSkewMs?: number` to `ClientConfiguration` (or `SecurityConfiguration`).
2. In `serviceBase.ts`, add the skew to the `RequestHeader.timestamp` when generating request headers.
3. Document the setting in README and type-level JSDoc.

## Related Conformance Units

- [Time Sync – Support](./time-sync-support.md)
- [Time Sync – OS Based Support](./time-sync-os-based.md)
- [Time Sync – UA based support](./time-sync-ua-based.md)
