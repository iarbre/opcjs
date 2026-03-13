/**
 * @fileoverview Binary decoder implementation for OPC UA Binary decoding
 * @module codec/binary/decoder
 */

import { CodecError } from '../codecError.js';
import { NodeId } from '../../types/nodeId.js';
import { ExpandedNodeId } from '../../types/expandedNodeId.js';
import { StatusCode } from '../../types/statusCode.js';
import { QualifiedName } from '../../types/qualifiedName.js';
import { LocalizedText } from '../../types/localizedText.js';
import { ExtensionObject } from '../../types/extensionObject.js';
import { ExtensionObjectEncoding } from '../../types/extensionObjectEncoding.js';
import { DataValue } from '../../types/dataValue.js';
import { Variant, VariantArrayValue, VariantValue } from '../../types/variant.js';
import { DiagnosticInfo } from '../../types/diagnosticInfo.js';
import type { IReader } from '../interfaces/iReader.js';
import type { IOpcType } from '../../types/iOpcType.js';
import { Decoder } from '../decoder.js';
import { XmlReader } from '../xml/xmlReader.js';
import { BuiltInType } from '../../types/builtinType.js';

/**
 * OPC UA DateTime epoch: January 1, 1601 00:00:00 UTC
 * JavaScript Date epoch: January 1, 1970 00:00:00 UTC
 * Difference in milliseconds
 */
const EPOCH_DIFF_MS = 11644473600000n;
const TICKS_PER_MS = 10000n;

// === NodeId decoding helpers ===

enum NodeIdEncodingByte {
  TwoByte = 0x00,
  FourByte = 0x01,
  Numeric = 0x02,
  String = 0x03,
  Guid = 0x04,
  ByteString = 0x05,
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
 * BinaryReader implements OPC UA Binary decoding per OPC 10000-6 Section 5.2.
 * Uses little-endian byte order and IEEE 754 floating point representation.
 * Validates buffer boundaries per FR-018 and FR-019.
 * 
 * @see OPC 10000-6 Part 6 Section 5.2 - UA Binary
 * @see FR-018 - Validate buffer boundaries during decode operations
 * @see FR-019 - Validate array length values during decode
 */
export class BinaryReader implements IReader {
  private buffer: Uint8Array;
  private view: DataView;
  private position: number;

  /**
   * Validate that we can read the specified number of bytes.
   * @throws {CodecError} if insufficient data available
   */
  private checkBounds(bytesNeeded: number): void {
    if (this.position + bytesNeeded > this.buffer.length) {
      throw new CodecError(
        `Buffer underflow: need ${bytesNeeded} bytes at position ${this.position}, but only ${this.buffer.length - this.position} bytes available`,
        { format: 'Binary', suggestedAction: 'Ensure buffer contains complete encoded data' }
      );
    }
  }

  readBoolean(): boolean {
    this.checkBounds(1);
    const value = this.buffer[this.position];
    this.position += 1;
    return value !== 0;
  }

  readByte(): number {
    this.checkBounds(1);
    const value = this.buffer[this.position];
    this.position += 1;
    return value;
  }

  readSByte(): number {
    this.checkBounds(1);
    const value = this.view.getInt8(this.position);
    this.position += 1;
    return value;
  }

  readInt16(): number {
    this.checkBounds(2);
    const value = this.view.getInt16(this.position, true);
    this.position += 2;
    return value;
  }

  readUInt16(): number {
    this.checkBounds(2);
    const value = this.view.getUint16(this.position, true);
    this.position += 2;
    return value;
  }

  readInt32(): number {
    this.checkBounds(4);
    const value = this.view.getInt32(this.position, true);
    this.position += 4;
    return value;
  }

  readUInt32(): number {
    this.checkBounds(4);
    const value = this.view.getUint32(this.position, true);
    this.position += 4;
    return value;
  }

  readInt64(): bigint {
    this.checkBounds(8);
    const value = this.view.getBigInt64(this.position, true);
    this.position += 8;
    return value;
  }

  readUInt64(): bigint {
    this.checkBounds(8);
    const value = this.view.getBigUint64(this.position, true);
    this.position += 8;
    return value;
  }

  readFloat(): number {
    this.checkBounds(4);
    const value = this.view.getFloat32(this.position, true);
    this.position += 4;
    return value;
  }

  readDouble(): number {
    this.checkBounds(8);
    const value = this.view.getFloat64(this.position, true);
    this.position += 8;
    return value;
  }

