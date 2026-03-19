/**
 * OPC UA StatusCode Type (i=19)
 *
 * StatusCode is a 32-bit unsigned integer that indicates the quality of a result.
 * The format is: [Severity:2][SubCode:14][Code:16]
 *
 * @see OPC UA Part 4, Section 7.38
 * @see OPC UA Part 6, Annex A
 */

import { BuiltInType } from "./builtinType";

export type UaStatusCode = { value: StatusCode; readonly type: BuiltInType.StatusCode };
export const uaStatusCode = (value: StatusCode): UaStatusCode => ({ value, type: BuiltInType.StatusCode });

export enum StatusCode {
  Good = 0x0 as number,
  Uncertain = 0x40000000 as number,
  Bad = 0x80000000 as number,
  BadUnexpectedError = 0x80010000 as number,
  BadInternalError = 0x80020000 as number,
  BadOutOfMemory = 0x80030000 as number,
  BadResourceUnavailable = 0x80040000 as number,
  BadCommunicationError = 0x80050000 as number,
  BadEncodingError = 0x80060000 as number,
  BadDecodingError = 0x80070000 as number,
  BadEncodingLimitsExceeded = 0x80080000 as number,
  BadRequestTooLarge = 0x80b80000 as number,
  BadResponseTooLarge = 0x80b90000 as number,
  BadUnknownResponse = 0x80090000 as number,
  BadTimeout = 0x800a0000 as number,
  BadServiceUnsupported = 0x800b0000 as number,
  BadShutdown = 0x800c0000 as number,
  BadServerNotConnected = 0x800d0000 as number,
  BadServerHalted = 0x800e0000 as number,
  BadNothingToDo = 0x800f0000 as number,
  BadTooManyOperations = 0x80100000 as number,
  BadTooManyMonitoredItems = 0x80db0000 as number,
  BadDataTypeIdUnknown = 0x80110000 as number,
  BadCertificateInvalid = 0x80120000 as number,
  BadSecurityChecksFailed = 0x80130000 as number,
  BadCertificatePolicyCheckFailed = 0x81140000 as number,
  BadCertificateTimeInvalid = 0x80140000 as number,
  BadCertificateIssuerTimeInvalid = 0x80150000 as number,
  BadCertificateHostNameInvalid = 0x80160000 as number,
  BadCertificateUriInvalid = 0x80170000 as number,
  BadCertificateUseNotAllowed = 0x80180000 as number,
  BadCertificateIssuerUseNotAllowed = 0x80190000 as number,
  BadCertificateUntrusted = 0x801a0000 as number,
  BadCertificateRevocationUnknown = 0x801b0000 as number,
  BadCertificateIssuerRevocationUnknown = 0x801c0000 as number,
  BadCertificateRevoked = 0x801d0000 as number,
  BadCertificateIssuerRevoked = 0x801e0000 as number,
  BadCertificateChainIncomplete = 0x810d0000 as number,
  BadUserAccessDenied = 0x801f0000 as number,
  BadIdentityTokenInvalid = 0x80200000 as number,
  BadIdentityTokenRejected = 0x80210000 as number,
  BadSecureChannelIdInvalid = 0x80220000 as number,
  BadInvalidTimestamp = 0x80230000 as number,
  BadNonceInvalid = 0x80240000 as number,
  BadSessionIdInvalid = 0x80250000 as number,
  BadSessionClosed = 0x80260000 as number,
  BadSessionNotActivated = 0x80270000 as number,
  BadSubscriptionIdInvalid = 0x80280000 as number,
  BadRequestHeaderInvalid = 0x802a0000 as number,
  BadTimestampsToReturnInvalid = 0x802b0000 as number,
  BadRequestCancelledByClient = 0x802c0000 as number,
  BadTooManyArguments = 0x80e50000 as number,
  BadLicenseExpired = 0x810e0000 as number,
  BadLicenseLimitsExceeded = 0x810f0000 as number,
  BadLicenseNotAvailable = 0x81100000 as number,
  GoodSubscriptionTransferred = 0x002d0000 as number,
  GoodCompletesAsynchronously = 0x002e0000 as number,
  GoodOverload = 0x002f0000 as number,
  GoodClamped = 0x00300000 as number,
  BadNoCommunication = 0x80310000 as number,
  BadWaitingForInitialData = 0x80320000 as number,
  BadNodeIdInvalid = 0x80330000 as number,
  BadNodeIdUnknown = 0x80340000 as number,
  BadAttributeIdInvalid = 0x80350000 as number,
  BadIndexRangeInvalid = 0x80360000 as number,
  BadIndexRangeNoData = 0x80370000 as number,
  BadDataEncodingInvalid = 0x80380000 as number,
  BadDataEncodingUnsupported = 0x80390000 as number,
  BadNotReadable = 0x803a0000 as number,
  BadNotWritable = 0x803b0000 as number,
  BadOutOfRange = 0x803c0000 as number,
  BadNotSupported = 0x803d0000 as number,
  BadNotFound = 0x803e0000 as number,
  BadObjectDeleted = 0x803f0000 as number,
  BadNotImplemented = 0x80400000 as number,
  BadMonitoringModeInvalid = 0x80410000 as number,
  BadMonitoredItemIdInvalid = 0x80420000 as number,
  BadMonitoredItemFilterInvalid = 0x80430000 as number,
  BadMonitoredItemFilterUnsupported = 0x80440000 as number,
  BadFilterNotAllowed = 0x80450000 as number,
  BadStructureMissing = 0x80460000 as number,
  BadEventFilterInvalid = 0x80470000 as number,
  BadContentFilterInvalid = 0x80480000 as number,
  BadFilterOperatorInvalid = 0x80c10000 as number,
  BadFilterOperatorUnsupported = 0x80c20000 as number,
  BadFilterOperandCountMismatch = 0x80c30000 as number,
  BadFilterOperandInvalid = 0x80490000 as number,
  BadFilterElementInvalid = 0x80c40000 as number,
  BadFilterLiteralInvalid = 0x80c50000 as number,
  BadContinuationPointInvalid = 0x804a0000 as number,
  BadNoContinuationPoints = 0x804b0000 as number,
  BadReferenceTypeIdInvalid = 0x804c0000 as number,
  BadBrowseDirectionInvalid = 0x804d0000 as number,
  BadNodeNotInView = 0x804e0000 as number,
  BadNumericOverflow = 0x81120000 as number,
  BadServerUriInvalid = 0x804f0000 as number,
  BadServerNameMissing = 0x80500000 as number,
  BadDiscoveryUrlMissing = 0x80510000 as number,
  BadSempahoreFileMissing = 0x80520000 as number,
  BadRequestTypeInvalid = 0x80530000 as number,
  BadSecurityModeRejected = 0x80540000 as number,
  BadSecurityPolicyRejected = 0x80550000 as number,
  BadTooManySessions = 0x80560000 as number,
  BadUserSignatureInvalid = 0x80570000 as number,
  BadApplicationSignatureInvalid = 0x80580000 as number,
  BadNoValidCertificates = 0x80590000 as number,
  BadIdentityChangeNotSupported = 0x80c60000 as number,
  BadRequestCancelledByRequest = 0x805a0000 as number,
  BadParentNodeIdInvalid = 0x805b0000 as number,
  BadReferenceNotAllowed = 0x805c0000 as number,
  BadNodeIdRejected = 0x805d0000 as number,
  BadNodeIdExists = 0x805e0000 as number,
  BadNodeClassInvalid = 0x805f0000 as number,
  BadBrowseNameInvalid = 0x80600000 as number,
  BadBrowseNameDuplicated = 0x80610000 as number,
  BadNodeAttributesInvalid = 0x80620000 as number,
  BadTypeDefinitionInvalid = 0x80630000 as number,
  BadSourceNodeIdInvalid = 0x80640000 as number,
  BadTargetNodeIdInvalid = 0x80650000 as number,
  BadDuplicateReferenceNotAllowed = 0x80660000 as number,
  BadInvalidSelfReference = 0x80670000 as number,
  BadReferenceLocalOnly = 0x80680000 as number,
  BadNoDeleteRights = 0x80690000 as number,
  UncertainReferenceNotDeleted = 0x40bc0000 as number,
  BadServerIndexInvalid = 0x806a0000 as number,
  BadViewIdUnknown = 0x806b0000 as number,
  BadViewTimestampInvalid = 0x80c90000 as number,
  BadViewParameterMismatch = 0x80ca0000 as number,
  BadViewVersionInvalid = 0x80cb0000 as number,
  UncertainNotAllNodesAvailable = 0x40c00000 as number,
  GoodResultsMayBeIncomplete = 0x00ba0000 as number,
  BadNotTypeDefinition = 0x80c80000 as number,
  UncertainReferenceOutOfServer = 0x406c0000 as number,
  BadTooManyMatches = 0x806d0000 as number,
  BadQueryTooComplex = 0x806e0000 as number,
  BadNoMatch = 0x806f0000 as number,
  BadMaxAgeInvalid = 0x80700000 as number,
  BadSecurityModeInsufficient = 0x80e60000 as number,
  BadHistoryOperationInvalid = 0x80710000 as number,
  BadHistoryOperationUnsupported = 0x80720000 as number,
  BadInvalidTimestampArgument = 0x80bd0000 as number,
  BadWriteNotSupported = 0x80730000 as number,
  BadTypeMismatch = 0x80740000 as number,
  BadMethodInvalid = 0x80750000 as number,
  BadArgumentsMissing = 0x80760000 as number,
  BadNotExecutable = 0x81110000 as number,
  BadTooManySubscriptions = 0x80770000 as number,
  BadTooManyPublishRequests = 0x80780000 as number,
  BadNoSubscription = 0x80790000 as number,
  BadSequenceNumberUnknown = 0x807a0000 as number,
  BadMessageNotAvailable = 0x807b0000 as number,
  BadInsufficientClientProfile = 0x807c0000 as number,
  BadStateNotActive = 0x80bf0000 as number,
  BadAlreadyExists = 0x81150000 as number,
  BadTcpServerTooBusy = 0x807d0000 as number,
  BadTcpMessageTypeInvalid = 0x807e0000 as number,
  BadTcpSecureChannelUnknown = 0x807f0000 as number,
  BadTcpMessageTooLarge = 0x80800000 as number,
  BadTcpNotEnoughResources = 0x80810000 as number,
  BadTcpInternalError = 0x80820000 as number,
  BadTcpEndpointUrlInvalid = 0x80830000 as number,
  BadRequestInterrupted = 0x80840000 as number,
  BadRequestTimeout = 0x80850000 as number,
  BadSecureChannelClosed = 0x80860000 as number,
  BadSecureChannelTokenUnknown = 0x80870000 as number,
  BadSequenceNumberInvalid = 0x80880000 as number,
  BadProtocolVersionUnsupported = 0x80be0000 as number,
  BadConfigurationError = 0x80890000 as number,
  BadNotConnected = 0x808a0000 as number,
  BadDeviceFailure = 0x808b0000 as number,
  BadSensorFailure = 0x808c0000 as number,
  BadOutOfService = 0x808d0000 as number,
  BadDeadbandFilterInvalid = 0x808e0000 as number,
  UncertainNoCommunicationLastUsableValue = 0x408f0000 as number,
  UncertainLastUsableValue = 0x40900000 as number,
  UncertainSubstituteValue = 0x40910000 as number,
  UncertainInitialValue = 0x40920000 as number,
  UncertainSensorNotAccurate = 0x40930000 as number,
  UncertainEngineeringUnitsExceeded = 0x40940000 as number,
  UncertainSubNormal = 0x40950000 as number,
  GoodLocalOverride = 0x00960000 as number,
  BadRefreshInProgress = 0x80970000 as number,
  BadConditionAlreadyDisabled = 0x80980000 as number,
  BadConditionAlreadyEnabled = 0x80cc0000 as number,
  BadConditionDisabled = 0x80990000 as number,
  BadEventIdUnknown = 0x809a0000 as number,
  BadEventNotAcknowledgeable = 0x80bb0000 as number,
  BadDialogNotActive = 0x80cd0000 as number,
  BadDialogResponseInvalid = 0x80ce0000 as number,
  BadConditionBranchAlreadyAcked = 0x80cf0000 as number,
  BadConditionBranchAlreadyConfirmed = 0x80d00000 as number,
  BadConditionAlreadyShelved = 0x80d10000 as number,
  BadConditionNotShelved = 0x80d20000 as number,
  BadShelvingTimeOutOfRange = 0x80d30000 as number,
  BadNoData = 0x809b0000 as number,
  BadBoundNotFound = 0x80d70000 as number,
  BadBoundNotSupported = 0x80d80000 as number,
  BadDataLost = 0x809d0000 as number,
  BadDataUnavailable = 0x809e0000 as number,
  BadEntryExists = 0x809f0000 as number,
  BadNoEntryExists = 0x80a00000 as number,
  BadTimestampNotSupported = 0x80a10000 as number,
  GoodEntryInserted = 0x00a20000 as number,
  GoodEntryReplaced = 0x00a30000 as number,
  UncertainDataSubNormal = 0x40a40000 as number,
  GoodNoData = 0x00a50000 as number,
  GoodMoreData = 0x00a60000 as number,
  BadAggregateListMismatch = 0x80d40000 as number,
  BadAggregateNotSupported = 0x80d50000 as number,
  BadAggregateInvalidInputs = 0x80d60000 as number,
  BadAggregateConfigurationRejected = 0x80da0000 as number,
  GoodDataIgnored = 0x00d90000 as number,
  BadRequestNotAllowed = 0x80e40000 as number,
  BadRequestNotComplete = 0x81130000 as number,
  GoodEdited = 0x00dc0000 as number,
  GoodPostActionFailed = 0x00dd0000 as number,
  UncertainDominantValueChanged = 0x40de0000 as number,
  GoodDependentValueChanged = 0x00e00000 as number,
  BadDominantValueChanged = 0x80e10000 as number,
  UncertainDependentValueChanged = 0x40e20000 as number,
  BadDependentValueChanged = 0x80e30000 as number,
  GoodEditedDependentValueChanged = 0x01160000 as number,
  GoodEditedDominantValueChanged = 0x01170000 as number,
  GoodEditedDominantValueChangedDependentValueChanged = 0x01180000 as number,
  BadEditedOutOfRange = 0x81190000 as number,
  BadInitialValueOutOfRange = 0x811a0000 as number,
  BadOutOfRangeDominantValueChanged = 0x811b0000 as number,
  BadEditedOutOfRangeDominantValueChanged = 0x811c0000 as number,
  BadOutOfRangeDominantValueChangedDependentValueChanged = 0x811d0000 as number,
  BadEditedOutOfRangeDominantValueChangedDependentValueChanged = 0x811e0000 as number,
  GoodCommunicationEvent = 0x00a70000 as number,
  GoodShutdownEvent = 0x00a80000 as number,
  GoodCallAgain = 0x00a90000 as number,
  GoodNonCriticalTimeout = 0x00aa0000 as number,
  BadInvalidArgument = 0x80ab0000 as number,
  BadConnectionRejected = 0x80ac0000 as number,
  BadDisconnect = 0x80ad0000 as number,
  BadConnectionClosed = 0x80ae0000 as number,
  BadInvalidState = 0x80af0000 as number,
  BadEndOfStream = 0x80b00000 as number,
  BadNoDataAvailable = 0x80b10000 as number,
  BadWaitingForResponse = 0x80b20000 as number,
  BadOperationAbandoned = 0x80b30000 as number,
  BadExpectedStreamToBlock = 0x80b40000 as number,
  BadWouldBlock = 0x80b50000 as number,
  BadSyntaxError = 0x80b60000 as number,
  BadMaxConnectionsReached = 0x80b70000 as number,
}

