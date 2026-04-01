# Time Sync – OS Based Support

**Facet**: Security Time Synchronization  
**Type**: Optional  
**Status**: ✅ Implemented (satisfies required "Time Sync – Support" CU)  

## Description

The Time Sync – OS Based Support conformance unit states that the application relies on the host operating system's time synchronization service to maintain accurate UTC time.

No application-level code is needed: any runtime environment that keeps the OS clock synchronised via NTP or an equivalent mechanism satisfies this CU by definition. The client must document this dependency.

### OS time sync mechanisms

| OS / Runtime | Default mechanism |
|-------------|-------------------|
| Linux (systemd) | `systemd-timesyncd` (NTP) or `chrony` |
| Linux (non-systemd) | `ntpd` |
| Windows | Windows Time Service (W32tm, NTP) |
| macOS | `timed` (SNTP) |
| Node.js / Browser | Inherits from the host OS |
| Docker containers | Inherits from the container host OS |

### Deployment requirements

When deploying this OPC UA client, operators must ensure that:
1. The host machine has NTP or equivalent time synchronisation configured and active.
2. The NTP servers are reachable from the deployment network.
3. The clock drift is within ±5 minutes (per server tolerance) at all times.

### JavaScript / TypeScript constraint

In browser environments, `Date.now()` returns the OS clock time (or the browser's internal clock, which should track the OS). There is no browser API to directly control time synchronisation; the browser inherits accuracy from the OS.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-7 §8 | Time Synchronization | OS-based support CU definition |
| OPC 10000-4 §7.28 | RequestHeader.timestamp | Where the client timestamp appears |

Online: https://reference.opcfoundation.org/Core/Part7/v105/docs/

## Implementation

**File**: `README.md` — "Time Synchronisation" section  

All `RequestHeader.timestamp` values are generated with `new Date()` (JavaScript), which uses the OS clock.  
No manual NTP client, clock-skew adjustment, or UA-based time sync is implemented.

## Related Conformance Units

- [Time Sync – Support](./time-sync-support.md) ← this CU satisfies the required one
- [Time Sync – Configure Clock Skew](./time-sync-configure-clock-skew.md) (not implemented — alternative approach)
- [Time Sync – UA based support](./time-sync-ua-based.md) (not implemented — alternative approach)
