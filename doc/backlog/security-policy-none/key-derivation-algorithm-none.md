# KeyDerivationAlgorithm_None

**Facet**: SecurityPolicy – None  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

Under `SecurityPolicy#None`, no symmetric keys are derived after `OpenSecureChannel`.  
There are no encryption keys, signing keys, or initialisation vectors for MSG-type chunks.

In policies that use security (e.g. Basic256Sha256), keys are derived from the client and server nonces using a PBKDF-like pseudo-random function (PRF) defined in OPC 10000-6. Under SecurityPolicy None this step is skipped entirely.

### Algorithm URI

`urn:opcua:security:keyDerivation:None`  
(effectively null — no algorithm)

### Impact on nonces

Because no key derivation occurs:
- `clientNonce` in `OpenSecureChannelRequest` must be null.
- `serverNonce` in `OpenSecureChannelResponse` is null or empty.
- No `clientNonce` is sent in `CreateSessionRequest`.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 §6.1 | Security Policies | Key derivation algorithms by policy |
| OPC 10000-6 §6.7.5 | Key derivation | PRF construction for secure policies |

Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.1  
Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.5

## Implementation

**File**: `src/secureChannel/securityPolicyNone.ts`

- `deriveKeys()` → returns a null or empty key set immediately.
- Nonce fields are set to null in `OpenSecureChannel` and `CreateSession` requests.

## Related Conformance Units

- [AsymmetricEncryptionAlgorithm_None](./asymmetric-encryption-algorithm-none.md)
- [SymmetricEncryptionAlgorithm_None](./symmetric-encryption-algorithm-none.md)