/**
 * Converts an OPC UA status code to a human-readable string.
 *
 * OPC UA status codes have two independent parts (OPC UA Part 4, §7.38 / Part 6, §5.1.1):
 *
 *   Bits 31:30  Severity   00=Good, 01=Uncertain, 10/11=Bad
 *   Bits 27:16  SubCode    Named code (e.g. 0x34 = NodeIdUnknown)
 *   Bit  15     StructureChanged – data type structure of the variable changed
 *   Bit  14     SemanticsChanged – engineering unit or range of the variable changed
 *   Bits 13:12  InfoType   00=not used, 01=DataValue info bits active
 *   Bit  11     Overflow   – (DataValue) notifications dropped from queue
 *   Bits 10:9   LimitBits  – (DataValue) 00=None, 01=Low, 10=High, 11=Constant
 *
 * All named codes (BadNodeIdUnknown, Good, …) have their lower 16 bits = 0.
 * The lower 16 bits are flag bits and are decoded separately via {@link StatusCodeGetFlagBits}.
 *
 * @see OPC UA Part 4, Section 7.38
 * @see OPC UA Part 6, Section 5.1.1 and Annex A
 */

/**
 * Returns the name of the StatusCode enum member for the given code.
 * Flag bits (lower 16 bits) are masked off before looking up the name.
 * Returns the hex string if the code is not in the enum.
 *
 * Examples:
 *   StatusCodeToString(0x00000000) → "Good"
 *   StatusCodeToString(0x80340000) → "BadNodeIdUnknown"
 *   StatusCodeToString(0x00000400) → "Good"  (flags ignored for name lookup)
 *   StatusCodeToString(undefined)  → "Unknown"
 *
 * @see OPC UA Part 4, Section 7.38
 */
