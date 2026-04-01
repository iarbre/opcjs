# Time Sync – IEEE 802.1AS

**Facet**: Security Time Synchronization  
**Type**: Optional  
**Status**: ❌ Not implemented  

## Description

IEEE 802.1AS (Generalized Precision Time Protocol, gPTP) is a profile of IEEE 1588 PTP optimised for IEEE 802 bridged networks (Ethernet). It is the time synchronization layer of the IEEE Audio Video Bridging (AVB) / Time-Sensitive Networking (TSN) suite.

Like IEEE 1588, 802.1AS provides sub-microsecond accuracy and is managed at the operating system level.

An OPC UA client claiming this conformance unit must document that it can operate on 802.1AS-synchronised networks.

### Relevance to this client

For a JavaScript/TypeScript client the same reasoning as [IEEE 1588 PTP](./time-sync-ieee-1588-ptp.md) applies: 802.1AS support is an OS/hardware-level feature. If the host OS is synchronised via 802.1AS (e.g. via `gptp2d` on Linux), the JS runtime automatically uses the resulting accurate clock.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-7 §8 | Time Synchronization | IEEE 802.1AS optional CU |
| IEEE 802.1AS-2020 | — | Standard for timing and synchronization for time-sensitive applications |

Online: https://reference.opcfoundation.org/Core/Part7/v105/docs/  
External: https://standards.ieee.org/ieee/802.1AS

## Implementation Gap

No documentation of 802.1AS support.

## Related Conformance Units

- [Time Sync – Support](./time-sync-support.md)
- [Time Sync – IEEE 1588 PTP](./time-sync-ieee-1588-ptp.md)
- [Time Sync – OS Based Support](./time-sync-os-based.md)