  readString(): string | null {
    const length = this.readInt32();

    if (length === -1) {
      return null;
    }

    // FR-019: Validate string length before allocation
    if (length < 0) {
      throw new CodecError(
        `Invalid string length: ${length} (must be -1 for null or >= 0)`,
        { format: 'Binary', suggestedAction: 'Check encoded data for corruption' }
      );
    }

    if (length > 16777216) {
      throw new CodecError(
        `String length ${length} exceeds maximum allowed length of 16,777,216 bytes`,
        { format: 'Binary', suggestedAction: 'Reject malformed or malicious input' }
      );
    }

    if (length === 0) {
      return '';
    }

    this.checkBounds(length);
    const value = new TextDecoder('utf-8').decode(this.buffer.subarray(this.position, this.position + length));
    this.position += length;
    return value;
  }

  readDateTime(): Date {
    // Read OPC UA DateTime (100-nanosecond ticks since 1601-01-01 UTC)
    const opcTimestamp = this.readInt64();
    const jsTimestamp = Number(opcTimestamp / TICKS_PER_MS - EPOCH_DIFF_MS);
    return new Date(jsTimestamp);
  }

  readGuid(): string {
    this.checkBounds(16);

    // Data1 (UInt32, bytes 0-3)
    const data1 = this.view.getUint32(this.position, true);

    // Data2 (UInt16, bytes 4-5)
    const data2 = this.view.getUint16(this.position + 4, true);

    // Data3 (UInt16, bytes 6-7)
    const data3 = this.view.getUint16(this.position + 6, true);

    // Data4 (Byte[8], bytes 8-15)
    const data4 = [];
    for (let i = 0; i < 8; i++) {
      data4.push(this.buffer[this.position + 8 + i]);
    }

    this.position += 16;

    // Format as standard GUID string
    const hex = (value: number, width: number) =>
      value.toString(16).padStart(width, '0');

    return `${hex(data1, 8)}-${hex(data2, 4)}-${hex(data3, 4)}-${hex(data4[0], 2)}${hex(data4[1], 2)}-${data4.slice(2).map(b => hex(b, 2)).join('')}`;
  }

  readByteString(): Uint8Array | null {
    const length = this.readInt32();

    if (length === -1) {
      return null;
    }

    // FR-019: Validate ByteString length before allocation
    if (length < 0) {
      throw new CodecError(
        `Invalid ByteString length: ${length} (must be -1 for null or >= 0)`,
        { format: 'Binary', suggestedAction: 'Check encoded data for corruption' }
      );
    }

    if (length > 16777216) {
      throw new CodecError(
        `ByteString length ${length} exceeds maximum allowed length of 16,777,216 bytes`,
        { format: 'Binary', suggestedAction: 'Reject malformed or malicious input' }
      );
    }

    if (length === 0) {
      return new Uint8Array(0);
    }

    this.checkBounds(length);
    const value = this.buffer.subarray(this.position, this.position + length);
    this.position += length;
    return value;
  }

  readXmlElement(): string | undefined {
    // XmlElement is encoded as string in binary format; map null → undefined
    return this.readString() ?? undefined;
  }

  /**
   * Read an array with Int32 length prefix.
   * Per FR-011: -1 = null, 0 = empty, positive = element count
   * Per FR-019: Validate array length is within reasonable bounds
   * 
   * @param decodeElement Function to decode each element
   * @returns The decoded array or undefined
   * @throws {CodecError} if array length is invalid
   * @see OPC 10000-6 Section 5.2.5 - Arrays
   */
  readArray<T>(decodeElement: (decoder: this) => T): T[] | undefined {
    const length = this.readInt32();

    // FR-011: -1 indicates null array
    if (length === -1) {
      return undefined;
    }

    // FR-019: Validate array length
    if (length < 0) {
      throw new CodecError(
        `Invalid array length ${length}: must be -1 (null) or non-negative`,
        { format: 'Binary', suggestedAction: 'Check encoded data integrity' }
      );
    }

    // FR-019: Reject unreasonably large arrays (would exceed memory)
    if (length > 100000000) {
      throw new CodecError(
        `Array length ${length} exceeds maximum safe length of 100,000,000 elements`,
        { format: 'Binary', suggestedAction: 'Check encoded data or increase limits' }
      );
    }

    const array: T[] = [];
    for (let i = 0; i < length; i++) {
      array.push(decodeElement(this));
    }

    return array;
  }

