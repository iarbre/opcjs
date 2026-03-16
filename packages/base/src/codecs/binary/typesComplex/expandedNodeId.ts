/**
 * @fileoverview ExpandedNodeId binary codec (encoder + decoder)
 * @module codec/binary/typesComplex/expandedNodeId
 * @see OPC 10000-6 Section 5.2.2.10 - ExpandedNodeId
 * @see OPC 10000-6 Table 20 - ExpandedNodeId encoding
 */

import type { IReader } from '../../interfaces/iReader.js';
import type { IWriter } from '../../interfaces/iWriter.js';
import { CodecError } from '../../codecError.js';
import { ExpandedNodeId } from '../../../types/expandedNodeId.js';
import { decodeNodeIdFromEncodingByte, encodeNodeId, encodeNodeIdWithExtraFlags } from './nodeId.js';

const ExpandedNodeIdMask = {
  ServerIndexFlag: 0x40,
  NamespaceUriFlag: 0x80,
} as const;

/**
 * Decode an ExpandedNodeId from binary format.
 * @see OPC 10000-6 Table 20
 */
export function decodeExpandedNodeId(reader: IReader): ExpandedNodeId {
  const encodingByte = reader.readByte();
  const hasNamespaceUri = (encodingByte & ExpandedNodeIdMask.NamespaceUriFlag) !== 0;
  const hasServerIndex = (encodingByte & ExpandedNodeIdMask.ServerIndexFlag) !== 0;
  const maskedByte = encodingByte & ~(ExpandedNodeIdMask.ServerIndexFlag | ExpandedNodeIdMask.NamespaceUriFlag);
  const nodeId = decodeNodeIdFromEncodingByte(reader, maskedByte);

  let namespaceUri: string | undefined = undefined;
  if (hasNamespaceUri) {
    const uri = reader.readString();
    if (uri === null) {
      throw new CodecError('ExpandedNodeId NamespaceUri cannot be null when flag is set');
    }
    namespaceUri = uri;
  }

  let serverIndex: number | undefined = undefined;
  if (hasServerIndex) {
    serverIndex = reader.readUInt32();
  }

  return new ExpandedNodeId(nodeId.namespace, nodeId.identifier, namespaceUri, serverIndex);
}

/**
 * Encode an ExpandedNodeId in binary format.
 * @see OPC 10000-6 Table 20
 */
export function encodeExpandedNodeId(writer: IWriter, value: ExpandedNodeId): void {
  let extraFlags = 0;
  if (value.namespaceUri !== undefined) { extraFlags |= ExpandedNodeIdMask.NamespaceUriFlag; }
  if (value.serverIndex !== undefined) { extraFlags |= ExpandedNodeIdMask.ServerIndexFlag; }

  if (extraFlags === 0) {
    encodeNodeId(writer, value);
  } else {
    encodeNodeIdWithExtraFlags(writer, value, extraFlags);
  }

  if (value.namespaceUri !== undefined) { writer.writeString(value.namespaceUri); }
  if (value.serverIndex !== undefined) { writer.writeUInt32(value.serverIndex); }
}
