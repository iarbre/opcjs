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

import { IWriter, Encoder } from 'opcjs-base';
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

export function encodeUnion(encoder: IWriter, value: Union, enc: Encoder): void {
};

export function encodeKeyValuePair(encoder: IWriter, value: KeyValuePair, enc: Encoder): void {
    encoder.writeQualifiedName(value.key);
    encoder.writeVariant(value.value, enc);
};

export function encodeAdditionalParametersType(encoder: IWriter, value: AdditionalParametersType, enc: Encoder): void {
    encoder.writeArray(value.parameters, (e, v) => encodeKeyValuePair(e, v, enc));
};

export function encodeEphemeralKeyType(encoder: IWriter, value: EphemeralKeyType, enc: Encoder): void {
    encoder.writeByteString(value.publicKey);
    encoder.writeByteString(value.signature);
};

export function encodeEndpointType(encoder: IWriter, value: EndpointType, enc: Encoder): void {
    encoder.writeString(value.endpointUrl);
    encoder.writeUInt32(value.securityMode); // enum
    encoder.writeString(value.securityPolicyUri);
    encoder.writeString(value.transportProfileUri);
};

export function encodeBitFieldDefinition(encoder: IWriter, value: BitFieldDefinition, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeLocalizedText(value.description);
    encoder.writeBoolean(value.reserved);
    encoder.writeUInt32(value.startingBitPosition);
    encoder.writeUInt32(value.endingBitPosition);
};

export function encodeRationalNumber(encoder: IWriter, value: RationalNumber, enc: Encoder): void {
    encoder.writeInt32(value.numerator);
    encoder.writeUInt32(value.denominator);
};

export function encodeVector(encoder: IWriter, value: Vector, enc: Encoder): void {
};

export function encode_3DVector(encoder: IWriter, value: _3DVector, enc: Encoder): void {
    encodeVector(encoder, value, enc); // encode base class
    encoder.writeDouble(value.x);
    encoder.writeDouble(value.y);
    encoder.writeDouble(value.z);
};

export function encodeCartesianCoordinates(encoder: IWriter, value: CartesianCoordinates, enc: Encoder): void {
};

export function encode_3DCartesianCoordinates(encoder: IWriter, value: _3DCartesianCoordinates, enc: Encoder): void {
    encodeCartesianCoordinates(encoder, value, enc); // encode base class
    encoder.writeDouble(value.x);
    encoder.writeDouble(value.y);
    encoder.writeDouble(value.z);
};

export function encodeOrientation(encoder: IWriter, value: Orientation, enc: Encoder): void {
};

export function encode_3DOrientation(encoder: IWriter, value: _3DOrientation, enc: Encoder): void {
    encodeOrientation(encoder, value, enc); // encode base class
    encoder.writeDouble(value.a);
    encoder.writeDouble(value.b);
    encoder.writeDouble(value.c);
};

export function encodeFrame(encoder: IWriter, value: Frame, enc: Encoder): void {
};

export function encode_3DFrame(encoder: IWriter, value: _3DFrame, enc: Encoder): void {
    encodeFrame(encoder, value, enc); // encode base class
    encode_3DCartesianCoordinates(encoder, value.cartesianCoordinates, enc);
    encode_3DOrientation(encoder, value.orientation, enc);
};

export function encodeIdentityMappingRuleType(encoder: IWriter, value: IdentityMappingRuleType, enc: Encoder): void {
    encoder.writeUInt32(value.criteriaType); // enum
    encoder.writeString(value.criteria);
};

export function encodeCurrencyUnitType(encoder: IWriter, value: CurrencyUnitType, enc: Encoder): void {
    encoder.writeInt16(value.numericCode);
    encoder.writeSByte(value.exponent);
    encoder.writeString(value.alphabeticCode);
    encoder.writeLocalizedText(value.currency);
};

export function encodeAnnotationDataType(encoder: IWriter, value: AnnotationDataType, enc: Encoder): void {
    encoder.writeString(value.annotation);
    encoder.writeString(value.discipline);
    encoder.writeString(value.uri);
};

export function encodeLinearConversionDataType(encoder: IWriter, value: LinearConversionDataType, enc: Encoder): void {
    encoder.writeFloat(value.initialAddend);
    encoder.writeFloat(value.multiplicand);
    encoder.writeFloat(value.divisor);
    encoder.writeFloat(value.finalAddend);
};

export function encodeQuantityDimension(encoder: IWriter, value: QuantityDimension, enc: Encoder): void {
    encoder.writeSByte(value.massExponent);
    encoder.writeSByte(value.lengthExponent);
    encoder.writeSByte(value.timeExponent);
    encoder.writeSByte(value.electricCurrentExponent);
    encoder.writeSByte(value.amountOfSubstanceExponent);
    encoder.writeSByte(value.luminousIntensityExponent);
    encoder.writeSByte(value.absoluteTemperatureExponent);
    encoder.writeSByte(value.dimensionlessExponent);
};

export function encodeTrustListDataType(encoder: IWriter, value: TrustListDataType, enc: Encoder): void {
    encoder.writeUInt32(value.specifiedLists);
    encoder.writeArray(value.trustedCertificates, (e, v) => e.writeByteString(v));
    encoder.writeArray(value.trustedCrls, (e, v) => e.writeByteString(v));
    encoder.writeArray(value.issuerCertificates, (e, v) => e.writeByteString(v));
    encoder.writeArray(value.issuerCrls, (e, v) => e.writeByteString(v));
};

export function encodeBaseConfigurationDataType(encoder: IWriter, value: BaseConfigurationDataType, enc: Encoder): void {
    encoder.writeUInt32(value.configurationVersion);
    encoder.writeArray(value.configurationProperties, (e, v) => encodeKeyValuePair(e, v, enc));
};

export function encodeBaseConfigurationRecordDataType(encoder: IWriter, value: BaseConfigurationRecordDataType, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeArray(value.recordProperties, (e, v) => encodeKeyValuePair(e, v, enc));
};

export function encodeCertificateGroupDataType(encoder: IWriter, value: CertificateGroupDataType, enc: Encoder): void {
    encodeBaseConfigurationRecordDataType(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.purpose);
    encoder.writeArray(value.certificateTypes, (e, v) => e.writeNodeId(v));
    encoder.writeArray(value.isCertificateAssigned, (e, v) => e.writeBoolean(v));
    encoder.writeUInt32(value.validationOptions);
};

export function encodeConfigurationUpdateTargetType(encoder: IWriter, value: ConfigurationUpdateTargetType, enc: Encoder): void {
    encoder.writeString(value.path);
    encoder.writeUInt32(value.updateType); // enum
};

export function encodeTransactionErrorType(encoder: IWriter, value: TransactionErrorType, enc: Encoder): void {
    encoder.writeNodeId(value.targetId);
    encoder.writeStatusCode(value.error);
    encoder.writeLocalizedText(value.message);
};

export function encodeApplicationConfigurationDataType(encoder: IWriter, value: ApplicationConfigurationDataType, enc: Encoder): void {
    encodeBaseConfigurationDataType(encoder, value, enc); // encode base class
    encodeApplicationIdentityDataType(encoder, value.applicationIdentity, enc);
    encoder.writeArray(value.certificateGroups, (e, v) => encodeCertificateGroupDataType(e, v, enc));
    encoder.writeArray(value.serverEndpoints, (e, v) => encodeServerEndpointDataType(e, v, enc));
    encoder.writeArray(value.clientEndpoints, (e, v) => encodeEndpointDataType(e, v, enc));
    encoder.writeArray(value.securitySettings, (e, v) => encodeSecuritySettingsDataType(e, v, enc));
    encoder.writeArray(value.userTokenSettings, (e, v) => encodeUserTokenSettingsDataType(e, v, enc));
    encoder.writeArray(value.authorizationServices, (e, v) => encodeAuthorizationServiceConfigurationDataType(e, v, enc));
};

export function encodeApplicationIdentityDataType(encoder: IWriter, value: ApplicationIdentityDataType, enc: Encoder): void {
    encodeBaseConfigurationRecordDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.applicationUri);
    encoder.writeArray(value.applicationNames, (e, v) => e.writeLocalizedText(v));
    encoder.writeArray(value.additionalServers, (e, v) => encodeApplicationDescription(e, v, enc));
};

export function encodeEndpointDataType(encoder: IWriter, value: EndpointDataType, enc: Encoder): void {
    encodeBaseConfigurationRecordDataType(encoder, value, enc); // encode base class
    encoder.writeArray(value.discoveryUrls, (e, v) => e.writeString(v));
    encoder.writeString(value.networkName);
    encoder.writeUInt16(value.port);
};

export function encodeServerEndpointDataType(encoder: IWriter, value: ServerEndpointDataType, enc: Encoder): void {
    encodeEndpointDataType(encoder, value, enc); // encode base class
    encoder.writeArray(value.endpointUrls, (e, v) => e.writeString(v));
    encoder.writeArray(value.securitySettingNames, (e, v) => e.writeString(v));
    encoder.writeString(value.transportProfileUri);
    encoder.writeArray(value.userTokenSettingNames, (e, v) => e.writeString(v));
    encoder.writeArray(value.reverseConnectUrls, (e, v) => e.writeString(v));
};

export function encodeSecuritySettingsDataType(encoder: IWriter, value: SecuritySettingsDataType, enc: Encoder): void {
    encodeBaseConfigurationRecordDataType(encoder, value, enc); // encode base class
    encoder.writeArray(value.securityModes, (e, v) => e.writeUInt32(v)); // enum
    encoder.writeArray(value.securityPolicyUris, (e, v) => e.writeString(v));
    encoder.writeString(value.certificateGroupName);
};

export function encodeUserTokenSettingsDataType(encoder: IWriter, value: UserTokenSettingsDataType, enc: Encoder): void {
    encodeBaseConfigurationRecordDataType(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.tokenType); // enum
    encoder.writeString(value.issuedTokenType);
    encoder.writeString(value.issuerEndpointUrl);
    encoder.writeString(value.securityPolicyUri);
    encoder.writeString(value.certificateGroupName);
    encoder.writeString(value.authorizationServiceName);
};

export function encodeServiceCertificateDataType(encoder: IWriter, value: ServiceCertificateDataType, enc: Encoder): void {
    encoder.writeByteString(value.certificate);
    encoder.writeArray(value.issuers, (e, v) => e.writeByteString(v));
    encoder.writeDateTime(value.validFrom);
    encoder.writeDateTime(value.validTo);
};

export function encodeAuthorizationServiceConfigurationDataType(encoder: IWriter, value: AuthorizationServiceConfigurationDataType, enc: Encoder): void {
    encodeBaseConfigurationRecordDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.serviceUri);
    encoder.writeArray(value.serviceCertificates, (e, v) => encodeServiceCertificateDataType(e, v, enc));
    encoder.writeString(value.issuerEndpointSettings);
};

export function encodeDecimalDataType(encoder: IWriter, value: DecimalDataType, enc: Encoder): void {
    encoder.writeInt16(value.scale);
    encoder.writeByteString(value.value);
};

export function encodeDataTypeSchemaHeader(encoder: IWriter, value: DataTypeSchemaHeader, enc: Encoder): void {
    encoder.writeArray(value.namespaces, (e, v) => e.writeString(v));
    encoder.writeArray(value.structureDataTypes, (e, v) => encodeStructureDescription(e, v, enc));
    encoder.writeArray(value.enumDataTypes, (e, v) => encodeEnumDescription(e, v, enc));
    encoder.writeArray(value.simpleDataTypes, (e, v) => encodeSimpleTypeDescription(e, v, enc));
};

export function encodeDataTypeDescription(encoder: IWriter, value: DataTypeDescription, enc: Encoder): void {
    encoder.writeNodeId(value.dataTypeId);
    encoder.writeQualifiedName(value.name);
};

export function encodeStructureDescription(encoder: IWriter, value: StructureDescription, enc: Encoder): void {
    encodeDataTypeDescription(encoder, value, enc); // encode base class
    encodeStructureDefinition(encoder, value.structureDefinition, enc);
};

export function encodeEnumDescription(encoder: IWriter, value: EnumDescription, enc: Encoder): void {
    encodeDataTypeDescription(encoder, value, enc); // encode base class
    encodeEnumDefinition(encoder, value.enumDefinition, enc);
    encoder.writeByte(value.builtInType);
};

export function encodeSimpleTypeDescription(encoder: IWriter, value: SimpleTypeDescription, enc: Encoder): void {
    encodeDataTypeDescription(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.baseDataType);
    encoder.writeByte(value.builtInType);
};

export function encodeUABinaryFileDataType(encoder: IWriter, value: UABinaryFileDataType, enc: Encoder): void {
    encodeDataTypeSchemaHeader(encoder, value, enc); // encode base class
    encoder.writeString(value.schemaLocation);
    encoder.writeArray(value.fileHeader, (e, v) => encodeKeyValuePair(e, v, enc));
    encoder.writeVariant(value.body, enc);
};

export function encodePortableQualifiedName(encoder: IWriter, value: PortableQualifiedName, enc: Encoder): void {
    encoder.writeString(value.namespaceUri);
    encoder.writeString(value.name);
};

export function encodePortableNodeId(encoder: IWriter, value: PortableNodeId, enc: Encoder): void {
    encoder.writeString(value.namespaceUri);
    encoder.writeNodeId(value.identifier);
};

export function encodeUnsignedRationalNumber(encoder: IWriter, value: UnsignedRationalNumber, enc: Encoder): void {
    encoder.writeUInt32(value.numerator);
    encoder.writeUInt32(value.denominator);
};

export function encodeDataSetMetaDataType(encoder: IWriter, value: DataSetMetaDataType, enc: Encoder): void {
    encodeDataTypeSchemaHeader(encoder, value, enc); // encode base class
    encoder.writeString(value.name);
    encoder.writeLocalizedText(value.description);
    encoder.writeArray(value.fields, (e, v) => encodeFieldMetaData(e, v, enc));
    encoder.writeGuid(value.dataSetClassId);
    encodeConfigurationVersionDataType(encoder, value.configurationVersion, enc);
};

export function encodeFieldMetaData(encoder: IWriter, value: FieldMetaData, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeLocalizedText(value.description);
    encoder.writeUInt16(value.fieldFlags);
    encoder.writeByte(value.builtInType);
    encoder.writeNodeId(value.dataType);
    encoder.writeInt32(value.valueRank);
    encoder.writeArray(value.arrayDimensions, (e, v) => e.writeUInt32(v));
    encoder.writeUInt32(value.maxStringLength);
    encoder.writeGuid(value.dataSetFieldId);
    encoder.writeArray(value.properties, (e, v) => encodeKeyValuePair(e, v, enc));
};

