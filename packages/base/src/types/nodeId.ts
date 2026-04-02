/**
 * OPC UA NodeId Type
 * 
 * NodeId uniquely identifies a node in an OPC UA address space.
 * 
 * @module nodeid
 */

/**
 * NodeId identifier type
 */
export enum NodeIdType {
  Numeric = 0,
  String = 1,
  Guid = 2,
  ByteString = 3,
}

/**
 * OPC UA NodeId
 * 
 * A NodeId uniquely identifies a node in an OPC UA address space.
 * 
 * Format: ns=<namespace>;i=<identifier> for numeric IDs
 *         ns=<namespace>;s=<identifier> for string IDs
 *         ns=<namespace>;g=<identifier> for GUID IDs
 *         ns=<namespace>;b=<identifier> for ByteString IDs
 * 
 * @example
 * ```typescript
 * const nodeId = new NodeId(2, 123);
 * console.log(nodeId.toString()); // "ns=2;i=123"
 * 
 * const stringNodeId = new NodeId(3, "Temperature");
 * console.log(stringNodeId.toString()); // "ns=3;s=Temperature"
 * ```
 */
export class NodeId {
  /**
   * The namespace index (0-65535)
   */
  readonly namespace: number;
  
  /**
   * The identifier value (number, string, or Uint8Array)
   */
  readonly identifier: number | string | Uint8Array;
  
  /**
   * The type of identifier
   */
  readonly identifierType: NodeIdType;

  /**
   * Convert NodeId to string representation
   * 
   * @returns String representation of the NodeId
   * 
   * @example
   * ```typescript
   * new NodeId(2, 123).toString();      // "ns=2;i=123"
   * new NodeId(3, "Temp").toString();   // "ns=3;s=Temp"
   * ```
   */
  toString(): string {
    let prefix: string;
    let value: string;
    
    switch (this.identifierType) {
      case NodeIdType.Numeric:
        prefix = 'i';
        value = String(this.identifier);
        break;
      case NodeIdType.String:
        prefix = 's';
        value = String(this.identifier);
        break;
      case NodeIdType.Guid:
        prefix = 'g';
        value = String(this.identifier);
        break;
      case NodeIdType.ByteString:
        prefix = 'b';
        {
          const bytes = this.identifier as Uint8Array;
          let binary = '';
          for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          value = btoa(binary);
        }
        break;
      default:
        throw new Error(`Unknown NodeIdType: ${this.identifierType}`);
    }
    
    return `ns=${this.namespace};${prefix}=${value}`;
  }

  /**
   * Check equality with another NodeId
   * 
   * @param other - The other NodeId to compare
   * @returns true if NodeIds are equal
   */
  equals(other: NodeId): boolean {
    if (this.namespace !== other.namespace) {
      return false;
    }
    if (this.identifierType !== other.identifierType) {
      return false;
    }
    
    if (this.identifier instanceof Uint8Array && other.identifier instanceof Uint8Array) {
      return this.identifier.length === other.identifier.length &&
             this.identifier.every((v: number, i: number) => v === (other.identifier as Uint8Array)[i]);
    }
    
    return this.identifier === other.identifier;
  }

  /**
   * Create a NodeId from a string representation
   * 
   * @param str - String in format "ns=X;i=Y" or "ns=X;s=Y" or "ns=X;g=Y"
   * @returns Parsed NodeId
   * 
   * @example
   * ```typescript
   * NodeId.parse("ns=2;i=123");    // NodeId(2, 123)
   * NodeId.parse("ns=3;s=Temp");   // NodeId(3, "Temp")
   * ```
   */
  static parse(str: string): NodeId {
    const match = str.match(/^ns=(\d+);([isgb])=(.+)$/);
    if (!match) {
      throw new Error(`Invalid NodeId string: ${str}`);
    }
    
    const namespace = parseInt(match[1], 10);
    const type = match[2];
    const value = match[3];
    
    switch (type) {
      case 'i':
        return new NodeId(namespace, parseInt(value, 10));
      case 's':
        return new NodeId(namespace, value);
      case 'g':
        return new NodeId(namespace, value); // GUID as string
      case 'b':
        {
          const binary = atob(value);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          return new NodeId(namespace, bytes);
        }
      default:
        throw new Error(`Unknown NodeId type: ${type}`);
    }
  }

  /**
   * Check if this is a null NodeId (ns=0;i=0)
   * 
   * @returns true if this is a null NodeId
   */
  isNull(): boolean {
    return this.namespace === 0 && 
           this.identifierType === NodeIdType.Numeric && 
           this.identifier === 0;
  }

  public static newTwoByte(identifier: number): NodeId {
    return new NodeId(0, identifier);
  }

  public static newFourByte(namespace: number, identifier: number): NodeId {
    return new NodeId(namespace, identifier);
  }

  public static newNumeric(namespace: number, identifier: number): NodeId {
    return new NodeId(namespace, identifier);
  }

  public static newString(namespace: number, identifier: string): NodeId {
    return new NodeId(namespace, identifier);
  }
  
  /**
   * Create a new NodeId
   * 
   * @param namespace - The namespace index (default: 0)
   * @param identifier - The identifier (number, string, GUID string, or Uint8Array)
   */
  constructor(namespace: number = 0, identifier: number | string | Uint8Array = 0) {
    this.namespace = namespace;
    this.identifier = identifier;
    
    // Determine identifier type
    if (typeof identifier === 'number') {
      this.identifierType = NodeIdType.Numeric;
    } else if (typeof identifier === 'string') {
      // Check if it's a GUID (UUID format)
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier)) {
        this.identifierType = NodeIdType.Guid;
      } else {
        this.identifierType = NodeIdType.String;
      }
    } else {
      this.identifierType = NodeIdType.ByteString;
    }
  }

}
