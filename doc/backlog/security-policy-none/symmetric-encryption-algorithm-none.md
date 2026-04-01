# SymmetricEncryptionAlgorithm_None

**Facet**: SecurityPolicy – None  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

Under `SecurityPolicy#None`, no symmetric encryption is applied to MSG-type message chunks. Message bodies are transmitted in plaintext.

In secure policies (e.g. Basic256Sha256), symmetric encryption with AES-256-CBC is applied to each chunk body after the sequence number. Under SecurityPolicy None this step is skipped.

### Algorithm URI

`urn:opcua:security:sysmetricEncryption:None`  
(effectively null — no algorithm)

### Encryption position in chunk

In secure policies the encrypted region of a MSG chunk starts after the 4-byte `SecurityTokenId` field and covers:
- Sequence header (8 bytes)
- Body
- Padding (if any)

Under SecurityPolicy None the entire chunk body is unencrypted.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 §6.1 | SecurityPolicy None | Symmetric encryption algorithm = None |
| OPC 10000-6 §6.7.3 | Symmetric encryption of MSG chunks | Encryption position and algorithm |

Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.1  
Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.3

## Implementation

**File**: `src/secureChannel/securityPolicyNone.ts`

- `symmetricEncrypt(data)` → returns `data` unchanged.
- `symmetricDecrypt(data)` → returns `data` unchanged.

## Related Conformance Units

- [SymmetricSignatureAlgorithm_None](./symmetric-signature-algorithm-none.md)
- [KeyDerivationAlgorithm_None](./key-derivation-algorithm-none.md)
