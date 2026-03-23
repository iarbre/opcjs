
---

## A. Core 2022 Client Facet — Required Conformance Units

| Done | Conformance Unit | Status | Notes |
|------|-----------------|--------|-------|
| ✅ | Address Space Client NodeId IdTypes | Done | All 4 types (Numeric, String, Guid, Opaque) in `nodeId.ts` |
| ❌ | Documentation – Core Capacities | Missing | Document number of supported SecureChannels, Sessions, ContinuationPoints, Subscriptions, etc. |
| ✅ | Security Administration | Done | `SecurityConfiguration` type in `securityConfiguration.ts`. Enforced in `client.ts` (`allowSecurityPolicyNone`, `messageSecurityMode`) and `sessionHandler.ts` (`allowedUserTokenTypes`). `trustedCAs` / `unknownCertificatePolicy` stored for future cert-based security. |
| ✅ | Session Client Auto Reconnect | Done | `withSessionRefresh()` in `client.ts` catches `SessionInvalidError` AND transport-level errors. On transport error it calls `reconnectAndReactivate()`: reopens the channel, tries `ActivateSession` on the existing session, and only creates a brand-new session if that fails. |
| ⚠️ | Session Client Base | Partial | `CreateSession` ✅, `ActivateSession` ✅, **`CloseSession` ❌ not implemented** — `disconnect()` in `client.ts` is a stub. |
| ✅ | Session Client General Service Behaviour | Done | Auth token, requestHandle, and serviceResult evaluation all handled in `serviceBase.ts`. |
| ⚠️ | Session Client KeepAlive | Partial | Keep-alive only happens through the Publish loop. If no subscription is active, **nothing keeps the session alive**. A dedicated periodic keep-alive is required. |

## A. Core 2022 Client Facet — Optional Conformance Units

| Done | Conformance Unit | Status | Notes |
|------|-----------------|--------|-------|
| ❌ | Base Info Client Currency | Not impl | No CurrencyUnit Property handling |
| ❌ | Base Info Client Estimated Return Time | Not impl | Reconnect logic does not read the EstimatedReturnTime property |
| ❌ | Base Info Client Selection List | Not impl | No SelectionListType awareness |
| ❌ | Base Services Client Diagnostics | Not impl | `returnDiagnostics = 0` hardcoded everywhere; DiagnosticInfo types exist but are unused |
| ❌ | Security Admin – Certificate Management | Not impl | No cert store / trust list management |
| ❌ | Session Client Cancel | Not impl | CancelRequest type exists in schema but there is no client-level API |
| ❌ | Session Client Detect Shutdown | Not impl | No ServerStatus/State monitoring |
| ⚠️ | Session Client Impersonate | Partial | ActivateSession can switch identity but there is no explicit impersonation workflow |
| ❌ | Session Client Renew NodeIds | Not impl | No namespace table change detection |

---

## B. UA-TCP UA-SC UA-Binary — Required Conformance Units

| Done | Conformance Unit | Status | Notes |
|------|-----------------|--------|-------|
| ✅ | Protocol UA TCP | Done | Hello/Ack in `tcpConnectionHandler.ts` |
| ✅ | UA Binary Encoding | Done | Full codec in `binaryReader.ts` / `binaryWriter.ts` |
| ✅ | UA Secure Conversation | Done | `secureChannelFacade.ts` with chunking and token renewal at 75% of lifetime |

---

## C. SecurityPolicy – None — Required Conformance Units

