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

import type { IOpcType } from '../types/iOpcType.js';
import type { DataValue } from '../types/dataValue.js';
import type { DiagnosticInfo } from '../types/diagnosticInfo.js';
import type { ExpandedNodeId } from '../types/expandedNodeId.js';
import type { ExtensionObject } from '../types/extensionObject.js';
import type { LocalizedText } from '../types/localizedText.js';
import type { NodeId } from '../types/nodeId.js';
import type { QualifiedName } from '../types/qualifiedName.js';
import type { StatusCode } from '../types/statusCode.js';
import type { UaByteString, UaString } from '../types/primitives.js';
import type { Variant } from '../types/variant.js';
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

// Base class for all OPC UA structures
export abstract class Structure implements IOpcType {
  abstract getTypeId(): number;
  abstract getBinaryEncodingId(): number;
  abstract getXmlEncodingId(): number;
  abstract getJsonEncodingId(): number;
}

/**
 * Union
 * NodeId: i=12756
 * Extends: Structure
 */
export class Union extends Structure implements IOpcType {

  getTypeId(): number { return 12756; }
  getBinaryEncodingId(): number { return 12766; }
  getXmlEncodingId(): number { return 12758; }
  getJsonEncodingId(): number { return 15085; }
}

/**
 * KeyValuePair
 * NodeId: i=14533
 * Extends: Structure
 */
export class KeyValuePair extends Structure implements IOpcType {

  public key!: QualifiedName;
  public value!: Variant;

  getTypeId(): number { return 14533; }
  getBinaryEncodingId(): number { return 14846; }
  getXmlEncodingId(): number { return 14802; }
  getJsonEncodingId(): number { return 15041; }
}

/**
 * AdditionalParametersType
 * NodeId: i=16313
 * Extends: Structure
 */
export class AdditionalParametersType extends Structure implements IOpcType {

  public parameters!: KeyValuePair[];

  getTypeId(): number { return 16313; }
  getBinaryEncodingId(): number { return 17537; }
  getXmlEncodingId(): number { return 17541; }
  getJsonEncodingId(): number { return 17547; }
}

/**
 * EphemeralKeyType
 * NodeId: i=17548
 * Extends: Structure
 */
export class EphemeralKeyType extends Structure implements IOpcType {

  public publicKey!: UaByteString;
  public signature!: UaByteString;

  getTypeId(): number { return 17548; }
  getBinaryEncodingId(): number { return 17549; }
  getXmlEncodingId(): number { return 17553; }
  getJsonEncodingId(): number { return 17557; }
}

/**
 * EndpointType
 * NodeId: i=15528
 * Extends: Structure
 */
export class EndpointType extends Structure implements IOpcType {

  public endpointUrl!: UaString;
  public securityMode!: MessageSecurityModeEnum;
  public securityPolicyUri!: UaString;
  public transportProfileUri!: UaString;

  getTypeId(): number { return 15528; }
  getBinaryEncodingId(): number { return 15671; }
  getXmlEncodingId(): number { return 15949; }
  getJsonEncodingId(): number { return 16150; }
}

/**
 * BitFieldDefinition
 * NodeId: i=32421
 * Extends: Structure
 */
export class BitFieldDefinition extends Structure implements IOpcType {

  public name!: UaString;
  public description!: LocalizedText;
  public reserved!: boolean;
  public startingBitPosition!: number;
  public endingBitPosition!: number;

  getTypeId(): number { return 32421; }
  getBinaryEncodingId(): number { return 32422; }
  getXmlEncodingId(): number { return 32426; }
  getJsonEncodingId(): number { return 32430; }
}

/**
 * RationalNumber
 * NodeId: i=18806
 * Extends: Structure
 */
export class RationalNumber extends Structure implements IOpcType {

  public numerator!: number;
  public denominator!: number;

  getTypeId(): number { return 18806; }
  getBinaryEncodingId(): number { return 18815; }
  getXmlEncodingId(): number { return 18851; }
  getJsonEncodingId(): number { return 19064; }
}

/**
 * Vector
 * NodeId: i=18807
 * Extends: Structure
 */
export class Vector extends Structure implements IOpcType {

  getTypeId(): number { return 18807; }
  getBinaryEncodingId(): number { return 18816; }
  getXmlEncodingId(): number { return 18852; }
  getJsonEncodingId(): number { return 19065; }
}

/**
 * 3DVector
 * NodeId: i=18808
 * Extends: Vector
 */
export class _3DVector extends Vector implements IOpcType {

  public x!: number;
  public y!: number;
  public z!: number;

  getTypeId(): number { return 0; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * CartesianCoordinates
 * NodeId: i=18809
 * Extends: Structure
 */
export class CartesianCoordinates extends Structure implements IOpcType {

  getTypeId(): number { return 18809; }
  getBinaryEncodingId(): number { return 18818; }
  getXmlEncodingId(): number { return 18854; }
  getJsonEncodingId(): number { return 19067; }
}

/**
 * 3DCartesianCoordinates
 * NodeId: i=18810
 * Extends: CartesianCoordinates
 */
export class _3DCartesianCoordinates extends CartesianCoordinates implements IOpcType {

  public x!: number;
  public y!: number;
  public z!: number;

  getTypeId(): number { return 0; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * Orientation
 * NodeId: i=18811
 * Extends: Structure
 */
export class Orientation extends Structure implements IOpcType {

  getTypeId(): number { return 18811; }
  getBinaryEncodingId(): number { return 18820; }
  getXmlEncodingId(): number { return 18856; }
  getJsonEncodingId(): number { return 19069; }
}

/**
 * 3DOrientation
 * NodeId: i=18812
 * Extends: Orientation
 */
export class _3DOrientation extends Orientation implements IOpcType {

  public a!: number;
  public b!: number;
  public c!: number;

  getTypeId(): number { return 0; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * Frame
 * NodeId: i=18813
 * Extends: Structure
 */
export class Frame extends Structure implements IOpcType {

  getTypeId(): number { return 18813; }
  getBinaryEncodingId(): number { return 18822; }
  getXmlEncodingId(): number { return 18858; }
  getJsonEncodingId(): number { return 19071; }
}

/**
 * 3DFrame
 * NodeId: i=18814
 * Extends: Frame
 */
export class _3DFrame extends Frame implements IOpcType {

  public cartesianCoordinates!: _3DCartesianCoordinates;
  public orientation!: _3DOrientation;

  getTypeId(): number { return 0; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * IdentityMappingRuleType
 * NodeId: i=15634
 * Extends: Structure
 */
export class IdentityMappingRuleType extends Structure implements IOpcType {

  public criteriaType!: IdentityCriteriaTypeEnum;
  public criteria!: UaString;

  getTypeId(): number { return 15634; }
  getBinaryEncodingId(): number { return 15736; }
  getXmlEncodingId(): number { return 15728; }
  getJsonEncodingId(): number { return 15042; }
}

/**
 * CurrencyUnitType
 * NodeId: i=23498
 * Extends: Structure
 */
export class CurrencyUnitType extends Structure implements IOpcType {

  public numericCode!: number;
  public exponent!: number;
  public alphabeticCode!: UaString;
  public currency!: LocalizedText;

  getTypeId(): number { return 23498; }
  getBinaryEncodingId(): number { return 23507; }
  getXmlEncodingId(): number { return 23520; }
  getJsonEncodingId(): number { return 23528; }
}

/**
 * AnnotationDataType
 * NodeId: i=32434
 * Extends: Structure
 */
export class AnnotationDataType extends Structure implements IOpcType {

  public annotation!: UaString;
  public discipline!: UaString;
  public uri!: UaString;

  getTypeId(): number { return 32434; }
  getBinaryEncodingId(): number { return 32560; }
  getXmlEncodingId(): number { return 32572; }
  getJsonEncodingId(): number { return 32584; }
}

/**
 * LinearConversionDataType
 * NodeId: i=32435
 * Extends: Structure
 */
export class LinearConversionDataType extends Structure implements IOpcType {

  public initialAddend!: number;
  public multiplicand!: number;
  public divisor!: number;
  public finalAddend!: number;

  getTypeId(): number { return 32435; }
  getBinaryEncodingId(): number { return 32561; }
  getXmlEncodingId(): number { return 32573; }
  getJsonEncodingId(): number { return 32585; }
}

/**
 * QuantityDimension
 * NodeId: i=32438
 * Extends: Structure
 */
export class QuantityDimension extends Structure implements IOpcType {

  public massExponent!: number;
  public lengthExponent!: number;
  public timeExponent!: number;
  public electricCurrentExponent!: number;
  public amountOfSubstanceExponent!: number;
  public luminousIntensityExponent!: number;
  public absoluteTemperatureExponent!: number;
  public dimensionlessExponent!: number;

  getTypeId(): number { return 32438; }
  getBinaryEncodingId(): number { return 32562; }
  getXmlEncodingId(): number { return 32574; }
  getJsonEncodingId(): number { return 32586; }
}

/**
 * TrustListDataType
 * NodeId: i=12554
 * Extends: Structure
 */
export class TrustListDataType extends Structure implements IOpcType {

  public specifiedLists!: number;
  public trustedCertificates!: UaByteString[];
  public trustedCrls!: UaByteString[];
  public issuerCertificates!: UaByteString[];
  public issuerCrls!: UaByteString[];

  getTypeId(): number { return 12554; }
  getBinaryEncodingId(): number { return 12680; }
  getXmlEncodingId(): number { return 12676; }
  getJsonEncodingId(): number { return 15044; }
}

/**
 * BaseConfigurationDataType
 * NodeId: i=15434
 * Extends: Structure
 */
export class BaseConfigurationDataType extends Structure implements IOpcType {

  public configurationVersion!: number;
  public configurationProperties!: KeyValuePair[];

  getTypeId(): number { return 15434; }
  getBinaryEncodingId(): number { return 16538; }
  getXmlEncodingId(): number { return 16587; }
  getJsonEncodingId(): number { return 16632; }
}

/**
 * BaseConfigurationRecordDataType
 * NodeId: i=15435
 * Extends: Structure
 */
export class BaseConfigurationRecordDataType extends Structure implements IOpcType {

  public name!: UaString;
  public recordProperties!: KeyValuePair[];

  getTypeId(): number { return 15435; }
  getBinaryEncodingId(): number { return 16539; }
  getXmlEncodingId(): number { return 16588; }
  getJsonEncodingId(): number { return 16633; }
}

/**
 * CertificateGroupDataType
 * NodeId: i=15436
 * Extends: BaseConfigurationRecordDataType
 */
export class CertificateGroupDataType extends BaseConfigurationRecordDataType implements IOpcType {

  public purpose!: NodeId;
  public certificateTypes!: NodeId[];
  public isCertificateAssigned!: boolean[];
  public validationOptions!: number;

  getTypeId(): number { return 15436; }
  getBinaryEncodingId(): number { return 16540; }
  getXmlEncodingId(): number { return 16589; }
  getJsonEncodingId(): number { return 16634; }
}

/**
 * ConfigurationUpdateTargetType
 * NodeId: i=15538
 * Extends: Structure
 */
export class ConfigurationUpdateTargetType extends Structure implements IOpcType {

  public path!: UaString;
  public updateType!: ConfigurationUpdateTypeEnum;

  getTypeId(): number { return 15538; }
  getBinaryEncodingId(): number { return 16541; }
  getXmlEncodingId(): number { return 16590; }
  getJsonEncodingId(): number { return 16635; }
}

/**
 * TransactionErrorType
 * NodeId: i=32285
 * Extends: Structure
 */
export class TransactionErrorType extends Structure implements IOpcType {

  public targetId!: NodeId;
  public error!: StatusCode;
  public message!: LocalizedText;

  getTypeId(): number { return 32285; }
  getBinaryEncodingId(): number { return 32382; }
  getXmlEncodingId(): number { return 32386; }
  getJsonEncodingId(): number { return 32390; }
}

/**
 * ApplicationConfigurationDataType
 * NodeId: i=23743
 * Extends: BaseConfigurationDataType
 */
export class ApplicationConfigurationDataType extends BaseConfigurationDataType implements IOpcType {

  public applicationIdentity!: ApplicationIdentityDataType;
  public certificateGroups!: CertificateGroupDataType[];
  public serverEndpoints!: ServerEndpointDataType[];
  public clientEndpoints!: EndpointDataType[];
  public securitySettings!: SecuritySettingsDataType[];
  public userTokenSettings!: UserTokenSettingsDataType[];
  public authorizationServices!: AuthorizationServiceConfigurationDataType[];

  getTypeId(): number { return 23743; }
  getBinaryEncodingId(): number { return 23754; }
  getXmlEncodingId(): number { return 23762; }
  getJsonEncodingId(): number { return 23776; }
}

/**
 * ApplicationIdentityDataType
 * NodeId: i=15556
 * Extends: BaseConfigurationRecordDataType
 */
export class ApplicationIdentityDataType extends BaseConfigurationRecordDataType implements IOpcType {

  public applicationUri!: UaString;
  public applicationNames!: LocalizedText[];
  public additionalServers!: ApplicationDescription[];

  getTypeId(): number { return 15556; }
  getBinaryEncodingId(): number { return 16543; }
  getXmlEncodingId(): number { return 16592; }
  getJsonEncodingId(): number { return 16637; }
}

/**
 * EndpointDataType
 * NodeId: i=15557
 * Extends: BaseConfigurationRecordDataType
 */
export class EndpointDataType extends BaseConfigurationRecordDataType implements IOpcType {

  public discoveryUrls!: UaString[];
  public networkName!: UaString;
  public port!: number;

  getTypeId(): number { return 15557; }
  getBinaryEncodingId(): number { return 16544; }
  getXmlEncodingId(): number { return 16593; }
  getJsonEncodingId(): number { return 16642; }
}

/**
 * ServerEndpointDataType
 * NodeId: i=15558
 * Extends: EndpointDataType
 */
export class ServerEndpointDataType extends EndpointDataType implements IOpcType {

  public endpointUrls!: UaString[];
  public securitySettingNames!: UaString[];
  public transportProfileUri!: UaString;
  public userTokenSettingNames!: UaString[];
  public reverseConnectUrls!: UaString[];

  getTypeId(): number { return 15558; }
  getBinaryEncodingId(): number { return 16545; }
  getXmlEncodingId(): number { return 16594; }
  getJsonEncodingId(): number { return 16643; }
}

/**
 * SecuritySettingsDataType
 * NodeId: i=15559
 * Extends: BaseConfigurationRecordDataType
 */
export class SecuritySettingsDataType extends BaseConfigurationRecordDataType implements IOpcType {

  public securityModes!: MessageSecurityModeEnum[];
  public securityPolicyUris!: UaString[];
  public certificateGroupName!: UaString;

  getTypeId(): number { return 15559; }
  getBinaryEncodingId(): number { return 16546; }
  getXmlEncodingId(): number { return 16595; }
  getJsonEncodingId(): number { return 16644; }
}

/**
 * UserTokenSettingsDataType
 * NodeId: i=15560
 * Extends: BaseConfigurationRecordDataType
 */
export class UserTokenSettingsDataType extends BaseConfigurationRecordDataType implements IOpcType {

  public tokenType!: UserTokenTypeEnum;
  public issuedTokenType!: UaString;
  public issuerEndpointUrl!: UaString;
  public securityPolicyUri!: UaString;
  public certificateGroupName!: UaString;
  public authorizationServiceName!: UaString;

  getTypeId(): number { return 15560; }
  getBinaryEncodingId(): number { return 16547; }
  getXmlEncodingId(): number { return 16596; }
  getJsonEncodingId(): number { return 16645; }
}

/**
 * ServiceCertificateDataType
 * NodeId: i=23724
 * Extends: Structure
 */
export class ServiceCertificateDataType extends Structure implements IOpcType {

  public certificate!: UaByteString;
  public issuers!: UaByteString[];
  public validFrom!: Date;
  public validTo!: Date;

  getTypeId(): number { return 23724; }
  getBinaryEncodingId(): number { return 23725; }
  getXmlEncodingId(): number { return 23735; }
  getJsonEncodingId(): number { return 23739; }
}

/**
 * AuthorizationServiceConfigurationDataType
 * NodeId: i=23744
 * Extends: BaseConfigurationRecordDataType
 */
export class AuthorizationServiceConfigurationDataType extends BaseConfigurationRecordDataType implements IOpcType {

  public serviceUri!: UaString;
  public serviceCertificates!: ServiceCertificateDataType[];
  public issuerEndpointSettings!: UaString;

  getTypeId(): number { return 23744; }
  getBinaryEncodingId(): number { return 23755; }
  getXmlEncodingId(): number { return 23763; }
  getJsonEncodingId(): number { return 23777; }
}

/**
 * DecimalDataType
 * NodeId: i=17861
 * Extends: Structure
 */
export class DecimalDataType extends Structure implements IOpcType {

  public scale!: number;
  public value!: UaByteString;

  getTypeId(): number { return 17861; }
  getBinaryEncodingId(): number { return 17863; }
  getXmlEncodingId(): number { return 17862; }
  getJsonEncodingId(): number { return 15045; }
}

/**
 * DataTypeSchemaHeader
 * NodeId: i=15534
 * Extends: Structure
 */
export class DataTypeSchemaHeader extends Structure implements IOpcType {

  public namespaces!: UaString[];
  public structureDataTypes!: StructureDescription[];
  public enumDataTypes!: EnumDescription[];
  public simpleDataTypes!: SimpleTypeDescription[];

  getTypeId(): number { return 15534; }
  getBinaryEncodingId(): number { return 15676; }
  getXmlEncodingId(): number { return 15950; }
  getJsonEncodingId(): number { return 16151; }
}

/**
 * DataTypeDescription
 * NodeId: i=14525
 * Extends: Structure
 */
export class DataTypeDescription extends Structure implements IOpcType {

  public dataTypeId!: NodeId;
  public name!: QualifiedName;

  getTypeId(): number { return 14525; }
  getBinaryEncodingId(): number { return 125; }
  getXmlEncodingId(): number { return 14796; }
  getJsonEncodingId(): number { return 15057; }
}

/**
 * StructureDescription
 * NodeId: i=15487
 * Extends: DataTypeDescription
 */
export class StructureDescription extends DataTypeDescription implements IOpcType {

  public structureDefinition!: StructureDefinition;

  getTypeId(): number { return 15487; }
  getBinaryEncodingId(): number { return 126; }
  getXmlEncodingId(): number { return 15589; }
  getJsonEncodingId(): number { return 15058; }
}

/**
 * EnumDescription
 * NodeId: i=15488
 * Extends: DataTypeDescription
 */
export class EnumDescription extends DataTypeDescription implements IOpcType {

  public enumDefinition!: EnumDefinition;
  public builtInType!: number;

  getTypeId(): number { return 15488; }
  getBinaryEncodingId(): number { return 127; }
  getXmlEncodingId(): number { return 15590; }
  getJsonEncodingId(): number { return 15059; }
}

/**
 * SimpleTypeDescription
 * NodeId: i=15005
 * Extends: DataTypeDescription
 */
export class SimpleTypeDescription extends DataTypeDescription implements IOpcType {

  public baseDataType!: NodeId;
  public builtInType!: number;

  getTypeId(): number { return 15005; }
  getBinaryEncodingId(): number { return 15421; }
  getXmlEncodingId(): number { return 15529; }
  getJsonEncodingId(): number { return 15700; }
}

/**
 * UABinaryFileDataType
 * NodeId: i=15006
 * Extends: DataTypeSchemaHeader
 */
export class UABinaryFileDataType extends DataTypeSchemaHeader implements IOpcType {

  public schemaLocation!: UaString;
  public fileHeader!: KeyValuePair[];
  public body!: Variant;

  getTypeId(): number { return 15006; }
  getBinaryEncodingId(): number { return 15422; }
  getXmlEncodingId(): number { return 15531; }
  getJsonEncodingId(): number { return 15714; }
}

/**
 * PortableQualifiedName
 * NodeId: i=24105
 * Extends: Structure
 */
export class PortableQualifiedName extends Structure implements IOpcType {

  public namespaceUri!: UaString;
  public name!: UaString;

  getTypeId(): number { return 24105; }
  getBinaryEncodingId(): number { return 24108; }
  getXmlEncodingId(): number { return 24120; }
  getJsonEncodingId(): number { return 24132; }
}

/**
 * PortableNodeId
 * NodeId: i=24106
 * Extends: Structure
 */
export class PortableNodeId extends Structure implements IOpcType {

  public namespaceUri!: UaString;
  public identifier!: NodeId;

  getTypeId(): number { return 24106; }
  getBinaryEncodingId(): number { return 24109; }
  getXmlEncodingId(): number { return 24121; }
  getJsonEncodingId(): number { return 24133; }
}

/**
 * UnsignedRationalNumber
 * NodeId: i=24107
 * Extends: Structure
 */
export class UnsignedRationalNumber extends Structure implements IOpcType {

  public numerator!: number;
  public denominator!: number;

  getTypeId(): number { return 24107; }
  getBinaryEncodingId(): number { return 24110; }
  getXmlEncodingId(): number { return 24122; }
  getJsonEncodingId(): number { return 24134; }
}

/**
 * DataSetMetaDataType
 * NodeId: i=14523
 * Extends: DataTypeSchemaHeader
 */
export class DataSetMetaDataType extends DataTypeSchemaHeader implements IOpcType {

  public name!: UaString;
  public description!: LocalizedText;
  public fields!: FieldMetaData[];
  public dataSetClassId!: string;
  public configurationVersion!: ConfigurationVersionDataType;

  getTypeId(): number { return 14523; }
  getBinaryEncodingId(): number { return 124; }
  getXmlEncodingId(): number { return 14794; }
  getJsonEncodingId(): number { return 15050; }
}

/**
 * FieldMetaData
 * NodeId: i=14524
 * Extends: Structure
 */
export class FieldMetaData extends Structure implements IOpcType {

  public name!: UaString;
  public description!: LocalizedText;
  public fieldFlags!: number;
  public builtInType!: number;
  public dataType!: NodeId;
  public valueRank!: number;
  public arrayDimensions!: number[];
  public maxStringLength!: number;
  public dataSetFieldId!: string;
  public properties!: KeyValuePair[];

  getTypeId(): number { return 14524; }
  getBinaryEncodingId(): number { return 14839; }
  getXmlEncodingId(): number { return 14795; }
  getJsonEncodingId(): number { return 15051; }
}

/**
 * ConfigurationVersionDataType
 * NodeId: i=14593
 * Extends: Structure
 */
export class ConfigurationVersionDataType extends Structure implements IOpcType {

  public majorVersion!: number;
  public minorVersion!: number;

  getTypeId(): number { return 14593; }
  getBinaryEncodingId(): number { return 14847; }
  getXmlEncodingId(): number { return 14803; }
  getJsonEncodingId(): number { return 15049; }
}

/**
 * PublishedDataSetDataType
 * NodeId: i=15578
 * Extends: Structure
 */
export class PublishedDataSetDataType extends Structure implements IOpcType {

  public name!: UaString;
  public dataSetFolder!: UaString[];
  public dataSetMetaData!: DataSetMetaDataType;
  public extensionFields!: KeyValuePair[];
  public dataSetSource!: PublishedDataSetSourceDataType;

  getTypeId(): number { return 15578; }
  getBinaryEncodingId(): number { return 15677; }
  getXmlEncodingId(): number { return 15951; }
  getJsonEncodingId(): number { return 16152; }
}

/**
 * PublishedDataSetSourceDataType
 * NodeId: i=15580
 * Extends: Structure
 */
export class PublishedDataSetSourceDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15580; }
  getBinaryEncodingId(): number { return 15678; }
  getXmlEncodingId(): number { return 15952; }
  getJsonEncodingId(): number { return 16153; }
}

/**
 * PublishedVariableDataType
 * NodeId: i=14273
 * Extends: Structure
 */
export class PublishedVariableDataType extends Structure implements IOpcType {

  public publishedVariable!: NodeId;
  public attributeId!: number;
  public samplingIntervalHint!: number;
  public deadbandType!: number;
  public deadbandValue!: number;
  public indexRange!: UaString;
  public substituteValue!: Variant;
  public metaDataProperties!: QualifiedName[];

  getTypeId(): number { return 14273; }
  getBinaryEncodingId(): number { return 14323; }
  getXmlEncodingId(): number { return 14319; }
  getJsonEncodingId(): number { return 15060; }
}

/**
 * PublishedDataItemsDataType
 * NodeId: i=15581
 * Extends: PublishedDataSetSourceDataType
 */
export class PublishedDataItemsDataType extends PublishedDataSetSourceDataType implements IOpcType {

  public publishedData!: PublishedVariableDataType[];

  getTypeId(): number { return 15581; }
  getBinaryEncodingId(): number { return 15679; }
  getXmlEncodingId(): number { return 15953; }
  getJsonEncodingId(): number { return 16154; }
}

/**
 * PublishedEventsDataType
 * NodeId: i=15582
 * Extends: PublishedDataSetSourceDataType
 */
export class PublishedEventsDataType extends PublishedDataSetSourceDataType implements IOpcType {

  public eventNotifier!: NodeId;
  public selectedFields!: SimpleAttributeOperand[];
  public filter!: ContentFilter;

  getTypeId(): number { return 15582; }
  getBinaryEncodingId(): number { return 15681; }
  getXmlEncodingId(): number { return 15954; }
  getJsonEncodingId(): number { return 16155; }
}

/**
 * PublishedDataSetCustomSourceDataType
 * NodeId: i=25269
 * Extends: PublishedDataSetSourceDataType
 */
export class PublishedDataSetCustomSourceDataType extends PublishedDataSetSourceDataType implements IOpcType {

  public cyclicDataSet!: boolean;

  getTypeId(): number { return 25269; }
  getBinaryEncodingId(): number { return 25529; }
  getXmlEncodingId(): number { return 25545; }
  getJsonEncodingId(): number { return 25561; }
}

/**
 * ActionTargetDataType
 * NodeId: i=18593
 * Extends: Structure
 */
export class ActionTargetDataType extends Structure implements IOpcType {

  public actionTargetId!: number;
  public name!: UaString;
  public description!: LocalizedText;

  getTypeId(): number { return 18593; }
  getBinaryEncodingId(): number { return 18598; }
  getXmlEncodingId(): number { return 18610; }
  getJsonEncodingId(): number { return 18622; }
}

/**
 * PublishedActionDataType
 * NodeId: i=18594
 * Extends: PublishedDataSetSourceDataType
 */
export class PublishedActionDataType extends PublishedDataSetSourceDataType implements IOpcType {

  public requestDataSetMetaData!: DataSetMetaDataType;
  public actionTargets!: ActionTargetDataType[];

  getTypeId(): number { return 18594; }
  getBinaryEncodingId(): number { return 18599; }
  getXmlEncodingId(): number { return 18611; }
  getJsonEncodingId(): number { return 18623; }
}

/**
 * ActionMethodDataType
 * NodeId: i=18597
 * Extends: Structure
 */
export class ActionMethodDataType extends Structure implements IOpcType {

  public objectId!: NodeId;
  public methodId!: NodeId;

  getTypeId(): number { return 18597; }
  getBinaryEncodingId(): number { return 18600; }
  getXmlEncodingId(): number { return 18612; }
  getJsonEncodingId(): number { return 18624; }
}

/**
 * PublishedActionMethodDataType
 * NodeId: i=18793
 * Extends: PublishedActionDataType
 */
export class PublishedActionMethodDataType extends PublishedActionDataType implements IOpcType {

  public actionMethods!: ActionMethodDataType[];

  getTypeId(): number { return 18793; }
  getBinaryEncodingId(): number { return 18795; }
  getXmlEncodingId(): number { return 18937; }
  getJsonEncodingId(): number { return 18945; }
}

/**
 * DataSetWriterDataType
 * NodeId: i=15597
 * Extends: Structure
 */
export class DataSetWriterDataType extends Structure implements IOpcType {

  public name!: UaString;
  public enabled!: boolean;
  public dataSetWriterId!: number;
  public dataSetFieldContentMask!: number;
  public keyFrameCount!: number;
  public dataSetName!: UaString;
  public dataSetWriterProperties!: KeyValuePair[];
  public transportSettings!: DataSetWriterTransportDataType;
  public messageSettings!: DataSetWriterMessageDataType;

  getTypeId(): number { return 15597; }
  getBinaryEncodingId(): number { return 15682; }
  getXmlEncodingId(): number { return 15955; }
  getJsonEncodingId(): number { return 16156; }
}

/**
 * DataSetWriterTransportDataType
 * NodeId: i=15598
 * Extends: Structure
 */
export class DataSetWriterTransportDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15598; }
  getBinaryEncodingId(): number { return 15683; }
  getXmlEncodingId(): number { return 15956; }
  getJsonEncodingId(): number { return 16157; }
}

/**
 * DataSetWriterMessageDataType
 * NodeId: i=15605
 * Extends: Structure
 */
export class DataSetWriterMessageDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15605; }
  getBinaryEncodingId(): number { return 15688; }
  getXmlEncodingId(): number { return 15987; }
  getJsonEncodingId(): number { return 16158; }
}

/**
 * PubSubGroupDataType
 * NodeId: i=15609
 * Extends: Structure
 */
export class PubSubGroupDataType extends Structure implements IOpcType {

  public name!: UaString;
  public enabled!: boolean;
  public securityMode!: MessageSecurityModeEnum;
  public securityGroupId!: UaString;
  public securityKeyServices!: EndpointDescription[];
  public maxNetworkMessageSize!: number;
  public groupProperties!: KeyValuePair[];

  getTypeId(): number { return 15609; }
  getBinaryEncodingId(): number { return 15689; }
  getXmlEncodingId(): number { return 15988; }
  getJsonEncodingId(): number { return 16159; }
}

/**
 * WriterGroupDataType
 * NodeId: i=15480
 * Extends: PubSubGroupDataType
 */
export class WriterGroupDataType extends PubSubGroupDataType implements IOpcType {

  public writerGroupId!: number;
  public publishingInterval!: number;
  public keepAliveTime!: number;
  public priority!: number;
  public localeIds!: UaString[];
  public headerLayoutUri!: UaString;
  public transportSettings!: WriterGroupTransportDataType;
  public messageSettings!: WriterGroupMessageDataType;
  public dataSetWriters!: DataSetWriterDataType[];

  getTypeId(): number { return 15480; }
  getBinaryEncodingId(): number { return 21150; }
  getXmlEncodingId(): number { return 21174; }
  getJsonEncodingId(): number { return 21198; }
}

/**
 * WriterGroupTransportDataType
 * NodeId: i=15611
 * Extends: Structure
 */
export class WriterGroupTransportDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15611; }
  getBinaryEncodingId(): number { return 15691; }
  getXmlEncodingId(): number { return 15990; }
  getJsonEncodingId(): number { return 16161; }
}

