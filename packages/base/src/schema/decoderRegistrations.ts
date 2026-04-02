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

import { type IReader, Decoder, BinaryReader } from 'opcjs-base';
import {
    decodeUnion,
    decodeKeyValuePair,
    decodeAdditionalParametersType,
    decodeEphemeralKeyType,
    decodeEndpointType,
    decodeBitFieldDefinition,
    decodeRationalNumber,
    decodeVector,
    decodeCartesianCoordinates,
    decodeOrientation,
    decodeFrame,
    decodeIdentityMappingRuleType,
    decodeCurrencyUnitType,
    decodeAnnotationDataType,
    decodeLinearConversionDataType,
    decodeQuantityDimension,
    decodeTrustListDataType,
    decodeBaseConfigurationDataType,
    decodeBaseConfigurationRecordDataType,
    decodeCertificateGroupDataType,
    decodeConfigurationUpdateTargetType,
    decodeTransactionErrorType,
    decodeApplicationConfigurationDataType,
    decodeApplicationIdentityDataType,
    decodeEndpointDataType,
    decodeServerEndpointDataType,
    decodeSecuritySettingsDataType,
    decodeUserTokenSettingsDataType,
    decodeServiceCertificateDataType,
    decodeAuthorizationServiceConfigurationDataType,
    decodeDecimalDataType,
    decodeDataTypeSchemaHeader,
    decodeDataTypeDescription,
    decodeStructureDescription,
    decodeEnumDescription,
    decodeSimpleTypeDescription,
    decodeUABinaryFileDataType,
    decodePortableQualifiedName,
    decodePortableNodeId,
    decodeUnsignedRationalNumber,
    decodeDataSetMetaDataType,
    decodeFieldMetaData,
    decodeConfigurationVersionDataType,
    decodePublishedDataSetDataType,
    decodePublishedDataSetSourceDataType,
    decodePublishedVariableDataType,
    decodePublishedDataItemsDataType,
    decodePublishedEventsDataType,
    decodePublishedDataSetCustomSourceDataType,
    decodeActionTargetDataType,
    decodePublishedActionDataType,
    decodeActionMethodDataType,
    decodePublishedActionMethodDataType,
    decodeDataSetWriterDataType,
    decodeDataSetWriterTransportDataType,
    decodeDataSetWriterMessageDataType,
    decodePubSubGroupDataType,
    decodeWriterGroupDataType,
    decodeWriterGroupTransportDataType,
    decodeWriterGroupMessageDataType,
    decodePubSubConnectionDataType,
    decodeConnectionTransportDataType,
    decodeNetworkAddressDataType,
    decodeNetworkAddressUrlDataType,
    decodeReaderGroupDataType,
    decodeReaderGroupTransportDataType,
    decodeReaderGroupMessageDataType,
    decodeDataSetReaderDataType,
    decodeDataSetReaderTransportDataType,
    decodeDataSetReaderMessageDataType,
    decodeSubscribedDataSetDataType,
    decodeTargetVariablesDataType,
    decodeFieldTargetDataType,
    decodeSubscribedDataSetMirrorDataType,
    decodePubSubConfigurationDataType,
    decodeStandaloneSubscribedDataSetRefDataType,
    decodeStandaloneSubscribedDataSetDataType,
    decodeSecurityGroupDataType,
    decodePubSubKeyPushTargetDataType,
    decodePubSubConfiguration2DataType,
    decodeUadpWriterGroupMessageDataType,
    decodeUadpDataSetWriterMessageDataType,
    decodeUadpDataSetReaderMessageDataType,
    decodeJsonWriterGroupMessageDataType,
    decodeJsonDataSetWriterMessageDataType,
    decodeJsonDataSetReaderMessageDataType,
    decodeQosDataType,
    decodeTransmitQosDataType,
    decodeTransmitQosPriorityDataType,
    decodeReceiveQosDataType,
    decodeReceiveQosPriorityDataType,
    decodeDatagramConnectionTransportDataType,
    decodeDatagramConnectionTransport2DataType,
    decodeDatagramWriterGroupTransportDataType,
    decodeDatagramWriterGroupTransport2DataType,
    decodeDatagramDataSetReaderTransportDataType,
    decodeDtlsPubSubConnectionDataType,
    decodeBrokerConnectionTransportDataType,
    decodeBrokerWriterGroupTransportDataType,
    decodeBrokerDataSetWriterTransportDataType,
    decodeBrokerDataSetReaderTransportDataType,
    decodePubSubConfigurationRefDataType,
    decodePubSubConfigurationValueDataType,
    decodeJsonNetworkMessage,
    decodeJsonDataSetMessage,
    decodeJsonDataSetMetaDataMessage,
    decodeJsonApplicationDescriptionMessage,
    decodeJsonServerEndpointsMessage,
    decodeJsonStatusMessage,
    decodeJsonPubSubConnectionMessage,
    decodeJsonActionMetaDataMessage,
    decodeJsonActionResponderMessage,
    decodeJsonActionNetworkMessage,
    decodeJsonActionRequestMessage,
    decodeJsonActionResponseMessage,
    decodeAliasNameDataType,
    decodeUserManagementDataType,
    decodePriorityMappingEntryType,
    decodeLldpManagementAddressTxPortType,
    decodeLldpManagementAddressType,
    decodeLldpTlvType,
    decodeReferenceDescriptionDataType,
    decodeReferenceListEntryDataType,
    decodeLogRecord,
    decodeLogRecordsDataType,
    decodeSpanContextDataType,
    decodeTraceContextDataType,
    decodeNameValuePair,
    decodeRolePermissionType,
    decodeDataTypeDefinition,
    decodeStructureField,
    decodeStructureDefinition,
    decodeEnumDefinition,
    decodeNode,
    decodeInstanceNode,
    decodeTypeNode,
    decodeObjectNode,
    decodeObjectTypeNode,
    decodeVariableNode,
    decodeVariableTypeNode,
    decodeReferenceTypeNode,
    decodeMethodNode,
    decodeViewNode,
    decodeDataTypeNode,
    decodeReferenceNode,
    decodeArgument,
    decodeEnumValueType,
    decodeEnumField,
    decodeOptionSet,
    decodeTimeZoneDataType,
    decodeApplicationDescription,
    decodeRequestHeader,
    decodeResponseHeader,
    decodeServiceFault,
    decodeSessionlessInvokeRequestType,
    decodeSessionlessInvokeResponseType,
    decodeFindServersRequest,
    decodeFindServersResponse,
    decodeServerOnNetwork,
    decodeFindServersOnNetworkRequest,
    decodeFindServersOnNetworkResponse,
    decodeUserTokenPolicy,
    decodeEndpointDescription,
    decodeGetEndpointsRequest,
    decodeGetEndpointsResponse,
    decodeRegisteredServer,
    decodeRegisterServerRequest,
    decodeRegisterServerResponse,
    decodeDiscoveryConfiguration,
    decodeMdnsDiscoveryConfiguration,
    decodeRegisterServer2Request,
    decodeRegisterServer2Response,
    decodeChannelSecurityToken,
    decodeOpenSecureChannelRequest,
    decodeOpenSecureChannelResponse,
    decodeCloseSecureChannelRequest,
    decodeCloseSecureChannelResponse,
    decodeSignedSoftwareCertificate,
    decodeSignatureData,
    decodeCreateSessionRequest,
    decodeCreateSessionResponse,
    decodeUserIdentityToken,
    decodeAnonymousIdentityToken,
    decodeUserNameIdentityToken,
    decodeX509IdentityToken,
    decodeIssuedIdentityToken,
    decodeActivateSessionRequest,
    decodeActivateSessionResponse,
    decodeCloseSessionRequest,
    decodeCloseSessionResponse,
    decodeCancelRequest,
    decodeCancelResponse,
    decodeNodeAttributes,
    decodeObjectAttributes,
    decodeVariableAttributes,
    decodeMethodAttributes,
    decodeObjectTypeAttributes,
    decodeVariableTypeAttributes,
    decodeReferenceTypeAttributes,
    decodeDataTypeAttributes,
    decodeViewAttributes,
    decodeGenericAttributeValue,
    decodeGenericAttributes,
    decodeAddNodesItem,
    decodeAddNodesResult,
    decodeAddNodesRequest,
    decodeAddNodesResponse,
    decodeAddReferencesItem,
    decodeAddReferencesRequest,
    decodeAddReferencesResponse,
    decodeDeleteNodesItem,
    decodeDeleteNodesRequest,
    decodeDeleteNodesResponse,
    decodeDeleteReferencesItem,
    decodeDeleteReferencesRequest,
    decodeDeleteReferencesResponse,
    decodeViewDescription,
    decodeBrowseDescription,
    decodeReferenceDescription,
    decodeBrowseResult,
    decodeBrowseRequest,
    decodeBrowseResponse,
    decodeBrowseNextRequest,
    decodeBrowseNextResponse,
    decodeRelativePathElement,
    decodeRelativePath,
    decodeBrowsePath,
    decodeBrowsePathTarget,
    decodeBrowsePathResult,
    decodeTranslateBrowsePathsToNodeIdsRequest,
    decodeTranslateBrowsePathsToNodeIdsResponse,
    decodeRegisterNodesRequest,
    decodeRegisterNodesResponse,
    decodeUnregisterNodesRequest,
    decodeUnregisterNodesResponse,
    decodeEndpointConfiguration,
    decodeQueryDataDescription,
    decodeNodeTypeDescription,
    decodeQueryDataSet,
    decodeNodeReference,
    decodeContentFilterElement,
    decodeContentFilter,
    decodeFilterOperand,
    decodeElementOperand,
    decodeLiteralOperand,
    decodeAttributeOperand,
    decodeSimpleAttributeOperand,
    decodeContentFilterElementResult,
    decodeContentFilterResult,
    decodeParsingResult,
    decodeQueryFirstRequest,
    decodeQueryFirstResponse,
    decodeQueryNextRequest,
    decodeQueryNextResponse,
    decodeReadValueId,
    decodeReadRequest,
    decodeReadResponse,
    decodeHistoryReadValueId,
    decodeHistoryReadResult,
    decodeHistoryReadDetails,
    decodeReadEventDetails,
    decodeReadEventDetails2,
    decodeSortRuleElement,
    decodeReadEventDetailsSorted,
    decodeReadRawModifiedDetails,
    decodeReadProcessedDetails,
    decodeReadAtTimeDetails,
    decodeReadAnnotationDataDetails,
    decodeHistoryData,
    decodeModificationInfo,
    decodeHistoryModifiedData,
    decodeHistoryEvent,
    decodeHistoryModifiedEvent,
    decodeHistoryReadRequest,
    decodeHistoryReadResponse,
    decodeWriteValue,
    decodeWriteRequest,
    decodeWriteResponse,
    decodeHistoryUpdateDetails,
    decodeUpdateDataDetails,
    decodeUpdateStructureDataDetails,
    decodeUpdateEventDetails,
    decodeDeleteRawModifiedDetails,
    decodeDeleteAtTimeDetails,
    decodeDeleteEventDetails,
    decodeHistoryUpdateResult,
    decodeHistoryUpdateRequest,
    decodeHistoryUpdateResponse,
    decodeCallMethodRequest,
    decodeCallMethodResult,
    decodeCallRequest,
    decodeCallResponse,
    decodeMonitoringFilter,
    decodeDataChangeFilter,
    decodeEventFilter,
    decodeAggregateConfiguration,
    decodeAggregateFilter,
    decodeMonitoringFilterResult,
    decodeEventFilterResult,
    decodeAggregateFilterResult,
    decodeMonitoringParameters,
    decodeMonitoredItemCreateRequest,
    decodeMonitoredItemCreateResult,
    decodeCreateMonitoredItemsRequest,
    decodeCreateMonitoredItemsResponse,
    decodeMonitoredItemModifyRequest,
    decodeMonitoredItemModifyResult,
    decodeModifyMonitoredItemsRequest,
    decodeModifyMonitoredItemsResponse,
    decodeSetMonitoringModeRequest,
    decodeSetMonitoringModeResponse,
    decodeSetTriggeringRequest,
    decodeSetTriggeringResponse,
    decodeDeleteMonitoredItemsRequest,
    decodeDeleteMonitoredItemsResponse,
    decodeCreateSubscriptionRequest,
    decodeCreateSubscriptionResponse,
    decodeModifySubscriptionRequest,
    decodeModifySubscriptionResponse,
    decodeSetPublishingModeRequest,
    decodeSetPublishingModeResponse,
    decodeNotificationMessage,
    decodeNotificationData,
    decodeDataChangeNotification,
    decodeMonitoredItemNotification,
    decodeEventNotificationList,
    decodeEventFieldList,
    decodeHistoryEventFieldList,
    decodeStatusChangeNotification,
    decodeSubscriptionAcknowledgement,
    decodePublishRequest,
    decodePublishResponse,
    decodeRepublishRequest,
    decodeRepublishResponse,
    decodeTransferResult,
    decodeTransferSubscriptionsRequest,
    decodeTransferSubscriptionsResponse,
    decodeDeleteSubscriptionsRequest,
    decodeDeleteSubscriptionsResponse,
    decodeBuildInfo,
    decodeRedundantServerDataType,
    decodeEndpointUrlListDataType,
    decodeNetworkGroupDataType,
    decodeSamplingIntervalDiagnosticsDataType,
    decodeServerDiagnosticsSummaryDataType,
    decodeServerStatusDataType,
    decodeSessionDiagnosticsDataType,
    decodeSessionSecurityDiagnosticsDataType,
    decodeServiceCounterDataType,
    decodeStatusResult,
    decodeSubscriptionDiagnosticsDataType,
    decodeModelChangeStructureDataType,
    decodeSemanticChangeStructureDataType,
    decodeRange,
    decodeEUInformation,
    decodeComplexNumberType,
    decodeDoubleComplexNumberType,
    decodeAxisInformation,
    decodeXVType,
    decodeProgramDiagnosticDataType,
    decodeProgramDiagnostic2DataType,
    decodeAnnotation
} from './decoders.js';

