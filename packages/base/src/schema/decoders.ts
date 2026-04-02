/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { type IReader, Decoder } from 'opcjs-base';
import {
    ActionStateEnum,
    ApplicationTypeEnum,
    AxisScaleEnumerationEnum,
    BrokerTransportQualityOfServiceEnum,
    BrowseDirectionEnum,
    ConfigurationUpdateTypeEnum,
    DataChangeTriggerEnum,
    DataSetOrderingTypeEnum,
    FilterOperatorEnum,
    HistoryUpdateTypeEnum,
    IdentityCriteriaTypeEnum,
    ManAddrIfSubtypeEnum,
    MessageSecurityModeEnum,
    MonitoringModeEnum,
    NodeClassEnum,
    OverrideValueHandlingEnum,
    PerformUpdateTypeEnum,
    PubSubStateEnum,
    SecurityTokenRequestTypeEnum,
    ServerStateEnum,
    SortOrderTypeEnum,
    StructureTypeEnum,
    TimestampsToReturnEnum,
    UserTokenTypeEnum
} from './enums.js';
import {
    ActionMethodDataType,
    ActionTargetDataType,
    ActivateSessionRequest,
    ActivateSessionResponse,
    AddNodesItem,
    AddNodesRequest,
    AddNodesResponse,
    AddNodesResult,
    AddReferencesItem,
    AddReferencesRequest,
    AddReferencesResponse,
    AdditionalParametersType,
    AggregateConfiguration,
    AggregateFilter,
    AggregateFilterResult,
    AliasNameDataType,
    Annotation,
    AnnotationDataType,
    AnonymousIdentityToken,
    ApplicationConfigurationDataType,
    ApplicationDescription,
    ApplicationIdentityDataType,
    Argument,
    AttributeOperand,
    AuthorizationServiceConfigurationDataType,
    AxisInformation,
    BaseConfigurationDataType,
    BaseConfigurationRecordDataType,
    BitFieldDefinition,
    BrokerConnectionTransportDataType,
    BrokerDataSetReaderTransportDataType,
    BrokerDataSetWriterTransportDataType,
    BrokerWriterGroupTransportDataType,
    BrowseDescription,
    BrowseNextRequest,
    BrowseNextResponse,
    BrowsePath,
    BrowsePathResult,
    BrowsePathTarget,
    BrowseRequest,
    BrowseResponse,
    BrowseResult,
    BuildInfo,
    CallMethodRequest,
    CallMethodResult,
    CallRequest,
    CallResponse,
    CancelRequest,
    CancelResponse,
    CartesianCoordinates,
    CertificateGroupDataType,
    ChannelSecurityToken,
    CloseSecureChannelRequest,
    CloseSecureChannelResponse,
    CloseSessionRequest,
    CloseSessionResponse,
    ComplexNumberType,
    ConfigurationUpdateTargetType,
    ConfigurationVersionDataType,
    ConnectionTransportDataType,
    ContentFilter,
    ContentFilterElement,
    ContentFilterElementResult,
    ContentFilterResult,
    CreateMonitoredItemsRequest,
    CreateMonitoredItemsResponse,
    CreateSessionRequest,
    CreateSessionResponse,
    CreateSubscriptionRequest,
    CreateSubscriptionResponse,
    CurrencyUnitType,
    DataChangeFilter,
    DataChangeNotification,
    DataSetMetaDataType,
    DataSetReaderDataType,
    DataSetReaderMessageDataType,
    DataSetReaderTransportDataType,
    DataSetWriterDataType,
    DataSetWriterMessageDataType,
    DataSetWriterTransportDataType,
    DataTypeAttributes,
    DataTypeDefinition,
    DataTypeDescription,
    DataTypeNode,
    DataTypeSchemaHeader,
    DatagramConnectionTransport2DataType,
    DatagramConnectionTransportDataType,
    DatagramDataSetReaderTransportDataType,
    DatagramWriterGroupTransport2DataType,
    DatagramWriterGroupTransportDataType,
    DecimalDataType,
    DeleteAtTimeDetails,
    DeleteEventDetails,
    DeleteMonitoredItemsRequest,
    DeleteMonitoredItemsResponse,
    DeleteNodesItem,
    DeleteNodesRequest,
    DeleteNodesResponse,
    DeleteRawModifiedDetails,
    DeleteReferencesItem,
    DeleteReferencesRequest,
    DeleteReferencesResponse,
    DeleteSubscriptionsRequest,
    DeleteSubscriptionsResponse,
    DiscoveryConfiguration,
    DoubleComplexNumberType,
    DtlsPubSubConnectionDataType,
    EUInformation,
    ElementOperand,
    EndpointConfiguration,
    EndpointDataType,
    EndpointDescription,
    EndpointType,
    EndpointUrlListDataType,
    EnumDefinition,
    EnumDescription,
    EnumField,
    EnumValueType,
    EphemeralKeyType,
    EventFieldList,
    EventFilter,
    EventFilterResult,
    EventNotificationList,
    FieldMetaData,
    FieldTargetDataType,
    FilterOperand,
    FindServersOnNetworkRequest,
    FindServersOnNetworkResponse,
    FindServersRequest,
    FindServersResponse,
    Frame,
    GenericAttributeValue,
    GenericAttributes,
    GetEndpointsRequest,
    GetEndpointsResponse,
    HistoryData,
    HistoryEvent,
    HistoryEventFieldList,
    HistoryModifiedData,
    HistoryModifiedEvent,
    HistoryReadDetails,
    HistoryReadRequest,
    HistoryReadResponse,
    HistoryReadResult,
    HistoryReadValueId,
    HistoryUpdateDetails,
    HistoryUpdateRequest,
    HistoryUpdateResponse,
    HistoryUpdateResult,
    IdentityMappingRuleType,
    InstanceNode,
    IssuedIdentityToken,
    JsonActionMetaDataMessage,
    JsonActionNetworkMessage,
    JsonActionRequestMessage,
    JsonActionResponderMessage,
    JsonActionResponseMessage,
    JsonApplicationDescriptionMessage,
    JsonDataSetMessage,
    JsonDataSetMetaDataMessage,
    JsonDataSetReaderMessageDataType,
    JsonDataSetWriterMessageDataType,
    JsonNetworkMessage,
    JsonPubSubConnectionMessage,
    JsonServerEndpointsMessage,
    JsonStatusMessage,
    JsonWriterGroupMessageDataType,
    KeyValuePair,
    LinearConversionDataType,
    LiteralOperand,
    LldpManagementAddressTxPortType,
    LldpManagementAddressType,
    LldpTlvType,
    LogRecord,
    LogRecordsDataType,
    MdnsDiscoveryConfiguration,
    MethodAttributes,
    MethodNode,
    ModelChangeStructureDataType,
    ModificationInfo,
    ModifyMonitoredItemsRequest,
    ModifyMonitoredItemsResponse,
    ModifySubscriptionRequest,
    ModifySubscriptionResponse,
    MonitoredItemCreateRequest,
    MonitoredItemCreateResult,
    MonitoredItemModifyRequest,
    MonitoredItemModifyResult,
    MonitoredItemNotification,
    MonitoringFilter,
    MonitoringFilterResult,
    MonitoringParameters,
    NameValuePair,
    NetworkAddressDataType,
    NetworkAddressUrlDataType,
    NetworkGroupDataType,
    Node,
    NodeAttributes,
    NodeReference,
    NodeTypeDescription,
    NotificationData,
    NotificationMessage,
    ObjectAttributes,
    ObjectNode,
    ObjectTypeAttributes,
    ObjectTypeNode,
    OpenSecureChannelRequest,
    OpenSecureChannelResponse,
    OptionSet,
    Orientation,
    ParsingResult,
    PortableNodeId,
    PortableQualifiedName,
    PriorityMappingEntryType,
    ProgramDiagnostic2DataType,
    ProgramDiagnosticDataType,
    PubSubConfiguration2DataType,
    PubSubConfigurationDataType,
    PubSubConfigurationRefDataType,
    PubSubConfigurationValueDataType,
    PubSubConnectionDataType,
    PubSubGroupDataType,
    PubSubKeyPushTargetDataType,
    PublishRequest,
    PublishResponse,
    PublishedActionDataType,
    PublishedActionMethodDataType,
    PublishedDataItemsDataType,
    PublishedDataSetCustomSourceDataType,
    PublishedDataSetDataType,
    PublishedDataSetSourceDataType,
    PublishedEventsDataType,
    PublishedVariableDataType,
    QosDataType,
    QuantityDimension,
    QueryDataDescription,
    QueryDataSet,
    QueryFirstRequest,
    QueryFirstResponse,
    QueryNextRequest,
    QueryNextResponse,
    Range,
    RationalNumber,
    ReadAnnotationDataDetails,
    ReadAtTimeDetails,
    ReadEventDetails,
    ReadEventDetails2,
    ReadEventDetailsSorted,
    ReadProcessedDetails,
    ReadRawModifiedDetails,
    ReadRequest,
    ReadResponse,
    ReadValueId,
    ReaderGroupDataType,
    ReaderGroupMessageDataType,
    ReaderGroupTransportDataType,
    ReceiveQosDataType,
    ReceiveQosPriorityDataType,
    RedundantServerDataType,
    ReferenceDescription,
    ReferenceDescriptionDataType,
    ReferenceListEntryDataType,
    ReferenceNode,
    ReferenceTypeAttributes,
    ReferenceTypeNode,
    RegisterNodesRequest,
    RegisterNodesResponse,
    RegisterServer2Request,
    RegisterServer2Response,
    RegisterServerRequest,
    RegisterServerResponse,
    RegisteredServer,
    RelativePath,
    RelativePathElement,
    RepublishRequest,
    RepublishResponse,
    RequestHeader,
    ResponseHeader,
    RolePermissionType,
    SamplingIntervalDiagnosticsDataType,
    SecurityGroupDataType,
    SecuritySettingsDataType,
    SemanticChangeStructureDataType,
    ServerDiagnosticsSummaryDataType,
    ServerEndpointDataType,
    ServerOnNetwork,
    ServerStatusDataType,
    ServiceCertificateDataType,
    ServiceCounterDataType,
    ServiceFault,
    SessionDiagnosticsDataType,
    SessionSecurityDiagnosticsDataType,
    SessionlessInvokeRequestType,
    SessionlessInvokeResponseType,
    SetMonitoringModeRequest,
    SetMonitoringModeResponse,
    SetPublishingModeRequest,
    SetPublishingModeResponse,
    SetTriggeringRequest,
    SetTriggeringResponse,
    SignatureData,
    SignedSoftwareCertificate,
    SimpleAttributeOperand,
    SimpleTypeDescription,
    SortRuleElement,
    SpanContextDataType,
    StandaloneSubscribedDataSetDataType,
    StandaloneSubscribedDataSetRefDataType,
    StatusChangeNotification,
    StatusResult,
    StructureDefinition,
    StructureDescription,
    StructureField,
    SubscribedDataSetDataType,
    SubscribedDataSetMirrorDataType,
    SubscriptionAcknowledgement,
    SubscriptionDiagnosticsDataType,
    TargetVariablesDataType,
    TimeZoneDataType,
    TraceContextDataType,
    TransactionErrorType,
    TransferResult,
    TransferSubscriptionsRequest,
    TransferSubscriptionsResponse,
    TranslateBrowsePathsToNodeIdsRequest,
    TranslateBrowsePathsToNodeIdsResponse,
    TransmitQosDataType,
    TransmitQosPriorityDataType,
    TrustListDataType,
    TypeNode,
    UABinaryFileDataType,
    UadpDataSetReaderMessageDataType,
    UadpDataSetWriterMessageDataType,
    UadpWriterGroupMessageDataType,
    Union,
    UnregisterNodesRequest,
    UnregisterNodesResponse,
    UnsignedRationalNumber,
    UpdateDataDetails,
    UpdateEventDetails,
    UpdateStructureDataDetails,
    UserIdentityToken,
    UserManagementDataType,
    UserNameIdentityToken,
    UserTokenPolicy,
    UserTokenSettingsDataType,
    VariableAttributes,
    VariableNode,
    VariableTypeAttributes,
    VariableTypeNode,
    Vector,
    ViewAttributes,
    ViewDescription,
    ViewNode,
    WriteRequest,
    WriteResponse,
    WriteValue,
    WriterGroupDataType,
    WriterGroupMessageDataType,
    WriterGroupTransportDataType,
    X509IdentityToken,
    XVType,
    _3DCartesianCoordinates,
    _3DFrame,
    _3DOrientation,
    _3DVector
} from './types.js';

export function decodeUnion(reader: IReader, decoder: Decoder): Union {
    const obj = new Union();
    return obj;
};

export function decodeKeyValuePair(reader: IReader, decoder: Decoder): KeyValuePair {
    const obj = new KeyValuePair();
    obj.key = reader.readQualifiedName();
    obj.value = reader.readVariant(decoder);
    return obj;
};

export function decodeAdditionalParametersType(reader: IReader, decoder: Decoder): AdditionalParametersType {
    const obj = new AdditionalParametersType();
    obj.parameters = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    return obj;
};

export function decodeEphemeralKeyType(reader: IReader, decoder: Decoder): EphemeralKeyType {
    const obj = new EphemeralKeyType();
    obj.publicKey = reader.readByteString();
    obj.signature = reader.readByteString();
    return obj;
};

export function decodeEndpointType(reader: IReader, decoder: Decoder): EndpointType {
    const obj = new EndpointType();
    obj.endpointUrl = reader.readString();
    obj.securityMode = reader.readUInt32() as MessageSecurityModeEnum;
    obj.securityPolicyUri = reader.readString();
    obj.transportProfileUri = reader.readString();
    return obj;
};

export function decodeBitFieldDefinition(reader: IReader, decoder: Decoder): BitFieldDefinition {
    const obj = new BitFieldDefinition();
    obj.name = reader.readString();
    obj.description = reader.readLocalizedText();
    obj.reserved = reader.readBoolean();
    obj.startingBitPosition = reader.readUInt32();
    obj.endingBitPosition = reader.readUInt32();
    return obj;
};

export function decodeRationalNumber(reader: IReader, decoder: Decoder): RationalNumber {
    const obj = new RationalNumber();
    obj.numerator = reader.readInt32();
    obj.denominator = reader.readUInt32();
    return obj;
};

export function decodeVector(reader: IReader, decoder: Decoder): Vector {
    const obj = new Vector();
    return obj;
};

export function decode_3DVector(reader: IReader, decoder: Decoder): _3DVector {
    const obj = new _3DVector();
    Object.assign(obj, decodeVector(reader, decoder)); // decode base class
    obj.x = reader.readDouble();
    obj.y = reader.readDouble();
    obj.z = reader.readDouble();
    return obj;
};

export function decodeCartesianCoordinates(reader: IReader, decoder: Decoder): CartesianCoordinates {
    const obj = new CartesianCoordinates();
    return obj;
};

export function decode_3DCartesianCoordinates(reader: IReader, decoder: Decoder): _3DCartesianCoordinates {
    const obj = new _3DCartesianCoordinates();
    Object.assign(obj, decodeCartesianCoordinates(reader, decoder)); // decode base class
    obj.x = reader.readDouble();
    obj.y = reader.readDouble();
    obj.z = reader.readDouble();
    return obj;
};

export function decodeOrientation(reader: IReader, decoder: Decoder): Orientation {
    const obj = new Orientation();
    return obj;
};

export function decode_3DOrientation(reader: IReader, decoder: Decoder): _3DOrientation {
    const obj = new _3DOrientation();
    Object.assign(obj, decodeOrientation(reader, decoder)); // decode base class
    obj.a = reader.readDouble();
    obj.b = reader.readDouble();
    obj.c = reader.readDouble();
    return obj;
};

export function decodeFrame(reader: IReader, decoder: Decoder): Frame {
    const obj = new Frame();
    return obj;
};

export function decode_3DFrame(reader: IReader, decoder: Decoder): _3DFrame {
    const obj = new _3DFrame();
    Object.assign(obj, decodeFrame(reader, decoder)); // decode base class
    obj.cartesianCoordinates = decode_3DCartesianCoordinates(reader, decoder);
    obj.orientation = decode_3DOrientation(reader, decoder);
    return obj;
};

export function decodeIdentityMappingRuleType(reader: IReader, decoder: Decoder): IdentityMappingRuleType {
    const obj = new IdentityMappingRuleType();
    obj.criteriaType = reader.readUInt32() as IdentityCriteriaTypeEnum;
    obj.criteria = reader.readString();
    return obj;
};

export function decodeCurrencyUnitType(reader: IReader, decoder: Decoder): CurrencyUnitType {
    const obj = new CurrencyUnitType();
    obj.numericCode = reader.readInt16();
    obj.exponent = reader.readSByte();
    obj.alphabeticCode = reader.readString();
    obj.currency = reader.readLocalizedText();
    return obj;
};

export function decodeAnnotationDataType(reader: IReader, decoder: Decoder): AnnotationDataType {
    const obj = new AnnotationDataType();
    obj.annotation = reader.readString();
    obj.discipline = reader.readString();
    obj.uri = reader.readString();
    return obj;
};

export function decodeLinearConversionDataType(reader: IReader, decoder: Decoder): LinearConversionDataType {
    const obj = new LinearConversionDataType();
    obj.initialAddend = reader.readFloat();
    obj.multiplicand = reader.readFloat();
    obj.divisor = reader.readFloat();
    obj.finalAddend = reader.readFloat();
    return obj;
};

export function decodeQuantityDimension(reader: IReader, decoder: Decoder): QuantityDimension {
    const obj = new QuantityDimension();
    obj.massExponent = reader.readSByte();
    obj.lengthExponent = reader.readSByte();
    obj.timeExponent = reader.readSByte();
    obj.electricCurrentExponent = reader.readSByte();
    obj.amountOfSubstanceExponent = reader.readSByte();
    obj.luminousIntensityExponent = reader.readSByte();
    obj.absoluteTemperatureExponent = reader.readSByte();
    obj.dimensionlessExponent = reader.readSByte();
    return obj;
};

export function decodeTrustListDataType(reader: IReader, decoder: Decoder): TrustListDataType {
    const obj = new TrustListDataType();
    obj.specifiedLists = reader.readUInt32();
    obj.trustedCertificates = reader.readArray((d: IReader) => d.readByteString())!;
    obj.trustedCrls = reader.readArray((d: IReader) => d.readByteString())!;
    obj.issuerCertificates = reader.readArray((d: IReader) => d.readByteString())!;
    obj.issuerCrls = reader.readArray((d: IReader) => d.readByteString())!;
    return obj;
};

export function decodeBaseConfigurationDataType(reader: IReader, decoder: Decoder): BaseConfigurationDataType {
    const obj = new BaseConfigurationDataType();
    obj.configurationVersion = reader.readUInt32();
    obj.configurationProperties = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    return obj;
};

export function decodeBaseConfigurationRecordDataType(reader: IReader, decoder: Decoder): BaseConfigurationRecordDataType {
    const obj = new BaseConfigurationRecordDataType();
    obj.name = reader.readString();
    obj.recordProperties = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    return obj;
};