/**
 * WriterGroupMessageDataType
 * NodeId: i=15616
 * Extends: Structure
 */
export class WriterGroupMessageDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15616; }
  getBinaryEncodingId(): number { return 15693; }
  getXmlEncodingId(): number { return 15991; }
  getJsonEncodingId(): number { return 16280; }
}

/**
 * PubSubConnectionDataType
 * NodeId: i=15617
 * Extends: Structure
 */
export class PubSubConnectionDataType extends Structure implements IOpcType {

  public name!: UaString;
  public enabled!: boolean;
  public publisherId!: Variant;
  public transportProfileUri!: UaString;
  public address!: NetworkAddressDataType;
  public connectionProperties!: KeyValuePair[];
  public transportSettings!: ConnectionTransportDataType;
  public writerGroups!: WriterGroupDataType[];
  public readerGroups!: ReaderGroupDataType[];

  getTypeId(): number { return 15617; }
  getBinaryEncodingId(): number { return 15694; }
  getXmlEncodingId(): number { return 15992; }
  getJsonEncodingId(): number { return 16281; }
}

/**
 * ConnectionTransportDataType
 * NodeId: i=15618
 * Extends: Structure
 */
export class ConnectionTransportDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15618; }
  getBinaryEncodingId(): number { return 15695; }
  getXmlEncodingId(): number { return 15993; }
  getJsonEncodingId(): number { return 16282; }
}

/**
 * NetworkAddressDataType
 * NodeId: i=15502
 * Extends: Structure
 */
export class NetworkAddressDataType extends Structure implements IOpcType {

  public networkInterface!: UaString;

  getTypeId(): number { return 15502; }
  getBinaryEncodingId(): number { return 21151; }
  getXmlEncodingId(): number { return 21175; }
  getJsonEncodingId(): number { return 21199; }
}

/**
 * NetworkAddressUrlDataType
 * NodeId: i=15510
 * Extends: NetworkAddressDataType
 */
export class NetworkAddressUrlDataType extends NetworkAddressDataType implements IOpcType {

  public url!: UaString;

  getTypeId(): number { return 15510; }
  getBinaryEncodingId(): number { return 21152; }
  getXmlEncodingId(): number { return 21176; }
  getJsonEncodingId(): number { return 21200; }
}

/**
 * ReaderGroupDataType
 * NodeId: i=15520
 * Extends: PubSubGroupDataType
 */
export class ReaderGroupDataType extends PubSubGroupDataType implements IOpcType {

  public transportSettings!: ReaderGroupTransportDataType;
  public messageSettings!: ReaderGroupMessageDataType;
  public dataSetReaders!: DataSetReaderDataType[];

  getTypeId(): number { return 15520; }
  getBinaryEncodingId(): number { return 21153; }
  getXmlEncodingId(): number { return 21177; }
  getJsonEncodingId(): number { return 21201; }
}

/**
 * ReaderGroupTransportDataType
 * NodeId: i=15621
 * Extends: Structure
 */
export class ReaderGroupTransportDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15621; }
  getBinaryEncodingId(): number { return 15701; }
  getXmlEncodingId(): number { return 15995; }
  getJsonEncodingId(): number { return 16284; }
}

/**
 * ReaderGroupMessageDataType
 * NodeId: i=15622
 * Extends: Structure
 */
export class ReaderGroupMessageDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15622; }
  getBinaryEncodingId(): number { return 15702; }
  getXmlEncodingId(): number { return 15996; }
  getJsonEncodingId(): number { return 16285; }
}

/**
 * DataSetReaderDataType
 * NodeId: i=15623
 * Extends: Structure
 */
export class DataSetReaderDataType extends Structure implements IOpcType {

  public name!: UaString;
  public enabled!: boolean;
  public publisherId!: Variant;
  public writerGroupId!: number;
  public dataSetWriterId!: number;
  public dataSetMetaData!: DataSetMetaDataType;
  public dataSetFieldContentMask!: number;
  public messageReceiveTimeout!: number;
  public keyFrameCount!: number;
  public headerLayoutUri!: UaString;
  public securityMode!: MessageSecurityModeEnum;
  public securityGroupId!: UaString;
  public securityKeyServices!: EndpointDescription[];
  public dataSetReaderProperties!: KeyValuePair[];
  public transportSettings!: DataSetReaderTransportDataType;
  public messageSettings!: DataSetReaderMessageDataType;
  public subscribedDataSet!: SubscribedDataSetDataType;

  getTypeId(): number { return 15623; }
  getBinaryEncodingId(): number { return 15703; }
  getXmlEncodingId(): number { return 16007; }
  getJsonEncodingId(): number { return 16286; }
}

/**
 * DataSetReaderTransportDataType
 * NodeId: i=15628
 * Extends: Structure
 */
export class DataSetReaderTransportDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15628; }
  getBinaryEncodingId(): number { return 15705; }
  getXmlEncodingId(): number { return 16008; }
  getJsonEncodingId(): number { return 16287; }
}

/**
 * DataSetReaderMessageDataType
 * NodeId: i=15629
 * Extends: Structure
 */
export class DataSetReaderMessageDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15629; }
  getBinaryEncodingId(): number { return 15706; }
  getXmlEncodingId(): number { return 16009; }
  getJsonEncodingId(): number { return 16288; }
}

/**
 * SubscribedDataSetDataType
 * NodeId: i=15630
 * Extends: Structure
 */
export class SubscribedDataSetDataType extends Structure implements IOpcType {

  getTypeId(): number { return 15630; }
  getBinaryEncodingId(): number { return 15707; }
  getXmlEncodingId(): number { return 16010; }
  getJsonEncodingId(): number { return 16308; }
}

/**
 * TargetVariablesDataType
 * NodeId: i=15631
 * Extends: SubscribedDataSetDataType
 */
export class TargetVariablesDataType extends SubscribedDataSetDataType implements IOpcType {

  public targetVariables!: FieldTargetDataType[];

  getTypeId(): number { return 15631; }
  getBinaryEncodingId(): number { return 15712; }
  getXmlEncodingId(): number { return 16011; }
  getJsonEncodingId(): number { return 16310; }
}

/**
 * FieldTargetDataType
 * NodeId: i=14744
 * Extends: Structure
 */
export class FieldTargetDataType extends Structure implements IOpcType {

  public dataSetFieldId!: string;
  public receiverIndexRange!: UaString;
  public targetNodeId!: NodeId;
  public attributeId!: number;
  public writeIndexRange!: UaString;
  public overrideValueHandling!: OverrideValueHandlingEnum;
  public overrideValue!: Variant;

  getTypeId(): number { return 14744; }
  getBinaryEncodingId(): number { return 14848; }
  getXmlEncodingId(): number { return 14804; }
  getJsonEncodingId(): number { return 15061; }
}

/**
 * SubscribedDataSetMirrorDataType
 * NodeId: i=15635
 * Extends: SubscribedDataSetDataType
 */
export class SubscribedDataSetMirrorDataType extends SubscribedDataSetDataType implements IOpcType {

  public parentNodeName!: UaString;
  public rolePermissions!: RolePermissionType[];

  getTypeId(): number { return 15635; }
  getBinaryEncodingId(): number { return 15713; }
  getXmlEncodingId(): number { return 16012; }
  getJsonEncodingId(): number { return 16311; }
}

/**
 * PubSubConfigurationDataType
 * NodeId: i=15530
 * Extends: Structure
 */
export class PubSubConfigurationDataType extends Structure implements IOpcType {

  public publishedDataSets!: PublishedDataSetDataType[];
  public connections!: PubSubConnectionDataType[];
  public enabled!: boolean;

  getTypeId(): number { return 15530; }
  getBinaryEncodingId(): number { return 21154; }
  getXmlEncodingId(): number { return 21178; }
  getJsonEncodingId(): number { return 21202; }
}

/**
 * StandaloneSubscribedDataSetRefDataType
 * NodeId: i=23599
 * Extends: SubscribedDataSetDataType
 */
export class StandaloneSubscribedDataSetRefDataType extends SubscribedDataSetDataType implements IOpcType {

  public dataSetName!: UaString;

  getTypeId(): number { return 23599; }
  getBinaryEncodingId(): number { return 23851; }
  getXmlEncodingId(): number { return 23919; }
  getJsonEncodingId(): number { return 23987; }
}

/**
 * StandaloneSubscribedDataSetDataType
 * NodeId: i=23600
 * Extends: SubscribedDataSetDataType
 */
export class StandaloneSubscribedDataSetDataType extends SubscribedDataSetDataType implements IOpcType {

  public name!: UaString;
  public dataSetFolder!: UaString[];
  public dataSetMetaData!: DataSetMetaDataType;
  public subscribedDataSet!: SubscribedDataSetDataType;

  getTypeId(): number { return 23600; }
  getBinaryEncodingId(): number { return 23852; }
  getXmlEncodingId(): number { return 23920; }
  getJsonEncodingId(): number { return 23988; }
}

/**
 * SecurityGroupDataType
 * NodeId: i=23601
 * Extends: Structure
 */
export class SecurityGroupDataType extends Structure implements IOpcType {

  public name!: UaString;
  public securityGroupFolder!: UaString[];
  public keyLifetime!: number;
  public securityPolicyUri!: UaString;
  public maxFutureKeyCount!: number;
  public maxPastKeyCount!: number;
  public securityGroupId!: UaString;
  public rolePermissions!: RolePermissionType[];
  public groupProperties!: KeyValuePair[];

  getTypeId(): number { return 23601; }
  getBinaryEncodingId(): number { return 23853; }
  getXmlEncodingId(): number { return 23921; }
  getJsonEncodingId(): number { return 23989; }
}

/**
 * PubSubKeyPushTargetDataType
 * NodeId: i=25270
 * Extends: Structure
 */
export class PubSubKeyPushTargetDataType extends Structure implements IOpcType {

  public applicationUri!: UaString;
  public pushTargetFolder!: UaString[];
  public endpointUrl!: UaString;
  public securityPolicyUri!: UaString;
  public userTokenType!: UserTokenPolicy;
  public requestedKeyCount!: number;
  public retryInterval!: number;
  public pushTargetProperties!: KeyValuePair[];
  public securityGroups!: UaString[];

  getTypeId(): number { return 25270; }
  getBinaryEncodingId(): number { return 25530; }
  getXmlEncodingId(): number { return 25546; }
  getJsonEncodingId(): number { return 25562; }
}

/**
 * PubSubConfiguration2DataType
 * NodeId: i=23602
 * Extends: PubSubConfigurationDataType
 */
export class PubSubConfiguration2DataType extends PubSubConfigurationDataType implements IOpcType {

  public subscribedDataSets!: StandaloneSubscribedDataSetDataType[];
  public dataSetClasses!: DataSetMetaDataType[];
  public defaultSecurityKeyServices!: EndpointDescription[];
  public securityGroups!: SecurityGroupDataType[];
  public pubSubKeyPushTargets!: PubSubKeyPushTargetDataType[];
  public configurationVersion!: number;
  public configurationProperties!: KeyValuePair[];

  getTypeId(): number { return 23602; }
  getBinaryEncodingId(): number { return 23854; }
  getXmlEncodingId(): number { return 23922; }
  getJsonEncodingId(): number { return 23990; }
}

/**
 * UadpWriterGroupMessageDataType
 * NodeId: i=15645
 * Extends: WriterGroupMessageDataType
 */
export class UadpWriterGroupMessageDataType extends WriterGroupMessageDataType implements IOpcType {

  public groupVersion!: number;
  public dataSetOrdering!: DataSetOrderingTypeEnum;
  public networkMessageContentMask!: number;
  public samplingOffset!: number;
  public publishingOffset!: number[];

  getTypeId(): number { return 15645; }
  getBinaryEncodingId(): number { return 15715; }
  getXmlEncodingId(): number { return 16014; }
  getJsonEncodingId(): number { return 16323; }
}

/**
 * UadpDataSetWriterMessageDataType
 * NodeId: i=15652
 * Extends: DataSetWriterMessageDataType
 */
export class UadpDataSetWriterMessageDataType extends DataSetWriterMessageDataType implements IOpcType {

  public dataSetMessageContentMask!: number;
  public configuredSize!: number;
  public networkMessageNumber!: number;
  public dataSetOffset!: number;

  getTypeId(): number { return 15652; }
  getBinaryEncodingId(): number { return 15717; }
  getXmlEncodingId(): number { return 16015; }
  getJsonEncodingId(): number { return 16391; }
}

/**
 * UadpDataSetReaderMessageDataType
 * NodeId: i=15653
 * Extends: DataSetReaderMessageDataType
 */
export class UadpDataSetReaderMessageDataType extends DataSetReaderMessageDataType implements IOpcType {

