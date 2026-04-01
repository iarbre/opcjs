# Base Info Client Currency

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ❌ Not implemented  

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

## Implementation Gap

No implementation. The client currently has no special-casing for `CurrencyUnitType` DataVariables; they would be returned as raw `ExtensionObject` values.

## Work Required

1. Generate or hand-write a TypeScript codec for `CurrencyUnitType`.
2. Register the codec in the DataType codec registry so that `attributeService.read()` returns a typed object.
3. Export the `CurrencyUnitType` interface from the public API.
4. Add unit tests for encode/decode round-trip.

## Related Conformance Units

- [Address Space Client NodeId IdTypes](./address-space-client-nodeid-idtypes.md)