export function decodeCertificateGroupDataType(reader: IReader, decoder: Decoder): CertificateGroupDataType {
    const obj = new CertificateGroupDataType();
    Object.assign(obj, decodeBaseConfigurationRecordDataType(reader, decoder)); // decode base class
    obj.purpose = reader.readNodeId();
    obj.certificateTypes = reader.readArray((d: IReader) => d.readNodeId())!;
    obj.isCertificateAssigned = reader.readArray((d: IReader) => d.readBoolean())!;
    obj.validationOptions = reader.readUInt32();
    return obj;
};

export function decodeConfigurationUpdateTargetType(reader: IReader, decoder: Decoder): ConfigurationUpdateTargetType {
    const obj = new ConfigurationUpdateTargetType();
    obj.path = reader.readString();
    obj.updateType = reader.readUInt32() as ConfigurationUpdateTypeEnum;
    return obj;
};

export function decodeTransactionErrorType(reader: IReader, decoder: Decoder): TransactionErrorType {
    const obj = new TransactionErrorType();
    obj.targetId = reader.readNodeId();
    obj.error = reader.readStatusCode();
    obj.message = reader.readLocalizedText();
    return obj;
};

export function decodeApplicationConfigurationDataType(reader: IReader, decoder: Decoder): ApplicationConfigurationDataType {
    const obj = new ApplicationConfigurationDataType();
    Object.assign(obj, decodeBaseConfigurationDataType(reader, decoder)); // decode base class
    obj.applicationIdentity = decodeApplicationIdentityDataType(reader, decoder);
    obj.certificateGroups = reader.readArray((d: IReader) => decodeCertificateGroupDataType(d, decoder))!;
    obj.serverEndpoints = reader.readArray((d: IReader) => decodeServerEndpointDataType(d, decoder))!;
    obj.clientEndpoints = reader.readArray((d: IReader) => decodeEndpointDataType(d, decoder))!;
    obj.securitySettings = reader.readArray((d: IReader) => decodeSecuritySettingsDataType(d, decoder))!;
    obj.userTokenSettings = reader.readArray((d: IReader) => decodeUserTokenSettingsDataType(d, decoder))!;
    obj.authorizationServices = reader.readArray((d: IReader) => decodeAuthorizationServiceConfigurationDataType(d, decoder))!;
    return obj;
};

export function decodeApplicationIdentityDataType(reader: IReader, decoder: Decoder): ApplicationIdentityDataType {
    const obj = new ApplicationIdentityDataType();
    Object.assign(obj, decodeBaseConfigurationRecordDataType(reader, decoder)); // decode base class
    obj.applicationUri = reader.readString();
    obj.applicationNames = reader.readArray((d: IReader) => d.readLocalizedText())!;
    obj.additionalServers = reader.readArray((d: IReader) => decodeApplicationDescription(d, decoder))!;
    return obj;
};

export function decodeEndpointDataType(reader: IReader, decoder: Decoder): EndpointDataType {
    const obj = new EndpointDataType();
    Object.assign(obj, decodeBaseConfigurationRecordDataType(reader, decoder)); // decode base class
    obj.discoveryUrls = reader.readArray((d: IReader) => d.readString())!;
    obj.networkName = reader.readString();
    obj.port = reader.readUInt16();
    return obj;
};

export function decodeServerEndpointDataType(reader: IReader, decoder: Decoder): ServerEndpointDataType {
    const obj = new ServerEndpointDataType();
    Object.assign(obj, decodeEndpointDataType(reader, decoder)); // decode base class
    obj.endpointUrls = reader.readArray((d: IReader) => d.readString())!;
    obj.securitySettingNames = reader.readArray((d: IReader) => d.readString())!;
    obj.transportProfileUri = reader.readString();
    obj.userTokenSettingNames = reader.readArray((d: IReader) => d.readString())!;
    obj.reverseConnectUrls = reader.readArray((d: IReader) => d.readString())!;
    return obj;
};

export function decodeSecuritySettingsDataType(reader: IReader, decoder: Decoder): SecuritySettingsDataType {
    const obj = new SecuritySettingsDataType();
    Object.assign(obj, decodeBaseConfigurationRecordDataType(reader, decoder)); // decode base class
    obj.securityModes = reader.readArray((d: IReader) => d.readUInt32() as MessageSecurityModeEnum)!;
    obj.securityPolicyUris = reader.readArray((d: IReader) => d.readString())!;
    obj.certificateGroupName = reader.readString();
    return obj;
};

export function decodeUserTokenSettingsDataType(reader: IReader, decoder: Decoder): UserTokenSettingsDataType {
    const obj = new UserTokenSettingsDataType();
    Object.assign(obj, decodeBaseConfigurationRecordDataType(reader, decoder)); // decode base class
    obj.tokenType = reader.readUInt32() as UserTokenTypeEnum;
    obj.issuedTokenType = reader.readString();
    obj.issuerEndpointUrl = reader.readString();
    obj.securityPolicyUri = reader.readString();
    obj.certificateGroupName = reader.readString();
    obj.authorizationServiceName = reader.readString();
    return obj;
};

export function decodeServiceCertificateDataType(reader: IReader, decoder: Decoder): ServiceCertificateDataType {
    const obj = new ServiceCertificateDataType();
    obj.certificate = reader.readByteString();
    obj.issuers = reader.readArray((d: IReader) => d.readByteString())!;
    obj.validFrom = reader.readDateTime();
    obj.validTo = reader.readDateTime();
    return obj;
};

export function decodeAuthorizationServiceConfigurationDataType(reader: IReader, decoder: Decoder): AuthorizationServiceConfigurationDataType {
    const obj = new AuthorizationServiceConfigurationDataType();
    Object.assign(obj, decodeBaseConfigurationRecordDataType(reader, decoder)); // decode base class
    obj.serviceUri = reader.readString();
    obj.serviceCertificates = reader.readArray((d: IReader) => decodeServiceCertificateDataType(d, decoder))!;
    obj.issuerEndpointSettings = reader.readString();
    return obj;
};

export function decodeDecimalDataType(reader: IReader, decoder: Decoder): DecimalDataType {
    const obj = new DecimalDataType();
    obj.scale = reader.readInt16();
    obj.value = reader.readByteString();
    return obj;
};

export function decodeDataTypeSchemaHeader(reader: IReader, decoder: Decoder): DataTypeSchemaHeader {
    const obj = new DataTypeSchemaHeader();
    obj.namespaces = reader.readArray((d: IReader) => d.readString())!;
    obj.structureDataTypes = reader.readArray((d: IReader) => decodeStructureDescription(d, decoder))!;
    obj.enumDataTypes = reader.readArray((d: IReader) => decodeEnumDescription(d, decoder))!;
    obj.simpleDataTypes = reader.readArray((d: IReader) => decodeSimpleTypeDescription(d, decoder))!;
    return obj;
};

export function decodeDataTypeDescription(reader: IReader, decoder: Decoder): DataTypeDescription {
    const obj = new DataTypeDescription();
    obj.dataTypeId = reader.readNodeId();
    obj.name = reader.readQualifiedName();
    return obj;
};

export function decodeStructureDescription(reader: IReader, decoder: Decoder): StructureDescription {
    const obj = new StructureDescription();
    Object.assign(obj, decodeDataTypeDescription(reader, decoder)); // decode base class
    obj.structureDefinition = decodeStructureDefinition(reader, decoder);
    return obj;
};

export function decodeEnumDescription(reader: IReader, decoder: Decoder): EnumDescription {
    const obj = new EnumDescription();
    Object.assign(obj, decodeDataTypeDescription(reader, decoder)); // decode base class
    obj.enumDefinition = decodeEnumDefinition(reader, decoder);
    obj.builtInType = reader.readByte();
    return obj;
};

export function decodeSimpleTypeDescription(reader: IReader, decoder: Decoder): SimpleTypeDescription {
    const obj = new SimpleTypeDescription();
    Object.assign(obj, decodeDataTypeDescription(reader, decoder)); // decode base class
    obj.baseDataType = reader.readNodeId();
    obj.builtInType = reader.readByte();
    return obj;
};

export function decodeUABinaryFileDataType(reader: IReader, decoder: Decoder): UABinaryFileDataType {
    const obj = new UABinaryFileDataType();
    Object.assign(obj, decodeDataTypeSchemaHeader(reader, decoder)); // decode base class
    obj.schemaLocation = reader.readString();
    obj.fileHeader = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    obj.body = reader.readVariant(decoder);
    return obj;
};

export function decodePortableQualifiedName(reader: IReader, decoder: Decoder): PortableQualifiedName {
    const obj = new PortableQualifiedName();
    obj.namespaceUri = reader.readString();
    obj.name = reader.readString();
    return obj;
};

export function decodePortableNodeId(reader: IReader, decoder: Decoder): PortableNodeId {
    const obj = new PortableNodeId();
    obj.namespaceUri = reader.readString();
    obj.identifier = reader.readNodeId();
    return obj;
};

export function decodeUnsignedRationalNumber(reader: IReader, decoder: Decoder): UnsignedRationalNumber {
    const obj = new UnsignedRationalNumber();
    obj.numerator = reader.readUInt32();
    obj.denominator = reader.readUInt32();
    return obj;
};

export function decodeDataSetMetaDataType(reader: IReader, decoder: Decoder): DataSetMetaDataType {
    const obj = new DataSetMetaDataType();
    Object.assign(obj, decodeDataTypeSchemaHeader(reader, decoder)); // decode base class
    obj.name = reader.readString();
    obj.description = reader.readLocalizedText();
    obj.fields = reader.readArray((d: IReader) => decodeFieldMetaData(d, decoder))!;
    obj.dataSetClassId = reader.readGuid();
    obj.configurationVersion = decodeConfigurationVersionDataType(reader, decoder);
    return obj;
};

export function decodeFieldMetaData(reader: IReader, decoder: Decoder): FieldMetaData {
    const obj = new FieldMetaData();
    obj.name = reader.readString();
    obj.description = reader.readLocalizedText();
    obj.fieldFlags = reader.readUInt16();
    obj.builtInType = reader.readByte();
    obj.dataType = reader.readNodeId();
    obj.valueRank = reader.readInt32();
    obj.arrayDimensions = reader.readArray((d: IReader) => d.readUInt32())!;
    obj.maxStringLength = reader.readUInt32();
    obj.dataSetFieldId = reader.readGuid();
    obj.properties = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    return obj;
};

export function decodeConfigurationVersionDataType(reader: IReader, decoder: Decoder): ConfigurationVersionDataType {
    const obj = new ConfigurationVersionDataType();
    obj.majorVersion = reader.readUInt32();
    obj.minorVersion = reader.readUInt32();
    return obj;
};

export function decodePublishedDataSetDataType(reader: IReader, decoder: Decoder): PublishedDataSetDataType {
    const obj = new PublishedDataSetDataType();
    obj.name = reader.readString();
    obj.dataSetFolder = reader.readArray((d: IReader) => d.readString())!;
    obj.dataSetMetaData = decodeDataSetMetaDataType(reader, decoder);
    obj.extensionFields = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    obj.dataSetSource = decodePublishedDataSetSourceDataType(reader, decoder);
    return obj;
};

export function decodePublishedDataSetSourceDataType(reader: IReader, decoder: Decoder): PublishedDataSetSourceDataType {
    const obj = new PublishedDataSetSourceDataType();
    return obj;
};

export function decodePublishedVariableDataType(reader: IReader, decoder: Decoder): PublishedVariableDataType {
    const obj = new PublishedVariableDataType();
    obj.publishedVariable = reader.readNodeId();
    obj.attributeId = reader.readUInt32();
    obj.samplingIntervalHint = reader.readDouble();
    obj.deadbandType = reader.readUInt32();
    obj.deadbandValue = reader.readDouble();
    obj.indexRange = reader.readString();
    obj.substituteValue = reader.readVariant(decoder);
    obj.metaDataProperties = reader.readArray((d: IReader) => d.readQualifiedName())!;
    return obj;
};

export function decodePublishedDataItemsDataType(reader: IReader, decoder: Decoder): PublishedDataItemsDataType {
    const obj = new PublishedDataItemsDataType();
    Object.assign(obj, decodePublishedDataSetSourceDataType(reader, decoder)); // decode base class
    obj.publishedData = reader.readArray((d: IReader) => decodePublishedVariableDataType(d, decoder))!;
    return obj;
};

export function decodePublishedEventsDataType(reader: IReader, decoder: Decoder): PublishedEventsDataType {
    const obj = new PublishedEventsDataType();
    Object.assign(obj, decodePublishedDataSetSourceDataType(reader, decoder)); // decode base class
    obj.eventNotifier = reader.readNodeId();
    obj.selectedFields = reader.readArray((d: IReader) => decodeSimpleAttributeOperand(d, decoder))!;
    obj.filter = decodeContentFilter(reader, decoder);
    return obj;
};

export function decodePublishedDataSetCustomSourceDataType(reader: IReader, decoder: Decoder): PublishedDataSetCustomSourceDataType {
    const obj = new PublishedDataSetCustomSourceDataType();
    Object.assign(obj, decodePublishedDataSetSourceDataType(reader, decoder)); // decode base class
    obj.cyclicDataSet = reader.readBoolean();
    return obj;
};

export function decodeActionTargetDataType(reader: IReader, decoder: Decoder): ActionTargetDataType {
    const obj = new ActionTargetDataType();
    obj.actionTargetId = reader.readUInt16();
    obj.name = reader.readString();
    obj.description = reader.readLocalizedText();
    return obj;
};

export function decodePublishedActionDataType(reader: IReader, decoder: Decoder): PublishedActionDataType {
    const obj = new PublishedActionDataType();
    Object.assign(obj, decodePublishedDataSetSourceDataType(reader, decoder)); // decode base class
    obj.requestDataSetMetaData = decodeDataSetMetaDataType(reader, decoder);
    obj.actionTargets = reader.readArray((d: IReader) => decodeActionTargetDataType(d, decoder))!;
    return obj;
};

export function decodeActionMethodDataType(reader: IReader, decoder: Decoder): ActionMethodDataType {
    const obj = new ActionMethodDataType();
    obj.objectId = reader.readNodeId();
    obj.methodId = reader.readNodeId();
    return obj;
};

export function decodePublishedActionMethodDataType(reader: IReader, decoder: Decoder): PublishedActionMethodDataType {
    const obj = new PublishedActionMethodDataType();
    Object.assign(obj, decodePublishedActionDataType(reader, decoder)); // decode base class
    obj.actionMethods = reader.readArray((d: IReader) => decodeActionMethodDataType(d, decoder))!;
    return obj;
};

export function decodeDataSetWriterDataType(reader: IReader, decoder: Decoder): DataSetWriterDataType {
    const obj = new DataSetWriterDataType();
    obj.name = reader.readString();
    obj.enabled = reader.readBoolean();
    obj.dataSetWriterId = reader.readUInt16();
    obj.dataSetFieldContentMask = reader.readUInt32();
    obj.keyFrameCount = reader.readUInt32();
    obj.dataSetName = reader.readString();
    obj.dataSetWriterProperties = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    obj.transportSettings = decodeDataSetWriterTransportDataType(reader, decoder);
    obj.messageSettings = decodeDataSetWriterMessageDataType(reader, decoder);
    return obj;
};

export function decodeDataSetWriterTransportDataType(reader: IReader, decoder: Decoder): DataSetWriterTransportDataType {
    const obj = new DataSetWriterTransportDataType();
    return obj;
};

export function decodeDataSetWriterMessageDataType(reader: IReader, decoder: Decoder): DataSetWriterMessageDataType {
    const obj = new DataSetWriterMessageDataType();
    return obj;
};

export function decodePubSubGroupDataType(reader: IReader, decoder: Decoder): PubSubGroupDataType {
    const obj = new PubSubGroupDataType();
    obj.name = reader.readString();
    obj.enabled = reader.readBoolean();
    obj.securityMode = reader.readUInt32() as MessageSecurityModeEnum;
    obj.securityGroupId = reader.readString();
    obj.securityKeyServices = reader.readArray((d: IReader) => decodeEndpointDescription(d, decoder))!;
    obj.maxNetworkMessageSize = reader.readUInt32();
    obj.groupProperties = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    return obj;
};

export function decodeWriterGroupDataType(reader: IReader, decoder: Decoder): WriterGroupDataType {
    const obj = new WriterGroupDataType();
    Object.assign(obj, decodePubSubGroupDataType(reader, decoder)); // decode base class
    obj.writerGroupId = reader.readUInt16();
    obj.publishingInterval = reader.readDouble();
    obj.keepAliveTime = reader.readDouble();
    obj.priority = reader.readByte();
    obj.localeIds = reader.readArray((d: IReader) => d.readString())!;
    obj.headerLayoutUri = reader.readString();
    obj.transportSettings = decodeWriterGroupTransportDataType(reader, decoder);
    obj.messageSettings = decodeWriterGroupMessageDataType(reader, decoder);
    obj.dataSetWriters = reader.readArray((d: IReader) => decodeDataSetWriterDataType(d, decoder))!;
    return obj;
};

export function decodeWriterGroupTransportDataType(reader: IReader, decoder: Decoder): WriterGroupTransportDataType {
    const obj = new WriterGroupTransportDataType();
    return obj;
};

export function decodeWriterGroupMessageDataType(reader: IReader, decoder: Decoder): WriterGroupMessageDataType {
    const obj = new WriterGroupMessageDataType();
    return obj;
};

export function decodePubSubConnectionDataType(reader: IReader, decoder: Decoder): PubSubConnectionDataType {
    const obj = new PubSubConnectionDataType();
    obj.name = reader.readString();
    obj.enabled = reader.readBoolean();
    obj.publisherId = reader.readVariant(decoder);
    obj.transportProfileUri = reader.readString();
    obj.address = decodeNetworkAddressDataType(reader, decoder);
    obj.connectionProperties = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    obj.transportSettings = decodeConnectionTransportDataType(reader, decoder);
    obj.writerGroups = reader.readArray((d: IReader) => decodeWriterGroupDataType(d, decoder))!;
    obj.readerGroups = reader.readArray((d: IReader) => decodeReaderGroupDataType(d, decoder))!;
    return obj;
};

export function decodeConnectionTransportDataType(reader: IReader, decoder: Decoder): ConnectionTransportDataType {
    const obj = new ConnectionTransportDataType();
    return obj;
};

export function decodeNetworkAddressDataType(reader: IReader, decoder: Decoder): NetworkAddressDataType {
    const obj = new NetworkAddressDataType();
    obj.networkInterface = reader.readString();
    return obj;
};

export function decodeNetworkAddressUrlDataType(reader: IReader, decoder: Decoder): NetworkAddressUrlDataType {
    const obj = new NetworkAddressUrlDataType();
    Object.assign(obj, decodeNetworkAddressDataType(reader, decoder)); // decode base class
    obj.url = reader.readString();
    return obj;
};

export function decodeReaderGroupDataType(reader: IReader, decoder: Decoder): ReaderGroupDataType {
    const obj = new ReaderGroupDataType();
    Object.assign(obj, decodePubSubGroupDataType(reader, decoder)); // decode base class
    obj.transportSettings = decodeReaderGroupTransportDataType(reader, decoder);
    obj.messageSettings = decodeReaderGroupMessageDataType(reader, decoder);
    obj.dataSetReaders = reader.readArray((d: IReader) => decodeDataSetReaderDataType(d, decoder))!;
    return obj;
};

