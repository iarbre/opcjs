# Time Sync – UA Based Support

**Facet**: Security Time Synchronization  
**Type**: Optional  
**Status**: ❌ Not implemented  

## Description

The Time Sync – UA Based Support conformance unit requires the client to read the server's current time via an OPC UA service call and use the difference to calculate a clock skew correction applied when generating subsequent `RequestHeader.timestamp` values.

This is an application-level time synchronisation mechanism that works independently of NTP and is useful when:
- The network forbids external NTP access.
- The highest accuracy relative to the OPC UA server is required.
- The client and server run in different time zones or under unusual clock conditions.

### Synchronisation procedure

1. Record client timestamp before: `t1 = Date.now()`.
2. Send a `Read` of `Server/ServerStatus/CurrentTime` (NodeId `ns=0; i=2258`).
3. Record client timestamp after: `t4 = Date.now()`.
4. Parse server `DateTime` from response: `serverTime`.
5. Estimate one-way network delay: `delay = (t4 - t1) / 2`.
6. Estimated server time at receipt: `serverNow = serverTime + delay`.
7. Clock skew: `skewMs = serverNow - t4`.
8. Apply `skewMs` to all future `RequestHeader.timestamp` values.

This is similar to the SNTP algorithm (RFC 4330).

NodeId for `Server/ServerStatus/CurrentTime`: `ns=0; i=2258`

### Re-synchronisation

The skew should be recalculated periodically (e.g. every 10 minutes) because client and server clocks may drift apart.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-7 §8 | Time Synchronization | UA Based Support optional CU |
| OPC 10000-5 §12.6 | ServerStatus | `CurrentTime` variable (ns=0; i=2258) |
| RFC 4330 | SNTP | Simple Network Time Protocol algorithm |

Online: https://reference.opcfoundation.org/Core/Part7/v105/docs/  
Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/12.6  
External: https://datatracker.ietf.org/doc/html/rfc4330

## Implementation Gap

No time-sync reads are performed; `Date.now()` is used directly with no skew correction.

## Work Required

1. After `ActivateSession`, measure the clock skew against `Server/ServerStatus/CurrentTime`.
2. Store the skew in `ClientContext.clockSkewMs`.
3. Apply it in `serviceBase.ts` when constructing `RequestHeader.timestamp`.
4. Periodically re-measure (e.g. during keep-alive reads) and update the stored skew.
5. Expose `client.clockSkewMs` as a read-only diagnostic property.

## Related Conformance Units

- [Time Sync – Support](./time-sync-support.md)
- [Time Sync – Configure Clock Skew](./time-sync-configure-clock-skew.md)
- [Session Client KeepAlive](../core-2022-client-facet/session-client-keepalive.md)