export function encodeConfigurationVersionDataType(encoder: IWriter, value: ConfigurationVersionDataType, enc: Encoder): void {
    encoder.writeUInt32(value.majorVersion);
    encoder.writeUInt32(value.minorVersion);
};

export function encodePublishedDataSetDataType(encoder: IWriter, value: PublishedDataSetDataType, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeArray(value.dataSetFolder, (e, v) => e.writeString(v));
    encodeDataSetMetaDataType(encoder, value.dataSetMetaData, enc);
    encoder.writeArray(value.extensionFields, (e, v) => encodeKeyValuePair(e, v, enc));
    encodePublishedDataSetSourceDataType(encoder, value.dataSetSource, enc);
};

export function encodePublishedDataSetSourceDataType(encoder: IWriter, value: PublishedDataSetSourceDataType, enc: Encoder): void {
};

export function encodePublishedVariableDataType(encoder: IWriter, value: PublishedVariableDataType, enc: Encoder): void {
    encoder.writeNodeId(value.publishedVariable);
    encoder.writeUInt32(value.attributeId);
    encoder.writeDouble(value.samplingIntervalHint);
    encoder.writeUInt32(value.deadbandType);
    encoder.writeDouble(value.deadbandValue);
    encoder.writeString(value.indexRange);
    encoder.writeVariant(value.substituteValue, enc);
    encoder.writeArray(value.metaDataProperties, (e, v) => e.writeQualifiedName(v));
};

export function encodePublishedDataItemsDataType(encoder: IWriter, value: PublishedDataItemsDataType, enc: Encoder): void {
    encodePublishedDataSetSourceDataType(encoder, value, enc); // encode base class
    encoder.writeArray(value.publishedData, (e, v) => encodePublishedVariableDataType(e, v, enc));
};

export function encodePublishedEventsDataType(encoder: IWriter, value: PublishedEventsDataType, enc: Encoder): void {
    encodePublishedDataSetSourceDataType(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.eventNotifier);
    encoder.writeArray(value.selectedFields, (e, v) => encodeSimpleAttributeOperand(e, v, enc));
    encodeContentFilter(encoder, value.filter, enc);
};

export function encodePublishedDataSetCustomSourceDataType(encoder: IWriter, value: PublishedDataSetCustomSourceDataType, enc: Encoder): void {
    encodePublishedDataSetSourceDataType(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.cyclicDataSet);
};

export function encodeActionTargetDataType(encoder: IWriter, value: ActionTargetDataType, enc: Encoder): void {
    encoder.writeUInt16(value.actionTargetId);
    encoder.writeString(value.name);
    encoder.writeLocalizedText(value.description);
};

export function encodePublishedActionDataType(encoder: IWriter, value: PublishedActionDataType, enc: Encoder): void {
    encodePublishedDataSetSourceDataType(encoder, value, enc); // encode base class
    encodeDataSetMetaDataType(encoder, value.requestDataSetMetaData, enc);
    encoder.writeArray(value.actionTargets, (e, v) => encodeActionTargetDataType(e, v, enc));
};

export function encodeActionMethodDataType(encoder: IWriter, value: ActionMethodDataType, enc: Encoder): void {
    encoder.writeNodeId(value.objectId);
    encoder.writeNodeId(value.methodId);
};

export function encodePublishedActionMethodDataType(encoder: IWriter, value: PublishedActionMethodDataType, enc: Encoder): void {
    encodePublishedActionDataType(encoder, value, enc); // encode base class
    encoder.writeArray(value.actionMethods, (e, v) => encodeActionMethodDataType(e, v, enc));
};

export function encodeDataSetWriterDataType(encoder: IWriter, value: DataSetWriterDataType, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeBoolean(value.enabled);
    encoder.writeUInt16(value.dataSetWriterId);
    encoder.writeUInt32(value.dataSetFieldContentMask);
    encoder.writeUInt32(value.keyFrameCount);
    encoder.writeString(value.dataSetName);
    encoder.writeArray(value.dataSetWriterProperties, (e, v) => encodeKeyValuePair(e, v, enc));
    encodeDataSetWriterTransportDataType(encoder, value.transportSettings, enc);
    encodeDataSetWriterMessageDataType(encoder, value.messageSettings, enc);
};

export function encodeDataSetWriterTransportDataType(encoder: IWriter, value: DataSetWriterTransportDataType, enc: Encoder): void {
};

export function encodeDataSetWriterMessageDataType(encoder: IWriter, value: DataSetWriterMessageDataType, enc: Encoder): void {
};

export function encodePubSubGroupDataType(encoder: IWriter, value: PubSubGroupDataType, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeBoolean(value.enabled);
    encoder.writeUInt32(value.securityMode); // enum
    encoder.writeString(value.securityGroupId);
    encoder.writeArray(value.securityKeyServices, (e, v) => encodeEndpointDescription(e, v, enc));
    encoder.writeUInt32(value.maxNetworkMessageSize);
    encoder.writeArray(value.groupProperties, (e, v) => encodeKeyValuePair(e, v, enc));
};

export function encodeWriterGroupDataType(encoder: IWriter, value: WriterGroupDataType, enc: Encoder): void {
    encodePubSubGroupDataType(encoder, value, enc); // encode base class
    encoder.writeUInt16(value.writerGroupId);
    encoder.writeDouble(value.publishingInterval);
    encoder.writeDouble(value.keepAliveTime);
    encoder.writeByte(value.priority);
    encoder.writeArray(value.localeIds, (e, v) => e.writeString(v));
    encoder.writeString(value.headerLayoutUri);
    encodeWriterGroupTransportDataType(encoder, value.transportSettings, enc);
    encodeWriterGroupMessageDataType(encoder, value.messageSettings, enc);
    encoder.writeArray(value.dataSetWriters, (e, v) => encodeDataSetWriterDataType(e, v, enc));
};

export function encodeWriterGroupTransportDataType(encoder: IWriter, value: WriterGroupTransportDataType, enc: Encoder): void {
};

export function encodeWriterGroupMessageDataType(encoder: IWriter, value: WriterGroupMessageDataType, enc: Encoder): void {
};

export function encodePubSubConnectionDataType(encoder: IWriter, value: PubSubConnectionDataType, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeBoolean(value.enabled);
    encoder.writeVariant(value.publisherId, enc);
    encoder.writeString(value.transportProfileUri);
    encodeNetworkAddressDataType(encoder, value.address, enc);
    encoder.writeArray(value.connectionProperties, (e, v) => encodeKeyValuePair(e, v, enc));
    encodeConnectionTransportDataType(encoder, value.transportSettings, enc);
    encoder.writeArray(value.writerGroups, (e, v) => encodeWriterGroupDataType(e, v, enc));
    encoder.writeArray(value.readerGroups, (e, v) => encodeReaderGroupDataType(e, v, enc));
};

export function encodeConnectionTransportDataType(encoder: IWriter, value: ConnectionTransportDataType, enc: Encoder): void {
};

export function encodeNetworkAddressDataType(encoder: IWriter, value: NetworkAddressDataType, enc: Encoder): void {
    encoder.writeString(value.networkInterface);
};

export function encodeNetworkAddressUrlDataType(encoder: IWriter, value: NetworkAddressUrlDataType, enc: Encoder): void {
    encodeNetworkAddressDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.url);
};

export function encodeReaderGroupDataType(encoder: IWriter, value: ReaderGroupDataType, enc: Encoder): void {
    encodePubSubGroupDataType(encoder, value, enc); // encode base class
    encodeReaderGroupTransportDataType(encoder, value.transportSettings, enc);
    encodeReaderGroupMessageDataType(encoder, value.messageSettings, enc);
    encoder.writeArray(value.dataSetReaders, (e, v) => encodeDataSetReaderDataType(e, v, enc));
};

export function encodeReaderGroupTransportDataType(encoder: IWriter, value: ReaderGroupTransportDataType, enc: Encoder): void {
};

export function encodeReaderGroupMessageDataType(encoder: IWriter, value: ReaderGroupMessageDataType, enc: Encoder): void {
};

export function encodeDataSetReaderDataType(encoder: IWriter, value: DataSetReaderDataType, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeBoolean(value.enabled);
    encoder.writeVariant(value.publisherId, enc);
    encoder.writeUInt16(value.writerGroupId);
    encoder.writeUInt16(value.dataSetWriterId);
    encodeDataSetMetaDataType(encoder, value.dataSetMetaData, enc);
    encoder.writeUInt32(value.dataSetFieldContentMask);
    encoder.writeDouble(value.messageReceiveTimeout);
    encoder.writeUInt32(value.keyFrameCount);
    encoder.writeString(value.headerLayoutUri);
    encoder.writeUInt32(value.securityMode); // enum
    encoder.writeString(value.securityGroupId);
    encoder.writeArray(value.securityKeyServices, (e, v) => encodeEndpointDescription(e, v, enc));
    encoder.writeArray(value.dataSetReaderProperties, (e, v) => encodeKeyValuePair(e, v, enc));
    encodeDataSetReaderTransportDataType(encoder, value.transportSettings, enc);
    encodeDataSetReaderMessageDataType(encoder, value.messageSettings, enc);
    encodeSubscribedDataSetDataType(encoder, value.subscribedDataSet, enc);
};

export function encodeDataSetReaderTransportDataType(encoder: IWriter, value: DataSetReaderTransportDataType, enc: Encoder): void {
};

export function encodeDataSetReaderMessageDataType(encoder: IWriter, value: DataSetReaderMessageDataType, enc: Encoder): void {
};

export function encodeSubscribedDataSetDataType(encoder: IWriter, value: SubscribedDataSetDataType, enc: Encoder): void {
};

export function encodeTargetVariablesDataType(encoder: IWriter, value: TargetVariablesDataType, enc: Encoder): void {
    encodeSubscribedDataSetDataType(encoder, value, enc); // encode base class
    encoder.writeArray(value.targetVariables, (e, v) => encodeFieldTargetDataType(e, v, enc));
};

export function encodeFieldTargetDataType(encoder: IWriter, value: FieldTargetDataType, enc: Encoder): void {
    encoder.writeGuid(value.dataSetFieldId);
    encoder.writeString(value.receiverIndexRange);
    encoder.writeNodeId(value.targetNodeId);
    encoder.writeUInt32(value.attributeId);
    encoder.writeString(value.writeIndexRange);
    encoder.writeUInt32(value.overrideValueHandling); // enum
    encoder.writeVariant(value.overrideValue, enc);
};

export function encodeSubscribedDataSetMirrorDataType(encoder: IWriter, value: SubscribedDataSetMirrorDataType, enc: Encoder): void {
    encodeSubscribedDataSetDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.parentNodeName);
    encoder.writeArray(value.rolePermissions, (e, v) => encodeRolePermissionType(e, v, enc));
};

export function encodePubSubConfigurationDataType(encoder: IWriter, value: PubSubConfigurationDataType, enc: Encoder): void {
    encoder.writeArray(value.publishedDataSets, (e, v) => encodePublishedDataSetDataType(e, v, enc));
    encoder.writeArray(value.connections, (e, v) => encodePubSubConnectionDataType(e, v, enc));
    encoder.writeBoolean(value.enabled);
};

export function encodeStandaloneSubscribedDataSetRefDataType(encoder: IWriter, value: StandaloneSubscribedDataSetRefDataType, enc: Encoder): void {
    encodeSubscribedDataSetDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.dataSetName);
};

export function encodeStandaloneSubscribedDataSetDataType(encoder: IWriter, value: StandaloneSubscribedDataSetDataType, enc: Encoder): void {
    encodeSubscribedDataSetDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.name);
    encoder.writeArray(value.dataSetFolder, (e, v) => e.writeString(v));
    encodeDataSetMetaDataType(encoder, value.dataSetMetaData, enc);
    encodeSubscribedDataSetDataType(encoder, value.subscribedDataSet, enc);
};

export function encodeSecurityGroupDataType(encoder: IWriter, value: SecurityGroupDataType, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeArray(value.securityGroupFolder, (e, v) => e.writeString(v));
    encoder.writeDouble(value.keyLifetime);
    encoder.writeString(value.securityPolicyUri);
    encoder.writeUInt32(value.maxFutureKeyCount);
    encoder.writeUInt32(value.maxPastKeyCount);
    encoder.writeString(value.securityGroupId);
    encoder.writeArray(value.rolePermissions, (e, v) => encodeRolePermissionType(e, v, enc));
    encoder.writeArray(value.groupProperties, (e, v) => encodeKeyValuePair(e, v, enc));
};

export function encodePubSubKeyPushTargetDataType(encoder: IWriter, value: PubSubKeyPushTargetDataType, enc: Encoder): void {
    encoder.writeString(value.applicationUri);
    encoder.writeArray(value.pushTargetFolder, (e, v) => e.writeString(v));
    encoder.writeString(value.endpointUrl);
    encoder.writeString(value.securityPolicyUri);
    encodeUserTokenPolicy(encoder, value.userTokenType, enc);
    encoder.writeUInt16(value.requestedKeyCount);
    encoder.writeDouble(value.retryInterval);
    encoder.writeArray(value.pushTargetProperties, (e, v) => encodeKeyValuePair(e, v, enc));
    encoder.writeArray(value.securityGroups, (e, v) => e.writeString(v));
};

export function encodePubSubConfiguration2DataType(encoder: IWriter, value: PubSubConfiguration2DataType, enc: Encoder): void {
    encodePubSubConfigurationDataType(encoder, value, enc); // encode base class
    encoder.writeArray(value.subscribedDataSets, (e, v) => encodeStandaloneSubscribedDataSetDataType(e, v, enc));
    encoder.writeArray(value.dataSetClasses, (e, v) => encodeDataSetMetaDataType(e, v, enc));
    encoder.writeArray(value.defaultSecurityKeyServices, (e, v) => encodeEndpointDescription(e, v, enc));
    encoder.writeArray(value.securityGroups, (e, v) => encodeSecurityGroupDataType(e, v, enc));
    encoder.writeArray(value.pubSubKeyPushTargets, (e, v) => encodePubSubKeyPushTargetDataType(e, v, enc));
    encoder.writeUInt32(value.configurationVersion);
    encoder.writeArray(value.configurationProperties, (e, v) => encodeKeyValuePair(e, v, enc));
};

export function encodeUadpWriterGroupMessageDataType(encoder: IWriter, value: UadpWriterGroupMessageDataType, enc: Encoder): void {
    encodeWriterGroupMessageDataType(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.groupVersion);
    encoder.writeUInt32(value.dataSetOrdering); // enum
    encoder.writeUInt32(value.networkMessageContentMask);
    encoder.writeDouble(value.samplingOffset);
    encoder.writeArray(value.publishingOffset, (e, v) => e.writeDouble(v));
};

