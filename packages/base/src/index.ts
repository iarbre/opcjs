/**
 * @opcjs-base - OPC UA base package
 *
 * Exports builtin types and codec APIs.
 */

export type { IOpcType } from './types/iOpcType.js';
export type { IReader} from './codecs/interfaces/iReader.js';
export type { IWriter } from './codecs/interfaces/iWriter.js';
export {Encoder} from './codecs/encoder.js';
export {Decoder} from './codecs/decoder.js';
export { BinaryReader } from './codecs/binary/binaryReader.js';
export { BinaryWriter } from './codecs/binary/binaryWriter.js';
export { SecureChannelTypeEncoder as BinaryEncoderTransform } from './secureChannel/secureChannelTypeEncoder.js';
export { SecureChannelTypeDecoder as BinaryDecoderTransform } from './secureChannel/secureChannelTypeDecoder.js';
export { DataValue } from './types/dataValue.js';
export { DiagnosticInfo } from './types/diagnosticInfo.js';
export { ExpandedNodeId } from './types/expandedNodeId.js';
export { ExtensionObject } from './types/extensionObject.js';
export { LocalizedText } from './types/localizedText.js';
export { NodeIdType, NodeId } from './types/nodeId.js';
export { QualifiedName } from './types/qualifiedName.js';
export { VariantType, Variant } from './types/variant.js';
export type { VariantValue, VariantArrayValue } from './types/variant.js';
export { XmlElement } from './types/xmlElement.js';
export { BuiltinTypeId, getPrimitiveTypeName, isPrimitive } from './types/primitives.js';
export type { BuiltinTypeIdValue, PrimitiveTypeMap, UaString, UaByteString } from './types/primitives.js';
//export { SecureChannel } from './secureChannel/secureChannel.js';
export type { ISecureChannel } from './secureChannel/iSecureChannel.js';
export { Configuration } from './configuration/configuration.js';
export { registerEncoders } from './schema/encoderRegistrations.js';
export { registerTypeDecoders } from './schema/decoderRegistrations.js';
export { registerBinaryDecoders } from './schema/decoderRegistrations.js';
export { registerXmlDecoders } from './schema/decoderRegistrations.js';
export { registerJsonDecoders } from './schema/decoderRegistrations.js';
export * from './schema/types.js';
export * from './schema/enums.js';

export { LoggerFactory } from './utils/logger/loggerFactory.js';
export type { ILoggerFactory } from './utils/logger/iLoggerFactory.js';
export type { ILogger } from './utils/logger/iLogger.js';
export type { ISink } from './utils/logger/iSink.js';
export { LogRecord } from './utils/logger/logRecord.js';
export { ConsoleSink } from './utils/logger/consoleSink.js';
export { LevelName } from './utils/logger/levelName.js';
export { getLogger, initLoggerProvider } from './utils/logger/loggerProvider.js';

export { WebSocketFascade } from './transports/ws/webSocketFascade.js';
export { WebSocketReadableStream } from './transports/ws/WebSocketReadableStream.js';
export { WebSocketWritableStream } from './transports/ws/WebSocketWritableStream.js';
export { TcpMessageDecoupler } from './transports/ws/tcpMessageDecoupler.js';
export { TcpMessageInjector } from './transports/ws/tcpMessageInjector.js';
export { TcpConnectionHandler } from './transports/ws/tcpConnectionHandler.js';
export { SecureChannelFacade } from './secureChannel/secureChannelFacade.js';
export { SecureChannelContext } from './secureChannel/secureChannelContext.js';
export { SecureChannelMessageDecoder } from './secureChannel/secureChannelMessageDecoder.js';
export { SecureChannelMesssageEncoder } from './secureChannel/secureChannelMessageEncoder.js';
export { SecureChannelTypeDecoder } from './secureChannel/secureChannelTypeDecoder.js';
export { SecureChannelTypeEncoder } from './secureChannel/secureChannelTypeEncoder.js';
export {SecureChannelChunkReader} from './secureChannel/secureChannelChunkReader.js';
export {SecureChannelChunkWriter} from './secureChannel/secureChannelChunkWriter.js';


