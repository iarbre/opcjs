# Base Info Client Currency

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ✅ Implemented  

## Description

This conformance unit requires that a client can correctly handle DataVariables whose DataType is `CurrencyUnitType` — a structured type representing a monetary currency value compliant with ISO 4217.

`CurrencyUnitType` is defined in the OPC UA Information Model (OPC 10000-5) and has the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `numericCode` | Int16 | ISO 4217 numeric currency code (e.g. 978 = EUR, 840 = USD) |
| `exponent` | SByte | Number of decimal places (e.g. −2 for cent-denominated currencies) |
| `alphabeticCode` | String | ISO 4217 three-letter code (e.g. "EUR", "USD") |
| `currency` | LocalizedText | Human-readable currency name |

A client claiming this CU must:
1. Recognise the `CurrencyUnitType` DataType NodeId (`ns=0; i=23498`).
2. Correctly decode and display the structured value.
3. Not treat it as a raw `ByteString` or `ExtensionObject`.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 §12.x | CurrencyUnitType | Data type definition and fields |
| OPC 10000-3 §8 | DataTypes | General DataType model |

Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/  
Online: https://reference.opcfoundation.org/NodeSets/ (namespace index 0, `CurrencyUnitType`)

## Implementation

`CurrencyUnitType` is fully implemented in `opcjs-base`:

| Item | Location | Details |
|------|----------|---------|
| Class definition | `packages/base/src/schema/types.ts` | `CurrencyUnitType` with all four ISO 4217 fields |
| Binary decoder | `packages/base/src/schema/decoders.ts` | `decodeCurrencyUnitType` |
| Binary encoder | `packages/base/src/schema/encoders.ts` | `encodeCurrencyUnitType` |
| Type decoder registration | `packages/base/src/schema/decoderRegistrations.ts` | `registerTypeDecoders`: typeId `23498` |
| Encoding-ID registration | `packages/base/src/schema/decoderRegistrations.ts` | `registerBinaryDecoders`: encodingId `23507` → typeId `23498` |
| Encoder registration | `packages/base/src/schema/encoderRegistrations.ts` | `registerEncoders`: typeId `23498` |
| Public export | `packages/base/src/index.ts` | via `export * from './schema/types.js'` |
| Unit tests | `packages/base/tests/types/currencyUnitType.test.ts` | 22 tests covering node IDs, round-trips (EUR/USD/JPY), edge cases, and known-byte decode |

`ConfigurationClient.getSimple()` calls both `registerTypeDecoders` and `registerBinaryDecoders`, so any `ExtensionObject` whose binary-encoding NodeId equals `i=23507` is automatically decoded to a `CurrencyUnitType` instance by `AttributeService.ReadValue()`.

## Related Conformance Units

- [Address Space Client NodeId IdTypes](./address-space-client-nodeid-idtypes.md)