  public groupVersion!: number;
  public networkMessageNumber!: number;
  public dataSetOffset!: number;
  public dataSetClassId!: string;
  public networkMessageContentMask!: number;
  public dataSetMessageContentMask!: number;
  public publishingInterval!: number;
  public receiveOffset!: number;
  public processingOffset!: number;

  getTypeId(): number { return 15653; }
  getBinaryEncodingId(): number { return 15718; }
  getXmlEncodingId(): number { return 16016; }
  getJsonEncodingId(): number { return 16392; }
}

/**
 * JsonWriterGroupMessageDataType
 * NodeId: i=15657
 * Extends: WriterGroupMessageDataType
 */
export class JsonWriterGroupMessageDataType extends WriterGroupMessageDataType implements IOpcType {

  public networkMessageContentMask!: number;

  getTypeId(): number { return 15657; }
  getBinaryEncodingId(): number { return 15719; }
  getXmlEncodingId(): number { return 16017; }
  getJsonEncodingId(): number { return 16393; }
}

/**
 * JsonDataSetWriterMessageDataType
 * NodeId: i=15664
 * Extends: DataSetWriterMessageDataType
 */
export class JsonDataSetWriterMessageDataType extends DataSetWriterMessageDataType implements IOpcType {

  public dataSetMessageContentMask!: number;

  getTypeId(): number { return 15664; }
  getBinaryEncodingId(): number { return 15724; }
  getXmlEncodingId(): number { return 16018; }
  getJsonEncodingId(): number { return 16394; }
}

/**
 * JsonDataSetReaderMessageDataType
 * NodeId: i=15665
 * Extends: DataSetReaderMessageDataType
 */
export class JsonDataSetReaderMessageDataType extends DataSetReaderMessageDataType implements IOpcType {

  public networkMessageContentMask!: number;
  public dataSetMessageContentMask!: number;

  getTypeId(): number { return 15665; }
  getBinaryEncodingId(): number { return 15725; }
  getXmlEncodingId(): number { return 16019; }
  getJsonEncodingId(): number { return 16404; }
}

/**
 * QosDataType
 * NodeId: i=23603
 * Extends: Structure
 */
export class QosDataType extends Structure implements IOpcType {

  getTypeId(): number { return 23603; }
  getBinaryEncodingId(): number { return 23855; }
  getXmlEncodingId(): number { return 23923; }
  getJsonEncodingId(): number { return 23991; }
}

/**
 * TransmitQosDataType
 * NodeId: i=23604
 * Extends: QosDataType
 */
export class TransmitQosDataType extends QosDataType implements IOpcType {

  getTypeId(): number { return 23604; }
  getBinaryEncodingId(): number { return 23856; }
  getXmlEncodingId(): number { return 23924; }
  getJsonEncodingId(): number { return 23992; }
}

/**
 * TransmitQosPriorityDataType
 * NodeId: i=23605
 * Extends: TransmitQosDataType
 */
export class TransmitQosPriorityDataType extends TransmitQosDataType implements IOpcType {

  public priorityLabel!: UaString;

  getTypeId(): number { return 23605; }
  getBinaryEncodingId(): number { return 23857; }
  getXmlEncodingId(): number { return 23925; }
  getJsonEncodingId(): number { return 23993; }
}

/**
 * ReceiveQosDataType
 * NodeId: i=23608
 * Extends: QosDataType
 */
export class ReceiveQosDataType extends QosDataType implements IOpcType {

  getTypeId(): number { return 23608; }
  getBinaryEncodingId(): number { return 23860; }
  getXmlEncodingId(): number { return 23928; }
  getJsonEncodingId(): number { return 23996; }
}

/**
 * ReceiveQosPriorityDataType
 * NodeId: i=23609
 * Extends: ReceiveQosDataType
 */
export class ReceiveQosPriorityDataType extends ReceiveQosDataType implements IOpcType {

  public priorityLabel!: UaString;

  getTypeId(): number { return 23609; }
  getBinaryEncodingId(): number { return 23861; }
  getXmlEncodingId(): number { return 23929; }
  getJsonEncodingId(): number { return 23997; }
}

/**
 * DatagramConnectionTransportDataType
 * NodeId: i=17467
 * Extends: ConnectionTransportDataType
 */
export class DatagramConnectionTransportDataType extends ConnectionTransportDataType implements IOpcType {

  public discoveryAddress!: NetworkAddressDataType;

  getTypeId(): number { return 17467; }
  getBinaryEncodingId(): number { return 17468; }
  getXmlEncodingId(): number { return 17472; }
  getJsonEncodingId(): number { return 17476; }
}

/**
 * DatagramConnectionTransport2DataType
 * NodeId: i=23612
 * Extends: DatagramConnectionTransportDataType
 */
export class DatagramConnectionTransport2DataType extends DatagramConnectionTransportDataType implements IOpcType {

  public discoveryAnnounceRate!: number;
  public discoveryMaxMessageSize!: number;
  public qosCategory!: UaString;
  public datagramQos!: QosDataType[];

  getTypeId(): number { return 23612; }
  getBinaryEncodingId(): number { return 23864; }
  getXmlEncodingId(): number { return 23932; }
  getJsonEncodingId(): number { return 24000; }
}

/**
 * DatagramWriterGroupTransportDataType
 * NodeId: i=15532
 * Extends: WriterGroupTransportDataType
 */
export class DatagramWriterGroupTransportDataType extends WriterGroupTransportDataType implements IOpcType {

  public messageRepeatCount!: number;
  public messageRepeatDelay!: number;

  getTypeId(): number { return 15532; }
  getBinaryEncodingId(): number { return 21155; }
  getXmlEncodingId(): number { return 21179; }
  getJsonEncodingId(): number { return 21203; }
}

/**
 * DatagramWriterGroupTransport2DataType
 * NodeId: i=23613
 * Extends: DatagramWriterGroupTransportDataType
 */
export class DatagramWriterGroupTransport2DataType extends DatagramWriterGroupTransportDataType implements IOpcType {

  public address!: NetworkAddressDataType;
  public qosCategory!: UaString;
  public datagramQos!: TransmitQosDataType[];
  public discoveryAnnounceRate!: number;
  public topic!: UaString;

  getTypeId(): number { return 23613; }
  getBinaryEncodingId(): number { return 23865; }
  getXmlEncodingId(): number { return 23933; }
  getJsonEncodingId(): number { return 24001; }
}

/**
 * DatagramDataSetReaderTransportDataType
 * NodeId: i=23614
 * Extends: DataSetReaderTransportDataType
 */
export class DatagramDataSetReaderTransportDataType extends DataSetReaderTransportDataType implements IOpcType {

  public address!: NetworkAddressDataType;
  public qosCategory!: UaString;
  public datagramQos!: ReceiveQosDataType[];
  public topic!: UaString;

  getTypeId(): number { return 23614; }
  getBinaryEncodingId(): number { return 23866; }
  getXmlEncodingId(): number { return 23934; }
  getJsonEncodingId(): number { return 24002; }
}

/**
 * DtlsPubSubConnectionDataType
 * NodeId: i=18794
 * Extends: Structure
 */
export class DtlsPubSubConnectionDataType extends Structure implements IOpcType {

  public clientCipherSuite!: UaString;
  public serverCipherSuites!: UaString[];
  public zeroRTT!: boolean;
  public certificateGroupId!: NodeId;
  public verifyClientCertificate!: boolean;

  getTypeId(): number { return 18794; }
  getBinaryEncodingId(): number { return 18930; }
  getXmlEncodingId(): number { return 18938; }
  getJsonEncodingId(): number { return 18946; }
}

/**
 * BrokerConnectionTransportDataType
 * NodeId: i=15007
 * Extends: ConnectionTransportDataType
 */
export class BrokerConnectionTransportDataType extends ConnectionTransportDataType implements IOpcType {

  public resourceUri!: UaString;
  public authenticationProfileUri!: UaString;

  getTypeId(): number { return 15007; }
  getBinaryEncodingId(): number { return 15479; }
  getXmlEncodingId(): number { return 15579; }
  getJsonEncodingId(): number { return 15726; }
}

/**
 * BrokerWriterGroupTransportDataType
 * NodeId: i=15667
 * Extends: WriterGroupTransportDataType
 */
export class BrokerWriterGroupTransportDataType extends WriterGroupTransportDataType implements IOpcType {

  public queueName!: UaString;
  public resourceUri!: UaString;
  public authenticationProfileUri!: UaString;
  public requestedDeliveryGuarantee!: BrokerTransportQualityOfServiceEnum;

  getTypeId(): number { return 15667; }
  getBinaryEncodingId(): number { return 15727; }
  getXmlEncodingId(): number { return 16021; }
  getJsonEncodingId(): number { return 16524; }
}

/**
 * BrokerDataSetWriterTransportDataType
 * NodeId: i=15669
 * Extends: DataSetWriterTransportDataType
 */
export class BrokerDataSetWriterTransportDataType extends DataSetWriterTransportDataType implements IOpcType {

  public queueName!: UaString;
  public resourceUri!: UaString;
  public authenticationProfileUri!: UaString;
  public requestedDeliveryGuarantee!: BrokerTransportQualityOfServiceEnum;
  public metaDataQueueName!: UaString;
  public metaDataUpdateTime!: number;

  getTypeId(): number { return 15669; }
  getBinaryEncodingId(): number { return 15729; }
  getXmlEncodingId(): number { return 16022; }
  getJsonEncodingId(): number { return 16525; }
}

/**
 * BrokerDataSetReaderTransportDataType
 * NodeId: i=15670
 * Extends: DataSetReaderTransportDataType
 */
export class BrokerDataSetReaderTransportDataType extends DataSetReaderTransportDataType implements IOpcType {

  public queueName!: UaString;
  public resourceUri!: UaString;
  public authenticationProfileUri!: UaString;
  public requestedDeliveryGuarantee!: BrokerTransportQualityOfServiceEnum;
  public metaDataQueueName!: UaString;

  getTypeId(): number { return 15670; }
  getBinaryEncodingId(): number { return 15733; }
  getXmlEncodingId(): number { return 16023; }
  getJsonEncodingId(): number { return 16526; }
}

/**
 * PubSubConfigurationRefDataType
 * NodeId: i=25519
 * Extends: Structure
 */
export class PubSubConfigurationRefDataType extends Structure implements IOpcType {

  public configurationMask!: number;
  public elementIndex!: number;
  public connectionIndex!: number;
  public groupIndex!: number;

  getTypeId(): number { return 25519; }
  getBinaryEncodingId(): number { return 25531; }
  getXmlEncodingId(): number { return 25547; }
  getJsonEncodingId(): number { return 25563; }
}

/**
 * PubSubConfigurationValueDataType
 * NodeId: i=25520
 * Extends: Structure
 */
export class PubSubConfigurationValueDataType extends Structure implements IOpcType {

  public configurationElement!: PubSubConfigurationRefDataType;
  public name!: UaString;
  public identifier!: Variant;

  getTypeId(): number { return 25520; }
  getBinaryEncodingId(): number { return 25532; }
  getXmlEncodingId(): number { return 25548; }
  getJsonEncodingId(): number { return 25564; }
}

/**
 * JsonNetworkMessage
 * NodeId: i=19311
 * Extends: Structure
 */
export class JsonNetworkMessage extends Structure implements IOpcType {

  public messageId!: UaString;
  public messageType!: UaString;
  public publisherId!: UaString;
  public writerGroupName!: UaString;
  public dataSetClassId!: UaString;
  public messages!: ExtensionObject;

