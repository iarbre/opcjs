import type { DataValue, NodeId } from 'opcjs-base'

/**
 * Minimal read-only view of a node's attributes used by {@link AttributeService}.
 *
 * A concrete implementation is provided by the address space (Phase 4).
 * Returns a `DataValue` with `StatusCode.BadNodeIdUnknown` when the node does
 * not exist, or `StatusCode.BadAttributeIdInvalid` when the attribute is
 * not defined on the node.
 */
export interface IAddressSpace {
  /**
   * Read a single attribute from a node.
   *
   * @param nodeId - The node to read
   * @param attributeId - The attribute to read (OPC UA attribute ID constant)
   */
  read(nodeId: NodeId, attributeId: number): DataValue
}
