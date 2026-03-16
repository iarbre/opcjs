/**
 * @fileoverview NodeId binary codec (encoder + decoder)
 * @module codec/binary/typesComplex/nodeId
 * @see OPC 10000-6 Section 5.2.2.9 - NodeId
 * @see OPC 10000-6 Tables 16-19 - NodeId encoding formats
 */

import type { IReader } from '../../interfaces/iReader.js';
import type { IWriter } from '../../interfaces/iWriter.js';
import { CodecError } from '../../codecError.js';
import { NodeId, NodeIdType } from '../../../types/nodeId.js';

enum NodeIdEncodingByte {
  TwoByte = 0x00,
  FourByte = 0x01,
  Numeric = 0x02,
  String = 0x03,
  Guid = 0x04,
  ByteString = 0x05,
}

/**
 * Decode the body of a NodeId after the encoding byte has been read and masked.
 * Also called by decodeExpandedNodeId to avoid re-reading the encoding byte.
 * @see OPC 10000-6 Tables 16-19
 */
export function decodeNodeIdFromEncodingByte(reader: IReader, encodingByte: number): NodeId {
  switch (encodingByte) {
    case NodeIdEncodingByte.TwoByte: {
      const identifier = reader.readByte();
      return new NodeId(0, identifier);
    }
    case NodeIdEncodingByte.FourByte: {
      const namespace = reader.readByte();
      const identifier = reader.readUInt16();
      return new NodeId(namespace, identifier);
    }
    case NodeIdEncodingByte.Numeric: {
      const namespace = reader.readUInt16();
      const identifier = reader.readUInt32();
      return new NodeId(namespace, identifier);
    }
    case NodeIdEncodingByte.String: {
      const namespace = reader.readUInt16();
      const identifier = reader.readString();
      if (identifier === null) {
        throw new CodecError('NodeId String identifier cannot be null');
      }
      return new NodeId(namespace, identifier);
    }
    case NodeIdEncodingByte.Guid: {
      const namespace = reader.readUInt16();
      const identifier = reader.readGuid();
      return new NodeId(namespace, identifier);
    }
    case NodeIdEncodingByte.ByteString: {
      const namespace = reader.readUInt16();
      const identifier = reader.readByteString();
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

/**
 * Decode a NodeId, reading the encoding byte with optional flag masking.
 * @param maskBits - Flag bits to mask out from the encoding byte (used by ExpandedNodeId)
 */
export function decodeNodeIdWithMask(reader: IReader, maskBits: number): NodeId {
  let encodingByte = reader.readByte();
  if (maskBits !== 0) {
    encodingByte = encodingByte & ~maskBits;
  }
  return decodeNodeIdFromEncodingByte(reader, encodingByte);
}

/**
 * Decode a NodeId from binary format.
 * @see OPC 10000-6 Tables 16-19
 */
export function decodeNodeId(reader: IReader): NodeId {
  return decodeNodeIdWithMask(reader, 0);
}

// === Encoder ===

function selectNodeIdEncodingFormat(nodeId: NodeId): NodeIdEncodingByte {
  if (nodeId.identifierType === NodeIdType.Numeric) {
    const id = nodeId.identifier as number;
    const ns = nodeId.namespace;
    if (ns === 0 && id >= 0 && id <= 255) { return NodeIdEncodingByte.TwoByte; }
    if (ns >= 0 && ns <= 255 && id >= 0 && id <= 65535) { return NodeIdEncodingByte.FourByte; }
    return NodeIdEncodingByte.Numeric;
  }
  if (nodeId.identifierType === NodeIdType.String) { return NodeIdEncodingByte.String; }
  if (nodeId.identifierType === NodeIdType.Guid) { return NodeIdEncodingByte.Guid; }
  if (nodeId.identifierType === NodeIdType.ByteString) { return NodeIdEncodingByte.ByteString; }
  throw new CodecError(`Invalid NodeId identifier type: ${nodeId.identifierType}`);
}

/**
 * Encode a NodeId in binary format using the most compact representation.
 * @see OPC 10000-6 Tables 16-19
 */
export function encodeNodeId(writer: IWriter, value: NodeId): void {
  encodeNodeIdWithExtraFlags(writer, value, 0);
}

/**
 * Encode a NodeId with extra flags OR'd into the encoding byte.
 * Used by ExpandedNodeId to set NamespaceUri/ServerIndex flags before writing.
 * @param extraFlags - Bits to OR into the leading encoding byte
 */
export function encodeNodeIdWithExtraFlags(writer: IWriter, value: NodeId, extraFlags: number): void {
  const format = selectNodeIdEncodingFormat(value);
  const encodingByte = (format as number) | extraFlags;
  switch (format) {
    case NodeIdEncodingByte.TwoByte:
      writer.writeByte(encodingByte);
      writer.writeByte(value.identifier as number);
      break;
    case NodeIdEncodingByte.FourByte:
      writer.writeByte(encodingByte);
      writer.writeByte(value.namespace);
      writer.writeUInt16(value.identifier as number);
      break;
    case NodeIdEncodingByte.Numeric:
      writer.writeByte(encodingByte);
      writer.writeUInt16(value.namespace);
      writer.writeUInt32(value.identifier as number);
      break;
    case NodeIdEncodingByte.String:
      writer.writeByte(encodingByte);
      writer.writeUInt16(value.namespace);
      writer.writeString(value.identifier as string);
      break;
    case NodeIdEncodingByte.Guid:
      writer.writeByte(encodingByte);
      writer.writeUInt16(value.namespace);
      writer.writeGuid(value.identifier as string);
      break;
    case NodeIdEncodingByte.ByteString:
      writer.writeByte(encodingByte);
      writer.writeUInt16(value.namespace);
      writer.writeByteString(value.identifier as Uint8Array);
      break;
    default:
      throw new CodecError(`Unsupported NodeId encoding format: ${format}`);
  }
}
