# Security Time Synchronization

**Specification**: OPC 10000-7 §8 (Profiles), version 1.05  
**Category**: Security (dependency of Core 2022 Client Facet)  

## Overview

OPC UA timestamps embedded in every `RequestHeader` must reflect accurate UTC time. Servers may reject requests with timestamps that deviate significantly from server time. This facet defines conformance units for the various supported time synchronization mechanisms.

**At least one of the optional CUs below must be satisfied** to claim the required "Time Sync – Support" CU.

## Required Conformance Units

| Status | Document | Conformance Unit |
|--------|----------|-----------------|
| ✅ | [time-sync-support.md](./time-sync-support.md) | Time Sync – Support *(satisfied by OS-based support)* |

## Optional Conformance Units (one must be satisfied)

| Status | Document | Conformance Unit |
|--------|----------|-----------------|
| ❌ | [time-sync-configure-clock-skew.md](./time-sync-configure-clock-skew.md) | Time Sync – Configure Clock Skew |
| ❌ | [time-sync-ieee-1588-ptp.md](./time-sync-ieee-1588-ptp.md) | Time Sync – IEEE 1588 PTP |
| ❌ | [time-sync-ieee-802-1as.md](./time-sync-ieee-802-1as.md) | Time Sync – IEEE 802.1AS |
| ❌ | [time-sync-ntp.md](./time-sync-ntp.md) | Time Sync – NTP |
| ✅ | [time-sync-os-based.md](./time-sync-os-based.md) | Time Sync – OS based support |
| ❌ | [time-sync-ua-based.md](./time-sync-ua-based.md) | Time Sync – UA based support |