  getTypeId(): number { return 19311; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonDataSetMessage
 * NodeId: i=19312
 * Extends: Structure
 */
export class JsonDataSetMessage extends Structure implements IOpcType {

  public dataSetWriterId!: number;
  public dataSetWriterName!: UaString;
  public publisherId!: UaString;
  public writerGroupName!: UaString;
  public sequenceNumber!: number;
  public metaDataVersion!: ConfigurationVersionDataType;
  public minorVersion!: number;
  public timestamp!: Date;
  public status!: StatusCode;
  public messageType!: UaString;
  public payload!: ExtensionObject;

  getTypeId(): number { return 19312; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonDataSetMetaDataMessage
 * NodeId: i=19313
 * Extends: Structure
 */
export class JsonDataSetMetaDataMessage extends Structure implements IOpcType {

  public messageId!: UaString;
  public messageType!: UaString;
  public publisherId!: UaString;
  public dataSetWriterId!: number;
  public writerGroupName!: UaString;
  public dataSetWriterName!: UaString;
  public timestamp!: Date;
  public metaData!: DataSetMetaDataType;

  getTypeId(): number { return 19313; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonApplicationDescriptionMessage
 * NodeId: i=19314
 * Extends: Structure
 */
export class JsonApplicationDescriptionMessage extends Structure implements IOpcType {

  public messageId!: UaString;
  public messageType!: UaString;
  public publisherId!: UaString;
  public timestamp!: Date;
  public description!: ApplicationDescription;
  public serverCapabilities!: UaString[];

  getTypeId(): number { return 19314; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonServerEndpointsMessage
 * NodeId: i=19315
 * Extends: Structure
 */
export class JsonServerEndpointsMessage extends Structure implements IOpcType {

  public messageId!: UaString;
  public messageType!: UaString;
  public publisherId!: UaString;
  public timestamp!: Date;
  public description!: ApplicationDescription;
  public endpoints!: EndpointDescription[];

  getTypeId(): number { return 19315; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonStatusMessage
 * NodeId: i=19316
 * Extends: Structure
 */
export class JsonStatusMessage extends Structure implements IOpcType {

  public messageId!: UaString;
  public messageType!: UaString;
  public publisherId!: UaString;
  public timestamp!: Date;
  public isCyclic!: boolean;
  public status!: PubSubStateEnum;
  public nextReportTime!: Date;

  getTypeId(): number { return 19316; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonPubSubConnectionMessage
 * NodeId: i=19317
 * Extends: Structure
 */
export class JsonPubSubConnectionMessage extends Structure implements IOpcType {

  public messageId!: UaString;
  public messageType!: UaString;
  public publisherId!: UaString;
  public timestamp!: Date;
  public connection!: PubSubConnectionDataType;

  getTypeId(): number { return 19317; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonActionMetaDataMessage
 * NodeId: i=19318
 * Extends: Structure
 */
export class JsonActionMetaDataMessage extends Structure implements IOpcType {

  public messageId!: UaString;
  public messageType!: UaString;
  public publisherId!: UaString;
  public dataSetWriterId!: number;
  public dataSetWriterName!: UaString;
  public timestamp!: Date;
  public actionTargets!: ActionTargetDataType[];
  public request!: DataSetMetaDataType;
  public response!: DataSetMetaDataType;
  public actionMethods!: ActionMethodDataType[];

  getTypeId(): number { return 19318; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonActionResponderMessage
 * NodeId: i=19319
 * Extends: Structure
 */
export class JsonActionResponderMessage extends Structure implements IOpcType {

  public messageId!: UaString;
  public messageType!: UaString;
  public publisherId!: UaString;
  public timestamp!: Date;
  public connection!: PubSubConnectionDataType;

  getTypeId(): number { return 19319; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonActionNetworkMessage
 * NodeId: i=19320
 * Extends: Structure
 */
export class JsonActionNetworkMessage extends Structure implements IOpcType {

  public messageId!: UaString;
  public messageType!: UaString;
  public publisherId!: UaString;
  public timestamp!: Date;
  public responseAddress!: UaString;
  public correlationData!: UaByteString;
  public requestorId!: UaString;
  public timeoutHint!: number;
  public messages!: ExtensionObject[];

  getTypeId(): number { return 19320; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonActionRequestMessage
 * NodeId: i=19321
 * Extends: Structure
 */
export class JsonActionRequestMessage extends Structure implements IOpcType {

  public dataSetWriterId!: number;
  public actionTargetId!: number;
  public dataSetWriterName!: UaString;
  public writerGroupName!: UaString;
  public metaDataVersion!: ConfigurationVersionDataType;
  public minorVersion!: number;
  public timestamp!: Date;
  public messageType!: UaString;
  public requestId!: number;
  public actionState!: ActionStateEnum;
  public payload!: ExtensionObject;

  getTypeId(): number { return 19321; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * JsonActionResponseMessage
 * NodeId: i=19322
 * Extends: Structure
 */
export class JsonActionResponseMessage extends Structure implements IOpcType {

  public dataSetWriterId!: number;
  public actionTargetId!: number;
  public dataSetWriterName!: UaString;
  public writerGroupName!: UaString;
  public metaDataVersion!: ConfigurationVersionDataType;
  public minorVersion!: number;
  public timestamp!: Date;
  public status!: StatusCode;
  public messageType!: UaString;
  public requestId!: number;
  public actionState!: ActionStateEnum;
  public payload!: ExtensionObject;

  getTypeId(): number { return 19322; }
  getBinaryEncodingId(): number { return 0; }
  getXmlEncodingId(): number { return 0; }
  getJsonEncodingId(): number { return 0; }
}

/**
 * AliasNameDataType
 * NodeId: i=23468
 * Extends: Structure
 */
export class AliasNameDataType extends Structure implements IOpcType {

  public aliasName!: QualifiedName;
  public referencedNodes!: ExpandedNodeId[];

  getTypeId(): number { return 23468; }
  getBinaryEncodingId(): number { return 23499; }
  getXmlEncodingId(): number { return 23505; }
  getJsonEncodingId(): number { return 23511; }
}

/**
 * UserManagementDataType
 * NodeId: i=24281
 * Extends: Structure
 */
export class UserManagementDataType extends Structure implements IOpcType {

  public userName!: UaString;
  public userConfiguration!: number;
  public description!: UaString;

  getTypeId(): number { return 24281; }
  getBinaryEncodingId(): number { return 24292; }
  getXmlEncodingId(): number { return 24296; }
  getJsonEncodingId(): number { return 24300; }
}

/**
 * PriorityMappingEntryType
 * NodeId: i=25220
 * Extends: Structure
 */
export class PriorityMappingEntryType extends Structure implements IOpcType {

  public mappingUri!: UaString;
  public priorityLabel!: UaString;
  public priorityValue_PCP!: number;
  public priorityValue_DSCP!: number;

  getTypeId(): number { return 25220; }
  getBinaryEncodingId(): number { return 25239; }
  getXmlEncodingId(): number { return 25243; }
  getJsonEncodingId(): number { return 25247; }
}

/**
 * LldpManagementAddressTxPortType
 * NodeId: i=18953
 * Extends: Structure
 */
export class LldpManagementAddressTxPortType extends Structure implements IOpcType {

  public addressSubtype!: number;
  public manAddress!: UaString;
  public txEnable!: boolean;
  public addrLen!: number;
  public ifSubtype!: ManAddrIfSubtypeEnum;
  public ifId!: number;

  getTypeId(): number { return 18953; }
  getBinaryEncodingId(): number { return 19079; }
  getXmlEncodingId(): number { return 19100; }
  getJsonEncodingId(): number { return 19299; }
}

/**
 * LldpManagementAddressType
 * NodeId: i=18954
 * Extends: Structure
 */
export class LldpManagementAddressType extends Structure implements IOpcType {

  public addressSubtype!: number;
  public address!: UaString;
  public ifSubtype!: ManAddrIfSubtypeEnum;
  public ifId!: number;

  getTypeId(): number { return 18954; }
  getBinaryEncodingId(): number { return 19080; }
  getXmlEncodingId(): number { return 19101; }
  getJsonEncodingId(): number { return 19300; }
}

/**
 * LldpTlvType
 * NodeId: i=18955
 * Extends: Structure
 */
export class LldpTlvType extends Structure implements IOpcType {

  public tlvType!: number;
  public tlvInfo!: UaByteString;

  getTypeId(): number { return 18955; }
  getBinaryEncodingId(): number { return 19081; }
  getXmlEncodingId(): number { return 19102; }
  getJsonEncodingId(): number { return 19301; }
}

/**
 * ReferenceDescriptionDataType
 * NodeId: i=32659
 * Extends: Structure
 */
export class ReferenceDescriptionDataType extends Structure implements IOpcType {

  public sourceNode!: NodeId;
  public referenceType!: NodeId;
  public isForward!: boolean;
  public targetNode!: ExpandedNodeId;

  getTypeId(): number { return 32659; }
  getBinaryEncodingId(): number { return 32661; }
  getXmlEncodingId(): number { return 32669; }
  getJsonEncodingId(): number { return 32677; }
}

/**
 * ReferenceListEntryDataType
 * NodeId: i=32660
 * Extends: Structure
 */
export class ReferenceListEntryDataType extends Structure implements IOpcType {

  public referenceType!: NodeId;
  public isForward!: boolean;
  public targetNode!: ExpandedNodeId;

  getTypeId(): number { return 32660; }
  getBinaryEncodingId(): number { return 32662; }
  getXmlEncodingId(): number { return 32670; }
  getJsonEncodingId(): number { return 32678; }
}

/**
 * LogRecord
 * NodeId: i=19361
 * Extends: Structure
 */
export class LogRecord extends Structure implements IOpcType {

  public time!: Date;
  public severity!: number;
  public eventType?: NodeId | null = null;
  public sourceNode?: NodeId | null = null;
  public sourceName?: UaString | null = null;
  public message!: LocalizedText;
  public traceContext?: TraceContextDataType | null = null;
  public additionalData?: NameValuePair[] | null = null;

  getTypeId(): number { return 19361; }
  getBinaryEncodingId(): number { return 19379; }
  getXmlEncodingId(): number { return 19383; }
  getJsonEncodingId(): number { return 19387; }
}

/**
 * LogRecordsDataType
 * NodeId: i=19745
 * Extends: Structure
 */
export class LogRecordsDataType extends Structure implements IOpcType {

  public logRecordArray!: LogRecord[];

  getTypeId(): number { return 19745; }
  getBinaryEncodingId(): number { return 19753; }
  getXmlEncodingId(): number { return 19773; }
  getJsonEncodingId(): number { return 19803; }
}

/**
 * SpanContextDataType
 * NodeId: i=19746
 * Extends: Structure
 */
export class SpanContextDataType extends Structure implements IOpcType {

  public traceId!: string;
  public spanId!: bigint;

  getTypeId(): number { return 19746; }
  getBinaryEncodingId(): number { return 19754; }
  getXmlEncodingId(): number { return 19774; }
  getJsonEncodingId(): number { return 19804; }
}

/**
 * TraceContextDataType
 * NodeId: i=19747
 * Extends: SpanContextDataType
 */
export class TraceContextDataType extends SpanContextDataType implements IOpcType {

  public parentSpanId!: bigint;
  public parentIdentifier!: UaString;

  getTypeId(): number { return 19747; }
  getBinaryEncodingId(): number { return 19755; }
  getXmlEncodingId(): number { return 19775; }
  getJsonEncodingId(): number { return 19805; }
}

/**
 * NameValuePair
 * NodeId: i=19748
 * Extends: Structure
 */
export class NameValuePair extends Structure implements IOpcType {

  public name!: UaString;
  public value!: Variant;

  getTypeId(): number { return 19748; }
  getBinaryEncodingId(): number { return 19756; }
  getXmlEncodingId(): number { return 19776; }
  getJsonEncodingId(): number { return 19806; }
}

/**
 * RolePermissionType
 * NodeId: i=96
 * Extends: Structure
 */
export class RolePermissionType extends Structure implements IOpcType {

  public roleId!: NodeId;
  public permissions!: number;

  getTypeId(): number { return 96; }
  getBinaryEncodingId(): number { return 128; }
  getXmlEncodingId(): number { return 16126; }
  getJsonEncodingId(): number { return 15062; }
}

/**
 * DataTypeDefinition
 * NodeId: i=97
 * Extends: Structure
 */
export class DataTypeDefinition extends Structure implements IOpcType {

  getTypeId(): number { return 97; }
  getBinaryEncodingId(): number { return 121; }
  getXmlEncodingId(): number { return 14797; }
  getJsonEncodingId(): number { return 15063; }
}

/**
 * StructureField
 * NodeId: i=101
 * Extends: Structure
 */
export class StructureField extends Structure implements IOpcType {

  public name!: UaString;
  public description!: LocalizedText;
  public dataType!: NodeId;
  public valueRank!: number;
  public arrayDimensions!: number[];
  public maxStringLength!: number;
  public isOptional!: boolean;

  getTypeId(): number { return 101; }
  getBinaryEncodingId(): number { return 14844; }
  getXmlEncodingId(): number { return 14800; }
  getJsonEncodingId(): number { return 15065; }
}

/**
 * StructureDefinition
 * NodeId: i=99
 * Extends: DataTypeDefinition
 */
export class StructureDefinition extends DataTypeDefinition implements IOpcType {

  public defaultEncodingId!: NodeId;
  public baseDataType!: NodeId;
  public structureType!: StructureTypeEnum;
  public fields!: StructureField[];

  getTypeId(): number { return 99; }
  getBinaryEncodingId(): number { return 122; }
  getXmlEncodingId(): number { return 14798; }
  getJsonEncodingId(): number { return 15066; }
}

/**
 * EnumDefinition
 * NodeId: i=100
 * Extends: DataTypeDefinition
 */
export class EnumDefinition extends DataTypeDefinition implements IOpcType {

  public fields!: EnumField[];

  getTypeId(): number { return 100; }
  getBinaryEncodingId(): number { return 123; }
  getXmlEncodingId(): number { return 14799; }
  getJsonEncodingId(): number { return 15067; }
}

/**
 * Node
 * NodeId: i=258
 * Extends: Structure
 */
export class Node extends Structure implements IOpcType {

  public nodeId!: NodeId;
  public nodeClass!: NodeClassEnum;
  public browseName!: QualifiedName;
  public displayName!: LocalizedText;
  public description!: LocalizedText;
  public writeMask!: number;
  public userWriteMask!: number;
  public rolePermissions!: RolePermissionType[];
  public userRolePermissions!: RolePermissionType[];
  public accessRestrictions!: number;
  public references!: ReferenceNode[];

  getTypeId(): number { return 258; }
  getBinaryEncodingId(): number { return 260; }
  getXmlEncodingId(): number { return 259; }
  getJsonEncodingId(): number { return 15068; }
}

/**
 * InstanceNode
 * NodeId: i=11879
 * Extends: Node
 */
export class InstanceNode extends Node implements IOpcType {

  getTypeId(): number { return 11879; }
  getBinaryEncodingId(): number { return 11889; }
  getXmlEncodingId(): number { return 11887; }
  getJsonEncodingId(): number { return 15069; }
}

/**
 * TypeNode
 * NodeId: i=11880
 * Extends: Node
 */
export class TypeNode extends Node implements IOpcType {

  getTypeId(): number { return 11880; }
  getBinaryEncodingId(): number { return 11890; }
  getXmlEncodingId(): number { return 11888; }
  getJsonEncodingId(): number { return 15070; }
}

/**
 * ObjectNode
 * NodeId: i=261
 * Extends: InstanceNode
 */
export class ObjectNode extends InstanceNode implements IOpcType {

  public eventNotifier!: number;

  getTypeId(): number { return 261; }
  getBinaryEncodingId(): number { return 263; }
  getXmlEncodingId(): number { return 262; }
  getJsonEncodingId(): number { return 15071; }
}

/**
 * ObjectTypeNode
 * NodeId: i=264
 * Extends: TypeNode
 */
export class ObjectTypeNode extends TypeNode implements IOpcType {

  public isAbstract!: boolean;

  getTypeId(): number { return 264; }
  getBinaryEncodingId(): number { return 266; }
  getXmlEncodingId(): number { return 265; }
  getJsonEncodingId(): number { return 15073; }
}

/**
 * VariableNode
 * NodeId: i=267
 * Extends: InstanceNode
 */
export class VariableNode extends InstanceNode implements IOpcType {

  public value!: Variant;
  public dataType!: NodeId;
  public valueRank!: number;
  public arrayDimensions!: number[];
  public accessLevel!: number;
  public userAccessLevel!: number;
  public minimumSamplingInterval!: number;
  public historizing!: boolean;
  public accessLevelEx!: number;

  getTypeId(): number { return 267; }
  getBinaryEncodingId(): number { return 269; }
  getXmlEncodingId(): number { return 268; }
  getJsonEncodingId(): number { return 15074; }
}

/**
 * VariableTypeNode
 * NodeId: i=270
 * Extends: TypeNode
 */
export class VariableTypeNode extends TypeNode implements IOpcType {

  public value!: Variant;
  public dataType!: NodeId;
  public valueRank!: number;
  public arrayDimensions!: number[];
  public isAbstract!: boolean;

  getTypeId(): number { return 270; }
  getBinaryEncodingId(): number { return 272; }
  getXmlEncodingId(): number { return 271; }
  getJsonEncodingId(): number { return 15075; }
}

/**
 * ReferenceTypeNode
 * NodeId: i=273
 * Extends: TypeNode
 */
export class ReferenceTypeNode extends TypeNode implements IOpcType {

  public isAbstract!: boolean;
  public symmetric!: boolean;
  public inverseName!: LocalizedText;

  getTypeId(): number { return 273; }
  getBinaryEncodingId(): number { return 275; }
  getXmlEncodingId(): number { return 274; }
  getJsonEncodingId(): number { return 15076; }
}

/**
 * MethodNode
 * NodeId: i=276
 * Extends: InstanceNode
 */
export class MethodNode extends InstanceNode implements IOpcType {

  public executable!: boolean;
  public userExecutable!: boolean;

  getTypeId(): number { return 276; }
  getBinaryEncodingId(): number { return 278; }
  getXmlEncodingId(): number { return 277; }
  getJsonEncodingId(): number { return 15077; }
}

/**
 * ViewNode
 * NodeId: i=279
 * Extends: InstanceNode
 */
export class ViewNode extends InstanceNode implements IOpcType {

  public containsNoLoops!: boolean;
  public eventNotifier!: number;

  getTypeId(): number { return 279; }
  getBinaryEncodingId(): number { return 281; }
  getXmlEncodingId(): number { return 280; }
  getJsonEncodingId(): number { return 15078; }
}

/**
 * DataTypeNode
 * NodeId: i=282
 * Extends: TypeNode
 */
export class DataTypeNode extends TypeNode implements IOpcType {

  public isAbstract!: boolean;
  public dataTypeDefinition!: ExtensionObject;

  getTypeId(): number { return 282; }
  getBinaryEncodingId(): number { return 284; }
  getXmlEncodingId(): number { return 283; }
  getJsonEncodingId(): number { return 15079; }
}

/**
 * ReferenceNode
 * NodeId: i=285
 * Extends: Structure
 */
export class ReferenceNode extends Structure implements IOpcType {

  public referenceTypeId!: NodeId;
  public isInverse!: boolean;
  public targetId!: ExpandedNodeId;

  getTypeId(): number { return 285; }
  getBinaryEncodingId(): number { return 287; }
  getXmlEncodingId(): number { return 286; }
  getJsonEncodingId(): number { return 15080; }
}

/**
 * Argument
 * NodeId: i=296
 * Extends: Structure
 */
export class Argument extends Structure implements IOpcType {

  public name!: UaString;
  public dataType!: NodeId;
  public valueRank!: number;
  public arrayDimensions!: number[];
  public description!: LocalizedText;

  getTypeId(): number { return 296; }
  getBinaryEncodingId(): number { return 298; }
  getXmlEncodingId(): number { return 297; }
  getJsonEncodingId(): number { return 15081; }
}

/**
 * EnumValueType
 * NodeId: i=7594
 * Extends: Structure
 */
export class EnumValueType extends Structure implements IOpcType {

  public value!: bigint;
  public displayName!: LocalizedText;
  public description!: LocalizedText;

  getTypeId(): number { return 7594; }
  getBinaryEncodingId(): number { return 8251; }
  getXmlEncodingId(): number { return 7616; }
  getJsonEncodingId(): number { return 15082; }
}

/**
 * EnumField
 * NodeId: i=102
 * Extends: EnumValueType
 */
export class EnumField extends EnumValueType implements IOpcType {

  public name!: UaString;

  getTypeId(): number { return 102; }
  getBinaryEncodingId(): number { return 14845; }
  getXmlEncodingId(): number { return 14801; }
  getJsonEncodingId(): number { return 15083; }
}

/**
 * OptionSet
 * NodeId: i=12755
 * Extends: Structure
 */
export class OptionSet extends Structure implements IOpcType {

  public value!: UaByteString;
  public validBits!: UaByteString;

  getTypeId(): number { return 12755; }
  getBinaryEncodingId(): number { return 12765; }
  getXmlEncodingId(): number { return 12757; }
  getJsonEncodingId(): number { return 15084; }
}

/**
 * TimeZoneDataType
 * NodeId: i=8912
 * Extends: Structure
 */
export class TimeZoneDataType extends Structure implements IOpcType {

  public offset!: number;
  public daylightSavingInOffset!: boolean;

  getTypeId(): number { return 8912; }
  getBinaryEncodingId(): number { return 8917; }
  getXmlEncodingId(): number { return 8913; }
  getJsonEncodingId(): number { return 15086; }
}

/**
 * ApplicationDescription
 * NodeId: i=308
 * Extends: Structure
 */
export class ApplicationDescription extends Structure implements IOpcType {

  public applicationUri!: UaString;
  public productUri!: UaString;
  public applicationName!: LocalizedText;
  public applicationType!: ApplicationTypeEnum;
  public gatewayServerUri!: UaString;
  public discoveryProfileUri!: UaString;
  public discoveryUrls!: UaString[];

  getTypeId(): number { return 308; }
  getBinaryEncodingId(): number { return 310; }
  getXmlEncodingId(): number { return 309; }
  getJsonEncodingId(): number { return 15087; }
}

/**
 * RequestHeader
 * NodeId: i=389
 * Extends: Structure
 */
export class RequestHeader extends Structure implements IOpcType {

  public authenticationToken!: NodeId;
  public timestamp!: Date;
  public requestHandle!: number;
  public returnDiagnostics!: number;
  public auditEntryId!: UaString;
  public timeoutHint!: number;
  public additionalHeader!: ExtensionObject;

  getTypeId(): number { return 389; }
  getBinaryEncodingId(): number { return 391; }
  getXmlEncodingId(): number { return 390; }
  getJsonEncodingId(): number { return 15088; }
}

/**
 * ResponseHeader
 * NodeId: i=392
 * Extends: Structure
 */
export class ResponseHeader extends Structure implements IOpcType {

  public timestamp!: Date;
  public requestHandle!: number;
  public serviceResult!: StatusCode;
  public serviceDiagnostics!: DiagnosticInfo;
  public stringTable!: UaString[];
  public additionalHeader!: ExtensionObject;

  getTypeId(): number { return 392; }
  getBinaryEncodingId(): number { return 394; }
  getXmlEncodingId(): number { return 393; }
  getJsonEncodingId(): number { return 15089; }
}

/**
 * ServiceFault
 * NodeId: i=395
 * Extends: Structure
 */
export class ServiceFault extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;

  getTypeId(): number { return 395; }
  getBinaryEncodingId(): number { return 397; }
  getXmlEncodingId(): number { return 396; }
  getJsonEncodingId(): number { return 15090; }
}

/**
 * SessionlessInvokeRequestType
 * NodeId: i=15901
 * Extends: Structure
 */
export class SessionlessInvokeRequestType extends Structure implements IOpcType {

  public urisVersion!: number;
  public namespaceUris!: UaString[];
  public serverUris!: UaString[];
  public localeIds!: UaString[];
  public serviceId!: number;

  getTypeId(): number { return 15901; }
  getBinaryEncodingId(): number { return 15903; }
  getXmlEncodingId(): number { return 15902; }
  getJsonEncodingId(): number { return 15091; }
}

/**
 * SessionlessInvokeResponseType
 * NodeId: i=20999
 * Extends: Structure
 */
export class SessionlessInvokeResponseType extends Structure implements IOpcType {

  public namespaceUris!: UaString[];
  public serverUris!: UaString[];
  public serviceId!: number;

  getTypeId(): number { return 20999; }
  getBinaryEncodingId(): number { return 21001; }
  getXmlEncodingId(): number { return 21000; }
  getJsonEncodingId(): number { return 15092; }
}

/**
 * FindServersRequest
 * NodeId: i=420
 * Extends: Structure
 */
export class FindServersRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public endpointUrl!: UaString;
  public localeIds!: UaString[];
  public serverUris!: UaString[];

  getTypeId(): number { return 420; }
  getBinaryEncodingId(): number { return 422; }
  getXmlEncodingId(): number { return 421; }
  getJsonEncodingId(): number { return 15093; }
}

/**
 * FindServersResponse
 * NodeId: i=423
 * Extends: Structure
 */
export class FindServersResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public servers!: ApplicationDescription[];

  getTypeId(): number { return 423; }
  getBinaryEncodingId(): number { return 425; }
  getXmlEncodingId(): number { return 424; }
  getJsonEncodingId(): number { return 15094; }
}

/**
 * ServerOnNetwork
 * NodeId: i=12189
 * Extends: Structure
 */
export class ServerOnNetwork extends Structure implements IOpcType {

  public recordId!: number;
  public serverName!: UaString;
  public discoveryUrl!: UaString;
  public serverCapabilities!: UaString[];

  getTypeId(): number { return 12189; }
  getBinaryEncodingId(): number { return 12207; }
  getXmlEncodingId(): number { return 12195; }
  getJsonEncodingId(): number { return 15095; }
}

/**
 * FindServersOnNetworkRequest
 * NodeId: i=12190
 * Extends: Structure
 */
export class FindServersOnNetworkRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public startingRecordId!: number;
  public maxRecordsToReturn!: number;
  public serverCapabilityFilter!: UaString[];

  getTypeId(): number { return 12190; }
  getBinaryEncodingId(): number { return 12208; }
  getXmlEncodingId(): number { return 12196; }
  getJsonEncodingId(): number { return 15096; }
}

/**
 * FindServersOnNetworkResponse
 * NodeId: i=12191
 * Extends: Structure
 */
export class FindServersOnNetworkResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public lastCounterResetTime!: Date;
  public servers!: ServerOnNetwork[];

  getTypeId(): number { return 12191; }
  getBinaryEncodingId(): number { return 12209; }
  getXmlEncodingId(): number { return 12197; }
  getJsonEncodingId(): number { return 15097; }
}

/**
 * UserTokenPolicy
 * NodeId: i=304
 * Extends: Structure
 */
export class UserTokenPolicy extends Structure implements IOpcType {

  public policyId!: UaString;
  public tokenType!: UserTokenTypeEnum;
  public issuedTokenType!: UaString;
  public issuerEndpointUrl!: UaString;
  public securityPolicyUri!: UaString;

  getTypeId(): number { return 304; }
  getBinaryEncodingId(): number { return 306; }
  getXmlEncodingId(): number { return 305; }
  getJsonEncodingId(): number { return 15098; }
}

/**
 * EndpointDescription
 * NodeId: i=312
 * Extends: Structure
 */
export class EndpointDescription extends Structure implements IOpcType {

  public endpointUrl!: UaString;
  public server!: ApplicationDescription;
  public serverCertificate!: UaByteString;
  public securityMode!: MessageSecurityModeEnum;
  public securityPolicyUri!: UaString;
  public userIdentityTokens!: UserTokenPolicy[];
  public transportProfileUri!: UaString;
  public securityLevel!: number;

  getTypeId(): number { return 312; }
  getBinaryEncodingId(): number { return 314; }
  getXmlEncodingId(): number { return 313; }
  getJsonEncodingId(): number { return 15099; }
}

/**
 * GetEndpointsRequest
 * NodeId: i=426
 * Extends: Structure
 */
export class GetEndpointsRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public endpointUrl!: UaString;
  public localeIds!: UaString[];
  public profileUris!: UaString[];

  getTypeId(): number { return 426; }
  getBinaryEncodingId(): number { return 428; }
  getXmlEncodingId(): number { return 427; }
  getJsonEncodingId(): number { return 15100; }
}

/**
 * GetEndpointsResponse
 * NodeId: i=429
 * Extends: Structure
 */
export class GetEndpointsResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public endpoints!: EndpointDescription[];

  getTypeId(): number { return 429; }
  getBinaryEncodingId(): number { return 431; }
  getXmlEncodingId(): number { return 430; }
  getJsonEncodingId(): number { return 15101; }
}

/**
 * RegisteredServer
 * NodeId: i=432
 * Extends: Structure
 */
export class RegisteredServer extends Structure implements IOpcType {

  public serverUri!: UaString;
  public productUri!: UaString;
  public serverNames!: LocalizedText[];
  public serverType!: ApplicationTypeEnum;
  public gatewayServerUri!: UaString;
  public discoveryUrls!: UaString[];
  public semaphoreFilePath!: UaString;
  public isOnline!: boolean;

  getTypeId(): number { return 432; }
  getBinaryEncodingId(): number { return 434; }
  getXmlEncodingId(): number { return 433; }
  getJsonEncodingId(): number { return 15102; }
}

/**
 * RegisterServerRequest
 * NodeId: i=435
 * Extends: Structure
 */
export class RegisterServerRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public server!: RegisteredServer;

  getTypeId(): number { return 435; }
  getBinaryEncodingId(): number { return 437; }
  getXmlEncodingId(): number { return 436; }
  getJsonEncodingId(): number { return 15103; }
}

/**
 * RegisterServerResponse
 * NodeId: i=438
 * Extends: Structure
 */
export class RegisterServerResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;

  getTypeId(): number { return 438; }
  getBinaryEncodingId(): number { return 440; }
  getXmlEncodingId(): number { return 439; }
  getJsonEncodingId(): number { return 15104; }
}

/**
 * DiscoveryConfiguration
 * NodeId: i=12890
 * Extends: Structure
 */
export class DiscoveryConfiguration extends Structure implements IOpcType {

  getTypeId(): number { return 12890; }
  getBinaryEncodingId(): number { return 12900; }
  getXmlEncodingId(): number { return 12892; }
  getJsonEncodingId(): number { return 15105; }
}

/**
 * MdnsDiscoveryConfiguration
 * NodeId: i=12891
 * Extends: DiscoveryConfiguration
 */
export class MdnsDiscoveryConfiguration extends DiscoveryConfiguration implements IOpcType {

  public mdnsServerName!: UaString;
  public serverCapabilities!: UaString[];

  getTypeId(): number { return 12891; }
  getBinaryEncodingId(): number { return 12901; }
  getXmlEncodingId(): number { return 12893; }
  getJsonEncodingId(): number { return 15106; }
}

/**
 * RegisterServer2Request
 * NodeId: i=12193
 * Extends: Structure
 */
export class RegisterServer2Request extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public server!: RegisteredServer;
  public discoveryConfiguration!: ExtensionObject[];

  getTypeId(): number { return 12193; }
  getBinaryEncodingId(): number { return 12211; }
  getXmlEncodingId(): number { return 12199; }
  getJsonEncodingId(): number { return 15107; }
}

/**
 * RegisterServer2Response
 * NodeId: i=12194
 * Extends: Structure
 */
export class RegisterServer2Response extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public configurationResults!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 12194; }
  getBinaryEncodingId(): number { return 12212; }
  getXmlEncodingId(): number { return 12200; }
  getJsonEncodingId(): number { return 15130; }
}

/**
 * ChannelSecurityToken
 * NodeId: i=441
 * Extends: Structure
 */
export class ChannelSecurityToken extends Structure implements IOpcType {

  public channelId!: number;
  public tokenId!: number;
  public createdAt!: Date;
  public revisedLifetime!: number;

  getTypeId(): number { return 441; }
  getBinaryEncodingId(): number { return 443; }
  getXmlEncodingId(): number { return 442; }
  getJsonEncodingId(): number { return 15131; }
}

/**
 * OpenSecureChannelRequest
 * NodeId: i=444
 * Extends: Structure
 */
export class OpenSecureChannelRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public clientProtocolVersion!: number;
  public requestType!: SecurityTokenRequestTypeEnum;
  public securityMode!: MessageSecurityModeEnum;
  public clientNonce!: UaByteString;
  public requestedLifetime!: number;

  getTypeId(): number { return 444; }
  getBinaryEncodingId(): number { return 446; }
  getXmlEncodingId(): number { return 445; }
  getJsonEncodingId(): number { return 15132; }
}

/**
 * OpenSecureChannelResponse
 * NodeId: i=447
 * Extends: Structure
 */
export class OpenSecureChannelResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public serverProtocolVersion!: number;
  public securityToken!: ChannelSecurityToken;
  public serverNonce!: UaByteString;

  getTypeId(): number { return 447; }
  getBinaryEncodingId(): number { return 449; }
  getXmlEncodingId(): number { return 448; }
  getJsonEncodingId(): number { return 15133; }
}

/**
 * CloseSecureChannelRequest
 * NodeId: i=450
 * Extends: Structure
 */
export class CloseSecureChannelRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;

  getTypeId(): number { return 450; }
  getBinaryEncodingId(): number { return 452; }
  getXmlEncodingId(): number { return 451; }
  getJsonEncodingId(): number { return 15134; }
}

/**
 * CloseSecureChannelResponse
 * NodeId: i=453
 * Extends: Structure
 */
export class CloseSecureChannelResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;

  getTypeId(): number { return 453; }
  getBinaryEncodingId(): number { return 455; }
  getXmlEncodingId(): number { return 454; }
  getJsonEncodingId(): number { return 15135; }
}

/**
 * SignedSoftwareCertificate
 * NodeId: i=344
 * Extends: Structure
 */
export class SignedSoftwareCertificate extends Structure implements IOpcType {

  public certificateData!: UaByteString;
  public signature!: UaByteString;

  getTypeId(): number { return 344; }
  getBinaryEncodingId(): number { return 346; }
  getXmlEncodingId(): number { return 345; }
  getJsonEncodingId(): number { return 15136; }
}

/**
 * SignatureData
 * NodeId: i=456
 * Extends: Structure
 */
export class SignatureData extends Structure implements IOpcType {

  public algorithm!: UaString;
  public signature!: UaByteString;

  getTypeId(): number { return 456; }
  getBinaryEncodingId(): number { return 458; }
  getXmlEncodingId(): number { return 457; }
  getJsonEncodingId(): number { return 15137; }
}

/**
 * CreateSessionRequest
 * NodeId: i=459
 * Extends: Structure
 */
export class CreateSessionRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public clientDescription!: ApplicationDescription;
  public serverUri!: UaString;
  public endpointUrl!: UaString;
  public sessionName!: UaString;
  public clientNonce!: UaByteString;
  public clientCertificate!: UaByteString;
  public requestedSessionTimeout!: number;
  public maxResponseMessageSize!: number;

  getTypeId(): number { return 459; }
  getBinaryEncodingId(): number { return 461; }
  getXmlEncodingId(): number { return 460; }
  getJsonEncodingId(): number { return 15138; }
}

/**
 * CreateSessionResponse
 * NodeId: i=462
 * Extends: Structure
 */
export class CreateSessionResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public sessionId!: NodeId;
  public authenticationToken!: NodeId;
  public revisedSessionTimeout!: number;
  public serverNonce!: UaByteString;
  public serverCertificate!: UaByteString;
  public serverEndpoints!: EndpointDescription[];
  public serverSoftwareCertificates!: SignedSoftwareCertificate[];
  public serverSignature!: SignatureData;
  public maxRequestMessageSize!: number;

  getTypeId(): number { return 462; }
  getBinaryEncodingId(): number { return 464; }
  getXmlEncodingId(): number { return 463; }
  getJsonEncodingId(): number { return 15139; }
}

/**
 * UserIdentityToken
 * NodeId: i=316
 * Extends: Structure
 */
export class UserIdentityToken extends Structure implements IOpcType {

  public policyId!: UaString;

  getTypeId(): number { return 316; }
  getBinaryEncodingId(): number { return 318; }
  getXmlEncodingId(): number { return 317; }
  getJsonEncodingId(): number { return 15140; }
}

/**
 * AnonymousIdentityToken
 * NodeId: i=319
 * Extends: UserIdentityToken
 */
export class AnonymousIdentityToken extends UserIdentityToken implements IOpcType {

  getTypeId(): number { return 319; }
  getBinaryEncodingId(): number { return 321; }
  getXmlEncodingId(): number { return 320; }
  getJsonEncodingId(): number { return 15141; }
}

/**
 * UserNameIdentityToken
 * NodeId: i=322
 * Extends: UserIdentityToken
 */
export class UserNameIdentityToken extends UserIdentityToken implements IOpcType {

  public userName!: UaString;
  public password!: UaByteString;
  public encryptionAlgorithm!: UaString;

  getTypeId(): number { return 322; }
  getBinaryEncodingId(): number { return 324; }
  getXmlEncodingId(): number { return 323; }
  getJsonEncodingId(): number { return 15142; }
}

/**
 * X509IdentityToken
 * NodeId: i=325
 * Extends: UserIdentityToken
 */
export class X509IdentityToken extends UserIdentityToken implements IOpcType {

  public certificateData!: UaByteString;

  getTypeId(): number { return 325; }
  getBinaryEncodingId(): number { return 327; }
  getXmlEncodingId(): number { return 326; }
  getJsonEncodingId(): number { return 15143; }
}

/**
 * IssuedIdentityToken
 * NodeId: i=938
 * Extends: UserIdentityToken
 */
export class IssuedIdentityToken extends UserIdentityToken implements IOpcType {

  public tokenData!: UaByteString;
  public encryptionAlgorithm!: UaString;

  getTypeId(): number { return 938; }
  getBinaryEncodingId(): number { return 940; }
  getXmlEncodingId(): number { return 939; }
  getJsonEncodingId(): number { return 15144; }
}

/**
 * ActivateSessionRequest
 * NodeId: i=465
 * Extends: Structure
 */
export class ActivateSessionRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public clientSignature!: SignatureData;
  public clientSoftwareCertificates!: SignedSoftwareCertificate[];
  public localeIds!: UaString[];
  public userIdentityToken!: ExtensionObject;
  public userTokenSignature!: SignatureData;

  getTypeId(): number { return 465; }
  getBinaryEncodingId(): number { return 467; }
  getXmlEncodingId(): number { return 466; }
  getJsonEncodingId(): number { return 15145; }
}

/**
 * ActivateSessionResponse
 * NodeId: i=468
 * Extends: Structure
 */
export class ActivateSessionResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public serverNonce!: UaByteString;
  public results!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 468; }
  getBinaryEncodingId(): number { return 470; }
  getXmlEncodingId(): number { return 469; }
  getJsonEncodingId(): number { return 15146; }
}

/**
 * CloseSessionRequest
 * NodeId: i=471
 * Extends: Structure
 */
export class CloseSessionRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public deleteSubscriptions!: boolean;

