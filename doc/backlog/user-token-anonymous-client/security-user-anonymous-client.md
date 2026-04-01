# Security User Anonymous Client

**Facet**: User Token – Anonymous Client  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

This conformance unit requires the client to be able to authenticate with an OPC UA server using an anonymous identity — i.e. without providing any username, password, or certificate.

The client does this by sending an `AnonymousIdentityToken` in the `ActivateSession` service call.

### AnonymousIdentityToken (OPC 10000-4 §7.36.2)

The `AnonymousIdentityToken` is the simplest identity token:

| Field | Type | Description |
|-------|------|-------------|
| `policyId` | String | The `policyId` from the server's `UserTokenPolicy` array that describes the anonymous token. May be empty if the server advertises only one anonymous policy. |

The `policyId` must match one of the policies reported by the server in `CreateSessionResponse.serverEndpoints[].userIdentityTokens[]` with `tokenType = Anonymous`.

### Server-side check

Not all servers allow anonymous access. If the server does not include an `Anonymous` token policy in its endpoint description, the client must not attempt anonymous `ActivateSession`. In that case the client should fall back to another token type or report an appropriate error.

### ActivateSession with anonymous identity

```
ActivateSessionRequest {
  requestHeader: { authenticationToken: ..., ... },
  clientSignature: { algorithm: "", signature: null },
  userIdentityToken: AnonymousIdentityToken { policyId: "" },
  userTokenSignature: { algorithm: "", signature: null }
}
```

### Discovery of anonymous policy

The server advertises user token policies per endpoint in `GetEndpointsResponse` and in `CreateSessionResponse.serverEndpoints`.  
The client should:
1. Read the `userIdentityTokens` array for the selected endpoint.
2. Find an entry with `tokenType = Anonymous` (value 0).
3. Use its `policyId` in the `AnonymousIdentityToken`.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.7.3 | ActivateSession | `userIdentityToken` parameter |
| OPC 10000-4 §7.36 | UserIdentityToken | Union type; anonymous is the simplest variant |
| OPC 10000-4 §7.36.2 | AnonymousIdentityToken | Data type definition |
| OPC 10000-4 §7.37 | UserTokenPolicy | How the server advertises accepted token types |
| OPC 10000-4 §7.37 Table | UserTokenType enumeration | 0 = Anonymous, 1 = UserName, 2 = Certificate, 3 = IssuedToken |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/7.36.2  
Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/7.37

## Implementation

**File**: `src/userIdentity.ts`

- `UserIdentity.newAnonymous()` — factory method creating `AnonymousIdentityToken` with `policyId = ""`.
- Used as the default identity in `sessionHandler.ts` when no other identity is provided by the caller.

## Related Conformance Units

- [Session Client Base](../core-2022-client-facet/session-client-base.md)
- [Session Client Impersonate](../core-2022-client-facet/session-client-impersonate.md) — switching to/from anonymous
- [Security Administration](../core-2022-client-facet/security-administration.md) — `allowedUserTokenTypes` controls which tokens are permitted
