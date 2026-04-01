# SymmetricSignatureAlgorithm_None

**Facet**: SecurityPolicy – None  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

Under `SecurityPolicy#None`, no symmetric Message Authentication Code (MAC) is appended to MSG-type message chunks. The integrity of individual messages is not protected.

In secure policies (e.g. Basic256Sha256, which uses HMAC-SHA2-256), a MAC is appended to every chunk after the (optionally encrypted) body. Under SecurityPolicy None no MAC is generated or verified.

### Algorithm URI

`urn:opcua:security:mac:None`  
(effectively null — no algorithm)

### MAC position in chunk

In secure policies the MAC is the final bytes of a chunk, calculated over the entire chunk (including header, sequence header, body, and padding). Under SecurityPolicy None the chunk ends immediately after the body — no MAC bytes are appended.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 §6.1 | SecurityPolicy None | Symmetric signature algorithm = None |
| OPC 10000-6 §6.7.4 | Symmetric signature of MSG chunks | MAC calculation and verification |

Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.1  
Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.4

## Implementation

**File**: `src/secureChannel/securityPolicyNone.ts`

- `symmetricSign(data)` → returns empty `Uint8Array` (zero-length MAC).
- `symmetricVerify(data, mac)` → always returns `true` (no validation).

## Related Conformance Units

- [SymmetricEncryptionAlgorithm_None](./symmetric-encryption-algorithm-none.md)
- [SecurityPolicy_None_Limits](./security-policy-none-limits.md)
