# Address Space Client NodeId IdTypes

**Facet**: Core 2022 Client Facet  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

A client claiming this conformance unit must be able to create, encode, decode, and use NodeIds of all four identifier types defined by the OPC UA specification:

| Identifier Type | Encoding Id | Description |
|----------------|-------------|-------------|
| **Numeric** | 0x00 (two-byte), 0x01 (four-byte), 0x02 (full) | 32-bit unsigned integer identifier. The most compact and most common form. |
| **String** | 0x03 | UTF-8 string identifier; case-sensitive. Length limit depends on the transport (max 65535 bytes in UA Binary). |
| **Guid** | 0x04 | A 128-bit GUID. Used when strong uniqueness is required without a central registry. |
| **Opaque / ByteString** | 0x05 | Arbitrary byte sequence; used when generating identifiers from existing binary data (e.g. hashes). |

Every NodeId also carries a **NamespaceIndex** (UInt16).  
NamespaceIndex 0 is always reserved for the OPC UA base namespace (`http://opcfoundation.org/UA/`).

### Two-byte NodeId shorthand

When NamespaceIndex == 0 and the numeric identifier fits in one byte (0–255), the two-byte encoding may be used (EncodingByte = 0x00).

### Four-byte NodeId shorthand

When NamespaceIndex fits in one byte (0–255) and the numeric identifier fits in two bytes (0–65535), the four-byte encoding may be used (EncodingByte = 0x01).

### ExpandedNodeId

An expansion of NodeId that adds an optional `namespaceUri` (String) and an optional `serverIndex` (UInt32), enabling references across servers.  
Clients must be able to parse ExpandedNodeIds even if they do not use cross-server references.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-3 §8.2 | NodeId | Data type definition of NodeId |
| OPC 10000-3 §8.3 | ExpandedNodeId | Extended form with namespace URI and server index |
| OPC 10000-6 §5.2.2 | NodeId binary encoding | Two-byte, four-byte, and full encodings |
| OPC 10000-6 §5.2.3 | ExpandedNodeId binary encoding | Encoding flags and optional fields |

Online: https://reference.opcfoundation.org/Core/Part3/v105/docs/8.2  
Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/5.2.2

## Implementation

**File**: `src/` (via `base` package)  
- NodeId types: `packages/base/src/nodeId.ts`  
- All four identifier types (Numeric, String, Guid, Opaque) are implemented.  
- Two-byte and four-byte compact encodings are supported.  
- Binary encode/decode is handled in `packages/base/src/binaryWriter.ts` / `binaryReader.ts`.

## Test Coverage

- Unit tests for NodeId construction, equality, and round-trip binary encode/decode.
- Integration tests exercise all four identifier types against the reference server.

## Related Conformance Units

- [UA Binary Encoding](../ua-tcp-ua-sc-ua-binary/ua-binary-encoding.md) — the binary codec that encodes NodeId on the wire.
