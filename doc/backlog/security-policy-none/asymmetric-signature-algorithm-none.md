# AsymmetricSignatureAlgorithm_None

**Facet**: SecurityPolicy – None  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

When `SecurityPolicy#None` is negotiated, no asymmetric signature is generated or validated for `OpenSecureChannel` messages or for the `clientSignature` / `serverSignature` fields in `CreateSession` / `ActivateSession`.

### Affected fields

| Service | Field | Behaviour under SecurityPolicy None |
|---------|-------|--------------------------------------|
| `OpenSecureChannel` OPN header | `SenderCertificate` | Empty ByteString |
| `OpenSecureChannel` OPN header | `ReceiverCertificateThumbprint` | Empty ByteString |
| `CreateSessionRequest` | `clientCertificate` | Null |
| `CreateSessionResponse` | `serverSignature.signature` | Null / zero-length |
| `ActivateSessionRequest` | `clientSignature.signature` | Null / zero-length |
| `ActivateSessionResponse` | N/A | No signature in response |

### Algorithm URI

Empty string (`""`).

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 §6.1 | Security Policies overview | SecurityPolicy None algorithm table |
| OPC 10000-4 §5.7.2 | CreateSession | `clientCertificate` and server signature |
| OPC 10000-4 §5.7.3 | ActivateSession | `clientSignature` field |

Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.1

## Implementation

**File**: `src/secureChannel/securityPolicyNone.ts`

- `sign(data)` → returns empty `Uint8Array` (zero-length signature).
- `verify(data, signature)` → always returns `true` (no validation).

## Related Conformance Units

- [Security None CreateSession ActivateSession](./security-none-create-activate-session.md)