export function decodeReaderGroupTransportDataType(reader: IReader, decoder: Decoder): ReaderGroupTransportDataType {
    const obj = new ReaderGroupTransportDataType();
    return obj;
};

export function decodeReaderGroupMessageDataType(reader: IReader, decoder: Decoder): ReaderGroupMessageDataType {
    const obj = new ReaderGroupMessageDataType();
    return obj;
};

export function decodeDataSetReaderDataType(reader: IReader, decoder: Decoder): DataSetReaderDataType {
    const obj = new DataSetReaderDataType();
    obj.name = reader.readString();
    obj.enabled = reader.readBoolean();
    obj.publisherId = reader.readVariant(decoder);
    obj.writerGroupId = reader.readUInt16();
    obj.dataSetWriterId = reader.readUInt16();
    obj.dataSetMetaData = decodeDataSetMetaDataType(reader, decoder);
    obj.dataSetFieldContentMask = reader.readUInt32();
    obj.messageReceiveTimeout = reader.readDouble();
    obj.keyFrameCount = reader.readUInt32();
    obj.headerLayoutUri = reader.readString();
    obj.securityMode = reader.readUInt32() as MessageSecurityModeEnum;
    obj.securityGroupId = reader.readString();
    obj.securityKeyServices = reader.readArray((d: IReader) => decodeEndpointDescription(d, decoder))!;
    obj.dataSetReaderProperties = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    obj.transportSettings = decodeDataSetReaderTransportDataType(reader, decoder);
    obj.messageSettings = decodeDataSetReaderMessageDataType(reader, decoder);
    obj.subscribedDataSet = decodeSubscribedDataSetDataType(reader, decoder);
    return obj;
};

export function decodeDataSetReaderTransportDataType(reader: IReader, decoder: Decoder): DataSetReaderTransportDataType {
    const obj = new DataSetReaderTransportDataType();
    return obj;
};

export function decodeDataSetReaderMessageDataType(reader: IReader, decoder: Decoder): DataSetReaderMessageDataType {
    const obj = new DataSetReaderMessageDataType();
    return obj;
};

export function decodeSubscribedDataSetDataType(reader: IReader, decoder: Decoder): SubscribedDataSetDataType {
    const obj = new SubscribedDataSetDataType();
    return obj;
};

export function decodeTargetVariablesDataType(reader: IReader, decoder: Decoder): TargetVariablesDataType {
    const obj = new TargetVariablesDataType();
    Object.assign(obj, decodeSubscribedDataSetDataType(reader, decoder)); // decode base class
    obj.targetVariables = reader.readArray((d: IReader) => decodeFieldTargetDataType(d, decoder))!;
    return obj;
};

export function decodeFieldTargetDataType(reader: IReader, decoder: Decoder): FieldTargetDataType {
    const obj = new FieldTargetDataType();
    obj.dataSetFieldId = reader.readGuid();
    obj.receiverIndexRange = reader.readString();
    obj.targetNodeId = reader.readNodeId();
    obj.attributeId = reader.readUInt32();
    obj.writeIndexRange = reader.readString();
    obj.overrideValueHandling = reader.readUInt32() as OverrideValueHandlingEnum;
    obj.overrideValue = reader.readVariant(decoder);
    return obj;
};

export function decodeSubscribedDataSetMirrorDataType(reader: IReader, decoder: Decoder): SubscribedDataSetMirrorDataType {
    const obj = new SubscribedDataSetMirrorDataType();
    Object.assign(obj, decodeSubscribedDataSetDataType(reader, decoder)); // decode base class
    obj.parentNodeName = reader.readString();
    obj.rolePermissions = reader.readArray((d: IReader) => decodeRolePermissionType(d, decoder))!;
    return obj;
};

export function decodePubSubConfigurationDataType(reader: IReader, decoder: Decoder): PubSubConfigurationDataType {
    const obj = new PubSubConfigurationDataType();
    obj.publishedDataSets = reader.readArray((d: IReader) => decodePublishedDataSetDataType(d, decoder))!;
    obj.connections = reader.readArray((d: IReader) => decodePubSubConnectionDataType(d, decoder))!;
    obj.enabled = reader.readBoolean();
    return obj;
};

export function decodeStandaloneSubscribedDataSetRefDataType(reader: IReader, decoder: Decoder): StandaloneSubscribedDataSetRefDataType {
    const obj = new StandaloneSubscribedDataSetRefDataType();
    Object.assign(obj, decodeSubscribedDataSetDataType(reader, decoder)); // decode base class
    obj.dataSetName = reader.readString();
    return obj;
};

export function decodeStandaloneSubscribedDataSetDataType(reader: IReader, decoder: Decoder): StandaloneSubscribedDataSetDataType {
    const obj = new StandaloneSubscribedDataSetDataType();
    Object.assign(obj, decodeSubscribedDataSetDataType(reader, decoder)); // decode base class
    obj.name = reader.readString();
    obj.dataSetFolder = reader.readArray((d: IReader) => d.readString())!;
    obj.dataSetMetaData = decodeDataSetMetaDataType(reader, decoder);
    obj.subscribedDataSet = decodeSubscribedDataSetDataType(reader, decoder);
    return obj;
};

export function decodeSecurityGroupDataType(reader: IReader, decoder: Decoder): SecurityGroupDataType {
    const obj = new SecurityGroupDataType();
    obj.name = reader.readString();
    obj.securityGroupFolder = reader.readArray((d: IReader) => d.readString())!;
    obj.keyLifetime = reader.readDouble();
    obj.securityPolicyUri = reader.readString();
    obj.maxFutureKeyCount = reader.readUInt32();
    obj.maxPastKeyCount = reader.readUInt32();
    obj.securityGroupId = reader.readString();
    obj.rolePermissions = reader.readArray((d: IReader) => decodeRolePermissionType(d, decoder))!;
    obj.groupProperties = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    return obj;
};

export function decodePubSubKeyPushTargetDataType(reader: IReader, decoder: Decoder): PubSubKeyPushTargetDataType {
    const obj = new PubSubKeyPushTargetDataType();
    obj.applicationUri = reader.readString();
    obj.pushTargetFolder = reader.readArray((d: IReader) => d.readString())!;
    obj.endpointUrl = reader.readString();
    obj.securityPolicyUri = reader.readString();
    obj.userTokenType = decodeUserTokenPolicy(reader, decoder);
    obj.requestedKeyCount = reader.readUInt16();
    obj.retryInterval = reader.readDouble();
    obj.pushTargetProperties = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    obj.securityGroups = reader.readArray((d: IReader) => d.readString())!;
    return obj;
};

export function decodePubSubConfiguration2DataType(reader: IReader, decoder: Decoder): PubSubConfiguration2DataType {
    const obj = new PubSubConfiguration2DataType();
    Object.assign(obj, decodePubSubConfigurationDataType(reader, decoder)); // decode base class
    obj.subscribedDataSets = reader.readArray((d: IReader) => decodeStandaloneSubscribedDataSetDataType(d, decoder))!;
    obj.dataSetClasses = reader.readArray((d: IReader) => decodeDataSetMetaDataType(d, decoder))!;
    obj.defaultSecurityKeyServices = reader.readArray((d: IReader) => decodeEndpointDescription(d, decoder))!;
    obj.securityGroups = reader.readArray((d: IReader) => decodeSecurityGroupDataType(d, decoder))!;
    obj.pubSubKeyPushTargets = reader.readArray((d: IReader) => decodePubSubKeyPushTargetDataType(d, decoder))!;
    obj.configurationVersion = reader.readUInt32();
    obj.configurationProperties = reader.readArray((d: IReader) => decodeKeyValuePair(d, decoder))!;
    return obj;
};

export function decodeUadpWriterGroupMessageDataType(reader: IReader, decoder: Decoder): UadpWriterGroupMessageDataType {
    const obj = new UadpWriterGroupMessageDataType();
    Object.assign(obj, decodeWriterGroupMessageDataType(reader, decoder)); // decode base class
    obj.groupVersion = reader.readUInt32();
    obj.dataSetOrdering = reader.readUInt32() as DataSetOrderingTypeEnum;
    obj.networkMessageContentMask = reader.readUInt32();
    obj.samplingOffset = reader.readDouble();
    obj.publishingOffset = reader.readArray((d: IReader) => d.readDouble())!;
    return obj;
};

export function decodeUadpDataSetWriterMessageDataType(reader: IReader, decoder: Decoder): UadpDataSetWriterMessageDataType {
    const obj = new UadpDataSetWriterMessageDataType();
    Object.assign(obj, decodeDataSetWriterMessageDataType(reader, decoder)); // decode base class
    obj.dataSetMessageContentMask = reader.readUInt32();
    obj.configuredSize = reader.readUInt16();
    obj.networkMessageNumber = reader.readUInt16();
    obj.dataSetOffset = reader.readUInt16();
    return obj;
};

export function decodeUadpDataSetReaderMessageDataType(reader: IReader, decoder: Decoder): UadpDataSetReaderMessageDataType {
    const obj = new UadpDataSetReaderMessageDataType();
    Object.assign(obj, decodeDataSetReaderMessageDataType(reader, decoder)); // decode base class
    obj.groupVersion = reader.readUInt32();
    obj.networkMessageNumber = reader.readUInt16();
    obj.dataSetOffset = reader.readUInt16();
    obj.dataSetClassId = reader.readGuid();
    obj.networkMessageContentMask = reader.readUInt32();
    obj.dataSetMessageContentMask = reader.readUInt32();
    obj.publishingInterval = reader.readDouble();
    obj.receiveOffset = reader.readDouble();
    obj.processingOffset = reader.readDouble();
    return obj;
};

export function decodeJsonWriterGroupMessageDataType(reader: IReader, decoder: Decoder): JsonWriterGroupMessageDataType {
    const obj = new JsonWriterGroupMessageDataType();
    Object.assign(obj, decodeWriterGroupMessageDataType(reader, decoder)); // decode base class
    obj.networkMessageContentMask = reader.readUInt32();
    return obj;
};

export function decodeJsonDataSetWriterMessageDataType(reader: IReader, decoder: Decoder): JsonDataSetWriterMessageDataType {
    const obj = new JsonDataSetWriterMessageDataType();
    Object.assign(obj, decodeDataSetWriterMessageDataType(reader, decoder)); // decode base class
    obj.dataSetMessageContentMask = reader.readUInt32();
    return obj;
};

export function decodeJsonDataSetReaderMessageDataType(reader: IReader, decoder: Decoder): JsonDataSetReaderMessageDataType {
    const obj = new JsonDataSetReaderMessageDataType();
    Object.assign(obj, decodeDataSetReaderMessageDataType(reader, decoder)); // decode base class
    obj.networkMessageContentMask = reader.readUInt32();
    obj.dataSetMessageContentMask = reader.readUInt32();
    return obj;
};

export function decodeQosDataType(reader: IReader, decoder: Decoder): QosDataType {
    const obj = new QosDataType();
    return obj;
};

export function decodeTransmitQosDataType(reader: IReader, decoder: Decoder): TransmitQosDataType {
    const obj = new TransmitQosDataType();
    Object.assign(obj, decodeQosDataType(reader, decoder)); // decode base class
    return obj;
};

export function decodeTransmitQosPriorityDataType(reader: IReader, decoder: Decoder): TransmitQosPriorityDataType {
    const obj = new TransmitQosPriorityDataType();
    Object.assign(obj, decodeTransmitQosDataType(reader, decoder)); // decode base class
    obj.priorityLabel = reader.readString();
    return obj;
};

export function decodeReceiveQosDataType(reader: IReader, decoder: Decoder): ReceiveQosDataType {
    const obj = new ReceiveQosDataType();
    Object.assign(obj, decodeQosDataType(reader, decoder)); // decode base class
    return obj;
};

export function decodeReceiveQosPriorityDataType(reader: IReader, decoder: Decoder): ReceiveQosPriorityDataType {
    const obj = new ReceiveQosPriorityDataType();
    Object.assign(obj, decodeReceiveQosDataType(reader, decoder)); // decode base class
    obj.priorityLabel = reader.readString();
    return obj;
};

export function decodeDatagramConnectionTransportDataType(reader: IReader, decoder: Decoder): DatagramConnectionTransportDataType {
    const obj = new DatagramConnectionTransportDataType();
    Object.assign(obj, decodeConnectionTransportDataType(reader, decoder)); // decode base class
    obj.discoveryAddress = decodeNetworkAddressDataType(reader, decoder);
    return obj;
};

export function decodeDatagramConnectionTransport2DataType(reader: IReader, decoder: Decoder): DatagramConnectionTransport2DataType {
    const obj = new DatagramConnectionTransport2DataType();
    Object.assign(obj, decodeDatagramConnectionTransportDataType(reader, decoder)); // decode base class
    obj.discoveryAnnounceRate = reader.readUInt32();
    obj.discoveryMaxMessageSize = reader.readUInt32();
    obj.qosCategory = reader.readString();
    obj.datagramQos = reader.readArray((d: IReader) => decodeQosDataType(d, decoder))!;
    return obj;
};

export function decodeDatagramWriterGroupTransportDataType(reader: IReader, decoder: Decoder): DatagramWriterGroupTransportDataType {
    const obj = new DatagramWriterGroupTransportDataType();
    Object.assign(obj, decodeWriterGroupTransportDataType(reader, decoder)); // decode base class
    obj.messageRepeatCount = reader.readByte();
    obj.messageRepeatDelay = reader.readDouble();
    return obj;
};

export function decodeDatagramWriterGroupTransport2DataType(reader: IReader, decoder: Decoder): DatagramWriterGroupTransport2DataType {
    const obj = new DatagramWriterGroupTransport2DataType();
    Object.assign(obj, decodeDatagramWriterGroupTransportDataType(reader, decoder)); // decode base class
    obj.address = decodeNetworkAddressDataType(reader, decoder);
    obj.qosCategory = reader.readString();
    obj.datagramQos = reader.readArray((d: IReader) => decodeTransmitQosDataType(d, decoder))!;
    obj.discoveryAnnounceRate = reader.readUInt32();
    obj.topic = reader.readString();
    return obj;
};

export function decodeDatagramDataSetReaderTransportDataType(reader: IReader, decoder: Decoder): DatagramDataSetReaderTransportDataType {
    const obj = new DatagramDataSetReaderTransportDataType();
    Object.assign(obj, decodeDataSetReaderTransportDataType(reader, decoder)); // decode base class
    obj.address = decodeNetworkAddressDataType(reader, decoder);
    obj.qosCategory = reader.readString();
    obj.datagramQos = reader.readArray((d: IReader) => decodeReceiveQosDataType(d, decoder))!;
    obj.topic = reader.readString();
    return obj;
};

export function decodeDtlsPubSubConnectionDataType(reader: IReader, decoder: Decoder): DtlsPubSubConnectionDataType {
    const obj = new DtlsPubSubConnectionDataType();
    obj.clientCipherSuite = reader.readString();
    obj.serverCipherSuites = reader.readArray((d: IReader) => d.readString())!;
    obj.zeroRTT = reader.readBoolean();
    obj.certificateGroupId = reader.readNodeId();
    obj.verifyClientCertificate = reader.readBoolean();
    return obj;
};

export function decodeBrokerConnectionTransportDataType(reader: IReader, decoder: Decoder): BrokerConnectionTransportDataType {
    const obj = new BrokerConnectionTransportDataType();
    Object.assign(obj, decodeConnectionTransportDataType(reader, decoder)); // decode base class
    obj.resourceUri = reader.readString();
    obj.authenticationProfileUri = reader.readString();
    return obj;
};

export function decodeBrokerWriterGroupTransportDataType(reader: IReader, decoder: Decoder): BrokerWriterGroupTransportDataType {
    const obj = new BrokerWriterGroupTransportDataType();
    Object.assign(obj, decodeWriterGroupTransportDataType(reader, decoder)); // decode base class
    obj.queueName = reader.readString();
    obj.resourceUri = reader.readString();
    obj.authenticationProfileUri = reader.readString();
    obj.requestedDeliveryGuarantee = reader.readUInt32() as BrokerTransportQualityOfServiceEnum;
    return obj;
};

export function decodeBrokerDataSetWriterTransportDataType(reader: IReader, decoder: Decoder): BrokerDataSetWriterTransportDataType {
    const obj = new BrokerDataSetWriterTransportDataType();
    Object.assign(obj, decodeDataSetWriterTransportDataType(reader, decoder)); // decode base class
    obj.queueName = reader.readString();
    obj.resourceUri = reader.readString();
    obj.authenticationProfileUri = reader.readString();
    obj.requestedDeliveryGuarantee = reader.readUInt32() as BrokerTransportQualityOfServiceEnum;
    obj.metaDataQueueName = reader.readString();
    obj.metaDataUpdateTime = reader.readDouble();
    return obj;
};

export function decodeBrokerDataSetReaderTransportDataType(reader: IReader, decoder: Decoder): BrokerDataSetReaderTransportDataType {
    const obj = new BrokerDataSetReaderTransportDataType();
    Object.assign(obj, decodeDataSetReaderTransportDataType(reader, decoder)); // decode base class
    obj.queueName = reader.readString();
    obj.resourceUri = reader.readString();
    obj.authenticationProfileUri = reader.readString();
    obj.requestedDeliveryGuarantee = reader.readUInt32() as BrokerTransportQualityOfServiceEnum;
    obj.metaDataQueueName = reader.readString();
    return obj;
};

export function decodePubSubConfigurationRefDataType(reader: IReader, decoder: Decoder): PubSubConfigurationRefDataType {
    const obj = new PubSubConfigurationRefDataType();
    obj.configurationMask = reader.readUInt32();
    obj.elementIndex = reader.readUInt16();
    obj.connectionIndex = reader.readUInt16();
    obj.groupIndex = reader.readUInt16();
    return obj;
};

export function decodePubSubConfigurationValueDataType(reader: IReader, decoder: Decoder): PubSubConfigurationValueDataType {
    const obj = new PubSubConfigurationValueDataType();
    obj.configurationElement = decodePubSubConfigurationRefDataType(reader, decoder);
    obj.name = reader.readString();
    obj.identifier = reader.readVariant(decoder);
    return obj;
};

export function decodeJsonNetworkMessage(reader: IReader, decoder: Decoder): JsonNetworkMessage {
    const obj = new JsonNetworkMessage();
    obj.messageId = reader.readString();
    obj.messageType = reader.readString();
    obj.publisherId = reader.readString();
    obj.writerGroupName = reader.readString();
    obj.dataSetClassId = reader.readString();
    obj.messages = reader.readExtensionObject(decoder);
    return obj;
};

