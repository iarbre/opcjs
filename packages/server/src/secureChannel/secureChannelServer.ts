import {
  Certificate,
  ChannelSecurityToken,
  DiagnosticInfo,
  ExtensionObject,
  getLogger,
  MsgAsymmetric,
  MsgSecurityHeaderAsymmetric,
  MsgSecurityHeaderSymmetric,
  MsgSequenceHeader,
  MsgSymmetric,
  MsgTypeOpenFinal,
  MsgTypeFinal,
  MsgTypeChunk,
  OpenSecureChannelRequest,
  OpenSecureChannelResponse,
  ResponseHeader,
  ScMsgBase,
  ScMsgHeader,
  SecureChannelContext,
  SecureChannelTypeDecoder,
  SecureChannelTypeEncoder,
  SecurityTokenRequestTypeEnum,
  StatusCode,
  MsgTypeOpenChunk,
} from 'opcjs-base'
import type { IOpcType } from 'opcjs-base'

/** Callback type for handling incoming service requests after a session is established. */
export type ServerServiceHandler = (request: IOpcType) => Promise<IOpcType>

/** Incremented per server instance to generate unique channel IDs. */
let nextChannelId = 1
/** Incremented per server instance to generate unique token IDs. */
let nextTokenId = 1

/**
 * Server-side secure channel handler.
 *
 * Reads decoded {@link ScMsgBase} frames from the inbound stream, handles
 * `OpenSecureChannel` (Issue/Renew), and dispatches `MSG`-type messages to the
 * injected {@link ServerServiceHandler}.  Sends encoded responses back through
 * the outbound stream.
 *
 * Mirrors structure of the client-side {@link SecureChannelFacade} but inverts
 * the request/response roles: the server receives requests and sends responses.
 */
export class SecureChannelServer {
  private readonly logger = getLogger('secureChannel.SecureChannelServer')
  private readonly writer: WritableStreamDefaultWriter<ScMsgBase>
  private readonly reader: ReadableStreamDefaultReader<ScMsgBase>

  /** Process incoming decoded message frames until the stream closes. */
  private async processRequests(): Promise<void> {
    try {
      for (;;) {
        const { done, value: msg } = await this.reader.read()
        if (done) break

        if (msg.header.msgType === MsgTypeOpenFinal || msg.header.msgType === MsgTypeOpenChunk) {
          await this.handleOpenSecureChannel(msg)
        } else if (msg.header.msgType === MsgTypeFinal || msg.header.msgType === MsgTypeChunk) {
          await this.handleServiceRequest(msg)
        } else {
          this.logger.debug(`Ignoring message type: 0x${msg.header.msgType.toString(16)}`)
        }
      }
    } catch (err) {
      this.logger.error('Request processing loop terminated:', err)
    }
  }

  private async handleOpenSecureChannel(msg: ScMsgBase): Promise<void> {
    const request = msg.body as OpenSecureChannelRequest
    this.logger.debug(`OpenSecureChannel request received (type=${request.requestType})`)

    if (request.requestType === SecurityTokenRequestTypeEnum.Issue) {
      this.context.channelId = nextChannelId++
      this.context.tokenId = nextTokenId++
    } else {
      // Renew: keep channelId, issue new tokenId.
      this.context.tokenId = nextTokenId++
    }

    const requestedLifetime = request.requestedLifetime ?? 3_600_000
    const revisedLifetime = Math.min(requestedLifetime, 3_600_000)

    const securityToken = new ChannelSecurityToken()
    securityToken.channelId = this.context.channelId
    securityToken.tokenId = this.context.tokenId
    securityToken.createdAt = new Date()
    securityToken.revisedLifetime = revisedLifetime

    const responseHeader = new ResponseHeader()
    responseHeader.timestamp = new Date()
    responseHeader.requestHandle = request.requestHeader?.requestHandle ?? 0
    responseHeader.serviceResult = StatusCode.Good
    responseHeader.serviceDiagnostics = new DiagnosticInfo()
    responseHeader.stringTable = []
    responseHeader.additionalHeader = ExtensionObject.newEmpty()

    const response = new OpenSecureChannelResponse()
    response.responseHeader = responseHeader
    response.serverProtocolVersion = 0
    response.securityToken = securityToken
    response.serverNonce = null

    const responseMsg = new MsgAsymmetric(
      new ScMsgHeader(MsgTypeOpenFinal, 0, this.context.channelId),
      new MsgSecurityHeaderAsymmetric('http://opcfoundation.org/UA/SecurityPolicy#None'),
      new MsgSequenceHeader(this.context.nextSequenceNumber(), msg.sequenceHeader.requestId),
      response,
    )

    await this.writer.write(responseMsg)

    // Switch to symmetric algorithm for subsequent MSG requests/responses.
    // For SecurityPolicy None both algorithms are identical passthroughs, so
    // the switch order relative to the write is immaterial.
    this.context.securityAlgorithm = this.context.securityPolicy.getAlgorithmSymmetric(
      new Certificate(),
      new Certificate(),
    )

    this.logger.debug(
      `OpenSecureChannel response sent (channelId=${this.context.channelId}, tokenId=${this.context.tokenId})`,
    )
  }

  private async handleServiceRequest(msg: ScMsgBase): Promise<void> {
    const request = msg.body as IOpcType
    const requestId = msg.sequenceHeader.requestId

    let response: IOpcType
    try {
      response = await this.serviceHandler(request)
    } catch (err) {
      this.logger.error('Service handler threw; closing connection:', err)
      // TODO Phase 3: encode and return ServiceFault response instead of dropping.
      return
    }

    const responseMsg = new MsgSymmetric(
      new ScMsgHeader(MsgTypeFinal, 0, this.context.channelId),
      new MsgSecurityHeaderSymmetric(this.context.tokenId),
      new MsgSequenceHeader(this.context.nextSequenceNumber(), requestId),
      response,
    )

    await this.writer.write(responseMsg)
  }

  constructor(
    private readonly context: SecureChannelContext,
    /** Inbound pipeline: provides decoded {@link ScMsgBase} objects with IOpcType bodies. */
    readerTransform: SecureChannelTypeDecoder,
    /** Outbound pipeline: accepts {@link ScMsgBase} objects with IOpcType bodies to encode. */
    writerTransform: SecureChannelTypeEncoder,
    /** Called for every MSG service request after the secure channel is established. */
    private readonly serviceHandler: ServerServiceHandler,
  ) {
    this.reader = readerTransform.readable.getReader() as ReadableStreamDefaultReader<ScMsgBase>
    this.writer = writerTransform.writable.getWriter() as WritableStreamDefaultWriter<ScMsgBase>
    void this.processRequests()
  }
}