  // === Complex type read methods ===

  /**
   * Decode a NodeId from binary format, supporting all six encoding formats.
   * @see OPC 10000-6 Tables 16-19
   */
  readNodeId(): NodeId {
    return this.readNodeIdWithMask(0);
  }

  /**
   * Decode an ExpandedNodeId from binary format.
   * @see OPC 10000-6 Table 20
   */
  readExpandedNodeId(): ExpandedNodeId {
    const startPos = this.position;
    const encodingByte = this.buffer[startPos];

    const hasNamespaceUri = (encodingByte & ExpandedNodeIdMask.NamespaceUriFlag) !== 0;
    const hasServerIndex = (encodingByte & ExpandedNodeIdMask.ServerIndexFlag) !== 0;

    const nodeId = this.readNodeIdWithMask(ExpandedNodeIdMask.ServerIndexFlag | ExpandedNodeIdMask.NamespaceUriFlag);

    let namespaceUri: string | undefined = undefined;
    if (hasNamespaceUri) {
      const uri = this.readString();
      if (uri === null) {
        throw new CodecError('ExpandedNodeId NamespaceUri cannot be null when flag is set');
      }
      namespaceUri = uri;
    }

    let serverIndex: number | undefined = undefined;
    if (hasServerIndex) {
      serverIndex = this.readUInt32();
    }

    return new ExpandedNodeId(nodeId.namespace, nodeId.identifier, namespaceUri, serverIndex);
  }

  /**
   * Decode a StatusCode from a UInt32.
   * @see OPC 10000-6 Section 5.2.2.16
   */
  readStatusCode(): StatusCode {
    return this.readUInt32() as StatusCode;
  }

  /**
   * Decode a QualifiedName as NamespaceIndex (UInt16) + Name (String).
   * @see OPC 10000-6 Table 8
   */
  readQualifiedName(): QualifiedName {
    const namespaceIndex = this.readUInt16();
    const name = this.readString();
    if (name === null) {
      throw new CodecError('QualifiedName name cannot be null');
    }
    return new QualifiedName(namespaceIndex, name);
  }

  /**
   * Decode a LocalizedText with optional locale and text.
   * @see OPC 10000-6 Table 9
   */
  readLocalizedText(): LocalizedText {
    const encodingMask = this.readByte();

    let locale: string | undefined = undefined;
    if (encodingMask & LocalizedTextMask.LocaleFlag) {
      locale = this.readString() ?? undefined;
    }

    let text = '';
    if (encodingMask & LocalizedTextMask.TextFlag) {
      text = this.readString() ?? '';
    }

    return new LocalizedText(locale, text);
  }

  /**
   * Decode an ExtensionObject with its TypeId and body.
   * @see OPC 10000-6 Section 5.2.2.15
   */
  readExtensionObject(decoder: Decoder): ExtensionObject {
    const typeId = this.readNodeId();
    const encoding = this.readByte();

    if (encoding !== ExtensionObjectEncoding.None &&
      encoding !== ExtensionObjectEncoding.Binary &&
      encoding !== ExtensionObjectEncoding.Xml) {
      throw new CodecError(`Invalid ExtensionObject encoding byte: ${encoding}. Must be 0, 1, or 2.`);
    }

    let data: IOpcType | undefined = undefined;

    switch (encoding) {
      case ExtensionObjectEncoding.None: { break; }
      case ExtensionObjectEncoding.Binary: {
        const reader = new BinaryReader(this.readByteString() as Uint8Array);
        data = decoder.decodeWithEncodingId(typeId.identifier as number, reader);// todo: we need to handle the node id. use different decoders for different namesapces and support other node id types

        break;
      }
      case ExtensionObjectEncoding.Xml: {
        const reader = new XmlReader(this.readString() as string);
        data = decoder.decodeWithEncodingId(typeId.identifier as number, reader);// todo: we need to handle the node id. use different decoders for different namesapces and support other node id types

        break;
      }
    }

    return new ExtensionObject(typeId, encoding, data);
  }

