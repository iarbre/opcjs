# Time Sync – IEEE 1588 PTP

**Facet**: Security Time Synchronization  
**Type**: Optional  
**Status**: ❌ Not implemented  

## Description

IEEE 1588 Precision Time Protocol (PTP) is a network protocol for clock synchronisation with sub-microsecond accuracy, used primarily in industrial automation and real-time control systems.

An OPC UA client claiming this conformance unit must use a PTP-synchronised clock source for generating `RequestHeader.timestamp` values.

### Typical deployment

- A PTP grandmaster clock (often GPS-disciplined) is present on the network.
- All nodes synchronise to it via the `ptpd` or `linuxptp` daemon.
- The OS clock (`CLOCK_REALTIME` on Linux) is disciplined by the PTP daemon.
- Applications using `Date.now()` / `new Date()` automatically benefit from PTP accuracy.

### Relevance to this client

For a JavaScript/TypeScript client running on Node.js or in a browser, PTP support is entirely an OS-level concern. If the host OS is PTP-synchronised, this CU is effectively satisfied. The CU requires the application to **document** that it supports PTP-synchronised hosts.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-7 §8 | Time Synchronization | IEEE 1588 PTP optional CU |
| IEEE 1588-2019 | — | Standard for precision clock synchronization |

Online: https://reference.opcfoundation.org/Core/Part7/v105/docs/  
External: https://standards.ieee.org/ieee/1588/10825/

## Implementation Gap

No documentation of PTP support. The client does not verify or document whether the host OS is PTP-synchronised.

## Work Required

1. Add a note to the README documenting that the client is compatible with PTP-synchronised hosts.
2. Consider adding a runtime warning if the measured round-trip time from `GetEndpoints` suggests a clock mismatch greater than a configurable threshold.

## Related Conformance Units

- [Time Sync – Support](./time-sync-support.md)
- [Time Sync – OS Based Support](./time-sync-os-based.md)
