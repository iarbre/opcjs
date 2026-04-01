# OPC UA Client – Conformance Backlog

This directory tracks implementation status against OPC UA 1.05 conformance requirements, organised by facet.  
Each facet has its own folder; each conformance unit has its own document.

## Facets

| Folder | Facet | Required by | Required CUs | Optional CUs |
|--------|-------|-------------|--------------|--------------|
| [core-2022-client-facet/](./core-2022-client-facet/) | Core 2022 Client Facet | Minimum UA Client 2022 Profile | 7 / 7 ✅ | 2 ✅ · 1 ⚠️ · 6 ❌ |
| [ua-tcp-ua-sc-ua-binary/](./ua-tcp-ua-sc-ua-binary/) | UA-TCP UA-SC UA-Binary | Core 2022 Client Facet (dependency) | 3 / 3 ✅ | — |
| [security-policy-none/](./security-policy-none/) | SecurityPolicy – None | Core 2022 Client Facet (dependency) | 7 / 7 ✅ | 1 / 1 ✅ |
| [security-time-synchronization/](./security-time-synchronization/) | Security Time Synchronization | Core 2022 Client Facet (dependency) | 1 / 1 ✅ | 1 ✅ · 5 ❌ |
| [user-token-anonymous-client/](./user-token-anonymous-client/) | User Token – Anonymous Client | Core 2022 Client Facet (dependency) | 1 / 1 ✅ | — |

### Conformance Unit Detail

#### Core 2022 Client Facet — Required

| Status | Conformance Unit |
|--------|-----------------|
| ✅ | [Address Space Client NodeId IdTypes](./core-2022-client-facet/address-space-client-nodeid-idtypes.md) |
| ✅ | [Documentation – Core Capacities](./core-2022-client-facet/documentation-core-capacities.md) |
| ✅ | [Security Administration](./core-2022-client-facet/security-administration.md) |
| ✅ | [Session Client Auto Reconnect](./core-2022-client-facet/session-client-auto-reconnect.md) |
| ✅ | [Session Client Base](./core-2022-client-facet/session-client-base.md) |
| ✅ | [Session Client General Service Behaviour](./core-2022-client-facet/session-client-general-service-behaviour.md) |
| ✅ | [Session Client KeepAlive](./core-2022-client-facet/session-client-keepalive.md) |

#### Core 2022 Client Facet — Optional

| Status | Conformance Unit |
|--------|-----------------|
| ✅ | [Base Info Client Currency](./core-2022-client-facet/base-info-client-currency.md) |
| ✅ | [Base Info Client Estimated Return Time](./core-2022-client-facet/base-info-client-estimated-return-time.md) |
| ❌ | [Base Info Client Selection List](./core-2022-client-facet/base-info-client-selection-list.md) |
| ✅ | [Base Services Client Diagnostics](./core-2022-client-facet/base-services-client-diagnostics.md) |
| ❌ | [Security Admin – Certificate Management](./core-2022-client-facet/security-admin-certificate-management.md) |
| ✅ | [Session Client Cancel](./core-2022-client-facet/session-client-cancel.md) |
| ❌ | [Session Client Detect Shutdown](./core-2022-client-facet/session-client-detect-shutdown.md) |
| ⚠️ | [Session Client Impersonate](./core-2022-client-facet/session-client-impersonate.md) |
| ❌ | [Session Client Renew NodeIds](./core-2022-client-facet/session-client-renew-nodeids.md) |

#### UA-TCP UA-SC UA-Binary — Required

| Status | Conformance Unit |
|--------|-----------------|
| ✅ | [Protocol UA TCP](./ua-tcp-ua-sc-ua-binary/protocol-ua-tcp.md) |
| ✅ | [UA Binary Encoding](./ua-tcp-ua-sc-ua-binary/ua-binary-encoding.md) |
| ✅ | [UA Secure Conversation](./ua-tcp-ua-sc-ua-binary/ua-secure-conversation.md) |

#### SecurityPolicy – None — Required

| Status | Conformance Unit |
|--------|-----------------|
| ✅ | [AsymmetricEncryptionAlgorithm_None](./security-policy-none/asymmetric-encryption-algorithm-none.md) |
| ✅ | [AsymmetricSignatureAlgorithm_None](./security-policy-none/asymmetric-signature-algorithm-none.md) |
| ✅ | [KeyDerivationAlgorithm_None](./security-policy-none/key-derivation-algorithm-none.md) |
| ✅ | [Security None CreateSession ActivateSession](./security-policy-none/security-none-create-activate-session.md) |
| ✅ | [SecurityPolicy_None_Limits](./security-policy-none/security-policy-none-limits.md) |
| ✅ | [SymmetricEncryptionAlgorithm_None](./security-policy-none/symmetric-encryption-algorithm-none.md) |
| ✅ | [SymmetricSignatureAlgorithm_None](./security-policy-none/symmetric-signature-algorithm-none.md) |

#### SecurityPolicy – None — Optional

| Status | Conformance Unit |
|--------|-----------------|
| ✅ | [Security None CreateSession ActivateSession 1.0](./security-policy-none/security-none-create-activate-session-v1.md) |

#### Security Time Synchronization — Required

| Status | Conformance Unit |
|--------|-----------------|
| ✅ | [Time Sync – Support](./security-time-synchronization/time-sync-support.md) *(satisfied via OS-based support)* |

#### Security Time Synchronization — Optional

| Status | Conformance Unit |
|--------|-----------------|
| ❌ | [Time Sync – Configure Clock Skew](./security-time-synchronization/time-sync-configure-clock-skew.md) |
| ❌ | [Time Sync – IEEE 1588 PTP](./security-time-synchronization/time-sync-ieee-1588-ptp.md) |
| ❌ | [Time Sync – IEEE 802.1AS](./security-time-synchronization/time-sync-ieee-802-1as.md) |
| ❌ | [Time Sync – NTP](./security-time-synchronization/time-sync-ntp.md) |
| ✅ | [Time Sync – OS Based Support](./security-time-synchronization/time-sync-os-based.md) |
| ❌ | [Time Sync – UA Based Support](./security-time-synchronization/time-sync-ua-based.md) |

#### User Token – Anonymous Client — Required

| Status | Conformance Unit |
|--------|-----------------|
| ✅ | [Security User Anonymous Client](./user-token-anonymous-client/security-user-anonymous-client.md) |

## Specification References

| Part | Title | URL |
|------|-------|-----|
| OPC 10000-1 | Overview and Concepts | https://reference.opcfoundation.org/Core/Part1/v105/docs/ |
| OPC 10000-2 | Security Model | https://reference.opcfoundation.org/Core/Part2/v105/docs/ |
| OPC 10000-3 | Address Space Model | https://reference.opcfoundation.org/Core/Part3/v105/docs/ |
| OPC 10000-4 | Services | https://reference.opcfoundation.org/Core/Part4/v105/docs/ |
| OPC 10000-5 | Information Model | https://reference.opcfoundation.org/Core/Part5/v105/docs/ |
| OPC 10000-6 | Mappings | https://reference.opcfoundation.org/Core/Part6/v105/docs/ |
| OPC 10000-7 | Profiles | https://reference.opcfoundation.org/Core/Part7/v105/docs/ |

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Implemented and tested |
| ⚠️ | Partially implemented |
| ❌ | Not yet implemented |
