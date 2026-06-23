# Base Info SemanticChange Bit

**Facet**: Embedded DataChange Subscription 2022 Server Facet  
**Type**: Required  
**Status**: ❌ Not implemented

## Description

> Supports setting the SemanticsChanged Bit in the statusCode when a semantic change occurs, such as a change in the engineering unit associated with the Value Attribute.

Per Part 4 §7.39, when a semantic property of a Variable changes (engineering units, definition, etc.), the next reported `DataValue` for that Variable in a Subscription must have the `SemanticsChanged` bit set in its `StatusCode`. This requires the Server to:

1. Detect changes to semantic Properties such as `EUInformation`, `EURange`, `Definition`, `ValuePrecision`.
2. Mark affected Monitored Items so that the next sampled value has its `StatusCode` ORed with `0x4000` (SemanticsChanged).

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-4 §7.39 | StatusCode | InfoBits incl. `SemanticsChanged` |
| OPC 10000-4 §5.13.1 | Monitored Item model | Semantic change handling |

Online: https://reference.opcfoundation.org/Core/Part4/v105/docs/7.39
