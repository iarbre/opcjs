# UA Secure Conversation

**Facet**: UA-TCP UA-SC UA-Binary  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

The UA Secure Conversation (UA-SC) layer sits between the UA-TCP transport and the session/service layer. It provides:

1. **Channel establishment** — OpenSecureChannel / CloseSecureChannel services.
2. **Message chunking** — large messages are split into chunks that fit within the negotiated buffer size.
3. **Sequence numbering** — each chunk carries a monotonically increasing sequence number for replay detection.
4. **Security token lifecycle** — tokens have a limited lifetime and must be renewed before expiry.
5. **Message security** — signing and/or encryption according to the negotiated security policy (for SecurityPolicy None this is a no-op).

### Channel types and message types

| MessageType | IsFinal | Description |
|-------------|---------|-------------|
| `OPN` | F | OpenSecureChannel request or response |
| `CLO` | F | CloseSecureChannel request |
| `MSG` | C | Intermediate chunk of a multi-chunk message |
| `MSG` | F | Final (or only) chunk of a message |
| `MSG` | A | Abort — discard all previously received chunks for this message |

### SecureChannel header (OPC 10000-6 §6.7.2)

After the 8-byte UA-TCP header, every MSG/OPN/CLO chunk carries:

| Field | Type | Description |
|-------|------|-------------|
| `SecureChannelId` | UInt32 | Server-assigned channel identifier |
| `SecurityTokenId` | UInt32 | Current security token (changes on renewal) |
| `SequenceHeader.SequenceNumber` | UInt32 | Monotonically increasing per-channel sequence number |
| `SequenceHeader.RequestId` | UInt32 | Client-assigned identifier tying chunks of the same request together |

### OpenSecureChannel (OPC 10000-4 §5.6.2)

Establishes a new SecureChannel.

**Request parameters**:

| Field | Type | Description |
|-------|------|-------------|
| `clientProtocolVersion` | UInt32 | Must match the protocol version from the ACK |
| `requestType` | SecurityTokenRequestType | `Issue` = new channel, `Renew` = extend existing channel |
| `securityMode` | MessageSecurityMode | None / Sign / SignAndEncrypt |
| `clientNonce` | ByteString | Random bytes for key derivation; null for SecurityPolicy None |
| `requestedLifetime` | UInt32 | Requested token lifetime in ms (typically 3 600 000 = 1 hour) |

**Response parameters** (in `CreateSessionResponse.serverEndpoints` context):

| Field | Type | Description |
|-------|------|-------------|
| `securityToken.channelId` | UInt32 | Assigned channel ID |
| `securityToken.tokenId` | UInt32 | Assigned token ID |
| `securityToken.createdAt` | DateTime | Token creation time |
| `securityToken.revisedLifetime` | UInt32 | Actual lifetime granted by the server |
| `serverNonce` | ByteString | Server's nonce for key derivation |

### Security token renewal

The security token has a limited lifetime. The client must renew it before expiry by sending an `OpenSecureChannel` request with `requestType = Renew`.  
The recommended time to renew is at **75% of the token lifetime** to give time for retries before the old token expires.

### CloseSecureChannel (OPC 10000-4 §5.6.3)

Closes the SecureChannel and releases server resources.  
Sent as part of `client.disconnect()` after `CloseSession`.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §5.6 | SecureChannel Service Set | Service definitions |
| OPC 10000-4 §5.6.2 | OpenSecureChannel | Request/response parameters |
| OPC 10000-4 §5.6.3 | CloseSecureChannel | Graceful teardown |
| OPC 10000-6 §6.7 | UA Secure Conversation Message Security | Chunk header and security fields |
| OPC 10000-6 §6.7.2 | MessageChunk Header | Detailed field layout |
| OPC 10000-6 §6.7.2.4 | Sequence Header | SequenceNumber and RequestId |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/5.6.2  
Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7

## Implementation

**File**: `src/secureChannel/secureChannelFacade.ts`

- `SecureChannelChunkWriter` — splits outgoing messages into chunks within the negotiated `SendBufferSize`.
- `SecureChannelChunkReader` — reassembles incoming chunks (C, F) into complete messages; handles abort (A).
- `SecureChannelMessageDecoder` — decodes the OPN/MSG/CLO chunk header and validates sequence numbers.
- Token renewal is scheduled at **75% of `revisedLifetime`** via `setTimeout`.
- On renewal, a new `OpenSecureChannel(Renew)` is sent and both old and new tokens are accepted during the transition window.

## Related Conformance Units

- [Protocol UA TCP](./protocol-ua-tcp.md) — underlying transport framing
- [SecurityPolicy – None](../security-policy-none/README.md) — the security policy applied within this layer