export function encodeUadpDataSetWriterMessageDataType(encoder: IWriter, value: UadpDataSetWriterMessageDataType, enc: Encoder): void {
    encodeDataSetWriterMessageDataType(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.dataSetMessageContentMask);
    encoder.writeUInt16(value.configuredSize);
    encoder.writeUInt16(value.networkMessageNumber);
    encoder.writeUInt16(value.dataSetOffset);
};

export function encodeUadpDataSetReaderMessageDataType(encoder: IWriter, value: UadpDataSetReaderMessageDataType, enc: Encoder): void {
    encodeDataSetReaderMessageDataType(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.groupVersion);
    encoder.writeUInt16(value.networkMessageNumber);
    encoder.writeUInt16(value.dataSetOffset);
    encoder.writeGuid(value.dataSetClassId);
    encoder.writeUInt32(value.networkMessageContentMask);
    encoder.writeUInt32(value.dataSetMessageContentMask);
    encoder.writeDouble(value.publishingInterval);
    encoder.writeDouble(value.receiveOffset);
    encoder.writeDouble(value.processingOffset);
};

export function encodeJsonWriterGroupMessageDataType(encoder: IWriter, value: JsonWriterGroupMessageDataType, enc: Encoder): void {
    encodeWriterGroupMessageDataType(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.networkMessageContentMask);
};

export function encodeJsonDataSetWriterMessageDataType(encoder: IWriter, value: JsonDataSetWriterMessageDataType, enc: Encoder): void {
    encodeDataSetWriterMessageDataType(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.dataSetMessageContentMask);
};

export function encodeJsonDataSetReaderMessageDataType(encoder: IWriter, value: JsonDataSetReaderMessageDataType, enc: Encoder): void {
    encodeDataSetReaderMessageDataType(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.networkMessageContentMask);
    encoder.writeUInt32(value.dataSetMessageContentMask);
};

export function encodeQosDataType(encoder: IWriter, value: QosDataType, enc: Encoder): void {
};

export function encodeTransmitQosDataType(encoder: IWriter, value: TransmitQosDataType, enc: Encoder): void {
    encodeQosDataType(encoder, value, enc); // encode base class
};

export function encodeTransmitQosPriorityDataType(encoder: IWriter, value: TransmitQosPriorityDataType, enc: Encoder): void {
    encodeTransmitQosDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.priorityLabel);
};

export function encodeReceiveQosDataType(encoder: IWriter, value: ReceiveQosDataType, enc: Encoder): void {
    encodeQosDataType(encoder, value, enc); // encode base class
};

export function encodeReceiveQosPriorityDataType(encoder: IWriter, value: ReceiveQosPriorityDataType, enc: Encoder): void {
    encodeReceiveQosDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.priorityLabel);
};

export function encodeDatagramConnectionTransportDataType(encoder: IWriter, value: DatagramConnectionTransportDataType, enc: Encoder): void {
    encodeConnectionTransportDataType(encoder, value, enc); // encode base class
    encodeNetworkAddressDataType(encoder, value.discoveryAddress, enc);
};

export function encodeDatagramConnectionTransport2DataType(encoder: IWriter, value: DatagramConnectionTransport2DataType, enc: Encoder): void {
    encodeDatagramConnectionTransportDataType(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.discoveryAnnounceRate);
    encoder.writeUInt32(value.discoveryMaxMessageSize);
    encoder.writeString(value.qosCategory);
    encoder.writeArray(value.datagramQos, (e, v) => encodeQosDataType(e, v, enc));
};

export function encodeDatagramWriterGroupTransportDataType(encoder: IWriter, value: DatagramWriterGroupTransportDataType, enc: Encoder): void {
    encodeWriterGroupTransportDataType(encoder, value, enc); // encode base class
    encoder.writeByte(value.messageRepeatCount);
    encoder.writeDouble(value.messageRepeatDelay);
};

export function encodeDatagramWriterGroupTransport2DataType(encoder: IWriter, value: DatagramWriterGroupTransport2DataType, enc: Encoder): void {
    encodeDatagramWriterGroupTransportDataType(encoder, value, enc); // encode base class
    encodeNetworkAddressDataType(encoder, value.address, enc);
    encoder.writeString(value.qosCategory);
    encoder.writeArray(value.datagramQos, (e, v) => encodeTransmitQosDataType(e, v, enc));
    encoder.writeUInt32(value.discoveryAnnounceRate);
    encoder.writeString(value.topic);
};

export function encodeDatagramDataSetReaderTransportDataType(encoder: IWriter, value: DatagramDataSetReaderTransportDataType, enc: Encoder): void {
    encodeDataSetReaderTransportDataType(encoder, value, enc); // encode base class
    encodeNetworkAddressDataType(encoder, value.address, enc);
    encoder.writeString(value.qosCategory);
    encoder.writeArray(value.datagramQos, (e, v) => encodeReceiveQosDataType(e, v, enc));
    encoder.writeString(value.topic);
};

export function encodeDtlsPubSubConnectionDataType(encoder: IWriter, value: DtlsPubSubConnectionDataType, enc: Encoder): void {
    encoder.writeString(value.clientCipherSuite);
    encoder.writeArray(value.serverCipherSuites, (e, v) => e.writeString(v));
    encoder.writeBoolean(value.zeroRTT);
    encoder.writeNodeId(value.certificateGroupId);
    encoder.writeBoolean(value.verifyClientCertificate);
};

export function encodeBrokerConnectionTransportDataType(encoder: IWriter, value: BrokerConnectionTransportDataType, enc: Encoder): void {
    encodeConnectionTransportDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.resourceUri);
    encoder.writeString(value.authenticationProfileUri);
};

export function encodeBrokerWriterGroupTransportDataType(encoder: IWriter, value: BrokerWriterGroupTransportDataType, enc: Encoder): void {
    encodeWriterGroupTransportDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.queueName);
    encoder.writeString(value.resourceUri);
    encoder.writeString(value.authenticationProfileUri);
    encoder.writeUInt32(value.requestedDeliveryGuarantee); // enum
};

export function encodeBrokerDataSetWriterTransportDataType(encoder: IWriter, value: BrokerDataSetWriterTransportDataType, enc: Encoder): void {
    encodeDataSetWriterTransportDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.queueName);
    encoder.writeString(value.resourceUri);
    encoder.writeString(value.authenticationProfileUri);
    encoder.writeUInt32(value.requestedDeliveryGuarantee); // enum
    encoder.writeString(value.metaDataQueueName);
    encoder.writeDouble(value.metaDataUpdateTime);
};

export function encodeBrokerDataSetReaderTransportDataType(encoder: IWriter, value: BrokerDataSetReaderTransportDataType, enc: Encoder): void {
    encodeDataSetReaderTransportDataType(encoder, value, enc); // encode base class
    encoder.writeString(value.queueName);
    encoder.writeString(value.resourceUri);
    encoder.writeString(value.authenticationProfileUri);
    encoder.writeUInt32(value.requestedDeliveryGuarantee); // enum
    encoder.writeString(value.metaDataQueueName);
};

export function encodePubSubConfigurationRefDataType(encoder: IWriter, value: PubSubConfigurationRefDataType, enc: Encoder): void {
    encoder.writeUInt32(value.configurationMask);
    encoder.writeUInt16(value.elementIndex);
    encoder.writeUInt16(value.connectionIndex);
    encoder.writeUInt16(value.groupIndex);
};

export function encodePubSubConfigurationValueDataType(encoder: IWriter, value: PubSubConfigurationValueDataType, enc: Encoder): void {
    encodePubSubConfigurationRefDataType(encoder, value.configurationElement, enc);
    encoder.writeString(value.name);
    encoder.writeVariant(value.identifier, enc);
};

export function encodeJsonNetworkMessage(encoder: IWriter, value: JsonNetworkMessage, enc: Encoder): void {
    encoder.writeString(value.messageId);
    encoder.writeString(value.messageType);
    encoder.writeString(value.publisherId);
    encoder.writeString(value.writerGroupName);
    encoder.writeString(value.dataSetClassId);
    encoder.writeExtensionObject(value.messages, enc);
};

export function encodeJsonDataSetMessage(encoder: IWriter, value: JsonDataSetMessage, enc: Encoder): void {
    encoder.writeUInt16(value.dataSetWriterId);
    encoder.writeString(value.dataSetWriterName);
    encoder.writeString(value.publisherId);
    encoder.writeString(value.writerGroupName);
    encoder.writeUInt32(value.sequenceNumber);
    encodeConfigurationVersionDataType(encoder, value.metaDataVersion, enc);
    encoder.writeUInt32(value.minorVersion);
    encoder.writeDateTime(value.timestamp);
    encoder.writeStatusCode(value.status);
    encoder.writeString(value.messageType);
    encoder.writeExtensionObject(value.payload, enc);
};

export function encodeJsonDataSetMetaDataMessage(encoder: IWriter, value: JsonDataSetMetaDataMessage, enc: Encoder): void {
    encoder.writeString(value.messageId);
    encoder.writeString(value.messageType);
    encoder.writeString(value.publisherId);
    encoder.writeUInt16(value.dataSetWriterId);
    encoder.writeString(value.writerGroupName);
    encoder.writeString(value.dataSetWriterName);
    encoder.writeDateTime(value.timestamp);
    encodeDataSetMetaDataType(encoder, value.metaData, enc);
};

export function encodeJsonApplicationDescriptionMessage(encoder: IWriter, value: JsonApplicationDescriptionMessage, enc: Encoder): void {
    encoder.writeString(value.messageId);
    encoder.writeString(value.messageType);
    encoder.writeString(value.publisherId);
    encoder.writeDateTime(value.timestamp);
    encodeApplicationDescription(encoder, value.description, enc);
    encoder.writeArray(value.serverCapabilities, (e, v) => e.writeString(v));
};

export function encodeJsonServerEndpointsMessage(encoder: IWriter, value: JsonServerEndpointsMessage, enc: Encoder): void {
    encoder.writeString(value.messageId);
    encoder.writeString(value.messageType);
    encoder.writeString(value.publisherId);
    encoder.writeDateTime(value.timestamp);
    encodeApplicationDescription(encoder, value.description, enc);
    encoder.writeArray(value.endpoints, (e, v) => encodeEndpointDescription(e, v, enc));
};

export function encodeJsonStatusMessage(encoder: IWriter, value: JsonStatusMessage, enc: Encoder): void {
    encoder.writeString(value.messageId);
    encoder.writeString(value.messageType);
    encoder.writeString(value.publisherId);
    encoder.writeDateTime(value.timestamp);
    encoder.writeBoolean(value.isCyclic);
    encoder.writeUInt32(value.status); // enum
    encoder.writeDateTime(value.nextReportTime);
};

export function encodeJsonPubSubConnectionMessage(encoder: IWriter, value: JsonPubSubConnectionMessage, enc: Encoder): void {
    encoder.writeString(value.messageId);
    encoder.writeString(value.messageType);
    encoder.writeString(value.publisherId);
    encoder.writeDateTime(value.timestamp);
    encodePubSubConnectionDataType(encoder, value.connection, enc);
};

export function encodeJsonActionMetaDataMessage(encoder: IWriter, value: JsonActionMetaDataMessage, enc: Encoder): void {
    encoder.writeString(value.messageId);
    encoder.writeString(value.messageType);
    encoder.writeString(value.publisherId);
    encoder.writeUInt16(value.dataSetWriterId);
    encoder.writeString(value.dataSetWriterName);
    encoder.writeDateTime(value.timestamp);
    encoder.writeArray(value.actionTargets, (e, v) => encodeActionTargetDataType(e, v, enc));
    encodeDataSetMetaDataType(encoder, value.request, enc);
    encodeDataSetMetaDataType(encoder, value.response, enc);
    encoder.writeArray(value.actionMethods, (e, v) => encodeActionMethodDataType(e, v, enc));
};

export function encodeJsonActionResponderMessage(encoder: IWriter, value: JsonActionResponderMessage, enc: Encoder): void {
    encoder.writeString(value.messageId);
    encoder.writeString(value.messageType);
    encoder.writeString(value.publisherId);
    encoder.writeDateTime(value.timestamp);
    encodePubSubConnectionDataType(encoder, value.connection, enc);
};

export function encodeJsonActionNetworkMessage(encoder: IWriter, value: JsonActionNetworkMessage, enc: Encoder): void {
    encoder.writeString(value.messageId);
    encoder.writeString(value.messageType);
    encoder.writeString(value.publisherId);
    encoder.writeDateTime(value.timestamp);
    encoder.writeString(value.responseAddress);
    encoder.writeByteString(value.correlationData);
    encoder.writeString(value.requestorId);
    encoder.writeDouble(value.timeoutHint);
    encoder.writeArray(value.messages, (e, v) => e.writeExtensionObject(v, enc));
};

export function encodeJsonActionRequestMessage(encoder: IWriter, value: JsonActionRequestMessage, enc: Encoder): void {
    encoder.writeUInt16(value.dataSetWriterId);
    encoder.writeUInt16(value.actionTargetId);
    encoder.writeString(value.dataSetWriterName);
    encoder.writeString(value.writerGroupName);
    encodeConfigurationVersionDataType(encoder, value.metaDataVersion, enc);
    encoder.writeUInt32(value.minorVersion);
    encoder.writeDateTime(value.timestamp);
    encoder.writeString(value.messageType);
    encoder.writeUInt16(value.requestId);
    encoder.writeUInt32(value.actionState); // enum
    encoder.writeExtensionObject(value.payload, enc);
};

export function encodeJsonActionResponseMessage(encoder: IWriter, value: JsonActionResponseMessage, enc: Encoder): void {
    encoder.writeUInt16(value.dataSetWriterId);
    encoder.writeUInt16(value.actionTargetId);
    encoder.writeString(value.dataSetWriterName);
    encoder.writeString(value.writerGroupName);
    encodeConfigurationVersionDataType(encoder, value.metaDataVersion, enc);
    encoder.writeUInt32(value.minorVersion);
    encoder.writeDateTime(value.timestamp);
    encoder.writeStatusCode(value.status);
    encoder.writeString(value.messageType);
    encoder.writeUInt16(value.requestId);
    encoder.writeUInt32(value.actionState); // enum
    encoder.writeExtensionObject(value.payload, enc);
};

export function encodeAliasNameDataType(encoder: IWriter, value: AliasNameDataType, enc: Encoder): void {
    encoder.writeQualifiedName(value.aliasName);
    encoder.writeArray(value.referencedNodes, (e, v) => e.writeExpandedNodeId(v));
};

