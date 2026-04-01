# AsymmetricEncryptionAlgorithm_None

**Facet**: SecurityPolicy – None  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

When `SecurityPolicy#None` is negotiated, no asymmetric encryption is applied.  
The `AsymmetricEncryptionAlgorithm` field in OPN message headers must be an empty string (or absent).

The body of `OpenSecureChannel` messages is sent in plaintext.  
No certificate-based encryption key exchange is performed.

### Algorithm URI

This conformance unit uses the algorithm URI:  
`urn:opcua:security:encryption:None`  
(effectively empty/null — no algorithm is specified)

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 §6.1 | Security Policies | Table listing SecurityPolicy None and its null algorithms |
| OPC 10000-6 §6.7.2 | OPN message header | `SecurityPolicyUri`, `SenderCertificate`, `ReceiverCertificateThumbprint` |

Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.1

## Implementation

**File**: `src/secureChannel/securityPolicyNone.ts`

- `encrypt(data)` → returns `data` unchanged (no-op).
- `decrypt(data)` → returns `data` unchanged (no-op).
- `AsymmetricEncryptionUri` = `""`.

## Related Conformance Units

- [AsymmetricSignatureAlgorithm_None](./asymmetric-signature-algorithm-none.md)
- [UA Secure Conversation](../ua-tcp-ua-sc-ua-binary/ua-secure-conversation.md)
