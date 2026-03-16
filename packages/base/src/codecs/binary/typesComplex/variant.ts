/**
 * @fileoverview Variant binary decoder
 * @module codec/binary/typesComplex/variant
 * @see OPC 10000-6 Section 5.2.2.16 - Variant
 * @see OPC 10000-6 Table 25
 */

import type { IReader } from '../../interfaces/iReader.js';
import type { IWriter } from '../../interfaces/iWriter.js';
import { CodecError } from '../../codecError.js';
import { Variant, VariantArrayValue, VariantValue } from '../../../types/variant.js';
import { BuiltInType } from '../../../types/builtinType.js';
import { NodeId } from '../../../types/nodeId.js';
import { ExpandedNodeId } from '../../../types/expandedNodeId.js';
import { StatusCode } from '../../../types/statusCode.js';
import { QualifiedName } from '../../../types/qualifiedName.js';
import { LocalizedText } from '../../../types/localizedText.js';
import { ExtensionObject } from '../../../types/extensionObject.js';
import { DataValue } from '../../../types/dataValue.js';
import { DiagnosticInfo } from '../../../types/diagnosticInfo.js';
import { Decoder } from '../../decoder.js';
import { Encoder } from '../../encoder.js';

const VariantMask = {
  TypeMask: 0x3F,
  ArrayDimensions: 0x40,
  Array: 0x80,
} as const;

function decodeVariantValue(reader: IReader, type: BuiltInType, decoder: Decoder): unknown {
  switch (type) {
    case BuiltInType.Null: return null;
    case BuiltInType.Boolean: return reader.readBoolean();
    case BuiltInType.SByte: return reader.readSByte();
    case BuiltInType.Byte: return reader.readByte();
    case BuiltInType.Int16: return reader.readInt16();
    case BuiltInType.UInt16: return reader.readUInt16();
    case BuiltInType.Int32: return reader.readInt32();
    case BuiltInType.UInt32: return reader.readUInt32();
    case BuiltInType.Int64: return reader.readInt64();
    case BuiltInType.UInt64: return reader.readUInt64();
    case BuiltInType.Float: return reader.readFloat();
    case BuiltInType.Double: return reader.readDouble();
    case BuiltInType.String: return reader.readString();
    case BuiltInType.DateTime: return reader.readDateTime();
    case BuiltInType.Guid: return reader.readGuid();
    case BuiltInType.ByteString: return reader.readByteString();
    case BuiltInType.XmlElement: return reader.readXmlElement();
    case BuiltInType.NodeId: return reader.readNodeId();
    case BuiltInType.ExpandedNodeId: return reader.readExpandedNodeId();
    case BuiltInType.StatusCode: return reader.readStatusCode();
    case BuiltInType.QualifiedName: return reader.readQualifiedName();
    case BuiltInType.LocalizedText: return reader.readLocalizedText();
    case BuiltInType.ExtensionObject: return reader.readExtensionObject(decoder);
    case BuiltInType.DataValue: return reader.readDataValue(decoder);
    case BuiltInType.Variant: return reader.readVariant(decoder);
    case BuiltInType.DiagnosticInfo: return reader.readDiagnosticInfo();
    default: throw new CodecError(`Unsupported Variant type: ${type}`);
  }
}

/**
 * Decode a Variant with type ID, value(s), and optional array dimensions.
 * @see OPC 10000-6 Section 5.2.2.16
 */
export function decodeVariant(reader: IReader, decoder: Decoder): Variant {
  const mask = reader.readByte();
  const type = mask & VariantMask.TypeMask;

  if (type > 25) {
    throw new CodecError(`Invalid Variant type ID: ${type}. Must be 0-25.`);
  }

  const hasArray = (mask & VariantMask.Array) !== 0;
  const hasDimensions = (mask & VariantMask.ArrayDimensions) !== 0;

  let value: VariantValue | VariantArrayValue | undefined;

  if (hasArray) {
    const length = reader.readInt32();
    if (length < 0) {
      throw new CodecError(`Invalid array length: ${length}`);
    }
    const array: unknown[] = [];
    for (let i = 0; i < length; i++) {
      array.push(decodeVariantValue(reader, type, decoder));
    }
    value = array as VariantArrayValue;
  } else if (type === BuiltInType.Null) {
    value = undefined;
  } else {
    value = decodeVariantValue(reader, type, decoder) as VariantValue;
  }

  let dimensions: number[] | undefined = undefined;
  if (hasDimensions) {
    const dimCount = reader.readInt32();
    if (dimCount < 0) {
      throw new CodecError(`Invalid dimensions count: ${dimCount}`);
    }
    dimensions = [];
    for (let i = 0; i < dimCount; i++) {
      dimensions.push(reader.readInt32());
    }
  }

  return new Variant(type, value, dimensions);
}

