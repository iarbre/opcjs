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

import { Encoder } from 'opcjs-base';
import {
    Union,
    KeyValuePair,
    AdditionalParametersType,
    EphemeralKeyType,
    EndpointType,
    BitFieldDefinition,
    RationalNumber,
    Vector,
    CartesianCoordinates,
    Orientation,
    Frame,
    IdentityMappingRuleType,
    CurrencyUnitType,
    AnnotationDataType,
    LinearConversionDataType,
    QuantityDimension,
    TrustListDataType,
    BaseConfigurationDataType,
    BaseConfigurationRecordDataType,
    CertificateGroupDataType,
    ConfigurationUpdateTargetType,
    TransactionErrorType,
    ApplicationConfigurationDataType,
    ApplicationIdentityDataType,
    EndpointDataType,
    ServerEndpointDataType,
    SecuritySettingsDataType,
    UserTokenSettingsDataType,
    ServiceCertificateDataType,
    AuthorizationServiceConfigurationDataType,
    DecimalDataType,
    DataTypeSchemaHeader,
    DataTypeDescription,
    StructureDescription,
    EnumDescription,
    SimpleTypeDescription,
    UABinaryFileDataType,
    PortableQualifiedName,
    PortableNodeId,
    UnsignedRationalNumber,
    DataSetMetaDataType,
    FieldMetaData,
    ConfigurationVersionDataType,
    PublishedDataSetDataType,
    PublishedDataSetSourceDataType,
    PublishedVariableDataType,
    PublishedDataItemsDataType,
    PublishedEventsDataType,
    PublishedDataSetCustomSourceDataType,
    ActionTargetDataType,
    PublishedActionDataType,
    ActionMethodDataType,
    PublishedActionMethodDataType,
    DataSetWriterDataType,
    DataSetWriterTransportDataType,
    DataSetWriterMessageDataType,
    PubSubGroupDataType,
    WriterGroupDataType,
    WriterGroupTransportDataType,
    WriterGroupMessageDataType,
    PubSubConnectionDataType,
    ConnectionTransportDataType,
    NetworkAddressDataType,
    NetworkAddressUrlDataType,
    ReaderGroupDataType,
    ReaderGroupTransportDataType,
    ReaderGroupMessageDataType,
    DataSetReaderDataType,
    DataSetReaderTransportDataType,
    DataSetReaderMessageDataType,
    SubscribedDataSetDataType,
    TargetVariablesDataType,
    FieldTargetDataType,
    SubscribedDataSetMirrorDataType,
    PubSubConfigurationDataType,
    StandaloneSubscribedDataSetRefDataType,
    StandaloneSubscribedDataSetDataType,
    SecurityGroupDataType,
    PubSubKeyPushTargetDataType,
    PubSubConfiguration2DataType,
    UadpWriterGroupMessageDataType,
    UadpDataSetWriterMessageDataType,
    UadpDataSetReaderMessageDataType,
    JsonWriterGroupMessageDataType,
    JsonDataSetWriterMessageDataType,
    JsonDataSetReaderMessageDataType,
    QosDataType,
    TransmitQosDataType,
    TransmitQosPriorityDataType,
    ReceiveQosDataType,
    ReceiveQosPriorityDataType,
    DatagramConnectionTransportDataType,
    DatagramConnectionTransport2DataType,
    DatagramWriterGroupTransportDataType,
    DatagramWriterGroupTransport2DataType,
    DatagramDataSetReaderTransportDataType,
    DtlsPubSubConnectionDataType,
    BrokerConnectionTransportDataType,
    BrokerWriterGroupTransportDataType,
    BrokerDataSetWriterTransportDataType,
    BrokerDataSetReaderTransportDataType,
    PubSubConfigurationRefDataType,
    PubSubConfigurationValueDataType,
    JsonNetworkMessage,
    JsonDataSetMessage,
    JsonDataSetMetaDataMessage,
    JsonApplicationDescriptionMessage,
    JsonServerEndpointsMessage,
    JsonStatusMessage,
    JsonPubSubConnectionMessage,
    JsonActionMetaDataMessage,
    JsonActionResponderMessage,
    JsonActionNetworkMessage,
    JsonActionRequestMessage,
    JsonActionResponseMessage,
    AliasNameDataType,
    UserManagementDataType,
    PriorityMappingEntryType,
    LldpManagementAddressTxPortType,
    LldpManagementAddressType,
    LldpTlvType,
    ReferenceDescriptionDataType,
    ReferenceListEntryDataType,
    LogRecord,
    LogRecordsDataType,
    SpanContextDataType,
    TraceContextDataType,
    NameValuePair,
    RolePermissionType,
    DataTypeDefinition,
    StructureField,
    StructureDefinition,
    EnumDefinition,
    Node,
    InstanceNode,
    TypeNode,
    ObjectNode,
    ObjectTypeNode,
    VariableNode,
    VariableTypeNode,
    ReferenceTypeNode,
    MethodNode,
    ViewNode,
    DataTypeNode,
    ReferenceNode,
    Argument,
    EnumValueType,
    EnumField,
    OptionSet,
    TimeZoneDataType,
    ApplicationDescription,
    RequestHeader,
    ResponseHeader,
    ServiceFault,
    SessionlessInvokeRequestType,
    SessionlessInvokeResponseType,
    FindServersRequest,
    FindServersResponse,
    ServerOnNetwork,
    FindServersOnNetworkRequest,
    FindServersOnNetworkResponse,
    UserTokenPolicy,
    EndpointDescription,
    GetEndpointsRequest,
    GetEndpointsResponse,
    RegisteredServer,
    RegisterServerRequest,
    RegisterServerResponse,
    DiscoveryConfiguration,
    MdnsDiscoveryConfiguration,
    RegisterServer2Request,
    RegisterServer2Response,
    ChannelSecurityToken,
    OpenSecureChannelRequest,
    OpenSecureChannelResponse,
    CloseSecureChannelRequest,
    CloseSecureChannelResponse,
    SignedSoftwareCertificate,
    SignatureData,
    CreateSessionRequest,
    CreateSessionResponse,
    UserIdentityToken,
    AnonymousIdentityToken,
    UserNameIdentityToken,
    X509IdentityToken,
    IssuedIdentityToken,
    ActivateSessionRequest,
    ActivateSessionResponse,
    CloseSessionRequest,
    CloseSessionResponse,
    CancelRequest,
    CancelResponse,
    NodeAttributes,
    ObjectAttributes,
    VariableAttributes,
    MethodAttributes,
    ObjectTypeAttributes,
    VariableTypeAttributes,
    ReferenceTypeAttributes,
    DataTypeAttributes,
    ViewAttributes,
    GenericAttributeValue,
    GenericAttributes,
    AddNodesItem,
    AddNodesResult,
    AddNodesRequest,
    AddNodesResponse,
    AddReferencesItem,
    AddReferencesRequest,
    AddReferencesResponse,
    DeleteNodesItem,
    DeleteNodesRequest,
    DeleteNodesResponse,
    DeleteReferencesItem,
    DeleteReferencesRequest,
    DeleteReferencesResponse,
    ViewDescription,
    BrowseDescription,
    ReferenceDescription,
    BrowseResult,
    BrowseRequest,
    BrowseResponse,
    BrowseNextRequest,
    BrowseNextResponse,
    RelativePathElement,
    RelativePath,
    BrowsePath,
    BrowsePathTarget,
    BrowsePathResult,
    TranslateBrowsePathsToNodeIdsRequest,
    TranslateBrowsePathsToNodeIdsResponse,
    RegisterNodesRequest,
    RegisterNodesResponse,
    UnregisterNodesRequest,
    UnregisterNodesResponse,
    EndpointConfiguration,
    QueryDataDescription,
    NodeTypeDescription,
    QueryDataSet,
    NodeReference,
    ContentFilterElement,
    ContentFilter,
    FilterOperand,
    ElementOperand,
    LiteralOperand,
    AttributeOperand,
    SimpleAttributeOperand,
    ContentFilterElementResult,
    ContentFilterResult,
    ParsingResult,
    QueryFirstRequest,
    QueryFirstResponse,
    QueryNextRequest,
    QueryNextResponse,
    ReadValueId,
    ReadRequest,
    ReadResponse,
    HistoryReadValueId,
    HistoryReadResult,
    HistoryReadDetails,
    ReadEventDetails,
    ReadEventDetails2,
    SortRuleElement,
    ReadEventDetailsSorted,
    ReadRawModifiedDetails,
    ReadProcessedDetails,
    ReadAtTimeDetails,
    ReadAnnotationDataDetails,
    HistoryData,
    ModificationInfo,
    HistoryModifiedData,
    HistoryEvent,
    HistoryModifiedEvent,
    HistoryReadRequest,
    HistoryReadResponse,
    WriteValue,
    WriteRequest,
    WriteResponse,
    HistoryUpdateDetails,
    UpdateDataDetails,
    UpdateStructureDataDetails,
    UpdateEventDetails,
    DeleteRawModifiedDetails,
    DeleteAtTimeDetails,
    DeleteEventDetails,
    HistoryUpdateResult,
    HistoryUpdateRequest,
    HistoryUpdateResponse,
    CallMethodRequest,
    CallMethodResult,
    CallRequest,
    CallResponse,
    MonitoringFilter,
    DataChangeFilter,
    EventFilter,
    AggregateConfiguration,
    AggregateFilter,
    MonitoringFilterResult,
    EventFilterResult,
    AggregateFilterResult,
    MonitoringParameters,
    MonitoredItemCreateRequest,
    MonitoredItemCreateResult,
    CreateMonitoredItemsRequest,
    CreateMonitoredItemsResponse,
    MonitoredItemModifyRequest,
    MonitoredItemModifyResult,
    ModifyMonitoredItemsRequest,
    ModifyMonitoredItemsResponse,
    SetMonitoringModeRequest,
    SetMonitoringModeResponse,
    SetTriggeringRequest,
    SetTriggeringResponse,
    DeleteMonitoredItemsRequest,
    DeleteMonitoredItemsResponse,
    CreateSubscriptionRequest,
    CreateSubscriptionResponse,
    ModifySubscriptionRequest,
    ModifySubscriptionResponse,
    SetPublishingModeRequest,
    SetPublishingModeResponse,
    NotificationMessage,
    NotificationData,
    DataChangeNotification,
    MonitoredItemNotification,
    EventNotificationList,
    EventFieldList,
    HistoryEventFieldList,
    StatusChangeNotification,
    SubscriptionAcknowledgement,
    PublishRequest,
    PublishResponse,
    RepublishRequest,
    RepublishResponse,
    TransferResult,
    TransferSubscriptionsRequest,
    TransferSubscriptionsResponse,
    DeleteSubscriptionsRequest,
    DeleteSubscriptionsResponse,
    BuildInfo,
    RedundantServerDataType,
    EndpointUrlListDataType,
    NetworkGroupDataType,
    SamplingIntervalDiagnosticsDataType,
    ServerDiagnosticsSummaryDataType,
    ServerStatusDataType,
    SessionDiagnosticsDataType,
    SessionSecurityDiagnosticsDataType,
    ServiceCounterDataType,
    StatusResult,
    SubscriptionDiagnosticsDataType,
    ModelChangeStructureDataType,
    SemanticChangeStructureDataType,
    Range,
    EUInformation,
    ComplexNumberType,
    DoubleComplexNumberType,
    AxisInformation,
    XVType,
    ProgramDiagnosticDataType,
    ProgramDiagnostic2DataType,
    Annotation
} from './types.js';
import {
    encodeUnion,
    encodeKeyValuePair,
    encodeAdditionalParametersType,
    encodeEphemeralKeyType,
    encodeEndpointType,
    encodeBitFieldDefinition,
    encodeRationalNumber,
    encodeVector,
    encodeCartesianCoordinates,
    encodeOrientation,
    encodeFrame,
    encodeIdentityMappingRuleType,
    encodeCurrencyUnitType,
    encodeAnnotationDataType,
    encodeLinearConversionDataType,
    encodeQuantityDimension,
    encodeTrustListDataType,
    encodeBaseConfigurationDataType,
    encodeBaseConfigurationRecordDataType,
    encodeCertificateGroupDataType,
    encodeConfigurationUpdateTargetType,
    encodeTransactionErrorType,
    encodeApplicationConfigurationDataType,
    encodeApplicationIdentityDataType,
    encodeEndpointDataType,
    encodeServerEndpointDataType,
    encodeSecuritySettingsDataType,
    encodeUserTokenSettingsDataType,
    encodeServiceCertificateDataType,
    encodeAuthorizationServiceConfigurationDataType,
    encodeDecimalDataType,
    encodeDataTypeSchemaHeader,
    encodeDataTypeDescription,
    encodeStructureDescription,
    encodeEnumDescription,
    encodeSimpleTypeDescription,
    encodeUABinaryFileDataType,
    encodePortableQualifiedName,
    encodePortableNodeId,
    encodeUnsignedRationalNumber,
    encodeDataSetMetaDataType,
    encodeFieldMetaData,
    encodeConfigurationVersionDataType,
    encodePublishedDataSetDataType,
    encodePublishedDataSetSourceDataType,
    encodePublishedVariableDataType,
    encodePublishedDataItemsDataType,
    encodePublishedEventsDataType,
    encodePublishedDataSetCustomSourceDataType,
    encodeActionTargetDataType,
    encodePublishedActionDataType,
    encodeActionMethodDataType,
    encodePublishedActionMethodDataType,
    encodeDataSetWriterDataType,
    encodeDataSetWriterTransportDataType,
    encodeDataSetWriterMessageDataType,
    encodePubSubGroupDataType,
    encodeWriterGroupDataType,
    encodeWriterGroupTransportDataType,
    encodeWriterGroupMessageDataType,
    encodePubSubConnectionDataType,
    encodeConnectionTransportDataType,
    encodeNetworkAddressDataType,
    encodeNetworkAddressUrlDataType,
    encodeReaderGroupDataType,
    encodeReaderGroupTransportDataType,
    encodeReaderGroupMessageDataType,
    encodeDataSetReaderDataType,
    encodeDataSetReaderTransportDataType,
    encodeDataSetReaderMessageDataType,
    encodeSubscribedDataSetDataType,
    encodeTargetVariablesDataType,
    encodeFieldTargetDataType,
    encodeSubscribedDataSetMirrorDataType,
    encodePubSubConfigurationDataType,
    encodeStandaloneSubscribedDataSetRefDataType,
    encodeStandaloneSubscribedDataSetDataType,
    encodeSecurityGroupDataType,
    encodePubSubKeyPushTargetDataType,
    encodePubSubConfiguration2DataType,
    encodeUadpWriterGroupMessageDataType,
    encodeUadpDataSetWriterMessageDataType,
    encodeUadpDataSetReaderMessageDataType,
    encodeJsonWriterGroupMessageDataType,
    encodeJsonDataSetWriterMessageDataType,
    encodeJsonDataSetReaderMessageDataType,
    encodeQosDataType,
    encodeTransmitQosDataType,
    encodeTransmitQosPriorityDataType,
    encodeReceiveQosDataType,
    encodeReceiveQosPriorityDataType,
    encodeDatagramConnectionTransportDataType,
    encodeDatagramConnectionTransport2DataType,
    encodeDatagramWriterGroupTransportDataType,
    encodeDatagramWriterGroupTransport2DataType,
    encodeDatagramDataSetReaderTransportDataType,
    encodeDtlsPubSubConnectionDataType,
    encodeBrokerConnectionTransportDataType,
    encodeBrokerWriterGroupTransportDataType,
    encodeBrokerDataSetWriterTransportDataType,
    encodeBrokerDataSetReaderTransportDataType,
    encodePubSubConfigurationRefDataType,
    encodePubSubConfigurationValueDataType,
    encodeJsonNetworkMessage,
    encodeJsonDataSetMessage,
    encodeJsonDataSetMetaDataMessage,
    encodeJsonApplicationDescriptionMessage,
    encodeJsonServerEndpointsMessage,
    encodeJsonStatusMessage,
    encodeJsonPubSubConnectionMessage,
    encodeJsonActionMetaDataMessage,
    encodeJsonActionResponderMessage,
    encodeJsonActionNetworkMessage,
    encodeJsonActionRequestMessage,
    encodeJsonActionResponseMessage,
    encodeAliasNameDataType,
    encodeUserManagementDataType,
    encodePriorityMappingEntryType,
    encodeLldpManagementAddressTxPortType,
    encodeLldpManagementAddressType,
    encodeLldpTlvType,
    encodeReferenceDescriptionDataType,
    encodeReferenceListEntryDataType,
    encodeLogRecord,
    encodeLogRecordsDataType,
    encodeSpanContextDataType,
    encodeTraceContextDataType,
    encodeNameValuePair,
    encodeRolePermissionType,
    encodeDataTypeDefinition,
    encodeStructureField,
    encodeStructureDefinition,
    encodeEnumDefinition,
    encodeNode,
    encodeInstanceNode,
    encodeTypeNode,
    encodeObjectNode,
    encodeObjectTypeNode,
    encodeVariableNode,
    encodeVariableTypeNode,
    encodeReferenceTypeNode,
    encodeMethodNode,
    encodeViewNode,
    encodeDataTypeNode,
    encodeReferenceNode,
    encodeArgument,
    encodeEnumValueType,
    encodeEnumField,
    encodeOptionSet,
    encodeTimeZoneDataType,
    encodeApplicationDescription,
    encodeRequestHeader,
    encodeResponseHeader,
    encodeServiceFault,
    encodeSessionlessInvokeRequestType,
    encodeSessionlessInvokeResponseType,
    encodeFindServersRequest,
    encodeFindServersResponse,
    encodeServerOnNetwork,
    encodeFindServersOnNetworkRequest,
    encodeFindServersOnNetworkResponse,
    encodeUserTokenPolicy,
    encodeEndpointDescription,
    encodeGetEndpointsRequest,
    encodeGetEndpointsResponse,
    encodeRegisteredServer,
    encodeRegisterServerRequest,
    encodeRegisterServerResponse,
    encodeDiscoveryConfiguration,
    encodeMdnsDiscoveryConfiguration,
    encodeRegisterServer2Request,
    encodeRegisterServer2Response,
    encodeChannelSecurityToken,
    encodeOpenSecureChannelRequest,
    encodeOpenSecureChannelResponse,
    encodeCloseSecureChannelRequest,
    encodeCloseSecureChannelResponse,
    encodeSignedSoftwareCertificate,
    encodeSignatureData,
    encodeCreateSessionRequest,
    encodeCreateSessionResponse,
    encodeUserIdentityToken,
    encodeAnonymousIdentityToken,
    encodeUserNameIdentityToken,
    encodeX509IdentityToken,
    encodeIssuedIdentityToken,
    encodeActivateSessionRequest,
    encodeActivateSessionResponse,
    encodeCloseSessionRequest,
    encodeCloseSessionResponse,
    encodeCancelRequest,
    encodeCancelResponse,
    encodeNodeAttributes,
    encodeObjectAttributes,
    encodeVariableAttributes,
    encodeMethodAttributes,
    encodeObjectTypeAttributes,
    encodeVariableTypeAttributes,
    encodeReferenceTypeAttributes,
    encodeDataTypeAttributes,
    encodeViewAttributes,
    encodeGenericAttributeValue,
    encodeGenericAttributes,
    encodeAddNodesItem,
    encodeAddNodesResult,
    encodeAddNodesRequest,
    encodeAddNodesResponse,
    encodeAddReferencesItem,
    encodeAddReferencesRequest,
    encodeAddReferencesResponse,
    encodeDeleteNodesItem,
    encodeDeleteNodesRequest,
    encodeDeleteNodesResponse,
    encodeDeleteReferencesItem,
    encodeDeleteReferencesRequest,
    encodeDeleteReferencesResponse,
    encodeViewDescription,
    encodeBrowseDescription,
    encodeReferenceDescription,
    encodeBrowseResult,
    encodeBrowseRequest,
    encodeBrowseResponse,
    encodeBrowseNextRequest,
    encodeBrowseNextResponse,
    encodeRelativePathElement,
    encodeRelativePath,
    encodeBrowsePath,
    encodeBrowsePathTarget,
    encodeBrowsePathResult,
    encodeTranslateBrowsePathsToNodeIdsRequest,
    encodeTranslateBrowsePathsToNodeIdsResponse,
    encodeRegisterNodesRequest,
    encodeRegisterNodesResponse,
    encodeUnregisterNodesRequest,
    encodeUnregisterNodesResponse,
    encodeEndpointConfiguration,
    encodeQueryDataDescription,
    encodeNodeTypeDescription,
    encodeQueryDataSet,
    encodeNodeReference,
    encodeContentFilterElement,
    encodeContentFilter,
    encodeFilterOperand,
    encodeElementOperand,
    encodeLiteralOperand,
    encodeAttributeOperand,
    encodeSimpleAttributeOperand,
    encodeContentFilterElementResult,
    encodeContentFilterResult,
    encodeParsingResult,
    encodeQueryFirstRequest,
    encodeQueryFirstResponse,
    encodeQueryNextRequest,
    encodeQueryNextResponse,
    encodeReadValueId,
    encodeReadRequest,
    encodeReadResponse,
    encodeHistoryReadValueId,
    encodeHistoryReadResult,
    encodeHistoryReadDetails,
    encodeReadEventDetails,
    encodeReadEventDetails2,
    encodeSortRuleElement,
    encodeReadEventDetailsSorted,
    encodeReadRawModifiedDetails,
    encodeReadProcessedDetails,
    encodeReadAtTimeDetails,
    encodeReadAnnotationDataDetails,
    encodeHistoryData,
    encodeModificationInfo,
    encodeHistoryModifiedData,
    encodeHistoryEvent,
    encodeHistoryModifiedEvent,
    encodeHistoryReadRequest,
    encodeHistoryReadResponse,
    encodeWriteValue,
    encodeWriteRequest,
    encodeWriteResponse,
    encodeHistoryUpdateDetails,
    encodeUpdateDataDetails,
    encodeUpdateStructureDataDetails,
    encodeUpdateEventDetails,
    encodeDeleteRawModifiedDetails,
    encodeDeleteAtTimeDetails,
    encodeDeleteEventDetails,
    encodeHistoryUpdateResult,
    encodeHistoryUpdateRequest,
    encodeHistoryUpdateResponse,
    encodeCallMethodRequest,
    encodeCallMethodResult,
    encodeCallRequest,
    encodeCallResponse,
    encodeMonitoringFilter,
    encodeDataChangeFilter,
    encodeEventFilter,
    encodeAggregateConfiguration,
    encodeAggregateFilter,
    encodeMonitoringFilterResult,
    encodeEventFilterResult,
    encodeAggregateFilterResult,
    encodeMonitoringParameters,
    encodeMonitoredItemCreateRequest,
    encodeMonitoredItemCreateResult,
    encodeCreateMonitoredItemsRequest,
    encodeCreateMonitoredItemsResponse,
    encodeMonitoredItemModifyRequest,
    encodeMonitoredItemModifyResult,
    encodeModifyMonitoredItemsRequest,
    encodeModifyMonitoredItemsResponse,
    encodeSetMonitoringModeRequest,
    encodeSetMonitoringModeResponse,
    encodeSetTriggeringRequest,
    encodeSetTriggeringResponse,
    encodeDeleteMonitoredItemsRequest,
    encodeDeleteMonitoredItemsResponse,
    encodeCreateSubscriptionRequest,
    encodeCreateSubscriptionResponse,
    encodeModifySubscriptionRequest,
    encodeModifySubscriptionResponse,
    encodeSetPublishingModeRequest,
    encodeSetPublishingModeResponse,
    encodeNotificationMessage,
    encodeNotificationData,
    encodeDataChangeNotification,
    encodeMonitoredItemNotification,
    encodeEventNotificationList,
    encodeEventFieldList,
    encodeHistoryEventFieldList,
    encodeStatusChangeNotification,
    encodeSubscriptionAcknowledgement,
    encodePublishRequest,
    encodePublishResponse,
    encodeRepublishRequest,
    encodeRepublishResponse,
    encodeTransferResult,
    encodeTransferSubscriptionsRequest,
    encodeTransferSubscriptionsResponse,
    encodeDeleteSubscriptionsRequest,
    encodeDeleteSubscriptionsResponse,
    encodeBuildInfo,
    encodeRedundantServerDataType,
    encodeEndpointUrlListDataType,
    encodeNetworkGroupDataType,
    encodeSamplingIntervalDiagnosticsDataType,
    encodeServerDiagnosticsSummaryDataType,
    encodeServerStatusDataType,
    encodeSessionDiagnosticsDataType,
    encodeSessionSecurityDiagnosticsDataType,
    encodeServiceCounterDataType,
    encodeStatusResult,
    encodeSubscriptionDiagnosticsDataType,
    encodeModelChangeStructureDataType,
    encodeSemanticChangeStructureDataType,
    encodeRange,
    encodeEUInformation,
    encodeComplexNumberType,
    encodeDoubleComplexNumberType,
    encodeAxisInformation,
    encodeXVType,
    encodeProgramDiagnosticDataType,
    encodeProgramDiagnostic2DataType,
    encodeAnnotation
} from './encoders.js';