| Done | Conformance Unit | Status | Notes |
|------|-----------------|--------|-------|
| ✅ | AsymmetricEncryptionAlgorithm_None | Done | No-op in `securityPolicyNone.ts` |
| ✅ | AsymmetricSignatureAlgorithm_None | Done | No-op |
| ✅ | KeyDerivationAlgorithm_None | Done | No-op |
| ✅ | Security None CreateSession ActivateSession | Done | `clientNonce = null`, `clientCertificate = null`; null/empty signatures |
| ✅ | SecurtyPolicy_None_Limits | Done | Signature key length = 0 |
| ✅ | SymmetricEncryptionAlgorithm_None | Done | No-op |
| ✅ | SymmetricSignatureAlgorithm_None | Done | No-op |
| ❌ | Security None CreateSession ActivateSession 1.0 *(optional)* | Not impl | No fallback-with-cert retry logic when server requires a certificate |

---

## D. Security Time Synchronization — Required Conformance Units

| Done | Conformance Unit | Notes |
|------|-----------------|-------|
| ❌ | **Time Sync – Support** *(required — must satisfy at least one optional CU below)* | **No time sync mechanism at all.** |
| ❌ | Time Sync – Configure Clock Skew *(optional)* | |
| ❌ | Time Sync – IEEE 1588 PTP *(optional)* | |
| ❌ | Time Sync – IEEE 802.1AS *(optional)* | |
| ❌ | Time Sync – NTP *(optional)* | |
| ⚠️ | Time Sync – OS based support *(optional)* | Implicitly satisfied if running on an OS with NTP, but not documented or explicitly claimed. Cheapest path to satisfying "Time Sync – Support". |
| ❌ | Time Sync – UA based support *(optional)* | |

---

## E. User Token – Anonymous Client — Required Conformance Units

| Done | Conformance Unit | Status | Notes |
|------|-----------------|--------|-------|
| ✅ | Security User Anonymous Client | Done | `UserIdentity.newAnonymous()` in `userIdentity.ts` |

---

## Prioritised Backlog

### P0 — Blocking required conformance units (must be implemented)

- [x] **CloseSession** — implement `CloseSessionRequest` in `sessionService.ts` and wire into `client.disconnect()`.
- [x] **Session KeepAlive without subscriptions** — add a dedicated keep-alive timer that reads `Server_ServerStatus` (or a similar cheap node) at regular intervals when no subscription is active.
- [x] **Auto Reconnect – ActivateSession on existing session** — when the SecureChannel drops but the session timeout has not expired, attempt `ActivateSession` on a new channel before creating a brand-new session.
- [ ] **Documentation – Core Capacities** — add a section to the README stating the supported number of SecureChannels, Sessions, ContinuationPoints, etc.
- [ ] **Time Sync – OS based support (claim)** — document that the client relies on the OS system clock (NTP / systemd-timesyncd) so the "Time Sync – Support" required CU is satisfied.

### P1 — Required conformance units (substantial gaps)

- [x] **Security Administration** — introduce a `SecurityConfiguration` type to configure: user-token policies, enable/disable SecurityPolicy None, MessageSecurityMode selection, trusted CAs, and unknown-certificate policy.

### P2 — Optional conformance units (nice to have)

- [ ] **Service diagnostics** — expose `returnDiagnostics` in the request options so callers can request diagnostic info.
- [ ] **Session Cancel** — expose `CancelRequest` as a client API.
- [ ] **Detect Server Shutdown** — monitor `ServerStatus/State` and trigger a reconnect when a server shutdown is announced.
- [ ] **Session Impersonate** — add an explicit `impersonate(identity)` method that calls `ActivateSession` with a different identity token.
- [ ] **Renew NodeIds** — track the NamespaceTable after session establishment and detect/recalculate NodeId Namespace Indices when it changes.
- [ ] **EstimatedReturnTime** — read `Server/ServerStatus/EstimatedReturnTime` during reconnect logic to schedule the next retry intelligently.
- [ ] **CurrencyUnit Property** — handle `CurrencyUnitType` on DataVariables that represent currency values.
- [ ] **SelectionListType** — recognise and expose `SelectionListType` variables to the application layer.
- [ ] **Security None with cert fallback** — if the server rejects CreateSession without a certificate, retry with an ApplicationInstanceCertificate.