export function encodeUserManagementDataType(encoder: IWriter, value: UserManagementDataType, enc: Encoder): void {
    encoder.writeString(value.userName);
    encoder.writeUInt32(value.userConfiguration);
    encoder.writeString(value.description);
};

export function encodePriorityMappingEntryType(encoder: IWriter, value: PriorityMappingEntryType, enc: Encoder): void {
    encoder.writeString(value.mappingUri);
    encoder.writeString(value.priorityLabel);
    encoder.writeByte(value.priorityValue_PCP);
    encoder.writeUInt32(value.priorityValue_DSCP);
};

export function encodeLldpManagementAddressTxPortType(encoder: IWriter, value: LldpManagementAddressTxPortType, enc: Encoder): void {
    encoder.writeUInt32(value.addressSubtype);
    encoder.writeString(value.manAddress);
    encoder.writeBoolean(value.txEnable);
    encoder.writeUInt32(value.addrLen);
    encoder.writeUInt32(value.ifSubtype); // enum
    encoder.writeUInt32(value.ifId);
};

export function encodeLldpManagementAddressType(encoder: IWriter, value: LldpManagementAddressType, enc: Encoder): void {
    encoder.writeUInt32(value.addressSubtype);
    encoder.writeString(value.address);
    encoder.writeUInt32(value.ifSubtype); // enum
    encoder.writeUInt32(value.ifId);
};

export function encodeLldpTlvType(encoder: IWriter, value: LldpTlvType, enc: Encoder): void {
    encoder.writeUInt32(value.tlvType);
    encoder.writeByteString(value.tlvInfo);
};

export function encodeReferenceDescriptionDataType(encoder: IWriter, value: ReferenceDescriptionDataType, enc: Encoder): void {
    encoder.writeNodeId(value.sourceNode);
    encoder.writeNodeId(value.referenceType);
    encoder.writeBoolean(value.isForward);
    encoder.writeExpandedNodeId(value.targetNode);
};

export function encodeReferenceListEntryDataType(encoder: IWriter, value: ReferenceListEntryDataType, enc: Encoder): void {
    encoder.writeNodeId(value.referenceType);
    encoder.writeBoolean(value.isForward);
    encoder.writeExpandedNodeId(value.targetNode);
};

export function encodeLogRecord(encoder: IWriter, value: LogRecord, enc: Encoder): void {
    let encodingMask = 0;
    if (value.eventType != null) encodingMask |= (1 << 0);
    if (value.sourceNode != null) encodingMask |= (1 << 1);
    if (value.sourceName != null) encodingMask |= (1 << 2);
    if (value.traceContext != null) encodingMask |= (1 << 3);
    if (value.additionalData != null) encodingMask |= (1 << 4);
    encoder.writeUInt32(encodingMask);
    encoder.writeDateTime(value.time);
    encoder.writeUInt16(value.severity);
    if (encodingMask & (1 << 0)) { encoder.writeNodeId(value.eventType!); } // optional
    if (encodingMask & (1 << 1)) { encoder.writeNodeId(value.sourceNode!); } // optional
    if (encodingMask & (1 << 2)) { encoder.writeString(value.sourceName!); } // optional
    encoder.writeLocalizedText(value.message);
    if (encodingMask & (1 << 3)) { encodeTraceContextDataType(encoder, value.traceContext!, enc); } // optional
    if (encodingMask & (1 << 4)) { encoder.writeArray(value.additionalData!, (e, v) => encodeNameValuePair(e, v, enc)); } // optional
};

export function encodeLogRecordsDataType(encoder: IWriter, value: LogRecordsDataType, enc: Encoder): void {
    encoder.writeArray(value.logRecordArray, (e, v) => encodeLogRecord(e, v, enc));
};

export function encodeSpanContextDataType(encoder: IWriter, value: SpanContextDataType, enc: Encoder): void {
    encoder.writeGuid(value.traceId);
    encoder.writeUInt64(value.spanId);
};

export function encodeTraceContextDataType(encoder: IWriter, value: TraceContextDataType, enc: Encoder): void {
    encodeSpanContextDataType(encoder, value, enc); // encode base class
    encoder.writeUInt64(value.parentSpanId);
    encoder.writeString(value.parentIdentifier);
};

export function encodeNameValuePair(encoder: IWriter, value: NameValuePair, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeVariant(value.value, enc);
};

export function encodeRolePermissionType(encoder: IWriter, value: RolePermissionType, enc: Encoder): void {
    encoder.writeNodeId(value.roleId);
    encoder.writeUInt32(value.permissions);
};

export function encodeDataTypeDefinition(encoder: IWriter, value: DataTypeDefinition, enc: Encoder): void {
};

export function encodeStructureField(encoder: IWriter, value: StructureField, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeLocalizedText(value.description);
    encoder.writeNodeId(value.dataType);
    encoder.writeInt32(value.valueRank);
    encoder.writeArray(value.arrayDimensions, (e, v) => e.writeUInt32(v));
    encoder.writeUInt32(value.maxStringLength);
    encoder.writeBoolean(value.isOptional);
};

export function encodeStructureDefinition(encoder: IWriter, value: StructureDefinition, enc: Encoder): void {
    encodeDataTypeDefinition(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.defaultEncodingId);
    encoder.writeNodeId(value.baseDataType);
    encoder.writeUInt32(value.structureType); // enum
    encoder.writeArray(value.fields, (e, v) => encodeStructureField(e, v, enc));
};

export function encodeEnumDefinition(encoder: IWriter, value: EnumDefinition, enc: Encoder): void {
    encodeDataTypeDefinition(encoder, value, enc); // encode base class
    encoder.writeArray(value.fields, (e, v) => encodeEnumField(e, v, enc));
};

export function encodeNode(encoder: IWriter, value: Node, enc: Encoder): void {
    encoder.writeNodeId(value.nodeId);
    encoder.writeUInt32(value.nodeClass); // enum
    encoder.writeQualifiedName(value.browseName);
    encoder.writeLocalizedText(value.displayName);
    encoder.writeLocalizedText(value.description);
    encoder.writeUInt32(value.writeMask);
    encoder.writeUInt32(value.userWriteMask);
    encoder.writeArray(value.rolePermissions, (e, v) => encodeRolePermissionType(e, v, enc));
    encoder.writeArray(value.userRolePermissions, (e, v) => encodeRolePermissionType(e, v, enc));
    encoder.writeUInt16(value.accessRestrictions);
    encoder.writeArray(value.references, (e, v) => encodeReferenceNode(e, v, enc));
};

export function encodeInstanceNode(encoder: IWriter, value: InstanceNode, enc: Encoder): void {
    encodeNode(encoder, value, enc); // encode base class
};

export function encodeTypeNode(encoder: IWriter, value: TypeNode, enc: Encoder): void {
    encodeNode(encoder, value, enc); // encode base class
};

export function encodeObjectNode(encoder: IWriter, value: ObjectNode, enc: Encoder): void {
    encodeInstanceNode(encoder, value, enc); // encode base class
    encoder.writeByte(value.eventNotifier);
};

export function encodeObjectTypeNode(encoder: IWriter, value: ObjectTypeNode, enc: Encoder): void {
    encodeTypeNode(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.isAbstract);
};

export function encodeVariableNode(encoder: IWriter, value: VariableNode, enc: Encoder): void {
    encodeInstanceNode(encoder, value, enc); // encode base class
    encoder.writeVariant(value.value, enc);
    encoder.writeNodeId(value.dataType);
    encoder.writeInt32(value.valueRank);
    encoder.writeArray(value.arrayDimensions, (e, v) => e.writeUInt32(v));
    encoder.writeByte(value.accessLevel);
    encoder.writeByte(value.userAccessLevel);
    encoder.writeDouble(value.minimumSamplingInterval);
    encoder.writeBoolean(value.historizing);
    encoder.writeUInt32(value.accessLevelEx);
};

export function encodeVariableTypeNode(encoder: IWriter, value: VariableTypeNode, enc: Encoder): void {
    encodeTypeNode(encoder, value, enc); // encode base class
    encoder.writeVariant(value.value, enc);
    encoder.writeNodeId(value.dataType);
    encoder.writeInt32(value.valueRank);
    encoder.writeArray(value.arrayDimensions, (e, v) => e.writeUInt32(v));
    encoder.writeBoolean(value.isAbstract);
};

export function encodeReferenceTypeNode(encoder: IWriter, value: ReferenceTypeNode, enc: Encoder): void {
    encodeTypeNode(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.isAbstract);
    encoder.writeBoolean(value.symmetric);
    encoder.writeLocalizedText(value.inverseName);
};

export function encodeMethodNode(encoder: IWriter, value: MethodNode, enc: Encoder): void {
    encodeInstanceNode(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.executable);
    encoder.writeBoolean(value.userExecutable);
};

export function encodeViewNode(encoder: IWriter, value: ViewNode, enc: Encoder): void {
    encodeInstanceNode(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.containsNoLoops);
    encoder.writeByte(value.eventNotifier);
};

export function encodeDataTypeNode(encoder: IWriter, value: DataTypeNode, enc: Encoder): void {
    encodeTypeNode(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.isAbstract);
    encoder.writeExtensionObject(value.dataTypeDefinition, enc);
};

export function encodeReferenceNode(encoder: IWriter, value: ReferenceNode, enc: Encoder): void {
    encoder.writeNodeId(value.referenceTypeId);
    encoder.writeBoolean(value.isInverse);
    encoder.writeExpandedNodeId(value.targetId);
};

export function encodeArgument(encoder: IWriter, value: Argument, enc: Encoder): void {
    encoder.writeString(value.name);
    encoder.writeNodeId(value.dataType);
    encoder.writeInt32(value.valueRank);
    encoder.writeArray(value.arrayDimensions, (e, v) => e.writeUInt32(v));
    encoder.writeLocalizedText(value.description);
};

export function encodeEnumValueType(encoder: IWriter, value: EnumValueType, enc: Encoder): void {
    encoder.writeInt64(value.value);
    encoder.writeLocalizedText(value.displayName);
    encoder.writeLocalizedText(value.description);
};

export function encodeEnumField(encoder: IWriter, value: EnumField, enc: Encoder): void {
    encodeEnumValueType(encoder, value, enc); // encode base class
    encoder.writeString(value.name);
};

export function encodeOptionSet(encoder: IWriter, value: OptionSet, enc: Encoder): void {
    encoder.writeByteString(value.value);
    encoder.writeByteString(value.validBits);
};

export function encodeTimeZoneDataType(encoder: IWriter, value: TimeZoneDataType, enc: Encoder): void {
    encoder.writeInt16(value.offset);
    encoder.writeBoolean(value.daylightSavingInOffset);
};

export function encodeApplicationDescription(encoder: IWriter, value: ApplicationDescription, enc: Encoder): void {
    encoder.writeString(value.applicationUri);
    encoder.writeString(value.productUri);
    encoder.writeLocalizedText(value.applicationName);
    encoder.writeUInt32(value.applicationType); // enum
    encoder.writeString(value.gatewayServerUri);
    encoder.writeString(value.discoveryProfileUri);
    encoder.writeArray(value.discoveryUrls, (e, v) => e.writeString(v));
};

export function encodeRequestHeader(encoder: IWriter, value: RequestHeader, enc: Encoder): void {
    encoder.writeNodeId(value.authenticationToken);
    encoder.writeDateTime(value.timestamp);
    encoder.writeUInt32(value.requestHandle);
    encoder.writeUInt32(value.returnDiagnostics);
    encoder.writeString(value.auditEntryId);
    encoder.writeUInt32(value.timeoutHint);
    encoder.writeExtensionObject(value.additionalHeader, enc);
};

export function encodeResponseHeader(encoder: IWriter, value: ResponseHeader, enc: Encoder): void {
    encoder.writeDateTime(value.timestamp);
    encoder.writeUInt32(value.requestHandle);
    encoder.writeStatusCode(value.serviceResult);
    encoder.writeDiagnosticInfo(value.serviceDiagnostics);
    encoder.writeArray(value.stringTable, (e, v) => e.writeString(v));
    encoder.writeExtensionObject(value.additionalHeader, enc);
};

export function encodeServiceFault(encoder: IWriter, value: ServiceFault, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
};

export function encodeSessionlessInvokeRequestType(encoder: IWriter, value: SessionlessInvokeRequestType, enc: Encoder): void {
    encoder.writeUInt32(value.urisVersion);
    encoder.writeArray(value.namespaceUris, (e, v) => e.writeString(v));
    encoder.writeArray(value.serverUris, (e, v) => e.writeString(v));
    encoder.writeArray(value.localeIds, (e, v) => e.writeString(v));
    encoder.writeUInt32(value.serviceId);
};

export function encodeSessionlessInvokeResponseType(encoder: IWriter, value: SessionlessInvokeResponseType, enc: Encoder): void {
    encoder.writeArray(value.namespaceUris, (e, v) => e.writeString(v));
    encoder.writeArray(value.serverUris, (e, v) => e.writeString(v));
    encoder.writeUInt32(value.serviceId);
};

export function encodeFindServersRequest(encoder: IWriter, value: FindServersRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeString(value.endpointUrl);
    encoder.writeArray(value.localeIds, (e, v) => e.writeString(v));
    encoder.writeArray(value.serverUris, (e, v) => e.writeString(v));
};

export function encodeFindServersResponse(encoder: IWriter, value: FindServersResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.servers, (e, v) => encodeApplicationDescription(e, v, enc));
};

export function encodeServerOnNetwork(encoder: IWriter, value: ServerOnNetwork, enc: Encoder): void {
    encoder.writeUInt32(value.recordId);
    encoder.writeString(value.serverName);
    encoder.writeString(value.discoveryUrl);
    encoder.writeArray(value.serverCapabilities, (e, v) => e.writeString(v));
};

export function encodeFindServersOnNetworkRequest(encoder: IWriter, value: FindServersOnNetworkRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeUInt32(value.startingRecordId);
    encoder.writeUInt32(value.maxRecordsToReturn);
    encoder.writeArray(value.serverCapabilityFilter, (e, v) => e.writeString(v));
};

export function encodeFindServersOnNetworkResponse(encoder: IWriter, value: FindServersOnNetworkResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeDateTime(value.lastCounterResetTime);
    encoder.writeArray(value.servers, (e, v) => encodeServerOnNetwork(e, v, enc));
};

export function encodeUserTokenPolicy(encoder: IWriter, value: UserTokenPolicy, enc: Encoder): void {
    encoder.writeString(value.policyId);
    encoder.writeUInt32(value.tokenType); // enum
    encoder.writeString(value.issuedTokenType);
    encoder.writeString(value.issuerEndpointUrl);
    encoder.writeString(value.securityPolicyUri);
};