export function registerTypeDecoders(decoder:Decoder){
    decoder.registerType(12756, (r: IReader) => decodeUnion(r, decoder));
    decoder.registerType(14533, (r: IReader) => decodeKeyValuePair(r, decoder));
    decoder.registerType(16313, (r: IReader) => decodeAdditionalParametersType(r, decoder));
    decoder.registerType(17548, (r: IReader) => decodeEphemeralKeyType(r, decoder));
    decoder.registerType(15528, (r: IReader) => decodeEndpointType(r, decoder));
    decoder.registerType(32421, (r: IReader) => decodeBitFieldDefinition(r, decoder));
    decoder.registerType(18806, (r: IReader) => decodeRationalNumber(r, decoder));
    decoder.registerType(18807, (r: IReader) => decodeVector(r, decoder));
    decoder.registerType(18809, (r: IReader) => decodeCartesianCoordinates(r, decoder));
    decoder.registerType(18811, (r: IReader) => decodeOrientation(r, decoder));
    decoder.registerType(18813, (r: IReader) => decodeFrame(r, decoder));
    decoder.registerType(15634, (r: IReader) => decodeIdentityMappingRuleType(r, decoder));
    decoder.registerType(23498, (r: IReader) => decodeCurrencyUnitType(r, decoder));
    decoder.registerType(32434, (r: IReader) => decodeAnnotationDataType(r, decoder));
    decoder.registerType(32435, (r: IReader) => decodeLinearConversionDataType(r, decoder));
    decoder.registerType(32438, (r: IReader) => decodeQuantityDimension(r, decoder));
    decoder.registerType(12554, (r: IReader) => decodeTrustListDataType(r, decoder));
    decoder.registerType(15434, (r: IReader) => decodeBaseConfigurationDataType(r, decoder));
    decoder.registerType(15435, (r: IReader) => decodeBaseConfigurationRecordDataType(r, decoder));
    decoder.registerType(15436, (r: IReader) => decodeCertificateGroupDataType(r, decoder));
    decoder.registerType(15538, (r: IReader) => decodeConfigurationUpdateTargetType(r, decoder));
    decoder.registerType(32285, (r: IReader) => decodeTransactionErrorType(r, decoder));
    decoder.registerType(23743, (r: IReader) => decodeApplicationConfigurationDataType(r, decoder));
    decoder.registerType(15556, (r: IReader) => decodeApplicationIdentityDataType(r, decoder));
    decoder.registerType(15557, (r: IReader) => decodeEndpointDataType(r, decoder));
    decoder.registerType(15558, (r: IReader) => decodeServerEndpointDataType(r, decoder));
    decoder.registerType(15559, (r: IReader) => decodeSecuritySettingsDataType(r, decoder));
    decoder.registerType(15560, (r: IReader) => decodeUserTokenSettingsDataType(r, decoder));
    decoder.registerType(23724, (r: IReader) => decodeServiceCertificateDataType(r, decoder));
    decoder.registerType(23744, (r: IReader) => decodeAuthorizationServiceConfigurationDataType(r, decoder));
    decoder.registerType(17861, (r: IReader) => decodeDecimalDataType(r, decoder));
    decoder.registerType(15534, (r: IReader) => decodeDataTypeSchemaHeader(r, decoder));
    decoder.registerType(14525, (r: IReader) => decodeDataTypeDescription(r, decoder));
    decoder.registerType(15487, (r: IReader) => decodeStructureDescription(r, decoder));
    decoder.registerType(15488, (r: IReader) => decodeEnumDescription(r, decoder));
    decoder.registerType(15005, (r: IReader) => decodeSimpleTypeDescription(r, decoder));
    decoder.registerType(15006, (r: IReader) => decodeUABinaryFileDataType(r, decoder));
    decoder.registerType(24105, (r: IReader) => decodePortableQualifiedName(r, decoder));
    decoder.registerType(24106, (r: IReader) => decodePortableNodeId(r, decoder));
    decoder.registerType(24107, (r: IReader) => decodeUnsignedRationalNumber(r, decoder));
    decoder.registerType(14523, (r: IReader) => decodeDataSetMetaDataType(r, decoder));
    decoder.registerType(14524, (r: IReader) => decodeFieldMetaData(r, decoder));
    decoder.registerType(14593, (r: IReader) => decodeConfigurationVersionDataType(r, decoder));
    decoder.registerType(15578, (r: IReader) => decodePublishedDataSetDataType(r, decoder));
    decoder.registerType(15580, (r: IReader) => decodePublishedDataSetSourceDataType(r, decoder));
    decoder.registerType(14273, (r: IReader) => decodePublishedVariableDataType(r, decoder));
    decoder.registerType(15581, (r: IReader) => decodePublishedDataItemsDataType(r, decoder));
    decoder.registerType(15582, (r: IReader) => decodePublishedEventsDataType(r, decoder));
    decoder.registerType(25269, (r: IReader) => decodePublishedDataSetCustomSourceDataType(r, decoder));
    decoder.registerType(18593, (r: IReader) => decodeActionTargetDataType(r, decoder));
    decoder.registerType(18594, (r: IReader) => decodePublishedActionDataType(r, decoder));
    decoder.registerType(18597, (r: IReader) => decodeActionMethodDataType(r, decoder));
    decoder.registerType(18793, (r: IReader) => decodePublishedActionMethodDataType(r, decoder));
    decoder.registerType(15597, (r: IReader) => decodeDataSetWriterDataType(r, decoder));
    decoder.registerType(15598, (r: IReader) => decodeDataSetWriterTransportDataType(r, decoder));
    decoder.registerType(15605, (r: IReader) => decodeDataSetWriterMessageDataType(r, decoder));
    decoder.registerType(15609, (r: IReader) => decodePubSubGroupDataType(r, decoder));
    decoder.registerType(15480, (r: IReader) => decodeWriterGroupDataType(r, decoder));
    decoder.registerType(15611, (r: IReader) => decodeWriterGroupTransportDataType(r, decoder));
    decoder.registerType(15616, (r: IReader) => decodeWriterGroupMessageDataType(r, decoder));
    decoder.registerType(15617, (r: IReader) => decodePubSubConnectionDataType(r, decoder));
    decoder.registerType(15618, (r: IReader) => decodeConnectionTransportDataType(r, decoder));
    decoder.registerType(15502, (r: IReader) => decodeNetworkAddressDataType(r, decoder));
    decoder.registerType(15510, (r: IReader) => decodeNetworkAddressUrlDataType(r, decoder));
    decoder.registerType(15520, (r: IReader) => decodeReaderGroupDataType(r, decoder));
    decoder.registerType(15621, (r: IReader) => decodeReaderGroupTransportDataType(r, decoder));
    decoder.registerType(15622, (r: IReader) => decodeReaderGroupMessageDataType(r, decoder));
    decoder.registerType(15623, (r: IReader) => decodeDataSetReaderDataType(r, decoder));
    decoder.registerType(15628, (r: IReader) => decodeDataSetReaderTransportDataType(r, decoder));
    decoder.registerType(15629, (r: IReader) => decodeDataSetReaderMessageDataType(r, decoder));
    decoder.registerType(15630, (r: IReader) => decodeSubscribedDataSetDataType(r, decoder));
    decoder.registerType(15631, (r: IReader) => decodeTargetVariablesDataType(r, decoder));
    decoder.registerType(14744, (r: IReader) => decodeFieldTargetDataType(r, decoder));
    decoder.registerType(15635, (r: IReader) => decodeSubscribedDataSetMirrorDataType(r, decoder));
    decoder.registerType(15530, (r: IReader) => decodePubSubConfigurationDataType(r, decoder));
    decoder.registerType(23599, (r: IReader) => decodeStandaloneSubscribedDataSetRefDataType(r, decoder));
    decoder.registerType(23600, (r: IReader) => decodeStandaloneSubscribedDataSetDataType(r, decoder));
    decoder.registerType(23601, (r: IReader) => decodeSecurityGroupDataType(r, decoder));
    decoder.registerType(25270, (r: IReader) => decodePubSubKeyPushTargetDataType(r, decoder));
    decoder.registerType(23602, (r: IReader) => decodePubSubConfiguration2DataType(r, decoder));
    decoder.registerType(15645, (r: IReader) => decodeUadpWriterGroupMessageDataType(r, decoder));
    decoder.registerType(15652, (r: IReader) => decodeUadpDataSetWriterMessageDataType(r, decoder));
    decoder.registerType(15653, (r: IReader) => decodeUadpDataSetReaderMessageDataType(r, decoder));
    decoder.registerType(15657, (r: IReader) => decodeJsonWriterGroupMessageDataType(r, decoder));
    decoder.registerType(15664, (r: IReader) => decodeJsonDataSetWriterMessageDataType(r, decoder));
    decoder.registerType(15665, (r: IReader) => decodeJsonDataSetReaderMessageDataType(r, decoder));
    decoder.registerType(23603, (r: IReader) => decodeQosDataType(r, decoder));
    decoder.registerType(23604, (r: IReader) => decodeTransmitQosDataType(r, decoder));
    decoder.registerType(23605, (r: IReader) => decodeTransmitQosPriorityDataType(r, decoder));
    decoder.registerType(23608, (r: IReader) => decodeReceiveQosDataType(r, decoder));
    decoder.registerType(23609, (r: IReader) => decodeReceiveQosPriorityDataType(r, decoder));
    decoder.registerType(17467, (r: IReader) => decodeDatagramConnectionTransportDataType(r, decoder));
    decoder.registerType(23612, (r: IReader) => decodeDatagramConnectionTransport2DataType(r, decoder));
    decoder.registerType(15532, (r: IReader) => decodeDatagramWriterGroupTransportDataType(r, decoder));
    decoder.registerType(23613, (r: IReader) => decodeDatagramWriterGroupTransport2DataType(r, decoder));
    decoder.registerType(23614, (r: IReader) => decodeDatagramDataSetReaderTransportDataType(r, decoder));
    decoder.registerType(18794, (r: IReader) => decodeDtlsPubSubConnectionDataType(r, decoder));
    decoder.registerType(15007, (r: IReader) => decodeBrokerConnectionTransportDataType(r, decoder));
    decoder.registerType(15667, (r: IReader) => decodeBrokerWriterGroupTransportDataType(r, decoder));
    decoder.registerType(15669, (r: IReader) => decodeBrokerDataSetWriterTransportDataType(r, decoder));
    decoder.registerType(15670, (r: IReader) => decodeBrokerDataSetReaderTransportDataType(r, decoder));
    decoder.registerType(25519, (r: IReader) => decodePubSubConfigurationRefDataType(r, decoder));
    decoder.registerType(25520, (r: IReader) => decodePubSubConfigurationValueDataType(r, decoder));
    decoder.registerType(19311, (r: IReader) => decodeJsonNetworkMessage(r, decoder));
    decoder.registerType(19312, (r: IReader) => decodeJsonDataSetMessage(r, decoder));
    decoder.registerType(19313, (r: IReader) => decodeJsonDataSetMetaDataMessage(r, decoder));
    decoder.registerType(19314, (r: IReader) => decodeJsonApplicationDescriptionMessage(r, decoder));
    decoder.registerType(19315, (r: IReader) => decodeJsonServerEndpointsMessage(r, decoder));
    decoder.registerType(19316, (r: IReader) => decodeJsonStatusMessage(r, decoder));
    decoder.registerType(19317, (r: IReader) => decodeJsonPubSubConnectionMessage(r, decoder));
    decoder.registerType(19318, (r: IReader) => decodeJsonActionMetaDataMessage(r, decoder));
    decoder.registerType(19319, (r: IReader) => decodeJsonActionResponderMessage(r, decoder));
    decoder.registerType(19320, (r: IReader) => decodeJsonActionNetworkMessage(r, decoder));
    decoder.registerType(19321, (r: IReader) => decodeJsonActionRequestMessage(r, decoder));
    decoder.registerType(19322, (r: IReader) => decodeJsonActionResponseMessage(r, decoder));
    decoder.registerType(23468, (r: IReader) => decodeAliasNameDataType(r, decoder));
    decoder.registerType(24281, (r: IReader) => decodeUserManagementDataType(r, decoder));
    decoder.registerType(25220, (r: IReader) => decodePriorityMappingEntryType(r, decoder));
    decoder.registerType(18953, (r: IReader) => decodeLldpManagementAddressTxPortType(r, decoder));
    decoder.registerType(18954, (r: IReader) => decodeLldpManagementAddressType(r, decoder));
    decoder.registerType(18955, (r: IReader) => decodeLldpTlvType(r, decoder));
    decoder.registerType(32659, (r: IReader) => decodeReferenceDescriptionDataType(r, decoder));
    decoder.registerType(32660, (r: IReader) => decodeReferenceListEntryDataType(r, decoder));
    decoder.registerType(19361, (r: IReader) => decodeLogRecord(r, decoder));
    decoder.registerType(19745, (r: IReader) => decodeLogRecordsDataType(r, decoder));
    decoder.registerType(19746, (r: IReader) => decodeSpanContextDataType(r, decoder));
    decoder.registerType(19747, (r: IReader) => decodeTraceContextDataType(r, decoder));
    decoder.registerType(19748, (r: IReader) => decodeNameValuePair(r, decoder));
    decoder.registerType(96, (r: IReader) => decodeRolePermissionType(r, decoder));
    decoder.registerType(97, (r: IReader) => decodeDataTypeDefinition(r, decoder));
    decoder.registerType(101, (r: IReader) => decodeStructureField(r, decoder));
    decoder.registerType(99, (r: IReader) => decodeStructureDefinition(r, decoder));
    decoder.registerType(100, (r: IReader) => decodeEnumDefinition(r, decoder));
    decoder.registerType(258, (r: IReader) => decodeNode(r, decoder));
    decoder.registerType(11879, (r: IReader) => decodeInstanceNode(r, decoder));
    decoder.registerType(11880, (r: IReader) => decodeTypeNode(r, decoder));
    decoder.registerType(261, (r: IReader) => decodeObjectNode(r, decoder));
    decoder.registerType(264, (r: IReader) => decodeObjectTypeNode(r, decoder));
    decoder.registerType(267, (r: IReader) => decodeVariableNode(r, decoder));
    decoder.registerType(270, (r: IReader) => decodeVariableTypeNode(r, decoder));
    decoder.registerType(273, (r: IReader) => decodeReferenceTypeNode(r, decoder));
    decoder.registerType(276, (r: IReader) => decodeMethodNode(r, decoder));
    decoder.registerType(279, (r: IReader) => decodeViewNode(r, decoder));
    decoder.registerType(282, (r: IReader) => decodeDataTypeNode(r, decoder));
    decoder.registerType(285, (r: IReader) => decodeReferenceNode(r, decoder));
    decoder.registerType(296, (r: IReader) => decodeArgument(r, decoder));
    decoder.registerType(7594, (r: IReader) => decodeEnumValueType(r, decoder));
    decoder.registerType(102, (r: IReader) => decodeEnumField(r, decoder));
    decoder.registerType(12755, (r: IReader) => decodeOptionSet(r, decoder));
    decoder.registerType(8912, (r: IReader) => decodeTimeZoneDataType(r, decoder));
    decoder.registerType(308, (r: IReader) => decodeApplicationDescription(r, decoder));
    decoder.registerType(389, (r: IReader) => decodeRequestHeader(r, decoder));
    decoder.registerType(392, (r: IReader) => decodeResponseHeader(r, decoder));
    decoder.registerType(395, (r: IReader) => decodeServiceFault(r, decoder));
    decoder.registerType(15901, (r: IReader) => decodeSessionlessInvokeRequestType(r, decoder));
    decoder.registerType(20999, (r: IReader) => decodeSessionlessInvokeResponseType(r, decoder));
    decoder.registerType(420, (r: IReader) => decodeFindServersRequest(r, decoder));
    decoder.registerType(423, (r: IReader) => decodeFindServersResponse(r, decoder));
    decoder.registerType(12189, (r: IReader) => decodeServerOnNetwork(r, decoder));
    decoder.registerType(12190, (r: IReader) => decodeFindServersOnNetworkRequest(r, decoder));
    decoder.registerType(12191, (r: IReader) => decodeFindServersOnNetworkResponse(r, decoder));
    decoder.registerType(304, (r: IReader) => decodeUserTokenPolicy(r, decoder));
    decoder.registerType(312, (r: IReader) => decodeEndpointDescription(r, decoder));
    decoder.registerType(426, (r: IReader) => decodeGetEndpointsRequest(r, decoder));
    decoder.registerType(429, (r: IReader) => decodeGetEndpointsResponse(r, decoder));
    decoder.registerType(432, (r: IReader) => decodeRegisteredServer(r, decoder));
    decoder.registerType(435, (r: IReader) => decodeRegisterServerRequest(r, decoder));
    decoder.registerType(438, (r: IReader) => decodeRegisterServerResponse(r, decoder));
    decoder.registerType(12890, (r: IReader) => decodeDiscoveryConfiguration(r, decoder));
    decoder.registerType(12891, (r: IReader) => decodeMdnsDiscoveryConfiguration(r, decoder));
    decoder.registerType(12193, (r: IReader) => decodeRegisterServer2Request(r, decoder));
    decoder.registerType(12194, (r: IReader) => decodeRegisterServer2Response(r, decoder));
    decoder.registerType(441, (r: IReader) => decodeChannelSecurityToken(r, decoder));
    decoder.registerType(444, (r: IReader) => decodeOpenSecureChannelRequest(r, decoder));
    decoder.registerType(447, (r: IReader) => decodeOpenSecureChannelResponse(r, decoder));
    decoder.registerType(450, (r: IReader) => decodeCloseSecureChannelRequest(r, decoder));
    decoder.registerType(453, (r: IReader) => decodeCloseSecureChannelResponse(r, decoder));
    decoder.registerType(344, (r: IReader) => decodeSignedSoftwareCertificate(r, decoder));
    decoder.registerType(456, (r: IReader) => decodeSignatureData(r, decoder));
    decoder.registerType(459, (r: IReader) => decodeCreateSessionRequest(r, decoder));
    decoder.registerType(462, (r: IReader) => decodeCreateSessionResponse(r, decoder));
    decoder.registerType(316, (r: IReader) => decodeUserIdentityToken(r, decoder));
    decoder.registerType(319, (r: IReader) => decodeAnonymousIdentityToken(r, decoder));
    decoder.registerType(322, (r: IReader) => decodeUserNameIdentityToken(r, decoder));
    decoder.registerType(325, (r: IReader) => decodeX509IdentityToken(r, decoder));
    decoder.registerType(938, (r: IReader) => decodeIssuedIdentityToken(r, decoder));
    decoder.registerType(465, (r: IReader) => decodeActivateSessionRequest(r, decoder));
    decoder.registerType(468, (r: IReader) => decodeActivateSessionResponse(r, decoder));
    decoder.registerType(471, (r: IReader) => decodeCloseSessionRequest(r, decoder));
    decoder.registerType(474, (r: IReader) => decodeCloseSessionResponse(r, decoder));
    decoder.registerType(477, (r: IReader) => decodeCancelRequest(r, decoder));
    decoder.registerType(480, (r: IReader) => decodeCancelResponse(r, decoder));
    decoder.registerType(349, (r: IReader) => decodeNodeAttributes(r, decoder));
    decoder.registerType(352, (r: IReader) => decodeObjectAttributes(r, decoder));
    decoder.registerType(355, (r: IReader) => decodeVariableAttributes(r, decoder));
    decoder.registerType(358, (r: IReader) => decodeMethodAttributes(r, decoder));
    decoder.registerType(361, (r: IReader) => decodeObjectTypeAttributes(r, decoder));
    decoder.registerType(364, (r: IReader) => decodeVariableTypeAttributes(r, decoder));
    decoder.registerType(367, (r: IReader) => decodeReferenceTypeAttributes(r, decoder));
    decoder.registerType(370, (r: IReader) => decodeDataTypeAttributes(r, decoder));
    decoder.registerType(373, (r: IReader) => decodeViewAttributes(r, decoder));
    decoder.registerType(17606, (r: IReader) => decodeGenericAttributeValue(r, decoder));
    decoder.registerType(17607, (r: IReader) => decodeGenericAttributes(r, decoder));
    decoder.registerType(376, (r: IReader) => decodeAddNodesItem(r, decoder));
    decoder.registerType(483, (r: IReader) => decodeAddNodesResult(r, decoder));
    decoder.registerType(486, (r: IReader) => decodeAddNodesRequest(r, decoder));
    decoder.registerType(489, (r: IReader) => decodeAddNodesResponse(r, decoder));
    decoder.registerType(379, (r: IReader) => decodeAddReferencesItem(r, decoder));
    decoder.registerType(492, (r: IReader) => decodeAddReferencesRequest(r, decoder));
    decoder.registerType(495, (r: IReader) => decodeAddReferencesResponse(r, decoder));
    decoder.registerType(382, (r: IReader) => decodeDeleteNodesItem(r, decoder));
    decoder.registerType(498, (r: IReader) => decodeDeleteNodesRequest(r, decoder));
    decoder.registerType(501, (r: IReader) => decodeDeleteNodesResponse(r, decoder));
    decoder.registerType(385, (r: IReader) => decodeDeleteReferencesItem(r, decoder));
    decoder.registerType(504, (r: IReader) => decodeDeleteReferencesRequest(r, decoder));
    decoder.registerType(507, (r: IReader) => decodeDeleteReferencesResponse(r, decoder));
    decoder.registerType(511, (r: IReader) => decodeViewDescription(r, decoder));
    decoder.registerType(514, (r: IReader) => decodeBrowseDescription(r, decoder));
    decoder.registerType(518, (r: IReader) => decodeReferenceDescription(r, decoder));
    decoder.registerType(522, (r: IReader) => decodeBrowseResult(r, decoder));
    decoder.registerType(525, (r: IReader) => decodeBrowseRequest(r, decoder));
    decoder.registerType(528, (r: IReader) => decodeBrowseResponse(r, decoder));
    decoder.registerType(531, (r: IReader) => decodeBrowseNextRequest(r, decoder));
    decoder.registerType(534, (r: IReader) => decodeBrowseNextResponse(r, decoder));
    decoder.registerType(537, (r: IReader) => decodeRelativePathElement(r, decoder));
    decoder.registerType(540, (r: IReader) => decodeRelativePath(r, decoder));
    decoder.registerType(543, (r: IReader) => decodeBrowsePath(r, decoder));
    decoder.registerType(546, (r: IReader) => decodeBrowsePathTarget(r, decoder));
    decoder.registerType(549, (r: IReader) => decodeBrowsePathResult(r, decoder));
    decoder.registerType(552, (r: IReader) => decodeTranslateBrowsePathsToNodeIdsRequest(r, decoder));
    decoder.registerType(555, (r: IReader) => decodeTranslateBrowsePathsToNodeIdsResponse(r, decoder));
    decoder.registerType(558, (r: IReader) => decodeRegisterNodesRequest(r, decoder));
    decoder.registerType(561, (r: IReader) => decodeRegisterNodesResponse(r, decoder));
    decoder.registerType(564, (r: IReader) => decodeUnregisterNodesRequest(r, decoder));
    decoder.registerType(567, (r: IReader) => decodeUnregisterNodesResponse(r, decoder));
    decoder.registerType(331, (r: IReader) => decodeEndpointConfiguration(r, decoder));
    decoder.registerType(570, (r: IReader) => decodeQueryDataDescription(r, decoder));
    decoder.registerType(573, (r: IReader) => decodeNodeTypeDescription(r, decoder));
    decoder.registerType(577, (r: IReader) => decodeQueryDataSet(r, decoder));
    decoder.registerType(580, (r: IReader) => decodeNodeReference(r, decoder));
    decoder.registerType(583, (r: IReader) => decodeContentFilterElement(r, decoder));
    decoder.registerType(586, (r: IReader) => decodeContentFilter(r, decoder));
    decoder.registerType(589, (r: IReader) => decodeFilterOperand(r, decoder));
    decoder.registerType(592, (r: IReader) => decodeElementOperand(r, decoder));
    decoder.registerType(595, (r: IReader) => decodeLiteralOperand(r, decoder));
    decoder.registerType(598, (r: IReader) => decodeAttributeOperand(r, decoder));
    decoder.registerType(601, (r: IReader) => decodeSimpleAttributeOperand(r, decoder));
    decoder.registerType(604, (r: IReader) => decodeContentFilterElementResult(r, decoder));
    decoder.registerType(607, (r: IReader) => decodeContentFilterResult(r, decoder));
    decoder.registerType(610, (r: IReader) => decodeParsingResult(r, decoder));
    decoder.registerType(613, (r: IReader) => decodeQueryFirstRequest(r, decoder));
    decoder.registerType(616, (r: IReader) => decodeQueryFirstResponse(r, decoder));
    decoder.registerType(619, (r: IReader) => decodeQueryNextRequest(r, decoder));
    decoder.registerType(622, (r: IReader) => decodeQueryNextResponse(r, decoder));
    decoder.registerType(626, (r: IReader) => decodeReadValueId(r, decoder));
    decoder.registerType(629, (r: IReader) => decodeReadRequest(r, decoder));
    decoder.registerType(632, (r: IReader) => decodeReadResponse(r, decoder));
    decoder.registerType(635, (r: IReader) => decodeHistoryReadValueId(r, decoder));
    decoder.registerType(638, (r: IReader) => decodeHistoryReadResult(r, decoder));
    decoder.registerType(641, (r: IReader) => decodeHistoryReadDetails(r, decoder));
    decoder.registerType(644, (r: IReader) => decodeReadEventDetails(r, decoder));
    decoder.registerType(32799, (r: IReader) => decodeReadEventDetails2(r, decoder));
    decoder.registerType(18648, (r: IReader) => decodeSortRuleElement(r, decoder));
    decoder.registerType(18649, (r: IReader) => decodeReadEventDetailsSorted(r, decoder));
    decoder.registerType(647, (r: IReader) => decodeReadRawModifiedDetails(r, decoder));
    decoder.registerType(650, (r: IReader) => decodeReadProcessedDetails(r, decoder));
    decoder.registerType(653, (r: IReader) => decodeReadAtTimeDetails(r, decoder));
    decoder.registerType(23497, (r: IReader) => decodeReadAnnotationDataDetails(r, decoder));
    decoder.registerType(656, (r: IReader) => decodeHistoryData(r, decoder));
    decoder.registerType(11216, (r: IReader) => decodeModificationInfo(r, decoder));
    decoder.registerType(11217, (r: IReader) => decodeHistoryModifiedData(r, decoder));
    decoder.registerType(659, (r: IReader) => decodeHistoryEvent(r, decoder));
    decoder.registerType(32824, (r: IReader) => decodeHistoryModifiedEvent(r, decoder));
    decoder.registerType(662, (r: IReader) => decodeHistoryReadRequest(r, decoder));
    decoder.registerType(665, (r: IReader) => decodeHistoryReadResponse(r, decoder));
    decoder.registerType(668, (r: IReader) => decodeWriteValue(r, decoder));
    decoder.registerType(671, (r: IReader) => decodeWriteRequest(r, decoder));
    decoder.registerType(674, (r: IReader) => decodeWriteResponse(r, decoder));
    decoder.registerType(677, (r: IReader) => decodeHistoryUpdateDetails(r, decoder));
    decoder.registerType(680, (r: IReader) => decodeUpdateDataDetails(r, decoder));
    decoder.registerType(11295, (r: IReader) => decodeUpdateStructureDataDetails(r, decoder));
    decoder.registerType(683, (r: IReader) => decodeUpdateEventDetails(r, decoder));
    decoder.registerType(686, (r: IReader) => decodeDeleteRawModifiedDetails(r, decoder));
    decoder.registerType(689, (r: IReader) => decodeDeleteAtTimeDetails(r, decoder));
    decoder.registerType(692, (r: IReader) => decodeDeleteEventDetails(r, decoder));
    decoder.registerType(695, (r: IReader) => decodeHistoryUpdateResult(r, decoder));
    decoder.registerType(698, (r: IReader) => decodeHistoryUpdateRequest(r, decoder));
    decoder.registerType(701, (r: IReader) => decodeHistoryUpdateResponse(r, decoder));
    decoder.registerType(704, (r: IReader) => decodeCallMethodRequest(r, decoder));
    decoder.registerType(707, (r: IReader) => decodeCallMethodResult(r, decoder));
    decoder.registerType(710, (r: IReader) => decodeCallRequest(r, decoder));
    decoder.registerType(713, (r: IReader) => decodeCallResponse(r, decoder));
    decoder.registerType(719, (r: IReader) => decodeMonitoringFilter(r, decoder));
    decoder.registerType(722, (r: IReader) => decodeDataChangeFilter(r, decoder));
    decoder.registerType(725, (r: IReader) => decodeEventFilter(r, decoder));
    decoder.registerType(948, (r: IReader) => decodeAggregateConfiguration(r, decoder));
    decoder.registerType(728, (r: IReader) => decodeAggregateFilter(r, decoder));
    decoder.registerType(731, (r: IReader) => decodeMonitoringFilterResult(r, decoder));
    decoder.registerType(734, (r: IReader) => decodeEventFilterResult(r, decoder));
    decoder.registerType(737, (r: IReader) => decodeAggregateFilterResult(r, decoder));
    decoder.registerType(740, (r: IReader) => decodeMonitoringParameters(r, decoder));
    decoder.registerType(743, (r: IReader) => decodeMonitoredItemCreateRequest(r, decoder));
    decoder.registerType(746, (r: IReader) => decodeMonitoredItemCreateResult(r, decoder));
    decoder.registerType(749, (r: IReader) => decodeCreateMonitoredItemsRequest(r, decoder));
    decoder.registerType(752, (r: IReader) => decodeCreateMonitoredItemsResponse(r, decoder));
    decoder.registerType(755, (r: IReader) => decodeMonitoredItemModifyRequest(r, decoder));
    decoder.registerType(758, (r: IReader) => decodeMonitoredItemModifyResult(r, decoder));
    decoder.registerType(761, (r: IReader) => decodeModifyMonitoredItemsRequest(r, decoder));
    decoder.registerType(764, (r: IReader) => decodeModifyMonitoredItemsResponse(r, decoder));
    decoder.registerType(767, (r: IReader) => decodeSetMonitoringModeRequest(r, decoder));
    decoder.registerType(770, (r: IReader) => decodeSetMonitoringModeResponse(r, decoder));
    decoder.registerType(773, (r: IReader) => decodeSetTriggeringRequest(r, decoder));
    decoder.registerType(776, (r: IReader) => decodeSetTriggeringResponse(r, decoder));
    decoder.registerType(779, (r: IReader) => decodeDeleteMonitoredItemsRequest(r, decoder));
    decoder.registerType(782, (r: IReader) => decodeDeleteMonitoredItemsResponse(r, decoder));
    decoder.registerType(785, (r: IReader) => decodeCreateSubscriptionRequest(r, decoder));
    decoder.registerType(788, (r: IReader) => decodeCreateSubscriptionResponse(r, decoder));
    decoder.registerType(791, (r: IReader) => decodeModifySubscriptionRequest(r, decoder));
    decoder.registerType(794, (r: IReader) => decodeModifySubscriptionResponse(r, decoder));
    decoder.registerType(797, (r: IReader) => decodeSetPublishingModeRequest(r, decoder));
    decoder.registerType(800, (r: IReader) => decodeSetPublishingModeResponse(r, decoder));
    decoder.registerType(803, (r: IReader) => decodeNotificationMessage(r, decoder));
    decoder.registerType(945, (r: IReader) => decodeNotificationData(r, decoder));
    decoder.registerType(809, (r: IReader) => decodeDataChangeNotification(r, decoder));
    decoder.registerType(806, (r: IReader) => decodeMonitoredItemNotification(r, decoder));
    decoder.registerType(914, (r: IReader) => decodeEventNotificationList(r, decoder));
    decoder.registerType(917, (r: IReader) => decodeEventFieldList(r, decoder));
    decoder.registerType(920, (r: IReader) => decodeHistoryEventFieldList(r, decoder));
    decoder.registerType(818, (r: IReader) => decodeStatusChangeNotification(r, decoder));
    decoder.registerType(821, (r: IReader) => decodeSubscriptionAcknowledgement(r, decoder));
    decoder.registerType(824, (r: IReader) => decodePublishRequest(r, decoder));
    decoder.registerType(827, (r: IReader) => decodePublishResponse(r, decoder));
    decoder.registerType(830, (r: IReader) => decodeRepublishRequest(r, decoder));
    decoder.registerType(833, (r: IReader) => decodeRepublishResponse(r, decoder));
    decoder.registerType(836, (r: IReader) => decodeTransferResult(r, decoder));
    decoder.registerType(839, (r: IReader) => decodeTransferSubscriptionsRequest(r, decoder));
    decoder.registerType(842, (r: IReader) => decodeTransferSubscriptionsResponse(r, decoder));
    decoder.registerType(845, (r: IReader) => decodeDeleteSubscriptionsRequest(r, decoder));
    decoder.registerType(848, (r: IReader) => decodeDeleteSubscriptionsResponse(r, decoder));
    decoder.registerType(338, (r: IReader) => decodeBuildInfo(r, decoder));
    decoder.registerType(853, (r: IReader) => decodeRedundantServerDataType(r, decoder));
    decoder.registerType(11943, (r: IReader) => decodeEndpointUrlListDataType(r, decoder));
    decoder.registerType(11944, (r: IReader) => decodeNetworkGroupDataType(r, decoder));
    decoder.registerType(856, (r: IReader) => decodeSamplingIntervalDiagnosticsDataType(r, decoder));
    decoder.registerType(859, (r: IReader) => decodeServerDiagnosticsSummaryDataType(r, decoder));
    decoder.registerType(862, (r: IReader) => decodeServerStatusDataType(r, decoder));
    decoder.registerType(865, (r: IReader) => decodeSessionDiagnosticsDataType(r, decoder));
    decoder.registerType(868, (r: IReader) => decodeSessionSecurityDiagnosticsDataType(r, decoder));
    decoder.registerType(871, (r: IReader) => decodeServiceCounterDataType(r, decoder));
    decoder.registerType(299, (r: IReader) => decodeStatusResult(r, decoder));
    decoder.registerType(874, (r: IReader) => decodeSubscriptionDiagnosticsDataType(r, decoder));
    decoder.registerType(877, (r: IReader) => decodeModelChangeStructureDataType(r, decoder));
    decoder.registerType(897, (r: IReader) => decodeSemanticChangeStructureDataType(r, decoder));
    decoder.registerType(884, (r: IReader) => decodeRange(r, decoder));
    decoder.registerType(887, (r: IReader) => decodeEUInformation(r, decoder));
    decoder.registerType(12171, (r: IReader) => decodeComplexNumberType(r, decoder));
    decoder.registerType(12172, (r: IReader) => decodeDoubleComplexNumberType(r, decoder));
    decoder.registerType(12079, (r: IReader) => decodeAxisInformation(r, decoder));
    decoder.registerType(12080, (r: IReader) => decodeXVType(r, decoder));
    decoder.registerType(894, (r: IReader) => decodeProgramDiagnosticDataType(r, decoder));
    decoder.registerType(24033, (r: IReader) => decodeProgramDiagnostic2DataType(r, decoder));
    decoder.registerType(891, (r: IReader) => decodeAnnotation(r, decoder));
}

