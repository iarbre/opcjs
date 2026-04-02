/**
 * @fileoverview DataValue binary decoder
 * @module codec/binary/typesComplex/dataValue
 * @see OPC 10000-6 Section 5.2.2.17 - DataValue
 * @see OPC 10000-4 Section 7.11 - DataValue
 */

import type { IReader } from '../../interfaces/iReader.js';
import type { IWriter } from '../../interfaces/iWriter.js';
import { DataValue } from '../../../types/dataValue.js';
import { StatusCode } from '../../../types/statusCode.js';
import { Variant } from '../../../types/variant.js';
import { Decoder } from '../../decoder.js';
import { Encoder } from '../../encoder.js';

const DataValueMaskBits = {
  Value: 0x01,
  StatusCode: 0x02,
  SourceTimestamp: 0x04,
  ServerTimestamp: 0x08,
  SourcePicoseconds: 0x10,
  ServerPicoseconds: 0x20,
} as const;

/**
 * Decode a DataValue with optional fields controlled by an encoding mask.
 * @see OPC 10000-6 Table 26
 */
export function decodeDataValue(reader: IReader, decoder: Decoder): DataValue {
  const encodingMask = reader.readByte();

  let value: Variant | undefined = undefined;
  if (encodingMask & DataValueMaskBits.Value) {
    value = reader.readVariant(decoder);
  }

  let statusCode: StatusCode | undefined = undefined;
  if (encodingMask & DataValueMaskBits.StatusCode) {
    statusCode = reader.readUInt32() as StatusCode;
  }

  let sourceTimestamp: Date | undefined = undefined;
  if (encodingMask & DataValueMaskBits.SourceTimestamp) {
    sourceTimestamp = reader.readDateTime();
  }

  let serverTimestamp: Date | undefined = undefined;
  if (encodingMask & DataValueMaskBits.ServerTimestamp) {
    serverTimestamp = reader.readDateTime();
  }

  let sourcePicoseconds: number | undefined = undefined;
  if (encodingMask & DataValueMaskBits.SourcePicoseconds) {
    sourcePicoseconds = reader.readUInt16();
  }

  let serverPicoseconds: number | undefined = undefined;
  if (encodingMask & DataValueMaskBits.ServerPicoseconds) {
    serverPicoseconds = reader.readUInt16();
  }

  return new DataValue(value, statusCode, sourceTimestamp, serverTimestamp, sourcePicoseconds, serverPicoseconds);
}

/**
 * Encode a DataValue with optional fields controlled by an encoding mask.
 * @see OPC 10000-6 Table 26
 */
export function encodeDataValue(writer: IWriter, value: DataValue, encoder: Encoder): void {
  let encodingMask = 0;
  if (value.value != null) { encodingMask |= DataValueMaskBits.Value; }
  if (value.statusCode != null) { encodingMask |= DataValueMaskBits.StatusCode; }
  if (value.sourceTimestamp != null) { encodingMask |= DataValueMaskBits.SourceTimestamp; }
  if (value.serverTimestamp != null) { encodingMask |= DataValueMaskBits.ServerTimestamp; }
  if (value.sourcePicoseconds != null) { encodingMask |= DataValueMaskBits.SourcePicoseconds; }
  if (value.serverPicoseconds != null) { encodingMask |= DataValueMaskBits.ServerPicoseconds; }

  writer.writeByte(encodingMask);

  if (encodingMask & DataValueMaskBits.Value) { writer.writeVariant(value.value as Variant, encoder); }
  if (encodingMask & DataValueMaskBits.StatusCode) { writer.writeUInt32(value.statusCode ?? StatusCode.Good); }
  if (encodingMask & DataValueMaskBits.SourceTimestamp) { writer.writeDateTime(value.sourceTimestamp!); }
  if (encodingMask & DataValueMaskBits.ServerTimestamp) { writer.writeDateTime(value.serverTimestamp!); }
  if (encodingMask & DataValueMaskBits.SourcePicoseconds) { writer.writeUInt16(value.sourcePicoseconds!); }
  if (encodingMask & DataValueMaskBits.ServerPicoseconds) { writer.writeUInt16(value.serverPicoseconds!); }
}
