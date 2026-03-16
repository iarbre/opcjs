/**
 * @fileoverview StatusCode binary codec (encoder + decoder)
 * @module codec/binary/typesComplex/statusCode
 * @see OPC 10000-6 Section 5.2.2.16 - StatusCode
 * @see OPC 10000-4 Section 7.39 - StatusCode
 */

import type { IReader } from '../../interfaces/iReader.js';
import type { IWriter } from '../../interfaces/iWriter.js';
import { StatusCode } from '../../../types/statusCode.js';

/**
 * Decode a StatusCode from a UInt32.
 * @see OPC 10000-6 Section 5.2.2.16
 */
export function decodeStatusCode(reader: IReader): StatusCode {
  return reader.readUInt32() as StatusCode;
}

/**
 * Encode a StatusCode as a UInt32.
 * @see OPC 10000-6 Section 5.2.2.16
 */
export function encodeStatusCode(writer: IWriter, value: StatusCode): void {
  writer.writeUInt32(value);
}