export function registerEncoders(encoder: Encoder){
    encoder.registerType(12756, (w, v) => encodeUnion(w, v as Union, encoder));
    encoder.registerType(14533, (w, v) => encodeKeyValuePair(w, v as KeyValuePair, encoder));
    encoder.registerType(16313, (w, v) => encodeAdditionalParametersType(w, v as AdditionalParametersType, encoder));
    encoder.registerType(17548, (w, v) => encodeEphemeralKeyType(w, v as EphemeralKeyType, encoder));
    encoder.registerType(15528, (w, v) => encodeEndpointType(w, v as EndpointType, encoder));
    encoder.registerType(32421, (w, v) => encodeBitFieldDefinition(w, v as BitFieldDefinition, encoder));
    encoder.registerType(18806, (w, v) => encodeRationalNumber(w, v as RationalNumber, encoder));
    encoder.registerType(18807, (w, v) => encodeVector(w, v as Vector, encoder));
    encoder.registerType(18809, (w, v) => encodeCartesianCoordinates(w, v as CartesianCoordinates, encoder));
    encoder.registerType(18811, (w, v) => encodeOrientation(w, v as Orientation, encoder));
    encoder.registerType(18813, (w, v) => encodeFrame(w, v as Frame, encoder));
    encoder.registerType(15634, (w, v) => encodeIdentityMappingRuleType(w, v as IdentityMappingRuleType, encoder));
    encoder.registerType(23498, (w, v) => encodeCurrencyUnitType(w, v as CurrencyUnitType, encoder));
    encoder.registerType(32434, (w, v) => encodeAnnotationDataType(w, v as AnnotationDataType, encoder));
    encoder.registerType(32435, (w, v) => encodeLinearConversionDataType(w, v as LinearConversionDataType, encoder));
    encoder.registerType(32438, (w, v) => encodeQuantityDimension(w, v as QuantityDimension, encoder));
    encoder.registerType(12554, (w, v) => encodeTrustListDataType(w, v as TrustListDataType, encoder));
    encoder.registerType(15434, (w, v) => encodeBaseConfigurationDataType(w, v as BaseConfigurationDataType, encoder));
    encoder.registerType(15435, (w, v) => encodeBaseConfigurationRecordDataType(w, v as BaseConfigurationRecordDataType, encoder));
    encoder.registerType(15436, (w, v) => encodeCertificateGroupDataType(w, v as CertificateGroupDataType, encoder));
    encoder.registerType(15538, (w, v) => encodeConfigurationUpdateTargetType(w, v as ConfigurationUpdateTargetType, encoder));
    encoder.registerType(32285, (w, v) => encodeTransactionErrorType(w, v as TransactionErrorType, encoder));
    encoder.registerType(23743, (w, v) => encodeApplicationConfigurationDataType(w, v as ApplicationConfigurationDataType, encoder));
    encoder.registerType(15556, (w, v) => encodeApplicationIdentityDataType(w, v as ApplicationIdentityDataType, encoder));
    encoder.registerType(15557, (w, v) => encodeEndpointDataType(w, v as EndpointDataType, encoder));
    encoder.registerType(15558, (w, v) => encodeServerEndpointDataType(w, v as ServerEndpointDataType, encoder));
    encoder.registerType(15559, (w, v) => encodeSecuritySettingsDataType(w, v as SecuritySettingsDataType, encoder));
    encoder.registerType(15560, (w, v) => encodeUserTokenSettingsDataType(w, v as UserTokenSettingsDataType, encoder));
    encoder.registerType(23724, (w, v) => encodeServiceCertificateDataType(w, v as ServiceCertificateDataType, encoder));
    encoder.registerType(23744, (w, v) => encodeAuthorizationServiceConfigurationDataType(w, v as AuthorizationServiceConfigurationDataType, encoder));
    encoder.registerType(17861, (w, v) => encodeDecimalDataType(w, v as DecimalDataType, encoder));
    encoder.registerType(15534, (w, v) => encodeDataTypeSchemaHeader(w, v as DataTypeSchemaHeader, encoder));
    encoder.registerType(14525, (w, v) => encodeDataTypeDescription(w, v as DataTypeDescription, encoder));
    encoder.registerType(15487, (w, v) => encodeStructureDescription(w, v as StructureDescription, encoder));
    encoder.registerType(15488, (w, v) => encodeEnumDescription(w, v as EnumDescription, encoder));
    encoder.registerType(15005, (w, v) => encodeSimpleTypeDescription(w, v as SimpleTypeDescription, encoder));
    encoder.registerType(15006, (w, v) => encodeUABinaryFileDataType(w, v as UABinaryFileDataType, encoder));
    encoder.registerType(24105, (w, v) => encodePortableQualifiedName(w, v as PortableQualifiedName, encoder));
    encoder.registerType(24106, (w, v) => encodePortableNodeId(w, v as PortableNodeId, encoder));
    encoder.registerType(24107, (w, v) => encodeUnsignedRationalNumber(w, v as UnsignedRationalNumber, encoder));
    encoder.registerType(14523, (w, v) => encodeDataSetMetaDataType(w, v as DataSetMetaDataType, encoder));
    encoder.registerType(14524, (w, v) => encodeFieldMetaData(w, v as FieldMetaData, encoder));
    encoder.registerType(14593, (w, v) => encodeConfigurationVersionDataType(w, v as ConfigurationVersionDataType, encoder));
    encoder.registerType(15578, (w, v) => encodePublishedDataSetDataType(w, v as PublishedDataSetDataType, encoder));
    encoder.registerType(15580, (w, v) => encodePublishedDataSetSourceDataType(w, v as PublishedDataSetSourceDataType, encoder));
    encoder.registerType(14273, (w, v) => encodePublishedVariableDataType(w, v as PublishedVariableDataType, encoder));
    encoder.registerType(15581, (w, v) => encodePublishedDataItemsDataType(w, v as PublishedDataItemsDataType, encoder));
    encoder.registerType(15582, (w, v) => encodePublishedEventsDataType(w, v as PublishedEventsDataType, encoder));
    encoder.registerType(25269, (w, v) => encodePublishedDataSetCustomSourceDataType(w, v as PublishedDataSetCustomSourceDataType, encoder));
    encoder.registerType(18593, (w, v) => encodeActionTargetDataType(w, v as ActionTargetDataType, encoder));
    encoder.registerType(18594, (w, v) => encodePublishedActionDataType(w, v as PublishedActionDataType, encoder));
    encoder.registerType(18597, (w, v) => encodeActionMethodDataType(w, v as ActionMethodDataType, encoder));
    encoder.registerType(18793, (w, v) => encodePublishedActionMethodDataType(w, v as PublishedActionMethodDataType, encoder));
    encoder.registerType(15597, (w, v) => encodeDataSetWriterDataType(w, v as DataSetWriterDataType, encoder));
    encoder.registerType(15598, (w, v) => encodeDataSetWriterTransportDataType(w, v as DataSetWriterTransportDataType, encoder));
    encoder.registerType(15605, (w, v) => encodeDataSetWriterMessageDataType(w, v as DataSetWriterMessageDataType, encoder));
    encoder.registerType(15609, (w, v) => encodePubSubGroupDataType(w, v as PubSubGroupDataType, encoder));
    encoder.registerType(15480, (w, v) => encodeWriterGroupDataType(w, v as WriterGroupDataType, encoder));
    encoder.registerType(15611, (w, v) => encodeWriterGroupTransportDataType(w, v as WriterGroupTransportDataType, encoder));
    encoder.registerType(15616, (w, v) => encodeWriterGroupMessageDataType(w, v as WriterGroupMessageDataType, encoder));
    encoder.registerType(15617, (w, v) => encodePubSubConnectionDataType(w, v as PubSubConnectionDataType, encoder));
    encoder.registerType(15618, (w, v) => encodeConnectionTransportDataType(w, v as ConnectionTransportDataType, encoder));
    encoder.registerType(15502, (w, v) => encodeNetworkAddressDataType(w, v as NetworkAddressDataType, encoder));
    encoder.registerType(15510, (w, v) => encodeNetworkAddressUrlDataType(w, v as NetworkAddressUrlDataType, encoder));
    encoder.registerType(15520, (w, v) => encodeReaderGroupDataType(w, v as ReaderGroupDataType, encoder));
    encoder.registerType(15621, (w, v) => encodeReaderGroupTransportDataType(w, v as ReaderGroupTransportDataType, encoder));
    encoder.registerType(15622, (w, v) => encodeReaderGroupMessageDataType(w, v as ReaderGroupMessageDataType, encoder));
    encoder.registerType(15623, (w, v) => encodeDataSetReaderDataType(w, v as DataSetReaderDataType, encoder));
    encoder.registerType(15628, (w, v) => encodeDataSetReaderTransportDataType(w, v as DataSetReaderTransportDataType, encoder));
    encoder.registerType(15629, (w, v) => encodeDataSetReaderMessageDataType(w, v as DataSetReaderMessageDataType, encoder));
    encoder.registerType(15630, (w, v) => encodeSubscribedDataSetDataType(w, v as SubscribedDataSetDataType, encoder));
    encoder.registerType(15631, (w, v) => encodeTargetVariablesDataType(w, v as TargetVariablesDataType, encoder));
    encoder.registerType(14744, (w, v) => encodeFieldTargetDataType(w, v as FieldTargetDataType, encoder));
    encoder.registerType(15635, (w, v) => encodeSubscribedDataSetMirrorDataType(w, v as SubscribedDataSetMirrorDataType, encoder));
    encoder.registerType(15530, (w, v) => encodePubSubConfigurationDataType(w, v as PubSubConfigurationDataType, encoder));
    encoder.registerType(23599, (w, v) => encodeStandaloneSubscribedDataSetRefDataType(w, v as StandaloneSubscribedDataSetRefDataType, encoder));
    encoder.registerType(23600, (w, v) => encodeStandaloneSubscribedDataSetDataType(w, v as StandaloneSubscribedDataSetDataType, encoder));
    encoder.registerType(23601, (w, v) => encodeSecurityGroupDataType(w, v as SecurityGroupDataType, encoder));
    encoder.registerType(25270, (w, v) => encodePubSubKeyPushTargetDataType(w, v as PubSubKeyPushTargetDataType, encoder));
    encoder.registerType(23602, (w, v) => encodePubSubConfiguration2DataType(w, v as PubSubConfiguration2DataType, encoder));
    encoder.registerType(15645, (w, v) => encodeUadpWriterGroupMessageDataType(w, v as UadpWriterGroupMessageDataType, encoder));
    encoder.registerType(15652, (w, v) => encodeUadpDataSetWriterMessageDataType(w, v as UadpDataSetWriterMessageDataType, encoder));
    encoder.registerType(15653, (w, v) => encodeUadpDataSetReaderMessageDataType(w, v as UadpDataSetReaderMessageDataType, encoder));
    encoder.registerType(15657, (w, v) => encodeJsonWriterGroupMessageDataType(w, v as JsonWriterGroupMessageDataType, encoder));
    encoder.registerType(15664, (w, v) => encodeJsonDataSetWriterMessageDataType(w, v as JsonDataSetWriterMessageDataType, encoder));
    encoder.registerType(15665, (w, v) => encodeJsonDataSetReaderMessageDataType(w, v as JsonDataSetReaderMessageDataType, encoder));
    encoder.registerType(23603, (w, v) => encodeQosDataType(w, v as QosDataType, encoder));
    encoder.registerType(23604, (w, v) => encodeTransmitQosDataType(w, v as TransmitQosDataType, encoder));
    encoder.registerType(23605, (w, v) => encodeTransmitQosPriorityDataType(w, v as TransmitQosPriorityDataType, encoder));
    encoder.registerType(23608, (w, v) => encodeReceiveQosDataType(w, v as ReceiveQosDataType, encoder));
    encoder.registerType(23609, (w, v) => encodeReceiveQosPriorityDataType(w, v as ReceiveQosPriorityDataType, encoder));
    encoder.registerType(17467, (w, v) => encodeDatagramConnectionTransportDataType(w, v as DatagramConnectionTransportDataType, encoder));
    encoder.registerType(23612, (w, v) => encodeDatagramConnectionTransport2DataType(w, v as DatagramConnectionTransport2DataType, encoder));
    encoder.registerType(15532, (w, v) => encodeDatagramWriterGroupTransportDataType(w, v as DatagramWriterGroupTransportDataType, encoder));
    encoder.registerType(23613, (w, v) => encodeDatagramWriterGroupTransport2DataType(w, v as DatagramWriterGroupTransport2DataType, encoder));
    encoder.registerType(23614, (w, v) => encodeDatagramDataSetReaderTransportDataType(w, v as DatagramDataSetReaderTransportDataType, encoder));
    encoder.registerType(18794, (w, v) => encodeDtlsPubSubConnectionDataType(w, v as DtlsPubSubConnectionDataType, encoder));
    encoder.registerType(15007, (w, v) => encodeBrokerConnectionTransportDataType(w, v as BrokerConnectionTransportDataType, encoder));
    encoder.registerType(15667, (w, v) => encodeBrokerWriterGroupTransportDataType(w, v as BrokerWriterGroupTransportDataType, encoder));
    encoder.registerType(15669, (w, v) => encodeBrokerDataSetWriterTransportDataType(w, v as BrokerDataSetWriterTransportDataType, encoder));
    encoder.registerType(15670, (w, v) => encodeBrokerDataSetReaderTransportDataType(w, v as BrokerDataSetReaderTransportDataType, encoder));
    encoder.registerType(25519, (w, v) => encodePubSubConfigurationRefDataType(w, v as PubSubConfigurationRefDataType, encoder));
    encoder.registerType(25520, (w, v) => encodePubSubConfigurationValueDataType(w, v as PubSubConfigurationValueDataType, encoder));
    encoder.registerType(19311, (w, v) => encodeJsonNetworkMessage(w, v as JsonNetworkMessage, encoder));
    encoder.registerType(19312, (w, v) => encodeJsonDataSetMessage(w, v as JsonDataSetMessage, encoder));
    encoder.registerType(19313, (w, v) => encodeJsonDataSetMetaDataMessage(w, v as JsonDataSetMetaDataMessage, encoder));
    encoder.registerType(19314, (w, v) => encodeJsonApplicationDescriptionMessage(w, v as JsonApplicationDescriptionMessage, encoder));
    encoder.registerType(19315, (w, v) => encodeJsonServerEndpointsMessage(w, v as JsonServerEndpointsMessage, encoder));
    encoder.registerType(19316, (w, v) => encodeJsonStatusMessage(w, v as JsonStatusMessage, encoder));
    encoder.registerType(19317, (w, v) => encodeJsonPubSubConnectionMessage(w, v as JsonPubSubConnectionMessage, encoder));
    encoder.registerType(19318, (w, v) => encodeJsonActionMetaDataMessage(w, v as JsonActionMetaDataMessage, encoder));
    encoder.registerType(19319, (w, v) => encodeJsonActionResponderMessage(w, v as JsonActionResponderMessage, encoder));
    encoder.registerType(19320, (w, v) => encodeJsonActionNetworkMessage(w, v as JsonActionNetworkMessage, encoder));
    encoder.registerType(19321, (w, v) => encodeJsonActionRequestMessage(w, v as JsonActionRequestMessage, encoder));
    encoder.registerType(19322, (w, v) => encodeJsonActionResponseMessage(w, v as JsonActionResponseMessage, encoder));
    encoder.registerType(23468, (w, v) => encodeAliasNameDataType(w, v as AliasNameDataType, encoder));
    encoder.registerType(24281, (w, v) => encodeUserManagementDataType(w, v as UserManagementDataType, encoder));
    encoder.registerType(25220, (w, v) => encodePriorityMappingEntryType(w, v as PriorityMappingEntryType, encoder));
    encoder.registerType(18953, (w, v) => encodeLldpManagementAddressTxPortType(w, v as LldpManagementAddressTxPortType, encoder));
    encoder.registerType(18954, (w, v) => encodeLldpManagementAddressType(w, v as LldpManagementAddressType, encoder));
    encoder.registerType(18955, (w, v) => encodeLldpTlvType(w, v as LldpTlvType, encoder));
    encoder.registerType(32659, (w, v) => encodeReferenceDescriptionDataType(w, v as ReferenceDescriptionDataType, encoder));
    encoder.registerType(32660, (w, v) => encodeReferenceListEntryDataType(w, v as ReferenceListEntryDataType, encoder));
    encoder.registerType(19361, (w, v) => encodeLogRecord(w, v as LogRecord, encoder));
    encoder.registerType(19745, (w, v) => encodeLogRecordsDataType(w, v as LogRecordsDataType, encoder));
    encoder.registerType(19746, (w, v) => encodeSpanContextDataType(w, v as SpanContextDataType, encoder));
    encoder.registerType(19747, (w, v) => encodeTraceContextDataType(w, v as TraceContextDataType, encoder));
    encoder.registerType(19748, (w, v) => encodeNameValuePair(w, v as NameValuePair, encoder));
    encoder.registerType(96, (w, v) => encodeRolePermissionType(w, v as RolePermissionType, encoder));
    encoder.registerType(97, (w, v) => encodeDataTypeDefinition(w, v as DataTypeDefinition, encoder));
    encoder.registerType(101, (w, v) => encodeStructureField(w, v as StructureField, encoder));
    encoder.registerType(99, (w, v) => encodeStructureDefinition(w, v as StructureDefinition, encoder));
    encoder.registerType(100, (w, v) => encodeEnumDefinition(w, v as EnumDefinition, encoder));
    encoder.registerType(258, (w, v) => encodeNode(w, v as Node, encoder));
    encoder.registerType(11879, (w, v) => encodeInstanceNode(w, v as InstanceNode, encoder));
    encoder.registerType(11880, (w, v) => encodeTypeNode(w, v as TypeNode, encoder));
    encoder.registerType(261, (w, v) => encodeObjectNode(w, v as ObjectNode, encoder));
    encoder.registerType(264, (w, v) => encodeObjectTypeNode(w, v as ObjectTypeNode, encoder));
    encoder.registerType(267, (w, v) => encodeVariableNode(w, v as VariableNode, encoder));
    encoder.registerType(270, (w, v) => encodeVariableTypeNode(w, v as VariableTypeNode, encoder));
    encoder.registerType(273, (w, v) => encodeReferenceTypeNode(w, v as ReferenceTypeNode, encoder));
    encoder.registerType(276, (w, v) => encodeMethodNode(w, v as MethodNode, encoder));
    encoder.registerType(279, (w, v) => encodeViewNode(w, v as ViewNode, encoder));
    encoder.registerType(282, (w, v) => encodeDataTypeNode(w, v as DataTypeNode, encoder));
    encoder.registerType(285, (w, v) => encodeReferenceNode(w, v as ReferenceNode, encoder));
    encoder.registerType(296, (w, v) => encodeArgument(w, v as Argument, encoder));
    encoder.registerType(7594, (w, v) => encodeEnumValueType(w, v as EnumValueType, encoder));
    encoder.registerType(102, (w, v) => encodeEnumField(w, v as EnumField, encoder));
    encoder.registerType(12755, (w, v) => encodeOptionSet(w, v as OptionSet, encoder));
    encoder.registerType(8912, (w, v) => encodeTimeZoneDataType(w, v as TimeZoneDataType, encoder));
    encoder.registerType(308, (w, v) => encodeApplicationDescription(w, v as ApplicationDescription, encoder));
    encoder.registerType(389, (w, v) => encodeRequestHeader(w, v as RequestHeader, encoder));
    encoder.registerType(392, (w, v) => encodeResponseHeader(w, v as ResponseHeader, encoder));
    encoder.registerType(395, (w, v) => encodeServiceFault(w, v as ServiceFault, encoder));
    encoder.registerType(15901, (w, v) => encodeSessionlessInvokeRequestType(w, v as SessionlessInvokeRequestType, encoder));
    encoder.registerType(20999, (w, v) => encodeSessionlessInvokeResponseType(w, v as SessionlessInvokeResponseType, encoder));
    encoder.registerType(420, (w, v) => encodeFindServersRequest(w, v as FindServersRequest, encoder));
    encoder.registerType(423, (w, v) => encodeFindServersResponse(w, v as FindServersResponse, encoder));
    encoder.registerType(12189, (w, v) => encodeServerOnNetwork(w, v as ServerOnNetwork, encoder));
    encoder.registerType(12190, (w, v) => encodeFindServersOnNetworkRequest(w, v as FindServersOnNetworkRequest, encoder));
    encoder.registerType(12191, (w, v) => encodeFindServersOnNetworkResponse(w, v as FindServersOnNetworkResponse, encoder));
    encoder.registerType(304, (w, v) => encodeUserTokenPolicy(w, v as UserTokenPolicy, encoder));
    encoder.registerType(312, (w, v) => encodeEndpointDescription(w, v as EndpointDescription, encoder));
    encoder.registerType(426, (w, v) => encodeGetEndpointsRequest(w, v as GetEndpointsRequest, encoder));
    encoder.registerType(429, (w, v) => encodeGetEndpointsResponse(w, v as GetEndpointsResponse, encoder));
    encoder.registerType(432, (w, v) => encodeRegisteredServer(w, v as RegisteredServer, encoder));
    encoder.registerType(435, (w, v) => encodeRegisterServerRequest(w, v as RegisterServerRequest, encoder));
    encoder.registerType(438, (w, v) => encodeRegisterServerResponse(w, v as RegisterServerResponse, encoder));
    encoder.registerType(12890, (w, v) => encodeDiscoveryConfiguration(w, v as DiscoveryConfiguration, encoder));
    encoder.registerType(12891, (w, v) => encodeMdnsDiscoveryConfiguration(w, v as MdnsDiscoveryConfiguration, encoder));
    encoder.registerType(12193, (w, v) => encodeRegisterServer2Request(w, v as RegisterServer2Request, encoder));
    encoder.registerType(12194, (w, v) => encodeRegisterServer2Response(w, v as RegisterServer2Response, encoder));
    encoder.registerType(441, (w, v) => encodeChannelSecurityToken(w, v as ChannelSecurityToken, encoder));
    encoder.registerType(444, (w, v) => encodeOpenSecureChannelRequest(w, v as OpenSecureChannelRequest, encoder));
    encoder.registerType(447, (w, v) => encodeOpenSecureChannelResponse(w, v as OpenSecureChannelResponse, encoder));
    encoder.registerType(450, (w, v) => encodeCloseSecureChannelRequest(w, v as CloseSecureChannelRequest, encoder));
    encoder.registerType(453, (w, v) => encodeCloseSecureChannelResponse(w, v as CloseSecureChannelResponse, encoder));
    encoder.registerType(344, (w, v) => encodeSignedSoftwareCertificate(w, v as SignedSoftwareCertificate, encoder));
    encoder.registerType(456, (w, v) => encodeSignatureData(w, v as SignatureData, encoder));
    encoder.registerType(459, (w, v) => encodeCreateSessionRequest(w, v as CreateSessionRequest, encoder));
    encoder.registerType(462, (w, v) => encodeCreateSessionResponse(w, v as CreateSessionResponse, encoder));
    encoder.registerType(316, (w, v) => encodeUserIdentityToken(w, v as UserIdentityToken, encoder));
    encoder.registerType(319, (w, v) => encodeAnonymousIdentityToken(w, v as AnonymousIdentityToken, encoder));
    encoder.registerType(322, (w, v) => encodeUserNameIdentityToken(w, v as UserNameIdentityToken, encoder));
    encoder.registerType(325, (w, v) => encodeX509IdentityToken(w, v as X509IdentityToken, encoder));
    encoder.registerType(938, (w, v) => encodeIssuedIdentityToken(w, v as IssuedIdentityToken, encoder));
    encoder.registerType(465, (w, v) => encodeActivateSessionRequest(w, v as ActivateSessionRequest, encoder));
    encoder.registerType(468, (w, v) => encodeActivateSessionResponse(w, v as ActivateSessionResponse, encoder));
    encoder.registerType(471, (w, v) => encodeCloseSessionRequest(w, v as CloseSessionRequest, encoder));
    encoder.registerType(474, (w, v) => encodeCloseSessionResponse(w, v as CloseSessionResponse, encoder));
    encoder.registerType(477, (w, v) => encodeCancelRequest(w, v as CancelRequest, encoder));
    encoder.registerType(480, (w, v) => encodeCancelResponse(w, v as CancelResponse, encoder));
    encoder.registerType(349, (w, v) => encodeNodeAttributes(w, v as NodeAttributes, encoder));
    encoder.registerType(352, (w, v) => encodeObjectAttributes(w, v as ObjectAttributes, encoder));
    encoder.registerType(355, (w, v) => encodeVariableAttributes(w, v as VariableAttributes, encoder));
    encoder.registerType(358, (w, v) => encodeMethodAttributes(w, v as MethodAttributes, encoder));
    encoder.registerType(361, (w, v) => encodeObjectTypeAttributes(w, v as ObjectTypeAttributes, encoder));
    encoder.registerType(364, (w, v) => encodeVariableTypeAttributes(w, v as VariableTypeAttributes, encoder));
    encoder.registerType(367, (w, v) => encodeReferenceTypeAttributes(w, v as ReferenceTypeAttributes, encoder));
    encoder.registerType(370, (w, v) => encodeDataTypeAttributes(w, v as DataTypeAttributes, encoder));
    encoder.registerType(373, (w, v) => encodeViewAttributes(w, v as ViewAttributes, encoder));
    encoder.registerType(17606, (w, v) => encodeGenericAttributeValue(w, v as GenericAttributeValue, encoder));
    encoder.registerType(17607, (w, v) => encodeGenericAttributes(w, v as GenericAttributes, encoder));
    encoder.registerType(376, (w, v) => encodeAddNodesItem(w, v as AddNodesItem, encoder));
    encoder.registerType(483, (w, v) => encodeAddNodesResult(w, v as AddNodesResult, encoder));
    encoder.registerType(486, (w, v) => encodeAddNodesRequest(w, v as AddNodesRequest, encoder));
    encoder.registerType(489, (w, v) => encodeAddNodesResponse(w, v as AddNodesResponse, encoder));
    encoder.registerType(379, (w, v) => encodeAddReferencesItem(w, v as AddReferencesItem, encoder));
    encoder.registerType(492, (w, v) => encodeAddReferencesRequest(w, v as AddReferencesRequest, encoder));
    encoder.registerType(495, (w, v) => encodeAddReferencesResponse(w, v as AddReferencesResponse, encoder));
    encoder.registerType(382, (w, v) => encodeDeleteNodesItem(w, v as DeleteNodesItem, encoder));
    encoder.registerType(498, (w, v) => encodeDeleteNodesRequest(w, v as DeleteNodesRequest, encoder));
    encoder.registerType(501, (w, v) => encodeDeleteNodesResponse(w, v as DeleteNodesResponse, encoder));
    encoder.registerType(385, (w, v) => encodeDeleteReferencesItem(w, v as DeleteReferencesItem, encoder));
    encoder.registerType(504, (w, v) => encodeDeleteReferencesRequest(w, v as DeleteReferencesRequest, encoder));
    encoder.registerType(507, (w, v) => encodeDeleteReferencesResponse(w, v as DeleteReferencesResponse, encoder));
    encoder.registerType(511, (w, v) => encodeViewDescription(w, v as ViewDescription, encoder));
    encoder.registerType(514, (w, v) => encodeBrowseDescription(w, v as BrowseDescription, encoder));
    encoder.registerType(518, (w, v) => encodeReferenceDescription(w, v as ReferenceDescription, encoder));
    encoder.registerType(522, (w, v) => encodeBrowseResult(w, v as BrowseResult, encoder));
    encoder.registerType(525, (w, v) => encodeBrowseRequest(w, v as BrowseRequest, encoder));
    encoder.registerType(528, (w, v) => encodeBrowseResponse(w, v as BrowseResponse, encoder));
    encoder.registerType(531, (w, v) => encodeBrowseNextRequest(w, v as BrowseNextRequest, encoder));
    encoder.registerType(534, (w, v) => encodeBrowseNextResponse(w, v as BrowseNextResponse, encoder));
    encoder.registerType(537, (w, v) => encodeRelativePathElement(w, v as RelativePathElement, encoder));
    encoder.registerType(540, (w, v) => encodeRelativePath(w, v as RelativePath, encoder));
    encoder.registerType(543, (w, v) => encodeBrowsePath(w, v as BrowsePath, encoder));
    encoder.registerType(546, (w, v) => encodeBrowsePathTarget(w, v as BrowsePathTarget, encoder));
    encoder.registerType(549, (w, v) => encodeBrowsePathResult(w, v as BrowsePathResult, encoder));
    encoder.registerType(552, (w, v) => encodeTranslateBrowsePathsToNodeIdsRequest(w, v as TranslateBrowsePathsToNodeIdsRequest, encoder));
    encoder.registerType(555, (w, v) => encodeTranslateBrowsePathsToNodeIdsResponse(w, v as TranslateBrowsePathsToNodeIdsResponse, encoder));
    encoder.registerType(558, (w, v) => encodeRegisterNodesRequest(w, v as RegisterNodesRequest, encoder));
    encoder.registerType(561, (w, v) => encodeRegisterNodesResponse(w, v as RegisterNodesResponse, encoder));
    encoder.registerType(564, (w, v) => encodeUnregisterNodesRequest(w, v as UnregisterNodesRequest, encoder));
    encoder.registerType(567, (w, v) => encodeUnregisterNodesResponse(w, v as UnregisterNodesResponse, encoder));
    encoder.registerType(331, (w, v) => encodeEndpointConfiguration(w, v as EndpointConfiguration, encoder));
    encoder.registerType(570, (w, v) => encodeQueryDataDescription(w, v as QueryDataDescription, encoder));
    encoder.registerType(573, (w, v) => encodeNodeTypeDescription(w, v as NodeTypeDescription, encoder));
    encoder.registerType(577, (w, v) => encodeQueryDataSet(w, v as QueryDataSet, encoder));
    encoder.registerType(580, (w, v) => encodeNodeReference(w, v as NodeReference, encoder));
    encoder.registerType(583, (w, v) => encodeContentFilterElement(w, v as ContentFilterElement, encoder));
    encoder.registerType(586, (w, v) => encodeContentFilter(w, v as ContentFilter, encoder));
    encoder.registerType(589, (w, v) => encodeFilterOperand(w, v as FilterOperand, encoder));
    encoder.registerType(592, (w, v) => encodeElementOperand(w, v as ElementOperand, encoder));
    encoder.registerType(595, (w, v) => encodeLiteralOperand(w, v as LiteralOperand, encoder));
    encoder.registerType(598, (w, v) => encodeAttributeOperand(w, v as AttributeOperand, encoder));
    encoder.registerType(601, (w, v) => encodeSimpleAttributeOperand(w, v as SimpleAttributeOperand, encoder));
    encoder.registerType(604, (w, v) => encodeContentFilterElementResult(w, v as ContentFilterElementResult, encoder));
    encoder.registerType(607, (w, v) => encodeContentFilterResult(w, v as ContentFilterResult, encoder));
    encoder.registerType(610, (w, v) => encodeParsingResult(w, v as ParsingResult, encoder));
    encoder.registerType(613, (w, v) => encodeQueryFirstRequest(w, v as QueryFirstRequest, encoder));
    encoder.registerType(616, (w, v) => encodeQueryFirstResponse(w, v as QueryFirstResponse, encoder));
    encoder.registerType(619, (w, v) => encodeQueryNextRequest(w, v as QueryNextRequest, encoder));
    encoder.registerType(622, (w, v) => encodeQueryNextResponse(w, v as QueryNextResponse, encoder));
    encoder.registerType(626, (w, v) => encodeReadValueId(w, v as ReadValueId, encoder));
    encoder.registerType(629, (w, v) => encodeReadRequest(w, v as ReadRequest, encoder));
    encoder.registerType(632, (w, v) => encodeReadResponse(w, v as ReadResponse, encoder));
    encoder.registerType(635, (w, v) => encodeHistoryReadValueId(w, v as HistoryReadValueId, encoder));
    encoder.registerType(638, (w, v) => encodeHistoryReadResult(w, v as HistoryReadResult, encoder));
    encoder.registerType(641, (w, v) => encodeHistoryReadDetails(w, v as HistoryReadDetails, encoder));
    encoder.registerType(644, (w, v) => encodeReadEventDetails(w, v as ReadEventDetails, encoder));
    encoder.registerType(32799, (w, v) => encodeReadEventDetails2(w, v as ReadEventDetails2, encoder));
    encoder.registerType(18648, (w, v) => encodeSortRuleElement(w, v as SortRuleElement, encoder));
    encoder.registerType(18649, (w, v) => encodeReadEventDetailsSorted(w, v as ReadEventDetailsSorted, encoder));
    encoder.registerType(647, (w, v) => encodeReadRawModifiedDetails(w, v as ReadRawModifiedDetails, encoder));
    encoder.registerType(650, (w, v) => encodeReadProcessedDetails(w, v as ReadProcessedDetails, encoder));
    encoder.registerType(653, (w, v) => encodeReadAtTimeDetails(w, v as ReadAtTimeDetails, encoder));
    encoder.registerType(23497, (w, v) => encodeReadAnnotationDataDetails(w, v as ReadAnnotationDataDetails, encoder));
    encoder.registerType(656, (w, v) => encodeHistoryData(w, v as HistoryData, encoder));
    encoder.registerType(11216, (w, v) => encodeModificationInfo(w, v as ModificationInfo, encoder));
    encoder.registerType(11217, (w, v) => encodeHistoryModifiedData(w, v as HistoryModifiedData, encoder));
    encoder.registerType(659, (w, v) => encodeHistoryEvent(w, v as HistoryEvent, encoder));
    encoder.registerType(32824, (w, v) => encodeHistoryModifiedEvent(w, v as HistoryModifiedEvent, encoder));
    encoder.registerType(662, (w, v) => encodeHistoryReadRequest(w, v as HistoryReadRequest, encoder));
    encoder.registerType(665, (w, v) => encodeHistoryReadResponse(w, v as HistoryReadResponse, encoder));
    encoder.registerType(668, (w, v) => encodeWriteValue(w, v as WriteValue, encoder));
    encoder.registerType(671, (w, v) => encodeWriteRequest(w, v as WriteRequest, encoder));
    encoder.registerType(674, (w, v) => encodeWriteResponse(w, v as WriteResponse, encoder));
    encoder.registerType(677, (w, v) => encodeHistoryUpdateDetails(w, v as HistoryUpdateDetails, encoder));
    encoder.registerType(680, (w, v) => encodeUpdateDataDetails(w, v as UpdateDataDetails, encoder));
    encoder.registerType(11295, (w, v) => encodeUpdateStructureDataDetails(w, v as UpdateStructureDataDetails, encoder));
    encoder.registerType(683, (w, v) => encodeUpdateEventDetails(w, v as UpdateEventDetails, encoder));
    encoder.registerType(686, (w, v) => encodeDeleteRawModifiedDetails(w, v as DeleteRawModifiedDetails, encoder));
    encoder.registerType(689, (w, v) => encodeDeleteAtTimeDetails(w, v as DeleteAtTimeDetails, encoder));
    encoder.registerType(692, (w, v) => encodeDeleteEventDetails(w, v as DeleteEventDetails, encoder));
    encoder.registerType(695, (w, v) => encodeHistoryUpdateResult(w, v as HistoryUpdateResult, encoder));
    encoder.registerType(698, (w, v) => encodeHistoryUpdateRequest(w, v as HistoryUpdateRequest, encoder));
    encoder.registerType(701, (w, v) => encodeHistoryUpdateResponse(w, v as HistoryUpdateResponse, encoder));
    encoder.registerType(704, (w, v) => encodeCallMethodRequest(w, v as CallMethodRequest, encoder));
    encoder.registerType(707, (w, v) => encodeCallMethodResult(w, v as CallMethodResult, encoder));
    encoder.registerType(710, (w, v) => encodeCallRequest(w, v as CallRequest, encoder));
    encoder.registerType(713, (w, v) => encodeCallResponse(w, v as CallResponse, encoder));
    encoder.registerType(719, (w, v) => encodeMonitoringFilter(w, v as MonitoringFilter, encoder));
    encoder.registerType(722, (w, v) => encodeDataChangeFilter(w, v as DataChangeFilter, encoder));
    encoder.registerType(725, (w, v) => encodeEventFilter(w, v as EventFilter, encoder));
    encoder.registerType(948, (w, v) => encodeAggregateConfiguration(w, v as AggregateConfiguration, encoder));
    encoder.registerType(728, (w, v) => encodeAggregateFilter(w, v as AggregateFilter, encoder));
    encoder.registerType(731, (w, v) => encodeMonitoringFilterResult(w, v as MonitoringFilterResult, encoder));
    encoder.registerType(734, (w, v) => encodeEventFilterResult(w, v as EventFilterResult, encoder));
    encoder.registerType(737, (w, v) => encodeAggregateFilterResult(w, v as AggregateFilterResult, encoder));
    encoder.registerType(740, (w, v) => encodeMonitoringParameters(w, v as MonitoringParameters, encoder));
    encoder.registerType(743, (w, v) => encodeMonitoredItemCreateRequest(w, v as MonitoredItemCreateRequest, encoder));
    encoder.registerType(746, (w, v) => encodeMonitoredItemCreateResult(w, v as MonitoredItemCreateResult, encoder));
    encoder.registerType(749, (w, v) => encodeCreateMonitoredItemsRequest(w, v as CreateMonitoredItemsRequest, encoder));
    encoder.registerType(752, (w, v) => encodeCreateMonitoredItemsResponse(w, v as CreateMonitoredItemsResponse, encoder));
    encoder.registerType(755, (w, v) => encodeMonitoredItemModifyRequest(w, v as MonitoredItemModifyRequest, encoder));
    encoder.registerType(758, (w, v) => encodeMonitoredItemModifyResult(w, v as MonitoredItemModifyResult, encoder));
    encoder.registerType(761, (w, v) => encodeModifyMonitoredItemsRequest(w, v as ModifyMonitoredItemsRequest, encoder));
    encoder.registerType(764, (w, v) => encodeModifyMonitoredItemsResponse(w, v as ModifyMonitoredItemsResponse, encoder));
    encoder.registerType(767, (w, v) => encodeSetMonitoringModeRequest(w, v as SetMonitoringModeRequest, encoder));
    encoder.registerType(770, (w, v) => encodeSetMonitoringModeResponse(w, v as SetMonitoringModeResponse, encoder));
    encoder.registerType(773, (w, v) => encodeSetTriggeringRequest(w, v as SetTriggeringRequest, encoder));
    encoder.registerType(776, (w, v) => encodeSetTriggeringResponse(w, v as SetTriggeringResponse, encoder));
    encoder.registerType(779, (w, v) => encodeDeleteMonitoredItemsRequest(w, v as DeleteMonitoredItemsRequest, encoder));
    encoder.registerType(782, (w, v) => encodeDeleteMonitoredItemsResponse(w, v as DeleteMonitoredItemsResponse, encoder));
    encoder.registerType(785, (w, v) => encodeCreateSubscriptionRequest(w, v as CreateSubscriptionRequest, encoder));
    encoder.registerType(788, (w, v) => encodeCreateSubscriptionResponse(w, v as CreateSubscriptionResponse, encoder));
    encoder.registerType(791, (w, v) => encodeModifySubscriptionRequest(w, v as ModifySubscriptionRequest, encoder));
    encoder.registerType(794, (w, v) => encodeModifySubscriptionResponse(w, v as ModifySubscriptionResponse, encoder));
    encoder.registerType(797, (w, v) => encodeSetPublishingModeRequest(w, v as SetPublishingModeRequest, encoder));
    encoder.registerType(800, (w, v) => encodeSetPublishingModeResponse(w, v as SetPublishingModeResponse, encoder));
    encoder.registerType(803, (w, v) => encodeNotificationMessage(w, v as NotificationMessage, encoder));
    encoder.registerType(945, (w, v) => encodeNotificationData(w, v as NotificationData, encoder));
    encoder.registerType(809, (w, v) => encodeDataChangeNotification(w, v as DataChangeNotification, encoder));
    encoder.registerType(806, (w, v) => encodeMonitoredItemNotification(w, v as MonitoredItemNotification, encoder));
    encoder.registerType(914, (w, v) => encodeEventNotificationList(w, v as EventNotificationList, encoder));
    encoder.registerType(917, (w, v) => encodeEventFieldList(w, v as EventFieldList, encoder));
    encoder.registerType(920, (w, v) => encodeHistoryEventFieldList(w, v as HistoryEventFieldList, encoder));
    encoder.registerType(818, (w, v) => encodeStatusChangeNotification(w, v as StatusChangeNotification, encoder));
    encoder.registerType(821, (w, v) => encodeSubscriptionAcknowledgement(w, v as SubscriptionAcknowledgement, encoder));
    encoder.registerType(824, (w, v) => encodePublishRequest(w, v as PublishRequest, encoder));
    encoder.registerType(827, (w, v) => encodePublishResponse(w, v as PublishResponse, encoder));
    encoder.registerType(830, (w, v) => encodeRepublishRequest(w, v as RepublishRequest, encoder));
    encoder.registerType(833, (w, v) => encodeRepublishResponse(w, v as RepublishResponse, encoder));
    encoder.registerType(836, (w, v) => encodeTransferResult(w, v as TransferResult, encoder));
    encoder.registerType(839, (w, v) => encodeTransferSubscriptionsRequest(w, v as TransferSubscriptionsRequest, encoder));
    encoder.registerType(842, (w, v) => encodeTransferSubscriptionsResponse(w, v as TransferSubscriptionsResponse, encoder));
    encoder.registerType(845, (w, v) => encodeDeleteSubscriptionsRequest(w, v as DeleteSubscriptionsRequest, encoder));
    encoder.registerType(848, (w, v) => encodeDeleteSubscriptionsResponse(w, v as DeleteSubscriptionsResponse, encoder));
    encoder.registerType(338, (w, v) => encodeBuildInfo(w, v as BuildInfo, encoder));
    encoder.registerType(853, (w, v) => encodeRedundantServerDataType(w, v as RedundantServerDataType, encoder));
    encoder.registerType(11943, (w, v) => encodeEndpointUrlListDataType(w, v as EndpointUrlListDataType, encoder));
    encoder.registerType(11944, (w, v) => encodeNetworkGroupDataType(w, v as NetworkGroupDataType, encoder));
    encoder.registerType(856, (w, v) => encodeSamplingIntervalDiagnosticsDataType(w, v as SamplingIntervalDiagnosticsDataType, encoder));
    encoder.registerType(859, (w, v) => encodeServerDiagnosticsSummaryDataType(w, v as ServerDiagnosticsSummaryDataType, encoder));
    encoder.registerType(862, (w, v) => encodeServerStatusDataType(w, v as ServerStatusDataType, encoder));
    encoder.registerType(865, (w, v) => encodeSessionDiagnosticsDataType(w, v as SessionDiagnosticsDataType, encoder));
    encoder.registerType(868, (w, v) => encodeSessionSecurityDiagnosticsDataType(w, v as SessionSecurityDiagnosticsDataType, encoder));
    encoder.registerType(871, (w, v) => encodeServiceCounterDataType(w, v as ServiceCounterDataType, encoder));
    encoder.registerType(299, (w, v) => encodeStatusResult(w, v as StatusResult, encoder));
    encoder.registerType(874, (w, v) => encodeSubscriptionDiagnosticsDataType(w, v as SubscriptionDiagnosticsDataType, encoder));
    encoder.registerType(877, (w, v) => encodeModelChangeStructureDataType(w, v as ModelChangeStructureDataType, encoder));
    encoder.registerType(897, (w, v) => encodeSemanticChangeStructureDataType(w, v as SemanticChangeStructureDataType, encoder));
    encoder.registerType(884, (w, v) => encodeRange(w, v as Range, encoder));
    encoder.registerType(887, (w, v) => encodeEUInformation(w, v as EUInformation, encoder));
    encoder.registerType(12171, (w, v) => encodeComplexNumberType(w, v as ComplexNumberType, encoder));
    encoder.registerType(12172, (w, v) => encodeDoubleComplexNumberType(w, v as DoubleComplexNumberType, encoder));
    encoder.registerType(12079, (w, v) => encodeAxisInformation(w, v as AxisInformation, encoder));
    encoder.registerType(12080, (w, v) => encodeXVType(w, v as XVType, encoder));
    encoder.registerType(894, (w, v) => encodeProgramDiagnosticDataType(w, v as ProgramDiagnosticDataType, encoder));
    encoder.registerType(24033, (w, v) => encodeProgramDiagnostic2DataType(w, v as ProgramDiagnostic2DataType, encoder));
    encoder.registerType(891, (w, v) => encodeAnnotation(w, v as Annotation, encoder));
}
