/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * 
 * This file was automatically generated from OPC UA NodeSet2 XML.
 * 
 * Source: Opc.Ua.NodeSet2.Services.xml
 * Generated: 2026-04-02T04:47:17.085Z
 * Generator: @opcua/nodeset-generator
 * 
 * Any changes made to this file will be lost when regenerated.
 */

/**
 * ActionState
 * NodeId: i=18595
 */
export enum ActionStateEnum {
  Idle = 0,
  Executing = 1,
  Done = 2
}

/**
 * ApplicationType
 * NodeId: i=307
 */
export enum ApplicationTypeEnum {
  Server = 0,
  Client = 1,
  ClientAndServer = 2,
  DiscoveryServer = 3
}

/**
 * AxisScaleEnumeration
 * NodeId: i=12077
 */
export enum AxisScaleEnumerationEnum {
  Linear = 0,
  Log = 1,
  Ln = 2
}

/**
 * BrokerTransportQualityOfService
 * NodeId: i=15008
 */
export enum BrokerTransportQualityOfServiceEnum {
  NotSpecified = 0,
  BestEffort = 1,
  AtLeastOnce = 2,
  AtMostOnce = 3,
  ExactlyOnce = 4
}

/**
 * BrowseDirection
 * NodeId: i=510
 */
export enum BrowseDirectionEnum {
  Forward = 0,
  Inverse = 1,
  Both = 2,
  Invalid = 3
}

/**
 * BrowseResultMask
 * NodeId: i=517
 */
export enum BrowseResultMaskEnum {
  None = 0,
  ReferenceTypeId = 1,
  IsForward = 2,
  NodeClass = 4,
  BrowseName = 8,
  DisplayName = 16,
  TypeDefinition = 32,
  All = 63,
  ReferenceTypeInfo = 3,
  TargetInfo = 60
}

/**
 * ChassisIdSubtype
 * NodeId: i=18947
 */
export enum ChassisIdSubtypeEnum {
  ChassisComponent = 1,
  InterfaceAlias = 2,
  PortComponent = 3,
  MacAddress = 4,
  NetworkAddress = 5,
  InterfaceName = 6,
  Local = 7
}

/**
 * ConfigurationUpdateType
 * NodeId: i=15539
 */
export enum ConfigurationUpdateTypeEnum {
  Insert = 1,
  Replace = 2,
  InsertOrReplace = 3,
  Delete = 4
}

/**
 * ConversionLimitEnum
 * NodeId: i=32436
 */
export enum ConversionLimitEnumEnum {
  NoConversion = 0,
  Limited = 1,
  Unlimited = 2
}

/**
 * DataChangeTrigger
 * NodeId: i=717
 */
export enum DataChangeTriggerEnum {
  Status = 0,
  StatusValue = 1,
  StatusValueTimestamp = 2
}

/**
 * DataSetOrderingType
 * NodeId: i=20408
 */
export enum DataSetOrderingTypeEnum {
  Undefined = 0,
  AscendingWriterId = 1,
  AscendingWriterIdSingle = 2
}

/**
 * DeadbandType
 * NodeId: i=718
 */
export enum DeadbandTypeEnum {
  None = 0,
  Absolute = 1,
  Percent = 2
}

/**
 * DiagnosticsLevel
 * NodeId: i=19723
 */
export enum DiagnosticsLevelEnum {
  Basic = 0,
  Advanced = 1,
  Info = 2,
  Log = 3,
  Debug = 4
}

/**
 * Duplex
 * NodeId: i=24210
 */
export enum DuplexEnum {
  Full = 0,
  Half = 1,
  Unknown = 2
}

/**
 * ExceptionDeviationFormat
 * NodeId: i=890
 */
export enum ExceptionDeviationFormatEnum {
  AbsoluteValue = 0,
  PercentOfValue = 1,
  PercentOfRange = 2,
  PercentOfEURange = 3,
  Unknown = 4
}

/**
 * FilterOperator
 * NodeId: i=576
 */
export enum FilterOperatorEnum {
  Equals = 0,
  IsNull = 1,
  GreaterThan = 2,
  LessThan = 3,
  GreaterThanOrEqual = 4,
  LessThanOrEqual = 5,
  Like = 6,
  Not = 7,
  Between = 8,
  InList = 9,
  And = 10,
  Or = 11,
  Cast = 12,
  InView = 13,
  OfType = 14,
  RelatedTo = 15,
  BitwiseAnd = 16,
  BitwiseOr = 17
}

/**
 * HistoryUpdateType
 * NodeId: i=11234
 */
export enum HistoryUpdateTypeEnum {
  Insert = 1,
  Replace = 2,
  Update = 3,
  Delete = 4
}

