# Base Info Client Selection List

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ✅ Implemented  

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

### Implemented client behaviour

The client now exposes `SelectionListType` metadata directly to the application layer via:

- `Client.getSelectionList(nodeId): Promise<SelectionList | null>`

Implementation details:

1. Browses forward `HasProperty` (`ns=0;i=46`) references from `nodeId`.
2. Locates `Selections` (mandatory), `SelectionDescriptions` (optional), and `RestrictToList` (optional) by `BrowseName`.
3. Reads all discovered property values in one batch `Read` request.
4. Returns a typed `SelectionList` object:
   - `selections: unknown[]`
   - `selectionDescriptions: LocalizedText[]`
   - `restrictToList: boolean`
   - `nodeId: NodeId`
5. Returns `null` when `Selections` is not present on the node.

Current scope:

- Metadata discovery and exposure are implemented.
- Write-time enforcement for `RestrictToList=true` is not yet implemented.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-5 §B.1 | SelectionListType | VariableType definition including Properties |
| OPC 10000-3 §6 | Type Model | How VariableType and instance relationships work |
| OPC 10000-4 §5.8.2 | Browse Service | Traversing TypeDefinition references |

Online: https://reference.opcfoundation.org/Core/Part5/v105/docs/  
Online: https://reference.opcfoundation.org/NodeSets/ (namespace 0, `SelectionListType`)

## Verification

- API and type:
   - `packages/client/src/client.ts` (`getSelectionList`)
   - `packages/client/src/selectionList.ts` (`SelectionList` type)
   - `packages/client/src/index.ts` export
- Unit tests:
   - `packages/client/tests/unit/selectionList.test.ts`

## Related Conformance Units

- [Address Space Client NodeId IdTypes](./address-space-client-nodeid-idtypes.md)
