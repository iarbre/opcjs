/**
 * @fileoverview JSON decoder class implementation for OPC UA types
 * @module codec/json/codecs/decoder
 */

import { DataValue } from "../../types/dataValue";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { ExtensionObject } from "../../types/extensionObject";
import { LocalizedText } from "../../types/localizedText";
import { NodeId } from "../../types/nodeId";
import { UaByteString, UaString } from "../../types/primitives";
import { QualifiedName } from "../../types/qualifiedName";
import { StatusCode } from "../../types/statusCode";
import { Variant } from "../../types/variant";
import { CodecError } from "../codecError";
import { IReader } from "../interfaces/iReader";

const GUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * JSON Decoder for OPC UA types.
 *
 * Parses a JSON string on construction, then exposes typed decode methods
 * that operate on the currently selected value. Use `navigate()` to descend
 * into nested objects.
 *
 * @see OPC 10000-6 Section 5.4 - OPC UA JSON encoding
 */
export class JsonReader implements IReader {
    private json: unknown;
    private current: unknown;

    // ── Primitives ─────────────────────────────────────────────────────────────

    readBoolean(): boolean {
        if (typeof this.current !== 'boolean') {
            throw new CodecError(`Expected boolean, got ${typeof this.current}`, { format: 'JSON', typeName: 'Boolean' });
        }
        return this.current;
    }

