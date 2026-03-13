/**
 * @fileoverview Binary encoder implementation for OPC UA Binary encoding
 * @module codec/binary/encoder
 */

import { CodecError } from '../codecError.js';
import { NodeId, NodeIdType } from '../../types/nodeId.js';
import { ExpandedNodeId } from '../../types/expandedNodeId.js';
import { StatusCode } from '../../types/statusCode.js';
import { QualifiedName } from '../../types/qualifiedName.js';
import { LocalizedText } from '../../types/localizedText.js';
import { ExtensionObject } from '../../types/extensionObject.js';
import { ExtensionObjectEncoding } from '../../types/extensionObjectEncoding.js';
import { DataValue } from '../../types/dataValue.js';
import { Variant } from '../../types/variant.js';
import { DiagnosticInfo } from '../../types/diagnosticInfo.js';
import { IWriter } from '../interfaces/iWriter.js';
import { Encoder } from '../encoder.js';
import { XmlElement } from '../../types/xmlElement.js';
import { BuiltInType } from '../../types/builtinType.js';

/**
 * OPC UA DateTime epoch: January 1, 1601 00:00:00 UTC
 * JavaScript Date epoch: January 1, 1970 00:00:00 UTC
 * Difference in milliseconds
 */
const EPOCH_DIFF_MS = 11644473600000n;
const TICKS_PER_MS = 10000n;

// === NodeId encoding helpers ===
// todo: refactor the complex type coding into separate files.
enum NodeIdEncodingByte {
  TwoByte = 0x00,
  FourByte = 0x01,
  Numeric = 0x02,
  String = 0x03,
  Guid = 0x04,
  ByteString = 0x05,
}

function selectNodeIdEncodingFormat(nodeId: NodeId): NodeIdEncodingByte {
  if (nodeId.identifierType === NodeIdType.Numeric) {
    const id = nodeId.identifier as number;
    const ns = nodeId.namespace;
    if (ns === 0 && id >= 0 && id <= 255) {
      return NodeIdEncodingByte.TwoByte;
    }
    if (ns >= 0 && ns <= 255 && id >= 0 && id <= 65535) {
      return NodeIdEncodingByte.FourByte;
    }
    return NodeIdEncodingByte.Numeric;
  }
  if (nodeId.identifierType === NodeIdType.String) {
    return NodeIdEncodingByte.String;
  }
  if (nodeId.identifierType === NodeIdType.Guid) {
    return NodeIdEncodingByte.Guid;
  }
  if (nodeId.identifierType === NodeIdType.ByteString) {
    return NodeIdEncodingByte.ByteString;
  }
  throw new CodecError(`Invalid NodeId identifier type: ${nodeId.identifierType}`);
}

// === Encoding mask constants ===

const ExpandedNodeIdMask = {
  ServerIndexFlag: 0x40,
  NamespaceUriFlag: 0x80,
} as const;

const LocalizedTextMask = {
  LocaleFlag: 0x01,
  TextFlag: 0x02,
} as const;

const DataValueMaskBits = {
  Value: 0x01,
  StatusCode: 0x02,
  SourceTimestamp: 0x04,
  ServerTimestamp: 0x08,
  SourcePicoseconds: 0x10,
  ServerPicoseconds: 0x20,
} as const;

const DiagnosticInfoMaskBits = {
  SymbolicId: 0x01,
  NamespaceUri: 0x02,
  LocalizedText: 0x04,
  Locale: 0x08,
  AdditionalInfo: 0x10,
  InnerStatusCode: 0x20,
  InnerDiagnosticInfo: 0x40,
} as const;

const VariantMask = {
  TypeMask: 0x3F,
  ArrayDimensions: 0x40,
  Array: 0x80,
} as const;

/**
 * BinaryEncoder implements OPC UA Binary encoding per OPC 10000-6 Section 5.2.
 * Uses little-endian byte order and IEEE 754 floating point representation.
 * 
 * @see OPC 10000-6 Part 6 Section 5.2 - UA Binary
 * @see FR-008 - Little-endian byte order for multi-byte numeric values
 * @see FR-009 - IEEE 754 binary representation for Float and Double
 * @see FR-010 - String values as length-prefixed UTF-8
 */