  /**
   * Decode a DataValue with optional fields controlled by an encoding mask.
   * @see OPC 10000-6 Table 26
   */
  readDataValue(decoder: Decoder): DataValue {
    const encodingMask = this.readByte();

    let value: Variant | undefined = undefined;
    if (encodingMask & DataValueMaskBits.Value) {
      value = this.readVariant(decoder);
    }

    let statusCode: StatusCode | undefined = undefined;
    if (encodingMask & DataValueMaskBits.StatusCode) {
      statusCode = this.readUInt32() as StatusCode;
    }

    let sourceTimestamp: Date | undefined = undefined;
    if (encodingMask & DataValueMaskBits.SourceTimestamp) {
      sourceTimestamp = this.readDateTime();
    }

    let serverTimestamp: Date | undefined = undefined;
    if (encodingMask & DataValueMaskBits.ServerTimestamp) {
      serverTimestamp = this.readDateTime();
    }

    let sourcePicoseconds: number | undefined = undefined;
    if (encodingMask & DataValueMaskBits.SourcePicoseconds) {
      sourcePicoseconds = this.readUInt16();
    }

    let serverPicoseconds: number | undefined = undefined;
    if (encodingMask & DataValueMaskBits.ServerPicoseconds) {
      serverPicoseconds = this.readUInt16();
    }

    return new DataValue(value, statusCode, sourceTimestamp, serverTimestamp, sourcePicoseconds, serverPicoseconds);
  }

  /**
   * Decode a Variant with type ID, value(s), and optional array dimensions.
   * @see OPC 10000-6 Section 5.2.2.16
   */
  readVariant(decoder: Decoder): Variant {
    const mask = this.readByte();
    const type = mask & VariantMask.TypeMask;

    if (type > 25) {
      throw new CodecError(`Invalid Variant type ID: ${type}. Must be 0-25.`);
    }

    const hasArray = (mask & VariantMask.Array) !== 0;
    const hasDimensions = (mask & VariantMask.ArrayDimensions) !== 0;

    let value: VariantValue | VariantArrayValue | undefined;

    if (hasArray) {
      const length = this.readInt32();
      if (length < 0) {
        throw new CodecError(`Invalid array length: ${length}`);
      }
      const array: unknown[] = [];
      for (let i = 0; i < length; i++) {
        array.push(this.readVariantValue(type, decoder));
      }
      value = array as VariantArrayValue;
    } else if (type === BuiltInType.Null) {
      value = undefined;
    } else {
      value = this.readVariantValue(type, decoder) as VariantValue;
    }

    let dimensions: number[] | undefined = undefined;
    if (hasDimensions) {
      const dimCount = this.readInt32();
      if (dimCount < 0) {
        throw new CodecError(`Invalid dimensions count: ${dimCount}`);
      }
      dimensions = [];
      for (let i = 0; i < dimCount; i++) {
        dimensions.push(this.readInt32());
      }
    }

    return new Variant(type, value, dimensions);
  }

  /**
   * Decode a DiagnosticInfo with optional fields controlled by an encoding mask.
   * Supports recursive InnerDiagnosticInfo.
   * @see OPC 10000-6 Table 24
   */
  readDiagnosticInfo(): DiagnosticInfo {
    const encodingMask = this.readByte();

    let symbolicId: number | undefined = undefined;
    if (encodingMask & DiagnosticInfoMaskBits.SymbolicId) {
      symbolicId = this.readInt32();
    }

    let namespaceUri: number | undefined = undefined;
    if (encodingMask & DiagnosticInfoMaskBits.NamespaceUri) {
      namespaceUri = this.readInt32();
    }

    let localizedText: number | undefined = undefined;
    if (encodingMask & DiagnosticInfoMaskBits.LocalizedText) {
      localizedText = this.readInt32();
    }

    let locale: number | undefined = undefined;
    if (encodingMask & DiagnosticInfoMaskBits.Locale) {
      locale = this.readInt32();
    }

    let additionalInfo: string | undefined = undefined;
    if (encodingMask & DiagnosticInfoMaskBits.AdditionalInfo) {
      additionalInfo = this.readString() ?? undefined;
    }

    let innerStatusCode: StatusCode | undefined = undefined;
    if (encodingMask & DiagnosticInfoMaskBits.InnerStatusCode) {
      innerStatusCode = this.readUInt32() as StatusCode;
    }

    let innerDiagnosticInfo: DiagnosticInfo | undefined = undefined;
    if (encodingMask & DiagnosticInfoMaskBits.InnerDiagnosticInfo) {
      innerDiagnosticInfo = this.readDiagnosticInfo();
    }

    return new DiagnosticInfo({
      symbolicId,
      namespaceUri,
      localizedText,
      locale,
      additionalInfo,
      innerStatusCode,
      innerDiagnosticInfo,
    });
  }

