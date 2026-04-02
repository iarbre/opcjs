/**
 * @fileoverview XML decoder class implementation for OPC UA types
 * @module codec/xml/codecs/decoder
 */

import { XMLParser } from 'fast-xml-parser';
import { CodecError } from '../codecError.js';
import { IReader } from '../interfaces/iReader.js';
import { DataValue } from '../../types/dataValue.js';
import { DiagnosticInfo } from '../../types/diagnosticInfo.js';
import { ExpandedNodeId } from '../../types/expandedNodeId.js';
import { ExtensionObject } from '../../types/extensionObject.js';
import { LocalizedText } from '../../types/localizedText.js';
import { NodeId } from '../../types/nodeId.js';
import { QualifiedName } from '../../types/qualifiedName.js';
import { StatusCode } from '../../types/statusCode.js';
import { Variant } from '../../types/variant.js';

const GUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * XML Decoder for OPC UA types.
 * Uses fast-xml-parser for XML parsing.
 *
 * @see OPC 10000-6 Section 5.3 - OPC UA XML encoding
 */
export class XmlReader implements IReader {
    private parser: XMLParser;
    private currentElement: Record<string, unknown>;
    private elementStack: Record<string, unknown>[];

    // ── Primitives ─────────────────────────────────────────────────────────────

    readBoolean(): boolean {
        const t = this.getTextContent().toLowerCase().trim();
        if (t === 'true' || t === '1') return true;
        if (t === 'false' || t === '0') return false;
        throw new CodecError(`Invalid Boolean value: ${this.getTextContent()}`);
    }

    readByte(): number {
        const text = this.getTextContent();
        const value = parseInt(text.trim(), 10);
        if (isNaN(value) || value < 0 || value > 255) {
            throw new CodecError(`Invalid Byte value: ${text}`);
        }
        return value;
    }

    readSByte(): number {
        const text = this.getTextContent();
        const value = parseInt(text.trim(), 10);
        if (isNaN(value) || value < -128 || value > 127) {
            throw new CodecError(`Invalid SByte value: ${text}`);
        }
        return value;
    }

    readInt16(): number {
        const text = this.getTextContent();
        const value = parseInt(text.trim(), 10);
        if (isNaN(value) || value < -32768 || value > 32767) {
            throw new CodecError(`Invalid Int16 value: ${text}`);
        }
        return value;
    }

    readUInt16(): number {
        const text = this.getTextContent();
        const value = parseInt(text.trim(), 10);
        if (isNaN(value) || value < 0 || value > 65535) {
            throw new CodecError(`Invalid UInt16 value: ${text}`);
        }
        return value;
    }

    readInt32(): number {
        const text = this.getTextContent();
        const value = parseInt(text.trim(), 10);
        if (isNaN(value) || value < -2147483648 || value > 2147483647) {
            throw new CodecError(`Invalid Int32 value: ${text}`);
        }
        return value;
    }

    readUInt32(): number {
        const text = this.getTextContent();
        const value = parseInt(text.trim(), 10);
        if (isNaN(value) || value < 0 || value > 4294967295) {
            throw new CodecError(`Invalid UInt32 value: ${text}`);
        }
        return value;
    }

    readInt64(): bigint {
        const text = this.getTextContent();
        try {
            return BigInt(text.trim());
        } catch {
            throw new CodecError(`Invalid Int64 value: ${text}`);
        }
    }

    readUInt64(): bigint {
        const text = this.getTextContent();
        let value: bigint;
        try {
            value = BigInt(text.trim());
        } catch {
            throw new CodecError(`Invalid UInt64 value: ${text}`);
        }
        if (value < 0n) {
            throw new CodecError(`UInt64 cannot be negative: ${text}`);
        }
        return value;
    }

    readFloat(): number {
        const text = this.getTextContent();
        const t = text.trim();
        if (t === 'NaN') return NaN;
        if (t === 'INF') return Infinity;
        if (t === '-INF') return -Infinity;
        if (t === '') throw new CodecError('Invalid Float value: empty string');
        const value = parseFloat(t);
        if (isNaN(value)) throw new CodecError(`Invalid Float value: ${text}`);
        return value;
    }

