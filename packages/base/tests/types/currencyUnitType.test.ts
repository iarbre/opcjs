/**
 * Unit tests for CurrencyUnitType codec.
 *
 * OPC UA Part 5, §12 defines CurrencyUnitType (NodeId i=23498,
 * binary-encoding NodeId i=23507) as a structured type whose four fields
 * mirror ISO 4217:
 *
 *   numericCode   Int16        – ISO 4217 numeric code (e.g. 978 = EUR)
 *   exponent      SByte        – decimal-place shift (−2 for cent currencies)
 *   alphabeticCode String      – 3-letter ISO 4217 code
 *   currency       LocalizedText – human-readable currency name
 *
 * Tests cover:
 *   1. Correct type and encoding node IDs on the class.
 *   2. Encode ➜ decode round-trips for several representative currencies.
 *   3. Edge cases: zero exponent (JPY), currency with undefined locale.
 *   4. Decode-only: known byte sequences produce the expected object.
 */

import { describe, expect, it } from 'vitest'

import {
  BinaryReader,
  BinaryWriter,
  CurrencyUnitType,
  Decoder,
  Encoder,
  LocalizedText,
  registerBinaryDecoders,
  registerEncoders,
  registerTypeDecoders,
} from '../../src/index.js'

type RegisteredEncoder = Parameters<typeof registerEncoders>[0]
type RegisteredTypeDecoder = Parameters<typeof registerTypeDecoders>[0]
type RegisteredBinaryDecoder = Parameters<typeof registerBinaryDecoders>[0]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Serialise a CurrencyUnitType to bytes and deserialise it again. */
function roundTrip(src: CurrencyUnitType): CurrencyUnitType {
  const encoder = new Encoder()
  encoder.registerWriterFactory('binary', () => new BinaryWriter())
  registerEncoders(encoder as unknown as RegisteredEncoder)

  const decoder = new Decoder()
  decoder.registerReaderFactory('binary', (data: unknown) => new BinaryReader(data as Uint8Array))
  registerTypeDecoders(decoder as unknown as RegisteredTypeDecoder)
  registerBinaryDecoders(decoder as unknown as RegisteredBinaryDecoder)

  const bytes = encoder.encode(src, 'binary') as Uint8Array
  return decoder.decode<CurrencyUnitType>(bytes, 'binary')
}

/** Build a CurrencyUnitType with the given ISO 4217 values. */
function makeCurrency(
  numericCode: number,
  exponent: number,
  alphabeticCode: string,
  locale: string | undefined,
  text: string,
): CurrencyUnitType {
  const c = new CurrencyUnitType()
  c.numericCode = numericCode
  c.exponent = exponent
  c.alphabeticCode = alphabeticCode
  c.currency = new LocalizedText(locale, text)
  return c
}

// ---------------------------------------------------------------------------
// Node IDs
// ---------------------------------------------------------------------------

describe('CurrencyUnitType – node IDs', () => {
  it('getTypeId returns 23498', () => {
    expect(new CurrencyUnitType().getTypeId()).toBe(23498)
  })

  it('getBinaryEncodingId returns 23507', () => {
    expect(new CurrencyUnitType().getBinaryEncodingId()).toBe(23507)
  })

  it('getXmlEncodingId returns 23520', () => {
    expect(new CurrencyUnitType().getXmlEncodingId()).toBe(23520)
  })

  it('getJsonEncodingId returns 23528', () => {
    expect(new CurrencyUnitType().getJsonEncodingId()).toBe(23528)
  })
})

// ---------------------------------------------------------------------------
// Round-trip: EUR
// ---------------------------------------------------------------------------

describe('CurrencyUnitType – round-trip EUR', () => {
  const eur = makeCurrency(978, -2, 'EUR', 'en', 'Euro')

  it('numericCode survives round-trip', () => {
    expect(roundTrip(eur).numericCode).toBe(978)
  })

  it('exponent survives round-trip', () => {
    expect(roundTrip(eur).exponent).toBe(-2)
  })

  it('alphabeticCode survives round-trip', () => {
    expect(roundTrip(eur).alphabeticCode).toBe('EUR')
  })

  it('currency.text survives round-trip', () => {
    expect(roundTrip(eur).currency.text).toBe('Euro')
  })

  it('currency.locale survives round-trip', () => {
    expect(roundTrip(eur).currency.locale).toBe('en')
  })
})

