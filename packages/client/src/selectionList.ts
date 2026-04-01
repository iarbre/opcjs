import type { LocalizedText, NodeId } from 'opcjs-base'

/**
 * Result of reading a SelectionListType variable's metadata
 * (OPC UA Part 5, §7.18 — Base Info Selection List conformance unit).
 *
 * Represents the set of permitted values and their human-readable descriptions
 * that the server exposes for a variable with a `SelectionListType` TypeDefinition.
 *
 * @example
 * ```ts
 * const list = await client.getSelectionList(nodeId)
 * if (list) {
 *   console.log('Permitted values:', list.selections)
 *   list.selectionDescriptions.forEach((desc, i) =>
 *     console.log(`  [${i}] ${desc.text} →`, list.selections[i])
 *   )
 *   if (list.restrictToList) {
 *     console.log('Value must be one of the listed selections.')
 *   }
 * }
 * ```
 */
export type SelectionList = {
  /** The NodeId of the queried variable. */
  readonly nodeId: NodeId

  /**
   * Array of permitted values for the variable
   * (SelectionListType.Selections mandatory property, OPC 10000-5 §7.18).
   *
   * The DataType is `BaseDataType`; the concrete type of each element depends on
   * the server configuration.
   */
  readonly selections: readonly unknown[]

  /**
   * Human-readable description for each permitted value
   * (SelectionListType.SelectionDescriptions optional property, OPC 10000-5 §7.18).
   *
   * Empty when the property is not present on the node.
   * When present, `selectionDescriptions[i]` describes `selections[i]`.
   */
  readonly selectionDescriptions: readonly LocalizedText[]

  /**
   * When `true`, the variable's value MUST be one of the values in `selections`
   * (SelectionListType.RestrictToList optional property, OPC 10000-5 §7.18).
   *
   * Defaults to `false` when the property is absent on the node.
   */
  readonly restrictToList: boolean
}