export function registerBinaryDecoders(decoder:Decoder){
    const writerId = 'binary';

    decoder.registerEncodingId(12766, writerId, 12756);
    decoder.registerEncodingId(14846, writerId, 14533);
    decoder.registerEncodingId(17537, writerId, 16313);
    decoder.registerEncodingId(17549, writerId, 17548);
    decoder.registerEncodingId(15671, writerId, 15528);
    decoder.registerEncodingId(32422, writerId, 32421);
    decoder.registerEncodingId(18815, writerId, 18806);
    decoder.registerEncodingId(18816, writerId, 18807);
    decoder.registerEncodingId(18818, writerId, 18809);
    decoder.registerEncodingId(18820, writerId, 18811);
    decoder.registerEncodingId(18822, writerId, 18813);
    decoder.registerEncodingId(15736, writerId, 15634);
    decoder.registerEncodingId(23507, writerId, 23498);
    decoder.registerEncodingId(32560, writerId, 32434);
    decoder.registerEncodingId(32561, writerId, 32435);
    decoder.registerEncodingId(32562, writerId, 32438);
    decoder.registerEncodingId(12680, writerId, 12554);
    decoder.registerEncodingId(16538, writerId, 15434);
    decoder.registerEncodingId(16539, writerId, 15435);
    decoder.registerEncodingId(16540, writerId, 15436);
    decoder.registerEncodingId(16541, writerId, 15538);
    decoder.registerEncodingId(32382, writerId, 32285);
    decoder.registerEncodingId(23754, writerId, 23743);
    decoder.registerEncodingId(16543, writerId, 15556);
    decoder.registerEncodingId(16544, writerId, 15557);
    decoder.registerEncodingId(16545, writerId, 15558);
    decoder.registerEncodingId(16546, writerId, 15559);
    decoder.registerEncodingId(16547, writerId, 15560);
    decoder.registerEncodingId(23725, writerId, 23724);
    decoder.registerEncodingId(23755, writerId, 23744);
    decoder.registerEncodingId(17863, writerId, 17861);
    decoder.registerEncodingId(15676, writerId, 15534);
    decoder.registerEncodingId(125, writerId, 14525);
    decoder.registerEncodingId(126, writerId, 15487);
    decoder.registerEncodingId(127, writerId, 15488);
    decoder.registerEncodingId(15421, writerId, 15005);
    decoder.registerEncodingId(15422, writerId, 15006);
    decoder.registerEncodingId(24108, writerId, 24105);
    decoder.registerEncodingId(24109, writerId, 24106);
    decoder.registerEncodingId(24110, writerId, 24107);
    decoder.registerEncodingId(124, writerId, 14523);
    decoder.registerEncodingId(14839, writerId, 14524);
    decoder.registerEncodingId(14847, writerId, 14593);
    decoder.registerEncodingId(15677, writerId, 15578);
    decoder.registerEncodingId(15678, writerId, 15580);
    decoder.registerEncodingId(14323, writerId, 14273);
    decoder.registerEncodingId(15679, writerId, 15581);
    decoder.registerEncodingId(15681, writerId, 15582);
    decoder.registerEncodingId(25529, writerId, 25269);
    decoder.registerEncodingId(18598, writerId, 18593);
    decoder.registerEncodingId(18599, writerId, 18594);
    decoder.registerEncodingId(18600, writerId, 18597);
    decoder.registerEncodingId(18795, writerId, 18793);
    decoder.registerEncodingId(15682, writerId, 15597);
    decoder.registerEncodingId(15683, writerId, 15598);
    decoder.registerEncodingId(15688, writerId, 15605);
    decoder.registerEncodingId(15689, writerId, 15609);
    decoder.registerEncodingId(21150, writerId, 15480);
    decoder.registerEncodingId(15691, writerId, 15611);
    decoder.registerEncodingId(15693, writerId, 15616);
    decoder.registerEncodingId(15694, writerId, 15617);
    decoder.registerEncodingId(15695, writerId, 15618);
    decoder.registerEncodingId(21151, writerId, 15502);
    decoder.registerEncodingId(21152, writerId, 15510);
    decoder.registerEncodingId(21153, writerId, 15520);
    decoder.registerEncodingId(15701, writerId, 15621);
    decoder.registerEncodingId(15702, writerId, 15622);
    decoder.registerEncodingId(15703, writerId, 15623);
    decoder.registerEncodingId(15705, writerId, 15628);
    decoder.registerEncodingId(15706, writerId, 15629);
    decoder.registerEncodingId(15707, writerId, 15630);
    decoder.registerEncodingId(15712, writerId, 15631);
    decoder.registerEncodingId(14848, writerId, 14744);
    decoder.registerEncodingId(15713, writerId, 15635);
    decoder.registerEncodingId(21154, writerId, 15530);
    decoder.registerEncodingId(23851, writerId, 23599);
    decoder.registerEncodingId(23852, writerId, 23600);
    decoder.registerEncodingId(23853, writerId, 23601);
    decoder.registerEncodingId(25530, writerId, 25270);
    decoder.registerEncodingId(23854, writerId, 23602);
    decoder.registerEncodingId(15715, writerId, 15645);
    decoder.registerEncodingId(15717, writerId, 15652);
    decoder.registerEncodingId(15718, writerId, 15653);
    decoder.registerEncodingId(15719, writerId, 15657);
    decoder.registerEncodingId(15724, writerId, 15664);
    decoder.registerEncodingId(15725, writerId, 15665);
    decoder.registerEncodingId(23855, writerId, 23603);
    decoder.registerEncodingId(23856, writerId, 23604);
    decoder.registerEncodingId(23857, writerId, 23605);
    decoder.registerEncodingId(23860, writerId, 23608);
    decoder.registerEncodingId(23861, writerId, 23609);
    decoder.registerEncodingId(17468, writerId, 17467);
    decoder.registerEncodingId(23864, writerId, 23612);
    decoder.registerEncodingId(21155, writerId, 15532);
    decoder.registerEncodingId(23865, writerId, 23613);
    decoder.registerEncodingId(23866, writerId, 23614);
    decoder.registerEncodingId(18930, writerId, 18794);
    decoder.registerEncodingId(15479, writerId, 15007);
    decoder.registerEncodingId(15727, writerId, 15667);
    decoder.registerEncodingId(15729, writerId, 15669);
    decoder.registerEncodingId(15733, writerId, 15670);
    decoder.registerEncodingId(25531, writerId, 25519);
    decoder.registerEncodingId(25532, writerId, 25520);
    decoder.registerEncodingId(19311, writerId, 19311);
    decoder.registerEncodingId(19312, writerId, 19312);
    decoder.registerEncodingId(19313, writerId, 19313);
    decoder.registerEncodingId(19314, writerId, 19314);
    decoder.registerEncodingId(19315, writerId, 19315);
    decoder.registerEncodingId(19316, writerId, 19316);
    decoder.registerEncodingId(19317, writerId, 19317);
    decoder.registerEncodingId(19318, writerId, 19318);
    decoder.registerEncodingId(19319, writerId, 19319);
    decoder.registerEncodingId(19320, writerId, 19320);
    decoder.registerEncodingId(19321, writerId, 19321);
    decoder.registerEncodingId(19322, writerId, 19322);
    decoder.registerEncodingId(23499, writerId, 23468);
    decoder.registerEncodingId(24292, writerId, 24281);
    decoder.registerEncodingId(25239, writerId, 25220);
    decoder.registerEncodingId(19079, writerId, 18953);
    decoder.registerEncodingId(19080, writerId, 18954);
    decoder.registerEncodingId(19081, writerId, 18955);
    decoder.registerEncodingId(32661, writerId, 32659);
    decoder.registerEncodingId(32662, writerId, 32660);
    decoder.registerEncodingId(19379, writerId, 19361);
    decoder.registerEncodingId(19753, writerId, 19745);
    decoder.registerEncodingId(19754, writerId, 19746);
    decoder.registerEncodingId(19755, writerId, 19747);
    decoder.registerEncodingId(19756, writerId, 19748);
    decoder.registerEncodingId(128, writerId, 96);
    decoder.registerEncodingId(121, writerId, 97);
    decoder.registerEncodingId(14844, writerId, 101);
    decoder.registerEncodingId(122, writerId, 99);
    decoder.registerEncodingId(123, writerId, 100);
    decoder.registerEncodingId(260, writerId, 258);
    decoder.registerEncodingId(11889, writerId, 11879);
    decoder.registerEncodingId(11890, writerId, 11880);
    decoder.registerEncodingId(263, writerId, 261);
    decoder.registerEncodingId(266, writerId, 264);
    decoder.registerEncodingId(269, writerId, 267);
    decoder.registerEncodingId(272, writerId, 270);
    decoder.registerEncodingId(275, writerId, 273);
    decoder.registerEncodingId(278, writerId, 276);
    decoder.registerEncodingId(281, writerId, 279);
    decoder.registerEncodingId(284, writerId, 282);
    decoder.registerEncodingId(287, writerId, 285);
    decoder.registerEncodingId(298, writerId, 296);
    decoder.registerEncodingId(8251, writerId, 7594);
    decoder.registerEncodingId(14845, writerId, 102);
    decoder.registerEncodingId(12765, writerId, 12755);
    decoder.registerEncodingId(8917, writerId, 8912);
    decoder.registerEncodingId(310, writerId, 308);
    decoder.registerEncodingId(391, writerId, 389);
    decoder.registerEncodingId(394, writerId, 392);
    decoder.registerEncodingId(397, writerId, 395);
    decoder.registerEncodingId(15903, writerId, 15901);
    decoder.registerEncodingId(21001, writerId, 20999);
    decoder.registerEncodingId(422, writerId, 420);
    decoder.registerEncodingId(425, writerId, 423);
    decoder.registerEncodingId(12207, writerId, 12189);
    decoder.registerEncodingId(12208, writerId, 12190);
    decoder.registerEncodingId(12209, writerId, 12191);
    decoder.registerEncodingId(306, writerId, 304);
    decoder.registerEncodingId(314, writerId, 312);
    decoder.registerEncodingId(428, writerId, 426);
    decoder.registerEncodingId(431, writerId, 429);
    decoder.registerEncodingId(434, writerId, 432);
    decoder.registerEncodingId(437, writerId, 435);
    decoder.registerEncodingId(440, writerId, 438);
    decoder.registerEncodingId(12900, writerId, 12890);
    decoder.registerEncodingId(12901, writerId, 12891);
    decoder.registerEncodingId(12211, writerId, 12193);
    decoder.registerEncodingId(12212, writerId, 12194);
    decoder.registerEncodingId(443, writerId, 441);
    decoder.registerEncodingId(446, writerId, 444);
    decoder.registerEncodingId(449, writerId, 447);
    decoder.registerEncodingId(452, writerId, 450);
    decoder.registerEncodingId(455, writerId, 453);
    decoder.registerEncodingId(346, writerId, 344);
    decoder.registerEncodingId(458, writerId, 456);
    decoder.registerEncodingId(461, writerId, 459);
    decoder.registerEncodingId(464, writerId, 462);
    decoder.registerEncodingId(318, writerId, 316);
    decoder.registerEncodingId(321, writerId, 319);
    decoder.registerEncodingId(324, writerId, 322);
    decoder.registerEncodingId(327, writerId, 325);
    decoder.registerEncodingId(940, writerId, 938);
    decoder.registerEncodingId(467, writerId, 465);
    decoder.registerEncodingId(470, writerId, 468);
    decoder.registerEncodingId(473, writerId, 471);
    decoder.registerEncodingId(476, writerId, 474);
    decoder.registerEncodingId(479, writerId, 477);
    decoder.registerEncodingId(482, writerId, 480);
    decoder.registerEncodingId(351, writerId, 349);
    decoder.registerEncodingId(354, writerId, 352);
    decoder.registerEncodingId(357, writerId, 355);
    decoder.registerEncodingId(360, writerId, 358);
    decoder.registerEncodingId(363, writerId, 361);
    decoder.registerEncodingId(366, writerId, 364);
    decoder.registerEncodingId(369, writerId, 367);
    decoder.registerEncodingId(372, writerId, 370);
    decoder.registerEncodingId(375, writerId, 373);
    decoder.registerEncodingId(17610, writerId, 17606);
    decoder.registerEncodingId(17611, writerId, 17607);
    decoder.registerEncodingId(378, writerId, 376);
    decoder.registerEncodingId(485, writerId, 483);
    decoder.registerEncodingId(488, writerId, 486);
    decoder.registerEncodingId(491, writerId, 489);
    decoder.registerEncodingId(381, writerId, 379);
    decoder.registerEncodingId(494, writerId, 492);
    decoder.registerEncodingId(497, writerId, 495);
    decoder.registerEncodingId(384, writerId, 382);
    decoder.registerEncodingId(500, writerId, 498);
    decoder.registerEncodingId(503, writerId, 501);
    decoder.registerEncodingId(387, writerId, 385);
    decoder.registerEncodingId(506, writerId, 504);
    decoder.registerEncodingId(509, writerId, 507);
    decoder.registerEncodingId(513, writerId, 511);
    decoder.registerEncodingId(516, writerId, 514);
    decoder.registerEncodingId(520, writerId, 518);
    decoder.registerEncodingId(524, writerId, 522);
    decoder.registerEncodingId(527, writerId, 525);
    decoder.registerEncodingId(530, writerId, 528);
    decoder.registerEncodingId(533, writerId, 531);
    decoder.registerEncodingId(536, writerId, 534);
    decoder.registerEncodingId(539, writerId, 537);
    decoder.registerEncodingId(542, writerId, 540);
    decoder.registerEncodingId(545, writerId, 543);
    decoder.registerEncodingId(548, writerId, 546);
    decoder.registerEncodingId(551, writerId, 549);
    decoder.registerEncodingId(554, writerId, 552);
    decoder.registerEncodingId(557, writerId, 555);
    decoder.registerEncodingId(560, writerId, 558);
    decoder.registerEncodingId(563, writerId, 561);
    decoder.registerEncodingId(566, writerId, 564);
    decoder.registerEncodingId(569, writerId, 567);
    decoder.registerEncodingId(333, writerId, 331);
    decoder.registerEncodingId(572, writerId, 570);
    decoder.registerEncodingId(575, writerId, 573);
    decoder.registerEncodingId(579, writerId, 577);
    decoder.registerEncodingId(582, writerId, 580);
    decoder.registerEncodingId(585, writerId, 583);
    decoder.registerEncodingId(588, writerId, 586);
    decoder.registerEncodingId(591, writerId, 589);
    decoder.registerEncodingId(594, writerId, 592);
    decoder.registerEncodingId(597, writerId, 595);
    decoder.registerEncodingId(600, writerId, 598);
    decoder.registerEncodingId(603, writerId, 601);
    decoder.registerEncodingId(606, writerId, 604);
    decoder.registerEncodingId(609, writerId, 607);
    decoder.registerEncodingId(612, writerId, 610);
    decoder.registerEncodingId(615, writerId, 613);
    decoder.registerEncodingId(618, writerId, 616);
    decoder.registerEncodingId(621, writerId, 619);
    decoder.registerEncodingId(624, writerId, 622);
    decoder.registerEncodingId(628, writerId, 626);
    decoder.registerEncodingId(631, writerId, 629);
    decoder.registerEncodingId(634, writerId, 632);
    decoder.registerEncodingId(637, writerId, 635);
    decoder.registerEncodingId(640, writerId, 638);
    decoder.registerEncodingId(643, writerId, 641);
    decoder.registerEncodingId(646, writerId, 644);
    decoder.registerEncodingId(32800, writerId, 32799);
    decoder.registerEncodingId(18650, writerId, 18648);
    decoder.registerEncodingId(18651, writerId, 18649);
    decoder.registerEncodingId(649, writerId, 647);
    decoder.registerEncodingId(652, writerId, 650);
    decoder.registerEncodingId(655, writerId, 653);
    decoder.registerEncodingId(23500, writerId, 23497);
    decoder.registerEncodingId(658, writerId, 656);
    decoder.registerEncodingId(11226, writerId, 11216);
    decoder.registerEncodingId(11227, writerId, 11217);
    decoder.registerEncodingId(661, writerId, 659);
    decoder.registerEncodingId(32825, writerId, 32824);
    decoder.registerEncodingId(664, writerId, 662);
    decoder.registerEncodingId(667, writerId, 665);
    decoder.registerEncodingId(670, writerId, 668);
    decoder.registerEncodingId(673, writerId, 671);
    decoder.registerEncodingId(676, writerId, 674);
    decoder.registerEncodingId(679, writerId, 677);
    decoder.registerEncodingId(682, writerId, 680);
    decoder.registerEncodingId(11300, writerId, 11295);
    decoder.registerEncodingId(685, writerId, 683);
    decoder.registerEncodingId(688, writerId, 686);
    decoder.registerEncodingId(691, writerId, 689);
    decoder.registerEncodingId(694, writerId, 692);
    decoder.registerEncodingId(697, writerId, 695);
    decoder.registerEncodingId(700, writerId, 698);
    decoder.registerEncodingId(703, writerId, 701);
    decoder.registerEncodingId(706, writerId, 704);
    decoder.registerEncodingId(709, writerId, 707);
    decoder.registerEncodingId(712, writerId, 710);
    decoder.registerEncodingId(715, writerId, 713);
    decoder.registerEncodingId(721, writerId, 719);
    decoder.registerEncodingId(724, writerId, 722);
    decoder.registerEncodingId(727, writerId, 725);
    decoder.registerEncodingId(950, writerId, 948);
    decoder.registerEncodingId(730, writerId, 728);
    decoder.registerEncodingId(733, writerId, 731);
    decoder.registerEncodingId(736, writerId, 734);
    decoder.registerEncodingId(739, writerId, 737);
    decoder.registerEncodingId(742, writerId, 740);
    decoder.registerEncodingId(745, writerId, 743);
    decoder.registerEncodingId(748, writerId, 746);
    decoder.registerEncodingId(751, writerId, 749);
    decoder.registerEncodingId(754, writerId, 752);
    decoder.registerEncodingId(757, writerId, 755);
    decoder.registerEncodingId(760, writerId, 758);
    decoder.registerEncodingId(763, writerId, 761);
    decoder.registerEncodingId(766, writerId, 764);
    decoder.registerEncodingId(769, writerId, 767);
    decoder.registerEncodingId(772, writerId, 770);
    decoder.registerEncodingId(775, writerId, 773);
    decoder.registerEncodingId(778, writerId, 776);
    decoder.registerEncodingId(781, writerId, 779);
    decoder.registerEncodingId(784, writerId, 782);
    decoder.registerEncodingId(787, writerId, 785);
    decoder.registerEncodingId(790, writerId, 788);
    decoder.registerEncodingId(793, writerId, 791);
    decoder.registerEncodingId(796, writerId, 794);
    decoder.registerEncodingId(799, writerId, 797);
    decoder.registerEncodingId(802, writerId, 800);
    decoder.registerEncodingId(805, writerId, 803);
    decoder.registerEncodingId(947, writerId, 945);
    decoder.registerEncodingId(811, writerId, 809);
    decoder.registerEncodingId(808, writerId, 806);
    decoder.registerEncodingId(916, writerId, 914);
    decoder.registerEncodingId(919, writerId, 917);
    decoder.registerEncodingId(922, writerId, 920);
    decoder.registerEncodingId(820, writerId, 818);
    decoder.registerEncodingId(823, writerId, 821);
    decoder.registerEncodingId(826, writerId, 824);
    decoder.registerEncodingId(829, writerId, 827);
    decoder.registerEncodingId(832, writerId, 830);
    decoder.registerEncodingId(835, writerId, 833);
    decoder.registerEncodingId(838, writerId, 836);
    decoder.registerEncodingId(841, writerId, 839);
    decoder.registerEncodingId(844, writerId, 842);
    decoder.registerEncodingId(847, writerId, 845);
    decoder.registerEncodingId(850, writerId, 848);
    decoder.registerEncodingId(340, writerId, 338);
    decoder.registerEncodingId(855, writerId, 853);
    decoder.registerEncodingId(11957, writerId, 11943);
    decoder.registerEncodingId(11958, writerId, 11944);
    decoder.registerEncodingId(858, writerId, 856);
    decoder.registerEncodingId(861, writerId, 859);
    decoder.registerEncodingId(864, writerId, 862);
    decoder.registerEncodingId(867, writerId, 865);
    decoder.registerEncodingId(870, writerId, 868);
    decoder.registerEncodingId(873, writerId, 871);
    decoder.registerEncodingId(301, writerId, 299);
    decoder.registerEncodingId(876, writerId, 874);
    decoder.registerEncodingId(879, writerId, 877);
    decoder.registerEncodingId(899, writerId, 897);
    decoder.registerEncodingId(886, writerId, 884);
    decoder.registerEncodingId(889, writerId, 887);
    decoder.registerEncodingId(12181, writerId, 12171);
    decoder.registerEncodingId(12182, writerId, 12172);
    decoder.registerEncodingId(12089, writerId, 12079);
    decoder.registerEncodingId(12090, writerId, 12080);
    decoder.registerEncodingId(896, writerId, 894);
    decoder.registerEncodingId(24034, writerId, 24033);
    decoder.registerEncodingId(893, writerId, 891);
}

