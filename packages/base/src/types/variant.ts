/**
 * OPC UA Variant Type (i=24)
 * 
 * A Variant is a union type that can hold any OPC UA builtin type value
 * with runtime type information.
 * 
 * @see OPC UA Part 6, Section 5.1.2
 */

import type { NodeId } from './nodeId.js';
import type { ExpandedNodeId } from './expandedNodeId.js';
import type { LocalizedText } from './localizedText.js';
import type { QualifiedName } from './qualifiedName.js';
import type { XmlElement } from './xmlElement.js';
import type { ExtensionObject } from './extensionObject.js';
import type { DataValue } from './dataValue.js';
import type { DiagnosticInfo } from './diagnosticInfo.js';
import { StatusCode } from './statusCode.js';
import type { UaPrimitive } from './primitives.js';
import { BuiltInType } from './builtinType.js';

/**
 * Type union representing all possible variant values.
 */
export type VariantValue =
  | null
  | undefined
  | boolean
  | number
  | bigint
  | string
  | Date
  | Uint8Array
  | NodeId
  | ExpandedNodeId
  | QualifiedName
  | LocalizedText
  | XmlElement
  | ExtensionObject
  | DataValue
  | StatusCode
  | DiagnosticInfo
  | Variant;

/**
 * Type for variant arrays.
 */
export type VariantArrayValue = VariantValue[] | VariantValue[][];

/**
 * Represents an OPC UA Variant value with runtime type information.
 * 
 * A Variant can hold a scalar value, an array, or a multi-dimensional array
 * of any OPC UA builtin type.
 * 
 * @example
 * ```typescript
 * // Create a variant with an integer value
 * const intVariant = new Variant(VariantType.Int32, 42);
 * 
 * // Create a variant with an array
 * const arrayVariant = new Variant(VariantType.Double, [1.1, 2.2, 3.3], [3]);
 * 
 * // Check if variant is an array
 * if (arrayVariant.isArray()) {
 *   console.log('Array dimensions:', arrayVariant.arrayDimensions);
 * }
 * ```
 */
export class Variant {
  /**
   * The variant type identifier.
   */
  public readonly type: BuiltInType;

  /**
   * The variant value (scalar or array).
   */
  public readonly value: VariantValue | VariantArrayValue;

  /**
   * Optional array dimensions for multi-dimensional arrays.
   * For 1D arrays, this is [length].
   * For 2D arrays, this is [rows, cols], etc.
   */
  public readonly arrayDimensions: number[] | undefined;

  /**
   * Checks if this variant is null.
   * 
   * @returns True if the variant type is Null
   */
  public isNull(): boolean {
    return this.type === BuiltInType.Null;
  }

  /**
   * Checks if this variant contains an array.
   * 
   * @returns True if the value is an array
   */
  public isArray(): boolean {
    return Array.isArray(this.value);
  }

  /**
   * Checks if this variant contains a scalar value.
   * 
   * @returns True if the value is not an array
   */
  public isScalar(): boolean {
    return !this.isArray();
  }

  /**
   * Gets the array length for 1D arrays.
   * 
   * @returns The array length, or 0 if not an array
   */
  public getArrayLength(): number {
    if (this.isArray() && Array.isArray(this.value)) {
      return this.value.length;
    }
    return 0;
  }

  /**
   * Checks equality with another Variant.
   * 
   * @param other - The variant to compare with
   * @returns True if variants are equal
   */
  public equals(other: Variant): boolean {
    if (this.type !== other.type) {
      return false;
    }

    // Compare array dimensions
    if (this.arrayDimensions !== undefined || other.arrayDimensions !== undefined) {
      if (this.arrayDimensions === undefined || other.arrayDimensions === undefined) {
        return false;
      }
      if (this.arrayDimensions.length !== other.arrayDimensions.length) {
        return false;
      }
      for (let i = 0; i < this.arrayDimensions.length; i++) {
        if (this.arrayDimensions[i] !== other.arrayDimensions[i]) {
          return false;
        }
      }
    }

    // For simple comparison, convert to string representation
    // A full implementation would need type-specific comparison logic
    return JSON.stringify(this.value) === JSON.stringify(other.value);
  }

  /**
   * Converts the variant to a string representation.
   * 
   * @returns A string representation of the variant
   */
  public toString(): string {
    const typeName = BuiltInType[this.type];

    if (this.isNull()) {
      return 'Variant(Null)';
    }

    if (this.isArray()) {
      const dimStr = this.arrayDimensions
        ? `[${this.arrayDimensions.join(',')}]`
        : '[?]';
      return `Variant(${typeName}${dimStr})`;
    }

    return `Variant(${typeName}: ${String(this.value)})`;
  }

  /**
   * Creates a Variant from a typed OPC UA primitive value.
   *
   * Uses the `.type` discriminant on tagged primitives to determine the
   * VariantType exactly — no heuristic inference based on value ranges.
   *
   * @param value - A typed OPC UA primitive value.
   * @returns A new Variant wrapping the inner value with the correct VariantType.
   */
  public static newFrom<T extends UaPrimitive>(value: T): Variant {
    if (value === null || value === undefined) {
      return Variant.newNull();
    }
    // UaBoolean = boolean
    if (typeof value === 'boolean') {
      return new Variant(BuiltInType.Boolean, value);
    }
    if (typeof value === 'string') {
      return new Variant(BuiltInType.String, value);
    }
    if (value instanceof Uint8Array) {
      return new Variant(BuiltInType.ByteString, value);
    }
    // UaDateTime = Date
    if (value instanceof Date) {
      return new Variant(BuiltInType.DateTime, value);
    }
    // Tagged union types: UaSbyte | UaByte | UaInt16 | UaUint16 | UaInt32 | UaUint32
    //                   | UaInt64 | UaUint64 | UaFloat | UaDouble | UaGuid
    if (typeof value === 'object' && 'type' in value) {
      const tagged = value as { type: BuiltInType; value: VariantValue };
      return new Variant(tagged.type, tagged.value);
    }
    throw new Error(
      `newFrom: unhandled UaPrimitive value: ${JSON.stringify(value)}`
    );
  }

  /**
   * Creates a undefined variant.
   * 
   * @returns A new Variant with undefined value
   */
  public static newNull(): Variant {
    return new Variant(BuiltInType.Null);
  }

  /**
   * Creates a new Variant.
   * 
   * @param variantType - The type of value stored in the variant
   * @param value - The scalar or array value
   * @param arrayDimensions - Optional array dimensions for structured arrays
   */
  constructor(
    variantType: BuiltInType = BuiltInType.Null,
    value: VariantValue | VariantArrayValue = undefined,
    arrayDimensions: number[] | undefined = undefined
  ) {
    this.type = variantType;
    this.value = value;
    this.arrayDimensions = arrayDimensions;
  }
}
