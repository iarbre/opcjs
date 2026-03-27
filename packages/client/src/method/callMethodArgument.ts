import type { DataValue, DiagnosticInfo, ExpandedNodeId, ExtensionObject, LocalizedText, NodeId, QualifiedName, UaPrimitive, XmlElement } from 'opcjs-base'

/**
 * A single (scalar) value that may be passed as a method argument.
 * `Variant` is intentionally excluded — callers work with concrete OPC UA types;
 * the conversion to `Variant` is done internally by `callMethod`.
 */
export type ScalarCallMethodArgument =
  | UaPrimitive
  | NodeId
  | ExpandedNodeId
  | QualifiedName
  | LocalizedText
  | XmlElement
  | ExtensionObject
  | DataValue
  | DiagnosticInfo

/**
 * A value (or homogeneous array of values) that may be passed as a method argument
 * to {@link Client.callMethod}.
 *
 * Pass a plain array to create an array-rank Variant input argument, e.g.:
 * ```ts
 * client.callMethod(objId, methodId, [[uaDouble(1.0), uaDouble(2.0)]])
 * ```
 * Arrays must be homogeneous — all elements must be of the same OPC UA type.
 */
export type CallMethodArgument = ScalarCallMethodArgument | ScalarCallMethodArgument[]