/**
 * OPC UA ExtensionObject Type (i=22)
 * 
 * An ExtensionObject is a container for complex structures that cannot be
 * represented by any of the other builtin types. It contains a TypeId to
 * identify the structure type and an encoded body.
 * 
 * @see OPC UA Part 6, Section 5.2.2.15
 */

import { NodeId } from './nodeId.js';
import { ExpandedNodeId } from './expandedNodeId.js';
import { IOpcType } from './iOpcType.js';
import { ExtensionObjectEncoding } from './extensionObjectEncoding.js';

/**
 * Represents an OPC UA ExtensionObject.
 * 
 * An ExtensionObject contains a complex data structure that is not
 * represented by any of the builtin types. The structure is identified
 * by its TypeId (a NodeId) and encoded in either binary or XML format.
 * 
 * @example
 * ```typescript
 * import { ExtensionObject, ExtensionObjectEncoding } from '@opcua/types';
 * import { NodeId } from '@opcua/types';
 * 
 * // Create an ExtensionObject with binary encoding
 * const typeId = new NodeId(2, 123); // Custom structure type
 * const body = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
 * const extObj = new ExtensionObject(typeId, ExtensionObjectEncoding.Binary, body);
 * 
 * // Check encoding type
 * if (extObj.isBinaryEncoded()) {
 *   console.log('Binary body length:', extObj.body?.length);
 * }
 * ```
 */
export class ExtensionObject {
  /**
   * The NodeId (or ExpandedNodeId) that identifies the type of structure encoded in the body.
   */
  public readonly typeId: NodeId | ExpandedNodeId;

  /**
   * The encoding used for the body.
   */
  public readonly encoding: ExtensionObjectEncoding;

  /**
   * The encoded body.
   * - For Binary encoding, this is a ByteString
   * - For Xml encoding, this is an XmlElement
   * - For None encoding, this is null
   */
  public readonly data?: IOpcType;

  /**
   * Creates a new ExtensionObject.
   * 
   * @param typeId - The NodeId identifying the structure type
   * @param encoding - The encoding type
   * @param body - The encoded body (null for None encoding)
   */
  constructor(
    typeId: NodeId | ExpandedNodeId,
    encoding: ExtensionObjectEncoding = ExtensionObjectEncoding.None,
    data?: IOpcType
  ) {
    this.typeId = typeId;
    this.encoding = encoding;
    this.data = data;
  }

  /**
   * Creates an ExtensionObject with no body.
   * 
   * @param typeId - The NodeId identifying the structure type
   * @returns A new ExtensionObject with None encoding
   */
  public static newEmpty(): ExtensionObject {
    return new ExtensionObject(new NodeId(0, 0), ExtensionObjectEncoding.None, undefined);
  }

  /**
   * Creates an ExtensionObject with binary encoding.
   * 
   * @param typeId - The NodeId identifying the structure type
   * @param body - The binary encoded body
   * @returns A new ExtensionObject with Binary encoding
   */
  public static newBinary(data: IOpcType): ExtensionObject {
    return new ExtensionObject(new NodeId(0, data.getBinaryEncodingId()), ExtensionObjectEncoding.Binary, data);
  }

  /**
   * Creates an ExtensionObject with XML encoding.
   * 
   * @param typeId - The NodeId identifying the structure type
   * @param body - The XML encoded body
   * @returns A new ExtensionObject with Xml encoding
   */
  public static newXml(typeId: NodeId | ExpandedNodeId, data: IOpcType): ExtensionObject {
    return new ExtensionObject(typeId, ExtensionObjectEncoding.Xml, data);
  }
}
