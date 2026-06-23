# Session Client Auto Reconnect

**Facet**: Base Client Behaviour Facet  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

The client must automatically reconnect after a disconnection without requiring user intervention.

**Client responsibilities**:
- **SecureChannel renewal failure**: if the secure channel is no longer valid but the session is still valid, re-activate the session on a new secure channel using `ActivateSession`.
- **Session expiry**: if the session is no longer valid, create a new session (`CreateSession` + `ActivateSession`) and restore subscriptions.
- **Publish loop error**: when the publish loop terminates due to a transport error (e.g. `Bad_NoCommunication`), the client reconnects and restarts the loop automatically so notifications resume without requiring re-subscription.

See also: [Session Client Auto Reconnect in Core 2022 Client Facet](../core-2022-client-facet/session-client-auto-reconnect.md) — same CU, same implementation.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 | §5.7.3 | ActivateSession |
| OPC 10000-4 | §5.7.2 | CreateSession |
| profiles.opcfoundation.org | [CU 2200](https://profiles.opcfoundation.org/conformanceunit/2200) | Session Client Auto Reconnect |
