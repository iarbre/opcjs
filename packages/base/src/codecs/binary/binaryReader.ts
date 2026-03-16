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
import { DataValue } from '../../types/dataValue.js';
import { Variant } from '../../types/variant.js';
import { DiagnosticInfo } from '../../types/diagnosticInfo.js';
import type { IReader } from '../interfaces/iReader.js';
import { Decoder } from '../decoder.js';
import { decodeNodeId } from './typesComplex/nodeId.js';
import { decodeExpandedNodeId } from './typesComplex/expandedNodeId.js';
import { decodeStatusCode } from './typesComplex/statusCode.js';
import { decodeQualifiedName } from './typesComplex/qualifiedName.js';
import { decodeLocalizedText } from './typesComplex/localizedText.js';
import { decodeExtensionObject } from './typesComplex/extensionObject.js';
import { decodeDataValue } from './typesComplex/dataValue.js';
import { decodeVariant } from './typesComplex/variant.js';
import { decodeDiagnosticInfo } from './typesComplex/diagnosticInfo.js';

/**
 * OPC UA DateTime epoch: January 1, 1601 00:00:00 UTC
 * JavaScript Date epoch: January 1, 1970 00:00:00 UTC
 * Difference in milliseconds
 */
const EPOCH_DIFF_MS = 11644473600000n;
const TICKS_PER_MS = 10000n;


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
    return decodeNodeId(this);
  }

  /**
   * Decode an ExpandedNodeId from binary format.
   * @see OPC 10000-6 Table 20
   */
  readExpandedNodeId(): ExpandedNodeId {
    return decodeExpandedNodeId(this);
  }

  /**
   * Decode a StatusCode from a UInt32.
   * @see OPC 10000-6 Section 5.2.2.16
   */
  readStatusCode(): StatusCode {
    return decodeStatusCode(this);
  }

  /**
   * Decode a QualifiedName as NamespaceIndex (UInt16) + Name (String).
   * @see OPC 10000-6 Table 8
   */
  readQualifiedName(): QualifiedName {
    return decodeQualifiedName(this);
  }

  /**
   * Decode a LocalizedText with optional locale and text.
   * @see OPC 10000-6 Table 9
   */
  readLocalizedText(): LocalizedText {
    return decodeLocalizedText(this);
  }

  /**
   * Decode an ExtensionObject with its TypeId and body.
   * @see OPC 10000-6 Section 5.2.2.15
   */
  readExtensionObject(decoder: Decoder): ExtensionObject {
    return decodeExtensionObject(this, decoder);
  }

  /**
   * Decode a DataValue with optional fields controlled by an encoding mask.
   * @see OPC 10000-6 Table 26
   */
  readDataValue(decoder: Decoder): DataValue {
    return decodeDataValue(this, decoder);
  }

  /**
   * Decode a Variant with type ID, value(s), and optional array dimensions.
   * @see OPC 10000-6 Section 5.2.2.16
   */
  readVariant(decoder: Decoder): Variant {
    return decodeVariant(this, decoder);
  }

  /**
   * Decode a DiagnosticInfo with optional fields controlled by an encoding mask.
   * Supports recursive InnerDiagnosticInfo.
   * @see OPC 10000-6 Table 24
   */
  readDiagnosticInfo(): DiagnosticInfo {
    return decodeDiagnosticInfo(this);
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