export class BinaryWriter implements IWriter {
  private buffer: Uint8Array;
  private view: DataView;
  private position: number;
  private readonly growthFactor: number = 2;

  public getData(): Uint8Array {
    return this.buffer.subarray(0, this.position);
  }

  /** Returns the number of bytes written so far. */
  public getLength(): number {
    return this.position;
  }

  /** Appends raw bytes to the buffer. */
  public writeBytes(data: Uint8Array): void {
    this.ensureCapacity(data.length);
    this.buffer.set(data, this.position);
    this.position += data.length;
  }

  /**
   * Overwrites bytes in the buffer starting at the given position.
   * Also truncates the written length to `offset + data.length` if that
   * is less than the current position (i.e. replaces and trims the tail).
   */
  public writeBytesAt(data: Uint8Array, offset: number): void {
    const end = offset + data.length;
    this.ensureCapacity(Math.max(0, end - this.position));
    this.buffer.set(data, offset);
    if (end > this.position) {
      this.position = end;
    }
  }

  /**
   * Inserts bytes at the given offset, shifting all subsequent content right.
   */
  public insertBytesAt(data: Uint8Array, offset: number): void {
    this.ensureCapacity(data.length);
    this.buffer.copyWithin(offset + data.length, offset, this.position);
    this.buffer.set(data, offset);
    this.position += data.length;
  }

  /**
   * Overwrites a UInt32 (little-endian) at the given byte offset without
   * advancing the write position.
   */
  public writeUInt32At(value: number, offset: number): void {
    if (!Number.isInteger(value) || value < 0 || value > 4294967295) {
      throw new CodecError(`UInt32 value ${value} out of range [0, 4294967295]`);
    }
    this.view.setUint32(offset, value, true);
  }

  /**
   * Ensure buffer has enough capacity, growing if necessary.
   */
  private ensureCapacity(additionalBytes: number): void {
    const requiredSize = this.position + additionalBytes;
    if (requiredSize > this.buffer.length) {
      // Grow buffer by doubling or to required size, whichever is larger
      const newSize = Math.max(this.buffer.length * this.growthFactor, requiredSize);
      const newBuffer = new Uint8Array(newSize);
      newBuffer.set(this.buffer.subarray(0, this.position), 0);
      this.buffer = newBuffer;
      this.view = new DataView(newBuffer.buffer, newBuffer.byteOffset, newBuffer.byteLength);
      console.log(`BufferWriter: resized buffer to ${newSize} bytes`);
    }
  }

  writeBoolean(value: boolean): void {
    this.ensureCapacity(1);
    this.view.setUint8(this.position, value ? 1 : 0);
    this.position += 1;
  }

  writeByte(value: number): void {
    if (value < 0 || value > 255) {
      throw new CodecError(`Byte value ${value} out of range [0, 255]`);
    }
    this.ensureCapacity(1);
    this.view.setUint8(this.position, value);
    this.position += 1;
  }

  writeSByte(value: number): void {
    if (value < -128 || value > 127) {
      throw new CodecError(`SByte value ${value} out of range [-128, 127]`);
    }
    this.ensureCapacity(1);
    this.view.setInt8(this.position, value);
    this.position += 1;
  }

  writeInt16(value: number): void {
    if (value < -32768 || value > 32767) {
      throw new CodecError(`Int16 value ${value} out of range [-32768, 32767]`);
    }
    this.ensureCapacity(2);
    this.view.setInt16(this.position, value, true);
    this.position += 2;
  }

  writeUInt16(value: number): void {
    if (value < 0 || value > 65535) {
      throw new CodecError(`UInt16 value ${value} out of range [0, 65535]`);
    }
    this.ensureCapacity(2);
    this.view.setUint16(this.position, value, true);
    this.position += 2;
  }