export function decodeJsonDataSetMessage(reader: IReader, decoder: Decoder): JsonDataSetMessage {
    const obj = new JsonDataSetMessage();
    obj.dataSetWriterId = reader.readUInt16();
    obj.dataSetWriterName = reader.readString();
    obj.publisherId = reader.readString();
    obj.writerGroupName = reader.readString();
    obj.sequenceNumber = reader.readUInt32();
    obj.metaDataVersion = decodeConfigurationVersionDataType(reader, decoder);
    obj.minorVersion = reader.readUInt32();
    obj.timestamp = reader.readDateTime();
    obj.status = reader.readStatusCode();
    obj.messageType = reader.readString();
    obj.payload = reader.readExtensionObject(decoder);
    return obj;
};

export function decodeJsonDataSetMetaDataMessage(reader: IReader, decoder: Decoder): JsonDataSetMetaDataMessage {
    const obj = new JsonDataSetMetaDataMessage();
    obj.messageId = reader.readString();
    obj.messageType = reader.readString();
    obj.publisherId = reader.readString();
    obj.dataSetWriterId = reader.readUInt16();
    obj.writerGroupName = reader.readString();
    obj.dataSetWriterName = reader.readString();
    obj.timestamp = reader.readDateTime();
    obj.metaData = decodeDataSetMetaDataType(reader, decoder);
    return obj;
};

export function decodeJsonApplicationDescriptionMessage(reader: IReader, decoder: Decoder): JsonApplicationDescriptionMessage {
    const obj = new JsonApplicationDescriptionMessage();
    obj.messageId = reader.readString();
    obj.messageType = reader.readString();
    obj.publisherId = reader.readString();
    obj.timestamp = reader.readDateTime();
    obj.description = decodeApplicationDescription(reader, decoder);
    obj.serverCapabilities = reader.readArray((d: IReader) => d.readString())!;
    return obj;
};

export function decodeJsonServerEndpointsMessage(reader: IReader, decoder: Decoder): JsonServerEndpointsMessage {
    const obj = new JsonServerEndpointsMessage();
    obj.messageId = reader.readString();
    obj.messageType = reader.readString();
    obj.publisherId = reader.readString();
    obj.timestamp = reader.readDateTime();
    obj.description = decodeApplicationDescription(reader, decoder);
    obj.endpoints = reader.readArray((d: IReader) => decodeEndpointDescription(d, decoder))!;
    return obj;
};

export function decodeJsonStatusMessage(reader: IReader, decoder: Decoder): JsonStatusMessage {
    const obj = new JsonStatusMessage();
    obj.messageId = reader.readString();
    obj.messageType = reader.readString();
    obj.publisherId = reader.readString();
    obj.timestamp = reader.readDateTime();
    obj.isCyclic = reader.readBoolean();
    obj.status = reader.readUInt32() as PubSubStateEnum;
    obj.nextReportTime = reader.readDateTime();
    return obj;
};

export function decodeJsonPubSubConnectionMessage(reader: IReader, decoder: Decoder): JsonPubSubConnectionMessage {
    const obj = new JsonPubSubConnectionMessage();
    obj.messageId = reader.readString();
    obj.messageType = reader.readString();
    obj.publisherId = reader.readString();
    obj.timestamp = reader.readDateTime();
    obj.connection = decodePubSubConnectionDataType(reader, decoder);
    return obj;
};

export function decodeJsonActionMetaDataMessage(reader: IReader, decoder: Decoder): JsonActionMetaDataMessage {
    const obj = new JsonActionMetaDataMessage();
    obj.messageId = reader.readString();
    obj.messageType = reader.readString();
    obj.publisherId = reader.readString();
    obj.dataSetWriterId = reader.readUInt16();
    obj.dataSetWriterName = reader.readString();
    obj.timestamp = reader.readDateTime();
    obj.actionTargets = reader.readArray((d: IReader) => decodeActionTargetDataType(d, decoder))!;
    obj.request = decodeDataSetMetaDataType(reader, decoder);
    obj.response = decodeDataSetMetaDataType(reader, decoder);
    obj.actionMethods = reader.readArray((d: IReader) => decodeActionMethodDataType(d, decoder))!;
    return obj;
};

export function decodeJsonActionResponderMessage(reader: IReader, decoder: Decoder): JsonActionResponderMessage {
    const obj = new JsonActionResponderMessage();
    obj.messageId = reader.readString();
    obj.messageType = reader.readString();
    obj.publisherId = reader.readString();
    obj.timestamp = reader.readDateTime();
    obj.connection = decodePubSubConnectionDataType(reader, decoder);
    return obj;
};

export function decodeJsonActionNetworkMessage(reader: IReader, decoder: Decoder): JsonActionNetworkMessage {
    const obj = new JsonActionNetworkMessage();
    obj.messageId = reader.readString();
    obj.messageType = reader.readString();
    obj.publisherId = reader.readString();
    obj.timestamp = reader.readDateTime();
    obj.responseAddress = reader.readString();
    obj.correlationData = reader.readByteString();
    obj.requestorId = reader.readString();
    obj.timeoutHint = reader.readDouble();
    obj.messages = reader.readArray((d: IReader) => d.readExtensionObject(decoder))!;
    return obj;
};

export function decodeJsonActionRequestMessage(reader: IReader, decoder: Decoder): JsonActionRequestMessage {
    const obj = new JsonActionRequestMessage();
    obj.dataSetWriterId = reader.readUInt16();
    obj.actionTargetId = reader.readUInt16();
    obj.dataSetWriterName = reader.readString();
    obj.writerGroupName = reader.readString();
    obj.metaDataVersion = decodeConfigurationVersionDataType(reader, decoder);
    obj.minorVersion = reader.readUInt32();
    obj.timestamp = reader.readDateTime();
    obj.messageType = reader.readString();
    obj.requestId = reader.readUInt16();
    obj.actionState = reader.readUInt32() as ActionStateEnum;
    obj.payload = reader.readExtensionObject(decoder);
    return obj;
};

export function decodeJsonActionResponseMessage(reader: IReader, decoder: Decoder): JsonActionResponseMessage {
    const obj = new JsonActionResponseMessage();
    obj.dataSetWriterId = reader.readUInt16();
    obj.actionTargetId = reader.readUInt16();
    obj.dataSetWriterName = reader.readString();
    obj.writerGroupName = reader.readString();
    obj.metaDataVersion = decodeConfigurationVersionDataType(reader, decoder);
    obj.minorVersion = reader.readUInt32();
    obj.timestamp = reader.readDateTime();
    obj.status = reader.readStatusCode();
    obj.messageType = reader.readString();
    obj.requestId = reader.readUInt16();
    obj.actionState = reader.readUInt32() as ActionStateEnum;
    obj.payload = reader.readExtensionObject(decoder);
    return obj;
};

export function decodeAliasNameDataType(reader: IReader, decoder: Decoder): AliasNameDataType {
    const obj = new AliasNameDataType();
    obj.aliasName = reader.readQualifiedName();
    obj.referencedNodes = reader.readArray((d: IReader) => d.readExpandedNodeId())!;
    return obj;
};

export function decodeUserManagementDataType(reader: IReader, decoder: Decoder): UserManagementDataType {
    const obj = new UserManagementDataType();
    obj.userName = reader.readString();
    obj.userConfiguration = reader.readUInt32();
    obj.description = reader.readString();
    return obj;
};

export function decodePriorityMappingEntryType(reader: IReader, decoder: Decoder): PriorityMappingEntryType {
    const obj = new PriorityMappingEntryType();
    obj.mappingUri = reader.readString();
    obj.priorityLabel = reader.readString();
    obj.priorityValue_PCP = reader.readByte();
    obj.priorityValue_DSCP = reader.readUInt32();
    return obj;
};

export function decodeLldpManagementAddressTxPortType(reader: IReader, decoder: Decoder): LldpManagementAddressTxPortType {
    const obj = new LldpManagementAddressTxPortType();
    obj.addressSubtype = reader.readUInt32();
    obj.manAddress = reader.readString();
    obj.txEnable = reader.readBoolean();
    obj.addrLen = reader.readUInt32();
    obj.ifSubtype = reader.readUInt32() as ManAddrIfSubtypeEnum;
    obj.ifId = reader.readUInt32();
    return obj;
};

export function decodeLldpManagementAddressType(reader: IReader, decoder: Decoder): LldpManagementAddressType {
    const obj = new LldpManagementAddressType();
    obj.addressSubtype = reader.readUInt32();
    obj.address = reader.readString();
    obj.ifSubtype = reader.readUInt32() as ManAddrIfSubtypeEnum;
    obj.ifId = reader.readUInt32();
    return obj;
};

export function decodeLldpTlvType(reader: IReader, decoder: Decoder): LldpTlvType {
    const obj = new LldpTlvType();
    obj.tlvType = reader.readUInt32();
    obj.tlvInfo = reader.readByteString();
    return obj;
};

export function decodeReferenceDescriptionDataType(reader: IReader, decoder: Decoder): ReferenceDescriptionDataType {
    const obj = new ReferenceDescriptionDataType();
    obj.sourceNode = reader.readNodeId();
    obj.referenceType = reader.readNodeId();
    obj.isForward = reader.readBoolean();
    obj.targetNode = reader.readExpandedNodeId();
    return obj;
};

export function decodeReferenceListEntryDataType(reader: IReader, decoder: Decoder): ReferenceListEntryDataType {
    const obj = new ReferenceListEntryDataType();
    obj.referenceType = reader.readNodeId();
    obj.isForward = reader.readBoolean();
    obj.targetNode = reader.readExpandedNodeId();
    return obj;
};

export function decodeLogRecord(reader: IReader, decoder: Decoder): LogRecord {
    const obj = new LogRecord();
    const encodingMask = reader.readUInt32();
    obj.time = reader.readDateTime();
    obj.severity = reader.readUInt16();
    if (encodingMask & (1 << 0)) { obj.eventType = reader.readNodeId(); } // optional
    if (encodingMask & (1 << 1)) { obj.sourceNode = reader.readNodeId(); } // optional
    if (encodingMask & (1 << 2)) { obj.sourceName = reader.readString(); } // optional
    obj.message = reader.readLocalizedText();
    if (encodingMask & (1 << 3)) { obj.traceContext = decodeTraceContextDataType(reader, decoder); } // optional
    if (encodingMask & (1 << 4)) { obj.additionalData = reader.readArray((d: IReader) => decodeNameValuePair(d, decoder)); } // optional
    return obj;
};

export function decodeLogRecordsDataType(reader: IReader, decoder: Decoder): LogRecordsDataType {
    const obj = new LogRecordsDataType();
    obj.logRecordArray = reader.readArray((d: IReader) => decodeLogRecord(d, decoder))!;
    return obj;
};

export function decodeSpanContextDataType(reader: IReader, decoder: Decoder): SpanContextDataType {
    const obj = new SpanContextDataType();
    obj.traceId = reader.readGuid();
    obj.spanId = reader.readUInt64();
    return obj;
};

export function decodeTraceContextDataType(reader: IReader, decoder: Decoder): TraceContextDataType {
    const obj = new TraceContextDataType();
    Object.assign(obj, decodeSpanContextDataType(reader, decoder)); // decode base class
    obj.parentSpanId = reader.readUInt64();
    obj.parentIdentifier = reader.readString();
    return obj;
};

export function decodeNameValuePair(reader: IReader, decoder: Decoder): NameValuePair {
    const obj = new NameValuePair();
    obj.name = reader.readString();
    obj.value = reader.readVariant(decoder);
    return obj;
};

export function decodeRolePermissionType(reader: IReader, decoder: Decoder): RolePermissionType {
    const obj = new RolePermissionType();
    obj.roleId = reader.readNodeId();
    obj.permissions = reader.readUInt32();
    return obj;
};

export function decodeDataTypeDefinition(reader: IReader, decoder: Decoder): DataTypeDefinition {
    const obj = new DataTypeDefinition();
    return obj;
};

export function decodeStructureField(reader: IReader, decoder: Decoder): StructureField {
    const obj = new StructureField();
    obj.name = reader.readString();
    obj.description = reader.readLocalizedText();
    obj.dataType = reader.readNodeId();
    obj.valueRank = reader.readInt32();
    obj.arrayDimensions = reader.readArray((d: IReader) => d.readUInt32())!;
    obj.maxStringLength = reader.readUInt32();
    obj.isOptional = reader.readBoolean();
    return obj;
};

export function decodeStructureDefinition(reader: IReader, decoder: Decoder): StructureDefinition {
    const obj = new StructureDefinition();
    Object.assign(obj, decodeDataTypeDefinition(reader, decoder)); // decode base class
    obj.defaultEncodingId = reader.readNodeId();
    obj.baseDataType = reader.readNodeId();
    obj.structureType = reader.readUInt32() as StructureTypeEnum;
    obj.fields = reader.readArray((d: IReader) => decodeStructureField(d, decoder))!;
    return obj;
};

export function decodeEnumDefinition(reader: IReader, decoder: Decoder): EnumDefinition {
    const obj = new EnumDefinition();
    Object.assign(obj, decodeDataTypeDefinition(reader, decoder)); // decode base class
    obj.fields = reader.readArray((d: IReader) => decodeEnumField(d, decoder))!;
    return obj;
};

export function decodeNode(reader: IReader, decoder: Decoder): Node {
    const obj = new Node();
    obj.nodeId = reader.readNodeId();
    obj.nodeClass = reader.readUInt32() as NodeClassEnum;
    obj.browseName = reader.readQualifiedName();
    obj.displayName = reader.readLocalizedText();
    obj.description = reader.readLocalizedText();
    obj.writeMask = reader.readUInt32();
    obj.userWriteMask = reader.readUInt32();
    obj.rolePermissions = reader.readArray((d: IReader) => decodeRolePermissionType(d, decoder))!;
    obj.userRolePermissions = reader.readArray((d: IReader) => decodeRolePermissionType(d, decoder))!;
    obj.accessRestrictions = reader.readUInt16();
    obj.references = reader.readArray((d: IReader) => decodeReferenceNode(d, decoder))!;
    return obj;
};

export function decodeInstanceNode(reader: IReader, decoder: Decoder): InstanceNode {
    const obj = new InstanceNode();
    Object.assign(obj, decodeNode(reader, decoder)); // decode base class
    return obj;
};

export function decodeTypeNode(reader: IReader, decoder: Decoder): TypeNode {
    const obj = new TypeNode();
    Object.assign(obj, decodeNode(reader, decoder)); // decode base class
    return obj;
};

export function decodeObjectNode(reader: IReader, decoder: Decoder): ObjectNode {
    const obj = new ObjectNode();
    Object.assign(obj, decodeInstanceNode(reader, decoder)); // decode base class
    obj.eventNotifier = reader.readByte();
    return obj;
};

export function decodeObjectTypeNode(reader: IReader, decoder: Decoder): ObjectTypeNode {
    const obj = new ObjectTypeNode();
    Object.assign(obj, decodeTypeNode(reader, decoder)); // decode base class
    obj.isAbstract = reader.readBoolean();
    return obj;
};

export function decodeVariableNode(reader: IReader, decoder: Decoder): VariableNode {
    const obj = new VariableNode();
    Object.assign(obj, decodeInstanceNode(reader, decoder)); // decode base class
    obj.value = reader.readVariant(decoder);
    obj.dataType = reader.readNodeId();
    obj.valueRank = reader.readInt32();
    obj.arrayDimensions = reader.readArray((d: IReader) => d.readUInt32())!;
    obj.accessLevel = reader.readByte();
    obj.userAccessLevel = reader.readByte();
    obj.minimumSamplingInterval = reader.readDouble();
    obj.historizing = reader.readBoolean();
    obj.accessLevelEx = reader.readUInt32();
    return obj;
};

export function decodeVariableTypeNode(reader: IReader, decoder: Decoder): VariableTypeNode {
    const obj = new VariableTypeNode();
    Object.assign(obj, decodeTypeNode(reader, decoder)); // decode base class
    obj.value = reader.readVariant(decoder);
    obj.dataType = reader.readNodeId();
    obj.valueRank = reader.readInt32();
    obj.arrayDimensions = reader.readArray((d: IReader) => d.readUInt32())!;
    obj.isAbstract = reader.readBoolean();
    return obj;
};

export function decodeReferenceTypeNode(reader: IReader, decoder: Decoder): ReferenceTypeNode {
    const obj = new ReferenceTypeNode();
    Object.assign(obj, decodeTypeNode(reader, decoder)); // decode base class
    obj.isAbstract = reader.readBoolean();
    obj.symmetric = reader.readBoolean();
    obj.inverseName = reader.readLocalizedText();
    return obj;
};

export function decodeMethodNode(reader: IReader, decoder: Decoder): MethodNode {
    const obj = new MethodNode();
    Object.assign(obj, decodeInstanceNode(reader, decoder)); // decode base class
    obj.executable = reader.readBoolean();
    obj.userExecutable = reader.readBoolean();
    return obj;
};

export function decodeViewNode(reader: IReader, decoder: Decoder): ViewNode {
    const obj = new ViewNode();
    Object.assign(obj, decodeInstanceNode(reader, decoder)); // decode base class
    obj.containsNoLoops = reader.readBoolean();
    obj.eventNotifier = reader.readByte();
    return obj;
};

export function decodeDataTypeNode(reader: IReader, decoder: Decoder): DataTypeNode {
    const obj = new DataTypeNode();
    Object.assign(obj, decodeTypeNode(reader, decoder)); // decode base class
    obj.isAbstract = reader.readBoolean();
    obj.dataTypeDefinition = reader.readExtensionObject(decoder);
    return obj;
};

export function decodeReferenceNode(reader: IReader, decoder: Decoder): ReferenceNode {
    const obj = new ReferenceNode();
    obj.referenceTypeId = reader.readNodeId();
    obj.isInverse = reader.readBoolean();
    obj.targetId = reader.readExpandedNodeId();
    return obj;
};

export function decodeArgument(reader: IReader, decoder: Decoder): Argument {
    const obj = new Argument();
    obj.name = reader.readString();
    obj.dataType = reader.readNodeId();
    obj.valueRank = reader.readInt32();
    obj.arrayDimensions = reader.readArray((d: IReader) => d.readUInt32())!;
    obj.description = reader.readLocalizedText();
    return obj;
};

export function decodeEnumValueType(reader: IReader, decoder: Decoder): EnumValueType {
    const obj = new EnumValueType();
    obj.value = reader.readInt64();
    obj.displayName = reader.readLocalizedText();
    obj.description = reader.readLocalizedText();
    return obj;
};

export function decodeEnumField(reader: IReader, decoder: Decoder): EnumField {
    const obj = new EnumField();
    Object.assign(obj, decodeEnumValueType(reader, decoder)); // decode base class
    obj.name = reader.readString();
    return obj;
};

export function decodeOptionSet(reader: IReader, decoder: Decoder): OptionSet {
    const obj = new OptionSet();
    obj.value = reader.readByteString();
    obj.validBits = reader.readByteString();
    return obj;
};

export function decodeTimeZoneDataType(reader: IReader, decoder: Decoder): TimeZoneDataType {
    const obj = new TimeZoneDataType();
    obj.offset = reader.readInt16();
    obj.daylightSavingInOffset = reader.readBoolean();
    return obj;
};

