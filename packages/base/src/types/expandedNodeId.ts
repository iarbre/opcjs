/**
 * OPC UA ExpandedNodeId Type
 *
 * ExpandedNodeId wraps a NodeId with optional server identification,
 * allowing nodes to be identified across multiple servers.
 *
 * @module expanded-nodeid
 */

import { NodeId } from './nodeId.js';

/**
 * OPC UA ExpandedNodeId
 *
 * An ExpandedNodeId wraps a NodeId with optional server identification,
 * allowing nodes to be identified across multiple servers.
 *
 * @example
 * ```typescript
 * import { ExpandedNodeId } from '@opcua/types';
 *
 * const expandedNodeId = new ExpandedNodeId(
 *   new NodeId(2, 123),
 *   'http://opcfoundation.org/UA/',
 *   1,
 * );
 * console.log(expandedNodeId.toString());
 * // "svr=1;nsu=http://opcfoundation.org/UA/;ns=2;i=123"
 * ```
 */
export class ExpandedNodeId {
  /** The wrapped NodeId. */
  readonly nodeId: NodeId;

  /** The server index (optional, for cross-server references). */
  readonly serverIndex?: number;

  /** The namespace URI (optional, alternative to the namespace index on nodeId). */
  readonly namespaceUri?: string;

  /**
   * Create a new ExpandedNodeId.
   *
   * @param nodeId - The wrapped NodeId
   * @param namespaceUri - Optional namespace URI
   * @param serverIndex - Optional server index
   */
  constructor(nodeId: NodeId, namespaceUri?: string, serverIndex?: number) {
    this.nodeId = nodeId;
    this.namespaceUri = namespaceUri;
    this.serverIndex = serverIndex;
  }

  /** Convert ExpandedNodeId to string representation. */
  toString(): string {
    let result = '';

    if (this.serverIndex !== undefined) {
      result += `svr=${this.serverIndex};`;
    }

    if (this.namespaceUri !== undefined) {
      result += `nsu=${this.namespaceUri};`;
    }

    result += this.nodeId.toString();

    return result;
  }
}