export function registerJsonDecoders(decoder:Decoder){
    const writerId = 'json';

    decoder.registerEncodingId(15085, writerId, 12756);
    decoder.registerEncodingId(15041, writerId, 14533);
    decoder.registerEncodingId(17547, writerId, 16313);
    decoder.registerEncodingId(17557, writerId, 17548);
    decoder.registerEncodingId(16150, writerId, 15528);
    decoder.registerEncodingId(32430, writerId, 32421);
    decoder.registerEncodingId(19064, writerId, 18806);
    decoder.registerEncodingId(19065, writerId, 18807);
    decoder.registerEncodingId(19067, writerId, 18809);
    decoder.registerEncodingId(19069, writerId, 18811);
    decoder.registerEncodingId(19071, writerId, 18813);
    decoder.registerEncodingId(15042, writerId, 15634);
    decoder.registerEncodingId(23528, writerId, 23498);
    decoder.registerEncodingId(32584, writerId, 32434);
    decoder.registerEncodingId(32585, writerId, 32435);
    decoder.registerEncodingId(32586, writerId, 32438);
    decoder.registerEncodingId(15044, writerId, 12554);
    decoder.registerEncodingId(16632, writerId, 15434);
    decoder.registerEncodingId(16633, writerId, 15435);
    decoder.registerEncodingId(16634, writerId, 15436);
    decoder.registerEncodingId(16635, writerId, 15538);
    decoder.registerEncodingId(32390, writerId, 32285);
    decoder.registerEncodingId(23776, writerId, 23743);
    decoder.registerEncodingId(16637, writerId, 15556);
    decoder.registerEncodingId(16642, writerId, 15557);
    decoder.registerEncodingId(16643, writerId, 15558);
    decoder.registerEncodingId(16644, writerId, 15559);
    decoder.registerEncodingId(16645, writerId, 15560);
    decoder.registerEncodingId(23739, writerId, 23724);
    decoder.registerEncodingId(23777, writerId, 23744);
    decoder.registerEncodingId(15045, writerId, 17861);
    decoder.registerEncodingId(16151, writerId, 15534);
    decoder.registerEncodingId(15057, writerId, 14525);
    decoder.registerEncodingId(15058, writerId, 15487);
    decoder.registerEncodingId(15059, writerId, 15488);
    decoder.registerEncodingId(15700, writerId, 15005);
    decoder.registerEncodingId(15714, writerId, 15006);
    decoder.registerEncodingId(24132, writerId, 24105);
    decoder.registerEncodingId(24133, writerId, 24106);
    decoder.registerEncodingId(24134, writerId, 24107);
    decoder.registerEncodingId(15050, writerId, 14523);
    decoder.registerEncodingId(15051, writerId, 14524);
    decoder.registerEncodingId(15049, writerId, 14593);
    decoder.registerEncodingId(16152, writerId, 15578);
    decoder.registerEncodingId(16153, writerId, 15580);
    decoder.registerEncodingId(15060, writerId, 14273);
    decoder.registerEncodingId(16154, writerId, 15581);
    decoder.registerEncodingId(16155, writerId, 15582);
    decoder.registerEncodingId(25561, writerId, 25269);
    decoder.registerEncodingId(18622, writerId, 18593);
    decoder.registerEncodingId(18623, writerId, 18594);
    decoder.registerEncodingId(18624, writerId, 18597);
    decoder.registerEncodingId(18945, writerId, 18793);
    decoder.registerEncodingId(16156, writerId, 15597);
    decoder.registerEncodingId(16157, writerId, 15598);
    decoder.registerEncodingId(16158, writerId, 15605);
    decoder.registerEncodingId(16159, writerId, 15609);
    decoder.registerEncodingId(21198, writerId, 15480);
    decoder.registerEncodingId(16161, writerId, 15611);
    decoder.registerEncodingId(16280, writerId, 15616);
    decoder.registerEncodingId(16281, writerId, 15617);
    decoder.registerEncodingId(16282, writerId, 15618);
    decoder.registerEncodingId(21199, writerId, 15502);
    decoder.registerEncodingId(21200, writerId, 15510);
    decoder.registerEncodingId(21201, writerId, 15520);
    decoder.registerEncodingId(16284, writerId, 15621);
    decoder.registerEncodingId(16285, writerId, 15622);
    decoder.registerEncodingId(16286, writerId, 15623);
    decoder.registerEncodingId(16287, writerId, 15628);
    decoder.registerEncodingId(16288, writerId, 15629);
    decoder.registerEncodingId(16308, writerId, 15630);
    decoder.registerEncodingId(16310, writerId, 15631);
    decoder.registerEncodingId(15061, writerId, 14744);
    decoder.registerEncodingId(16311, writerId, 15635);
    decoder.registerEncodingId(21202, writerId, 15530);
    decoder.registerEncodingId(23987, writerId, 23599);
    decoder.registerEncodingId(23988, writerId, 23600);
    decoder.registerEncodingId(23989, writerId, 23601);
    decoder.registerEncodingId(25562, writerId, 25270);
    decoder.registerEncodingId(23990, writerId, 23602);
    decoder.registerEncodingId(16323, writerId, 15645);
    decoder.registerEncodingId(16391, writerId, 15652);
    decoder.registerEncodingId(16392, writerId, 15653);
    decoder.registerEncodingId(16393, writerId, 15657);
    decoder.registerEncodingId(16394, writerId, 15664);
    decoder.registerEncodingId(16404, writerId, 15665);
    decoder.registerEncodingId(23991, writerId, 23603);
    decoder.registerEncodingId(23992, writerId, 23604);
    decoder.registerEncodingId(23993, writerId, 23605);
    decoder.registerEncodingId(23996, writerId, 23608);
    decoder.registerEncodingId(23997, writerId, 23609);
    decoder.registerEncodingId(17476, writerId, 17467);
    decoder.registerEncodingId(24000, writerId, 23612);
    decoder.registerEncodingId(21203, writerId, 15532);
    decoder.registerEncodingId(24001, writerId, 23613);
    decoder.registerEncodingId(24002, writerId, 23614);
    decoder.registerEncodingId(18946, writerId, 18794);
    decoder.registerEncodingId(15726, writerId, 15007);
    decoder.registerEncodingId(16524, writerId, 15667);
    decoder.registerEncodingId(16525, writerId, 15669);
    decoder.registerEncodingId(16526, writerId, 15670);
    decoder.registerEncodingId(25563, writerId, 25519);
    decoder.registerEncodingId(25564, writerId, 25520);
    decoder.registerEncodingId(23511, writerId, 23468);
    decoder.registerEncodingId(24300, writerId, 24281);
    decoder.registerEncodingId(25247, writerId, 25220);
    decoder.registerEncodingId(19299, writerId, 18953);
    decoder.registerEncodingId(19300, writerId, 18954);
    decoder.registerEncodingId(19301, writerId, 18955);
    decoder.registerEncodingId(32677, writerId, 32659);
    decoder.registerEncodingId(32678, writerId, 32660);
    decoder.registerEncodingId(19387, writerId, 19361);
    decoder.registerEncodingId(19803, writerId, 19745);
    decoder.registerEncodingId(19804, writerId, 19746);
    decoder.registerEncodingId(19805, writerId, 19747);
    decoder.registerEncodingId(19806, writerId, 19748);
    decoder.registerEncodingId(15062, writerId, 96);
    decoder.registerEncodingId(15063, writerId, 97);
    decoder.registerEncodingId(15065, writerId, 101);
    decoder.registerEncodingId(15066, writerId, 99);
    decoder.registerEncodingId(15067, writerId, 100);
    decoder.registerEncodingId(15068, writerId, 258);
    decoder.registerEncodingId(15069, writerId, 11879);
    decoder.registerEncodingId(15070, writerId, 11880);
    decoder.registerEncodingId(15071, writerId, 261);
    decoder.registerEncodingId(15073, writerId, 264);
    decoder.registerEncodingId(15074, writerId, 267);
    decoder.registerEncodingId(15075, writerId, 270);
    decoder.registerEncodingId(15076, writerId, 273);
    decoder.registerEncodingId(15077, writerId, 276);
    decoder.registerEncodingId(15078, writerId, 279);
    decoder.registerEncodingId(15079, writerId, 282);
    decoder.registerEncodingId(15080, writerId, 285);
    decoder.registerEncodingId(15081, writerId, 296);
    decoder.registerEncodingId(15082, writerId, 7594);
    decoder.registerEncodingId(15083, writerId, 102);
    decoder.registerEncodingId(15084, writerId, 12755);
    decoder.registerEncodingId(15086, writerId, 8912);
    decoder.registerEncodingId(15087, writerId, 308);
    decoder.registerEncodingId(15088, writerId, 389);
    decoder.registerEncodingId(15089, writerId, 392);
    decoder.registerEncodingId(15090, writerId, 395);
    decoder.registerEncodingId(15091, writerId, 15901);
    decoder.registerEncodingId(15092, writerId, 20999);
    decoder.registerEncodingId(15093, writerId, 420);
    decoder.registerEncodingId(15094, writerId, 423);
    decoder.registerEncodingId(15095, writerId, 12189);
    decoder.registerEncodingId(15096, writerId, 12190);
    decoder.registerEncodingId(15097, writerId, 12191);
    decoder.registerEncodingId(15098, writerId, 304);
    decoder.registerEncodingId(15099, writerId, 312);
    decoder.registerEncodingId(15100, writerId, 426);
    decoder.registerEncodingId(15101, writerId, 429);
    decoder.registerEncodingId(15102, writerId, 432);
    decoder.registerEncodingId(15103, writerId, 435);
    decoder.registerEncodingId(15104, writerId, 438);
    decoder.registerEncodingId(15105, writerId, 12890);
    decoder.registerEncodingId(15106, writerId, 12891);
    decoder.registerEncodingId(15107, writerId, 12193);
    decoder.registerEncodingId(15130, writerId, 12194);
    decoder.registerEncodingId(15131, writerId, 441);
    decoder.registerEncodingId(15132, writerId, 444);
    decoder.registerEncodingId(15133, writerId, 447);
    decoder.registerEncodingId(15134, writerId, 450);
    decoder.registerEncodingId(15135, writerId, 453);
    decoder.registerEncodingId(15136, writerId, 344);
    decoder.registerEncodingId(15137, writerId, 456);
    decoder.registerEncodingId(15138, writerId, 459);
    decoder.registerEncodingId(15139, writerId, 462);
    decoder.registerEncodingId(15140, writerId, 316);
    decoder.registerEncodingId(15141, writerId, 319);
    decoder.registerEncodingId(15142, writerId, 322);
    decoder.registerEncodingId(15143, writerId, 325);
    decoder.registerEncodingId(15144, writerId, 938);
    decoder.registerEncodingId(15145, writerId, 465);
    decoder.registerEncodingId(15146, writerId, 468);
    decoder.registerEncodingId(15147, writerId, 471);
    decoder.registerEncodingId(15148, writerId, 474);
    decoder.registerEncodingId(15149, writerId, 477);
    decoder.registerEncodingId(15150, writerId, 480);
    decoder.registerEncodingId(15151, writerId, 349);
    decoder.registerEncodingId(15152, writerId, 352);
    decoder.registerEncodingId(15153, writerId, 355);
    decoder.registerEncodingId(15157, writerId, 358);
    decoder.registerEncodingId(15158, writerId, 361);
    decoder.registerEncodingId(15159, writerId, 364);
    decoder.registerEncodingId(15160, writerId, 367);
    decoder.registerEncodingId(15161, writerId, 370);
    decoder.registerEncodingId(15162, writerId, 373);
    decoder.registerEncodingId(15163, writerId, 17606);
    decoder.registerEncodingId(15164, writerId, 17607);
    decoder.registerEncodingId(15165, writerId, 376);
    decoder.registerEncodingId(15166, writerId, 483);
    decoder.registerEncodingId(15167, writerId, 486);
    decoder.registerEncodingId(15168, writerId, 489);
    decoder.registerEncodingId(15169, writerId, 379);
    decoder.registerEncodingId(15170, writerId, 492);
    decoder.registerEncodingId(15171, writerId, 495);
    decoder.registerEncodingId(15172, writerId, 382);
    decoder.registerEncodingId(15173, writerId, 498);
    decoder.registerEncodingId(15174, writerId, 501);
    decoder.registerEncodingId(15175, writerId, 385);
    decoder.registerEncodingId(15176, writerId, 504);
    decoder.registerEncodingId(15177, writerId, 507);
    decoder.registerEncodingId(15179, writerId, 511);
    decoder.registerEncodingId(15180, writerId, 514);
    decoder.registerEncodingId(15182, writerId, 518);
    decoder.registerEncodingId(15183, writerId, 522);
    decoder.registerEncodingId(15184, writerId, 525);
    decoder.registerEncodingId(15185, writerId, 528);
    decoder.registerEncodingId(15186, writerId, 531);
    decoder.registerEncodingId(15187, writerId, 534);
    decoder.registerEncodingId(15188, writerId, 537);
    decoder.registerEncodingId(15189, writerId, 540);
    decoder.registerEncodingId(15190, writerId, 543);
    decoder.registerEncodingId(15191, writerId, 546);
    decoder.registerEncodingId(15192, writerId, 549);
    decoder.registerEncodingId(15193, writerId, 552);
    decoder.registerEncodingId(15194, writerId, 555);
    decoder.registerEncodingId(15195, writerId, 558);
    decoder.registerEncodingId(15196, writerId, 561);
    decoder.registerEncodingId(15197, writerId, 564);
    decoder.registerEncodingId(15198, writerId, 567);
    decoder.registerEncodingId(15199, writerId, 331);
    decoder.registerEncodingId(15200, writerId, 570);
    decoder.registerEncodingId(15201, writerId, 573);
    decoder.registerEncodingId(15202, writerId, 577);
    decoder.registerEncodingId(15203, writerId, 580);
    decoder.registerEncodingId(15204, writerId, 583);
    decoder.registerEncodingId(15205, writerId, 586);
    decoder.registerEncodingId(15206, writerId, 589);
    decoder.registerEncodingId(15207, writerId, 592);
    decoder.registerEncodingId(15208, writerId, 595);
    decoder.registerEncodingId(15209, writerId, 598);
    decoder.registerEncodingId(15210, writerId, 601);
    decoder.registerEncodingId(15211, writerId, 604);
    decoder.registerEncodingId(15228, writerId, 607);
    decoder.registerEncodingId(15236, writerId, 610);
    decoder.registerEncodingId(15244, writerId, 613);
    decoder.registerEncodingId(15252, writerId, 616);
    decoder.registerEncodingId(15254, writerId, 619);
    decoder.registerEncodingId(15255, writerId, 622);
    decoder.registerEncodingId(15256, writerId, 626);
    decoder.registerEncodingId(15257, writerId, 629);
    decoder.registerEncodingId(15258, writerId, 632);
    decoder.registerEncodingId(15259, writerId, 635);
    decoder.registerEncodingId(15260, writerId, 638);
    decoder.registerEncodingId(15261, writerId, 641);
    decoder.registerEncodingId(15262, writerId, 644);
    decoder.registerEncodingId(32802, writerId, 32799);
    decoder.registerEncodingId(18654, writerId, 18648);
    decoder.registerEncodingId(18655, writerId, 18649);
    decoder.registerEncodingId(15263, writerId, 647);
    decoder.registerEncodingId(15264, writerId, 650);
    decoder.registerEncodingId(15269, writerId, 653);
    decoder.registerEncodingId(23512, writerId, 23497);
    decoder.registerEncodingId(15270, writerId, 656);
    decoder.registerEncodingId(15271, writerId, 11216);
    decoder.registerEncodingId(15272, writerId, 11217);
    decoder.registerEncodingId(15273, writerId, 659);
    decoder.registerEncodingId(32833, writerId, 32824);
    decoder.registerEncodingId(15274, writerId, 662);
    decoder.registerEncodingId(15275, writerId, 665);
    decoder.registerEncodingId(15276, writerId, 668);
    decoder.registerEncodingId(15277, writerId, 671);
    decoder.registerEncodingId(15278, writerId, 674);
    decoder.registerEncodingId(15279, writerId, 677);
    decoder.registerEncodingId(15280, writerId, 680);
    decoder.registerEncodingId(15281, writerId, 11295);
    decoder.registerEncodingId(15282, writerId, 683);
    decoder.registerEncodingId(15283, writerId, 686);
    decoder.registerEncodingId(15284, writerId, 689);
    decoder.registerEncodingId(15285, writerId, 692);
    decoder.registerEncodingId(15286, writerId, 695);
    decoder.registerEncodingId(15287, writerId, 698);
    decoder.registerEncodingId(15288, writerId, 701);
    decoder.registerEncodingId(15289, writerId, 704);
    decoder.registerEncodingId(15290, writerId, 707);
    decoder.registerEncodingId(15291, writerId, 710);
    decoder.registerEncodingId(15292, writerId, 713);
    decoder.registerEncodingId(15293, writerId, 719);
    decoder.registerEncodingId(15294, writerId, 722);
    decoder.registerEncodingId(15295, writerId, 725);
    decoder.registerEncodingId(15304, writerId, 948);
    decoder.registerEncodingId(15312, writerId, 728);
    decoder.registerEncodingId(15313, writerId, 731);
    decoder.registerEncodingId(15314, writerId, 734);
    decoder.registerEncodingId(15315, writerId, 737);
    decoder.registerEncodingId(15320, writerId, 740);
    decoder.registerEncodingId(15321, writerId, 743);
    decoder.registerEncodingId(15322, writerId, 746);
    decoder.registerEncodingId(15323, writerId, 749);
    decoder.registerEncodingId(15324, writerId, 752);
    decoder.registerEncodingId(15325, writerId, 755);
    decoder.registerEncodingId(15326, writerId, 758);
    decoder.registerEncodingId(15327, writerId, 761);
    decoder.registerEncodingId(15328, writerId, 764);
    decoder.registerEncodingId(15329, writerId, 767);
    decoder.registerEncodingId(15331, writerId, 770);
    decoder.registerEncodingId(15332, writerId, 773);
    decoder.registerEncodingId(15333, writerId, 776);
    decoder.registerEncodingId(15335, writerId, 779);
    decoder.registerEncodingId(15336, writerId, 782);
    decoder.registerEncodingId(15337, writerId, 785);
    decoder.registerEncodingId(15338, writerId, 788);
    decoder.registerEncodingId(15339, writerId, 791);
    decoder.registerEncodingId(15340, writerId, 794);
    decoder.registerEncodingId(15341, writerId, 797);
    decoder.registerEncodingId(15342, writerId, 800);
    decoder.registerEncodingId(15343, writerId, 803);
    decoder.registerEncodingId(15344, writerId, 945);
    decoder.registerEncodingId(15345, writerId, 809);
    decoder.registerEncodingId(15346, writerId, 806);
    decoder.registerEncodingId(15347, writerId, 914);
    decoder.registerEncodingId(15348, writerId, 917);
    decoder.registerEncodingId(15349, writerId, 920);
    decoder.registerEncodingId(15350, writerId, 818);
    decoder.registerEncodingId(15351, writerId, 821);
    decoder.registerEncodingId(15352, writerId, 824);
    decoder.registerEncodingId(15353, writerId, 827);
    decoder.registerEncodingId(15354, writerId, 830);
    decoder.registerEncodingId(15355, writerId, 833);
    decoder.registerEncodingId(15356, writerId, 836);
    decoder.registerEncodingId(15357, writerId, 839);
    decoder.registerEncodingId(15358, writerId, 842);
    decoder.registerEncodingId(15359, writerId, 845);
    decoder.registerEncodingId(15360, writerId, 848);
    decoder.registerEncodingId(15361, writerId, 338);
    decoder.registerEncodingId(15362, writerId, 853);
    decoder.registerEncodingId(15363, writerId, 11943);
    decoder.registerEncodingId(15364, writerId, 11944);
    decoder.registerEncodingId(15365, writerId, 856);
    decoder.registerEncodingId(15366, writerId, 859);
    decoder.registerEncodingId(15367, writerId, 862);
    decoder.registerEncodingId(15368, writerId, 865);
    decoder.registerEncodingId(15369, writerId, 868);
    decoder.registerEncodingId(15370, writerId, 871);
    decoder.registerEncodingId(15371, writerId, 299);
    decoder.registerEncodingId(15372, writerId, 874);
    decoder.registerEncodingId(15373, writerId, 877);
    decoder.registerEncodingId(15374, writerId, 897);
    decoder.registerEncodingId(15375, writerId, 884);
    decoder.registerEncodingId(15376, writerId, 887);
    decoder.registerEncodingId(15377, writerId, 12171);
    decoder.registerEncodingId(15378, writerId, 12172);
    decoder.registerEncodingId(15379, writerId, 12079);
    decoder.registerEncodingId(15380, writerId, 12080);
    decoder.registerEncodingId(15381, writerId, 894);
    decoder.registerEncodingId(24042, writerId, 24033);
    decoder.registerEncodingId(15382, writerId, 891);
}

