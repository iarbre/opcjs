# Security None CreateSession ActivateSession 1.0

**Facet**: SecurityPolicy – None  
**Type**: Optional  
**Status**: ✅ Implemented  

## Description

This optional conformance unit covers a specific compatibility scenario from OPC UA 1.0 servers:  
Some older OPC UA 1.0 servers require a client certificate in `CreateSession` even when `SecurityPolicy#None` is negotiated, and reject the session if no certificate is provided.

When a server returns `Bad_CertificateInvalid`, `Bad_SecurityChecksFailed`, or `Bad_NoValidCertificates` in response to a `CreateSessionRequest` sent without a certificate (as the required [Security None CreateSession ActivateSession](./security-none-create-activate-session.md) CU mandates), the client may retry the `CreateSession` with an `ApplicationInstanceCertificate`.

### Retry flow

1. Client sends `CreateSessionRequest` with `clientCertificate = null`.
2. Server returns `Bad_CertificateInvalid` / `Bad_SecurityChecksFailed` / `Bad_NoValidCertificates`.
3. Client throws a `CertificateRequiredError` to signal the certificate-required condition.
4. If an `applicationInstanceCertificate` is configured in `SecurityConfiguration`, `SessionHandler.createNewSession()` catches the error and retries with the certificate populated.
5. If no certificate is configured, the error propagates to the caller.

### Error codes that trigger retry

| StatusCode | Description |
|-----------|-------------|
| `Bad_CertificateInvalid` | 0x80120000 — The certificate provided was not valid |
| `Bad_SecurityChecksFailed` | 0x80130000 — Security checks failed |
| `Bad_NoValidCertificates` | 0x80270000 — No valid certificates found |

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.7.2 | CreateSession | `clientCertificate` field and error handling |
| OPC 10000-4 Table 176 | Common result codes | `Bad_CertificateInvalid`, `Bad_SecurityChecksFailed` |
| OPC 10000-6 §6.1 | SecurityPolicy None | Compatibility notes |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.7.2

## Implementation

**Files**:
- `src/sessions/certificateRequiredError.ts` — `CertificateRequiredError` class
- `src/sessions/sessionHandler.ts` — `createNewSession()` catches `CertificateRequiredError` and retries with `securityConfiguration.applicationInstanceCertificate`

## Related Conformance Units

- [Security None CreateSession ActivateSession](./security-none-create-activate-session.md) (required, prerequisite)
- [Security Administration](../core-2022-client-facet/security-administration.md)