  getTypeId(): number { return 471; }
  getBinaryEncodingId(): number { return 473; }
  getXmlEncodingId(): number { return 472; }
  getJsonEncodingId(): number { return 15147; }
}

/**
 * CloseSessionResponse
 * NodeId: i=474
 * Extends: Structure
 */
export class CloseSessionResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;

  getTypeId(): number { return 474; }
  getBinaryEncodingId(): number { return 476; }
  getXmlEncodingId(): number { return 475; }
  getJsonEncodingId(): number { return 15148; }
}

/**
 * CancelRequest
 * NodeId: i=477
 * Extends: Structure
 */
export class CancelRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public requestHandle!: number;

  getTypeId(): number { return 477; }
  getBinaryEncodingId(): number { return 479; }
  getXmlEncodingId(): number { return 478; }
  getJsonEncodingId(): number { return 15149; }
}

/**
 * CancelResponse
 * NodeId: i=480
 * Extends: Structure
 */
export class CancelResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public cancelCount!: number;

  getTypeId(): number { return 480; }
  getBinaryEncodingId(): number { return 482; }
  getXmlEncodingId(): number { return 481; }
  getJsonEncodingId(): number { return 15150; }
}

/**
 * NodeAttributes
 * NodeId: i=349
 * Extends: Structure
 */
export class NodeAttributes extends Structure implements IOpcType {

  public specifiedAttributes!: number;
  public displayName!: LocalizedText;
  public description!: LocalizedText;
  public writeMask!: number;
  public userWriteMask!: number;

  getTypeId(): number { return 349; }
  getBinaryEncodingId(): number { return 351; }
  getXmlEncodingId(): number { return 350; }
  getJsonEncodingId(): number { return 15151; }
}

/**
 * ObjectAttributes
 * NodeId: i=352
 * Extends: NodeAttributes
 */
export class ObjectAttributes extends NodeAttributes implements IOpcType {

  public eventNotifier!: number;

  getTypeId(): number { return 352; }
  getBinaryEncodingId(): number { return 354; }
  getXmlEncodingId(): number { return 353; }
  getJsonEncodingId(): number { return 15152; }
}

/**
 * VariableAttributes
 * NodeId: i=355
 * Extends: NodeAttributes
 */
export class VariableAttributes extends NodeAttributes implements IOpcType {

  public value!: Variant;
  public dataType!: NodeId;
  public valueRank!: number;
  public arrayDimensions!: number[];
  public accessLevel!: number;
  public userAccessLevel!: number;
  public minimumSamplingInterval!: number;
  public historizing!: boolean;

  getTypeId(): number { return 355; }
  getBinaryEncodingId(): number { return 357; }
  getXmlEncodingId(): number { return 356; }
  getJsonEncodingId(): number { return 15153; }
}

/**
 * MethodAttributes
 * NodeId: i=358
 * Extends: NodeAttributes
 */
export class MethodAttributes extends NodeAttributes implements IOpcType {

  public executable!: boolean;
  public userExecutable!: boolean;

  getTypeId(): number { return 358; }
  getBinaryEncodingId(): number { return 360; }
  getXmlEncodingId(): number { return 359; }
  getJsonEncodingId(): number { return 15157; }
}

/**
 * ObjectTypeAttributes
 * NodeId: i=361
 * Extends: NodeAttributes
 */
export class ObjectTypeAttributes extends NodeAttributes implements IOpcType {

  public isAbstract!: boolean;

  getTypeId(): number { return 361; }
  getBinaryEncodingId(): number { return 363; }
  getXmlEncodingId(): number { return 362; }
  getJsonEncodingId(): number { return 15158; }
}

/**
 * VariableTypeAttributes
 * NodeId: i=364
 * Extends: NodeAttributes
 */
export class VariableTypeAttributes extends NodeAttributes implements IOpcType {

  public value!: Variant;
  public dataType!: NodeId;
  public valueRank!: number;
  public arrayDimensions!: number[];
  public isAbstract!: boolean;

  getTypeId(): number { return 364; }
  getBinaryEncodingId(): number { return 366; }
  getXmlEncodingId(): number { return 365; }
  getJsonEncodingId(): number { return 15159; }
}

/**
 * ReferenceTypeAttributes
 * NodeId: i=367
 * Extends: NodeAttributes
 */
export class ReferenceTypeAttributes extends NodeAttributes implements IOpcType {

  public isAbstract!: boolean;
  public symmetric!: boolean;
  public inverseName!: LocalizedText;

  getTypeId(): number { return 367; }
  getBinaryEncodingId(): number { return 369; }
  getXmlEncodingId(): number { return 368; }
  getJsonEncodingId(): number { return 15160; }
}

/**
 * DataTypeAttributes
 * NodeId: i=370
 * Extends: NodeAttributes
 */
export class DataTypeAttributes extends NodeAttributes implements IOpcType {

  public isAbstract!: boolean;

  getTypeId(): number { return 370; }
  getBinaryEncodingId(): number { return 372; }
  getXmlEncodingId(): number { return 371; }
  getJsonEncodingId(): number { return 15161; }
}

/**
 * ViewAttributes
 * NodeId: i=373
 * Extends: NodeAttributes
 */
export class ViewAttributes extends NodeAttributes implements IOpcType {

  public containsNoLoops!: boolean;
  public eventNotifier!: number;

  getTypeId(): number { return 373; }
  getBinaryEncodingId(): number { return 375; }
  getXmlEncodingId(): number { return 374; }
  getJsonEncodingId(): number { return 15162; }
}

/**
 * GenericAttributeValue
 * NodeId: i=17606
 * Extends: Structure
 */
export class GenericAttributeValue extends Structure implements IOpcType {

  public attributeId!: number;
  public value!: Variant;

  getTypeId(): number { return 17606; }
  getBinaryEncodingId(): number { return 17610; }
  getXmlEncodingId(): number { return 17608; }
  getJsonEncodingId(): number { return 15163; }
}

/**
 * GenericAttributes
 * NodeId: i=17607
 * Extends: NodeAttributes
 */
export class GenericAttributes extends NodeAttributes implements IOpcType {

  public attributeValues!: GenericAttributeValue[];

  getTypeId(): number { return 17607; }
  getBinaryEncodingId(): number { return 17611; }
  getXmlEncodingId(): number { return 17609; }
  getJsonEncodingId(): number { return 15164; }
}

/**
 * AddNodesItem
 * NodeId: i=376
 * Extends: Structure
 */
export class AddNodesItem extends Structure implements IOpcType {

  public parentNodeId!: ExpandedNodeId;
  public referenceTypeId!: NodeId;
  public requestedNewNodeId!: ExpandedNodeId;
  public browseName!: QualifiedName;
  public nodeClass!: NodeClassEnum;
  public nodeAttributes!: ExtensionObject;
  public typeDefinition!: ExpandedNodeId;

  getTypeId(): number { return 376; }
  getBinaryEncodingId(): number { return 378; }
  getXmlEncodingId(): number { return 377; }
  getJsonEncodingId(): number { return 15165; }
}

/**
 * AddNodesResult
 * NodeId: i=483
 * Extends: Structure
 */
export class AddNodesResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public addedNodeId!: NodeId;

  getTypeId(): number { return 483; }
  getBinaryEncodingId(): number { return 485; }
  getXmlEncodingId(): number { return 484; }
  getJsonEncodingId(): number { return 15166; }
}

/**
 * AddNodesRequest
 * NodeId: i=486
 * Extends: Structure
 */
export class AddNodesRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public nodesToAdd!: AddNodesItem[];

  getTypeId(): number { return 486; }
  getBinaryEncodingId(): number { return 488; }
  getXmlEncodingId(): number { return 487; }
  getJsonEncodingId(): number { return 15167; }
}

/**
 * AddNodesResponse
 * NodeId: i=489
 * Extends: Structure
 */
export class AddNodesResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: AddNodesResult[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 489; }
  getBinaryEncodingId(): number { return 491; }
  getXmlEncodingId(): number { return 490; }
  getJsonEncodingId(): number { return 15168; }
}

/**
 * AddReferencesItem
 * NodeId: i=379
 * Extends: Structure
 */
export class AddReferencesItem extends Structure implements IOpcType {

  public sourceNodeId!: NodeId;
  public referenceTypeId!: NodeId;
  public isForward!: boolean;
  public targetServerUri!: UaString;
  public targetNodeId!: ExpandedNodeId;
  public targetNodeClass!: NodeClassEnum;

  getTypeId(): number { return 379; }
  getBinaryEncodingId(): number { return 381; }
  getXmlEncodingId(): number { return 380; }
  getJsonEncodingId(): number { return 15169; }
}

/**
 * AddReferencesRequest
 * NodeId: i=492
 * Extends: Structure
 */
export class AddReferencesRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public referencesToAdd!: AddReferencesItem[];

  getTypeId(): number { return 492; }
  getBinaryEncodingId(): number { return 494; }
  getXmlEncodingId(): number { return 493; }
  getJsonEncodingId(): number { return 15170; }
}

/**
 * AddReferencesResponse
 * NodeId: i=495
 * Extends: Structure
 */
export class AddReferencesResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 495; }
  getBinaryEncodingId(): number { return 497; }
  getXmlEncodingId(): number { return 496; }
  getJsonEncodingId(): number { return 15171; }
}

/**
 * DeleteNodesItem
 * NodeId: i=382
 * Extends: Structure
 */
export class DeleteNodesItem extends Structure implements IOpcType {

  public nodeId!: NodeId;
  public deleteTargetReferences!: boolean;

  getTypeId(): number { return 382; }
  getBinaryEncodingId(): number { return 384; }
  getXmlEncodingId(): number { return 383; }
  getJsonEncodingId(): number { return 15172; }
}

/**
 * DeleteNodesRequest
 * NodeId: i=498
 * Extends: Structure
 */
export class DeleteNodesRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public nodesToDelete!: DeleteNodesItem[];

  getTypeId(): number { return 498; }
  getBinaryEncodingId(): number { return 500; }
  getXmlEncodingId(): number { return 499; }
  getJsonEncodingId(): number { return 15173; }
}

/**
 * DeleteNodesResponse
 * NodeId: i=501
 * Extends: Structure
 */
export class DeleteNodesResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 501; }
  getBinaryEncodingId(): number { return 503; }
  getXmlEncodingId(): number { return 502; }
  getJsonEncodingId(): number { return 15174; }
}

/**
 * DeleteReferencesItem
 * NodeId: i=385
 * Extends: Structure
 */
export class DeleteReferencesItem extends Structure implements IOpcType {

  public sourceNodeId!: NodeId;
  public referenceTypeId!: NodeId;
  public isForward!: boolean;
  public targetNodeId!: ExpandedNodeId;
  public deleteBidirectional!: boolean;

  getTypeId(): number { return 385; }
  getBinaryEncodingId(): number { return 387; }
  getXmlEncodingId(): number { return 386; }
  getJsonEncodingId(): number { return 15175; }
}

/**
 * DeleteReferencesRequest
 * NodeId: i=504
 * Extends: Structure
 */
export class DeleteReferencesRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public referencesToDelete!: DeleteReferencesItem[];

  getTypeId(): number { return 504; }
  getBinaryEncodingId(): number { return 506; }
  getXmlEncodingId(): number { return 505; }
  getJsonEncodingId(): number { return 15176; }
}

/**
 * DeleteReferencesResponse
 * NodeId: i=507
 * Extends: Structure
 */
export class DeleteReferencesResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 507; }
  getBinaryEncodingId(): number { return 509; }
  getXmlEncodingId(): number { return 508; }
  getJsonEncodingId(): number { return 15177; }
}

/**
 * ViewDescription
 * NodeId: i=511
 * Extends: Structure
 */
export class ViewDescription extends Structure implements IOpcType {

  public viewId!: NodeId;
  public timestamp!: Date;
  public viewVersion!: number;

  getTypeId(): number { return 511; }
  getBinaryEncodingId(): number { return 513; }
  getXmlEncodingId(): number { return 512; }
  getJsonEncodingId(): number { return 15179; }
}

/**
 * BrowseDescription
 * NodeId: i=514
 * Extends: Structure
 */
export class BrowseDescription extends Structure implements IOpcType {

  public nodeId!: NodeId;
  public browseDirection!: BrowseDirectionEnum;
  public referenceTypeId!: NodeId;
  public includeSubtypes!: boolean;
  public nodeClassMask!: number;
  public resultMask!: number;

  getTypeId(): number { return 514; }
  getBinaryEncodingId(): number { return 516; }
  getXmlEncodingId(): number { return 515; }
  getJsonEncodingId(): number { return 15180; }
}

/**
 * ReferenceDescription
 * NodeId: i=518
 * Extends: Structure
 */
export class ReferenceDescription extends Structure implements IOpcType {

  public referenceTypeId!: NodeId;
  public isForward!: boolean;
  public nodeId!: ExpandedNodeId;
  public browseName!: QualifiedName;
  public displayName!: LocalizedText;
  public nodeClass!: NodeClassEnum;
  public typeDefinition!: ExpandedNodeId;

  getTypeId(): number { return 518; }
  getBinaryEncodingId(): number { return 520; }
  getXmlEncodingId(): number { return 519; }
  getJsonEncodingId(): number { return 15182; }
}

/**
 * BrowseResult
 * NodeId: i=522
 * Extends: Structure
 */
export class BrowseResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public continuationPoint!: UaByteString;
  public references!: ReferenceDescription[];

  getTypeId(): number { return 522; }
  getBinaryEncodingId(): number { return 524; }
  getXmlEncodingId(): number { return 523; }
  getJsonEncodingId(): number { return 15183; }
}

/**
 * BrowseRequest
 * NodeId: i=525
 * Extends: Structure
 */
export class BrowseRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public view!: ViewDescription;
  public requestedMaxReferencesPerNode!: number;
  public nodesToBrowse!: BrowseDescription[];

  getTypeId(): number { return 525; }
  getBinaryEncodingId(): number { return 527; }
  getXmlEncodingId(): number { return 526; }
  getJsonEncodingId(): number { return 15184; }
}

/**
 * BrowseResponse
 * NodeId: i=528
 * Extends: Structure
 */
export class BrowseResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: BrowseResult[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 528; }
  getBinaryEncodingId(): number { return 530; }
  getXmlEncodingId(): number { return 529; }
  getJsonEncodingId(): number { return 15185; }
}

/**
 * BrowseNextRequest
 * NodeId: i=531
 * Extends: Structure
 */
