# SecurityPolicy_None_Limits

**Facet**: SecurityPolicy – None  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

Under `SecurityPolicy#None`, all cryptographic key and signature sizes are zero. This conformance unit defines the limit values the client must use or accept.

### Key length limits

| Parameter | Value under SecurityPolicy None |
|-----------|-------------------------------|
| Asymmetric signature key length | 0 bytes |
| Asymmetric encryption key length | 0 bytes |
| Symmetric signature key length | 0 bytes |
| Symmetric encryption key length | 0 bytes |
| Symmetric key block size | 1 byte (no padding needed) |
| Asymmetric plain text block size | Unlimited (no asymmetric encryption) |
| Asymmetric cipher text block size | 0 bytes |

These limits are used by the SecureChannel layer to:
- Determine the security header size when calculating maximum payload per chunk.
- Determine how much padding to add to align encrypted blocks (none, when key length = 0).

### Maximum chunk payload under SecurityPolicy None

With no security overhead the maximum payload per chunk is:

```
maxBodySize = min(sendBufferSize, receiveBufferSize) − headerSize
```

Where `headerSize` for MSG frames under SecurityPolicy None is:
- 8 bytes UA-TCP header
- 4 bytes SecureChannelId
- 4 bytes SecurityTokenId
- 4 bytes SequenceNumber
- 4 bytes RequestId
= **24 bytes total overhead**

(No security header, padding, or signature bytes are added.)

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 §6.1 | SecurityPolicy None | Null algorithm specifications |
| OPC 10000-6 §6.7.2 | Message chunk header | Size calculation for security overhead |

Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.1

## Implementation

**File**: `src/secureChannel/securityPolicyNone.ts`

All key length constants are 0. Chunk size calculation in `SecureChannelChunkWriter` uses the correct 24-byte overhead for SecurityPolicy None.

## Related Conformance Units

- [AsymmetricEncryptionAlgorithm_None](./asymmetric-encryption-algorithm-none.md)
- [SymmetricEncryptionAlgorithm_None](./symmetric-encryption-algorithm-none.md)
- [UA Secure Conversation](../ua-tcp-ua-sc-ua-binary/ua-secure-conversation.md)