export function registerXmlDecoders(decoder:Decoder){
    const writerId = 'xml';

    decoder.registerEncodingId(12758, writerId, 12756);
    decoder.registerEncodingId(14802, writerId, 14533);
    decoder.registerEncodingId(17541, writerId, 16313);
    decoder.registerEncodingId(17553, writerId, 17548);
    decoder.registerEncodingId(15949, writerId, 15528);
    decoder.registerEncodingId(32426, writerId, 32421);
    decoder.registerEncodingId(18851, writerId, 18806);
    decoder.registerEncodingId(18852, writerId, 18807);
    decoder.registerEncodingId(18854, writerId, 18809);
    decoder.registerEncodingId(18856, writerId, 18811);
    decoder.registerEncodingId(18858, writerId, 18813);
    decoder.registerEncodingId(15728, writerId, 15634);
    decoder.registerEncodingId(23520, writerId, 23498);
    decoder.registerEncodingId(32572, writerId, 32434);
    decoder.registerEncodingId(32573, writerId, 32435);
    decoder.registerEncodingId(32574, writerId, 32438);
    decoder.registerEncodingId(12676, writerId, 12554);
    decoder.registerEncodingId(16587, writerId, 15434);
    decoder.registerEncodingId(16588, writerId, 15435);
    decoder.registerEncodingId(16589, writerId, 15436);
    decoder.registerEncodingId(16590, writerId, 15538);
    decoder.registerEncodingId(32386, writerId, 32285);
    decoder.registerEncodingId(23762, writerId, 23743);
    decoder.registerEncodingId(16592, writerId, 15556);
    decoder.registerEncodingId(16593, writerId, 15557);
    decoder.registerEncodingId(16594, writerId, 15558);
    decoder.registerEncodingId(16595, writerId, 15559);
    decoder.registerEncodingId(16596, writerId, 15560);
    decoder.registerEncodingId(23735, writerId, 23724);
    decoder.registerEncodingId(23763, writerId, 23744);
    decoder.registerEncodingId(17862, writerId, 17861);
    decoder.registerEncodingId(15950, writerId, 15534);
    decoder.registerEncodingId(14796, writerId, 14525);
    decoder.registerEncodingId(15589, writerId, 15487);
    decoder.registerEncodingId(15590, writerId, 15488);
    decoder.registerEncodingId(15529, writerId, 15005);
    decoder.registerEncodingId(15531, writerId, 15006);
    decoder.registerEncodingId(24120, writerId, 24105);
    decoder.registerEncodingId(24121, writerId, 24106);
    decoder.registerEncodingId(24122, writerId, 24107);
    decoder.registerEncodingId(14794, writerId, 14523);
    decoder.registerEncodingId(14795, writerId, 14524);
    decoder.registerEncodingId(14803, writerId, 14593);
    decoder.registerEncodingId(15951, writerId, 15578);
    decoder.registerEncodingId(15952, writerId, 15580);
    decoder.registerEncodingId(14319, writerId, 14273);
    decoder.registerEncodingId(15953, writerId, 15581);
    decoder.registerEncodingId(15954, writerId, 15582);
    decoder.registerEncodingId(25545, writerId, 25269);
    decoder.registerEncodingId(18610, writerId, 18593);
    decoder.registerEncodingId(18611, writerId, 18594);
    decoder.registerEncodingId(18612, writerId, 18597);
    decoder.registerEncodingId(18937, writerId, 18793);
    decoder.registerEncodingId(15955, writerId, 15597);
    decoder.registerEncodingId(15956, writerId, 15598);
    decoder.registerEncodingId(15987, writerId, 15605);
    decoder.registerEncodingId(15988, writerId, 15609);
    decoder.registerEncodingId(21174, writerId, 15480);
    decoder.registerEncodingId(15990, writerId, 15611);
    decoder.registerEncodingId(15991, writerId, 15616);
    decoder.registerEncodingId(15992, writerId, 15617);
    decoder.registerEncodingId(15993, writerId, 15618);
    decoder.registerEncodingId(21175, writerId, 15502);
    decoder.registerEncodingId(21176, writerId, 15510);
    decoder.registerEncodingId(21177, writerId, 15520);
    decoder.registerEncodingId(15995, writerId, 15621);
    decoder.registerEncodingId(15996, writerId, 15622);
    decoder.registerEncodingId(16007, writerId, 15623);
    decoder.registerEncodingId(16008, writerId, 15628);
    decoder.registerEncodingId(16009, writerId, 15629);
    decoder.registerEncodingId(16010, writerId, 15630);
    decoder.registerEncodingId(16011, writerId, 15631);
    decoder.registerEncodingId(14804, writerId, 14744);
    decoder.registerEncodingId(16012, writerId, 15635);
    decoder.registerEncodingId(21178, writerId, 15530);
    decoder.registerEncodingId(23919, writerId, 23599);
    decoder.registerEncodingId(23920, writerId, 23600);
    decoder.registerEncodingId(23921, writerId, 23601);
    decoder.registerEncodingId(25546, writerId, 25270);
    decoder.registerEncodingId(23922, writerId, 23602);
    decoder.registerEncodingId(16014, writerId, 15645);
    decoder.registerEncodingId(16015, writerId, 15652);
    decoder.registerEncodingId(16016, writerId, 15653);
    decoder.registerEncodingId(16017, writerId, 15657);
    decoder.registerEncodingId(16018, writerId, 15664);
    decoder.registerEncodingId(16019, writerId, 15665);
    decoder.registerEncodingId(23923, writerId, 23603);
    decoder.registerEncodingId(23924, writerId, 23604);
    decoder.registerEncodingId(23925, writerId, 23605);
    decoder.registerEncodingId(23928, writerId, 23608);
    decoder.registerEncodingId(23929, writerId, 23609);
    decoder.registerEncodingId(17472, writerId, 17467);
    decoder.registerEncodingId(23932, writerId, 23612);
    decoder.registerEncodingId(21179, writerId, 15532);
    decoder.registerEncodingId(23933, writerId, 23613);
    decoder.registerEncodingId(23934, writerId, 23614);
    decoder.registerEncodingId(18938, writerId, 18794);
    decoder.registerEncodingId(15579, writerId, 15007);
    decoder.registerEncodingId(16021, writerId, 15667);
    decoder.registerEncodingId(16022, writerId, 15669);
    decoder.registerEncodingId(16023, writerId, 15670);
    decoder.registerEncodingId(25547, writerId, 25519);
    decoder.registerEncodingId(25548, writerId, 25520);
    decoder.registerEncodingId(23505, writerId, 23468);
    decoder.registerEncodingId(24296, writerId, 24281);
    decoder.registerEncodingId(25243, writerId, 25220);
    decoder.registerEncodingId(19100, writerId, 18953);
    decoder.registerEncodingId(19101, writerId, 18954);
    decoder.registerEncodingId(19102, writerId, 18955);
    decoder.registerEncodingId(32669, writerId, 32659);
    decoder.registerEncodingId(32670, writerId, 32660);
    decoder.registerEncodingId(19383, writerId, 19361);
    decoder.registerEncodingId(19773, writerId, 19745);
    decoder.registerEncodingId(19774, writerId, 19746);
    decoder.registerEncodingId(19775, writerId, 19747);
    decoder.registerEncodingId(19776, writerId, 19748);
    decoder.registerEncodingId(16126, writerId, 96);
    decoder.registerEncodingId(14797, writerId, 97);
    decoder.registerEncodingId(14800, writerId, 101);
    decoder.registerEncodingId(14798, writerId, 99);
    decoder.registerEncodingId(14799, writerId, 100);
    decoder.registerEncodingId(259, writerId, 258);
    decoder.registerEncodingId(11887, writerId, 11879);
    decoder.registerEncodingId(11888, writerId, 11880);
    decoder.registerEncodingId(262, writerId, 261);
    decoder.registerEncodingId(265, writerId, 264);
    decoder.registerEncodingId(268, writerId, 267);
    decoder.registerEncodingId(271, writerId, 270);
    decoder.registerEncodingId(274, writerId, 273);
    decoder.registerEncodingId(277, writerId, 276);
    decoder.registerEncodingId(280, writerId, 279);
    decoder.registerEncodingId(283, writerId, 282);
    decoder.registerEncodingId(286, writerId, 285);
    decoder.registerEncodingId(297, writerId, 296);
    decoder.registerEncodingId(7616, writerId, 7594);
    decoder.registerEncodingId(14801, writerId, 102);
    decoder.registerEncodingId(12757, writerId, 12755);
    decoder.registerEncodingId(8913, writerId, 8912);
    decoder.registerEncodingId(309, writerId, 308);
    decoder.registerEncodingId(390, writerId, 389);
    decoder.registerEncodingId(393, writerId, 392);
    decoder.registerEncodingId(396, writerId, 395);
    decoder.registerEncodingId(15902, writerId, 15901);
    decoder.registerEncodingId(21000, writerId, 20999);
    decoder.registerEncodingId(421, writerId, 420);
    decoder.registerEncodingId(424, writerId, 423);
    decoder.registerEncodingId(12195, writerId, 12189);
    decoder.registerEncodingId(12196, writerId, 12190);
    decoder.registerEncodingId(12197, writerId, 12191);
    decoder.registerEncodingId(305, writerId, 304);
    decoder.registerEncodingId(313, writerId, 312);
    decoder.registerEncodingId(427, writerId, 426);
    decoder.registerEncodingId(430, writerId, 429);
    decoder.registerEncodingId(433, writerId, 432);
    decoder.registerEncodingId(436, writerId, 435);
    decoder.registerEncodingId(439, writerId, 438);
    decoder.registerEncodingId(12892, writerId, 12890);
    decoder.registerEncodingId(12893, writerId, 12891);
    decoder.registerEncodingId(12199, writerId, 12193);
    decoder.registerEncodingId(12200, writerId, 12194);
    decoder.registerEncodingId(442, writerId, 441);
    decoder.registerEncodingId(445, writerId, 444);
    decoder.registerEncodingId(448, writerId, 447);
    decoder.registerEncodingId(451, writerId, 450);
    decoder.registerEncodingId(454, writerId, 453);
    decoder.registerEncodingId(345, writerId, 344);
    decoder.registerEncodingId(457, writerId, 456);
    decoder.registerEncodingId(460, writerId, 459);
    decoder.registerEncodingId(463, writerId, 462);
    decoder.registerEncodingId(317, writerId, 316);
    decoder.registerEncodingId(320, writerId, 319);
    decoder.registerEncodingId(323, writerId, 322);
    decoder.registerEncodingId(326, writerId, 325);
    decoder.registerEncodingId(939, writerId, 938);
    decoder.registerEncodingId(466, writerId, 465);
    decoder.registerEncodingId(469, writerId, 468);
    decoder.registerEncodingId(472, writerId, 471);
    decoder.registerEncodingId(475, writerId, 474);
    decoder.registerEncodingId(478, writerId, 477);
    decoder.registerEncodingId(481, writerId, 480);
    decoder.registerEncodingId(350, writerId, 349);
    decoder.registerEncodingId(353, writerId, 352);
    decoder.registerEncodingId(356, writerId, 355);
    decoder.registerEncodingId(359, writerId, 358);
    decoder.registerEncodingId(362, writerId, 361);
    decoder.registerEncodingId(365, writerId, 364);
    decoder.registerEncodingId(368, writerId, 367);
    decoder.registerEncodingId(371, writerId, 370);
    decoder.registerEncodingId(374, writerId, 373);
    decoder.registerEncodingId(17608, writerId, 17606);
    decoder.registerEncodingId(17609, writerId, 17607);
    decoder.registerEncodingId(377, writerId, 376);
    decoder.registerEncodingId(484, writerId, 483);
    decoder.registerEncodingId(487, writerId, 486);
    decoder.registerEncodingId(490, writerId, 489);
    decoder.registerEncodingId(380, writerId, 379);
    decoder.registerEncodingId(493, writerId, 492);
    decoder.registerEncodingId(496, writerId, 495);
    decoder.registerEncodingId(383, writerId, 382);
    decoder.registerEncodingId(499, writerId, 498);
    decoder.registerEncodingId(502, writerId, 501);
    decoder.registerEncodingId(386, writerId, 385);
    decoder.registerEncodingId(505, writerId, 504);
    decoder.registerEncodingId(508, writerId, 507);
    decoder.registerEncodingId(512, writerId, 511);
    decoder.registerEncodingId(515, writerId, 514);
    decoder.registerEncodingId(519, writerId, 518);
    decoder.registerEncodingId(523, writerId, 522);
    decoder.registerEncodingId(526, writerId, 525);
    decoder.registerEncodingId(529, writerId, 528);
    decoder.registerEncodingId(532, writerId, 531);
    decoder.registerEncodingId(535, writerId, 534);
    decoder.registerEncodingId(538, writerId, 537);
    decoder.registerEncodingId(541, writerId, 540);
    decoder.registerEncodingId(544, writerId, 543);
    decoder.registerEncodingId(547, writerId, 546);
    decoder.registerEncodingId(550, writerId, 549);
    decoder.registerEncodingId(553, writerId, 552);
    decoder.registerEncodingId(556, writerId, 555);
    decoder.registerEncodingId(559, writerId, 558);
    decoder.registerEncodingId(562, writerId, 561);
    decoder.registerEncodingId(565, writerId, 564);
    decoder.registerEncodingId(568, writerId, 567);
    decoder.registerEncodingId(332, writerId, 331);
    decoder.registerEncodingId(571, writerId, 570);
    decoder.registerEncodingId(574, writerId, 573);
    decoder.registerEncodingId(578, writerId, 577);
    decoder.registerEncodingId(581, writerId, 580);
    decoder.registerEncodingId(584, writerId, 583);
    decoder.registerEncodingId(587, writerId, 586);
    decoder.registerEncodingId(590, writerId, 589);
    decoder.registerEncodingId(593, writerId, 592);
    decoder.registerEncodingId(596, writerId, 595);
    decoder.registerEncodingId(599, writerId, 598);
    decoder.registerEncodingId(602, writerId, 601);
    decoder.registerEncodingId(605, writerId, 604);
    decoder.registerEncodingId(608, writerId, 607);
    decoder.registerEncodingId(611, writerId, 610);
    decoder.registerEncodingId(614, writerId, 613);
    decoder.registerEncodingId(617, writerId, 616);
    decoder.registerEncodingId(620, writerId, 619);
    decoder.registerEncodingId(623, writerId, 622);
    decoder.registerEncodingId(627, writerId, 626);
    decoder.registerEncodingId(630, writerId, 629);
    decoder.registerEncodingId(633, writerId, 632);
    decoder.registerEncodingId(636, writerId, 635);
    decoder.registerEncodingId(639, writerId, 638);
    decoder.registerEncodingId(642, writerId, 641);
    decoder.registerEncodingId(645, writerId, 644);
    decoder.registerEncodingId(32801, writerId, 32799);
    decoder.registerEncodingId(18652, writerId, 18648);
    decoder.registerEncodingId(18653, writerId, 18649);
    decoder.registerEncodingId(648, writerId, 647);
    decoder.registerEncodingId(651, writerId, 650);
    decoder.registerEncodingId(654, writerId, 653);
    decoder.registerEncodingId(23506, writerId, 23497);
    decoder.registerEncodingId(657, writerId, 656);
    decoder.registerEncodingId(11218, writerId, 11216);
    decoder.registerEncodingId(11219, writerId, 11217);
    decoder.registerEncodingId(660, writerId, 659);
    decoder.registerEncodingId(32829, writerId, 32824);
    decoder.registerEncodingId(663, writerId, 662);
    decoder.registerEncodingId(666, writerId, 665);
    decoder.registerEncodingId(669, writerId, 668);
    decoder.registerEncodingId(672, writerId, 671);
    decoder.registerEncodingId(675, writerId, 674);
    decoder.registerEncodingId(678, writerId, 677);
    decoder.registerEncodingId(681, writerId, 680);
    decoder.registerEncodingId(11296, writerId, 11295);
    decoder.registerEncodingId(684, writerId, 683);
    decoder.registerEncodingId(687, writerId, 686);
    decoder.registerEncodingId(690, writerId, 689);
    decoder.registerEncodingId(693, writerId, 692);
    decoder.registerEncodingId(696, writerId, 695);
    decoder.registerEncodingId(699, writerId, 698);
    decoder.registerEncodingId(702, writerId, 701);
    decoder.registerEncodingId(705, writerId, 704);
    decoder.registerEncodingId(708, writerId, 707);
    decoder.registerEncodingId(711, writerId, 710);
    decoder.registerEncodingId(714, writerId, 713);
    decoder.registerEncodingId(720, writerId, 719);
    decoder.registerEncodingId(723, writerId, 722);
    decoder.registerEncodingId(726, writerId, 725);
    decoder.registerEncodingId(949, writerId, 948);
    decoder.registerEncodingId(729, writerId, 728);
    decoder.registerEncodingId(732, writerId, 731);
    decoder.registerEncodingId(735, writerId, 734);
    decoder.registerEncodingId(738, writerId, 737);
    decoder.registerEncodingId(741, writerId, 740);
    decoder.registerEncodingId(744, writerId, 743);
    decoder.registerEncodingId(747, writerId, 746);
    decoder.registerEncodingId(750, writerId, 749);
    decoder.registerEncodingId(753, writerId, 752);
    decoder.registerEncodingId(756, writerId, 755);
    decoder.registerEncodingId(759, writerId, 758);
    decoder.registerEncodingId(762, writerId, 761);
    decoder.registerEncodingId(765, writerId, 764);
    decoder.registerEncodingId(768, writerId, 767);
    decoder.registerEncodingId(771, writerId, 770);
    decoder.registerEncodingId(774, writerId, 773);
    decoder.registerEncodingId(777, writerId, 776);
    decoder.registerEncodingId(780, writerId, 779);
    decoder.registerEncodingId(783, writerId, 782);
    decoder.registerEncodingId(786, writerId, 785);
    decoder.registerEncodingId(789, writerId, 788);
    decoder.registerEncodingId(792, writerId, 791);
    decoder.registerEncodingId(795, writerId, 794);
    decoder.registerEncodingId(798, writerId, 797);
    decoder.registerEncodingId(801, writerId, 800);
    decoder.registerEncodingId(804, writerId, 803);
    decoder.registerEncodingId(946, writerId, 945);
    decoder.registerEncodingId(810, writerId, 809);
    decoder.registerEncodingId(807, writerId, 806);
    decoder.registerEncodingId(915, writerId, 914);
    decoder.registerEncodingId(918, writerId, 917);
    decoder.registerEncodingId(921, writerId, 920);
    decoder.registerEncodingId(819, writerId, 818);
    decoder.registerEncodingId(822, writerId, 821);
    decoder.registerEncodingId(825, writerId, 824);
    decoder.registerEncodingId(828, writerId, 827);
    decoder.registerEncodingId(831, writerId, 830);
    decoder.registerEncodingId(834, writerId, 833);
    decoder.registerEncodingId(837, writerId, 836);
    decoder.registerEncodingId(840, writerId, 839);
    decoder.registerEncodingId(843, writerId, 842);
    decoder.registerEncodingId(846, writerId, 845);
    decoder.registerEncodingId(849, writerId, 848);
    decoder.registerEncodingId(339, writerId, 338);
    decoder.registerEncodingId(854, writerId, 853);
    decoder.registerEncodingId(11949, writerId, 11943);
    decoder.registerEncodingId(11950, writerId, 11944);
    decoder.registerEncodingId(857, writerId, 856);
    decoder.registerEncodingId(860, writerId, 859);
    decoder.registerEncodingId(863, writerId, 862);
    decoder.registerEncodingId(866, writerId, 865);
    decoder.registerEncodingId(869, writerId, 868);
    decoder.registerEncodingId(872, writerId, 871);
    decoder.registerEncodingId(300, writerId, 299);
    decoder.registerEncodingId(875, writerId, 874);
    decoder.registerEncodingId(878, writerId, 877);
    decoder.registerEncodingId(898, writerId, 897);
    decoder.registerEncodingId(885, writerId, 884);
    decoder.registerEncodingId(888, writerId, 887);
    decoder.registerEncodingId(12173, writerId, 12171);
    decoder.registerEncodingId(12174, writerId, 12172);
    decoder.registerEncodingId(12081, writerId, 12079);
    decoder.registerEncodingId(12082, writerId, 12080);
    decoder.registerEncodingId(895, writerId, 894);
    decoder.registerEncodingId(24038, writerId, 24033);
    decoder.registerEncodingId(892, writerId, 891);
}