export class BrowseNextRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public releaseContinuationPoints!: boolean;
  public continuationPoints!: UaByteString[];

  getTypeId(): number { return 531; }
  getBinaryEncodingId(): number { return 533; }
  getXmlEncodingId(): number { return 532; }
  getJsonEncodingId(): number { return 15186; }
}

/**
 * BrowseNextResponse
 * NodeId: i=534
 * Extends: Structure
 */
export class BrowseNextResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: BrowseResult[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 534; }
  getBinaryEncodingId(): number { return 536; }
  getXmlEncodingId(): number { return 535; }
  getJsonEncodingId(): number { return 15187; }
}

/**
 * RelativePathElement
 * NodeId: i=537
 * Extends: Structure
 */
export class RelativePathElement extends Structure implements IOpcType {

  public referenceTypeId!: NodeId;
  public isInverse!: boolean;
  public includeSubtypes!: boolean;
  public targetName!: QualifiedName;

  getTypeId(): number { return 537; }
  getBinaryEncodingId(): number { return 539; }
  getXmlEncodingId(): number { return 538; }
  getJsonEncodingId(): number { return 15188; }
}

/**
 * RelativePath
 * NodeId: i=540
 * Extends: Structure
 */
export class RelativePath extends Structure implements IOpcType {

  public elements!: RelativePathElement[];

  getTypeId(): number { return 540; }
  getBinaryEncodingId(): number { return 542; }
  getXmlEncodingId(): number { return 541; }
  getJsonEncodingId(): number { return 15189; }
}

/**
 * BrowsePath
 * NodeId: i=543
 * Extends: Structure
 */
export class BrowsePath extends Structure implements IOpcType {

  public startingNode!: NodeId;
  public relativePath!: RelativePath;

  getTypeId(): number { return 543; }
  getBinaryEncodingId(): number { return 545; }
  getXmlEncodingId(): number { return 544; }
  getJsonEncodingId(): number { return 15190; }
}

/**
 * BrowsePathTarget
 * NodeId: i=546
 * Extends: Structure
 */
export class BrowsePathTarget extends Structure implements IOpcType {

  public targetId!: ExpandedNodeId;
  public remainingPathIndex!: number;

  getTypeId(): number { return 546; }
  getBinaryEncodingId(): number { return 548; }
  getXmlEncodingId(): number { return 547; }
  getJsonEncodingId(): number { return 15191; }
}

/**
 * BrowsePathResult
 * NodeId: i=549
 * Extends: Structure
 */
export class BrowsePathResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public targets!: BrowsePathTarget[];

  getTypeId(): number { return 549; }
  getBinaryEncodingId(): number { return 551; }
  getXmlEncodingId(): number { return 550; }
  getJsonEncodingId(): number { return 15192; }
}

/**
 * TranslateBrowsePathsToNodeIdsRequest
 * NodeId: i=552
 * Extends: Structure
 */
export class TranslateBrowsePathsToNodeIdsRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public browsePaths!: BrowsePath[];

  getTypeId(): number { return 552; }
  getBinaryEncodingId(): number { return 554; }
  getXmlEncodingId(): number { return 553; }
  getJsonEncodingId(): number { return 15193; }
}

/**
 * TranslateBrowsePathsToNodeIdsResponse
 * NodeId: i=555
 * Extends: Structure
 */
export class TranslateBrowsePathsToNodeIdsResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: BrowsePathResult[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 555; }
  getBinaryEncodingId(): number { return 557; }
  getXmlEncodingId(): number { return 556; }
  getJsonEncodingId(): number { return 15194; }
}

/**
 * RegisterNodesRequest
 * NodeId: i=558
 * Extends: Structure
 */
export class RegisterNodesRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public nodesToRegister!: NodeId[];

  getTypeId(): number { return 558; }
  getBinaryEncodingId(): number { return 560; }
  getXmlEncodingId(): number { return 559; }
  getJsonEncodingId(): number { return 15195; }
}

/**
 * RegisterNodesResponse
 * NodeId: i=561
 * Extends: Structure
 */
export class RegisterNodesResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public registeredNodeIds!: NodeId[];

  getTypeId(): number { return 561; }
  getBinaryEncodingId(): number { return 563; }
  getXmlEncodingId(): number { return 562; }
  getJsonEncodingId(): number { return 15196; }
}

/**
 * UnregisterNodesRequest
 * NodeId: i=564
 * Extends: Structure
 */
export class UnregisterNodesRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public nodesToUnregister!: NodeId[];

  getTypeId(): number { return 564; }
  getBinaryEncodingId(): number { return 566; }
  getXmlEncodingId(): number { return 565; }
  getJsonEncodingId(): number { return 15197; }
}

/**
 * UnregisterNodesResponse
 * NodeId: i=567
 * Extends: Structure
 */
export class UnregisterNodesResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;

  getTypeId(): number { return 567; }
  getBinaryEncodingId(): number { return 569; }
  getXmlEncodingId(): number { return 568; }
  getJsonEncodingId(): number { return 15198; }
}

/**
 * EndpointConfiguration
 * NodeId: i=331
 * Extends: Structure
 */
export class EndpointConfiguration extends Structure implements IOpcType {

  public operationTimeout!: number;
  public useBinaryEncoding!: boolean;
  public maxStringLength!: number;
  public maxByteStringLength!: number;
  public maxArrayLength!: number;
  public maxMessageSize!: number;
  public maxBufferSize!: number;
  public channelLifetime!: number;
  public securityTokenLifetime!: number;

  getTypeId(): number { return 331; }
  getBinaryEncodingId(): number { return 333; }
  getXmlEncodingId(): number { return 332; }
  getJsonEncodingId(): number { return 15199; }
}

/**
 * QueryDataDescription
 * NodeId: i=570
 * Extends: Structure
 */
export class QueryDataDescription extends Structure implements IOpcType {

  public relativePath!: RelativePath;
  public attributeId!: number;
  public indexRange!: UaString;

  getTypeId(): number { return 570; }
  getBinaryEncodingId(): number { return 572; }
  getXmlEncodingId(): number { return 571; }
  getJsonEncodingId(): number { return 15200; }
}

/**
 * NodeTypeDescription
 * NodeId: i=573
 * Extends: Structure
 */
export class NodeTypeDescription extends Structure implements IOpcType {

  public typeDefinitionNode!: ExpandedNodeId;
  public includeSubTypes!: boolean;
  public dataToReturn!: QueryDataDescription[];

  getTypeId(): number { return 573; }
  getBinaryEncodingId(): number { return 575; }
  getXmlEncodingId(): number { return 574; }
  getJsonEncodingId(): number { return 15201; }
}

/**
 * QueryDataSet
 * NodeId: i=577
 * Extends: Structure
 */
export class QueryDataSet extends Structure implements IOpcType {

  public nodeId!: ExpandedNodeId;
  public typeDefinitionNode!: ExpandedNodeId;
  public values!: Variant[];

  getTypeId(): number { return 577; }
  getBinaryEncodingId(): number { return 579; }
  getXmlEncodingId(): number { return 578; }
  getJsonEncodingId(): number { return 15202; }
}

/**
 * NodeReference
 * NodeId: i=580
 * Extends: Structure
 */
export class NodeReference extends Structure implements IOpcType {

  public nodeId!: NodeId;
  public referenceTypeId!: NodeId;
  public isForward!: boolean;
  public referencedNodeIds!: NodeId[];

  getTypeId(): number { return 580; }
  getBinaryEncodingId(): number { return 582; }
  getXmlEncodingId(): number { return 581; }
  getJsonEncodingId(): number { return 15203; }
}

/**
 * ContentFilterElement
 * NodeId: i=583
 * Extends: Structure
 */
export class ContentFilterElement extends Structure implements IOpcType {

  public filterOperator!: FilterOperatorEnum;
  public filterOperands!: ExtensionObject[];

  getTypeId(): number { return 583; }
  getBinaryEncodingId(): number { return 585; }
  getXmlEncodingId(): number { return 584; }
  getJsonEncodingId(): number { return 15204; }
}

/**
 * ContentFilter
 * NodeId: i=586
 * Extends: Structure
 */
export class ContentFilter extends Structure implements IOpcType {

  public elements!: ContentFilterElement[];

  getTypeId(): number { return 586; }
  getBinaryEncodingId(): number { return 588; }
  getXmlEncodingId(): number { return 587; }
  getJsonEncodingId(): number { return 15205; }
}

/**
 * FilterOperand
 * NodeId: i=589
 * Extends: Structure
 */
export class FilterOperand extends Structure implements IOpcType {

  getTypeId(): number { return 589; }
  getBinaryEncodingId(): number { return 591; }
  getXmlEncodingId(): number { return 590; }
  getJsonEncodingId(): number { return 15206; }
}

/**
 * ElementOperand
 * NodeId: i=592
 * Extends: FilterOperand
 */
export class ElementOperand extends FilterOperand implements IOpcType {

  public index!: number;

  getTypeId(): number { return 592; }
  getBinaryEncodingId(): number { return 594; }
  getXmlEncodingId(): number { return 593; }
  getJsonEncodingId(): number { return 15207; }
}

/**
 * LiteralOperand
 * NodeId: i=595
 * Extends: FilterOperand
 */
export class LiteralOperand extends FilterOperand implements IOpcType {

  public value!: Variant;

  getTypeId(): number { return 595; }
  getBinaryEncodingId(): number { return 597; }
  getXmlEncodingId(): number { return 596; }
  getJsonEncodingId(): number { return 15208; }
}

/**
 * AttributeOperand
 * NodeId: i=598
 * Extends: FilterOperand
 */
export class AttributeOperand extends FilterOperand implements IOpcType {

  public nodeId!: NodeId;
  public alias!: UaString;
  public browsePath!: RelativePath;
  public attributeId!: number;
  public indexRange!: UaString;

  getTypeId(): number { return 598; }
  getBinaryEncodingId(): number { return 600; }
  getXmlEncodingId(): number { return 599; }
  getJsonEncodingId(): number { return 15209; }
}

/**
 * SimpleAttributeOperand
 * NodeId: i=601
 * Extends: FilterOperand
 */
export class SimpleAttributeOperand extends FilterOperand implements IOpcType {

  public typeDefinitionId!: NodeId;
  public browsePath!: QualifiedName[];
  public attributeId!: number;
  public indexRange!: UaString;

  getTypeId(): number { return 601; }
  getBinaryEncodingId(): number { return 603; }
  getXmlEncodingId(): number { return 602; }
  getJsonEncodingId(): number { return 15210; }
}

/**
 * ContentFilterElementResult
 * NodeId: i=604
 * Extends: Structure
 */
export class ContentFilterElementResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public operandStatusCodes!: StatusCode[];
  public operandDiagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 604; }
  getBinaryEncodingId(): number { return 606; }
  getXmlEncodingId(): number { return 605; }
  getJsonEncodingId(): number { return 15211; }
}

/**
 * ContentFilterResult
 * NodeId: i=607
 * Extends: Structure
 */
export class ContentFilterResult extends Structure implements IOpcType {

  public elementResults!: ContentFilterElementResult[];
  public elementDiagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 607; }
  getBinaryEncodingId(): number { return 609; }
  getXmlEncodingId(): number { return 608; }
  getJsonEncodingId(): number { return 15228; }
}

/**
 * ParsingResult
 * NodeId: i=610
 * Extends: Structure
 */
export class ParsingResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public dataStatusCodes!: StatusCode[];
  public dataDiagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 610; }
  getBinaryEncodingId(): number { return 612; }
  getXmlEncodingId(): number { return 611; }
  getJsonEncodingId(): number { return 15236; }
}

/**
 * QueryFirstRequest
 * NodeId: i=613
 * Extends: Structure
 */
export class QueryFirstRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public view!: ViewDescription;
  public nodeTypes!: NodeTypeDescription[];
  public filter!: ContentFilter;
  public maxDataSetsToReturn!: number;
  public maxReferencesToReturn!: number;

  getTypeId(): number { return 613; }
  getBinaryEncodingId(): number { return 615; }
  getXmlEncodingId(): number { return 614; }
  getJsonEncodingId(): number { return 15244; }
}

/**
 * QueryFirstResponse
 * NodeId: i=616
 * Extends: Structure
 */
export class QueryFirstResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public queryDataSets!: QueryDataSet[];
  public continuationPoint!: UaByteString;
  public parsingResults!: ParsingResult[];
  public diagnosticInfos!: DiagnosticInfo[];
  public filterResult!: ContentFilterResult;

  getTypeId(): number { return 616; }
  getBinaryEncodingId(): number { return 618; }
  getXmlEncodingId(): number { return 617; }
  getJsonEncodingId(): number { return 15252; }
}

/**
 * QueryNextRequest
 * NodeId: i=619
 * Extends: Structure
 */
export class QueryNextRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public releaseContinuationPoint!: boolean;
  public continuationPoint!: UaByteString;

  getTypeId(): number { return 619; }
  getBinaryEncodingId(): number { return 621; }
  getXmlEncodingId(): number { return 620; }
  getJsonEncodingId(): number { return 15254; }
}

/**
 * QueryNextResponse
 * NodeId: i=622
 * Extends: Structure
 */
export class QueryNextResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public queryDataSets!: QueryDataSet[];
  public revisedContinuationPoint!: UaByteString;

  getTypeId(): number { return 622; }
  getBinaryEncodingId(): number { return 624; }
  getXmlEncodingId(): number { return 623; }
  getJsonEncodingId(): number { return 15255; }
}

/**
 * ReadValueId
 * NodeId: i=626
 * Extends: Structure
 */
export class ReadValueId extends Structure implements IOpcType {

  public nodeId!: NodeId;
  public attributeId!: number;
  public indexRange!: UaString;
  public dataEncoding!: QualifiedName;

  getTypeId(): number { return 626; }
  getBinaryEncodingId(): number { return 628; }
  getXmlEncodingId(): number { return 627; }
  getJsonEncodingId(): number { return 15256; }
}

/**
 * ReadRequest
 * NodeId: i=629
 * Extends: Structure
 */
export class ReadRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public maxAge!: number;
  public timestampsToReturn!: TimestampsToReturnEnum;
  public nodesToRead!: ReadValueId[];

  getTypeId(): number { return 629; }
  getBinaryEncodingId(): number { return 631; }
  getXmlEncodingId(): number { return 630; }
  getJsonEncodingId(): number { return 15257; }
}

/**
 * ReadResponse
 * NodeId: i=632
 * Extends: Structure
 */
export class ReadResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: DataValue[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 632; }
  getBinaryEncodingId(): number { return 634; }
  getXmlEncodingId(): number { return 633; }
  getJsonEncodingId(): number { return 15258; }
}

/**
 * HistoryReadValueId
 * NodeId: i=635
 * Extends: Structure
 */
export class HistoryReadValueId extends Structure implements IOpcType {

  public nodeId!: NodeId;
  public indexRange!: UaString;
  public dataEncoding!: QualifiedName;
  public continuationPoint!: UaByteString;

  getTypeId(): number { return 635; }
  getBinaryEncodingId(): number { return 637; }
  getXmlEncodingId(): number { return 636; }
  getJsonEncodingId(): number { return 15259; }
}

/**
 * HistoryReadResult
 * NodeId: i=638
 * Extends: Structure
 */
export class HistoryReadResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public continuationPoint!: UaByteString;
  public historyData!: ExtensionObject;

  getTypeId(): number { return 638; }
  getBinaryEncodingId(): number { return 640; }
  getXmlEncodingId(): number { return 639; }
  getJsonEncodingId(): number { return 15260; }
}

/**
 * HistoryReadDetails
 * NodeId: i=641
 * Extends: Structure
 */
export class HistoryReadDetails extends Structure implements IOpcType {

  getTypeId(): number { return 641; }
  getBinaryEncodingId(): number { return 643; }
  getXmlEncodingId(): number { return 642; }
  getJsonEncodingId(): number { return 15261; }
}

/**
 * ReadEventDetails
 * NodeId: i=644
 * Extends: HistoryReadDetails
 */
export class ReadEventDetails extends HistoryReadDetails implements IOpcType {

  public numValuesPerNode!: number;
  public startTime!: Date;
  public endTime!: Date;
  public filter!: EventFilter;

  getTypeId(): number { return 644; }
  getBinaryEncodingId(): number { return 646; }
  getXmlEncodingId(): number { return 645; }
  getJsonEncodingId(): number { return 15262; }
}

/**
 * ReadEventDetails2
 * NodeId: i=32799
 * Extends: ReadEventDetails
 */
export class ReadEventDetails2 extends ReadEventDetails implements IOpcType {

  public readModified!: boolean;

  getTypeId(): number { return 32799; }
  getBinaryEncodingId(): number { return 32800; }
  getXmlEncodingId(): number { return 32801; }
  getJsonEncodingId(): number { return 32802; }
}

/**
 * SortRuleElement
 * NodeId: i=18648
 * Extends: Structure
 */
export class SortRuleElement extends Structure implements IOpcType {

  public sortOrder!: SortOrderTypeEnum;
  public eventField!: SimpleAttributeOperand;

  getTypeId(): number { return 18648; }
  getBinaryEncodingId(): number { return 18650; }
  getXmlEncodingId(): number { return 18652; }
  getJsonEncodingId(): number { return 18654; }
}

/**
 * ReadEventDetailsSorted
 * NodeId: i=18649
 * Extends: ReadEventDetails
 */
export class ReadEventDetailsSorted extends ReadEventDetails implements IOpcType {

  public sortClause!: SortRuleElement[];

  getTypeId(): number { return 18649; }
  getBinaryEncodingId(): number { return 18651; }
  getXmlEncodingId(): number { return 18653; }
  getJsonEncodingId(): number { return 18655; }
}

/**
 * ReadRawModifiedDetails
 * NodeId: i=647
 * Extends: HistoryReadDetails
 */
export class ReadRawModifiedDetails extends HistoryReadDetails implements IOpcType {

  public isReadModified!: boolean;
  public startTime!: Date;
  public endTime!: Date;
  public numValuesPerNode!: number;
  public returnBounds!: boolean;

  getTypeId(): number { return 647; }
  getBinaryEncodingId(): number { return 649; }
  getXmlEncodingId(): number { return 648; }
  getJsonEncodingId(): number { return 15263; }
}

/**
 * ReadProcessedDetails
 * NodeId: i=650
 * Extends: HistoryReadDetails
 */
export class ReadProcessedDetails extends HistoryReadDetails implements IOpcType {

  public startTime!: Date;
  public endTime!: Date;
  public processingInterval!: number;
  public aggregateType!: NodeId[];
  public aggregateConfiguration!: AggregateConfiguration;

  getTypeId(): number { return 650; }
  getBinaryEncodingId(): number { return 652; }
  getXmlEncodingId(): number { return 651; }
  getJsonEncodingId(): number { return 15264; }
}

/**
 * ReadAtTimeDetails
 * NodeId: i=653
 * Extends: HistoryReadDetails
 */
export class ReadAtTimeDetails extends HistoryReadDetails implements IOpcType {

  public reqTimes!: Date[];
  public useSimpleBounds!: boolean;

  getTypeId(): number { return 653; }
  getBinaryEncodingId(): number { return 655; }
  getXmlEncodingId(): number { return 654; }
  getJsonEncodingId(): number { return 15269; }
}

/**
 * ReadAnnotationDataDetails
 * NodeId: i=23497
 * Extends: HistoryReadDetails
 */
export class ReadAnnotationDataDetails extends HistoryReadDetails implements IOpcType {

  public reqTimes!: Date[];

  getTypeId(): number { return 23497; }
  getBinaryEncodingId(): number { return 23500; }
  getXmlEncodingId(): number { return 23506; }
  getJsonEncodingId(): number { return 23512; }
}

/**
 * HistoryData
 * NodeId: i=656
 * Extends: Structure
 */
export class HistoryData extends Structure implements IOpcType {

  public dataValues!: DataValue[];

  getTypeId(): number { return 656; }
  getBinaryEncodingId(): number { return 658; }
  getXmlEncodingId(): number { return 657; }
  getJsonEncodingId(): number { return 15270; }
}

/**
 * ModificationInfo
 * NodeId: i=11216
 * Extends: Structure
 */
export class ModificationInfo extends Structure implements IOpcType {

  public modificationTime!: Date;
  public updateType!: HistoryUpdateTypeEnum;
  public userName!: UaString;

  getTypeId(): number { return 11216; }
  getBinaryEncodingId(): number { return 11226; }
  getXmlEncodingId(): number { return 11218; }
  getJsonEncodingId(): number { return 15271; }
}

/**
 * HistoryModifiedData
 * NodeId: i=11217
 * Extends: HistoryData
 */
export class HistoryModifiedData extends HistoryData implements IOpcType {

  public modificationInfos!: ModificationInfo[];

  getTypeId(): number { return 11217; }
  getBinaryEncodingId(): number { return 11227; }
  getXmlEncodingId(): number { return 11219; }
  getJsonEncodingId(): number { return 15272; }
}

/**
 * HistoryEvent
 * NodeId: i=659
 * Extends: Structure
 */
export class HistoryEvent extends Structure implements IOpcType {

  public events!: HistoryEventFieldList[];

  getTypeId(): number { return 659; }
  getBinaryEncodingId(): number { return 661; }
  getXmlEncodingId(): number { return 660; }
  getJsonEncodingId(): number { return 15273; }
}

/**
 * HistoryModifiedEvent
 * NodeId: i=32824
 * Extends: HistoryEvent
 */
export class HistoryModifiedEvent extends HistoryEvent implements IOpcType {

  public modificationInfos!: ModificationInfo[];

  getTypeId(): number { return 32824; }
  getBinaryEncodingId(): number { return 32825; }
  getXmlEncodingId(): number { return 32829; }
  getJsonEncodingId(): number { return 32833; }
}