export function encodeEndpointDescription(encoder: IWriter, value: EndpointDescription, enc: Encoder): void {
    encoder.writeString(value.endpointUrl);
    encodeApplicationDescription(encoder, value.server, enc);
    encoder.writeByteString(value.serverCertificate);
    encoder.writeUInt32(value.securityMode); // enum
    encoder.writeString(value.securityPolicyUri);
    encoder.writeArray(value.userIdentityTokens, (e, v) => encodeUserTokenPolicy(e, v, enc));
    encoder.writeString(value.transportProfileUri);
    encoder.writeByte(value.securityLevel);
};

export function encodeGetEndpointsRequest(encoder: IWriter, value: GetEndpointsRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeString(value.endpointUrl);
    encoder.writeArray(value.localeIds, (e, v) => e.writeString(v));
    encoder.writeArray(value.profileUris, (e, v) => e.writeString(v));
};

export function encodeGetEndpointsResponse(encoder: IWriter, value: GetEndpointsResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.endpoints, (e, v) => encodeEndpointDescription(e, v, enc));
};

export function encodeRegisteredServer(encoder: IWriter, value: RegisteredServer, enc: Encoder): void {
    encoder.writeString(value.serverUri);
    encoder.writeString(value.productUri);
    encoder.writeArray(value.serverNames, (e, v) => e.writeLocalizedText(v));
    encoder.writeUInt32(value.serverType); // enum
    encoder.writeString(value.gatewayServerUri);
    encoder.writeArray(value.discoveryUrls, (e, v) => e.writeString(v));
    encoder.writeString(value.semaphoreFilePath);
    encoder.writeBoolean(value.isOnline);
};

export function encodeRegisterServerRequest(encoder: IWriter, value: RegisterServerRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encodeRegisteredServer(encoder, value.server, enc);
};

export function encodeRegisterServerResponse(encoder: IWriter, value: RegisterServerResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
};

export function encodeDiscoveryConfiguration(encoder: IWriter, value: DiscoveryConfiguration, enc: Encoder): void {
};

export function encodeMdnsDiscoveryConfiguration(encoder: IWriter, value: MdnsDiscoveryConfiguration, enc: Encoder): void {
    encodeDiscoveryConfiguration(encoder, value, enc); // encode base class
    encoder.writeString(value.mdnsServerName);
    encoder.writeArray(value.serverCapabilities, (e, v) => e.writeString(v));
};

export function encodeRegisterServer2Request(encoder: IWriter, value: RegisterServer2Request, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encodeRegisteredServer(encoder, value.server, enc);
    encoder.writeArray(value.discoveryConfiguration, (e, v) => e.writeExtensionObject(v, enc));
};

