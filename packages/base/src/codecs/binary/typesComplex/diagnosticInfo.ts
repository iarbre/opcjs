/**
 * @fileoverview DiagnosticInfo binary decoder
 * @module codec/binary/typesComplex/diagnosticInfo
 * @see OPC 10000-6 Section 5.2.2.12 - DiagnosticInfo
 * @see OPC 10000-4 Section 7.12 - DiagnosticInfo
 */

import type { IReader } from '../../interfaces/iReader.js';import type { IWriter } from '../../interfaces/iWriter.js';import { DiagnosticInfo } from '../../../types/diagnosticInfo.js';
import { StatusCode } from '../../../types/statusCode.js';

const DiagnosticInfoMaskBits = {
  SymbolicId: 0x01,
  NamespaceUri: 0x02,
  LocalizedText: 0x04,
  Locale: 0x08,
  AdditionalInfo: 0x10,
  InnerStatusCode: 0x20,
  InnerDiagnosticInfo: 0x40,
} as const;

/**
 * Decode a DiagnosticInfo with optional fields controlled by an encoding mask.
 * Supports recursive InnerDiagnosticInfo.
 * @see OPC 10000-6 Table 24
 */
export function decodeDiagnosticInfo(reader: IReader): DiagnosticInfo {
  const encodingMask = reader.readByte();

  let symbolicId: number | undefined = undefined;
  if (encodingMask & DiagnosticInfoMaskBits.SymbolicId) {
    symbolicId = reader.readInt32();
  }

  let namespaceUri: number | undefined = undefined;
  if (encodingMask & DiagnosticInfoMaskBits.NamespaceUri) {
    namespaceUri = reader.readInt32();
  }

  let localizedText: number | undefined = undefined;
  if (encodingMask & DiagnosticInfoMaskBits.LocalizedText) {
    localizedText = reader.readInt32();
  }

  let locale: number | undefined = undefined;
  if (encodingMask & DiagnosticInfoMaskBits.Locale) {
    locale = reader.readInt32();
  }

  let additionalInfo: string | undefined = undefined;
  if (encodingMask & DiagnosticInfoMaskBits.AdditionalInfo) {
    additionalInfo = reader.readString() ?? undefined;
  }

  let innerStatusCode: StatusCode | undefined = undefined;
  if (encodingMask & DiagnosticInfoMaskBits.InnerStatusCode) {
    innerStatusCode = reader.readUInt32() as StatusCode;
  }

  let innerDiagnosticInfo: DiagnosticInfo | undefined = undefined;
  if (encodingMask & DiagnosticInfoMaskBits.InnerDiagnosticInfo) {
    innerDiagnosticInfo = decodeDiagnosticInfo(reader);
  }

  return new DiagnosticInfo({
    symbolicId,
    namespaceUri,
    localizedText,
    locale,
    additionalInfo,
    innerStatusCode,
    innerDiagnosticInfo,
  });
}

/**
 * Encode a DiagnosticInfo with optional fields controlled by an encoding mask.
 * Supports recursive InnerDiagnosticInfo.
 * @see OPC 10000-6 Table 24
 */
export function encodeDiagnosticInfo(writer: IWriter, value: DiagnosticInfo): void {
  let encodingMask = 0;
  if (value.symbolicId != null) { encodingMask |= DiagnosticInfoMaskBits.SymbolicId; }
  if (value.namespaceUri != null) { encodingMask |= DiagnosticInfoMaskBits.NamespaceUri; }
  if (value.localizedText != null) { encodingMask |= DiagnosticInfoMaskBits.LocalizedText; }
  if (value.locale != null) { encodingMask |= DiagnosticInfoMaskBits.Locale; }
  if (value.additionalInfo != null) { encodingMask |= DiagnosticInfoMaskBits.AdditionalInfo; }
  if (value.innerStatusCode != null) { encodingMask |= DiagnosticInfoMaskBits.InnerStatusCode; }
  if (value.innerDiagnosticInfo != null) { encodingMask |= DiagnosticInfoMaskBits.InnerDiagnosticInfo; }

  writer.writeByte(encodingMask);

  if (encodingMask & DiagnosticInfoMaskBits.SymbolicId) { writer.writeInt32(value.symbolicId!); }
  if (encodingMask & DiagnosticInfoMaskBits.NamespaceUri) { writer.writeInt32(value.namespaceUri!); }
  if (encodingMask & DiagnosticInfoMaskBits.LocalizedText) { writer.writeInt32(value.localizedText!); }
  if (encodingMask & DiagnosticInfoMaskBits.Locale) { writer.writeInt32(value.locale!); }
  if (encodingMask & DiagnosticInfoMaskBits.AdditionalInfo) { writer.writeString(value.additionalInfo!); }
  if (encodingMask & DiagnosticInfoMaskBits.InnerStatusCode) { writer.writeUInt32(value.innerStatusCode ?? StatusCode.Good); }
  if (encodingMask & DiagnosticInfoMaskBits.InnerDiagnosticInfo) { encodeDiagnosticInfo(writer, value.innerDiagnosticInfo!); }
}