  writeInt32(value: number): void {
    if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647) {
      throw new CodecError(`Int32 value ${value} out of range [-2147483648, 2147483647]`);
    }
    this.ensureCapacity(4);
    this.view.setInt32(this.position, value, true);
    this.position += 4;
  }

  writeUInt32(value: number): void {
    if (!Number.isInteger(value) || value < 0 || value > 4294967295) {
      throw new CodecError(`UInt32 value ${value} out of range [0, 4294967295]`);
    }
    this.ensureCapacity(4);
    this.view.setUint32(this.position, value, true);
    this.position += 4;
  }

  writeInt64(value: bigint): void {
    this.ensureCapacity(8);
    this.view.setBigInt64(this.position, value, true);
    this.position += 8;
  }

  writeUInt64(value: bigint): void {
    this.ensureCapacity(8);
    this.view.setBigUint64(this.position, value, true);
    this.position += 8;
  }

  writeFloat(value: number): void {
    this.ensureCapacity(4);
    this.view.setFloat32(this.position, value, true);
    this.position += 4;
  }

  writeDouble(value: number): void {
    this.ensureCapacity(8);
    this.view.setFloat64(this.position, value, true);
    this.position += 8;
  }
  public writeString(value: string | null): void {
    let encoded = undefined
    if (value && value !== '') {
      encoded = new TextEncoder().encode(value);
    }
    this.writeByteString(encoded);
  }

  writeDateTime(value: Date): void {
    // Convert JavaScript Date to OPC UA DateTime (100-nanosecond ticks since 1601-01-01 UTC)
    const jsTimestamp = BigInt(value.getTime());
    const opcTimestamp = (jsTimestamp + EPOCH_DIFF_MS) * TICKS_PER_MS;
    this.writeInt64(opcTimestamp);
  }

  writeGuid(value: string): void {
    // Parse GUID string (e.g., "550e8400-e29b-41d4-a716-446655440000")
    const hex = value.replace(/-/g, '');
    if (hex.length !== 32) {
      throw new CodecError(`Invalid GUID format: ${value}`);
    }

    this.ensureCapacity(16);

    // Data1 (UInt32, bytes 0-3)
    const data1 = parseInt(hex.substr(0, 8), 16);
    this.view.setUint32(this.position, data1, true);

    // Data2 (UInt16, bytes 4-5)
    const data2 = parseInt(hex.substr(8, 4), 16);
    this.view.setUint16(this.position + 4, data2, true);

    // Data3 (UInt16, bytes 6-7)
    const data3 = parseInt(hex.substr(12, 4), 16);
    this.view.setUint16(this.position + 6, data3, true);

    // Data4 (Byte[8], bytes 8-15)
    for (let i = 0; i < 8; i++) {
      const byte = parseInt(hex.substr(16 + i * 2, 2), 16);
      this.view.setUint8(this.position + 8 + i, byte);
    }

    this.position += 16;
  }

  public writeByteString(value: Uint8Array | null | undefined): void {
    if (!value) {
      this.writeInt32(-1);
      return;
    }

    // FR-019: Reject ByteString length > 16,777,216 bytes

    const length = value.length;
    if (length > 16777216) {
      throw new CodecError(
        `ByteString length ${length} exceeds maximum allowed length of 16,777,216 bytes`,
        { format: 'Binary', suggestedAction: 'Reduce ByteString length' }
      );
    }

    this.writeInt32(value.length);
    this.writeBytes(value);
  }

  writeXmlElement(value: XmlElement | string): void {
    // XmlElement is encoded as string in binary format
    this.writeString(value.toString());
  }

  /**
   * Write an array with Int32 length prefix.
   * Per FR-011: -1 = null, 0 = empty, positive = element count
   * Per FR-019: Maximum array length is 2,147,483,647 elements
   * 
   * @param array The array to encode (undefined for null array)
   * @param encodeElement Function to encode each element
   * @throws {CodecError} if array length exceeds Int32 maximum
   * @see OPC 10000-6 Section 5.2.5 - Arrays
   */
  writeArray<T>(array: T[] | undefined, encodeElement: (encoder: this, value: T) => void): void {
    if (array === undefined) {
      this.writeInt32(-1);
      return;
    }

    const length = array.length;

    // FR-019: Validate array length
    if (length > 2147483647) {
      throw new CodecError(
        `Array length ${length} exceeds maximum allowed length of 2,147,483,647 elements`,
        { format: 'Binary', suggestedAction: 'Reduce array size' }
      );
    }

    this.writeInt32(length);

    for (const element of array) {
      encodeElement(this, element);
    }
  }

  // === Complex type write methods ===

  /**
   * Encode a NodeId in binary format using the most compact representation.
   * @see OPC 10000-6 Tables 16-19
   */
  writeNodeId(value: NodeId): void {
    const format = selectNodeIdEncodingFormat(value);

    switch (format) {
      case NodeIdEncodingByte.TwoByte:
        this.writeByte(NodeIdEncodingByte.TwoByte);
        this.writeByte(value.identifier as number);
        break;

      case NodeIdEncodingByte.FourByte:
        this.writeByte(NodeIdEncodingByte.FourByte);
        this.writeByte(value.namespace);
        this.writeUInt16(value.identifier as number);
        break;

      case NodeIdEncodingByte.Numeric:
        this.writeByte(NodeIdEncodingByte.Numeric);
        this.writeUInt16(value.namespace);
        this.writeUInt32(value.identifier as number);
        break;

      case NodeIdEncodingByte.String:
        this.writeByte(NodeIdEncodingByte.String);
        this.writeUInt16(value.namespace);
        this.writeString(value.identifier as string);
        break;

      case NodeIdEncodingByte.Guid:
        this.writeByte(NodeIdEncodingByte.Guid);
        this.writeUInt16(value.namespace);
        this.writeGuid(value.identifier as string);
        break;

      case NodeIdEncodingByte.ByteString: {
        this.writeByte(NodeIdEncodingByte.ByteString);
        this.writeUInt16(value.namespace);
        const ident = value.identifier;
        this.writeByteString(ident as Uint8Array);
        break;
      }

      default:
        throw new CodecError(`Unsupported NodeId encoding format: ${format}`);
    }
  }

  /**
   * Encode an ExpandedNodeId in binary format.
   * @see OPC 10000-6 Table 20
   */
  writeExpandedNodeId(value: ExpandedNodeId): void {
    const startPos = this.position;
    this.writeNodeId(value);

    let encodingByte = this.buffer[startPos];

    if (value.namespaceUri !== undefined) {
      encodingByte |= ExpandedNodeIdMask.NamespaceUriFlag;
    }
    if (value.serverIndex !== undefined) {
      encodingByte |= ExpandedNodeIdMask.ServerIndexFlag;
    }

    this.buffer[startPos] = encodingByte;

    if (value.namespaceUri !== undefined) {
      this.writeString(value.namespaceUri);
    }
    if (value.serverIndex !== undefined) {
      this.writeUInt32(value.serverIndex);
    }
  }

  /**
   * Encode a StatusCode as a UInt32.
   * @see OPC 10000-6 Section 5.2.2.16
   */
  writeStatusCode(value: StatusCode): void {
    this.writeUInt32(value);
  }

  /**
   * Encode a QualifiedName as NamespaceIndex (UInt16) + Name (String).
   * @see OPC 10000-6 Table 8
   */
  writeQualifiedName(value: QualifiedName): void {
    this.writeUInt16(value.namespaceIndex);
    this.writeString(value.name);
  }

  /**
   * Encode a LocalizedText with optional locale and text.
   * @see OPC 10000-6 Table 9
   */
  writeLocalizedText(value: LocalizedText): void {
    let encodingMask = 0;
    if (value.locale !== undefined && value.locale !== '') {
      encodingMask |= LocalizedTextMask.LocaleFlag;
    }
    if (value.text !== '') {
      encodingMask |= LocalizedTextMask.TextFlag;
    }
    this.writeByte(encodingMask);
    if (encodingMask & LocalizedTextMask.LocaleFlag) {
      this.writeString(value.locale!);
    }
    if (encodingMask & LocalizedTextMask.TextFlag) {
      this.writeString(value.text);
    }
  }

  /**
   * Encode an ExtensionObject with its TypeId and body.
   * @see OPC 10000-6 Section 5.2.2.15
   */
  writeExtensionObject(value: ExtensionObject, encoder: Encoder): void {
    const typeId = value.typeId;
    if ('namespaceUri' in typeId || 'serverIndex' in typeId) {
      this.writeExpandedNodeId(typeId as ExpandedNodeId);
    } else {
      this.writeNodeId(typeId);
    }

    this.writeByte(value.encoding);

    switch (value.encoding) {
      case ExtensionObjectEncoding.None:
        break;
      case ExtensionObjectEncoding.Binary:
        {
          if (!value.data) {
            throw new CodecError('ExtensionObject with Binary encoding must have data');
          }

          const binaryData = encoder.encodeWithoutId(value.data, 'binary') as Uint8Array;
          this.writeByteString(binaryData);
          break;
        }
      case ExtensionObjectEncoding.Xml:
        {
          if (!value.data) {
            throw new CodecError('ExtensionObject with Xml encoding must have data');
          }
          const xmlString = encoder.encodeWithoutId(value.data, 'xml') as string;
          this.writeXmlElement(xmlString);
          break;
        }
      default:
        throw new CodecError(`Invalid ExtensionObject encoding: ${value.encoding}`);
    }
  }

  /**
   * Encode a DataValue with optional fields controlled by an encoding mask.
   * @see OPC 10000-6 Table 26
   */
  writeDataValue(value: DataValue, encoder: Encoder): void {
    let encodingMask = 0;
    if (value.value !== null && value.value !== undefined) {
      encodingMask |= DataValueMaskBits.Value;
    }
    if (value.statusCode !== null) {
      encodingMask |= DataValueMaskBits.StatusCode;
    }
    if (value.sourceTimestamp !== null) {
      encodingMask |= DataValueMaskBits.SourceTimestamp;
    }
    if (value.serverTimestamp !== null) {
      encodingMask |= DataValueMaskBits.ServerTimestamp;
    }
    if (value.sourcePicoseconds !== null) {
      encodingMask |= DataValueMaskBits.SourcePicoseconds;
    }
    if (value.serverPicoseconds !== null) {
      encodingMask |= DataValueMaskBits.ServerPicoseconds;
    }

    this.writeByte(encodingMask);

    if (encodingMask & DataValueMaskBits.Value) {
      this.writeVariant(value.value as Variant, encoder);
    }
    if (encodingMask & DataValueMaskBits.StatusCode) {
      this.writeUInt32(value.statusCode ?? StatusCode.Good);
    }
    if (encodingMask & DataValueMaskBits.SourceTimestamp) {
      this.writeDateTime(value.sourceTimestamp!);
    }
    if (encodingMask & DataValueMaskBits.ServerTimestamp) {
      this.writeDateTime(value.serverTimestamp!);
    }
    if (encodingMask & DataValueMaskBits.SourcePicoseconds) {
      this.writeUInt16(value.sourcePicoseconds!);
    }
    if (encodingMask & DataValueMaskBits.ServerPicoseconds) {
      this.writeUInt16(value.serverPicoseconds!);
    }
  }

  /**
   * Encode a Variant with type ID, value(s), and optional array dimensions.
   * @see OPC 10000-6 Section 5.2.2.16
   */
  writeVariant(value: Variant, encoder: Encoder): void {
    if (value.type < 0 || value.type > 25) {
      throw new CodecError(`Invalid Variant type ID: ${value.type}. Must be 0-25.`);
    }

    let mask = value.type & VariantMask.TypeMask;
    const isArrayValue = Array.isArray(value.value);

    if (isArrayValue) {
      mask |= VariantMask.Array;
    }
    if (value.arrayDimensions !== undefined && value.arrayDimensions.length > 0) {
      mask |= VariantMask.ArrayDimensions;
    }

    this.writeByte(mask);

    if (isArrayValue) {
      const array = value.value as unknown[];
      this.writeInt32(array.length);
      for (const elem of array) {
        this.writeVariantValue(value.type, elem, encoder);
      }
    } else if (value.type !== BuiltInType.Null) {
      this.writeVariantValue(value.type, value.value, encoder);
    }

    if (value.arrayDimensions !== undefined && value.arrayDimensions.length > 0) {
      this.writeInt32(value.arrayDimensions.length);
      for (const dim of value.arrayDimensions) {
        this.writeInt32(dim);
      }
    }
  }

  /**
   * Encode a DiagnosticInfo with optional fields controlled by an encoding mask.
   * Supports recursive InnerDiagnosticInfo.
   * @see OPC 10000-6 Table 24
   */
  writeDiagnosticInfo(value: DiagnosticInfo): void {
    let encodingMask = 0;
    if (value.symbolicId !== null) { encodingMask |= DiagnosticInfoMaskBits.SymbolicId; }
    if (value.namespaceUri !== null) { encodingMask |= DiagnosticInfoMaskBits.NamespaceUri; }
    if (value.localizedText !== null) { encodingMask |= DiagnosticInfoMaskBits.LocalizedText; }
    if (value.locale !== null) { encodingMask |= DiagnosticInfoMaskBits.Locale; }
    if (value.additionalInfo !== null) { encodingMask |= DiagnosticInfoMaskBits.AdditionalInfo; }
    if (value.innerStatusCode !== null) { encodingMask |= DiagnosticInfoMaskBits.InnerStatusCode; }
    if (value.innerDiagnosticInfo !== null) { encodingMask |= DiagnosticInfoMaskBits.InnerDiagnosticInfo; }

    this.writeByte(encodingMask);

    if (encodingMask & DiagnosticInfoMaskBits.SymbolicId) { this.writeInt32(value.symbolicId!); }
    if (encodingMask & DiagnosticInfoMaskBits.NamespaceUri) { this.writeInt32(value.namespaceUri!); }
    if (encodingMask & DiagnosticInfoMaskBits.LocalizedText) { this.writeInt32(value.localizedText!); }
    if (encodingMask & DiagnosticInfoMaskBits.Locale) { this.writeInt32(value.locale!); }
    if (encodingMask & DiagnosticInfoMaskBits.AdditionalInfo) { this.writeString(value.additionalInfo!); }
    if (encodingMask & DiagnosticInfoMaskBits.InnerStatusCode) { this.writeUInt32(value.innerStatusCode ?? StatusCode.Good); }
    if (encodingMask & DiagnosticInfoMaskBits.InnerDiagnosticInfo) { this.writeDiagnosticInfo(value.innerDiagnosticInfo!); }
  }

  // === Private helpers ===

  private writeVariantValue(type: BuiltInType, value: unknown, encoder: Encoder): void {
    switch (type) {
      case BuiltInType.Null: break;
      case BuiltInType.Boolean: this.writeBoolean(value as boolean); break;
      case BuiltInType.SByte: this.writeSByte(value as number); break;
      case BuiltInType.Byte: this.writeByte(value as number); break;
      case BuiltInType.Int16: this.writeInt16(value as number); break;
      case BuiltInType.UInt16: this.writeUInt16(value as number); break;
      case BuiltInType.Int32: this.writeInt32(value as number); break;
      case BuiltInType.UInt32: this.writeUInt32(value as number); break;
      case BuiltInType.Int64: this.writeInt64(value as bigint); break;
      case BuiltInType.UInt64: this.writeUInt64(value as bigint); break;
      case BuiltInType.Float: this.writeFloat(value as number); break;
      case BuiltInType.Double: this.writeDouble(value as number); break;
      case BuiltInType.String: this.writeString(value as string); break;
      case BuiltInType.DateTime: this.writeDateTime(value as Date); break;
      case BuiltInType.Guid: this.writeGuid(value as string); break;
      case BuiltInType.ByteString: this.writeByteString(value as Uint8Array); break;
      case BuiltInType.XmlElement: this.writeXmlElement(value as string); break;
      case BuiltInType.NodeId: this.writeNodeId(value as NodeId); break;
      case BuiltInType.ExpandedNodeId: this.writeExpandedNodeId(value as ExpandedNodeId); break;
      case BuiltInType.StatusCode: this.writeStatusCode(value as StatusCode); break;
      case BuiltInType.QualifiedName: this.writeQualifiedName(value as QualifiedName); break;
      case BuiltInType.LocalizedText: this.writeLocalizedText(value as LocalizedText); break;
      case BuiltInType.ExtensionObject: this.writeExtensionObject(value as ExtensionObject, encoder); break;
      case BuiltInType.DataValue: this.writeDataValue(value as DataValue, encoder); break;
      case BuiltInType.Variant: this.writeVariant(value as Variant, encoder); break;
      case BuiltInType.DiagnosticInfo: this.writeDiagnosticInfo(value as DiagnosticInfo); break;
      default: throw new CodecError(`Unsupported Variant type: ${type}`);
    }
  }

  constructor(initialSize: number = 1024) {
    const data = new Uint8Array(initialSize);
    this.buffer = data
    this.view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    this.position = 0;
  }
}
