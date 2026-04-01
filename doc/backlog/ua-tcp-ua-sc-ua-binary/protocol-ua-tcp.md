# Protocol UA TCP

**Facet**: UA-TCP UA-SC UA-Binary  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

The UA-TCP profile defines a lightweight framing protocol layered on top of TCP (or, in this implementation, WebSocket) that prepends a fixed 8-byte message header to every message and implements a mandatory Hello/Ack handshake at connection time.

### Message header (OPC 10000-6 §7.1.2)

Every message on the wire begins with:

| Field | Type | Size | Description |
|-------|------|------|-------------|
| `MessageType` | Byte[3] | 3 bytes | ASCII code: `HEL`, `ACK`, `ERR`, `RHE`, `OPN`, `CLO`, `MSG` |
| `IsFinal` | Byte | 1 byte | `F` = final, `C` = chunk, `A` = abort |
| `MessageSize` | UInt32 | 4 bytes | Total message size including this header |

Total: 8 bytes.

### Hello/Ack Handshake (OPC 10000-6 §7.1.2)

After opening the TCP connection, the client must send a `HEL` (Hello) message:

| Field | Type | Description |
|-------|------|-------------|
| `ProtocolVersion` | UInt32 | Must be 0 for UA 1.0x |
| `ReceiveBufferSize` | UInt32 | Maximum chunk size the client can receive |
| `SendBufferSize` | UInt32 | Maximum chunk size the client will send |
| `MaxMessageSize` | UInt32 | Maximum unchunked message body; 0 = no limit |
| `MaxChunkCount` | UInt32 | Maximum number of chunks per message; 0 = no limit |
| `EndpointUrl` | String | Target endpoint URL (e.g. `opc.tcp://server:4840/UA/Server`) |

The server responds with an `ACK` (Acknowledge) message:

| Field | Type | Description |
|-------|------|-------------|
| `ProtocolVersion` | UInt32 | Protocol version accepted by the server |
| `ReceiveBufferSize` | UInt32 | Server's receive buffer (client shall not send larger chunks) |
| `SendBufferSize` | UInt32 | Server's send buffer (client may receive up to this) |
| `MaxMessageSize` | UInt32 | Server's max message size |
| `MaxChunkCount` | UInt32 | Server's max chunk count |

Negotiated values: for each buffer/size parameter the effective limit is `min(client, server)`.

If the server rejects the handshake it sends an `ERR` message with a status code and closes the connection.

### Error Message (OPC 10000-6 §7.1.2.5)

| Field | Type | Description |
|-------|------|-------------|
| `Error` | UInt32 | OPC UA StatusCode explaining the error |
| `Reason` | String | Human-readable error description |

### ReverseHello (OPC 10000-6 §7.1.2.6)

A server can initiate a reverse connection by sending a `RHE` (ReverseHello) message to a listening client, enabling clients behind firewalls to receive connections.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 §7.1 | OPC UA Connection Protocol | Full message header and handshake definition |
| OPC 10000-6 §7.1.2 | Hello / Acknowledge / Error Messages | Field definitions |
| OPC 10000-6 §7.2 | OPC UA TCP | Mapping UA Connection Protocol to TCP |

Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/7.1  
Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/7.2

## Implementation

**File**: `src/transport/tcpConnectionHandler.ts`

- Constructs and sends `HEL` on WebSocket open.
- Parses `ACK` frame and stores negotiated buffer sizes.
- Raises an error on `ERR` frames.
- `TcpMessageDecoupler` extracts complete message frames from the byte stream.
- `TcpMessageInjector` prepends the 8-byte header when sending.

## Related Conformance Units

- [UA Secure Conversation](./ua-secure-conversation.md) — runs on top of UA-TCP
- [UA Binary Encoding](./ua-binary-encoding.md) — encoding used within message bodies
