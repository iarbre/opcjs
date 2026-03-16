/**
 * @fileoverview Binary encoder implementation for OPC UA Binary encoding
 * @module codec/binary/encoder
 */

import { CodecError } from '../codecError.js';
import { NodeId } from '../../types/nodeId.js';
import { ExpandedNodeId } from '../../types/expandedNodeId.js';
import { StatusCode } from '../../types/statusCode.js';
import { QualifiedName } from '../../types/qualifiedName.js';
import { LocalizedText } from '../../types/localizedText.js';
import { ExtensionObject } from '../../types/extensionObject.js';
import { DataValue } from '../../types/dataValue.js';
import { Variant } from '../../types/variant.js';
import { DiagnosticInfo } from '../../types/diagnosticInfo.js';
import { IWriter } from '../interfaces/iWriter.js';
import { Encoder } from '../encoder.js';
import { XmlElement } from '../../types/xmlElement.js';
import { encodeNodeId } from './typesComplex/nodeId.js';
import { encodeExpandedNodeId } from './typesComplex/expandedNodeId.js';
import { encodeStatusCode } from './typesComplex/statusCode.js';
import { encodeQualifiedName } from './typesComplex/qualifiedName.js';
import { encodeLocalizedText } from './typesComplex/localizedText.js';
import { encodeExtensionObject } from './typesComplex/extensionObject.js';
import { encodeDataValue } from './typesComplex/dataValue.js';
import { encodeVariant } from './typesComplex/variant.js';
import { encodeDiagnosticInfo } from './typesComplex/diagnosticInfo.js';

/**
 * OPC UA DateTime epoch: January 1, 1601 00:00:00 UTC
 * JavaScript Date epoch: January 1, 1970 00:00:00 UTC
 * Difference in milliseconds
 */
const EPOCH_DIFF_MS = 11644473600000n;
const TICKS_PER_MS = 10000n;


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
    encodeNodeId(this, value);
  }

  /**
   * Encode an ExpandedNodeId in binary format.
   * @see OPC 10000-6 Table 20
   */
  writeExpandedNodeId(value: ExpandedNodeId): void {
    encodeExpandedNodeId(this, value);
  }

  /**
   * Encode a StatusCode as a UInt32.
   * @see OPC 10000-6 Section 5.2.2.16
   */
  writeStatusCode(value: StatusCode): void {
    encodeStatusCode(this, value);
  }

  /**
   * Encode a QualifiedName as NamespaceIndex (UInt16) + Name (String).
   * @see OPC 10000-6 Table 8
   */
  writeQualifiedName(value: QualifiedName): void {
    encodeQualifiedName(this, value);
  }

  /**
   * Encode a LocalizedText with optional locale and text.
   * @see OPC 10000-6 Table 9
   */
  writeLocalizedText(value: LocalizedText): void {
    encodeLocalizedText(this, value);
  }

  /**
   * Encode an ExtensionObject with its TypeId and body.
   * @see OPC 10000-6 Section 5.2.2.15
   */
  writeExtensionObject(value: ExtensionObject, encoder: Encoder): void {
    encodeExtensionObject(this, value, encoder);
  }

  /**
   * Encode a DataValue with optional fields controlled by an encoding mask.
   * @see OPC 10000-6 Table 26
   */
  writeDataValue(value: DataValue, encoder: Encoder): void {
    encodeDataValue(this, value, encoder);
  }

  /**
   * Encode a Variant with type ID, value(s), and optional array dimensions.
   * @see OPC 10000-6 Section 5.2.2.16
   */
  writeVariant(value: Variant, encoder: Encoder): void {
    encodeVariant(this, value, encoder);
  }

  /**
   * Encode a DiagnosticInfo with optional fields controlled by an encoding mask.
   * Supports recursive InnerDiagnosticInfo.
   * @see OPC 10000-6 Table 24
   */
  writeDiagnosticInfo(value: DiagnosticInfo): void {
    encodeDiagnosticInfo(this, value);
  }

  constructor(initialSize: number = 1024) {
    const data = new Uint8Array(initialSize);
    this.buffer = data
    this.view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    this.position = 0;
  }
}