/**
 * IdentityCriteriaType
 * NodeId: i=15632
 */
export enum IdentityCriteriaTypeEnum {
  UserName = 1,
  Thumbprint = 2,
  Role = 3,
  GroupId = 4,
  Anonymous = 5,
  AuthenticatedUser = 6,
  Application = 7,
  X509Subject = 8,
  TrustedApplication = 9
}

/**
 * IdType
 * NodeId: i=256
 */
export enum IdTypeEnum {
  Numeric = 0,
  String = 1,
  Guid = 2,
  Opaque = 3
}

/**
 * InterfaceAdminStatus
 * NodeId: i=24212
 */
export enum InterfaceAdminStatusEnum {
  Up = 0,
  Down = 1,
  Testing = 2
}

/**
 * InterfaceOperStatus
 * NodeId: i=24214
 */
export enum InterfaceOperStatusEnum {
  Up = 0,
  Down = 1,
  Testing = 2,
  Unknown = 3,
  Dormant = 4,
  NotPresent = 5,
  LowerLayerDown = 6
}

/**
 * ManAddrIfSubtype
 * NodeId: i=18951
 */
export enum ManAddrIfSubtypeEnum {
  None = 0,
  Unknown = 1,
  PortRef = 2,
  SystemPortNumber = 3
}

/**
 * MessageSecurityMode
 * NodeId: i=302
 */
export enum MessageSecurityModeEnum {
  Invalid = 0,
  None = 1,
  Sign = 2,
  SignAndEncrypt = 3
}

/**
 * ModelChangeStructureVerbMask
 * NodeId: i=11941
 */
export enum ModelChangeStructureVerbMaskEnum {
  NodeAdded = 1,
  NodeDeleted = 2,
  ReferenceAdded = 4,
  ReferenceDeleted = 8,
  DataTypeChanged = 16
}

/**
 * MonitoringMode
 * NodeId: i=716
 */
export enum MonitoringModeEnum {
  Disabled = 0,
  Sampling = 1,
  Reporting = 2
}

/**
 * NamingRuleType
 * NodeId: i=120
 */
export enum NamingRuleTypeEnum {
  Mandatory = 1,
  Optional = 2,
  Constraint = 3
}

/**
 * NegotiationStatus
 * NodeId: i=24216
 */
export enum NegotiationStatusEnum {
  InProgress = 0,
  Complete = 1,
  Failed = 2,
  Unknown = 3,
  NoNegotiation = 4
}

/**
 * NodeAttributesMask
 * NodeId: i=348
 */
export enum NodeAttributesMaskEnum {
  None = 0,
  AccessLevel = 1,
  ArrayDimensions = 2,
  BrowseName = 4,
  ContainsNoLoops = 8,
  DataType = 16,
  Description = 32,
  DisplayName = 64,
  EventNotifier = 128,
  Executable = 256,
  Historizing = 512,
  InverseName = 1024,
  IsAbstract = 2048,
  MinimumSamplingInterval = 4096,
  NodeClass = 8192,
  NodeId = 16384,
  Symmetric = 32768,
  UserAccessLevel = 65536,
  UserExecutable = 131072,
  UserWriteMask = 262144,
  ValueRank = 524288,
  WriteMask = 1048576,
  Value = 2097152,
  DataTypeDefinition = 4194304,
  RolePermissions = 8388608,
  AccessRestrictions = 16777216,
  All = 33554431,
  BaseNode = 26501220,
  Object = 26501348,
  ObjectType = 26503268,
  Variable = 26571383,
  VariableType = 28600438,
  Method = 26632548,
  ReferenceType = 26537060,
  View = 26501356
}

/**
 * NodeClass
 * NodeId: i=257
 */
export enum NodeClassEnum {
  Unspecified = 0,
  Object = 1,
  Variable = 2,
  Method = 4,
  ObjectType = 8,
  VariableType = 16,
  ReferenceType = 32,
  DataType = 64,
  View = 128
}

/**
 * OpenFileMode
 * NodeId: i=11939
 */
export enum OpenFileModeEnum {
  Read = 1,
  Write = 2,
  EraseExisting = 4,
  Append = 8
}

/**
 * OverrideValueHandling
 * NodeId: i=15874
 */
export enum OverrideValueHandlingEnum {
  Disabled = 0,
  LastUsableValue = 1,
  OverrideValue = 2
}

/**
 * PerformUpdateType
 * NodeId: i=11293
 */
export enum PerformUpdateTypeEnum {
  Insert = 1,
  Replace = 2,
  Update = 3,
  Remove = 4
}

/**
 * PortIdSubtype
 * NodeId: i=18949
 */
