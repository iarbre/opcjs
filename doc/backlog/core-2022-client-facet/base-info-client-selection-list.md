# Base Info Client Selection List

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ❌ Not implemented  

## Description

`SelectionListType` is an OPC UA VariableType (defined in OPC 10000-5) that allows a server to expose a list of permissible values for a Variable — a server-side enumeration that is not bound to a static DataType.  
A client claiming this conformance unit must recognise and use the `SelectionListType` metadata when displaying or editing node values.

### SelectionListType definition (OPC 10000-5)

| Component | BrowseName | DataType | Description |
|-----------|-----------|---------|-------------|
| Property | `Selections` | `BaseDataType[]` | Array of permitted values |
| Property | `SelectionDescriptions` | `LocalizedText[]` | Human-readable descriptions corresponding to each entry in `Selections` |
| Property | `RestrictToList` | `Boolean` | If `true` the Variable's value must be one of the listed `Selections` |

NodeId of `SelectionListType`: `ns=0; i=19726`

### Client behaviour

When browsing or reading a Variable whose `TypeDefinition` reference points to `SelectionListType` (or a subtype), the client should:
1. Read the `Selections` and `SelectionDescriptions` Properties.
2. If `RestrictToList = true`, enforce that write operations only send values present in `Selections`.
3. Present the `SelectionDescriptions` labels to the user in place of raw values where appropriate.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 §B.1 | SelectionListType | VariableType definition including Properties |
| OPC 10000-3 §6 | Type Model | How VariableType and instance relationships work |
| OPC 10000-4 §5.8.2 | Browse Service | Traversing TypeDefinition references |

Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/  
Online: https://reference.opcfoundation.org/NodeSets/ (namespace 0, `SelectionListType`)

## Implementation Gap

The client has no mechanism to detect `SelectionListType` on a VariableType reference, nor any API to retrieve the `Selections` / `SelectionDescriptions` properties automatically.

## Work Required

1. Add a helper method (e.g. `client.getSelectionList(nodeId)`) that:
   - Reads `TypeDefinition` via `Browse`.
   - If type is `SelectionListType` or a subtype, reads `Selections`, `SelectionDescriptions`, and `RestrictToList` properties.
   - Returns a typed `SelectionList` result object.
2. Optionally integrate list-enforcement into `attributeService.write()`.
3. Export the `SelectionList` interface.
4. Add unit and integration tests.

## Related Conformance Units

- [Address Space Client NodeId IdTypes](./address-space-client-nodeid-idtypes.md)
