# UA Binary Encoding

**Facet**: UA-TCP UA-SC UA-Binary  
**Type**: Required  
**Status**: ✅ Implemented  

## Description

The UA Binary Encoding profile requires full implementation of OPC UA's binary codec for all built-in data types. This is the most common wire format for UA-TCP transport.

### Built-in primitive types (OPC 10000-6 §5.1)

| Type | Size | Notes |
|------|------|-------|
| `Boolean` | 1 byte | 0 = false, any non-zero = true |
| `Byte` | 1 byte | Unsigned 8-bit |
| `SByte` | 1 byte | Signed 8-bit |
| `Int16` | 2 bytes | Little-endian signed |
| `UInt16` | 2 bytes | Little-endian unsigned |
| `Int32` | 4 bytes | Little-endian signed |
| `UInt32` | 4 bytes | Little-endian unsigned |
| `Int64` | 8 bytes | Little-endian signed |
| `UInt64` | 8 bytes | Little-endian unsigned |
| `Float` | 4 bytes | IEEE 754 single precision, little-endian |
| `Double` | 8 bytes | IEEE 754 double precision, little-endian |
| `String` | 4 + n bytes | Int32 length prefix (−1 = null), UTF-8 bytes |
| `DateTime` | 8 bytes | UInt64, 100-nanosecond intervals since 1601-01-01 00:00:00 UTC |
| `Guid` | 16 bytes | Mixed-endian: Data1 (LE UInt32), Data2 (LE UInt16), Data3 (LE UInt16), Data4 (8 bytes BE) |
| `ByteString` | 4 + n bytes | Int32 length prefix (−1 = null), raw bytes |
| `XmlElement` | Same as String | UTF-8 XML text |

### Structured types

| Type | Notes |
|------|-------|
| `NodeId` | Variable length; encoding byte controls format (two-byte, four-byte, or full with NamespaceIndex) |
| `ExpandedNodeId` | NodeId + optional namespace URI and server index |
| `StatusCode` | UInt32; high 4 bits = severity (Good/Uncertain/Bad), remaining bits = sub-code |
| `QualifiedName` | UInt16 namespaceIndex + String name |
| `LocalizedText` | Bitfield + optional locale String + optional text String |
| `ExtensionObject` | UInt8 encoding mask + optional TypeId (NodeId) + optional body (ByteString or XmlElement) |
| `DataValue` | Bitfield + optional Value (Variant) + optional StatusCode + optional timestamps |
| `Variant` | UInt8 type byte + encoded value; arrays indicated by array dimension bits |
| `DiagnosticInfo` | Nested structure with optional fields controlled by a bitfield |

### Array encoding

Arrays are encoded as: `Int32 length` (−1 = null array, 0 = empty) followed by `length` encoded elements.  
Multi-dimensional arrays add an `Int32[]` dimensions field after the flat element array.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-6 §5 | Data encoding | All built-in type encoding rules |
| OPC 10000-6 §5.1 | Scalar built-in types | Primitive type encodings |
| OPC 10000-6 §5.2 | Structured built-in types | NodeId, Variant, DataValue, ExtensionObject etc. |
| OPC 10000-6 §5.3 | OPC UA JSON encoding | Alternate encoding (not required by this CU) |
| OPC 10000-3 §8 | Standard DataTypes | Semantic definitions of built-in types |

Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/5  
Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/5.2

## Implementation

**Files** (in `base` package, consumed by `client`):
- `packages/base/src/binaryWriter.ts` — write methods for all built-in types
- `packages/base/src/binaryReader.ts` — read methods for all built-in types

All 27 built-in types are implemented, including Variant discriminated union, DataValue with all optional fields, multi-dimensional array support, and Guid mixed-endian encoding.

## Related Conformance Units

- [Protocol UA TCP](./protocol-ua-tcp.md) — framing around binary-encoded bodies
- [UA Secure Conversation](./ua-secure-conversation.md) — wraps binary message bodies in chunks
