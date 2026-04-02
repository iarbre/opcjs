/**
 * @fileoverview Encoder interface for OPC UA data encoding
 * @module codec/interfaces/encoder
 */

import { NodeId } from '../../types/nodeId.js';
import { ExpandedNodeId } from '../../types/expandedNodeId.js';
import { StatusCode } from '../../types/statusCode.js';
import { QualifiedName } from '../../types/qualifiedName.js';
import { LocalizedText } from '../../types/localizedText.js';
import { ExtensionObject } from '../../types/extensionObject.js';
import { DataValue } from '../../types/dataValue.js';
import { Variant } from '../../types/variant.js';
import { DiagnosticInfo } from '../../types/diagnosticInfo.js';
import { Encoder } from '../encoder.js';
import { XmlElement } from '../../types/xmlElement.js';

/**
 * IWriter defines the low-level encoding operations for all OPC UA built-in types.
 * Concrete implementations (BinaryEncoder, XmlEncoder, JsonEncoder) 
 * implement this interface with format-specific logic.
 * 
 * @see OPC 10000-6 Part 6 Section 5 - Data Encoding
 * @see FR-021 - IWriter interface with low-level primitive operations
 */
export interface IWriter {
  /**
   * Encode a Boolean value.
   * Binary: 1 byte (0x00=false, 0x01=true)
   * @param value The boolean value to encode
   */
  writeBoolean(value: boolean): void;

  /**
   * Encode a Byte value (unsigned 8-bit integer).
   * Binary: 1 byte
   * @param value The byte value (0-255)
   */
  writeByte(value: number): void;

  /**
   * Encode an SByte value (signed 8-bit integer).
   * Binary: 1 byte (two's complement)
   * @param value The signed byte value (-128 to 127)
   */
  writeSByte(value: number): void;

  /**
   * Encode an Int16 value (signed 16-bit integer).
   * Binary: 2 bytes, little-endian
   * @param value The int16 value (-32768 to 32767)
   */
  writeInt16(value: number): void;

  /**
   * Encode a UInt16 value (unsigned 16-bit integer).
   * Binary: 2 bytes, little-endian
   * @param value The uint16 value (0 to 65535)
   */
  writeUInt16(value: number): void;

  /**
   * Encode an Int32 value (signed 32-bit integer).
   * Binary: 4 bytes, little-endian
   * @param value The int32 value
   */
  writeInt32(value: number): void;

  /**
   * Encode a UInt32 value (unsigned 32-bit integer).
   * Binary: 4 bytes, little-endian
   * @param value The uint32 value
   */
  writeUInt32(value: number): void;

  /**
   * Encode an Int64 value (signed 64-bit integer).
   * Binary: 8 bytes, little-endian
   * Note: JavaScript uses BigInt for 64-bit integers
   * @param value The int64 value as BigInt
   */
  writeInt64(value: bigint): void;

  /**
   * Encode a UInt64 value (unsigned 64-bit integer).
   * Binary: 8 bytes, little-endian
   * @param value The uint64 value as BigInt
   */
  writeUInt64(value: bigint): void;

  /**
   * Encode a Float value (32-bit IEEE 754 floating point).
   * Binary: 4 bytes, little-endian
   * @param value The float value
   */
  writeFloat(value: number): void;

  /**
   * Encode a Double value (64-bit IEEE 754 floating point).
   * Binary: 8 bytes, little-endian
   * @param value The double value
   */
  writeDouble(value: number): void;

  /**
   * Encode a String value (UTF-8 encoded).
   * Binary: Int32 length prefix + UTF-8 bytes
   * @param value The string value; null or undefined is encoded as length -1 (OPC UA null)
   */
  writeString(value: string | null): void;

  /**
   * Encode a DateTime value.
   * Binary: Int64 representing 100-nanosecond intervals since January 1, 1601 UTC
   * @param value The date value
   */
  writeDateTime(value: Date): void;

  /**
   * Encode a Guid value (UUID/RFC 4122).
   * Binary: 16 bytes (Data1 UInt32, Data2 UInt16, Data3 UInt16, Data4 Byte[8])
   * @param value The GUID as string (e.g., "550e8400-e29b-41d4-a716-446655440000")
   */
  writeGuid(value: string): void;

  /**
   * Encode a ByteString value.
   * Binary: Int32 length prefix + bytes
   * @param value The byte array; null or undefined is encoded as length -1 (OPC UA null)
   */
  writeByteString(value: Uint8Array | null | undefined): void;

  /**
   * Encode an XmlElement value.
   * Binary: Int32 length prefix + UTF-8 encoded XML
   * @param value The XML string (undefined encoded as length -1)
   */
  writeXmlElement(value: XmlElement|string): void;

  /**
   * Encode an array with Int32 length prefix.
   * Binary: Int32 length where -1=undefined, 0=empty, positive=count
   * @param array The array to encode (undefined for undefined array)
   * @param encodeElement Function to encode each element
   * @see OPC 10000-6 Section 5.2.5 - Arrays
   * @see FR-011 - Int32 length prefix for arrays
   */
  writeArray<T>(array: T[] | undefined, encodeElement: (encoder: this, value: T) => void): void;

  // ── Complex types ──────────────────────────────────────────────────────────

  /**
   * Encode a NodeId value.
   * @see OPC 10000-6 Section 5.2.2.9 - NodeId
   */
  writeNodeId(value: NodeId): void;

  /**
   * Encode an ExpandedNodeId value.
   * @see OPC 10000-6 Section 5.2.2.10 - ExpandedNodeId
   */
  writeExpandedNodeId(value: ExpandedNodeId): void;

  /**
   * Encode a StatusCode value.
   * Binary: UInt32
   * @see OPC 10000-6 Section 5.2.2.11 - StatusCode
   */
  writeStatusCode(value: StatusCode): void;

  /**
   * Encode a QualifiedName value.
   * @see OPC 10000-6 Section 5.2.2.13 - QualifiedName
   */
  writeQualifiedName(value: QualifiedName): void;

  /**
   * Encode a LocalizedText value.
   * @see OPC 10000-6 Section 5.2.2.14 - LocalizedText
   */
  writeLocalizedText(value: LocalizedText): void;

  /**
   * Encode an ExtensionObject value.
   * @see OPC 10000-6 Section 5.2.2.15 - ExtensionObject
   */
  writeExtensionObject(value: ExtensionObject, encoder: Encoder): void;

  /**
   * Encode a DataValue value.
   * @see OPC 10000-6 Section 5.2.2.17 - DataValue
   */
  writeDataValue(value: DataValue, encoder: Encoder): void;

  /**
   * Encode a Variant value.
   * @see OPC 10000-6 Section 5.2.2.16 - Variant
   */
  writeVariant(value: Variant, encoder: Encoder): void;

  /**
   * Encode a DiagnosticInfo value.
   * @see OPC 10000-6 Section 5.2.2.12 - DiagnosticInfo
   */
  writeDiagnosticInfo(value: DiagnosticInfo): void;

  getData(): unknown; // Returns the encoded data (e.g., Uint8Array for binary, string for XML/JSON)
}
