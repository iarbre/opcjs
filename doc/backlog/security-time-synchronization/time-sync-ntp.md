# Time Sync – NTP

**Facet**: Security Time Synchronization  
**Type**: Optional  
**Status**: ❌ Not explicitly implemented (implied by OS-based support)  

## Description

This conformance unit requires the client application to directly use NTP (Network Time Protocol, RFC 5905) to synchronise its clock, rather than relying solely on the OS to manage NTP.  
The distinction from [Time Sync – OS Based Support](./time-sync-os-based.md) is that here the **application itself** is responsible for NTP configuration and synchronisation, not the operator.

### Typical use cases

- Embedded environments where the OS does not run `ntpd` / `timesyncd`.
- Browser-based clients that need guaranteed NTP accuracy beyond what the OS provides.
- Testing / CI environments where the system clock is deliberately frozen.

### Implementation options for a TypeScript client

| Approach | Notes |
|----------|-------|
| Node.js: shell-out to `ntpdate` / `chronyd` | Only works in privileged Node.js environments |
| Node.js: UDP NTP packet exchange | Custom NTP client implementation using `dgram` |
| Browser: N/A | Browsers have no UDP access; NTP is the OS's responsibility |

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-7 §8 | Time Synchronization | NTP optional CU |
| RFC 5905 | NTPv4 | Network Time Protocol version 4 specification |

Online: https://reference.opcfoundation.org/Core/Part7/v105/docs/  
External: https://datatracker.ietf.org/doc/html/rfc5905

## Implementation Gap

The client relies on the OS NTP configuration (satisfying [OS Based Support](./time-sync-os-based.md)) but does not configure or issue NTP queries itself.

## Work Required

This CU is of low priority for a browser/Node.js client. If needed:
1. Add an optional `ntpServers: string[]` to `ClientConfiguration`.
2. Implement a lightweight NTP query (single `Mode 3` UDP packet) using Node.js `dgram`.
3. Calculate the offset and apply it as a `clockSkewMs` correction (see [Configure Clock Skew](./time-sync-configure-clock-skew.md)).
4. Schedule periodic NTP re-sync.

Note: this is not applicable in browser environments where UDP is unavailable.

## Related Conformance Units

- [Time Sync – Support](./time-sync-support.md)
- [Time Sync – OS Based Support](./time-sync-os-based.md)
- [Time Sync – Configure Clock Skew](./time-sync-configure-clock-skew.md)