export enum PortIdSubtypeEnum {
  InterfaceAlias = 1,
  PortComponent = 2,
  MacAddress = 3,
  NetworkAddress = 4,
  InterfaceName = 5,
  AgentCircuitId = 6,
  Local = 7
}

/**
 * PubSubDiagnosticsCounterClassification
 * NodeId: i=19730
 */
export enum PubSubDiagnosticsCounterClassificationEnum {
  Information = 0,
  Error = 1
}

/**
 * PubSubState
 * NodeId: i=14647
 */
export enum PubSubStateEnum {
  Disabled = 0,
  Paused = 1,
  Operational = 2,
  Error = 3,
  PreOperational = 4
}

/**
 * RedundancySupport
 * NodeId: i=851
 */
export enum RedundancySupportEnum {
  None = 0,
  Cold = 1,
  Warm = 2,
  Hot = 3,
  Transparent = 4,
  HotAndMirrored = 5
}

/**
 * RedundantServerMode
 * NodeId: i=32417
 */
export enum RedundantServerModeEnum {
  PrimaryWithBackup = 0,
  PrimaryOnly = 1,
  BackupReady = 2,
  BackupNotReady = 3
}

/**
 * SecurityTokenRequestType
 * NodeId: i=315
 */
export enum SecurityTokenRequestTypeEnum {
  Issue = 0,
  Renew = 1
}

/**
 * ServerState
 * NodeId: i=852
 */
export enum ServerStateEnum {
  Running = 0,
  Failed = 1,
  NoConfiguration = 2,
  Suspended = 3,
  Shutdown = 4,
  Test = 5,
  CommunicationFault = 6,
  Unknown = 7
}

/**
 * SortOrderType
 * NodeId: i=18646
 */
export enum SortOrderTypeEnum {
  Ascending = 0,
  Descending = 1
}

/**
 * StructureType
 * NodeId: i=98
 */
export enum StructureTypeEnum {
  Structure = 0,
  StructureWithOptionalFields = 1,
  Union = 2,
  StructureWithSubtypedValues = 3,
  UnionWithSubtypedValues = 4
}

/**
 * TimestampsToReturn
 * NodeId: i=625
 */
export enum TimestampsToReturnEnum {
  Source = 0,
  Server = 1,
  Both = 2,
  Neither = 3,
  Invalid = 4
}

/**
 * TrustListMasks
 * NodeId: i=12552
 */
export enum TrustListMasksEnum {
  None = 0,
  TrustedCertificates = 1,
  TrustedCrls = 2,
  IssuerCertificates = 4,
  IssuerCrls = 8,
  All = 15
}

/**
 * TsnFailureCode
 * NodeId: i=24218
 */
export enum TsnFailureCodeEnum {
  NoFailure = 0,
  InsufficientBandwidth = 1,
  InsufficientResources = 2,
  InsufficientTrafficClassBandwidth = 3,
  StreamIdInUse = 4,
  StreamDestinationAddressInUse = 5,
  StreamPreemptedByHigherRank = 6,
  LatencyHasChanged = 7,
  EgressPortNotAvbCapable = 8,
  UseDifferentDestinationAddress = 9,
  OutOfMsrpResources = 10,
  OutOfMmrpResources = 11,
  CannotStoreDestinationAddress = 12,
  PriorityIsNotAnSrcClass = 13,
  MaxFrameSizeTooLarge = 14,
  MaxFanInPortsLimitReached = 15,
  FirstValueChangedForStreamId = 16,
  VlanBlockedOnEgress = 17,
  VlanTaggingDisabledOnEgress = 18,
  SrClassPriorityMismatch = 19,
  FeatureNotPropagated = 20,
  MaxLatencyExceeded = 21,
  BridgeDoesNotProvideNetworkId = 22,
  StreamTransformNotSupported = 23,
  StreamIdTypeNotSupported = 24,
  FeatureNotSupported = 25
}

/**
 * TsnListenerStatus
 * NodeId: i=24224
 */
export enum TsnListenerStatusEnum {
  None = 0,
  Ready = 1,
  PartialFailed = 2,
  Failed = 3
}

/**
 * TsnStreamState
 * NodeId: i=24220
 */
export enum TsnStreamStateEnum {
  Disabled = 0,
  Configuring = 1,
  Ready = 2,
  Operational = 3,
  Error = 4
}

/**
 * TsnTalkerStatus
 * NodeId: i=24222
 */
export enum TsnTalkerStatusEnum {
  None = 0,
  Ready = 1,
  Failed = 2
}

/**
 * UserTokenType
 * NodeId: i=303
 */
export enum UserTokenTypeEnum {
  Anonymous = 0,
  UserName = 1,
  Certificate = 2,
  IssuedToken = 3
}