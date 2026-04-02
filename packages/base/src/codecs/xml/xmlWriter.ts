/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @fileoverview XML encoder class implementation for OPC UA types
 * @module codec/xml/codecs/encoder
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
 * XML Encoder for OPC UA types.
 * Uses string building to construct XML documents.
 *
 * @see OPC 10000-6 Section 5.3 - OPC UA XML encoding
 */
export class XmlWriter implements IWriter {
    private xml: string;
    private elementStack: string[];

    // ── Primitives ──────────────────────────────────────────────────────────────

    writeBoolean(value: boolean): void {
        if (typeof value !== 'boolean') {
            throw new CodecError(`Expected boolean, got ${typeof value}`);
        }
        this.writeText(value ? 'true' : 'false');
    }

    writeByte(value: number): void {
        if (value < 0 || value > 255) {
            throw new CodecError(`Byte value ${value} out of range [0, 255]`);
        }
        this.writeText(value.toString());
    }

    writeSByte(value: number): void {
        if (value < -128 || value > 127) {
            throw new CodecError(`SByte value ${value} out of range [-128, 127]`);
        }
        this.writeText(value.toString());
    }

    writeInt16(value: number): void {
        if (value < -32768 || value > 32767) {
            throw new CodecError(`Int16 value ${value} out of range [-32768, 32767]`);
        }
        this.writeText(value.toString());
    }

    writeUInt16(value: number): void {
        if (value < 0 || value > 65535) {
            throw new CodecError(`UInt16 value ${value} out of range [0, 65535]`);
        }
        this.writeText(value.toString());
    }

    writeInt32(value: number): void {
        if (value < -2147483648 || value > 2147483647) {
            throw new CodecError(`Int32 value ${value} out of range [-2147483648, 2147483647]`);
        }
        this.writeText(value.toString());
    }

    writeUInt32(value: number): void {
        if (value < 0 || value > 4294967295) {
            throw new CodecError(`UInt32 value ${value} out of range [0, 4294967295]`);
        }
        this.writeText(value.toString());
    }

    writeInt64(value: bigint): void {
        this.writeText(value.toString());
    }

    writeUInt64(value: bigint): void {
        if (value < 0n) {
            throw new CodecError(`UInt64 value ${value} cannot be negative`);
        }
        this.writeText(value.toString());
    }

    writeFloat(value: number): void {
        if (Number.isNaN(value)) { this.writeText('NaN'); return; }
        if (value === Infinity) { this.writeText('INF'); return; }
        if (value === -Infinity) { this.writeText('-INF'); return; }
        this.writeText(value.toString());
    }

    writeDouble(value: number): void {
        if (Number.isNaN(value)) { this.writeText('NaN'); return; }
        if (value === Infinity) { this.writeText('INF'); return; }
        if (value === -Infinity) { this.writeText('-INF'); return; }
        this.writeText(value.toString());
    }

    writeString(value: string | null): void {
        this.writeText(value ?? '');
    }

    writeDateTime(value: Date): void {
        this.writeText(value.toISOString());
    }

    writeGuid(value: string): void {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
            throw new CodecError(`Invalid Guid format: ${value}`);
        }
        this.writeText(value);
    }

    writeByteString(value: Uint8Array | undefined): void {
        if (value === undefined) { this.writeText(''); return; }
        let binary = '';
        for (let i = 0; i < value.length; i++) binary += String.fromCharCode(value[i]);
        this.writeText(btoa(binary));
    }

    writeXmlElement(value: XmlElement | string): void {
        // XmlElement is raw XML — written directly without escaping
        this.xml += value ?? '';
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
     * Encode an array using ListOf container pattern.
     * @see OPC 10000-6 - Arrays use <ListOf{Type}><{Type}/></ListOf{Type}>
     */
    writeArray<T>(array: T[] | undefined, encodeElement: (encoder: this, value: T) => void): void {
        const elementName = this.elementStack[this.elementStack.length - 1];
        const containerName = `ListOf${elementName}`;

        if (array === undefined) {
            this.writeEmptyElement(containerName);
            return;
        }

        this.startElement(containerName);
        for (const item of array) {
            this.startElement(elementName);
            encodeElement(this, item);
            this.endElement();
        }
        this.endElement();
    }

    public getData(): string {
        if (this.elementStack.length > 0) {
            throw new CodecError(`Unclosed XML elements: ${this.elementStack.join(', ')}`);
        }
        return this.xml;
    }

    // ── Helper ──────────────────────────────────────────────────────────────────


    private startElement(name: string): void {
        this.xml += `<${name}>`;
        this.elementStack.push(name);
    }

    private endElement(): void {
        const name = this.elementStack.pop();
        if (!name) {
            throw new CodecError('No element to close in XML encoder');
        }
        this.xml += `</${name}>`;
    }

    writeEmptyElement(name: string): void {
        this.xml += `<${name}/>`;
    }

    /**
     * Escape XML special characters per FR-024.
     */
    private escapeXml(value: string): string {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    private writeText(value: string): void {
        this.xml += this.escapeXml(value);
    }

    constructor() {
        this.xml = '';
        this.elementStack = [];
    }
}