// === Encoder ===

function encodeVariantValue(writer: IWriter, type: BuiltInType, value: unknown, encoder: Encoder): void {
  switch (type) {
    case BuiltInType.Null: break;
    case BuiltInType.Boolean: writer.writeBoolean(value as boolean); break;
    case BuiltInType.SByte: writer.writeSByte(value as number); break;
    case BuiltInType.Byte: writer.writeByte(value as number); break;
    case BuiltInType.Int16: writer.writeInt16(value as number); break;
    case BuiltInType.UInt16: writer.writeUInt16(value as number); break;
    case BuiltInType.Int32: writer.writeInt32(value as number); break;
    case BuiltInType.UInt32: writer.writeUInt32(value as number); break;
    case BuiltInType.Int64: writer.writeInt64(value as bigint); break;
    case BuiltInType.UInt64: writer.writeUInt64(value as bigint); break;
    case BuiltInType.Float: writer.writeFloat(value as number); break;
    case BuiltInType.Double: writer.writeDouble(value as number); break;
    case BuiltInType.String: writer.writeString(value as string); break;
    case BuiltInType.DateTime: writer.writeDateTime(value as Date); break;
    case BuiltInType.Guid: writer.writeGuid(value as string); break;
    case BuiltInType.ByteString: writer.writeByteString(value as Uint8Array); break;
    case BuiltInType.XmlElement: writer.writeXmlElement(value as string); break;
    case BuiltInType.NodeId: writer.writeNodeId(value as NodeId); break;
    case BuiltInType.ExpandedNodeId: writer.writeExpandedNodeId(value as ExpandedNodeId); break;
    case BuiltInType.StatusCode: writer.writeStatusCode(value as StatusCode); break;
    case BuiltInType.QualifiedName: writer.writeQualifiedName(value as QualifiedName); break;
    case BuiltInType.LocalizedText: writer.writeLocalizedText(value as LocalizedText); break;
    case BuiltInType.ExtensionObject: writer.writeExtensionObject(value as ExtensionObject, encoder); break;
    case BuiltInType.DataValue: writer.writeDataValue(value as DataValue, encoder); break;
    case BuiltInType.Variant: writer.writeVariant(value as Variant, encoder); break;
    case BuiltInType.DiagnosticInfo: writer.writeDiagnosticInfo(value as DiagnosticInfo); break;
    default: throw new CodecError(`Unsupported Variant type: ${type}`);
  }
}

/**
 * Encode a Variant with type ID, value(s), and optional array dimensions.
 * @see OPC 10000-6 Section 5.2.2.16
 */
export function encodeVariant(writer: IWriter, value: Variant, encoder: Encoder): void {
  if (value.type < 0 || value.type > 25) {
    throw new CodecError(`Invalid Variant type ID: ${value.type}. Must be 0-25.`);
  }

  let mask = value.type & VariantMask.TypeMask;
  const isArrayValue = Array.isArray(value.value);
  if (isArrayValue) { mask |= VariantMask.Array; }
  if (value.arrayDimensions !== undefined && value.arrayDimensions.length > 0) { mask |= VariantMask.ArrayDimensions; }

  writer.writeByte(mask);

  if (isArrayValue) {
    const array = value.value as unknown[];
    writer.writeInt32(array.length);
    for (const elem of array) {
      encodeVariantValue(writer, value.type, elem, encoder);
    }
  } else if (value.type !== BuiltInType.Null) {
    encodeVariantValue(writer, value.type, value.value, encoder);
  }

  if (value.arrayDimensions !== undefined && value.arrayDimensions.length > 0) {
    writer.writeInt32(value.arrayDimensions.length);
    for (const dim of value.arrayDimensions) {
      writer.writeInt32(dim);
    }
  }
}