  // === Private helpers ===

  /**
   * Decode a NodeId with optional flag masking (used internally by readExpandedNodeId).
   */
  private readNodeIdWithMask(maskBits: number): NodeId {
    let encodingByte = this.readByte();
    if (maskBits !== 0) {
      encodingByte = encodingByte & ~maskBits;
    }

    switch (encodingByte) {
      case NodeIdEncodingByte.TwoByte: {
        const identifier = this.readByte();
        return new NodeId(0, identifier);
      }
      case NodeIdEncodingByte.FourByte: {
        const namespace = this.readByte();
        const identifier = this.readUInt16();
        return new NodeId(namespace, identifier);
      }
      case NodeIdEncodingByte.Numeric: {
        const namespace = this.readUInt16();
        const identifier = this.readUInt32();
        return new NodeId(namespace, identifier);
      }
      case NodeIdEncodingByte.String: {
        const namespace = this.readUInt16();
        const identifier = this.readString();
        if (identifier === null) {
          throw new CodecError('NodeId String identifier cannot be null');
        }
        return new NodeId(namespace, identifier);
      }
      case NodeIdEncodingByte.Guid: {
        const namespace = this.readUInt16();
        const identifier = this.readGuid();
        return new NodeId(namespace, identifier);
      }
      case NodeIdEncodingByte.ByteString: {
        const namespace = this.readUInt16();
        const identifier = this.readByteString();
        if (identifier === null) {
          throw new CodecError('NodeId ByteString identifier cannot be null');
        }
        return new NodeId(namespace, identifier);
      }
      default:
        throw new CodecError(
          `Invalid NodeId encoding byte: 0x${encodingByte.toString(16).padStart(2, '0')}`,
          { format: 'Binary', suggestedAction: 'Check encoded data for corruption' },
        );
    }
  }

  private readVariantValue(type: BuiltInType, decoder: Decoder): unknown {
    switch (type) {
      case BuiltInType.Null: return null;
      case BuiltInType.Boolean: return this.readBoolean();
      case BuiltInType.SByte: return this.readSByte();
      case BuiltInType.Byte: return this.readByte();
      case BuiltInType.Int16: return this.readInt16();
      case BuiltInType.UInt16: return this.readUInt16();
      case BuiltInType.Int32: return this.readInt32();
      case BuiltInType.UInt32: return this.readUInt32();
      case BuiltInType.Int64: return this.readInt64();
      case BuiltInType.UInt64: return this.readUInt64();
      case BuiltInType.Float: return this.readFloat();
      case BuiltInType.Double: return this.readDouble();
      case BuiltInType.String: return this.readString();
      case BuiltInType.DateTime: return this.readDateTime();
      case BuiltInType.Guid: return this.readGuid();
      case BuiltInType.ByteString: return this.readByteString();
      case BuiltInType.XmlElement: return this.readXmlElement();
      case BuiltInType.NodeId: return this.readNodeId();
      case BuiltInType.ExpandedNodeId: return this.readExpandedNodeId();
      case BuiltInType.StatusCode: return this.readStatusCode();
      case BuiltInType.QualifiedName: return this.readQualifiedName();
      case BuiltInType.LocalizedText: return this.readLocalizedText();
      case BuiltInType.ExtensionObject: return this.readExtensionObject(decoder);
      case BuiltInType.DataValue: return this.readDataValue(decoder);
      case BuiltInType.Variant: return this.readVariant(decoder);
      case BuiltInType.DiagnosticInfo: return this.readDiagnosticInfo();
      default: throw new CodecError(`Unsupported Variant type: ${type}`);
    }
  }

  getPosition(): number {
    return this.position;
  }

  /**
   * Read all remaining bytes from the current position to the end of the buffer.
   * Advances the position to the end.
   */
  readRemainingBytes(): Uint8Array {
    const value = this.buffer.subarray(this.position);
    this.position = this.buffer.length;
    return value;
  }

  rewind(): void {
    this.position = 0;
  }

  getLength(): number {
    return this.buffer.length;
  }

  getBuffer(): Uint8Array {
    return this.buffer;
  }

  getUnreadData(): Uint8Array {
    return this.buffer.subarray(this.position);
  }

  constructor(data: Uint8Array) {
    this.buffer = data;
    this.view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    this.position = 0;
  }
}
