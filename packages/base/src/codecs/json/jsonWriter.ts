/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @fileoverview JSON encoder class implementation for OPC UA types
 * @module codec/json/codecs/encoder
 */

import { DataValue } from "../../types/dataValue";
import { DiagnosticInfo } from "../../types/diagnosticInfo";
import { ExpandedNodeId } from "../../types/expandedNodeId";
import { ExtensionObject } from "../../types/extensionObject";
import { LocalizedText } from "../../types/localizedText";
import { NodeId } from "../../types/nodeId";
import { QualifiedName } from "../../types/qualifiedName";
import { StatusCode } from "../../types/statusCode";
import { Variant } from "../../types/variant";
import { XmlElement } from "../../types/xmlElement";
import { CodecError } from "../codecError";
import { IWriter } from "../interfaces/iWriter";


/**
 * JSON Encoder for OPC UA types.
 *
 * Builds a JSON-serialisable object/value by calling `setValue` or navigating
 * via `startObject` / `endObject`. Call `getJson()` to obtain the final string.
 *
 * @see OPC 10000-6 Section 5.4 - OPC UA JSON encoding
 */
export class JsonWriter implements IWriter {

    private json: unknown = null;
    private root: Record<string, unknown> | undefined = undefined;
    private stack: Record<string, unknown>[] = [];

    // ── Primitives ─────────────────────────────────────────────────────────────

    writeBoolean(value: boolean): void {
        this.setValue(value);
    }

    writeByte(value: number): void {
        if (value < 0 || value > 255) {
            throw new CodecError(`Byte value ${value} out of range [0, 255]`, { format: 'JSON', typeName: 'Byte' });
        }
        this.setValue(value);
    }

    writeSByte(value: number): void {
        if (value < -128 || value > 127) {
            throw new CodecError(`SByte value ${value} out of range [-128, 127]`, { format: 'JSON', typeName: 'SByte' });
        }
        this.setValue(value);
    }

    writeInt16(value: number): void {
        if (value < -32768 || value > 32767) {
            throw new CodecError(`Int16 value ${value} out of range [-32768, 32767]`, { format: 'JSON', typeName: 'Int16' });
        }
        this.setValue(value);
    }

    writeUInt16(value: number): void {
        if (value < 0 || value > 65535) {
            throw new CodecError(`UInt16 value ${value} out of range [0, 65535]`, { format: 'JSON', typeName: 'UInt16' });
        }
        this.setValue(value);
    }

    writeInt32(value: number): void {
        if (value < -2147483648 || value > 2147483647) {
            throw new CodecError(`Int32 value ${value} out of range [-2147483648, 2147483647]`, { format: 'JSON', typeName: 'Int32' });
        }
        this.setValue(value);
    }

    writeUInt32(value: number): void {
        if (value < 0 || value > 4294967295) {
            throw new CodecError(`UInt32 value ${value} out of range [0, 4294967295]`, { format: 'JSON', typeName: 'UInt32' });
        }
        this.setValue(value);
    }

    writeInt64(value: bigint): void {
        this.setValue(value.toString());
    }

    writeUInt64(value: bigint): void {
        if (value < 0n) {
            throw new CodecError(`UInt64 value ${value} cannot be negative`, { format: 'JSON', typeName: 'UInt64' });
        }
        this.setValue(value.toString());
    }

    writeFloat(value: number): void {
        if (Number.isNaN(value)) { this.setValue('NaN'); return; }
        if (value === Infinity) { this.setValue('Infinity'); return; }
        if (value === -Infinity) { this.setValue('-Infinity'); return; }
        this.setValue(value);
    }

    writeDouble(value: number): void {
        if (Number.isNaN(value)) { this.setValue('NaN'); return; }
        if (value === Infinity) { this.setValue('Infinity'); return; }
        if (value === -Infinity) { this.setValue('-Infinity'); return; }
        this.setValue(value);
    }

    writeString(value: string | null): void {
        this.setValue(value);
    }

    writeDateTime(value: Date): void {
        this.setValue(value.toISOString());
    }

    writeGuid(value: string): void {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
            throw new CodecError(`Invalid GUID format: ${value}`, { format: 'JSON', typeName: 'Guid' });
        }
        this.setValue(value);
    }

    writeByteString(value: Uint8Array | undefined): void {
        if (value === undefined) { this.setValue(undefined); return; }
        let binary = '';
        for (let i = 0; i < value.length; i++) binary += String.fromCharCode(value[i]);
        this.setValue(btoa(binary));
    }

    writeXmlElement(value: XmlElement | string): void {
        this.setValue(value);
    }

    // ── Complex types ──────────────────────────────────────────────────────────────────
    writeNodeId(value: NodeId): void {
        throw new Error('Method not implemented.');
    }
    writeExpandedNodeId(value: ExpandedNodeId): void {
        throw new Error('Method not implemented.');
    }
    writeStatusCode(value: StatusCode): void {
        throw new Error('Method not implemented.');
    }
    writeQualifiedName(value: QualifiedName): void {
        throw new Error('Method not implemented.');
    }
    writeLocalizedText(value: LocalizedText): void {
        throw new Error('Method not implemented.');
    }
    writeExtensionObject(value: ExtensionObject): void {
        throw new Error('Method not implemented.');
    }
    writeDataValue(value: DataValue): void {
        throw new Error('Method not implemented.');
    }
    writeVariant(value: Variant): void {
        throw new Error('Method not implemented.');
    }
    writeDiagnosticInfo(value: DiagnosticInfo): void {
        throw new Error('Method not implemented.');
    }

    // ── Arrays ──────────────────────────────────────────────────────────────────

    /**
     * Encode an array using native JSON array syntax.
     * Null arrays are encoded as `null`; empty arrays as `[]`.
     * @see OPC 10000-6 Section 5.4.5 - Arrays in JSON
     */
    writeArray<T>(
        array: T[] | undefined,
        encodeElement: (encoder: this, value: T) => void
    ): unknown[] | undefined {
        if (array === undefined) {
            this.setValue(undefined);
            return undefined;
        }
        const result: unknown[] = array.map((item) => {
            const tmp = new JsonWriter();
            encodeElement(tmp as unknown as this, item);
            return tmp.getObject();
        });
        this.setValue(result);
        return result;
    }

    public getData(): string {
        return JSON.stringify(this.json);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────────

    /** Returns the raw JSON-serialisable value (before stringification). */
    private getObject(): unknown {
        return this.json;
    }

    /**
     * Start a JSON object, optionally nested under `name`.
     */
    private startObject(name?: string): void {
        const obj: Record<string, unknown> = {};
        if (this.json === null) {
            this.json = obj;
            this.root = obj;
        } else if (name && this.root !== undefined) {
            this.root[name] = obj;
            this.stack.push(this.root);
            this.root = obj;
        }
    }

    /** End the current nested object. */
    private endObject(): void {
        if (this.stack.length > 0) {
            this.root = this.stack.pop() ?? undefined;
        }
    }

    /** Set the root JSON value (used for scalar types). */
    private setValue(value: unknown): void {
        this.json = value;
    }
}
