/**
 * @fileoverview LocalizedText binary codec (encoder + decoder)
 * @module codec/binary/typesComplex/localizedText
 * @see OPC 10000-6 Section 5.2.2.14 - LocalizedText
 * @see OPC 10000-3 Section 7.19 - LocalizedText
 */

import type { IReader } from '../../interfaces/iReader.js';
import type { IWriter } from '../../interfaces/iWriter.js';
import { LocalizedText } from '../../../types/localizedText.js';

const LocalizedTextMask = {
  LocaleFlag: 0x01,
  TextFlag: 0x02,
} as const;

/**
 * Decode a LocalizedText with optional locale and text.
 * @see OPC 10000-6 Table 9
 */
export function decodeLocalizedText(reader: IReader): LocalizedText {
  const encodingMask = reader.readByte();

  let locale: string | undefined = undefined;
  if (encodingMask & LocalizedTextMask.LocaleFlag) {
    locale = reader.readString() ?? undefined;
  }

  let text = '';
  if (encodingMask & LocalizedTextMask.TextFlag) {
    text = reader.readString() ?? '';
  }

  return new LocalizedText(locale, text);
}

/**
 * Encode a LocalizedText with optional locale and text.
 * @see OPC 10000-6 Table 9
 */
export function encodeLocalizedText(writer: IWriter, value: LocalizedText): void {
  let encodingMask = 0;
  if (value.locale !== undefined && value.locale !== '') { encodingMask |= LocalizedTextMask.LocaleFlag; }
  if (value.text !== '') { encodingMask |= LocalizedTextMask.TextFlag; }
  writer.writeByte(encodingMask);
  if (encodingMask & LocalizedTextMask.LocaleFlag) { writer.writeString(value.locale!); }
  if (encodingMask & LocalizedTextMask.TextFlag) { writer.writeString(value.text); }
}
