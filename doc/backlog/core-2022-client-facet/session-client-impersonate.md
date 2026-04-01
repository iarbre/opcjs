# Session Client Impersonate

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ✅ Implemented  

## Description

The Session Client Impersonate conformance unit requires the client to provide an explicit workflow for switching the user identity of an established session without creating a new session.

This is achieved by calling `ActivateSession` on an already-active session with a different `userIdentityToken`.

### Use case

A single long-lived session is shared (e.g. a background service) but different operations must run under different user contexts:
- A read-only background poller runs as `Anonymous`.
- On user interaction, the session switches to a `UserName` or `Certificate` identity for write access.
- After the operation, the session switches back.

### ActivateSession re-call semantics (OPC 10000-4 §5.7.3)

`ActivateSession` may be called on an already-active session (same `authenticationToken`).  
- The session stays alive; only the user identity changes.
- The server may impose restrictions on identity switching (e.g. only within the same user account).
- The server may reject the call with `Bad_IdentityTokenRejected` or `Bad_IdentityTokenInvalid`.

### Identity token types

| Token Type | OPC UA Type | Description |
|-----------|-------------|-------------|
| Anonymous | `AnonymousIdentityToken` | No user credentials |
| Username + Password | `UserNameIdentityToken` | Username and password (should be encrypted) |
| X.509 Certificate | `X509IdentityToken` | Client-side user certificate |
| Issued Token | `IssuedIdentityToken` | JWT, SAML, or other issued token (OAuth2) |

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.7.3 | ActivateSession | Re-calling ActivateSession with a new identity token |
| OPC 10000-4 §7.36 | UserIdentityToken | Union type for all token variants |
| OPC 10000-4 §7.36.3 | UserNameIdentityToken | Username/password token, including encryption |
| OPC 10000-4 §7.36.4 | X509IdentityToken | Certificate-based user identity |
| OPC 10000-6 §6.5.2 | User token security | Token encryption and signing requirements |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.7.3  
Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/7.36

## Current State

✅ Implemented.

`Client.impersonate(identity)` calls `ActivateSession` with the new identity token on the current
session (no new session is created). The new identity is also stored so that any subsequent
auto-reconnect or session refresh uses it instead of the original identity.

`Session.impersonate(identity)` is the lower-level entry point; it delegates to
`Session.activateSession()` which handles `IssuedToken` callback resolution.

## Related Conformance Units

- [Session Client Base](./session-client-base.md)
- [Security Administration](./security-administration.md)
- [User Token – Anonymous Client](../user-token-anonymous-client/security-user-anonymous-client.md)