    readDouble(): number {
        const text = this.getTextContent();
        const t = text.trim();
        if (t === 'NaN') return NaN;
        if (t === 'INF') return Infinity;
        if (t === '-INF') return -Infinity;
        if (t === '') throw new CodecError('Invalid Double value: empty string');
        const value = parseFloat(t);
        if (isNaN(value)) throw new CodecError(`Invalid Double value: ${text}`);
        return value;
    }

    readString(): string | null {
        const text = this.getTextContent();
        return text === '' ? null : text;
    }

    readDateTime(): Date {
        const text = this.getTextContent();
        const date = new Date(text.trim());
        if (isNaN(date.getTime())) {
            throw new CodecError(`Invalid DateTime value: ${text}`);
        }
        return date;
    }

    readGuid(): string {
        const text = this.getTextContent();
        const t = text.trim();
        if (!GUID_PATTERN.test(t)) {
            throw new CodecError(`Invalid Guid format: ${text}`);
        }
        return t;
    }

    readByteString(): Uint8Array | null {
        const text = this.getTextContent();
        if (text === '') return null;
        try {
            const binary = atob(text);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            return bytes;
        } catch {
            throw new CodecError(`Invalid Base64 ByteString: ${text}`);
        }
    }

    readXmlElement(): string | undefined {
        const text = this.getTextContent();
        return text === '' ? undefined : text;
    }

    // ── Complex types ─────────────────────────────────────────────────────────────


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
     * Decode a ListOf container pattern.
     * @see OPC 10000-6 - Arrays use <ListOf{Type}><{Type}/></ListOf{Type}>
     */
    readArray<T>(
        decodeElement: (decoder: this) => T
    ): T[] | undefined {
        const containerName = "bla";
        const elementName = this.getCurrentElementName() as string;

        this.startElement(containerName);

        if (typeof this.currentElement[elementName] === 'undefined') {
            this.endElement();
            return undefined;
        }

        const elements = this.currentElement[elementName];

        if (!Array.isArray(elements)) {
            const saved = this.currentElement;
            this.currentElement = elements as Record<string, unknown>;
            const value = decodeElement(this);
            this.currentElement = saved;
            this.endElement();
            return [value];
        }

        const result: T[] = [];
        for (const element of elements as Record<string, unknown>[]) {
            const saved = this.currentElement;
            this.currentElement = element;
            result.push(decodeElement(this));
            this.currentElement = saved;
        }

        this.endElement();
        return result;
    }
    
    // ── Helper ──────────────────────────────────────────────────────────────

    private startElement(name: string): void {
        if (typeof this.currentElement[name] === 'undefined') {
            throw new CodecError(`Element '${name}' not found in XML`);
        }
        this.elementStack.push(this.currentElement);
        this.currentElement = this.currentElement[name] as Record<string, unknown>;
    }

    private endElement(): void {
        if (this.elementStack.length === 0) {
            throw new CodecError('Cannot end element: no parent element in stack');
        }
        this.currentElement = this.elementStack.pop()!;
    }

    private getCurrentElementName(): string | undefined {
        if (typeof this.currentElement !== 'object' || this.currentElement === null) return undefined;
        const keys = Object.keys(this.currentElement).filter(k => !k.startsWith('@_') && k !== '#text');
        return keys.length > 0 ? keys[0] : undefined;
    }

    private getTextContent(): string {
        if (typeof this.currentElement === 'string') return this.currentElement as unknown as string;
        const text = (this.currentElement as Record<string, unknown>)['#text'];
        return typeof text === 'string' ? text : '';
    }

    constructor(xmlString: string) {
        this.parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '@_',
            textNodeName: '#text',
            parseTagValue: false,
            parseAttributeValue: false,
            trimValues: true,
            removeNSPrefix: false,
            allowBooleanAttributes: false,
            preserveOrder: false,
        });

        try {
            const parsed = this.parser.parse(xmlString) as Record<string, unknown>;
            if (!parsed || Object.keys(parsed).length === 0) {
                throw new CodecError('Malformed XML: empty or invalid document');
            }
            this.currentElement = parsed;
            this.elementStack = [];
        } catch (error) {
            if (error instanceof CodecError) throw error;
            throw new CodecError(`Malformed XML: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
