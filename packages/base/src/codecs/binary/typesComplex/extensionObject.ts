/**
 * @fileoverview ExtensionObject binary decoder
 * @module codec/binary/typesComplex/extensionObject
 * @see OPC 10000-6 Section 5.2.2.15 - ExtensionObject
 */

import { CodecError } from '../../codecError.js';
import type { IReader } from '../../interfaces/iReader.js';
import type { IWriter } from '../../interfaces/iWriter.js';
import { ExtensionObject } from '../../../types/extensionObject.js';
import { ExpandedNodeId } from '../../../types/expandedNodeId.js';
import { ExtensionObjectEncoding } from '../../../types/extensionObjectEncoding.js';
import type { IOpcType } from '../../../types/iOpcType.js';
import { Decoder } from '../../decoder.js';
import { Encoder } from '../../encoder.js';
import { BinaryReader } from '../binaryReader.js';
import { XmlReader } from '../../xml/xmlReader.js';
import { encodeNodeId } from './nodeId.js';
import { encodeExpandedNodeId } from './expandedNodeId.js';

/**
 * Decode an ExtensionObject with its TypeId and body.
 * @see OPC 10000-6 Section 5.2.2.15
 */
export function decodeExtensionObject(reader: IReader, decoder: Decoder): ExtensionObject {
  const typeId = reader.readNodeId();
  const encoding = reader.readByte();

  if (encoding !== ExtensionObjectEncoding.None &&
    encoding !== ExtensionObjectEncoding.Binary &&
    encoding !== ExtensionObjectEncoding.Xml) {
    throw new CodecError(`Invalid ExtensionObject encoding byte: ${encoding}. Must be 0, 1, or 2.`);
  }

  let data: IOpcType | undefined = undefined;

  switch (encoding) {
    case ExtensionObjectEncoding.None: { break; }
    case ExtensionObjectEncoding.Binary: {
      const innerReader = new BinaryReader(reader.readByteString() as Uint8Array);
      data = decoder.decodeWithEncodingId(typeId.identifier as number, innerReader);
      break;
    }
    case ExtensionObjectEncoding.Xml: {
      const innerReader = new XmlReader(reader.readString() as string);
      data = decoder.decodeWithEncodingId(typeId.identifier as number, innerReader);
      break;
    }
  }

  return new ExtensionObject(typeId, encoding, data);
}

/**
 * Encode an ExtensionObject with its TypeId and body.
 * @see OPC 10000-6 Section 5.2.2.15
 */
export function encodeExtensionObject(writer: IWriter, value: ExtensionObject, encoder: Encoder): void {
  const typeId = value.typeId;
  if (typeId instanceof ExpandedNodeId) {
    encodeExpandedNodeId(writer, typeId);
  } else {
    encodeNodeId(writer, typeId);
  }

  writer.writeByte(value.encoding);

  switch (value.encoding) {
    case ExtensionObjectEncoding.None:
      break;
    case ExtensionObjectEncoding.Binary: {
      if (!value.data) {
        throw new CodecError('ExtensionObject with Binary encoding must have data');
      }
      const binaryData = encoder.encodeWithoutId(value.data, 'binary') as Uint8Array;
      writer.writeByteString(binaryData);
      break;
    }
    case ExtensionObjectEncoding.Xml: {
      if (!value.data) {
        throw new CodecError('ExtensionObject with Xml encoding must have data');
      }
      const xmlString = encoder.encodeWithoutId(value.data, 'xml') as string;
      writer.writeXmlElement(xmlString);
      break;
    }
    default:
      throw new CodecError(`Invalid ExtensionObject encoding: ${value.encoding}`);
  }
}
