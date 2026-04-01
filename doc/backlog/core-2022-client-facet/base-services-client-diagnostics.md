# Base Services Client Diagnostics

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ✅ Implemented  

## Description

OPC UA services support returning optional diagnostic information alongside responses. This conformance unit requires the client to allow callers to request that diagnostic data and to surface it in the returned results.

### returnDiagnostics bitmask (OPC 10000-4 §7.28)

The `returnDiagnostics` field in the `RequestHeader` is a bitmask that specifies which parts of the `DiagnosticInfo` structure the server should populate:

| Bit | Value | Meaning |
|-----|-------|---------|
| 0 | 0x0001 | ServiceLevel / SymbolicId |
| 1 | 0x0002 | ServiceLevel / LocalizedText |
| 2 | 0x0004 | ServiceLevel / AdditionalInfo |
| 3 | 0x0008 | ServiceLevel / InnerStatusCode |
| 4 | 0x0010 | ServiceLevel / InnerDiagnostics |
| 5 | 0x0020 | OperationLevel / SymbolicId |
| 6 | 0x0040 | OperationLevel / LocalizedText |
| 7 | 0x0080 | OperationLevel / AdditionalInfo |
| 8 | 0x0100 | OperationLevel / InnerStatusCode |
| 9 | 0x0200 | OperationLevel / InnerDiagnostics |

A value of `0x0000` means "no diagnostics" (default).  
A value of `0xFFFF` means "all diagnostics".

### DiagnosticInfo structure

When returned, `DiagnosticInfo` contains:
- `symbolicId` — integer index into the `stringTable` of the response header
- `namespaceUri` — optional namespace URI for the symbolic id
- `localizedText` — integer index into the `stringTable`
- `locale` — optional locale string
- `additionalInfo` — free-form string with extra details
- `innerStatusCode` — optional nested status code
- `innerDiagnosticInfo` — optional nested diagnostic info (recursive)

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §7.8 | DiagnosticInfo | Complete data type definition |
| OPC 10000-4 §7.28 | RequestHeader | `returnDiagnostics` bitmask field |
| OPC 10000-4 §7.29 | ResponseHeader | `serviceDiagnostics` and `stringTable` |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/7.8  
Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/7.28

## Implementation

**Files**:
- `src/requestOptions.ts` — `RequestOptions` type includes `returnDiagnostics?: number`
- `src/services/serviceBase.ts` — forwards `returnDiagnostics` into the `RequestHeader` of every service call
- `src/readValueResult.ts` — `ReadValueResult` includes `diagnosticInfo?: DiagnosticInfo`
- `src/method/` — `CallMethodResult` includes `diagnosticInfo?: DiagnosticInfo`
- `src/browseNodeResult.ts` — Browse results propagate `diagnosticInfo` where available

Callers opt in by passing `{ returnDiagnostics: 0xFFFF }` (or a specific bitmask) in `RequestOptions`.

## Related Conformance Units

- [Session Client General Service Behaviour](./session-client-general-service-behaviour.md)