export function decodeApplicationDescription(reader: IReader, decoder: Decoder): ApplicationDescription {
    const obj = new ApplicationDescription();
    obj.applicationUri = reader.readString();
    obj.productUri = reader.readString();
    obj.applicationName = reader.readLocalizedText();
    obj.applicationType = reader.readUInt32() as ApplicationTypeEnum;
    obj.gatewayServerUri = reader.readString();
    obj.discoveryProfileUri = reader.readString();
    obj.discoveryUrls = reader.readArray((d: IReader) => d.readString())!;
    return obj;
};

export function decodeRequestHeader(reader: IReader, decoder: Decoder): RequestHeader {
    const obj = new RequestHeader();
    obj.authenticationToken = reader.readNodeId();
    obj.timestamp = reader.readDateTime();
    obj.requestHandle = reader.readUInt32();
    obj.returnDiagnostics = reader.readUInt32();
    obj.auditEntryId = reader.readString();
    obj.timeoutHint = reader.readUInt32();
    obj.additionalHeader = reader.readExtensionObject(decoder);
    return obj;
};

export function decodeResponseHeader(reader: IReader, decoder: Decoder): ResponseHeader {
    const obj = new ResponseHeader();
    obj.timestamp = reader.readDateTime();
    obj.requestHandle = reader.readUInt32();
    obj.serviceResult = reader.readStatusCode();
    obj.serviceDiagnostics = reader.readDiagnosticInfo();
    obj.stringTable = reader.readArray((d: IReader) => d.readString())!;
    obj.additionalHeader = reader.readExtensionObject(decoder);
    return obj;
};

export function decodeServiceFault(reader: IReader, decoder: Decoder): ServiceFault {
    const obj = new ServiceFault();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    return obj;
};

export function decodeSessionlessInvokeRequestType(reader: IReader, decoder: Decoder): SessionlessInvokeRequestType {
    const obj = new SessionlessInvokeRequestType();
    obj.urisVersion = reader.readUInt32();
    obj.namespaceUris = reader.readArray((d: IReader) => d.readString())!;
    obj.serverUris = reader.readArray((d: IReader) => d.readString())!;
    obj.localeIds = reader.readArray((d: IReader) => d.readString())!;
    obj.serviceId = reader.readUInt32();
    return obj;
};

export function decodeSessionlessInvokeResponseType(reader: IReader, decoder: Decoder): SessionlessInvokeResponseType {
    const obj = new SessionlessInvokeResponseType();
    obj.namespaceUris = reader.readArray((d: IReader) => d.readString())!;
    obj.serverUris = reader.readArray((d: IReader) => d.readString())!;
    obj.serviceId = reader.readUInt32();
    return obj;
};

export function decodeFindServersRequest(reader: IReader, decoder: Decoder): FindServersRequest {
    const obj = new FindServersRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.endpointUrl = reader.readString();
    obj.localeIds = reader.readArray((d: IReader) => d.readString())!;
    obj.serverUris = reader.readArray((d: IReader) => d.readString())!;
    return obj;
};

export function decodeFindServersResponse(reader: IReader, decoder: Decoder): FindServersResponse {
    const obj = new FindServersResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.servers = reader.readArray((d: IReader) => decodeApplicationDescription(d, decoder))!;
    return obj;
};

export function decodeServerOnNetwork(reader: IReader, decoder: Decoder): ServerOnNetwork {
    const obj = new ServerOnNetwork();
    obj.recordId = reader.readUInt32();
    obj.serverName = reader.readString();
    obj.discoveryUrl = reader.readString();
    obj.serverCapabilities = reader.readArray((d: IReader) => d.readString())!;
    return obj;
};

export function decodeFindServersOnNetworkRequest(reader: IReader, decoder: Decoder): FindServersOnNetworkRequest {
    const obj = new FindServersOnNetworkRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.startingRecordId = reader.readUInt32();
    obj.maxRecordsToReturn = reader.readUInt32();
    obj.serverCapabilityFilter = reader.readArray((d: IReader) => d.readString())!;
    return obj;
};

export function decodeFindServersOnNetworkResponse(reader: IReader, decoder: Decoder): FindServersOnNetworkResponse {
    const obj = new FindServersOnNetworkResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.lastCounterResetTime = reader.readDateTime();
    obj.servers = reader.readArray((d: IReader) => decodeServerOnNetwork(d, decoder))!;
    return obj;
};

export function decodeUserTokenPolicy(reader: IReader, decoder: Decoder): UserTokenPolicy {
    const obj = new UserTokenPolicy();
    obj.policyId = reader.readString();
    obj.tokenType = reader.readUInt32() as UserTokenTypeEnum;
    obj.issuedTokenType = reader.readString();
    obj.issuerEndpointUrl = reader.readString();
    obj.securityPolicyUri = reader.readString();
    return obj;
};

export function decodeEndpointDescription(reader: IReader, decoder: Decoder): EndpointDescription {
    const obj = new EndpointDescription();
    obj.endpointUrl = reader.readString();
    obj.server = decodeApplicationDescription(reader, decoder);
    obj.serverCertificate = reader.readByteString();
    obj.securityMode = reader.readUInt32() as MessageSecurityModeEnum;
    obj.securityPolicyUri = reader.readString();
    obj.userIdentityTokens = reader.readArray((d: IReader) => decodeUserTokenPolicy(d, decoder))!;
    obj.transportProfileUri = reader.readString();
    obj.securityLevel = reader.readByte();
    return obj;
};

export function decodeGetEndpointsRequest(reader: IReader, decoder: Decoder): GetEndpointsRequest {
    const obj = new GetEndpointsRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.endpointUrl = reader.readString();
    obj.localeIds = reader.readArray((d: IReader) => d.readString())!;
    obj.profileUris = reader.readArray((d: IReader) => d.readString())!;
    return obj;
};

export function decodeGetEndpointsResponse(reader: IReader, decoder: Decoder): GetEndpointsResponse {
    const obj = new GetEndpointsResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.endpoints = reader.readArray((d: IReader) => decodeEndpointDescription(d, decoder))!;
    return obj;
};

export function decodeRegisteredServer(reader: IReader, decoder: Decoder): RegisteredServer {
    const obj = new RegisteredServer();
    obj.serverUri = reader.readString();
    obj.productUri = reader.readString();
    obj.serverNames = reader.readArray((d: IReader) => d.readLocalizedText())!;
    obj.serverType = reader.readUInt32() as ApplicationTypeEnum;
    obj.gatewayServerUri = reader.readString();
    obj.discoveryUrls = reader.readArray((d: IReader) => d.readString())!;
    obj.semaphoreFilePath = reader.readString();
    obj.isOnline = reader.readBoolean();
    return obj;
};

export function decodeRegisterServerRequest(reader: IReader, decoder: Decoder): RegisterServerRequest {
    const obj = new RegisterServerRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.server = decodeRegisteredServer(reader, decoder);
    return obj;
};

export function decodeRegisterServerResponse(reader: IReader, decoder: Decoder): RegisterServerResponse {
    const obj = new RegisterServerResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    return obj;
};

export function decodeDiscoveryConfiguration(reader: IReader, decoder: Decoder): DiscoveryConfiguration {
    const obj = new DiscoveryConfiguration();
    return obj;
};

export function decodeMdnsDiscoveryConfiguration(reader: IReader, decoder: Decoder): MdnsDiscoveryConfiguration {
    const obj = new MdnsDiscoveryConfiguration();
    Object.assign(obj, decodeDiscoveryConfiguration(reader, decoder)); // decode base class
    obj.mdnsServerName = reader.readString();
    obj.serverCapabilities = reader.readArray((d: IReader) => d.readString())!;
    return obj;
};

export function decodeRegisterServer2Request(reader: IReader, decoder: Decoder): RegisterServer2Request {
    const obj = new RegisterServer2Request();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.server = decodeRegisteredServer(reader, decoder);
    obj.discoveryConfiguration = reader.readArray((d: IReader) => d.readExtensionObject(decoder))!;
    return obj;
};

