import { DataValue, DiagnosticInfo, ExpandedNodeId, ExtensionObject, LocalizedText, NodeId, QualifiedName, UaPrimitive, Variant, XmlElement } from "opcjs-base";

export type CallMethodArgument =
  | UaPrimitive
  | NodeId
  | ExpandedNodeId
  | QualifiedName
  | LocalizedText
  | XmlElement
  | ExtensionObject
  | DataValue
  | DiagnosticInfo
  | Variant;