/**
 * HistoryReadRequest
 * NodeId: i=662
 * Extends: Structure
 */
export class HistoryReadRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public historyReadDetails!: ExtensionObject;
  public timestampsToReturn!: TimestampsToReturnEnum;
  public releaseContinuationPoints!: boolean;
  public nodesToRead!: HistoryReadValueId[];

  getTypeId(): number { return 662; }
  getBinaryEncodingId(): number { return 664; }
  getXmlEncodingId(): number { return 663; }
  getJsonEncodingId(): number { return 15274; }
}

/**
 * HistoryReadResponse
 * NodeId: i=665
 * Extends: Structure
 */
export class HistoryReadResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: HistoryReadResult[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 665; }
  getBinaryEncodingId(): number { return 667; }
  getXmlEncodingId(): number { return 666; }
  getJsonEncodingId(): number { return 15275; }
}

/**
 * WriteValue
 * NodeId: i=668
 * Extends: Structure
 */
export class WriteValue extends Structure implements IOpcType {

  public nodeId!: NodeId;
  public attributeId!: number;
  public indexRange!: UaString;
  public value!: DataValue;

  getTypeId(): number { return 668; }
  getBinaryEncodingId(): number { return 670; }
  getXmlEncodingId(): number { return 669; }
  getJsonEncodingId(): number { return 15276; }
}

/**
 * WriteRequest
 * NodeId: i=671
 * Extends: Structure
 */
export class WriteRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public nodesToWrite!: WriteValue[];

  getTypeId(): number { return 671; }
  getBinaryEncodingId(): number { return 673; }
  getXmlEncodingId(): number { return 672; }
  getJsonEncodingId(): number { return 15277; }
}

/**
 * WriteResponse
 * NodeId: i=674
 * Extends: Structure
 */
export class WriteResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 674; }
  getBinaryEncodingId(): number { return 676; }
  getXmlEncodingId(): number { return 675; }
  getJsonEncodingId(): number { return 15278; }
}

/**
 * HistoryUpdateDetails
 * NodeId: i=677
 * Extends: Structure
 */
export class HistoryUpdateDetails extends Structure implements IOpcType {

  getTypeId(): number { return 677; }
  getBinaryEncodingId(): number { return 679; }
  getXmlEncodingId(): number { return 678; }
  getJsonEncodingId(): number { return 15279; }
}

/**
 * UpdateDataDetails
 * NodeId: i=680
 * Extends: HistoryUpdateDetails
 */
export class UpdateDataDetails extends HistoryUpdateDetails implements IOpcType {

  public nodeId!: NodeId;
  public performInsertReplace!: PerformUpdateTypeEnum;
  public updateValues!: DataValue[];

  getTypeId(): number { return 680; }
  getBinaryEncodingId(): number { return 682; }
  getXmlEncodingId(): number { return 681; }
  getJsonEncodingId(): number { return 15280; }
}

/**
 * UpdateStructureDataDetails
 * NodeId: i=11295
 * Extends: HistoryUpdateDetails
 */
export class UpdateStructureDataDetails extends HistoryUpdateDetails implements IOpcType {

  public nodeId!: NodeId;
  public performInsertReplace!: PerformUpdateTypeEnum;
  public updateValues!: DataValue[];

  getTypeId(): number { return 11295; }
  getBinaryEncodingId(): number { return 11300; }
  getXmlEncodingId(): number { return 11296; }
  getJsonEncodingId(): number { return 15281; }
}

/**
 * UpdateEventDetails
 * NodeId: i=683
 * Extends: HistoryUpdateDetails
 */
export class UpdateEventDetails extends HistoryUpdateDetails implements IOpcType {

  public nodeId!: NodeId;
  public performInsertReplace!: PerformUpdateTypeEnum;
  public filter!: EventFilter;
  public eventData!: HistoryEventFieldList[];

  getTypeId(): number { return 683; }
  getBinaryEncodingId(): number { return 685; }
  getXmlEncodingId(): number { return 684; }
  getJsonEncodingId(): number { return 15282; }
}

/**
 * DeleteRawModifiedDetails
 * NodeId: i=686
 * Extends: HistoryUpdateDetails
 */
export class DeleteRawModifiedDetails extends HistoryUpdateDetails implements IOpcType {

  public nodeId!: NodeId;
  public isDeleteModified!: boolean;
  public startTime!: Date;
  public endTime!: Date;

  getTypeId(): number { return 686; }
  getBinaryEncodingId(): number { return 688; }
  getXmlEncodingId(): number { return 687; }
  getJsonEncodingId(): number { return 15283; }
}

/**
 * DeleteAtTimeDetails
 * NodeId: i=689
 * Extends: HistoryUpdateDetails
 */
export class DeleteAtTimeDetails extends HistoryUpdateDetails implements IOpcType {

  public nodeId!: NodeId;
  public reqTimes!: Date[];

  getTypeId(): number { return 689; }
  getBinaryEncodingId(): number { return 691; }
  getXmlEncodingId(): number { return 690; }
  getJsonEncodingId(): number { return 15284; }
}

/**
 * DeleteEventDetails
 * NodeId: i=692
 * Extends: HistoryUpdateDetails
 */
export class DeleteEventDetails extends HistoryUpdateDetails implements IOpcType {

  public nodeId!: NodeId;
  public eventIds!: UaByteString[];

  getTypeId(): number { return 692; }
  getBinaryEncodingId(): number { return 694; }
  getXmlEncodingId(): number { return 693; }
  getJsonEncodingId(): number { return 15285; }
}

/**
 * HistoryUpdateResult
 * NodeId: i=695
 * Extends: Structure
 */
export class HistoryUpdateResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public operationResults!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 695; }
  getBinaryEncodingId(): number { return 697; }
  getXmlEncodingId(): number { return 696; }
  getJsonEncodingId(): number { return 15286; }
}

/**
 * HistoryUpdateRequest
 * NodeId: i=698
 * Extends: Structure
 */
export class HistoryUpdateRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public historyUpdateDetails!: ExtensionObject[];

  getTypeId(): number { return 698; }
  getBinaryEncodingId(): number { return 700; }
  getXmlEncodingId(): number { return 699; }
  getJsonEncodingId(): number { return 15287; }
}

/**
 * HistoryUpdateResponse
 * NodeId: i=701
 * Extends: Structure
 */
export class HistoryUpdateResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: HistoryUpdateResult[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 701; }
  getBinaryEncodingId(): number { return 703; }
  getXmlEncodingId(): number { return 702; }
  getJsonEncodingId(): number { return 15288; }
}

/**
 * CallMethodRequest
 * NodeId: i=704
 * Extends: Structure
 */
export class CallMethodRequest extends Structure implements IOpcType {

  public objectId!: NodeId;
  public methodId!: NodeId;
  public inputArguments!: Variant[];

  getTypeId(): number { return 704; }
  getBinaryEncodingId(): number { return 706; }
  getXmlEncodingId(): number { return 705; }
  getJsonEncodingId(): number { return 15289; }
}

/**
 * CallMethodResult
 * NodeId: i=707
 * Extends: Structure
 */
export class CallMethodResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public inputArgumentResults!: StatusCode[];
  public inputArgumentDiagnosticInfos!: DiagnosticInfo[];
  public outputArguments!: Variant[];

  getTypeId(): number { return 707; }
  getBinaryEncodingId(): number { return 709; }
  getXmlEncodingId(): number { return 708; }
  getJsonEncodingId(): number { return 15290; }
}

/**
 * CallRequest
 * NodeId: i=710
 * Extends: Structure
 */
export class CallRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public methodsToCall!: CallMethodRequest[];

  getTypeId(): number { return 710; }
  getBinaryEncodingId(): number { return 712; }
  getXmlEncodingId(): number { return 711; }
  getJsonEncodingId(): number { return 15291; }
}

/**
 * CallResponse
 * NodeId: i=713
 * Extends: Structure
 */
export class CallResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: CallMethodResult[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 713; }
  getBinaryEncodingId(): number { return 715; }
  getXmlEncodingId(): number { return 714; }
  getJsonEncodingId(): number { return 15292; }
}

/**
 * MonitoringFilter
 * NodeId: i=719
 * Extends: Structure
 */
export class MonitoringFilter extends Structure implements IOpcType {

  getTypeId(): number { return 719; }
  getBinaryEncodingId(): number { return 721; }
  getXmlEncodingId(): number { return 720; }
  getJsonEncodingId(): number { return 15293; }
}

/**
 * DataChangeFilter
 * NodeId: i=722
 * Extends: MonitoringFilter
 */
export class DataChangeFilter extends MonitoringFilter implements IOpcType {

  public trigger!: DataChangeTriggerEnum;
  public deadbandType!: number;
  public deadbandValue!: number;

  getTypeId(): number { return 722; }
  getBinaryEncodingId(): number { return 724; }
  getXmlEncodingId(): number { return 723; }
  getJsonEncodingId(): number { return 15294; }
}

/**
 * EventFilter
 * NodeId: i=725
 * Extends: MonitoringFilter
 */
export class EventFilter extends MonitoringFilter implements IOpcType {

  public selectClauses!: SimpleAttributeOperand[];
  public whereClause!: ContentFilter;

  getTypeId(): number { return 725; }
  getBinaryEncodingId(): number { return 727; }
  getXmlEncodingId(): number { return 726; }
  getJsonEncodingId(): number { return 15295; }
}

/**
 * AggregateConfiguration
 * NodeId: i=948
 * Extends: Structure
 */
export class AggregateConfiguration extends Structure implements IOpcType {

  public useServerCapabilitiesDefaults!: boolean;
  public treatUncertainAsBad!: boolean;
  public percentDataBad!: number;
  public percentDataGood!: number;
  public useSlopedExtrapolation!: boolean;

  getTypeId(): number { return 948; }
  getBinaryEncodingId(): number { return 950; }
  getXmlEncodingId(): number { return 949; }
  getJsonEncodingId(): number { return 15304; }
}

/**
 * AggregateFilter
 * NodeId: i=728
 * Extends: MonitoringFilter
 */
export class AggregateFilter extends MonitoringFilter implements IOpcType {

  public startTime!: Date;
  public aggregateType!: NodeId;
  public processingInterval!: number;
  public aggregateConfiguration!: AggregateConfiguration;

  getTypeId(): number { return 728; }
  getBinaryEncodingId(): number { return 730; }
  getXmlEncodingId(): number { return 729; }
  getJsonEncodingId(): number { return 15312; }
}

/**
 * MonitoringFilterResult
 * NodeId: i=731
 * Extends: Structure
 */
export class MonitoringFilterResult extends Structure implements IOpcType {

  getTypeId(): number { return 731; }
  getBinaryEncodingId(): number { return 733; }
  getXmlEncodingId(): number { return 732; }
  getJsonEncodingId(): number { return 15313; }
}

/**
 * EventFilterResult
 * NodeId: i=734
 * Extends: MonitoringFilterResult
 */
export class EventFilterResult extends MonitoringFilterResult implements IOpcType {

  public selectClauseResults!: StatusCode[];
  public selectClauseDiagnosticInfos!: DiagnosticInfo[];
  public whereClauseResult!: ContentFilterResult;

  getTypeId(): number { return 734; }
  getBinaryEncodingId(): number { return 736; }
  getXmlEncodingId(): number { return 735; }
  getJsonEncodingId(): number { return 15314; }
}

/**
 * AggregateFilterResult
 * NodeId: i=737
 * Extends: MonitoringFilterResult
 */
export class AggregateFilterResult extends MonitoringFilterResult implements IOpcType {

  public revisedStartTime!: Date;
  public revisedProcessingInterval!: number;
  public revisedAggregateConfiguration!: AggregateConfiguration;

  getTypeId(): number { return 737; }
  getBinaryEncodingId(): number { return 739; }
  getXmlEncodingId(): number { return 738; }
  getJsonEncodingId(): number { return 15315; }
}

/**
 * MonitoringParameters
 * NodeId: i=740
 * Extends: Structure
 */
export class MonitoringParameters extends Structure implements IOpcType {

  public clientHandle!: number;
  public samplingInterval!: number;
  public filter!: ExtensionObject;
  public queueSize!: number;
  public discardOldest!: boolean;

  getTypeId(): number { return 740; }
  getBinaryEncodingId(): number { return 742; }
  getXmlEncodingId(): number { return 741; }
  getJsonEncodingId(): number { return 15320; }
}

/**
 * MonitoredItemCreateRequest
 * NodeId: i=743
 * Extends: Structure
 */
export class MonitoredItemCreateRequest extends Structure implements IOpcType {

  public itemToMonitor!: ReadValueId;
  public monitoringMode!: MonitoringModeEnum;
  public requestedParameters!: MonitoringParameters;

  getTypeId(): number { return 743; }
  getBinaryEncodingId(): number { return 745; }
  getXmlEncodingId(): number { return 744; }
  getJsonEncodingId(): number { return 15321; }
}

/**
 * MonitoredItemCreateResult
 * NodeId: i=746
 * Extends: Structure
 */
export class MonitoredItemCreateResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public monitoredItemId!: number;
  public revisedSamplingInterval!: number;
  public revisedQueueSize!: number;
  public filterResult!: ExtensionObject;

  getTypeId(): number { return 746; }
  getBinaryEncodingId(): number { return 748; }
  getXmlEncodingId(): number { return 747; }
  getJsonEncodingId(): number { return 15322; }
}

/**
 * CreateMonitoredItemsRequest
 * NodeId: i=749
 * Extends: Structure
 */
export class CreateMonitoredItemsRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public subscriptionId!: number;
  public timestampsToReturn!: TimestampsToReturnEnum;
  public itemsToCreate!: MonitoredItemCreateRequest[];

  getTypeId(): number { return 749; }
  getBinaryEncodingId(): number { return 751; }
  getXmlEncodingId(): number { return 750; }
  getJsonEncodingId(): number { return 15323; }
}

/**
 * CreateMonitoredItemsResponse
 * NodeId: i=752
 * Extends: Structure
 */
export class CreateMonitoredItemsResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: MonitoredItemCreateResult[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 752; }
  getBinaryEncodingId(): number { return 754; }
  getXmlEncodingId(): number { return 753; }
  getJsonEncodingId(): number { return 15324; }
}

/**
 * MonitoredItemModifyRequest
 * NodeId: i=755
 * Extends: Structure
 */
export class MonitoredItemModifyRequest extends Structure implements IOpcType {

  public monitoredItemId!: number;
  public requestedParameters!: MonitoringParameters;

  getTypeId(): number { return 755; }
  getBinaryEncodingId(): number { return 757; }
  getXmlEncodingId(): number { return 756; }
  getJsonEncodingId(): number { return 15325; }
}

/**
 * MonitoredItemModifyResult
 * NodeId: i=758
 * Extends: Structure
 */
export class MonitoredItemModifyResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public revisedSamplingInterval!: number;
  public revisedQueueSize!: number;
  public filterResult!: ExtensionObject;

  getTypeId(): number { return 758; }
  getBinaryEncodingId(): number { return 760; }
  getXmlEncodingId(): number { return 759; }
  getJsonEncodingId(): number { return 15326; }
}

/**
 * ModifyMonitoredItemsRequest
 * NodeId: i=761
 * Extends: Structure
 */
export class ModifyMonitoredItemsRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public subscriptionId!: number;
  public timestampsToReturn!: TimestampsToReturnEnum;
  public itemsToModify!: MonitoredItemModifyRequest[];

  getTypeId(): number { return 761; }
  getBinaryEncodingId(): number { return 763; }
  getXmlEncodingId(): number { return 762; }
  getJsonEncodingId(): number { return 15327; }
}

/**
 * ModifyMonitoredItemsResponse
 * NodeId: i=764
 * Extends: Structure
 */
export class ModifyMonitoredItemsResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: MonitoredItemModifyResult[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 764; }
  getBinaryEncodingId(): number { return 766; }
  getXmlEncodingId(): number { return 765; }
  getJsonEncodingId(): number { return 15328; }
}

/**
 * SetMonitoringModeRequest
 * NodeId: i=767
 * Extends: Structure
 */
export class SetMonitoringModeRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public subscriptionId!: number;
  public monitoringMode!: MonitoringModeEnum;
  public monitoredItemIds!: number[];

  getTypeId(): number { return 767; }
  getBinaryEncodingId(): number { return 769; }
  getXmlEncodingId(): number { return 768; }
  getJsonEncodingId(): number { return 15329; }
}

/**
 * SetMonitoringModeResponse
 * NodeId: i=770
 * Extends: Structure
 */
export class SetMonitoringModeResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 770; }
  getBinaryEncodingId(): number { return 772; }
  getXmlEncodingId(): number { return 771; }
  getJsonEncodingId(): number { return 15331; }
}

/**
 * SetTriggeringRequest
 * NodeId: i=773
 * Extends: Structure
 */
export class SetTriggeringRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public subscriptionId!: number;
  public triggeringItemId!: number;
  public linksToAdd!: number[];
  public linksToRemove!: number[];

  getTypeId(): number { return 773; }
  getBinaryEncodingId(): number { return 775; }
  getXmlEncodingId(): number { return 774; }
  getJsonEncodingId(): number { return 15332; }
}

/**
 * SetTriggeringResponse
 * NodeId: i=776
 * Extends: Structure
 */
export class SetTriggeringResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public addResults!: StatusCode[];
  public addDiagnosticInfos!: DiagnosticInfo[];
  public removeResults!: StatusCode[];
  public removeDiagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 776; }
  getBinaryEncodingId(): number { return 778; }
  getXmlEncodingId(): number { return 777; }
  getJsonEncodingId(): number { return 15333; }
}

/**
 * DeleteMonitoredItemsRequest
 * NodeId: i=779
 * Extends: Structure
 */
export class DeleteMonitoredItemsRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public subscriptionId!: number;
  public monitoredItemIds!: number[];

  getTypeId(): number { return 779; }
  getBinaryEncodingId(): number { return 781; }
  getXmlEncodingId(): number { return 780; }
  getJsonEncodingId(): number { return 15335; }
}

/**
 * DeleteMonitoredItemsResponse
 * NodeId: i=782
 * Extends: Structure
 */
export class DeleteMonitoredItemsResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 782; }
  getBinaryEncodingId(): number { return 784; }
  getXmlEncodingId(): number { return 783; }
  getJsonEncodingId(): number { return 15336; }
}

/**
 * CreateSubscriptionRequest
 * NodeId: i=785
 * Extends: Structure
 */
export class CreateSubscriptionRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public requestedPublishingInterval!: number;
  public requestedLifetimeCount!: number;
  public requestedMaxKeepAliveCount!: number;
  public maxNotificationsPerPublish!: number;
  public publishingEnabled!: boolean;
  public priority!: number;

  getTypeId(): number { return 785; }
  getBinaryEncodingId(): number { return 787; }
  getXmlEncodingId(): number { return 786; }
  getJsonEncodingId(): number { return 15337; }
}

/**
 * CreateSubscriptionResponse
 * NodeId: i=788
 * Extends: Structure
 */
export class CreateSubscriptionResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public subscriptionId!: number;
  public revisedPublishingInterval!: number;
  public revisedLifetimeCount!: number;
  public revisedMaxKeepAliveCount!: number;

  getTypeId(): number { return 788; }
  getBinaryEncodingId(): number { return 790; }
  getXmlEncodingId(): number { return 789; }
  getJsonEncodingId(): number { return 15338; }
}

/**
 * ModifySubscriptionRequest
 * NodeId: i=791
 * Extends: Structure
 */
export class ModifySubscriptionRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public subscriptionId!: number;
  public requestedPublishingInterval!: number;
  public requestedLifetimeCount!: number;
  public requestedMaxKeepAliveCount!: number;
  public maxNotificationsPerPublish!: number;
  public priority!: number;

  getTypeId(): number { return 791; }
  getBinaryEncodingId(): number { return 793; }
  getXmlEncodingId(): number { return 792; }
  getJsonEncodingId(): number { return 15339; }
}

/**
 * ModifySubscriptionResponse
 * NodeId: i=794
 * Extends: Structure
 */
export class ModifySubscriptionResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public revisedPublishingInterval!: number;
  public revisedLifetimeCount!: number;
  public revisedMaxKeepAliveCount!: number;

  getTypeId(): number { return 794; }
  getBinaryEncodingId(): number { return 796; }
  getXmlEncodingId(): number { return 795; }
  getJsonEncodingId(): number { return 15340; }
}

/**
 * SetPublishingModeRequest
 * NodeId: i=797
 * Extends: Structure
 */
export class SetPublishingModeRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public publishingEnabled!: boolean;
  public subscriptionIds!: number[];

  getTypeId(): number { return 797; }
  getBinaryEncodingId(): number { return 799; }
  getXmlEncodingId(): number { return 798; }
  getJsonEncodingId(): number { return 15341; }
}

/**
 * SetPublishingModeResponse
 * NodeId: i=800
 * Extends: Structure
 */
export class SetPublishingModeResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 800; }
  getBinaryEncodingId(): number { return 802; }
  getXmlEncodingId(): number { return 801; }
  getJsonEncodingId(): number { return 15342; }
}

/**
 * NotificationMessage
 * NodeId: i=803
 * Extends: Structure
 */
export class NotificationMessage extends Structure implements IOpcType {

  public sequenceNumber!: number;
  public publishTime!: Date;
  public notificationData!: ExtensionObject[];

  getTypeId(): number { return 803; }
  getBinaryEncodingId(): number { return 805; }
  getXmlEncodingId(): number { return 804; }
  getJsonEncodingId(): number { return 15343; }
}

/**
 * NotificationData
 * NodeId: i=945
 * Extends: Structure
 */
export class NotificationData extends Structure implements IOpcType {

