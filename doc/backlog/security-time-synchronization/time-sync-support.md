# Time Sync – Support

**Facet**: Security Time Synchronization  
**Type**: Required  
**Status**: ✅ Satisfied (via OS-based support)  

## Description

The "Time Sync – Support" conformance unit is a meta-requirement: an OPC UA client must employ **at least one** mechanism to keep its system clock synchronised to UTC so that timestamps it embeds in `RequestHeader.timestamp` are accurate.

### Why time accuracy matters

Every service request contains a `RequestHeader.timestamp` (OPC UA DateTime = 100-ns intervals since 1601-01-01 UTC). Servers may:
- Reject requests with timestamps too far in the past or future (`Bad_InvalidTimestamp`).
- Use timestamps for audit trail accuracy.
- Use timestamps to detect message replay attacks.

OPC UA does not specify a maximum allowed clock skew, but common implementations reject timestamps more than ±5 minutes from server time.

### Satisfying this CU

This required CU is satisfied if the client also satisfies **any one** of the following optional CUs:

| Optional CU | Description |
|------------|-------------|
| Time Sync – OS based support | Relies on the host OS NTP/timesyncd sync |
| Time Sync – Configure Clock Skew | Allows manual clock-skew correction |
| Time Sync – NTP | Directly synchronises via NTP |
| Time Sync – IEEE 1588 PTP | Hardware PTP |
| Time Sync – IEEE 802.1AS | Generalized Precision Time Protocol |
| Time Sync – UA based support | Reads server time and adjusts locally |

**This implementation satisfies the requirement via [Time Sync – OS based support](./time-sync-os-based.md).**

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-7 §8 | Time Synchronization profile | CU hierarchy |
| OPC 10000-4 §7.28 | RequestHeader | `timestamp` field |

Online: https://reference.opcfoundation.org/Core/Part7/v105/docs/

## Related Conformance Units

- [Time Sync – OS based support](./time-sync-os-based.md) ← how this CU is satisfied
- [Session Client General Service Behaviour](../core-2022-client-facet/session-client-general-service-behaviour.md)
