# Security None CreateSession ActivateSession

**Facet**: SecurityPolicy – None  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

Under `SecurityPolicy#None`, the `CreateSession` and `ActivateSession` services omit all certificate and signature fields. This conformance unit defines the exact null/empty values the client must send.

### CreateSession constraints under SecurityPolicy None

| Field | Required value |
|-------|----------------|
| `clientCertificate` | Null ByteString |
| `clientNonce` | Null ByteString (no key material needed) |

The server may still return a `serverCertificate` and `serverSignature`. Under SecurityPolicy None the client should accept these fields without validation.

### ActivateSession constraints under SecurityPolicy None

| Field | Required value |
|-------|----------------|
| `clientSignature.algorithm` | Empty String |
| `clientSignature.signature` | Null ByteString |
| `userTokenSignature.algorithm` | Empty String (if present) |
| `userTokenSignature.signature` | Null ByteString (if present) |

### Server certificate received during CreateSession

Even under SecurityPolicy None, the server may send its certificate in `CreateSessionResponse.serverCertificate`. The client:
- Must not reject the response solely because a certificate is present.
- Should store the certificate for informational/diagnostic purposes.
- Must not attempt to validate the certificate unless a non-None security policy is active.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.7.2 | CreateSession | `clientCertificate` and `serverSignature` fields |
| OPC 10000-4 §5.7.3 | ActivateSession | `clientSignature` field |
| OPC 10000-6 §6.1 | SecurityPolicy None | Null algorithm requirements |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.7.2  
Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.7.3

## Implementation

**File**: `src/sessions/sessionHandler.ts` / `src/services/sessionService.ts`

- `clientNonce` set to `null` in `CreateSessionRequest`.
- `clientCertificate` set to `null` in `CreateSessionRequest`.
- `clientSignature.algorithm = ""` and `clientSignature.signature = null` in `ActivateSessionRequest`.

## Related Conformance Units

- [Security None CreateSession ActivateSession 1.0](./security-none-create-activate-session-v1.md) (optional)
- [AsymmetricSignatureAlgorithm_None](./asymmetric-signature-algorithm-none.md)