export function encodeRegisterServer2Response(encoder: IWriter, value: RegisterServer2Response, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.configurationResults, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeChannelSecurityToken(encoder: IWriter, value: ChannelSecurityToken, enc: Encoder): void {
    encoder.writeUInt32(value.channelId);
    encoder.writeUInt32(value.tokenId);
    encoder.writeDateTime(value.createdAt);
    encoder.writeUInt32(value.revisedLifetime);
};

export function encodeOpenSecureChannelRequest(encoder: IWriter, value: OpenSecureChannelRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeUInt32(value.clientProtocolVersion);
    encoder.writeUInt32(value.requestType); // enum
    encoder.writeUInt32(value.securityMode); // enum
    encoder.writeByteString(value.clientNonce);
    encoder.writeUInt32(value.requestedLifetime);
};

export function encodeOpenSecureChannelResponse(encoder: IWriter, value: OpenSecureChannelResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeUInt32(value.serverProtocolVersion);
    encodeChannelSecurityToken(encoder, value.securityToken, enc);
    encoder.writeByteString(value.serverNonce);
};

export function encodeCloseSecureChannelRequest(encoder: IWriter, value: CloseSecureChannelRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
};

export function encodeCloseSecureChannelResponse(encoder: IWriter, value: CloseSecureChannelResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
};

export function encodeSignedSoftwareCertificate(encoder: IWriter, value: SignedSoftwareCertificate, enc: Encoder): void {
    encoder.writeByteString(value.certificateData);
    encoder.writeByteString(value.signature);
};

export function encodeSignatureData(encoder: IWriter, value: SignatureData, enc: Encoder): void {
    encoder.writeString(value.algorithm);
    encoder.writeByteString(value.signature);
};

export function encodeCreateSessionRequest(encoder: IWriter, value: CreateSessionRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encodeApplicationDescription(encoder, value.clientDescription, enc);
    encoder.writeString(value.serverUri);
    encoder.writeString(value.endpointUrl);
    encoder.writeString(value.sessionName);
    encoder.writeByteString(value.clientNonce);
    encoder.writeByteString(value.clientCertificate);
    encoder.writeDouble(value.requestedSessionTimeout);
    encoder.writeUInt32(value.maxResponseMessageSize);
};

export function encodeCreateSessionResponse(encoder: IWriter, value: CreateSessionResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeNodeId(value.sessionId);
    encoder.writeNodeId(value.authenticationToken);
    encoder.writeDouble(value.revisedSessionTimeout);
    encoder.writeByteString(value.serverNonce);
    encoder.writeByteString(value.serverCertificate);
    encoder.writeArray(value.serverEndpoints, (e, v) => encodeEndpointDescription(e, v, enc));
    encoder.writeArray(value.serverSoftwareCertificates, (e, v) => encodeSignedSoftwareCertificate(e, v, enc));
    encodeSignatureData(encoder, value.serverSignature, enc);
    encoder.writeUInt32(value.maxRequestMessageSize);
};

export function encodeUserIdentityToken(encoder: IWriter, value: UserIdentityToken, enc: Encoder): void {
    encoder.writeString(value.policyId);
};

export function encodeAnonymousIdentityToken(encoder: IWriter, value: AnonymousIdentityToken, enc: Encoder): void {
    encodeUserIdentityToken(encoder, value, enc); // encode base class
};

export function encodeUserNameIdentityToken(encoder: IWriter, value: UserNameIdentityToken, enc: Encoder): void {
    encodeUserIdentityToken(encoder, value, enc); // encode base class
    encoder.writeString(value.userName);
    encoder.writeByteString(value.password);
    encoder.writeString(value.encryptionAlgorithm);
};

export function encodeX509IdentityToken(encoder: IWriter, value: X509IdentityToken, enc: Encoder): void {
    encodeUserIdentityToken(encoder, value, enc); // encode base class
    encoder.writeByteString(value.certificateData);
};

export function encodeIssuedIdentityToken(encoder: IWriter, value: IssuedIdentityToken, enc: Encoder): void {
    encodeUserIdentityToken(encoder, value, enc); // encode base class
    encoder.writeByteString(value.tokenData);
    encoder.writeString(value.encryptionAlgorithm);
};

export function encodeActivateSessionRequest(encoder: IWriter, value: ActivateSessionRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encodeSignatureData(encoder, value.clientSignature, enc);
    encoder.writeArray(value.clientSoftwareCertificates, (e, v) => encodeSignedSoftwareCertificate(e, v, enc));
    encoder.writeArray(value.localeIds, (e, v) => e.writeString(v));
    encoder.writeExtensionObject(value.userIdentityToken, enc);
    encodeSignatureData(encoder, value.userTokenSignature, enc);
};

export function encodeActivateSessionResponse(encoder: IWriter, value: ActivateSessionResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeByteString(value.serverNonce);
    encoder.writeArray(value.results, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeCloseSessionRequest(encoder: IWriter, value: CloseSessionRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeBoolean(value.deleteSubscriptions);
};

export function encodeCloseSessionResponse(encoder: IWriter, value: CloseSessionResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
};

export function encodeCancelRequest(encoder: IWriter, value: CancelRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeUInt32(value.requestHandle);
};

export function encodeCancelResponse(encoder: IWriter, value: CancelResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeUInt32(value.cancelCount);
};

export function encodeNodeAttributes(encoder: IWriter, value: NodeAttributes, enc: Encoder): void {
    encoder.writeUInt32(value.specifiedAttributes);
    encoder.writeLocalizedText(value.displayName);
    encoder.writeLocalizedText(value.description);
    encoder.writeUInt32(value.writeMask);
    encoder.writeUInt32(value.userWriteMask);
};

export function encodeObjectAttributes(encoder: IWriter, value: ObjectAttributes, enc: Encoder): void {
    encodeNodeAttributes(encoder, value, enc); // encode base class
    encoder.writeByte(value.eventNotifier);
};

export function encodeVariableAttributes(encoder: IWriter, value: VariableAttributes, enc: Encoder): void {
    encodeNodeAttributes(encoder, value, enc); // encode base class
    encoder.writeVariant(value.value, enc);
    encoder.writeNodeId(value.dataType);
    encoder.writeInt32(value.valueRank);
    encoder.writeArray(value.arrayDimensions, (e, v) => e.writeUInt32(v));
    encoder.writeByte(value.accessLevel);
    encoder.writeByte(value.userAccessLevel);
    encoder.writeDouble(value.minimumSamplingInterval);
    encoder.writeBoolean(value.historizing);
};

export function encodeMethodAttributes(encoder: IWriter, value: MethodAttributes, enc: Encoder): void {
    encodeNodeAttributes(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.executable);
    encoder.writeBoolean(value.userExecutable);
};

export function encodeObjectTypeAttributes(encoder: IWriter, value: ObjectTypeAttributes, enc: Encoder): void {
    encodeNodeAttributes(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.isAbstract);
};

export function encodeVariableTypeAttributes(encoder: IWriter, value: VariableTypeAttributes, enc: Encoder): void {
    encodeNodeAttributes(encoder, value, enc); // encode base class
    encoder.writeVariant(value.value, enc);
    encoder.writeNodeId(value.dataType);
    encoder.writeInt32(value.valueRank);
    encoder.writeArray(value.arrayDimensions, (e, v) => e.writeUInt32(v));
    encoder.writeBoolean(value.isAbstract);
};

export function encodeReferenceTypeAttributes(encoder: IWriter, value: ReferenceTypeAttributes, enc: Encoder): void {
    encodeNodeAttributes(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.isAbstract);
    encoder.writeBoolean(value.symmetric);
    encoder.writeLocalizedText(value.inverseName);
};

export function encodeDataTypeAttributes(encoder: IWriter, value: DataTypeAttributes, enc: Encoder): void {
    encodeNodeAttributes(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.isAbstract);
};

export function encodeViewAttributes(encoder: IWriter, value: ViewAttributes, enc: Encoder): void {
    encodeNodeAttributes(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.containsNoLoops);
    encoder.writeByte(value.eventNotifier);
};

export function encodeGenericAttributeValue(encoder: IWriter, value: GenericAttributeValue, enc: Encoder): void {
    encoder.writeUInt32(value.attributeId);
    encoder.writeVariant(value.value, enc);
};

export function encodeGenericAttributes(encoder: IWriter, value: GenericAttributes, enc: Encoder): void {
    encodeNodeAttributes(encoder, value, enc); // encode base class
    encoder.writeArray(value.attributeValues, (e, v) => encodeGenericAttributeValue(e, v, enc));
};

export function encodeAddNodesItem(encoder: IWriter, value: AddNodesItem, enc: Encoder): void {
    encoder.writeExpandedNodeId(value.parentNodeId);
    encoder.writeNodeId(value.referenceTypeId);
    encoder.writeExpandedNodeId(value.requestedNewNodeId);
    encoder.writeQualifiedName(value.browseName);
    encoder.writeUInt32(value.nodeClass); // enum
    encoder.writeExtensionObject(value.nodeAttributes, enc);
    encoder.writeExpandedNodeId(value.typeDefinition);
};

export function encodeAddNodesResult(encoder: IWriter, value: AddNodesResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeNodeId(value.addedNodeId);
};

export function encodeAddNodesRequest(encoder: IWriter, value: AddNodesRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.nodesToAdd, (e, v) => encodeAddNodesItem(e, v, enc));
};

export function encodeAddNodesResponse(encoder: IWriter, value: AddNodesResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => encodeAddNodesResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeAddReferencesItem(encoder: IWriter, value: AddReferencesItem, enc: Encoder): void {
    encoder.writeNodeId(value.sourceNodeId);
    encoder.writeNodeId(value.referenceTypeId);
    encoder.writeBoolean(value.isForward);
    encoder.writeString(value.targetServerUri);
    encoder.writeExpandedNodeId(value.targetNodeId);
    encoder.writeUInt32(value.targetNodeClass); // enum
};

export function encodeAddReferencesRequest(encoder: IWriter, value: AddReferencesRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.referencesToAdd, (e, v) => encodeAddReferencesItem(e, v, enc));
};

export function encodeAddReferencesResponse(encoder: IWriter, value: AddReferencesResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeDeleteNodesItem(encoder: IWriter, value: DeleteNodesItem, enc: Encoder): void {
    encoder.writeNodeId(value.nodeId);
    encoder.writeBoolean(value.deleteTargetReferences);
};

export function encodeDeleteNodesRequest(encoder: IWriter, value: DeleteNodesRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.nodesToDelete, (e, v) => encodeDeleteNodesItem(e, v, enc));
};

export function encodeDeleteNodesResponse(encoder: IWriter, value: DeleteNodesResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeDeleteReferencesItem(encoder: IWriter, value: DeleteReferencesItem, enc: Encoder): void {
    encoder.writeNodeId(value.sourceNodeId);
    encoder.writeNodeId(value.referenceTypeId);
    encoder.writeBoolean(value.isForward);
    encoder.writeExpandedNodeId(value.targetNodeId);
    encoder.writeBoolean(value.deleteBidirectional);
};

export function encodeDeleteReferencesRequest(encoder: IWriter, value: DeleteReferencesRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.referencesToDelete, (e, v) => encodeDeleteReferencesItem(e, v, enc));
};

export function encodeDeleteReferencesResponse(encoder: IWriter, value: DeleteReferencesResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeViewDescription(encoder: IWriter, value: ViewDescription, enc: Encoder): void {
    encoder.writeNodeId(value.viewId);
    encoder.writeDateTime(value.timestamp);
    encoder.writeUInt32(value.viewVersion);
};

export function encodeBrowseDescription(encoder: IWriter, value: BrowseDescription, enc: Encoder): void {
    encoder.writeNodeId(value.nodeId);
    encoder.writeUInt32(value.browseDirection); // enum
    encoder.writeNodeId(value.referenceTypeId);
    encoder.writeBoolean(value.includeSubtypes);
    encoder.writeUInt32(value.nodeClassMask);
    encoder.writeUInt32(value.resultMask);
};

export function encodeReferenceDescription(encoder: IWriter, value: ReferenceDescription, enc: Encoder): void {
    encoder.writeNodeId(value.referenceTypeId);
    encoder.writeBoolean(value.isForward);
    encoder.writeExpandedNodeId(value.nodeId);
    encoder.writeQualifiedName(value.browseName);
    encoder.writeLocalizedText(value.displayName);
    encoder.writeUInt32(value.nodeClass); // enum
    encoder.writeExpandedNodeId(value.typeDefinition);
};

export function encodeBrowseResult(encoder: IWriter, value: BrowseResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeByteString(value.continuationPoint);
    encoder.writeArray(value.references, (e, v) => encodeReferenceDescription(e, v, enc));
};

export function encodeBrowseRequest(encoder: IWriter, value: BrowseRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encodeViewDescription(encoder, value.view, enc);
    encoder.writeUInt32(value.requestedMaxReferencesPerNode);
    encoder.writeArray(value.nodesToBrowse, (e, v) => encodeBrowseDescription(e, v, enc));
};

export function encodeBrowseResponse(encoder: IWriter, value: BrowseResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => encodeBrowseResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeBrowseNextRequest(encoder: IWriter, value: BrowseNextRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeBoolean(value.releaseContinuationPoints);
    encoder.writeArray(value.continuationPoints, (e, v) => e.writeByteString(v));
};

export function encodeBrowseNextResponse(encoder: IWriter, value: BrowseNextResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => encodeBrowseResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeRelativePathElement(encoder: IWriter, value: RelativePathElement, enc: Encoder): void {
    encoder.writeNodeId(value.referenceTypeId);
    encoder.writeBoolean(value.isInverse);
    encoder.writeBoolean(value.includeSubtypes);
    encoder.writeQualifiedName(value.targetName);
};

export function encodeRelativePath(encoder: IWriter, value: RelativePath, enc: Encoder): void {
    encoder.writeArray(value.elements, (e, v) => encodeRelativePathElement(e, v, enc));
};

export function encodeBrowsePath(encoder: IWriter, value: BrowsePath, enc: Encoder): void {
    encoder.writeNodeId(value.startingNode);
    encodeRelativePath(encoder, value.relativePath, enc);
};

export function encodeBrowsePathTarget(encoder: IWriter, value: BrowsePathTarget, enc: Encoder): void {
    encoder.writeExpandedNodeId(value.targetId);
    encoder.writeUInt32(value.remainingPathIndex);
};

export function encodeBrowsePathResult(encoder: IWriter, value: BrowsePathResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeArray(value.targets, (e, v) => encodeBrowsePathTarget(e, v, enc));
};

export function encodeTranslateBrowsePathsToNodeIdsRequest(encoder: IWriter, value: TranslateBrowsePathsToNodeIdsRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.browsePaths, (e, v) => encodeBrowsePath(e, v, enc));
};

export function encodeTranslateBrowsePathsToNodeIdsResponse(encoder: IWriter, value: TranslateBrowsePathsToNodeIdsResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => encodeBrowsePathResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeRegisterNodesRequest(encoder: IWriter, value: RegisterNodesRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.nodesToRegister, (e, v) => e.writeNodeId(v));
};

export function encodeRegisterNodesResponse(encoder: IWriter, value: RegisterNodesResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.registeredNodeIds, (e, v) => e.writeNodeId(v));
};

export function encodeUnregisterNodesRequest(encoder: IWriter, value: UnregisterNodesRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.nodesToUnregister, (e, v) => e.writeNodeId(v));
};

export function encodeUnregisterNodesResponse(encoder: IWriter, value: UnregisterNodesResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
};

export function encodeEndpointConfiguration(encoder: IWriter, value: EndpointConfiguration, enc: Encoder): void {
    encoder.writeInt32(value.operationTimeout);
    encoder.writeBoolean(value.useBinaryEncoding);
    encoder.writeInt32(value.maxStringLength);
    encoder.writeInt32(value.maxByteStringLength);
    encoder.writeInt32(value.maxArrayLength);
    encoder.writeInt32(value.maxMessageSize);
    encoder.writeInt32(value.maxBufferSize);
    encoder.writeInt32(value.channelLifetime);
    encoder.writeInt32(value.securityTokenLifetime);
};

export function encodeQueryDataDescription(encoder: IWriter, value: QueryDataDescription, enc: Encoder): void {
    encodeRelativePath(encoder, value.relativePath, enc);
    encoder.writeUInt32(value.attributeId);
    encoder.writeString(value.indexRange);
};

export function encodeNodeTypeDescription(encoder: IWriter, value: NodeTypeDescription, enc: Encoder): void {
    encoder.writeExpandedNodeId(value.typeDefinitionNode);
    encoder.writeBoolean(value.includeSubTypes);
    encoder.writeArray(value.dataToReturn, (e, v) => encodeQueryDataDescription(e, v, enc));
};

export function encodeQueryDataSet(encoder: IWriter, value: QueryDataSet, enc: Encoder): void {
    encoder.writeExpandedNodeId(value.nodeId);
    encoder.writeExpandedNodeId(value.typeDefinitionNode);
    encoder.writeArray(value.values, (e, v) => e.writeVariant(v, enc));
};

export function encodeNodeReference(encoder: IWriter, value: NodeReference, enc: Encoder): void {
    encoder.writeNodeId(value.nodeId);
    encoder.writeNodeId(value.referenceTypeId);
    encoder.writeBoolean(value.isForward);
    encoder.writeArray(value.referencedNodeIds, (e, v) => e.writeNodeId(v));
};

export function encodeContentFilterElement(encoder: IWriter, value: ContentFilterElement, enc: Encoder): void {
    encoder.writeUInt32(value.filterOperator); // enum
    encoder.writeArray(value.filterOperands, (e, v) => e.writeExtensionObject(v, enc));
};

export function encodeContentFilter(encoder: IWriter, value: ContentFilter, enc: Encoder): void {
    encoder.writeArray(value.elements, (e, v) => encodeContentFilterElement(e, v, enc));
};

export function encodeFilterOperand(encoder: IWriter, value: FilterOperand, enc: Encoder): void {
};

export function encodeElementOperand(encoder: IWriter, value: ElementOperand, enc: Encoder): void {
    encodeFilterOperand(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.index);
};

export function encodeLiteralOperand(encoder: IWriter, value: LiteralOperand, enc: Encoder): void {
    encodeFilterOperand(encoder, value, enc); // encode base class
    encoder.writeVariant(value.value, enc);
};

export function encodeAttributeOperand(encoder: IWriter, value: AttributeOperand, enc: Encoder): void {
    encodeFilterOperand(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.nodeId);
    encoder.writeString(value.alias);
    encodeRelativePath(encoder, value.browsePath, enc);
    encoder.writeUInt32(value.attributeId);
    encoder.writeString(value.indexRange);
};

export function encodeSimpleAttributeOperand(encoder: IWriter, value: SimpleAttributeOperand, enc: Encoder): void {
    encodeFilterOperand(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.typeDefinitionId);
    encoder.writeArray(value.browsePath, (e, v) => e.writeQualifiedName(v));
    encoder.writeUInt32(value.attributeId);
    encoder.writeString(value.indexRange);
};

export function encodeContentFilterElementResult(encoder: IWriter, value: ContentFilterElementResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeArray(value.operandStatusCodes, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.operandDiagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeContentFilterResult(encoder: IWriter, value: ContentFilterResult, enc: Encoder): void {
    encoder.writeArray(value.elementResults, (e, v) => encodeContentFilterElementResult(e, v, enc));
    encoder.writeArray(value.elementDiagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeParsingResult(encoder: IWriter, value: ParsingResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeArray(value.dataStatusCodes, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.dataDiagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeQueryFirstRequest(encoder: IWriter, value: QueryFirstRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encodeViewDescription(encoder, value.view, enc);
    encoder.writeArray(value.nodeTypes, (e, v) => encodeNodeTypeDescription(e, v, enc));
    encodeContentFilter(encoder, value.filter, enc);
    encoder.writeUInt32(value.maxDataSetsToReturn);
    encoder.writeUInt32(value.maxReferencesToReturn);
};

export function encodeQueryFirstResponse(encoder: IWriter, value: QueryFirstResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.queryDataSets, (e, v) => encodeQueryDataSet(e, v, enc));
    encoder.writeByteString(value.continuationPoint);
    encoder.writeArray(value.parsingResults, (e, v) => encodeParsingResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
    encodeContentFilterResult(encoder, value.filterResult, enc);
};

export function encodeQueryNextRequest(encoder: IWriter, value: QueryNextRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeBoolean(value.releaseContinuationPoint);
    encoder.writeByteString(value.continuationPoint);
};

export function encodeQueryNextResponse(encoder: IWriter, value: QueryNextResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.queryDataSets, (e, v) => encodeQueryDataSet(e, v, enc));
    encoder.writeByteString(value.revisedContinuationPoint);
};

export function encodeReadValueId(encoder: IWriter, value: ReadValueId, enc: Encoder): void {
    encoder.writeNodeId(value.nodeId);
    encoder.writeUInt32(value.attributeId);
    encoder.writeString(value.indexRange);
    encoder.writeQualifiedName(value.dataEncoding);
};

export function encodeReadRequest(encoder: IWriter, value: ReadRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeDouble(value.maxAge);
    encoder.writeUInt32(value.timestampsToReturn); // enum
    encoder.writeArray(value.nodesToRead, (e, v) => encodeReadValueId(e, v, enc));
};

export function encodeReadResponse(encoder: IWriter, value: ReadResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => e.writeDataValue(v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeHistoryReadValueId(encoder: IWriter, value: HistoryReadValueId, enc: Encoder): void {
    encoder.writeNodeId(value.nodeId);
    encoder.writeString(value.indexRange);
    encoder.writeQualifiedName(value.dataEncoding);
    encoder.writeByteString(value.continuationPoint);
};

export function encodeHistoryReadResult(encoder: IWriter, value: HistoryReadResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeByteString(value.continuationPoint);
    encoder.writeExtensionObject(value.historyData, enc);
};

export function encodeHistoryReadDetails(encoder: IWriter, value: HistoryReadDetails, enc: Encoder): void {
};

export function encodeReadEventDetails(encoder: IWriter, value: ReadEventDetails, enc: Encoder): void {
    encodeHistoryReadDetails(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.numValuesPerNode);
    encoder.writeDateTime(value.startTime);
    encoder.writeDateTime(value.endTime);
    encodeEventFilter(encoder, value.filter, enc);
};

export function encodeReadEventDetails2(encoder: IWriter, value: ReadEventDetails2, enc: Encoder): void {
    encodeReadEventDetails(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.readModified);
};

export function encodeSortRuleElement(encoder: IWriter, value: SortRuleElement, enc: Encoder): void {
    encoder.writeUInt32(value.sortOrder); // enum
    encodeSimpleAttributeOperand(encoder, value.eventField, enc);
};

export function encodeReadEventDetailsSorted(encoder: IWriter, value: ReadEventDetailsSorted, enc: Encoder): void {
    encodeReadEventDetails(encoder, value, enc); // encode base class
    encoder.writeArray(value.sortClause, (e, v) => encodeSortRuleElement(e, v, enc));
};

export function encodeReadRawModifiedDetails(encoder: IWriter, value: ReadRawModifiedDetails, enc: Encoder): void {
    encodeHistoryReadDetails(encoder, value, enc); // encode base class
    encoder.writeBoolean(value.isReadModified);
    encoder.writeDateTime(value.startTime);
    encoder.writeDateTime(value.endTime);
    encoder.writeUInt32(value.numValuesPerNode);
    encoder.writeBoolean(value.returnBounds);
};

export function encodeReadProcessedDetails(encoder: IWriter, value: ReadProcessedDetails, enc: Encoder): void {
    encodeHistoryReadDetails(encoder, value, enc); // encode base class
    encoder.writeDateTime(value.startTime);
    encoder.writeDateTime(value.endTime);
    encoder.writeDouble(value.processingInterval);
    encoder.writeArray(value.aggregateType, (e, v) => e.writeNodeId(v));
    encodeAggregateConfiguration(encoder, value.aggregateConfiguration, enc);
};

export function encodeReadAtTimeDetails(encoder: IWriter, value: ReadAtTimeDetails, enc: Encoder): void {
    encodeHistoryReadDetails(encoder, value, enc); // encode base class
    encoder.writeArray(value.reqTimes, (e, v) => e.writeDateTime(v));
    encoder.writeBoolean(value.useSimpleBounds);
};

export function encodeReadAnnotationDataDetails(encoder: IWriter, value: ReadAnnotationDataDetails, enc: Encoder): void {
    encodeHistoryReadDetails(encoder, value, enc); // encode base class
    encoder.writeArray(value.reqTimes, (e, v) => e.writeDateTime(v));
};

export function encodeHistoryData(encoder: IWriter, value: HistoryData, enc: Encoder): void {
    encoder.writeArray(value.dataValues, (e, v) => e.writeDataValue(v, enc));
};

export function encodeModificationInfo(encoder: IWriter, value: ModificationInfo, enc: Encoder): void {
    encoder.writeDateTime(value.modificationTime);
    encoder.writeUInt32(value.updateType); // enum
    encoder.writeString(value.userName);
};

export function encodeHistoryModifiedData(encoder: IWriter, value: HistoryModifiedData, enc: Encoder): void {
    encodeHistoryData(encoder, value, enc); // encode base class
    encoder.writeArray(value.modificationInfos, (e, v) => encodeModificationInfo(e, v, enc));
};

export function encodeHistoryEvent(encoder: IWriter, value: HistoryEvent, enc: Encoder): void {
    encoder.writeArray(value.events, (e, v) => encodeHistoryEventFieldList(e, v, enc));
};

export function encodeHistoryModifiedEvent(encoder: IWriter, value: HistoryModifiedEvent, enc: Encoder): void {
    encodeHistoryEvent(encoder, value, enc); // encode base class
    encoder.writeArray(value.modificationInfos, (e, v) => encodeModificationInfo(e, v, enc));
};

export function encodeHistoryReadRequest(encoder: IWriter, value: HistoryReadRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeExtensionObject(value.historyReadDetails, enc);
    encoder.writeUInt32(value.timestampsToReturn); // enum
    encoder.writeBoolean(value.releaseContinuationPoints);
    encoder.writeArray(value.nodesToRead, (e, v) => encodeHistoryReadValueId(e, v, enc));
};

export function encodeHistoryReadResponse(encoder: IWriter, value: HistoryReadResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => encodeHistoryReadResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeWriteValue(encoder: IWriter, value: WriteValue, enc: Encoder): void {
    encoder.writeNodeId(value.nodeId);
    encoder.writeUInt32(value.attributeId);
    encoder.writeString(value.indexRange);
    encoder.writeDataValue(value.value, enc);
};

export function encodeWriteRequest(encoder: IWriter, value: WriteRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.nodesToWrite, (e, v) => encodeWriteValue(e, v, enc));
};

export function encodeWriteResponse(encoder: IWriter, value: WriteResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeHistoryUpdateDetails(encoder: IWriter, value: HistoryUpdateDetails, enc: Encoder): void {
};

export function encodeUpdateDataDetails(encoder: IWriter, value: UpdateDataDetails, enc: Encoder): void {
    encodeHistoryUpdateDetails(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.nodeId);
    encoder.writeUInt32(value.performInsertReplace); // enum
    encoder.writeArray(value.updateValues, (e, v) => e.writeDataValue(v, enc));
};

export function encodeUpdateStructureDataDetails(encoder: IWriter, value: UpdateStructureDataDetails, enc: Encoder): void {
    encodeHistoryUpdateDetails(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.nodeId);
    encoder.writeUInt32(value.performInsertReplace); // enum
    encoder.writeArray(value.updateValues, (e, v) => e.writeDataValue(v, enc));
};

export function encodeUpdateEventDetails(encoder: IWriter, value: UpdateEventDetails, enc: Encoder): void {
    encodeHistoryUpdateDetails(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.nodeId);
    encoder.writeUInt32(value.performInsertReplace); // enum
    encodeEventFilter(encoder, value.filter, enc);
    encoder.writeArray(value.eventData, (e, v) => encodeHistoryEventFieldList(e, v, enc));
};

export function encodeDeleteRawModifiedDetails(encoder: IWriter, value: DeleteRawModifiedDetails, enc: Encoder): void {
    encodeHistoryUpdateDetails(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.nodeId);
    encoder.writeBoolean(value.isDeleteModified);
    encoder.writeDateTime(value.startTime);
    encoder.writeDateTime(value.endTime);
};

export function encodeDeleteAtTimeDetails(encoder: IWriter, value: DeleteAtTimeDetails, enc: Encoder): void {
    encodeHistoryUpdateDetails(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.nodeId);
    encoder.writeArray(value.reqTimes, (e, v) => e.writeDateTime(v));
};

export function encodeDeleteEventDetails(encoder: IWriter, value: DeleteEventDetails, enc: Encoder): void {
    encodeHistoryUpdateDetails(encoder, value, enc); // encode base class
    encoder.writeNodeId(value.nodeId);
    encoder.writeArray(value.eventIds, (e, v) => e.writeByteString(v));
};

export function encodeHistoryUpdateResult(encoder: IWriter, value: HistoryUpdateResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeArray(value.operationResults, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeHistoryUpdateRequest(encoder: IWriter, value: HistoryUpdateRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.historyUpdateDetails, (e, v) => e.writeExtensionObject(v, enc));
};

export function encodeHistoryUpdateResponse(encoder: IWriter, value: HistoryUpdateResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => encodeHistoryUpdateResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeCallMethodRequest(encoder: IWriter, value: CallMethodRequest, enc: Encoder): void {
    encoder.writeNodeId(value.objectId);
    encoder.writeNodeId(value.methodId);
    encoder.writeArray(value.inputArguments, (e, v) => e.writeVariant(v, enc));
};

export function encodeCallMethodResult(encoder: IWriter, value: CallMethodResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeArray(value.inputArgumentResults, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.inputArgumentDiagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
    encoder.writeArray(value.outputArguments, (e, v) => e.writeVariant(v, enc));
};

export function encodeCallRequest(encoder: IWriter, value: CallRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.methodsToCall, (e, v) => encodeCallMethodRequest(e, v, enc));
};

export function encodeCallResponse(encoder: IWriter, value: CallResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => encodeCallMethodResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeMonitoringFilter(encoder: IWriter, value: MonitoringFilter, enc: Encoder): void {
};

export function encodeDataChangeFilter(encoder: IWriter, value: DataChangeFilter, enc: Encoder): void {
    encodeMonitoringFilter(encoder, value, enc); // encode base class
    encoder.writeUInt32(value.trigger); // enum
    encoder.writeUInt32(value.deadbandType);
    encoder.writeDouble(value.deadbandValue);
};

export function encodeEventFilter(encoder: IWriter, value: EventFilter, enc: Encoder): void {
    encodeMonitoringFilter(encoder, value, enc); // encode base class
    encoder.writeArray(value.selectClauses, (e, v) => encodeSimpleAttributeOperand(e, v, enc));
    encodeContentFilter(encoder, value.whereClause, enc);
};

export function encodeAggregateConfiguration(encoder: IWriter, value: AggregateConfiguration, enc: Encoder): void {
    encoder.writeBoolean(value.useServerCapabilitiesDefaults);
    encoder.writeBoolean(value.treatUncertainAsBad);
    encoder.writeByte(value.percentDataBad);
    encoder.writeByte(value.percentDataGood);
    encoder.writeBoolean(value.useSlopedExtrapolation);
};

export function encodeAggregateFilter(encoder: IWriter, value: AggregateFilter, enc: Encoder): void {
    encodeMonitoringFilter(encoder, value, enc); // encode base class
    encoder.writeDateTime(value.startTime);
    encoder.writeNodeId(value.aggregateType);
    encoder.writeDouble(value.processingInterval);
    encodeAggregateConfiguration(encoder, value.aggregateConfiguration, enc);
};

export function encodeMonitoringFilterResult(encoder: IWriter, value: MonitoringFilterResult, enc: Encoder): void {
};

export function encodeEventFilterResult(encoder: IWriter, value: EventFilterResult, enc: Encoder): void {
    encodeMonitoringFilterResult(encoder, value, enc); // encode base class
    encoder.writeArray(value.selectClauseResults, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.selectClauseDiagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
    encodeContentFilterResult(encoder, value.whereClauseResult, enc);
};

export function encodeAggregateFilterResult(encoder: IWriter, value: AggregateFilterResult, enc: Encoder): void {
    encodeMonitoringFilterResult(encoder, value, enc); // encode base class
    encoder.writeDateTime(value.revisedStartTime);
    encoder.writeDouble(value.revisedProcessingInterval);
    encodeAggregateConfiguration(encoder, value.revisedAggregateConfiguration, enc);
};

export function encodeMonitoringParameters(encoder: IWriter, value: MonitoringParameters, enc: Encoder): void {
    encoder.writeUInt32(value.clientHandle);
    encoder.writeDouble(value.samplingInterval);
    encoder.writeExtensionObject(value.filter, enc);
    encoder.writeUInt32(value.queueSize);
    encoder.writeBoolean(value.discardOldest);
};

export function encodeMonitoredItemCreateRequest(encoder: IWriter, value: MonitoredItemCreateRequest, enc: Encoder): void {
    encodeReadValueId(encoder, value.itemToMonitor, enc);
    encoder.writeUInt32(value.monitoringMode); // enum
    encodeMonitoringParameters(encoder, value.requestedParameters, enc);
};

export function encodeMonitoredItemCreateResult(encoder: IWriter, value: MonitoredItemCreateResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeUInt32(value.monitoredItemId);
    encoder.writeDouble(value.revisedSamplingInterval);
    encoder.writeUInt32(value.revisedQueueSize);
    encoder.writeExtensionObject(value.filterResult, enc);
};

export function encodeCreateMonitoredItemsRequest(encoder: IWriter, value: CreateMonitoredItemsRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeUInt32(value.timestampsToReturn); // enum
    encoder.writeArray(value.itemsToCreate, (e, v) => encodeMonitoredItemCreateRequest(e, v, enc));
};

export function encodeCreateMonitoredItemsResponse(encoder: IWriter, value: CreateMonitoredItemsResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => encodeMonitoredItemCreateResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeMonitoredItemModifyRequest(encoder: IWriter, value: MonitoredItemModifyRequest, enc: Encoder): void {
    encoder.writeUInt32(value.monitoredItemId);
    encodeMonitoringParameters(encoder, value.requestedParameters, enc);
};

export function encodeMonitoredItemModifyResult(encoder: IWriter, value: MonitoredItemModifyResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeDouble(value.revisedSamplingInterval);
    encoder.writeUInt32(value.revisedQueueSize);
    encoder.writeExtensionObject(value.filterResult, enc);
};

export function encodeModifyMonitoredItemsRequest(encoder: IWriter, value: ModifyMonitoredItemsRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeUInt32(value.timestampsToReturn); // enum
    encoder.writeArray(value.itemsToModify, (e, v) => encodeMonitoredItemModifyRequest(e, v, enc));
};

export function encodeModifyMonitoredItemsResponse(encoder: IWriter, value: ModifyMonitoredItemsResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => encodeMonitoredItemModifyResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeSetMonitoringModeRequest(encoder: IWriter, value: SetMonitoringModeRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeUInt32(value.monitoringMode); // enum
    encoder.writeArray(value.monitoredItemIds, (e, v) => e.writeUInt32(v));
};

export function encodeSetMonitoringModeResponse(encoder: IWriter, value: SetMonitoringModeResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeSetTriggeringRequest(encoder: IWriter, value: SetTriggeringRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeUInt32(value.triggeringItemId);
    encoder.writeArray(value.linksToAdd, (e, v) => e.writeUInt32(v));
    encoder.writeArray(value.linksToRemove, (e, v) => e.writeUInt32(v));
};

export function encodeSetTriggeringResponse(encoder: IWriter, value: SetTriggeringResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.addResults, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.addDiagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
    encoder.writeArray(value.removeResults, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.removeDiagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeDeleteMonitoredItemsRequest(encoder: IWriter, value: DeleteMonitoredItemsRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeArray(value.monitoredItemIds, (e, v) => e.writeUInt32(v));
};

export function encodeDeleteMonitoredItemsResponse(encoder: IWriter, value: DeleteMonitoredItemsResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeCreateSubscriptionRequest(encoder: IWriter, value: CreateSubscriptionRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeDouble(value.requestedPublishingInterval);
    encoder.writeUInt32(value.requestedLifetimeCount);
    encoder.writeUInt32(value.requestedMaxKeepAliveCount);
    encoder.writeUInt32(value.maxNotificationsPerPublish);
    encoder.writeBoolean(value.publishingEnabled);
    encoder.writeByte(value.priority);
};

export function encodeCreateSubscriptionResponse(encoder: IWriter, value: CreateSubscriptionResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeDouble(value.revisedPublishingInterval);
    encoder.writeUInt32(value.revisedLifetimeCount);
    encoder.writeUInt32(value.revisedMaxKeepAliveCount);
};

export function encodeModifySubscriptionRequest(encoder: IWriter, value: ModifySubscriptionRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeDouble(value.requestedPublishingInterval);
    encoder.writeUInt32(value.requestedLifetimeCount);
    encoder.writeUInt32(value.requestedMaxKeepAliveCount);
    encoder.writeUInt32(value.maxNotificationsPerPublish);
    encoder.writeByte(value.priority);
};

export function encodeModifySubscriptionResponse(encoder: IWriter, value: ModifySubscriptionResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeDouble(value.revisedPublishingInterval);
    encoder.writeUInt32(value.revisedLifetimeCount);
    encoder.writeUInt32(value.revisedMaxKeepAliveCount);
};

export function encodeSetPublishingModeRequest(encoder: IWriter, value: SetPublishingModeRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeBoolean(value.publishingEnabled);
    encoder.writeArray(value.subscriptionIds, (e, v) => e.writeUInt32(v));
};

export function encodeSetPublishingModeResponse(encoder: IWriter, value: SetPublishingModeResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeNotificationMessage(encoder: IWriter, value: NotificationMessage, enc: Encoder): void {
    encoder.writeUInt32(value.sequenceNumber);
    encoder.writeDateTime(value.publishTime);
    encoder.writeArray(value.notificationData, (e, v) => e.writeExtensionObject(v, enc));
};

export function encodeNotificationData(encoder: IWriter, value: NotificationData, enc: Encoder): void {
};

export function encodeDataChangeNotification(encoder: IWriter, value: DataChangeNotification, enc: Encoder): void {
    encodeNotificationData(encoder, value, enc); // encode base class
    encoder.writeArray(value.monitoredItems, (e, v) => encodeMonitoredItemNotification(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeMonitoredItemNotification(encoder: IWriter, value: MonitoredItemNotification, enc: Encoder): void {
    encoder.writeUInt32(value.clientHandle);
    encoder.writeDataValue(value.value, enc);
};

export function encodeEventNotificationList(encoder: IWriter, value: EventNotificationList, enc: Encoder): void {
    encodeNotificationData(encoder, value, enc); // encode base class
    encoder.writeArray(value.events, (e, v) => encodeEventFieldList(e, v, enc));
};

export function encodeEventFieldList(encoder: IWriter, value: EventFieldList, enc: Encoder): void {
    encoder.writeUInt32(value.clientHandle);
    encoder.writeArray(value.eventFields, (e, v) => e.writeVariant(v, enc));
};

export function encodeHistoryEventFieldList(encoder: IWriter, value: HistoryEventFieldList, enc: Encoder): void {
    encoder.writeArray(value.eventFields, (e, v) => e.writeVariant(v, enc));
};

export function encodeStatusChangeNotification(encoder: IWriter, value: StatusChangeNotification, enc: Encoder): void {
    encodeNotificationData(encoder, value, enc); // encode base class
    encoder.writeStatusCode(value.status);
    encoder.writeDiagnosticInfo(value.diagnosticInfo);
};

export function encodeSubscriptionAcknowledgement(encoder: IWriter, value: SubscriptionAcknowledgement, enc: Encoder): void {
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeUInt32(value.sequenceNumber);
};

export function encodePublishRequest(encoder: IWriter, value: PublishRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.subscriptionAcknowledgements, (e, v) => encodeSubscriptionAcknowledgement(e, v, enc));
};

export function encodePublishResponse(encoder: IWriter, value: PublishResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeArray(value.availableSequenceNumbers, (e, v) => e.writeUInt32(v));
    encoder.writeBoolean(value.moreNotifications);
    encodeNotificationMessage(encoder, value.notificationMessage, enc);
    encoder.writeArray(value.results, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeRepublishRequest(encoder: IWriter, value: RepublishRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeUInt32(value.retransmitSequenceNumber);
};

export function encodeRepublishResponse(encoder: IWriter, value: RepublishResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encodeNotificationMessage(encoder, value.notificationMessage, enc);
};

export function encodeTransferResult(encoder: IWriter, value: TransferResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeArray(value.availableSequenceNumbers, (e, v) => e.writeUInt32(v));
};

export function encodeTransferSubscriptionsRequest(encoder: IWriter, value: TransferSubscriptionsRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.subscriptionIds, (e, v) => e.writeUInt32(v));
    encoder.writeBoolean(value.sendInitialValues);
};

export function encodeTransferSubscriptionsResponse(encoder: IWriter, value: TransferSubscriptionsResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => encodeTransferResult(e, v, enc));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeDeleteSubscriptionsRequest(encoder: IWriter, value: DeleteSubscriptionsRequest, enc: Encoder): void {
    encodeRequestHeader(encoder, value.requestHeader, enc);
    encoder.writeArray(value.subscriptionIds, (e, v) => e.writeUInt32(v));
};

export function encodeDeleteSubscriptionsResponse(encoder: IWriter, value: DeleteSubscriptionsResponse, enc: Encoder): void {
    encodeResponseHeader(encoder, value.responseHeader, enc);
    encoder.writeArray(value.results, (e, v) => e.writeStatusCode(v));
    encoder.writeArray(value.diagnosticInfos, (e, v) => e.writeDiagnosticInfo(v));
};

export function encodeBuildInfo(encoder: IWriter, value: BuildInfo, enc: Encoder): void {
    encoder.writeString(value.productUri);
    encoder.writeString(value.manufacturerName);
    encoder.writeString(value.productName);
    encoder.writeString(value.softwareVersion);
    encoder.writeString(value.buildNumber);
    encoder.writeDateTime(value.buildDate);
};

export function encodeRedundantServerDataType(encoder: IWriter, value: RedundantServerDataType, enc: Encoder): void {
    encoder.writeString(value.serverId);
    encoder.writeByte(value.serviceLevel);
    encoder.writeUInt32(value.serverState); // enum
};

export function encodeEndpointUrlListDataType(encoder: IWriter, value: EndpointUrlListDataType, enc: Encoder): void {
    encoder.writeArray(value.endpointUrlList, (e, v) => e.writeString(v));
};

export function encodeNetworkGroupDataType(encoder: IWriter, value: NetworkGroupDataType, enc: Encoder): void {
    encoder.writeString(value.serverUri);
    encoder.writeArray(value.networkPaths, (e, v) => encodeEndpointUrlListDataType(e, v, enc));
};

export function encodeSamplingIntervalDiagnosticsDataType(encoder: IWriter, value: SamplingIntervalDiagnosticsDataType, enc: Encoder): void {
    encoder.writeDouble(value.samplingInterval);
    encoder.writeUInt32(value.monitoredItemCount);
    encoder.writeUInt32(value.maxMonitoredItemCount);
    encoder.writeUInt32(value.disabledMonitoredItemCount);
};

export function encodeServerDiagnosticsSummaryDataType(encoder: IWriter, value: ServerDiagnosticsSummaryDataType, enc: Encoder): void {
    encoder.writeUInt32(value.serverViewCount);
    encoder.writeUInt32(value.currentSessionCount);
    encoder.writeUInt32(value.cumulatedSessionCount);
    encoder.writeUInt32(value.securityRejectedSessionCount);
    encoder.writeUInt32(value.rejectedSessionCount);
    encoder.writeUInt32(value.sessionTimeoutCount);
    encoder.writeUInt32(value.sessionAbortCount);
    encoder.writeUInt32(value.currentSubscriptionCount);
    encoder.writeUInt32(value.cumulatedSubscriptionCount);
    encoder.writeUInt32(value.publishingIntervalCount);
    encoder.writeUInt32(value.securityRejectedRequestsCount);
    encoder.writeUInt32(value.rejectedRequestsCount);
};

export function encodeServerStatusDataType(encoder: IWriter, value: ServerStatusDataType, enc: Encoder): void {
    encoder.writeDateTime(value.startTime);
    encoder.writeDateTime(value.currentTime);
    encoder.writeUInt32(value.state); // enum
    encodeBuildInfo(encoder, value.buildInfo, enc);
    encoder.writeUInt32(value.secondsTillShutdown);
    encoder.writeLocalizedText(value.shutdownReason);
};

export function encodeSessionDiagnosticsDataType(encoder: IWriter, value: SessionDiagnosticsDataType, enc: Encoder): void {
    encoder.writeNodeId(value.sessionId);
    encoder.writeString(value.sessionName);
    encodeApplicationDescription(encoder, value.clientDescription, enc);
    encoder.writeString(value.serverUri);
    encoder.writeString(value.endpointUrl);
    encoder.writeArray(value.localeIds, (e, v) => e.writeString(v));
    encoder.writeDouble(value.actualSessionTimeout);
    encoder.writeUInt32(value.maxResponseMessageSize);
    encoder.writeDateTime(value.clientConnectionTime);
    encoder.writeDateTime(value.clientLastContactTime);
    encoder.writeUInt32(value.currentSubscriptionsCount);
    encoder.writeUInt32(value.currentMonitoredItemsCount);
    encoder.writeUInt32(value.currentPublishRequestsInQueue);
    encodeServiceCounterDataType(encoder, value.totalRequestCount, enc);
    encoder.writeUInt32(value.unauthorizedRequestCount);
    encodeServiceCounterDataType(encoder, value.readCount, enc);
    encodeServiceCounterDataType(encoder, value.historyReadCount, enc);
    encodeServiceCounterDataType(encoder, value.writeCount, enc);
    encodeServiceCounterDataType(encoder, value.historyUpdateCount, enc);
    encodeServiceCounterDataType(encoder, value.callCount, enc);
    encodeServiceCounterDataType(encoder, value.createMonitoredItemsCount, enc);
    encodeServiceCounterDataType(encoder, value.modifyMonitoredItemsCount, enc);
    encodeServiceCounterDataType(encoder, value.setMonitoringModeCount, enc);
    encodeServiceCounterDataType(encoder, value.setTriggeringCount, enc);
    encodeServiceCounterDataType(encoder, value.deleteMonitoredItemsCount, enc);
    encodeServiceCounterDataType(encoder, value.createSubscriptionCount, enc);
    encodeServiceCounterDataType(encoder, value.modifySubscriptionCount, enc);
    encodeServiceCounterDataType(encoder, value.setPublishingModeCount, enc);
    encodeServiceCounterDataType(encoder, value.publishCount, enc);
    encodeServiceCounterDataType(encoder, value.republishCount, enc);
    encodeServiceCounterDataType(encoder, value.transferSubscriptionsCount, enc);
    encodeServiceCounterDataType(encoder, value.deleteSubscriptionsCount, enc);
    encodeServiceCounterDataType(encoder, value.addNodesCount, enc);
    encodeServiceCounterDataType(encoder, value.addReferencesCount, enc);
    encodeServiceCounterDataType(encoder, value.deleteNodesCount, enc);
    encodeServiceCounterDataType(encoder, value.deleteReferencesCount, enc);
    encodeServiceCounterDataType(encoder, value.browseCount, enc);
    encodeServiceCounterDataType(encoder, value.browseNextCount, enc);
    encodeServiceCounterDataType(encoder, value.translateBrowsePathsToNodeIdsCount, enc);
    encodeServiceCounterDataType(encoder, value.queryFirstCount, enc);
    encodeServiceCounterDataType(encoder, value.queryNextCount, enc);
    encodeServiceCounterDataType(encoder, value.registerNodesCount, enc);
    encodeServiceCounterDataType(encoder, value.unregisterNodesCount, enc);
};

export function encodeSessionSecurityDiagnosticsDataType(encoder: IWriter, value: SessionSecurityDiagnosticsDataType, enc: Encoder): void {
    encoder.writeNodeId(value.sessionId);
    encoder.writeString(value.clientUserIdOfSession);
    encoder.writeArray(value.clientUserIdHistory, (e, v) => e.writeString(v));
    encoder.writeString(value.authenticationMechanism);
    encoder.writeString(value.encoding);
    encoder.writeString(value.transportProtocol);
    encoder.writeUInt32(value.securityMode); // enum
    encoder.writeString(value.securityPolicyUri);
    encoder.writeByteString(value.clientCertificate);
};

export function encodeServiceCounterDataType(encoder: IWriter, value: ServiceCounterDataType, enc: Encoder): void {
    encoder.writeUInt32(value.totalCount);
    encoder.writeUInt32(value.errorCount);
};

export function encodeStatusResult(encoder: IWriter, value: StatusResult, enc: Encoder): void {
    encoder.writeStatusCode(value.statusCode);
    encoder.writeDiagnosticInfo(value.diagnosticInfo);
};

export function encodeSubscriptionDiagnosticsDataType(encoder: IWriter, value: SubscriptionDiagnosticsDataType, enc: Encoder): void {
    encoder.writeNodeId(value.sessionId);
    encoder.writeUInt32(value.subscriptionId);
    encoder.writeByte(value.priority);
    encoder.writeDouble(value.publishingInterval);
    encoder.writeUInt32(value.maxKeepAliveCount);
    encoder.writeUInt32(value.maxLifetimeCount);
    encoder.writeUInt32(value.maxNotificationsPerPublish);
    encoder.writeBoolean(value.publishingEnabled);
    encoder.writeUInt32(value.modifyCount);
    encoder.writeUInt32(value.enableCount);
    encoder.writeUInt32(value.disableCount);
    encoder.writeUInt32(value.republishRequestCount);
    encoder.writeUInt32(value.republishMessageRequestCount);
    encoder.writeUInt32(value.republishMessageCount);
    encoder.writeUInt32(value.transferRequestCount);
    encoder.writeUInt32(value.transferredToAltClientCount);
    encoder.writeUInt32(value.transferredToSameClientCount);
    encoder.writeUInt32(value.publishRequestCount);
    encoder.writeUInt32(value.dataChangeNotificationsCount);
    encoder.writeUInt32(value.eventNotificationsCount);
    encoder.writeUInt32(value.notificationsCount);
    encoder.writeUInt32(value.latePublishRequestCount);
    encoder.writeUInt32(value.currentKeepAliveCount);
    encoder.writeUInt32(value.currentLifetimeCount);
    encoder.writeUInt32(value.unacknowledgedMessageCount);
    encoder.writeUInt32(value.discardedMessageCount);
    encoder.writeUInt32(value.monitoredItemCount);
    encoder.writeUInt32(value.disabledMonitoredItemCount);
    encoder.writeUInt32(value.monitoringQueueOverflowCount);
    encoder.writeUInt32(value.nextSequenceNumber);
    encoder.writeUInt32(value.eventQueueOverflowCount);
};

export function encodeModelChangeStructureDataType(encoder: IWriter, value: ModelChangeStructureDataType, enc: Encoder): void {
    encoder.writeNodeId(value.affected);
    encoder.writeNodeId(value.affectedType);
    encoder.writeByte(value.verb);
};

export function encodeSemanticChangeStructureDataType(encoder: IWriter, value: SemanticChangeStructureDataType, enc: Encoder): void {
    encoder.writeNodeId(value.affected);
    encoder.writeNodeId(value.affectedType);
};

export function encodeRange(encoder: IWriter, value: Range, enc: Encoder): void {
    encoder.writeDouble(value.low);
    encoder.writeDouble(value.high);
};

export function encodeEUInformation(encoder: IWriter, value: EUInformation, enc: Encoder): void {
    encoder.writeString(value.namespaceUri);
    encoder.writeInt32(value.unitId);
    encoder.writeLocalizedText(value.displayName);
    encoder.writeLocalizedText(value.description);
};

export function encodeComplexNumberType(encoder: IWriter, value: ComplexNumberType, enc: Encoder): void {
    encoder.writeFloat(value.real);
    encoder.writeFloat(value.imaginary);
};

export function encodeDoubleComplexNumberType(encoder: IWriter, value: DoubleComplexNumberType, enc: Encoder): void {
    encoder.writeDouble(value.real);
    encoder.writeDouble(value.imaginary);
};

export function encodeAxisInformation(encoder: IWriter, value: AxisInformation, enc: Encoder): void {
    encodeEUInformation(encoder, value.engineeringUnits, enc);
    encodeRange(encoder, value.eURange, enc);
    encoder.writeLocalizedText(value.title);
    encoder.writeUInt32(value.axisScaleType); // enum
    encoder.writeArray(value.axisSteps, (e, v) => e.writeDouble(v));
};

export function encodeXVType(encoder: IWriter, value: XVType, enc: Encoder): void {
    encoder.writeDouble(value.x);
    encoder.writeFloat(value.value);
};

export function encodeProgramDiagnosticDataType(encoder: IWriter, value: ProgramDiagnosticDataType, enc: Encoder): void {
    encoder.writeNodeId(value.createSessionId);
    encoder.writeString(value.createClientName);
    encoder.writeDateTime(value.invocationCreationTime);
    encoder.writeDateTime(value.lastTransitionTime);
    encoder.writeString(value.lastMethodCall);
    encoder.writeNodeId(value.lastMethodSessionId);
    encoder.writeArray(value.lastMethodInputArguments, (e, v) => encodeArgument(e, v, enc));
    encoder.writeArray(value.lastMethodOutputArguments, (e, v) => encodeArgument(e, v, enc));
    encoder.writeDateTime(value.lastMethodCallTime);
    encodeStatusResult(encoder, value.lastMethodReturnStatus, enc);
};

export function encodeProgramDiagnostic2DataType(encoder: IWriter, value: ProgramDiagnostic2DataType, enc: Encoder): void {
    encoder.writeNodeId(value.createSessionId);
    encoder.writeString(value.createClientName);
    encoder.writeDateTime(value.invocationCreationTime);
    encoder.writeDateTime(value.lastTransitionTime);
    encoder.writeString(value.lastMethodCall);
    encoder.writeNodeId(value.lastMethodSessionId);
    encoder.writeArray(value.lastMethodInputArguments, (e, v) => encodeArgument(e, v, enc));
    encoder.writeArray(value.lastMethodOutputArguments, (e, v) => encodeArgument(e, v, enc));
    encoder.writeArray(value.lastMethodInputValues, (e, v) => e.writeVariant(v, enc));
    encoder.writeArray(value.lastMethodOutputValues, (e, v) => e.writeVariant(v, enc));
    encoder.writeDateTime(value.lastMethodCallTime);
    encoder.writeStatusCode(value.lastMethodReturnStatus);
};

export function encodeAnnotation(encoder: IWriter, value: Annotation, enc: Encoder): void {
    encoder.writeString(value.message);
    encoder.writeString(value.userName);
    encoder.writeDateTime(value.annotationTime);
};