    readByte(): number {
        if (typeof this.current !== 'number') {
            throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'Byte' });
        }
        if (this.current < 0 || this.current > 255 || !Number.isInteger(this.current)) {
            throw new CodecError(`Byte value ${this.current} out of range [0, 255]`, { format: 'JSON', typeName: 'Byte' });
        }
        return this.current;
    }

    readSByte(): number {
        if (typeof this.current !== 'number') {
            throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'SByte' });
        }
        if (this.current < -128 || this.current > 127 || !Number.isInteger(this.current)) {
            throw new CodecError(`SByte value ${this.current} out of range [-128, 127]`, { format: 'JSON', typeName: 'SByte' });
        }
        return this.current;
    }

    readInt16(): number {
        if (typeof this.current !== 'number') {
            throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'Int16' });
        }
        if (this.current < -32768 || this.current > 32767 || !Number.isInteger(this.current)) {
            throw new CodecError(`Int16 value ${this.current} out of range [-32768, 32767]`, { format: 'JSON', typeName: 'Int16' });
        }
        return this.current;
    }

    readUInt16(): number {
        if (typeof this.current !== 'number') {
            throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'UInt16' });
        }
        if (this.current < 0 || this.current > 65535 || !Number.isInteger(this.current)) {
            throw new CodecError(`UInt16 value ${this.current} out of range [0, 65535]`, { format: 'JSON', typeName: 'UInt16' });
        }
        return this.current;
    }

    readInt32(): number {
        if (typeof this.current !== 'number') {
            throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'Int32' });
        }
        if (this.current < -2147483648 || this.current > 2147483647 || !Number.isInteger(this.current)) {
            throw new CodecError(`Int32 value ${this.current} out of range [-2147483648, 2147483647]`, { format: 'JSON', typeName: 'Int32' });
        }
        return this.current;
    }

    readUInt32(): number {
        if (typeof this.current !== 'number') {
            throw new CodecError(`Expected number, got ${typeof this.current}`, { format: 'JSON', typeName: 'UInt32' });
        }
        if (this.current < 0 || this.current > 4294967295 || !Number.isInteger(this.current)) {
            throw new CodecError(`UInt32 value ${this.current} out of range [0, 4294967295]`, { format: 'JSON', typeName: 'UInt32' });
        }
        return this.current;
    }

    readInt64(): bigint {
        if (typeof this.current !== 'string') {
            throw new CodecError(`Expected string for Int64, got ${typeof this.current}`, { format: 'JSON', typeName: 'Int64' });
        }
        try {
            return BigInt(this.current);
        } catch {
            throw new CodecError(`Invalid Int64 string: ${this.current}`, { format: 'JSON', typeName: 'Int64' });
        }
    }

    readUInt64(): bigint {
        if (typeof this.current !== 'string') {
            throw new CodecError(`Expected string for UInt64, got ${typeof this.current}`, { format: 'JSON', typeName: 'UInt64' });
        }
        let value: bigint;
        try {
            value = BigInt(this.current);
        } catch {
            throw new CodecError(`Invalid UInt64 string: ${this.current}`, { format: 'JSON', typeName: 'UInt64' });
        }
        if (value < 0n) {
            throw new CodecError(`UInt64 cannot be negative: ${this.current}`, { format: 'JSON', typeName: 'UInt64' });
        }
        return value;
    }

    readFloat(): number { return this.decodeFloatLike(this.current, 'Float'); }
    readDouble(): number { return this.decodeFloatLike(this.current, 'Double'); }

    readString(): UaString {
        if (this.current === null) return null;
        if (typeof this.current !== 'string') {
            throw new CodecError(`Expected string or null, got ${typeof this.current}`, { format: 'JSON', typeName: 'String' });
        }
        return this.current;
    }

    readDateTime(): Date {
        if (typeof this.current !== 'string') {
            throw new CodecError(`Expected string for DateTime, got ${typeof this.current}`, { format: 'JSON', typeName: 'DateTime' });
        }
        const date = new Date(this.current);
        if (isNaN(date.getTime())) {
            throw new CodecError(`Invalid DateTime string: ${this.current}`, { format: 'JSON', typeName: 'DateTime' });
        }
        return date;
    }

    readGuid(): string {
        if (typeof this.current !== 'string') {
            throw new CodecError(`Expected string for Guid, got ${typeof this.current}`, { format: 'JSON', typeName: 'Guid' });
        }
        if (!GUID_PATTERN.test(this.current)) {
            throw new CodecError(`Invalid GUID format: ${this.current}`, { format: 'JSON', typeName: 'Guid' });
        }
        return this.current;
    }

    readByteString(): UaByteString {
        if (this.current === null) return null;
        if (typeof this.current !== 'string') {
            throw new CodecError(`Expected string or null for ByteString, got ${typeof this.current}`, { format: 'JSON', typeName: 'ByteString' });
        }
        try {
            const binary = atob(this.current);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            return bytes;
        } catch {
            throw new CodecError(`Invalid Base64 string: ${this.current}`, { format: 'JSON', typeName: 'ByteString' });
        }
    }

    readXmlElement(): string {
        if (typeof this.current !== 'string') {
            throw new CodecError(`Expected string for XmlElement, got ${typeof this.current}`, { format: 'JSON', typeName: 'XmlElement' });
        }
        return this.current;
    }
    // ── Complex types ──────────────────────────────────────────────────────────────────
    readNodeId(): NodeId {
        throw new Error('Method not implemented.');
    }
    readExpandedNodeId(): ExpandedNodeId {
        throw new Error('Method not implemented.');
    }
    readStatusCode(): StatusCode {
        throw new Error('Method not implemented.');
    }
    readQualifiedName(): QualifiedName {
        throw new Error('Method not implemented.');
    }
    readLocalizedText(): LocalizedText {
        throw new Error('Method not implemented.');
    }
    readExtensionObject(): ExtensionObject {
        throw new Error('Method not implemented.');
    }
    readDataValue(): DataValue {
        throw new Error('Method not implemented.');
    }
    readVariant(): Variant {
        throw new Error('Method not implemented.');
    }
    readDiagnosticInfo(): DiagnosticInfo {
        throw new Error('Method not implemented.');
    }

    // ── Arrays ──────────────────────────────────────────────────────────────────

    /**
     * Decode a JSON array, calling `decodeElement` for each element.
     * Returns null if the current value is null.
     * @see OPC 10000-6 Section 5.4.5 - Arrays in JSON
     */
    readArray<T>(decodeElement: (decoder: this) => T): T[] | undefined {
        if (this.current === null) return undefined;
        if (!Array.isArray(this.current)) {
            throw new CodecError(
                `Expected array or null, got ${typeof this.current}`,
                { format: 'JSON', typeName: 'Array' }
            );
        }
        return this.current.map((item) => {
            const child = new JsonReader(JSON.stringify(item));
            return decodeElement(child as unknown as this);
        });
    }

    // ── Helper ───────────────────────────────────────────────────────────

    private decodeFloatLike(value: unknown, typeName: string): number {
        if (typeof value === 'number') return value;
        if (typeof value === 'string') {
            if (value === 'NaN') return NaN;
            if (value === 'Infinity') return Infinity;
            if (value === '-Infinity') return -Infinity;
            throw new CodecError(`Invalid ${typeName} string: ${value}`, { format: 'JSON', typeName });
        }
        throw new CodecError(`Expected number or special float string, got ${typeof value}`, { format: 'JSON', typeName });
    }

    /**
     * @param jsonString - RFC 8259 compliant JSON string to decode
     * @throws CodecError if JSON is malformed
     */
    constructor(jsonString: string) {
        try {
            this.json = JSON.parse(jsonString);
            this.current = this.json;
        } catch (error) {
            throw new CodecError(
                `Malformed JSON: ${error instanceof Error ? error.message : String(error)}`,
                { format: 'JSON', typeName: 'parse' }
            );
        }
    }
}