export function decodeRegisterServer2Response(reader: IReader, decoder: Decoder): RegisterServer2Response {
    const obj = new RegisterServer2Response();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.configurationResults = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeChannelSecurityToken(reader: IReader, decoder: Decoder): ChannelSecurityToken {
    const obj = new ChannelSecurityToken();
    obj.channelId = reader.readUInt32();
    obj.tokenId = reader.readUInt32();
    obj.createdAt = reader.readDateTime();
    obj.revisedLifetime = reader.readUInt32();
    return obj;
};

export function decodeOpenSecureChannelRequest(reader: IReader, decoder: Decoder): OpenSecureChannelRequest {
    const obj = new OpenSecureChannelRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.clientProtocolVersion = reader.readUInt32();
    obj.requestType = reader.readUInt32() as SecurityTokenRequestTypeEnum;
    obj.securityMode = reader.readUInt32() as MessageSecurityModeEnum;
    obj.clientNonce = reader.readByteString();
    obj.requestedLifetime = reader.readUInt32();
    return obj;
};

export function decodeOpenSecureChannelResponse(reader: IReader, decoder: Decoder): OpenSecureChannelResponse {
    const obj = new OpenSecureChannelResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.serverProtocolVersion = reader.readUInt32();
    obj.securityToken = decodeChannelSecurityToken(reader, decoder);
    obj.serverNonce = reader.readByteString();
    return obj;
};

export function decodeCloseSecureChannelRequest(reader: IReader, decoder: Decoder): CloseSecureChannelRequest {
    const obj = new CloseSecureChannelRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    return obj;
};

export function decodeCloseSecureChannelResponse(reader: IReader, decoder: Decoder): CloseSecureChannelResponse {
    const obj = new CloseSecureChannelResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    return obj;
};

export function decodeSignedSoftwareCertificate(reader: IReader, decoder: Decoder): SignedSoftwareCertificate {
    const obj = new SignedSoftwareCertificate();
    obj.certificateData = reader.readByteString();
    obj.signature = reader.readByteString();
    return obj;
};

export function decodeSignatureData(reader: IReader, decoder: Decoder): SignatureData {
    const obj = new SignatureData();
    obj.algorithm = reader.readString();
    obj.signature = reader.readByteString();
    return obj;
};

export function decodeCreateSessionRequest(reader: IReader, decoder: Decoder): CreateSessionRequest {
    const obj = new CreateSessionRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.clientDescription = decodeApplicationDescription(reader, decoder);
    obj.serverUri = reader.readString();
    obj.endpointUrl = reader.readString();
    obj.sessionName = reader.readString();
    obj.clientNonce = reader.readByteString();
    obj.clientCertificate = reader.readByteString();
    obj.requestedSessionTimeout = reader.readDouble();
    obj.maxResponseMessageSize = reader.readUInt32();
    return obj;
};

export function decodeCreateSessionResponse(reader: IReader, decoder: Decoder): CreateSessionResponse {
    const obj = new CreateSessionResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.sessionId = reader.readNodeId();
    obj.authenticationToken = reader.readNodeId();
    obj.revisedSessionTimeout = reader.readDouble();
    obj.serverNonce = reader.readByteString();
    obj.serverCertificate = reader.readByteString();
    obj.serverEndpoints = reader.readArray((d: IReader) => decodeEndpointDescription(d, decoder))!;
    obj.serverSoftwareCertificates = reader.readArray((d: IReader) => decodeSignedSoftwareCertificate(d, decoder))!;
    obj.serverSignature = decodeSignatureData(reader, decoder);
    obj.maxRequestMessageSize = reader.readUInt32();
    return obj;
};

export function decodeUserIdentityToken(reader: IReader, decoder: Decoder): UserIdentityToken {
    const obj = new UserIdentityToken();
    obj.policyId = reader.readString();
    return obj;
};

export function decodeAnonymousIdentityToken(reader: IReader, decoder: Decoder): AnonymousIdentityToken {
    const obj = new AnonymousIdentityToken();
    Object.assign(obj, decodeUserIdentityToken(reader, decoder)); // decode base class
    return obj;
};

export function decodeUserNameIdentityToken(reader: IReader, decoder: Decoder): UserNameIdentityToken {
    const obj = new UserNameIdentityToken();
    Object.assign(obj, decodeUserIdentityToken(reader, decoder)); // decode base class
    obj.userName = reader.readString();
    obj.password = reader.readByteString();
    obj.encryptionAlgorithm = reader.readString();
    return obj;
};

export function decodeX509IdentityToken(reader: IReader, decoder: Decoder): X509IdentityToken {
    const obj = new X509IdentityToken();
    Object.assign(obj, decodeUserIdentityToken(reader, decoder)); // decode base class
    obj.certificateData = reader.readByteString();
    return obj;
};

export function decodeIssuedIdentityToken(reader: IReader, decoder: Decoder): IssuedIdentityToken {
    const obj = new IssuedIdentityToken();
    Object.assign(obj, decodeUserIdentityToken(reader, decoder)); // decode base class
    obj.tokenData = reader.readByteString();
    obj.encryptionAlgorithm = reader.readString();
    return obj;
};

export function decodeActivateSessionRequest(reader: IReader, decoder: Decoder): ActivateSessionRequest {
    const obj = new ActivateSessionRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.clientSignature = decodeSignatureData(reader, decoder);
    obj.clientSoftwareCertificates = reader.readArray((d: IReader) => decodeSignedSoftwareCertificate(d, decoder))!;
    obj.localeIds = reader.readArray((d: IReader) => d.readString())!;
    obj.userIdentityToken = reader.readExtensionObject(decoder);
    obj.userTokenSignature = decodeSignatureData(reader, decoder);
    return obj;
};

export function decodeActivateSessionResponse(reader: IReader, decoder: Decoder): ActivateSessionResponse {
    const obj = new ActivateSessionResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.serverNonce = reader.readByteString();
    obj.results = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeCloseSessionRequest(reader: IReader, decoder: Decoder): CloseSessionRequest {
    const obj = new CloseSessionRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.deleteSubscriptions = reader.readBoolean();
    return obj;
};

export function decodeCloseSessionResponse(reader: IReader, decoder: Decoder): CloseSessionResponse {
    const obj = new CloseSessionResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    return obj;
};

export function decodeCancelRequest(reader: IReader, decoder: Decoder): CancelRequest {
    const obj = new CancelRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.requestHandle = reader.readUInt32();
    return obj;
};

export function decodeCancelResponse(reader: IReader, decoder: Decoder): CancelResponse {
    const obj = new CancelResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.cancelCount = reader.readUInt32();
    return obj;
};

export function decodeNodeAttributes(reader: IReader, decoder: Decoder): NodeAttributes {
    const obj = new NodeAttributes();
    obj.specifiedAttributes = reader.readUInt32();
    obj.displayName = reader.readLocalizedText();
    obj.description = reader.readLocalizedText();
    obj.writeMask = reader.readUInt32();
    obj.userWriteMask = reader.readUInt32();
    return obj;
};

export function decodeObjectAttributes(reader: IReader, decoder: Decoder): ObjectAttributes {
    const obj = new ObjectAttributes();
    Object.assign(obj, decodeNodeAttributes(reader, decoder)); // decode base class
    obj.eventNotifier = reader.readByte();
    return obj;
};

export function decodeVariableAttributes(reader: IReader, decoder: Decoder): VariableAttributes {
    const obj = new VariableAttributes();
    Object.assign(obj, decodeNodeAttributes(reader, decoder)); // decode base class
    obj.value = reader.readVariant(decoder);
    obj.dataType = reader.readNodeId();
    obj.valueRank = reader.readInt32();
    obj.arrayDimensions = reader.readArray((d: IReader) => d.readUInt32())!;
    obj.accessLevel = reader.readByte();
    obj.userAccessLevel = reader.readByte();
    obj.minimumSamplingInterval = reader.readDouble();
    obj.historizing = reader.readBoolean();
    return obj;
};

export function decodeMethodAttributes(reader: IReader, decoder: Decoder): MethodAttributes {
    const obj = new MethodAttributes();
    Object.assign(obj, decodeNodeAttributes(reader, decoder)); // decode base class
    obj.executable = reader.readBoolean();
    obj.userExecutable = reader.readBoolean();
    return obj;
};

export function decodeObjectTypeAttributes(reader: IReader, decoder: Decoder): ObjectTypeAttributes {
    const obj = new ObjectTypeAttributes();
    Object.assign(obj, decodeNodeAttributes(reader, decoder)); // decode base class
    obj.isAbstract = reader.readBoolean();
    return obj;
};

export function decodeVariableTypeAttributes(reader: IReader, decoder: Decoder): VariableTypeAttributes {
    const obj = new VariableTypeAttributes();
    Object.assign(obj, decodeNodeAttributes(reader, decoder)); // decode base class
    obj.value = reader.readVariant(decoder);
    obj.dataType = reader.readNodeId();
    obj.valueRank = reader.readInt32();
    obj.arrayDimensions = reader.readArray((d: IReader) => d.readUInt32())!;
    obj.isAbstract = reader.readBoolean();
    return obj;
};

export function decodeReferenceTypeAttributes(reader: IReader, decoder: Decoder): ReferenceTypeAttributes {
    const obj = new ReferenceTypeAttributes();
    Object.assign(obj, decodeNodeAttributes(reader, decoder)); // decode base class
    obj.isAbstract = reader.readBoolean();
    obj.symmetric = reader.readBoolean();
    obj.inverseName = reader.readLocalizedText();
    return obj;
};

export function decodeDataTypeAttributes(reader: IReader, decoder: Decoder): DataTypeAttributes {
    const obj = new DataTypeAttributes();
    Object.assign(obj, decodeNodeAttributes(reader, decoder)); // decode base class
    obj.isAbstract = reader.readBoolean();
    return obj;
};

export function decodeViewAttributes(reader: IReader, decoder: Decoder): ViewAttributes {
    const obj = new ViewAttributes();
    Object.assign(obj, decodeNodeAttributes(reader, decoder)); // decode base class
    obj.containsNoLoops = reader.readBoolean();
    obj.eventNotifier = reader.readByte();
    return obj;
};

export function decodeGenericAttributeValue(reader: IReader, decoder: Decoder): GenericAttributeValue {
    const obj = new GenericAttributeValue();
    obj.attributeId = reader.readUInt32();
    obj.value = reader.readVariant(decoder);
    return obj;
};

export function decodeGenericAttributes(reader: IReader, decoder: Decoder): GenericAttributes {
    const obj = new GenericAttributes();
    Object.assign(obj, decodeNodeAttributes(reader, decoder)); // decode base class
    obj.attributeValues = reader.readArray((d: IReader) => decodeGenericAttributeValue(d, decoder))!;
    return obj;
};

export function decodeAddNodesItem(reader: IReader, decoder: Decoder): AddNodesItem {
    const obj = new AddNodesItem();
    obj.parentNodeId = reader.readExpandedNodeId();
    obj.referenceTypeId = reader.readNodeId();
    obj.requestedNewNodeId = reader.readExpandedNodeId();
    obj.browseName = reader.readQualifiedName();
    obj.nodeClass = reader.readUInt32() as NodeClassEnum;
    obj.nodeAttributes = reader.readExtensionObject(decoder);
    obj.typeDefinition = reader.readExpandedNodeId();
    return obj;
};

export function decodeAddNodesResult(reader: IReader, decoder: Decoder): AddNodesResult {
    const obj = new AddNodesResult();
    obj.statusCode = reader.readStatusCode();
    obj.addedNodeId = reader.readNodeId();
    return obj;
};

export function decodeAddNodesRequest(reader: IReader, decoder: Decoder): AddNodesRequest {
    const obj = new AddNodesRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.nodesToAdd = reader.readArray((d: IReader) => decodeAddNodesItem(d, decoder))!;
    return obj;
};

export function decodeAddNodesResponse(reader: IReader, decoder: Decoder): AddNodesResponse {
    const obj = new AddNodesResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => decodeAddNodesResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeAddReferencesItem(reader: IReader, decoder: Decoder): AddReferencesItem {
    const obj = new AddReferencesItem();
    obj.sourceNodeId = reader.readNodeId();
    obj.referenceTypeId = reader.readNodeId();
    obj.isForward = reader.readBoolean();
    obj.targetServerUri = reader.readString();
    obj.targetNodeId = reader.readExpandedNodeId();
    obj.targetNodeClass = reader.readUInt32() as NodeClassEnum;
    return obj;
};

export function decodeAddReferencesRequest(reader: IReader, decoder: Decoder): AddReferencesRequest {
    const obj = new AddReferencesRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.referencesToAdd = reader.readArray((d: IReader) => decodeAddReferencesItem(d, decoder))!;
    return obj;
};

export function decodeAddReferencesResponse(reader: IReader, decoder: Decoder): AddReferencesResponse {
    const obj = new AddReferencesResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeDeleteNodesItem(reader: IReader, decoder: Decoder): DeleteNodesItem {
    const obj = new DeleteNodesItem();
    obj.nodeId = reader.readNodeId();
    obj.deleteTargetReferences = reader.readBoolean();
    return obj;
};

export function decodeDeleteNodesRequest(reader: IReader, decoder: Decoder): DeleteNodesRequest {
    const obj = new DeleteNodesRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.nodesToDelete = reader.readArray((d: IReader) => decodeDeleteNodesItem(d, decoder))!;
    return obj;
};

export function decodeDeleteNodesResponse(reader: IReader, decoder: Decoder): DeleteNodesResponse {
    const obj = new DeleteNodesResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeDeleteReferencesItem(reader: IReader, decoder: Decoder): DeleteReferencesItem {
    const obj = new DeleteReferencesItem();
    obj.sourceNodeId = reader.readNodeId();
    obj.referenceTypeId = reader.readNodeId();
    obj.isForward = reader.readBoolean();
    obj.targetNodeId = reader.readExpandedNodeId();
    obj.deleteBidirectional = reader.readBoolean();
    return obj;
};

export function decodeDeleteReferencesRequest(reader: IReader, decoder: Decoder): DeleteReferencesRequest {
    const obj = new DeleteReferencesRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.referencesToDelete = reader.readArray((d: IReader) => decodeDeleteReferencesItem(d, decoder))!;
    return obj;
};

export function decodeDeleteReferencesResponse(reader: IReader, decoder: Decoder): DeleteReferencesResponse {
    const obj = new DeleteReferencesResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeViewDescription(reader: IReader, decoder: Decoder): ViewDescription {
    const obj = new ViewDescription();
    obj.viewId = reader.readNodeId();
    obj.timestamp = reader.readDateTime();
    obj.viewVersion = reader.readUInt32();
    return obj;
};

export function decodeBrowseDescription(reader: IReader, decoder: Decoder): BrowseDescription {
    const obj = new BrowseDescription();
    obj.nodeId = reader.readNodeId();
    obj.browseDirection = reader.readUInt32() as BrowseDirectionEnum;
    obj.referenceTypeId = reader.readNodeId();
    obj.includeSubtypes = reader.readBoolean();
    obj.nodeClassMask = reader.readUInt32();
    obj.resultMask = reader.readUInt32();
    return obj;
};

export function decodeReferenceDescription(reader: IReader, decoder: Decoder): ReferenceDescription {
    const obj = new ReferenceDescription();
    obj.referenceTypeId = reader.readNodeId();
    obj.isForward = reader.readBoolean();
    obj.nodeId = reader.readExpandedNodeId();
    obj.browseName = reader.readQualifiedName();
    obj.displayName = reader.readLocalizedText();
    obj.nodeClass = reader.readUInt32() as NodeClassEnum;
    obj.typeDefinition = reader.readExpandedNodeId();
    return obj;
};

export function decodeBrowseResult(reader: IReader, decoder: Decoder): BrowseResult {
    const obj = new BrowseResult();
    obj.statusCode = reader.readStatusCode();
    obj.continuationPoint = reader.readByteString();
    obj.references = reader.readArray((d: IReader) => decodeReferenceDescription(d, decoder))!;
    return obj;
};

export function decodeBrowseRequest(reader: IReader, decoder: Decoder): BrowseRequest {
    const obj = new BrowseRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.view = decodeViewDescription(reader, decoder);
    obj.requestedMaxReferencesPerNode = reader.readUInt32();
    obj.nodesToBrowse = reader.readArray((d: IReader) => decodeBrowseDescription(d, decoder))!;
    return obj;
};

export function decodeBrowseResponse(reader: IReader, decoder: Decoder): BrowseResponse {
    const obj = new BrowseResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => decodeBrowseResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeBrowseNextRequest(reader: IReader, decoder: Decoder): BrowseNextRequest {
    const obj = new BrowseNextRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.releaseContinuationPoints = reader.readBoolean();
    obj.continuationPoints = reader.readArray((d: IReader) => d.readByteString())!;
    return obj;
};

export function decodeBrowseNextResponse(reader: IReader, decoder: Decoder): BrowseNextResponse {
    const obj = new BrowseNextResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => decodeBrowseResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeRelativePathElement(reader: IReader, decoder: Decoder): RelativePathElement {
    const obj = new RelativePathElement();
    obj.referenceTypeId = reader.readNodeId();
    obj.isInverse = reader.readBoolean();
    obj.includeSubtypes = reader.readBoolean();
    obj.targetName = reader.readQualifiedName();
    return obj;
};

export function decodeRelativePath(reader: IReader, decoder: Decoder): RelativePath {
    const obj = new RelativePath();
    obj.elements = reader.readArray((d: IReader) => decodeRelativePathElement(d, decoder))!;
    return obj;
};

export function decodeBrowsePath(reader: IReader, decoder: Decoder): BrowsePath {
    const obj = new BrowsePath();
    obj.startingNode = reader.readNodeId();
    obj.relativePath = decodeRelativePath(reader, decoder);
    return obj;
};

export function decodeBrowsePathTarget(reader: IReader, decoder: Decoder): BrowsePathTarget {
    const obj = new BrowsePathTarget();
    obj.targetId = reader.readExpandedNodeId();
    obj.remainingPathIndex = reader.readUInt32();
    return obj;
};

export function decodeBrowsePathResult(reader: IReader, decoder: Decoder): BrowsePathResult {
    const obj = new BrowsePathResult();
    obj.statusCode = reader.readStatusCode();
    obj.targets = reader.readArray((d: IReader) => decodeBrowsePathTarget(d, decoder))!;
    return obj;
};

export function decodeTranslateBrowsePathsToNodeIdsRequest(reader: IReader, decoder: Decoder): TranslateBrowsePathsToNodeIdsRequest {
    const obj = new TranslateBrowsePathsToNodeIdsRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.browsePaths = reader.readArray((d: IReader) => decodeBrowsePath(d, decoder))!;
    return obj;
};

export function decodeTranslateBrowsePathsToNodeIdsResponse(reader: IReader, decoder: Decoder): TranslateBrowsePathsToNodeIdsResponse {
    const obj = new TranslateBrowsePathsToNodeIdsResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => decodeBrowsePathResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeRegisterNodesRequest(reader: IReader, decoder: Decoder): RegisterNodesRequest {
    const obj = new RegisterNodesRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.nodesToRegister = reader.readArray((d: IReader) => d.readNodeId())!;
    return obj;
};

export function decodeRegisterNodesResponse(reader: IReader, decoder: Decoder): RegisterNodesResponse {
    const obj = new RegisterNodesResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.registeredNodeIds = reader.readArray((d: IReader) => d.readNodeId())!;
    return obj;
};

export function decodeUnregisterNodesRequest(reader: IReader, decoder: Decoder): UnregisterNodesRequest {
    const obj = new UnregisterNodesRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.nodesToUnregister = reader.readArray((d: IReader) => d.readNodeId())!;
    return obj;
};

export function decodeUnregisterNodesResponse(reader: IReader, decoder: Decoder): UnregisterNodesResponse {
    const obj = new UnregisterNodesResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    return obj;
};

export function decodeEndpointConfiguration(reader: IReader, decoder: Decoder): EndpointConfiguration {
    const obj = new EndpointConfiguration();
    obj.operationTimeout = reader.readInt32();
    obj.useBinaryEncoding = reader.readBoolean();
    obj.maxStringLength = reader.readInt32();
    obj.maxByteStringLength = reader.readInt32();
    obj.maxArrayLength = reader.readInt32();
    obj.maxMessageSize = reader.readInt32();
    obj.maxBufferSize = reader.readInt32();
    obj.channelLifetime = reader.readInt32();
    obj.securityTokenLifetime = reader.readInt32();
    return obj;
};

export function decodeQueryDataDescription(reader: IReader, decoder: Decoder): QueryDataDescription {
    const obj = new QueryDataDescription();
    obj.relativePath = decodeRelativePath(reader, decoder);
    obj.attributeId = reader.readUInt32();
    obj.indexRange = reader.readString();
    return obj;
};

export function decodeNodeTypeDescription(reader: IReader, decoder: Decoder): NodeTypeDescription {
    const obj = new NodeTypeDescription();
    obj.typeDefinitionNode = reader.readExpandedNodeId();
    obj.includeSubTypes = reader.readBoolean();
    obj.dataToReturn = reader.readArray((d: IReader) => decodeQueryDataDescription(d, decoder))!;
    return obj;
};

export function decodeQueryDataSet(reader: IReader, decoder: Decoder): QueryDataSet {
    const obj = new QueryDataSet();
    obj.nodeId = reader.readExpandedNodeId();
    obj.typeDefinitionNode = reader.readExpandedNodeId();
    obj.values = reader.readArray((d: IReader) => d.readVariant(decoder))!;
    return obj;
};

export function decodeNodeReference(reader: IReader, decoder: Decoder): NodeReference {
    const obj = new NodeReference();
    obj.nodeId = reader.readNodeId();
    obj.referenceTypeId = reader.readNodeId();
    obj.isForward = reader.readBoolean();
    obj.referencedNodeIds = reader.readArray((d: IReader) => d.readNodeId())!;
    return obj;
};

export function decodeContentFilterElement(reader: IReader, decoder: Decoder): ContentFilterElement {
    const obj = new ContentFilterElement();
    obj.filterOperator = reader.readUInt32() as FilterOperatorEnum;
    obj.filterOperands = reader.readArray((d: IReader) => d.readExtensionObject(decoder))!;
    return obj;
};

export function decodeContentFilter(reader: IReader, decoder: Decoder): ContentFilter {
    const obj = new ContentFilter();
    obj.elements = reader.readArray((d: IReader) => decodeContentFilterElement(d, decoder))!;
    return obj;
};

export function decodeFilterOperand(reader: IReader, decoder: Decoder): FilterOperand {
    const obj = new FilterOperand();
    return obj;
};

export function decodeElementOperand(reader: IReader, decoder: Decoder): ElementOperand {
    const obj = new ElementOperand();
    Object.assign(obj, decodeFilterOperand(reader, decoder)); // decode base class
    obj.index = reader.readUInt32();
    return obj;
};

export function decodeLiteralOperand(reader: IReader, decoder: Decoder): LiteralOperand {
    const obj = new LiteralOperand();
    Object.assign(obj, decodeFilterOperand(reader, decoder)); // decode base class
    obj.value = reader.readVariant(decoder);
    return obj;
};

export function decodeAttributeOperand(reader: IReader, decoder: Decoder): AttributeOperand {
    const obj = new AttributeOperand();
    Object.assign(obj, decodeFilterOperand(reader, decoder)); // decode base class
    obj.nodeId = reader.readNodeId();
    obj.alias = reader.readString();
    obj.browsePath = decodeRelativePath(reader, decoder);
    obj.attributeId = reader.readUInt32();
    obj.indexRange = reader.readString();
    return obj;
};

export function decodeSimpleAttributeOperand(reader: IReader, decoder: Decoder): SimpleAttributeOperand {
    const obj = new SimpleAttributeOperand();
    Object.assign(obj, decodeFilterOperand(reader, decoder)); // decode base class
    obj.typeDefinitionId = reader.readNodeId();
    obj.browsePath = reader.readArray((d: IReader) => d.readQualifiedName())!;
    obj.attributeId = reader.readUInt32();
    obj.indexRange = reader.readString();
    return obj;
};

export function decodeContentFilterElementResult(reader: IReader, decoder: Decoder): ContentFilterElementResult {
    const obj = new ContentFilterElementResult();
    obj.statusCode = reader.readStatusCode();
    obj.operandStatusCodes = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.operandDiagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeContentFilterResult(reader: IReader, decoder: Decoder): ContentFilterResult {
    const obj = new ContentFilterResult();
    obj.elementResults = reader.readArray((d: IReader) => decodeContentFilterElementResult(d, decoder))!;
    obj.elementDiagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeParsingResult(reader: IReader, decoder: Decoder): ParsingResult {
    const obj = new ParsingResult();
    obj.statusCode = reader.readStatusCode();
    obj.dataStatusCodes = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.dataDiagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeQueryFirstRequest(reader: IReader, decoder: Decoder): QueryFirstRequest {
    const obj = new QueryFirstRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.view = decodeViewDescription(reader, decoder);
    obj.nodeTypes = reader.readArray((d: IReader) => decodeNodeTypeDescription(d, decoder))!;
    obj.filter = decodeContentFilter(reader, decoder);
    obj.maxDataSetsToReturn = reader.readUInt32();
    obj.maxReferencesToReturn = reader.readUInt32();
    return obj;
};

export function decodeQueryFirstResponse(reader: IReader, decoder: Decoder): QueryFirstResponse {
    const obj = new QueryFirstResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.queryDataSets = reader.readArray((d: IReader) => decodeQueryDataSet(d, decoder))!;
    obj.continuationPoint = reader.readByteString();
    obj.parsingResults = reader.readArray((d: IReader) => decodeParsingResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    obj.filterResult = decodeContentFilterResult(reader, decoder);
    return obj;
};

export function decodeQueryNextRequest(reader: IReader, decoder: Decoder): QueryNextRequest {
    const obj = new QueryNextRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.releaseContinuationPoint = reader.readBoolean();
    obj.continuationPoint = reader.readByteString();
    return obj;
};

export function decodeQueryNextResponse(reader: IReader, decoder: Decoder): QueryNextResponse {
    const obj = new QueryNextResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.queryDataSets = reader.readArray((d: IReader) => decodeQueryDataSet(d, decoder))!;
    obj.revisedContinuationPoint = reader.readByteString();
    return obj;
};

export function decodeReadValueId(reader: IReader, decoder: Decoder): ReadValueId {
    const obj = new ReadValueId();
    obj.nodeId = reader.readNodeId();
    obj.attributeId = reader.readUInt32();
    obj.indexRange = reader.readString();
    obj.dataEncoding = reader.readQualifiedName();
    return obj;
};

export function decodeReadRequest(reader: IReader, decoder: Decoder): ReadRequest {
    const obj = new ReadRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.maxAge = reader.readDouble();
    obj.timestampsToReturn = reader.readUInt32() as TimestampsToReturnEnum;
    obj.nodesToRead = reader.readArray((d: IReader) => decodeReadValueId(d, decoder))!;
    return obj;
};

export function decodeReadResponse(reader: IReader, decoder: Decoder): ReadResponse {
    const obj = new ReadResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => d.readDataValue(decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeHistoryReadValueId(reader: IReader, decoder: Decoder): HistoryReadValueId {
    const obj = new HistoryReadValueId();
    obj.nodeId = reader.readNodeId();
    obj.indexRange = reader.readString();
    obj.dataEncoding = reader.readQualifiedName();
    obj.continuationPoint = reader.readByteString();
    return obj;
};

export function decodeHistoryReadResult(reader: IReader, decoder: Decoder): HistoryReadResult {
    const obj = new HistoryReadResult();
    obj.statusCode = reader.readStatusCode();
    obj.continuationPoint = reader.readByteString();
    obj.historyData = reader.readExtensionObject(decoder);
    return obj;
};

export function decodeHistoryReadDetails(reader: IReader, decoder: Decoder): HistoryReadDetails {
    const obj = new HistoryReadDetails();
    return obj;
};

export function decodeReadEventDetails(reader: IReader, decoder: Decoder): ReadEventDetails {
    const obj = new ReadEventDetails();
    Object.assign(obj, decodeHistoryReadDetails(reader, decoder)); // decode base class
    obj.numValuesPerNode = reader.readUInt32();
    obj.startTime = reader.readDateTime();
    obj.endTime = reader.readDateTime();
    obj.filter = decodeEventFilter(reader, decoder);
    return obj;
};

export function decodeReadEventDetails2(reader: IReader, decoder: Decoder): ReadEventDetails2 {
    const obj = new ReadEventDetails2();
    Object.assign(obj, decodeReadEventDetails(reader, decoder)); // decode base class
    obj.readModified = reader.readBoolean();
    return obj;
};

export function decodeSortRuleElement(reader: IReader, decoder: Decoder): SortRuleElement {
    const obj = new SortRuleElement();
    obj.sortOrder = reader.readUInt32() as SortOrderTypeEnum;
    obj.eventField = decodeSimpleAttributeOperand(reader, decoder);
    return obj;
};

export function decodeReadEventDetailsSorted(reader: IReader, decoder: Decoder): ReadEventDetailsSorted {
    const obj = new ReadEventDetailsSorted();
    Object.assign(obj, decodeReadEventDetails(reader, decoder)); // decode base class
    obj.sortClause = reader.readArray((d: IReader) => decodeSortRuleElement(d, decoder))!;
    return obj;
};

export function decodeReadRawModifiedDetails(reader: IReader, decoder: Decoder): ReadRawModifiedDetails {
    const obj = new ReadRawModifiedDetails();
    Object.assign(obj, decodeHistoryReadDetails(reader, decoder)); // decode base class
    obj.isReadModified = reader.readBoolean();
    obj.startTime = reader.readDateTime();
    obj.endTime = reader.readDateTime();
    obj.numValuesPerNode = reader.readUInt32();
    obj.returnBounds = reader.readBoolean();
    return obj;
};

export function decodeReadProcessedDetails(reader: IReader, decoder: Decoder): ReadProcessedDetails {
    const obj = new ReadProcessedDetails();
    Object.assign(obj, decodeHistoryReadDetails(reader, decoder)); // decode base class
    obj.startTime = reader.readDateTime();
    obj.endTime = reader.readDateTime();
    obj.processingInterval = reader.readDouble();
    obj.aggregateType = reader.readArray((d: IReader) => d.readNodeId())!;
    obj.aggregateConfiguration = decodeAggregateConfiguration(reader, decoder);
    return obj;
};

export function decodeReadAtTimeDetails(reader: IReader, decoder: Decoder): ReadAtTimeDetails {
    const obj = new ReadAtTimeDetails();
    Object.assign(obj, decodeHistoryReadDetails(reader, decoder)); // decode base class
    obj.reqTimes = reader.readArray((d: IReader) => d.readDateTime())!;
    obj.useSimpleBounds = reader.readBoolean();
    return obj;
};

export function decodeReadAnnotationDataDetails(reader: IReader, decoder: Decoder): ReadAnnotationDataDetails {
    const obj = new ReadAnnotationDataDetails();
    Object.assign(obj, decodeHistoryReadDetails(reader, decoder)); // decode base class
    obj.reqTimes = reader.readArray((d: IReader) => d.readDateTime())!;
    return obj;
};

export function decodeHistoryData(reader: IReader, decoder: Decoder): HistoryData {
    const obj = new HistoryData();
    obj.dataValues = reader.readArray((d: IReader) => d.readDataValue(decoder))!;
    return obj;
};

export function decodeModificationInfo(reader: IReader, decoder: Decoder): ModificationInfo {
    const obj = new ModificationInfo();
    obj.modificationTime = reader.readDateTime();
    obj.updateType = reader.readUInt32() as HistoryUpdateTypeEnum;
    obj.userName = reader.readString();
    return obj;
};

export function decodeHistoryModifiedData(reader: IReader, decoder: Decoder): HistoryModifiedData {
    const obj = new HistoryModifiedData();
    Object.assign(obj, decodeHistoryData(reader, decoder)); // decode base class
    obj.modificationInfos = reader.readArray((d: IReader) => decodeModificationInfo(d, decoder))!;
    return obj;
};

export function decodeHistoryEvent(reader: IReader, decoder: Decoder): HistoryEvent {
    const obj = new HistoryEvent();
    obj.events = reader.readArray((d: IReader) => decodeHistoryEventFieldList(d, decoder))!;
    return obj;
};

export function decodeHistoryModifiedEvent(reader: IReader, decoder: Decoder): HistoryModifiedEvent {
    const obj = new HistoryModifiedEvent();
    Object.assign(obj, decodeHistoryEvent(reader, decoder)); // decode base class
    obj.modificationInfos = reader.readArray((d: IReader) => decodeModificationInfo(d, decoder))!;
    return obj;
};

export function decodeHistoryReadRequest(reader: IReader, decoder: Decoder): HistoryReadRequest {
    const obj = new HistoryReadRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.historyReadDetails = reader.readExtensionObject(decoder);
    obj.timestampsToReturn = reader.readUInt32() as TimestampsToReturnEnum;
    obj.releaseContinuationPoints = reader.readBoolean();
    obj.nodesToRead = reader.readArray((d: IReader) => decodeHistoryReadValueId(d, decoder))!;
    return obj;
};

export function decodeHistoryReadResponse(reader: IReader, decoder: Decoder): HistoryReadResponse {
    const obj = new HistoryReadResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => decodeHistoryReadResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeWriteValue(reader: IReader, decoder: Decoder): WriteValue {
    const obj = new WriteValue();
    obj.nodeId = reader.readNodeId();
    obj.attributeId = reader.readUInt32();
    obj.indexRange = reader.readString();
    obj.value = reader.readDataValue(decoder);
    return obj;
};

export function decodeWriteRequest(reader: IReader, decoder: Decoder): WriteRequest {
    const obj = new WriteRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.nodesToWrite = reader.readArray((d: IReader) => decodeWriteValue(d, decoder))!;
    return obj;
};

export function decodeWriteResponse(reader: IReader, decoder: Decoder): WriteResponse {
    const obj = new WriteResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeHistoryUpdateDetails(reader: IReader, decoder: Decoder): HistoryUpdateDetails {
    const obj = new HistoryUpdateDetails();
    return obj;
};

export function decodeUpdateDataDetails(reader: IReader, decoder: Decoder): UpdateDataDetails {
    const obj = new UpdateDataDetails();
    Object.assign(obj, decodeHistoryUpdateDetails(reader, decoder)); // decode base class
    obj.nodeId = reader.readNodeId();
    obj.performInsertReplace = reader.readUInt32() as PerformUpdateTypeEnum;
    obj.updateValues = reader.readArray((d: IReader) => d.readDataValue(decoder))!;
    return obj;
};

export function decodeUpdateStructureDataDetails(reader: IReader, decoder: Decoder): UpdateStructureDataDetails {
    const obj = new UpdateStructureDataDetails();
    Object.assign(obj, decodeHistoryUpdateDetails(reader, decoder)); // decode base class
    obj.nodeId = reader.readNodeId();
    obj.performInsertReplace = reader.readUInt32() as PerformUpdateTypeEnum;
    obj.updateValues = reader.readArray((d: IReader) => d.readDataValue(decoder))!;
    return obj;
};

export function decodeUpdateEventDetails(reader: IReader, decoder: Decoder): UpdateEventDetails {
    const obj = new UpdateEventDetails();
    Object.assign(obj, decodeHistoryUpdateDetails(reader, decoder)); // decode base class
    obj.nodeId = reader.readNodeId();
    obj.performInsertReplace = reader.readUInt32() as PerformUpdateTypeEnum;
    obj.filter = decodeEventFilter(reader, decoder);
    obj.eventData = reader.readArray((d: IReader) => decodeHistoryEventFieldList(d, decoder))!;
    return obj;
};

export function decodeDeleteRawModifiedDetails(reader: IReader, decoder: Decoder): DeleteRawModifiedDetails {
    const obj = new DeleteRawModifiedDetails();
    Object.assign(obj, decodeHistoryUpdateDetails(reader, decoder)); // decode base class
    obj.nodeId = reader.readNodeId();
    obj.isDeleteModified = reader.readBoolean();
    obj.startTime = reader.readDateTime();
    obj.endTime = reader.readDateTime();
    return obj;
};

export function decodeDeleteAtTimeDetails(reader: IReader, decoder: Decoder): DeleteAtTimeDetails {
    const obj = new DeleteAtTimeDetails();
    Object.assign(obj, decodeHistoryUpdateDetails(reader, decoder)); // decode base class
    obj.nodeId = reader.readNodeId();
    obj.reqTimes = reader.readArray((d: IReader) => d.readDateTime())!;
    return obj;
};

export function decodeDeleteEventDetails(reader: IReader, decoder: Decoder): DeleteEventDetails {
    const obj = new DeleteEventDetails();
    Object.assign(obj, decodeHistoryUpdateDetails(reader, decoder)); // decode base class
    obj.nodeId = reader.readNodeId();
    obj.eventIds = reader.readArray((d: IReader) => d.readByteString())!;
    return obj;
};

export function decodeHistoryUpdateResult(reader: IReader, decoder: Decoder): HistoryUpdateResult {
    const obj = new HistoryUpdateResult();
    obj.statusCode = reader.readStatusCode();
    obj.operationResults = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeHistoryUpdateRequest(reader: IReader, decoder: Decoder): HistoryUpdateRequest {
    const obj = new HistoryUpdateRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.historyUpdateDetails = reader.readArray((d: IReader) => d.readExtensionObject(decoder))!;
    return obj;
};

export function decodeHistoryUpdateResponse(reader: IReader, decoder: Decoder): HistoryUpdateResponse {
    const obj = new HistoryUpdateResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => decodeHistoryUpdateResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeCallMethodRequest(reader: IReader, decoder: Decoder): CallMethodRequest {
    const obj = new CallMethodRequest();
    obj.objectId = reader.readNodeId();
    obj.methodId = reader.readNodeId();
    obj.inputArguments = reader.readArray((d: IReader) => d.readVariant(decoder))!;
    return obj;
};

export function decodeCallMethodResult(reader: IReader, decoder: Decoder): CallMethodResult {
    const obj = new CallMethodResult();
    obj.statusCode = reader.readStatusCode();
    obj.inputArgumentResults = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.inputArgumentDiagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    obj.outputArguments = reader.readArray((d: IReader) => d.readVariant(decoder))!;
    return obj;
};

export function decodeCallRequest(reader: IReader, decoder: Decoder): CallRequest {
    const obj = new CallRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.methodsToCall = reader.readArray((d: IReader) => decodeCallMethodRequest(d, decoder))!;
    return obj;
};

export function decodeCallResponse(reader: IReader, decoder: Decoder): CallResponse {
    const obj = new CallResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => decodeCallMethodResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeMonitoringFilter(reader: IReader, decoder: Decoder): MonitoringFilter {
    const obj = new MonitoringFilter();
    return obj;
};

export function decodeDataChangeFilter(reader: IReader, decoder: Decoder): DataChangeFilter {
    const obj = new DataChangeFilter();
    Object.assign(obj, decodeMonitoringFilter(reader, decoder)); // decode base class
    obj.trigger = reader.readUInt32() as DataChangeTriggerEnum;
    obj.deadbandType = reader.readUInt32();
    obj.deadbandValue = reader.readDouble();
    return obj;
};

export function decodeEventFilter(reader: IReader, decoder: Decoder): EventFilter {
    const obj = new EventFilter();
    Object.assign(obj, decodeMonitoringFilter(reader, decoder)); // decode base class
    obj.selectClauses = reader.readArray((d: IReader) => decodeSimpleAttributeOperand(d, decoder))!;
    obj.whereClause = decodeContentFilter(reader, decoder);
    return obj;
};

export function decodeAggregateConfiguration(reader: IReader, decoder: Decoder): AggregateConfiguration {
    const obj = new AggregateConfiguration();
    obj.useServerCapabilitiesDefaults = reader.readBoolean();
    obj.treatUncertainAsBad = reader.readBoolean();
    obj.percentDataBad = reader.readByte();
    obj.percentDataGood = reader.readByte();
    obj.useSlopedExtrapolation = reader.readBoolean();
    return obj;
};

export function decodeAggregateFilter(reader: IReader, decoder: Decoder): AggregateFilter {
    const obj = new AggregateFilter();
    Object.assign(obj, decodeMonitoringFilter(reader, decoder)); // decode base class
    obj.startTime = reader.readDateTime();
    obj.aggregateType = reader.readNodeId();
    obj.processingInterval = reader.readDouble();
    obj.aggregateConfiguration = decodeAggregateConfiguration(reader, decoder);
    return obj;
};

export function decodeMonitoringFilterResult(reader: IReader, decoder: Decoder): MonitoringFilterResult {
    const obj = new MonitoringFilterResult();
    return obj;
};

export function decodeEventFilterResult(reader: IReader, decoder: Decoder): EventFilterResult {
    const obj = new EventFilterResult();
    Object.assign(obj, decodeMonitoringFilterResult(reader, decoder)); // decode base class
    obj.selectClauseResults = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.selectClauseDiagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    obj.whereClauseResult = decodeContentFilterResult(reader, decoder);
    return obj;
};

export function decodeAggregateFilterResult(reader: IReader, decoder: Decoder): AggregateFilterResult {
    const obj = new AggregateFilterResult();
    Object.assign(obj, decodeMonitoringFilterResult(reader, decoder)); // decode base class
    obj.revisedStartTime = reader.readDateTime();
    obj.revisedProcessingInterval = reader.readDouble();
    obj.revisedAggregateConfiguration = decodeAggregateConfiguration(reader, decoder);
    return obj;
};

export function decodeMonitoringParameters(reader: IReader, decoder: Decoder): MonitoringParameters {
    const obj = new MonitoringParameters();
    obj.clientHandle = reader.readUInt32();
    obj.samplingInterval = reader.readDouble();
    obj.filter = reader.readExtensionObject(decoder);
    obj.queueSize = reader.readUInt32();
    obj.discardOldest = reader.readBoolean();
    return obj;
};

export function decodeMonitoredItemCreateRequest(reader: IReader, decoder: Decoder): MonitoredItemCreateRequest {
    const obj = new MonitoredItemCreateRequest();
    obj.itemToMonitor = decodeReadValueId(reader, decoder);
    obj.monitoringMode = reader.readUInt32() as MonitoringModeEnum;
    obj.requestedParameters = decodeMonitoringParameters(reader, decoder);
    return obj;
};

export function decodeMonitoredItemCreateResult(reader: IReader, decoder: Decoder): MonitoredItemCreateResult {
    const obj = new MonitoredItemCreateResult();
    obj.statusCode = reader.readStatusCode();
    obj.monitoredItemId = reader.readUInt32();
    obj.revisedSamplingInterval = reader.readDouble();
    obj.revisedQueueSize = reader.readUInt32();
    obj.filterResult = reader.readExtensionObject(decoder);
    return obj;
};

export function decodeCreateMonitoredItemsRequest(reader: IReader, decoder: Decoder): CreateMonitoredItemsRequest {
    const obj = new CreateMonitoredItemsRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.subscriptionId = reader.readUInt32();
    obj.timestampsToReturn = reader.readUInt32() as TimestampsToReturnEnum;
    obj.itemsToCreate = reader.readArray((d: IReader) => decodeMonitoredItemCreateRequest(d, decoder))!;
    return obj;
};

export function decodeCreateMonitoredItemsResponse(reader: IReader, decoder: Decoder): CreateMonitoredItemsResponse {
    const obj = new CreateMonitoredItemsResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => decodeMonitoredItemCreateResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeMonitoredItemModifyRequest(reader: IReader, decoder: Decoder): MonitoredItemModifyRequest {
    const obj = new MonitoredItemModifyRequest();
    obj.monitoredItemId = reader.readUInt32();
    obj.requestedParameters = decodeMonitoringParameters(reader, decoder);
    return obj;
};

export function decodeMonitoredItemModifyResult(reader: IReader, decoder: Decoder): MonitoredItemModifyResult {
    const obj = new MonitoredItemModifyResult();
    obj.statusCode = reader.readStatusCode();
    obj.revisedSamplingInterval = reader.readDouble();
    obj.revisedQueueSize = reader.readUInt32();
    obj.filterResult = reader.readExtensionObject(decoder);
    return obj;
};

export function decodeModifyMonitoredItemsRequest(reader: IReader, decoder: Decoder): ModifyMonitoredItemsRequest {
    const obj = new ModifyMonitoredItemsRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.subscriptionId = reader.readUInt32();
    obj.timestampsToReturn = reader.readUInt32() as TimestampsToReturnEnum;
    obj.itemsToModify = reader.readArray((d: IReader) => decodeMonitoredItemModifyRequest(d, decoder))!;
    return obj;
};

export function decodeModifyMonitoredItemsResponse(reader: IReader, decoder: Decoder): ModifyMonitoredItemsResponse {
    const obj = new ModifyMonitoredItemsResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => decodeMonitoredItemModifyResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeSetMonitoringModeRequest(reader: IReader, decoder: Decoder): SetMonitoringModeRequest {
    const obj = new SetMonitoringModeRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.subscriptionId = reader.readUInt32();
    obj.monitoringMode = reader.readUInt32() as MonitoringModeEnum;
    obj.monitoredItemIds = reader.readArray((d: IReader) => d.readUInt32())!;
    return obj;
};

export function decodeSetMonitoringModeResponse(reader: IReader, decoder: Decoder): SetMonitoringModeResponse {
    const obj = new SetMonitoringModeResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeSetTriggeringRequest(reader: IReader, decoder: Decoder): SetTriggeringRequest {
    const obj = new SetTriggeringRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.subscriptionId = reader.readUInt32();
    obj.triggeringItemId = reader.readUInt32();
    obj.linksToAdd = reader.readArray((d: IReader) => d.readUInt32())!;
    obj.linksToRemove = reader.readArray((d: IReader) => d.readUInt32())!;
    return obj;
};

export function decodeSetTriggeringResponse(reader: IReader, decoder: Decoder): SetTriggeringResponse {
    const obj = new SetTriggeringResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.addResults = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.addDiagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    obj.removeResults = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.removeDiagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeDeleteMonitoredItemsRequest(reader: IReader, decoder: Decoder): DeleteMonitoredItemsRequest {
    const obj = new DeleteMonitoredItemsRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.subscriptionId = reader.readUInt32();
    obj.monitoredItemIds = reader.readArray((d: IReader) => d.readUInt32())!;
    return obj;
};

export function decodeDeleteMonitoredItemsResponse(reader: IReader, decoder: Decoder): DeleteMonitoredItemsResponse {
    const obj = new DeleteMonitoredItemsResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeCreateSubscriptionRequest(reader: IReader, decoder: Decoder): CreateSubscriptionRequest {
    const obj = new CreateSubscriptionRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.requestedPublishingInterval = reader.readDouble();
    obj.requestedLifetimeCount = reader.readUInt32();
    obj.requestedMaxKeepAliveCount = reader.readUInt32();
    obj.maxNotificationsPerPublish = reader.readUInt32();
    obj.publishingEnabled = reader.readBoolean();
    obj.priority = reader.readByte();
    return obj;
};

export function decodeCreateSubscriptionResponse(reader: IReader, decoder: Decoder): CreateSubscriptionResponse {
    const obj = new CreateSubscriptionResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.subscriptionId = reader.readUInt32();
    obj.revisedPublishingInterval = reader.readDouble();
    obj.revisedLifetimeCount = reader.readUInt32();
    obj.revisedMaxKeepAliveCount = reader.readUInt32();
    return obj;
};

export function decodeModifySubscriptionRequest(reader: IReader, decoder: Decoder): ModifySubscriptionRequest {
    const obj = new ModifySubscriptionRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.subscriptionId = reader.readUInt32();
    obj.requestedPublishingInterval = reader.readDouble();
    obj.requestedLifetimeCount = reader.readUInt32();
    obj.requestedMaxKeepAliveCount = reader.readUInt32();
    obj.maxNotificationsPerPublish = reader.readUInt32();
    obj.priority = reader.readByte();
    return obj;
};

export function decodeModifySubscriptionResponse(reader: IReader, decoder: Decoder): ModifySubscriptionResponse {
    const obj = new ModifySubscriptionResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.revisedPublishingInterval = reader.readDouble();
    obj.revisedLifetimeCount = reader.readUInt32();
    obj.revisedMaxKeepAliveCount = reader.readUInt32();
    return obj;
};

export function decodeSetPublishingModeRequest(reader: IReader, decoder: Decoder): SetPublishingModeRequest {
    const obj = new SetPublishingModeRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.publishingEnabled = reader.readBoolean();
    obj.subscriptionIds = reader.readArray((d: IReader) => d.readUInt32())!;
    return obj;
};

export function decodeSetPublishingModeResponse(reader: IReader, decoder: Decoder): SetPublishingModeResponse {
    const obj = new SetPublishingModeResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeNotificationMessage(reader: IReader, decoder: Decoder): NotificationMessage {
    const obj = new NotificationMessage();
    obj.sequenceNumber = reader.readUInt32();
    obj.publishTime = reader.readDateTime();
    obj.notificationData = reader.readArray((d: IReader) => d.readExtensionObject(decoder))!;
    return obj;
};

export function decodeNotificationData(reader: IReader, decoder: Decoder): NotificationData {
    const obj = new NotificationData();
    return obj;
};

export function decodeDataChangeNotification(reader: IReader, decoder: Decoder): DataChangeNotification {
    const obj = new DataChangeNotification();
    Object.assign(obj, decodeNotificationData(reader, decoder)); // decode base class
    obj.monitoredItems = reader.readArray((d: IReader) => decodeMonitoredItemNotification(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeMonitoredItemNotification(reader: IReader, decoder: Decoder): MonitoredItemNotification {
    const obj = new MonitoredItemNotification();
    obj.clientHandle = reader.readUInt32();
    obj.value = reader.readDataValue(decoder);
    return obj;
};

export function decodeEventNotificationList(reader: IReader, decoder: Decoder): EventNotificationList {
    const obj = new EventNotificationList();
    Object.assign(obj, decodeNotificationData(reader, decoder)); // decode base class
    obj.events = reader.readArray((d: IReader) => decodeEventFieldList(d, decoder))!;
    return obj;
};

export function decodeEventFieldList(reader: IReader, decoder: Decoder): EventFieldList {
    const obj = new EventFieldList();
    obj.clientHandle = reader.readUInt32();
    obj.eventFields = reader.readArray((d: IReader) => d.readVariant(decoder))!;
    return obj;
};

export function decodeHistoryEventFieldList(reader: IReader, decoder: Decoder): HistoryEventFieldList {
    const obj = new HistoryEventFieldList();
    obj.eventFields = reader.readArray((d: IReader) => d.readVariant(decoder))!;
    return obj;
};

export function decodeStatusChangeNotification(reader: IReader, decoder: Decoder): StatusChangeNotification {
    const obj = new StatusChangeNotification();
    Object.assign(obj, decodeNotificationData(reader, decoder)); // decode base class
    obj.status = reader.readStatusCode();
    obj.diagnosticInfo = reader.readDiagnosticInfo();
    return obj;
};

export function decodeSubscriptionAcknowledgement(reader: IReader, decoder: Decoder): SubscriptionAcknowledgement {
    const obj = new SubscriptionAcknowledgement();
    obj.subscriptionId = reader.readUInt32();
    obj.sequenceNumber = reader.readUInt32();
    return obj;
};

export function decodePublishRequest(reader: IReader, decoder: Decoder): PublishRequest {
    const obj = new PublishRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.subscriptionAcknowledgements = reader.readArray((d: IReader) => decodeSubscriptionAcknowledgement(d, decoder))!;
    return obj;
};

export function decodePublishResponse(reader: IReader, decoder: Decoder): PublishResponse {
    const obj = new PublishResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.subscriptionId = reader.readUInt32();
    obj.availableSequenceNumbers = reader.readArray((d: IReader) => d.readUInt32())!;
    obj.moreNotifications = reader.readBoolean();
    obj.notificationMessage = decodeNotificationMessage(reader, decoder);
    obj.results = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeRepublishRequest(reader: IReader, decoder: Decoder): RepublishRequest {
    const obj = new RepublishRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.subscriptionId = reader.readUInt32();
    obj.retransmitSequenceNumber = reader.readUInt32();
    return obj;
};

export function decodeRepublishResponse(reader: IReader, decoder: Decoder): RepublishResponse {
    const obj = new RepublishResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.notificationMessage = decodeNotificationMessage(reader, decoder);
    return obj;
};

export function decodeTransferResult(reader: IReader, decoder: Decoder): TransferResult {
    const obj = new TransferResult();
    obj.statusCode = reader.readStatusCode();
    obj.availableSequenceNumbers = reader.readArray((d: IReader) => d.readUInt32())!;
    return obj;
};

export function decodeTransferSubscriptionsRequest(reader: IReader, decoder: Decoder): TransferSubscriptionsRequest {
    const obj = new TransferSubscriptionsRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.subscriptionIds = reader.readArray((d: IReader) => d.readUInt32())!;
    obj.sendInitialValues = reader.readBoolean();
    return obj;
};

export function decodeTransferSubscriptionsResponse(reader: IReader, decoder: Decoder): TransferSubscriptionsResponse {
    const obj = new TransferSubscriptionsResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => decodeTransferResult(d, decoder))!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeDeleteSubscriptionsRequest(reader: IReader, decoder: Decoder): DeleteSubscriptionsRequest {
    const obj = new DeleteSubscriptionsRequest();
    obj.requestHeader = decodeRequestHeader(reader, decoder);
    obj.subscriptionIds = reader.readArray((d: IReader) => d.readUInt32())!;
    return obj;
};

export function decodeDeleteSubscriptionsResponse(reader: IReader, decoder: Decoder): DeleteSubscriptionsResponse {
    const obj = new DeleteSubscriptionsResponse();
    obj.responseHeader = decodeResponseHeader(reader, decoder);
    obj.results = reader.readArray((d: IReader) => d.readStatusCode())!;
    obj.diagnosticInfos = reader.readArray((d: IReader) => d.readDiagnosticInfo())!;
    return obj;
};

export function decodeBuildInfo(reader: IReader, decoder: Decoder): BuildInfo {
    const obj = new BuildInfo();
    obj.productUri = reader.readString();
    obj.manufacturerName = reader.readString();
    obj.productName = reader.readString();
    obj.softwareVersion = reader.readString();
    obj.buildNumber = reader.readString();
    obj.buildDate = reader.readDateTime();
    return obj;
};

export function decodeRedundantServerDataType(reader: IReader, decoder: Decoder): RedundantServerDataType {
    const obj = new RedundantServerDataType();
    obj.serverId = reader.readString();
    obj.serviceLevel = reader.readByte();
    obj.serverState = reader.readUInt32() as ServerStateEnum;
    return obj;
};

export function decodeEndpointUrlListDataType(reader: IReader, decoder: Decoder): EndpointUrlListDataType {
    const obj = new EndpointUrlListDataType();
    obj.endpointUrlList = reader.readArray((d: IReader) => d.readString())!;
    return obj;
};

export function decodeNetworkGroupDataType(reader: IReader, decoder: Decoder): NetworkGroupDataType {
    const obj = new NetworkGroupDataType();
    obj.serverUri = reader.readString();
    obj.networkPaths = reader.readArray((d: IReader) => decodeEndpointUrlListDataType(d, decoder))!;
    return obj;
};

export function decodeSamplingIntervalDiagnosticsDataType(reader: IReader, decoder: Decoder): SamplingIntervalDiagnosticsDataType {
    const obj = new SamplingIntervalDiagnosticsDataType();
    obj.samplingInterval = reader.readDouble();
    obj.monitoredItemCount = reader.readUInt32();
    obj.maxMonitoredItemCount = reader.readUInt32();
    obj.disabledMonitoredItemCount = reader.readUInt32();
    return obj;
};

export function decodeServerDiagnosticsSummaryDataType(reader: IReader, decoder: Decoder): ServerDiagnosticsSummaryDataType {
    const obj = new ServerDiagnosticsSummaryDataType();
    obj.serverViewCount = reader.readUInt32();
    obj.currentSessionCount = reader.readUInt32();
    obj.cumulatedSessionCount = reader.readUInt32();
    obj.securityRejectedSessionCount = reader.readUInt32();
    obj.rejectedSessionCount = reader.readUInt32();
    obj.sessionTimeoutCount = reader.readUInt32();
    obj.sessionAbortCount = reader.readUInt32();
    obj.currentSubscriptionCount = reader.readUInt32();
    obj.cumulatedSubscriptionCount = reader.readUInt32();
    obj.publishingIntervalCount = reader.readUInt32();
    obj.securityRejectedRequestsCount = reader.readUInt32();
    obj.rejectedRequestsCount = reader.readUInt32();
    return obj;
};

export function decodeServerStatusDataType(reader: IReader, decoder: Decoder): ServerStatusDataType {
    const obj = new ServerStatusDataType();
    obj.startTime = reader.readDateTime();
    obj.currentTime = reader.readDateTime();
    obj.state = reader.readUInt32() as ServerStateEnum;
    obj.buildInfo = decodeBuildInfo(reader, decoder);
    obj.secondsTillShutdown = reader.readUInt32();
    obj.shutdownReason = reader.readLocalizedText();
    return obj;
};

export function decodeSessionDiagnosticsDataType(reader: IReader, decoder: Decoder): SessionDiagnosticsDataType {
    const obj = new SessionDiagnosticsDataType();
    obj.sessionId = reader.readNodeId();
    obj.sessionName = reader.readString();
    obj.clientDescription = decodeApplicationDescription(reader, decoder);
    obj.serverUri = reader.readString();
    obj.endpointUrl = reader.readString();
    obj.localeIds = reader.readArray((d: IReader) => d.readString())!;
    obj.actualSessionTimeout = reader.readDouble();
    obj.maxResponseMessageSize = reader.readUInt32();
    obj.clientConnectionTime = reader.readDateTime();
    obj.clientLastContactTime = reader.readDateTime();
    obj.currentSubscriptionsCount = reader.readUInt32();
    obj.currentMonitoredItemsCount = reader.readUInt32();
    obj.currentPublishRequestsInQueue = reader.readUInt32();
    obj.totalRequestCount = decodeServiceCounterDataType(reader, decoder);
    obj.unauthorizedRequestCount = reader.readUInt32();
    obj.readCount = decodeServiceCounterDataType(reader, decoder);
    obj.historyReadCount = decodeServiceCounterDataType(reader, decoder);
    obj.writeCount = decodeServiceCounterDataType(reader, decoder);
    obj.historyUpdateCount = decodeServiceCounterDataType(reader, decoder);
    obj.callCount = decodeServiceCounterDataType(reader, decoder);
    obj.createMonitoredItemsCount = decodeServiceCounterDataType(reader, decoder);
    obj.modifyMonitoredItemsCount = decodeServiceCounterDataType(reader, decoder);
    obj.setMonitoringModeCount = decodeServiceCounterDataType(reader, decoder);
    obj.setTriggeringCount = decodeServiceCounterDataType(reader, decoder);
    obj.deleteMonitoredItemsCount = decodeServiceCounterDataType(reader, decoder);
    obj.createSubscriptionCount = decodeServiceCounterDataType(reader, decoder);
    obj.modifySubscriptionCount = decodeServiceCounterDataType(reader, decoder);
    obj.setPublishingModeCount = decodeServiceCounterDataType(reader, decoder);
    obj.publishCount = decodeServiceCounterDataType(reader, decoder);
    obj.republishCount = decodeServiceCounterDataType(reader, decoder);
    obj.transferSubscriptionsCount = decodeServiceCounterDataType(reader, decoder);
    obj.deleteSubscriptionsCount = decodeServiceCounterDataType(reader, decoder);
    obj.addNodesCount = decodeServiceCounterDataType(reader, decoder);
    obj.addReferencesCount = decodeServiceCounterDataType(reader, decoder);
    obj.deleteNodesCount = decodeServiceCounterDataType(reader, decoder);
    obj.deleteReferencesCount = decodeServiceCounterDataType(reader, decoder);
    obj.browseCount = decodeServiceCounterDataType(reader, decoder);
    obj.browseNextCount = decodeServiceCounterDataType(reader, decoder);
    obj.translateBrowsePathsToNodeIdsCount = decodeServiceCounterDataType(reader, decoder);
    obj.queryFirstCount = decodeServiceCounterDataType(reader, decoder);
    obj.queryNextCount = decodeServiceCounterDataType(reader, decoder);
    obj.registerNodesCount = decodeServiceCounterDataType(reader, decoder);
    obj.unregisterNodesCount = decodeServiceCounterDataType(reader, decoder);
    return obj;
};

export function decodeSessionSecurityDiagnosticsDataType(reader: IReader, decoder: Decoder): SessionSecurityDiagnosticsDataType {
    const obj = new SessionSecurityDiagnosticsDataType();
    obj.sessionId = reader.readNodeId();
    obj.clientUserIdOfSession = reader.readString();
    obj.clientUserIdHistory = reader.readArray((d: IReader) => d.readString())!;
    obj.authenticationMechanism = reader.readString();
    obj.encoding = reader.readString();
    obj.transportProtocol = reader.readString();
    obj.securityMode = reader.readUInt32() as MessageSecurityModeEnum;
    obj.securityPolicyUri = reader.readString();
    obj.clientCertificate = reader.readByteString();
    return obj;
};

export function decodeServiceCounterDataType(reader: IReader, decoder: Decoder): ServiceCounterDataType {
    const obj = new ServiceCounterDataType();
    obj.totalCount = reader.readUInt32();
    obj.errorCount = reader.readUInt32();
    return obj;
};

export function decodeStatusResult(reader: IReader, decoder: Decoder): StatusResult {
    const obj = new StatusResult();
    obj.statusCode = reader.readStatusCode();
    obj.diagnosticInfo = reader.readDiagnosticInfo();
    return obj;
};

export function decodeSubscriptionDiagnosticsDataType(reader: IReader, decoder: Decoder): SubscriptionDiagnosticsDataType {
    const obj = new SubscriptionDiagnosticsDataType();
    obj.sessionId = reader.readNodeId();
    obj.subscriptionId = reader.readUInt32();
    obj.priority = reader.readByte();
    obj.publishingInterval = reader.readDouble();
    obj.maxKeepAliveCount = reader.readUInt32();
    obj.maxLifetimeCount = reader.readUInt32();
    obj.maxNotificationsPerPublish = reader.readUInt32();
    obj.publishingEnabled = reader.readBoolean();
    obj.modifyCount = reader.readUInt32();
    obj.enableCount = reader.readUInt32();
    obj.disableCount = reader.readUInt32();
    obj.republishRequestCount = reader.readUInt32();
    obj.republishMessageRequestCount = reader.readUInt32();
    obj.republishMessageCount = reader.readUInt32();
    obj.transferRequestCount = reader.readUInt32();
    obj.transferredToAltClientCount = reader.readUInt32();
    obj.transferredToSameClientCount = reader.readUInt32();
    obj.publishRequestCount = reader.readUInt32();
    obj.dataChangeNotificationsCount = reader.readUInt32();
    obj.eventNotificationsCount = reader.readUInt32();
    obj.notificationsCount = reader.readUInt32();
    obj.latePublishRequestCount = reader.readUInt32();
    obj.currentKeepAliveCount = reader.readUInt32();
    obj.currentLifetimeCount = reader.readUInt32();
    obj.unacknowledgedMessageCount = reader.readUInt32();
    obj.discardedMessageCount = reader.readUInt32();
    obj.monitoredItemCount = reader.readUInt32();
    obj.disabledMonitoredItemCount = reader.readUInt32();
    obj.monitoringQueueOverflowCount = reader.readUInt32();
    obj.nextSequenceNumber = reader.readUInt32();
    obj.eventQueueOverflowCount = reader.readUInt32();
    return obj;
};

export function decodeModelChangeStructureDataType(reader: IReader, decoder: Decoder): ModelChangeStructureDataType {
    const obj = new ModelChangeStructureDataType();
    obj.affected = reader.readNodeId();
    obj.affectedType = reader.readNodeId();
    obj.verb = reader.readByte();
    return obj;
};

export function decodeSemanticChangeStructureDataType(reader: IReader, decoder: Decoder): SemanticChangeStructureDataType {
    const obj = new SemanticChangeStructureDataType();
    obj.affected = reader.readNodeId();
    obj.affectedType = reader.readNodeId();
    return obj;
};

export function decodeRange(reader: IReader, decoder: Decoder): Range {
    const obj = new Range();
    obj.low = reader.readDouble();
    obj.high = reader.readDouble();
    return obj;
};

export function decodeEUInformation(reader: IReader, decoder: Decoder): EUInformation {
    const obj = new EUInformation();
    obj.namespaceUri = reader.readString();
    obj.unitId = reader.readInt32();
    obj.displayName = reader.readLocalizedText();
    obj.description = reader.readLocalizedText();
    return obj;
};

export function decodeComplexNumberType(reader: IReader, decoder: Decoder): ComplexNumberType {
    const obj = new ComplexNumberType();
    obj.real = reader.readFloat();
    obj.imaginary = reader.readFloat();
    return obj;
};

export function decodeDoubleComplexNumberType(reader: IReader, decoder: Decoder): DoubleComplexNumberType {
    const obj = new DoubleComplexNumberType();
    obj.real = reader.readDouble();
    obj.imaginary = reader.readDouble();
    return obj;
};

export function decodeAxisInformation(reader: IReader, decoder: Decoder): AxisInformation {
    const obj = new AxisInformation();
    obj.engineeringUnits = decodeEUInformation(reader, decoder);
    obj.eURange = decodeRange(reader, decoder);
    obj.title = reader.readLocalizedText();
    obj.axisScaleType = reader.readUInt32() as AxisScaleEnumerationEnum;
    obj.axisSteps = reader.readArray((d: IReader) => d.readDouble())!;
    return obj;
};

export function decodeXVType(reader: IReader, decoder: Decoder): XVType {
    const obj = new XVType();
    obj.x = reader.readDouble();
    obj.value = reader.readFloat();
    return obj;
};

export function decodeProgramDiagnosticDataType(reader: IReader, decoder: Decoder): ProgramDiagnosticDataType {
    const obj = new ProgramDiagnosticDataType();
    obj.createSessionId = reader.readNodeId();
    obj.createClientName = reader.readString();
    obj.invocationCreationTime = reader.readDateTime();
    obj.lastTransitionTime = reader.readDateTime();
    obj.lastMethodCall = reader.readString();
    obj.lastMethodSessionId = reader.readNodeId();
    obj.lastMethodInputArguments = reader.readArray((d: IReader) => decodeArgument(d, decoder))!;
    obj.lastMethodOutputArguments = reader.readArray((d: IReader) => decodeArgument(d, decoder))!;
    obj.lastMethodCallTime = reader.readDateTime();
    obj.lastMethodReturnStatus = decodeStatusResult(reader, decoder);
    return obj;
};

export function decodeProgramDiagnostic2DataType(reader: IReader, decoder: Decoder): ProgramDiagnostic2DataType {
    const obj = new ProgramDiagnostic2DataType();
    obj.createSessionId = reader.readNodeId();
    obj.createClientName = reader.readString();
    obj.invocationCreationTime = reader.readDateTime();
    obj.lastTransitionTime = reader.readDateTime();
    obj.lastMethodCall = reader.readString();
    obj.lastMethodSessionId = reader.readNodeId();
    obj.lastMethodInputArguments = reader.readArray((d: IReader) => decodeArgument(d, decoder))!;
    obj.lastMethodOutputArguments = reader.readArray((d: IReader) => decodeArgument(d, decoder))!;
    obj.lastMethodInputValues = reader.readArray((d: IReader) => d.readVariant(decoder))!;
    obj.lastMethodOutputValues = reader.readArray((d: IReader) => d.readVariant(decoder))!;
    obj.lastMethodCallTime = reader.readDateTime();
    obj.lastMethodReturnStatus = reader.readStatusCode();
    return obj;
};

export function decodeAnnotation(reader: IReader, decoder: Decoder): Annotation {
    const obj = new Annotation();
    obj.message = reader.readString();
    obj.userName = reader.readString();
    obj.annotationTime = reader.readDateTime();
    return obj;
};