// ---------------------------------------------------------------------------
// Round-trip: USD
// ---------------------------------------------------------------------------

describe('CurrencyUnitType – round-trip USD', () => {
  const usd = makeCurrency(840, -2, 'USD', 'en', 'US Dollar')

  it('numericCode 840 survives round-trip', () => {
    expect(roundTrip(usd).numericCode).toBe(840)
  })

  it('alphabeticCode "USD" survives round-trip', () => {
    expect(roundTrip(usd).alphabeticCode).toBe('USD')
  })

  it('currency name "US Dollar" survives round-trip', () => {
    expect(roundTrip(usd).currency.text).toBe('US Dollar')
  })
})

// ---------------------------------------------------------------------------
// Round-trip: JPY  (zero exponent – no fractional subunit)
// ---------------------------------------------------------------------------

describe('CurrencyUnitType – round-trip JPY (zero exponent)', () => {
  const jpy = makeCurrency(392, 0, 'JPY', 'ja', 'Yen')

  it('exponent 0 survives round-trip', () => {
    expect(roundTrip(jpy).exponent).toBe(0)
  })

  it('numericCode 392 survives round-trip', () => {
    expect(roundTrip(jpy).numericCode).toBe(392)
  })

  it('alphabeticCode "JPY" survives round-trip', () => {
    expect(roundTrip(jpy).alphabeticCode).toBe('JPY')
  })
})

// ---------------------------------------------------------------------------
// Edge case: undefined locale in LocalizedText
// ---------------------------------------------------------------------------

describe('CurrencyUnitType – currency with undefined locale', () => {
  const noLocale = makeCurrency(756, -2, 'CHF', undefined, 'Swiss Franc')

  it('locale roundtrips as undefined', () => {
    expect(roundTrip(noLocale).currency.locale).toBeUndefined()
  })

  it('text survives round-trip even without locale', () => {
    expect(roundTrip(noLocale).currency.text).toBe('Swiss Franc')
  })
})

// ---------------------------------------------------------------------------
// Decode from known bytes (EUR, no locale, text only)
// ---------------------------------------------------------------------------

describe('CurrencyUnitType – decode from known bytes', () => {
  /**
   * Hand-crafted binary for EUR with no locale:
   *   numericCode  Int16   978 (0xD2, 0x03 LE)
   *   exponent     SByte   -2  (0xFE)
   *   alphabeticCode String "EUR"
   *     length: 3 (0x03, 0x00, 0x00, 0x00)
   *     bytes:  E U R (0x45, 0x55, 0x52)
   *   currency LocalizedText  text-only "Euro"
   *     mask: 0x02 (text present, no locale)
   *     length: 4 (0x04, 0x00, 0x00, 0x00)
   *     bytes:  E u r o (0x45, 0x75, 0x72, 0x6F)
   */
  const knownBytes = new Uint8Array([
    0xd2, 0x03,             // numericCode = 978
    0xfe,                   // exponent = -2
    0x03, 0x00, 0x00, 0x00, // alphabeticCode length = 3
    0x45, 0x55, 0x52,       // "EUR"
    0x02,                   // LocalizedText mask: text only
    0x04, 0x00, 0x00, 0x00, // text length = 4
    0x45, 0x75, 0x72, 0x6f, // "Euro"
  ])

  function decodeKnownBytes(): CurrencyUnitType {
    const decoder = new Decoder()
    registerTypeDecoders(decoder as unknown as RegisteredTypeDecoder)
    const reader = new BinaryReader(knownBytes)
    return decoder.decodeWithTypeId<CurrencyUnitType>(
      23498,
      reader as unknown as Parameters<Decoder['decodeWithTypeId']>[1],
    )
  }

  it('decodes numericCode correctly', () => {
    const decoded = decodeKnownBytes()
    expect(decoded.numericCode).toBe(978)
  })

  it('decodes exponent correctly', () => {
    const decoded = decodeKnownBytes()
    expect(decoded.exponent).toBe(-2)
  })

  it('decodes alphabeticCode correctly', () => {
    const decoded = decodeKnownBytes()
    expect(decoded.alphabeticCode).toBe('EUR')
  })

  it('decodes currency text correctly', () => {
    const decoded = decodeKnownBytes()
    expect(decoded.currency.text).toBe('Euro')
  })

  it('locale is undefined when not encoded', () => {
    const decoded = decodeKnownBytes()
    expect(decoded.currency.locale).toBeUndefined()
  })
})