  getTypeId(): number { return 945; }
  getBinaryEncodingId(): number { return 947; }
  getXmlEncodingId(): number { return 946; }
  getJsonEncodingId(): number { return 15344; }
}

/**
 * DataChangeNotification
 * NodeId: i=809
 * Extends: NotificationData
 */
export class DataChangeNotification extends NotificationData implements IOpcType {

  public monitoredItems!: MonitoredItemNotification[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 809; }
  getBinaryEncodingId(): number { return 811; }
  getXmlEncodingId(): number { return 810; }
  getJsonEncodingId(): number { return 15345; }
}

/**
 * MonitoredItemNotification
 * NodeId: i=806
 * Extends: Structure
 */
export class MonitoredItemNotification extends Structure implements IOpcType {

  public clientHandle!: number;
  public value!: DataValue;

  getTypeId(): number { return 806; }
  getBinaryEncodingId(): number { return 808; }
  getXmlEncodingId(): number { return 807; }
  getJsonEncodingId(): number { return 15346; }
}

/**
 * EventNotificationList
 * NodeId: i=914
 * Extends: NotificationData
 */
export class EventNotificationList extends NotificationData implements IOpcType {

  public events!: EventFieldList[];

  getTypeId(): number { return 914; }
  getBinaryEncodingId(): number { return 916; }
  getXmlEncodingId(): number { return 915; }
  getJsonEncodingId(): number { return 15347; }
}

/**
 * EventFieldList
 * NodeId: i=917
 * Extends: Structure
 */
export class EventFieldList extends Structure implements IOpcType {

  public clientHandle!: number;
  public eventFields!: Variant[];

  getTypeId(): number { return 917; }
  getBinaryEncodingId(): number { return 919; }
  getXmlEncodingId(): number { return 918; }
  getJsonEncodingId(): number { return 15348; }
}

/**
 * HistoryEventFieldList
 * NodeId: i=920
 * Extends: Structure
 */
export class HistoryEventFieldList extends Structure implements IOpcType {

  public eventFields!: Variant[];

  getTypeId(): number { return 920; }
  getBinaryEncodingId(): number { return 922; }
  getXmlEncodingId(): number { return 921; }
  getJsonEncodingId(): number { return 15349; }
}

/**
 * StatusChangeNotification
 * NodeId: i=818
 * Extends: NotificationData
 */
export class StatusChangeNotification extends NotificationData implements IOpcType {

  public status!: StatusCode;
  public diagnosticInfo!: DiagnosticInfo;

  getTypeId(): number { return 818; }
  getBinaryEncodingId(): number { return 820; }
  getXmlEncodingId(): number { return 819; }
  getJsonEncodingId(): number { return 15350; }
}

/**
 * SubscriptionAcknowledgement
 * NodeId: i=821
 * Extends: Structure
 */
export class SubscriptionAcknowledgement extends Structure implements IOpcType {

  public subscriptionId!: number;
  public sequenceNumber!: number;

  getTypeId(): number { return 821; }
  getBinaryEncodingId(): number { return 823; }
  getXmlEncodingId(): number { return 822; }
  getJsonEncodingId(): number { return 15351; }
}

/**
 * PublishRequest
 * NodeId: i=824
 * Extends: Structure
 */
export class PublishRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public subscriptionAcknowledgements!: SubscriptionAcknowledgement[];

  getTypeId(): number { return 824; }
  getBinaryEncodingId(): number { return 826; }
  getXmlEncodingId(): number { return 825; }
  getJsonEncodingId(): number { return 15352; }
}

/**
 * PublishResponse
 * NodeId: i=827
 * Extends: Structure
 */
export class PublishResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public subscriptionId!: number;
  public availableSequenceNumbers!: number[];
  public moreNotifications!: boolean;
  public notificationMessage!: NotificationMessage;
  public results!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 827; }
  getBinaryEncodingId(): number { return 829; }
  getXmlEncodingId(): number { return 828; }
  getJsonEncodingId(): number { return 15353; }
}

/**
 * RepublishRequest
 * NodeId: i=830
 * Extends: Structure
 */
export class RepublishRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public subscriptionId!: number;
  public retransmitSequenceNumber!: number;

  getTypeId(): number { return 830; }
  getBinaryEncodingId(): number { return 832; }
  getXmlEncodingId(): number { return 831; }
  getJsonEncodingId(): number { return 15354; }
}

/**
 * RepublishResponse
 * NodeId: i=833
 * Extends: Structure
 */
export class RepublishResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public notificationMessage!: NotificationMessage;

  getTypeId(): number { return 833; }
  getBinaryEncodingId(): number { return 835; }
  getXmlEncodingId(): number { return 834; }
  getJsonEncodingId(): number { return 15355; }
}

/**
 * TransferResult
 * NodeId: i=836
 * Extends: Structure
 */
export class TransferResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public availableSequenceNumbers!: number[];

  getTypeId(): number { return 836; }
  getBinaryEncodingId(): number { return 838; }
  getXmlEncodingId(): number { return 837; }
  getJsonEncodingId(): number { return 15356; }
}

/**
 * TransferSubscriptionsRequest
 * NodeId: i=839
 * Extends: Structure
 */
export class TransferSubscriptionsRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public subscriptionIds!: number[];
  public sendInitialValues!: boolean;

  getTypeId(): number { return 839; }
  getBinaryEncodingId(): number { return 841; }
  getXmlEncodingId(): number { return 840; }
  getJsonEncodingId(): number { return 15357; }
}

/**
 * TransferSubscriptionsResponse
 * NodeId: i=842
 * Extends: Structure
 */
export class TransferSubscriptionsResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: TransferResult[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 842; }
  getBinaryEncodingId(): number { return 844; }
  getXmlEncodingId(): number { return 843; }
  getJsonEncodingId(): number { return 15358; }
}

/**
 * DeleteSubscriptionsRequest
 * NodeId: i=845
 * Extends: Structure
 */
export class DeleteSubscriptionsRequest extends Structure implements IOpcType {

  public requestHeader!: RequestHeader;
  public subscriptionIds!: number[];

  getTypeId(): number { return 845; }
  getBinaryEncodingId(): number { return 847; }
  getXmlEncodingId(): number { return 846; }
  getJsonEncodingId(): number { return 15359; }
}

/**
 * DeleteSubscriptionsResponse
 * NodeId: i=848
 * Extends: Structure
 */
export class DeleteSubscriptionsResponse extends Structure implements IOpcType {

  public responseHeader!: ResponseHeader;
  public results!: StatusCode[];
  public diagnosticInfos!: DiagnosticInfo[];

  getTypeId(): number { return 848; }
  getBinaryEncodingId(): number { return 850; }
  getXmlEncodingId(): number { return 849; }
  getJsonEncodingId(): number { return 15360; }
}

/**
 * BuildInfo
 * NodeId: i=338
 * Extends: Structure
 */
export class BuildInfo extends Structure implements IOpcType {

  public productUri!: UaString;
  public manufacturerName!: UaString;
  public productName!: UaString;
  public softwareVersion!: UaString;
  public buildNumber!: UaString;
  public buildDate!: Date;

  getTypeId(): number { return 338; }
  getBinaryEncodingId(): number { return 340; }
  getXmlEncodingId(): number { return 339; }
  getJsonEncodingId(): number { return 15361; }
}

/**
 * RedundantServerDataType
 * NodeId: i=853
 * Extends: Structure
 */
export class RedundantServerDataType extends Structure implements IOpcType {

  public serverId!: UaString;
  public serviceLevel!: number;
  public serverState!: ServerStateEnum;

  getTypeId(): number { return 853; }
  getBinaryEncodingId(): number { return 855; }
  getXmlEncodingId(): number { return 854; }
  getJsonEncodingId(): number { return 15362; }
}

/**
 * EndpointUrlListDataType
 * NodeId: i=11943
 * Extends: Structure
 */
export class EndpointUrlListDataType extends Structure implements IOpcType {

  public endpointUrlList!: UaString[];

  getTypeId(): number { return 11943; }
  getBinaryEncodingId(): number { return 11957; }
  getXmlEncodingId(): number { return 11949; }
  getJsonEncodingId(): number { return 15363; }
}

/**
 * NetworkGroupDataType
 * NodeId: i=11944
 * Extends: Structure
 */
export class NetworkGroupDataType extends Structure implements IOpcType {

  public serverUri!: UaString;
  public networkPaths!: EndpointUrlListDataType[];

  getTypeId(): number { return 11944; }
  getBinaryEncodingId(): number { return 11958; }
  getXmlEncodingId(): number { return 11950; }
  getJsonEncodingId(): number { return 15364; }
}

/**
 * SamplingIntervalDiagnosticsDataType
 * NodeId: i=856
 * Extends: Structure
 */
export class SamplingIntervalDiagnosticsDataType extends Structure implements IOpcType {

  public samplingInterval!: number;
  public monitoredItemCount!: number;
  public maxMonitoredItemCount!: number;
  public disabledMonitoredItemCount!: number;

  getTypeId(): number { return 856; }
  getBinaryEncodingId(): number { return 858; }
  getXmlEncodingId(): number { return 857; }
  getJsonEncodingId(): number { return 15365; }
}

/**
 * ServerDiagnosticsSummaryDataType
 * NodeId: i=859
 * Extends: Structure
 */
export class ServerDiagnosticsSummaryDataType extends Structure implements IOpcType {

  public serverViewCount!: number;
  public currentSessionCount!: number;
  public cumulatedSessionCount!: number;
  public securityRejectedSessionCount!: number;
  public rejectedSessionCount!: number;
  public sessionTimeoutCount!: number;
  public sessionAbortCount!: number;
  public currentSubscriptionCount!: number;
  public cumulatedSubscriptionCount!: number;
  public publishingIntervalCount!: number;
  public securityRejectedRequestsCount!: number;
  public rejectedRequestsCount!: number;

  getTypeId(): number { return 859; }
  getBinaryEncodingId(): number { return 861; }
  getXmlEncodingId(): number { return 860; }
  getJsonEncodingId(): number { return 15366; }
}

/**
 * ServerStatusDataType
 * NodeId: i=862
 * Extends: Structure
 */
export class ServerStatusDataType extends Structure implements IOpcType {

  public startTime!: Date;
  public currentTime!: Date;
  public state!: ServerStateEnum;
  public buildInfo!: BuildInfo;
  public secondsTillShutdown!: number;
  public shutdownReason!: LocalizedText;

  getTypeId(): number { return 862; }
  getBinaryEncodingId(): number { return 864; }
  getXmlEncodingId(): number { return 863; }
  getJsonEncodingId(): number { return 15367; }
}

/**
 * SessionDiagnosticsDataType
 * NodeId: i=865
 * Extends: Structure
 */
export class SessionDiagnosticsDataType extends Structure implements IOpcType {

  public sessionId!: NodeId;
  public sessionName!: UaString;
  public clientDescription!: ApplicationDescription;
  public serverUri!: UaString;
  public endpointUrl!: UaString;
  public localeIds!: UaString[];
  public actualSessionTimeout!: number;
  public maxResponseMessageSize!: number;
  public clientConnectionTime!: Date;
  public clientLastContactTime!: Date;
  public currentSubscriptionsCount!: number;
  public currentMonitoredItemsCount!: number;
  public currentPublishRequestsInQueue!: number;
  public totalRequestCount!: ServiceCounterDataType;
  public unauthorizedRequestCount!: number;
  public readCount!: ServiceCounterDataType;
  public historyReadCount!: ServiceCounterDataType;
  public writeCount!: ServiceCounterDataType;
  public historyUpdateCount!: ServiceCounterDataType;
  public callCount!: ServiceCounterDataType;
  public createMonitoredItemsCount!: ServiceCounterDataType;
  public modifyMonitoredItemsCount!: ServiceCounterDataType;
  public setMonitoringModeCount!: ServiceCounterDataType;
  public setTriggeringCount!: ServiceCounterDataType;
  public deleteMonitoredItemsCount!: ServiceCounterDataType;
  public createSubscriptionCount!: ServiceCounterDataType;
  public modifySubscriptionCount!: ServiceCounterDataType;
  public setPublishingModeCount!: ServiceCounterDataType;
  public publishCount!: ServiceCounterDataType;
  public republishCount!: ServiceCounterDataType;
  public transferSubscriptionsCount!: ServiceCounterDataType;
  public deleteSubscriptionsCount!: ServiceCounterDataType;
  public addNodesCount!: ServiceCounterDataType;
  public addReferencesCount!: ServiceCounterDataType;
  public deleteNodesCount!: ServiceCounterDataType;
  public deleteReferencesCount!: ServiceCounterDataType;
  public browseCount!: ServiceCounterDataType;
  public browseNextCount!: ServiceCounterDataType;
  public translateBrowsePathsToNodeIdsCount!: ServiceCounterDataType;
  public queryFirstCount!: ServiceCounterDataType;
  public queryNextCount!: ServiceCounterDataType;
  public registerNodesCount!: ServiceCounterDataType;
  public unregisterNodesCount!: ServiceCounterDataType;

  getTypeId(): number { return 865; }
  getBinaryEncodingId(): number { return 867; }
  getXmlEncodingId(): number { return 866; }
  getJsonEncodingId(): number { return 15368; }
}

/**
 * SessionSecurityDiagnosticsDataType
 * NodeId: i=868
 * Extends: Structure
 */
export class SessionSecurityDiagnosticsDataType extends Structure implements IOpcType {

  public sessionId!: NodeId;
  public clientUserIdOfSession!: UaString;
  public clientUserIdHistory!: UaString[];
  public authenticationMechanism!: UaString;
  public encoding!: UaString;
  public transportProtocol!: UaString;
  public securityMode!: MessageSecurityModeEnum;
  public securityPolicyUri!: UaString;
  public clientCertificate!: UaByteString;

  getTypeId(): number { return 868; }
  getBinaryEncodingId(): number { return 870; }
  getXmlEncodingId(): number { return 869; }
  getJsonEncodingId(): number { return 15369; }
}

/**
 * ServiceCounterDataType
 * NodeId: i=871
 * Extends: Structure
 */
export class ServiceCounterDataType extends Structure implements IOpcType {

  public totalCount!: number;
  public errorCount!: number;

  getTypeId(): number { return 871; }
  getBinaryEncodingId(): number { return 873; }
  getXmlEncodingId(): number { return 872; }
  getJsonEncodingId(): number { return 15370; }
}

/**
 * StatusResult
 * NodeId: i=299
 * Extends: Structure
 */
export class StatusResult extends Structure implements IOpcType {

  public statusCode!: StatusCode;
  public diagnosticInfo!: DiagnosticInfo;

  getTypeId(): number { return 299; }
  getBinaryEncodingId(): number { return 301; }
  getXmlEncodingId(): number { return 300; }
  getJsonEncodingId(): number { return 15371; }
}

/**
 * SubscriptionDiagnosticsDataType
 * NodeId: i=874
 * Extends: Structure
 */
export class SubscriptionDiagnosticsDataType extends Structure implements IOpcType {

  public sessionId!: NodeId;
  public subscriptionId!: number;
  public priority!: number;
  public publishingInterval!: number;
  public maxKeepAliveCount!: number;
  public maxLifetimeCount!: number;
  public maxNotificationsPerPublish!: number;
  public publishingEnabled!: boolean;
  public modifyCount!: number;
  public enableCount!: number;
  public disableCount!: number;
  public republishRequestCount!: number;
  public republishMessageRequestCount!: number;
  public republishMessageCount!: number;
  public transferRequestCount!: number;
  public transferredToAltClientCount!: number;
  public transferredToSameClientCount!: number;
  public publishRequestCount!: number;
  public dataChangeNotificationsCount!: number;
  public eventNotificationsCount!: number;
  public notificationsCount!: number;
  public latePublishRequestCount!: number;
  public currentKeepAliveCount!: number;
  public currentLifetimeCount!: number;
  public unacknowledgedMessageCount!: number;
  public discardedMessageCount!: number;
  public monitoredItemCount!: number;
  public disabledMonitoredItemCount!: number;
  public monitoringQueueOverflowCount!: number;
  public nextSequenceNumber!: number;
  public eventQueueOverflowCount!: number;

  getTypeId(): number { return 874; }
  getBinaryEncodingId(): number { return 876; }
  getXmlEncodingId(): number { return 875; }
  getJsonEncodingId(): number { return 15372; }
}

/**
 * ModelChangeStructureDataType
 * NodeId: i=877
 * Extends: Structure
 */
export class ModelChangeStructureDataType extends Structure implements IOpcType {

  public affected!: NodeId;
  public affectedType!: NodeId;
  public verb!: number;

  getTypeId(): number { return 877; }
  getBinaryEncodingId(): number { return 879; }
  getXmlEncodingId(): number { return 878; }
  getJsonEncodingId(): number { return 15373; }
}

/**
 * SemanticChangeStructureDataType
 * NodeId: i=897
 * Extends: Structure
 */
export class SemanticChangeStructureDataType extends Structure implements IOpcType {

  public affected!: NodeId;
  public affectedType!: NodeId;

  getTypeId(): number { return 897; }
  getBinaryEncodingId(): number { return 899; }
  getXmlEncodingId(): number { return 898; }
  getJsonEncodingId(): number { return 15374; }
}

/**
 * Range
 * NodeId: i=884
 * Extends: Structure
 */
export class Range extends Structure implements IOpcType {

  public low!: number;
  public high!: number;

  getTypeId(): number { return 884; }
  getBinaryEncodingId(): number { return 886; }
  getXmlEncodingId(): number { return 885; }
  getJsonEncodingId(): number { return 15375; }
}

/**
 * EUInformation
 * NodeId: i=887
 * Extends: Structure
 */
export class EUInformation extends Structure implements IOpcType {

  public namespaceUri!: UaString;
  public unitId!: number;
  public displayName!: LocalizedText;
  public description!: LocalizedText;

  getTypeId(): number { return 887; }
  getBinaryEncodingId(): number { return 889; }
  getXmlEncodingId(): number { return 888; }
  getJsonEncodingId(): number { return 15376; }
}

/**
 * ComplexNumberType
 * NodeId: i=12171
 * Extends: Structure
 */
export class ComplexNumberType extends Structure implements IOpcType {

  public real!: number;
  public imaginary!: number;

  getTypeId(): number { return 12171; }
  getBinaryEncodingId(): number { return 12181; }
  getXmlEncodingId(): number { return 12173; }
  getJsonEncodingId(): number { return 15377; }
}

/**
 * DoubleComplexNumberType
 * NodeId: i=12172
 * Extends: Structure
 */
export class DoubleComplexNumberType extends Structure implements IOpcType {

  public real!: number;
  public imaginary!: number;

  getTypeId(): number { return 12172; }
  getBinaryEncodingId(): number { return 12182; }
  getXmlEncodingId(): number { return 12174; }
  getJsonEncodingId(): number { return 15378; }
}

/**
 * AxisInformation
 * NodeId: i=12079
 * Extends: Structure
 */
export class AxisInformation extends Structure implements IOpcType {

  public engineeringUnits!: EUInformation;
  public eURange!: Range;
  public title!: LocalizedText;
  public axisScaleType!: AxisScaleEnumerationEnum;
  public axisSteps!: number[];

  getTypeId(): number { return 12079; }
  getBinaryEncodingId(): number { return 12089; }
  getXmlEncodingId(): number { return 12081; }
  getJsonEncodingId(): number { return 15379; }
}

/**
 * XVType
 * NodeId: i=12080
 * Extends: Structure
 */
export class XVType extends Structure implements IOpcType {

  public x!: number;
  public value!: number;

  getTypeId(): number { return 12080; }
  getBinaryEncodingId(): number { return 12090; }
  getXmlEncodingId(): number { return 12082; }
  getJsonEncodingId(): number { return 15380; }
}

/**
 * ProgramDiagnosticDataType
 * NodeId: i=894
 * Extends: Structure
 */
export class ProgramDiagnosticDataType extends Structure implements IOpcType {

  public createSessionId!: NodeId;
  public createClientName!: UaString;
  public invocationCreationTime!: Date;
  public lastTransitionTime!: Date;
  public lastMethodCall!: UaString;
  public lastMethodSessionId!: NodeId;
  public lastMethodInputArguments!: Argument[];
  public lastMethodOutputArguments!: Argument[];
  public lastMethodCallTime!: Date;
  public lastMethodReturnStatus!: StatusResult;

  getTypeId(): number { return 894; }
  getBinaryEncodingId(): number { return 896; }
  getXmlEncodingId(): number { return 895; }
  getJsonEncodingId(): number { return 15381; }
}

/**
 * ProgramDiagnostic2DataType
 * NodeId: i=24033
 * Extends: Structure
 */
export class ProgramDiagnostic2DataType extends Structure implements IOpcType {

  public createSessionId!: NodeId;
  public createClientName!: UaString;
  public invocationCreationTime!: Date;
  public lastTransitionTime!: Date;
  public lastMethodCall!: UaString;
  public lastMethodSessionId!: NodeId;
  public lastMethodInputArguments!: Argument[];
  public lastMethodOutputArguments!: Argument[];
  public lastMethodInputValues!: Variant[];
  public lastMethodOutputValues!: Variant[];
  public lastMethodCallTime!: Date;
  public lastMethodReturnStatus!: StatusCode;

  getTypeId(): number { return 24033; }
  getBinaryEncodingId(): number { return 24034; }
  getXmlEncodingId(): number { return 24038; }
  getJsonEncodingId(): number { return 24042; }
}

/**
 * Annotation
 * NodeId: i=891
 * Extends: Structure
 */
export class Annotation extends Structure implements IOpcType {

  public message!: UaString;
  public userName!: UaString;
  public annotationTime!: Date;

  getTypeId(): number { return 891; }
  getBinaryEncodingId(): number { return 893; }
  getXmlEncodingId(): number { return 892; }
  getJsonEncodingId(): number { return 15382; }
}