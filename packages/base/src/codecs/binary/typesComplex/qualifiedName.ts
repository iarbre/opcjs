/**
 * @fileoverview QualifiedName binary codec (encoder + decoder)
 * @module codec/binary/typesComplex/qualifiedName
 * @see OPC 10000-6 Section 5.2.2.13 - QualifiedName
 * @see OPC 10000-3 Section 7.18 - QualifiedName
 */

import type { IReader } from '../../interfaces/iReader.js';
import type { IWriter } from '../../interfaces/iWriter.js';
import { CodecError } from '../../codecError.js';
import { QualifiedName } from '../../../types/qualifiedName.js';

/**
 * Decode a QualifiedName as NamespaceIndex (UInt16) + Name (String).
 * @see OPC 10000-6 Table 8
 */
export function decodeQualifiedName(reader: IReader): QualifiedName {
  const namespaceIndex = reader.readUInt16();
  const name = reader.readString();
  if (name === null) {
    throw new CodecError('QualifiedName name cannot be null');
  }
  return new QualifiedName(namespaceIndex, name);
}

/**
 * Encode a QualifiedName as NamespaceIndex (UInt16) + Name (String).
 * @see OPC 10000-6 Table 8
 */
export function encodeQualifiedName(writer: IWriter, value: QualifiedName): void {
  writer.writeUInt16(value.namespaceIndex);
  writer.writeString(value.name);
}