export function StatusCodeToString(statusCode?: number): string {
  if (statusCode === undefined) {
    return 'Unknown';
  }

  const baseCode = statusCode & 0xFFFF0000;
  const name = (Object.entries(StatusCode) as [string, number][])
    .find(([, v]) => v === baseCode)?.[0];
  return name ?? `0x${baseCode.toString(16).toUpperCase().padStart(8, '0')}`;
}

/**
 * Returns the full status code value (including flag bits) as an uppercase hex string.
 *
 * Examples:
 *   StatusCodeToStringNumber(0x00000000) → "0x00000000"
 *   StatusCodeToStringNumber(0x80340000) → "0x80340000"
 *   StatusCodeToStringNumber(0x00000400) → "0x00000400"
 */
export function StatusCodeToStringNumber(statusCode?: number): string {
  if (statusCode === undefined) {
    return '0xUNKNOWN';
  }

  return `0x${statusCode.toString(16).toUpperCase().padStart(8, '0')}`;
}

/** Flag bits decoded from the lower 16 bits of an OPC UA StatusCode value. */
export interface StatusCodeFlagBits {
  /** Bit 15 – the data type structure of the variable has changed. */
  StructureChanged: boolean;
  /** Bit 14 – engineering unit or range of the variable has changed. */
  SemanticsChanged: boolean;
  /** Bit 11 – notifications were dropped from the queue (DataValue). */
  Overflow: boolean;
  /** Bits 10:9 = 01 – value is pegged at the low engineering limit. */
  LimitLow: boolean;
  /** Bits 10:9 = 10 – value is pegged at the high engineering limit. */
  LimitHigh: boolean;
  /** Bits 10:9 = 11 – value is a constant and cannot change. */
  LimitConstant: boolean;
}

/**
 * Decodes the flag bits (lower 16 bits) of a StatusCode value.
 *
 * Examples:
 *   StatusCodeGetFlagBits(0x00000000) → { StructureChanged: false, SemanticsChanged: false, … }
 *   StatusCodeGetFlagBits(0x00000400) → { …, LimitHigh: true, … }
 *   StatusCodeGetFlagBits(0x00008C00) → { StructureChanged: true, Overflow: true, LimitHigh: true, … }
 *
 * @see OPC UA Part 6, Section 5.1.1, Table 49
 */
export function StatusCodeGetFlagBits(statusCode?: number): StatusCodeFlagBits {
  const flagBits = (statusCode ?? 0) & 0x0000FFFF;
  const limitBits = (flagBits >> 9) & 0x3;

  return {
    StructureChanged: (flagBits & 0x8000) !== 0,
    SemanticsChanged: (flagBits & 0x4000) !== 0,
    Overflow: (flagBits & 0x0800) !== 0,
    LimitLow: limitBits === 1,
    LimitHigh: limitBits === 2,
    LimitConstant: limitBits === 3,
  };
}