/**
 * OPC UA Primitive Type Mappings
 * 
 * Defines TypeScript type mappings for OPC UA primitive types.
 * Primitives map directly to native TypeScript types without wrapper classes.
 * 
 * @module primitives
 */

import { BuiltInType } from "./builtinType";

export type UaBoolean = boolean;
/**
 * OPC UA Builtin Type Numeric IDs
 * 
 * These correspond to the NodeId numeric identifiers defined in OPC UA Part 6, Table 1.
 */
export type UaSbyte = {value: number; readonly type: BuiltInType.SByte };
export const uaSbyte = (value: number): UaSbyte => ({ value, type: BuiltInType.SByte });

export type UaByte = {value: number; readonly type: BuiltInType.Byte };
export const uaByte = (value: number): UaByte => ({ value, type: BuiltInType.Byte });

export type UaInt16 = {value: number; readonly type: BuiltInType.Int16 };
export const uaInt16 = (value: number): UaInt16 => ({ value, type: BuiltInType.Int16 });

export type UaUint16 = {value: number; readonly type: BuiltInType.UInt16 };
export const uaUint16 = (value: number): UaUint16 => ({ value, type: BuiltInType.UInt16 });

export type UaInt32 = {value: number; readonly type: BuiltInType.Int32 };
export const uaInt32 = (value: number): UaInt32 => ({ value, type: BuiltInType.Int32 });

export type UaUint32 = {value: number; readonly type: BuiltInType.UInt32 };
export const uaUint32 = (value: number): UaUint32 => ({ value, type: BuiltInType.UInt32 });

export type UaInt64 = {value: bigint; readonly type: BuiltInType.Int64 };
export const uaInt64 = (value: bigint): UaInt64 => ({ value, type: BuiltInType.Int64 });

export type UaUint64 = {value: bigint; readonly type: BuiltInType.UInt64 };
export const uaUint64 = (value: bigint): UaUint64 => ({ value, type: BuiltInType.UInt64 });

export type UaFloat = {value: number; readonly type: BuiltInType.Float };
export const uaFloat = (value: number): UaFloat => ({ value, type: BuiltInType.Float });

export type UaDouble = {value: number; readonly type: BuiltInType.Double };
export const uaDouble = (value: number): UaDouble => ({ value, type: BuiltInType.Double });

/**
 * OPC UA String primitive type.
 *
 * A String in OPC UA can be null (encoded as length -1 in binary).
 * Using `string | null` instead of `string | undefined` aligns with the
 * OPC UA specification where null is an explicit, valid value distinct
 * from an empty string.
 */
export type UaString = string | null;

export type UaDateTime = Date

export type UaGuid = {value: string; readonly type: BuiltInType.Guid};
export const uaGuid = (value: string): UaGuid => ({ value, type: BuiltInType.Guid });

/**
 * OPC UA ByteString primitive type.
 *
 * A ByteString in OPC UA can be null (encoded as length -1 in binary).
 * Using `Uint8Array | null` instead of `Uint8Array | undefined` aligns
 * with the OPC UA specification where null is an explicit, valid value
 * distinct from an empty byte array.
 */
export type UaByteString = Uint8Array | null;

/**
 * Union of all OPC UA primitive types accepted by {@link Variant.newFrom}.
 */
export type UaPrimitive =
  | UaBoolean
  | UaSbyte
  | UaByte
  | UaInt16
  | UaUint16
  | UaInt32
  | UaUint32
  | UaInt64
  | UaUint64
  | UaFloat
  | UaDouble
  | UaString
  | UaDateTime
  | UaGuid
  | UaByteString;

