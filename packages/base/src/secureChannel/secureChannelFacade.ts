import { ServiceFault } from "../schema/types";
import {
  MessageSecurityModeEnum,
  SecurityTokenRequestTypeEnum,
} from "../schema/enums";
import {
  OpenSecureChannelRequest,
  OpenSecureChannelResponse,
  RequestHeader,
} from "../schema/types";
import { ExtensionObject } from "../types/extensionObject";
import { IOpcType } from "../types/iOpcType";
import { NodeId } from "../types/nodeId";
import { MsgAsymmetric } from "./messages/msgAsymmetric";
import { MsgHeader } from "./messages/msgHeader";
import { MsgSecurityHeaderAsymmetric } from "./messages/msgSecurityHeaderAsymmetric";
import { MsgSecurityHeaderSymmetric } from "./messages/msgSecurityHeaderSymmetric";
import { MsgSequenceHeader } from "./messages/msgSequenceHeader";
import { MsgSymmetric } from "./messages/msgSymmetric";
import { MsgTypeFinal, MsgTypeOpenFinal } from "./messages/msgType";
import { PendingRequests } from "./pendingRequests";
import { SecureChannelContext } from "./secureChannelContext";
import { getLogger } from "../utils/logger/loggerProvider";
import { MsgBase } from "./messages/msgBase";
import { ISecureChannel } from "./iSecureChannel";
import { Certificate } from "../certificates/certificate";

/**
 * Facade for the OPC UA Secure Conversation layer.
 *
 * Owns the correlation between outgoing requests and incoming responses.
 * Wires together {@link SecureChannelMessageDecoder} (inbound) and the raw
 * WebSocket writer (outbound) so callers only need to interact with this single
 * object.
 *
 * ```ts
 * const context  = new SecureChannelContext(configuration);
 * const facade   = new SecureChannelFacade(context, tcpHandler.readable, wsWritable);
 *
 * await facade.openSecureChannel();
 * const response = await facade.send(readValueRequest);
 *
 * // Unsolicited server messages (e.g. Publish notifications):
 * facade.unsolicited.pipeTo(notificationHandler.writable);
 * ```
 */
export class SecureChannelFacade implements ISecureChannel {
  private readonly pending = new PendingRequests();
  private readonly logger = getLogger("secureChannel.SecureChannelFacade");
  private readonly writer: WritableStreamDefaultWriter<MsgBase>;
  private readonly reader: ReadableStreamDefaultReader<MsgBase>;

  /**
   * Sends the OpenSecureChannel request and resolves once the server replies.
   * Updates `context.channelId` and `context.tokenId` on success.
   */
  public async openSecureChannel(): Promise<void> {
    const requestHeader = new RequestHeader();
    requestHeader.authenticationToken = NodeId.newTwoByte(0);
    requestHeader.timestamp = new Date();
    requestHeader.requestHandle = 0;
    requestHeader.returnDiagnostics = 0;
    requestHeader.auditEntryId = "";
    requestHeader.timeoutHint = 0;
    requestHeader.additionalHeader = ExtensionObject.newEmpty();

    const request = new OpenSecureChannelRequest();
    request.requestHeader = requestHeader;
    request.clientProtocolVersion = 0;
    request.requestType = SecurityTokenRequestTypeEnum.Issue;
    request.securityMode = this.context.securityPolicy.getSecurityMode();
    request.clientNonce = null;
    request.requestedLifetime = 3600000;

    const { sequenceNumber, requestId } = this.context.nextIds();

    this.context.securityAlgorithm = this.context.securityPolicy.getAlgorithmAsymmetric(new Uint8Array(), new Uint8Array());

    const msg = new MsgAsymmetric(
      new MsgHeader(MsgTypeOpenFinal, 0, 0),
      new MsgSecurityHeaderAsymmetric(
        "http://opcfoundation.org/UA/SecurityPolicy#None",
      ),
      new MsgSequenceHeader(sequenceNumber, requestId),
      request,
    );

    this.logger.debug("Sending OpenSecureChannelRequest...");
    return this.pushMessage(msg).then((response) => {
      const openResponse = response as OpenSecureChannelResponse;
      this.logger.debug("OpenSecureChannelResponse received");
      this.context.channelId = openResponse.securityToken?.channelId as number;
      this.context.tokenId = openResponse.securityToken?.tokenId as number;
      this.context.securityAlgorithm=this.context.securityPolicy.getAlgorithmSymmetric(
          new Certificate(),
          new Certificate(),
        );
    });
  }

  // ─── ISecureChannel implementation ─────────────────────────────────────────────

  getSecurityPolicy(): string {
    return this.context.securityPolicy.getSecurityPolicyUri();
  }

  getSecurityMode(): MessageSecurityModeEnum {
    return this.context.securityPolicy.getSecurityMode();
  }

  getEndpointUrl(): string {
    return this.context.endpointUrl;
  }

  /**
   * Sends a service request and returns a Promise that resolves with the
   * matched response decoded by {@link SecureChannelReadable}.
   */
  issueServiceRequest(request: IOpcType): Promise<IOpcType> {
    const { sequenceNumber, requestId } = this.context.nextIds();
    const msg = new MsgSymmetric(
      new MsgHeader(MsgTypeFinal, 0, this.context.channelId),
      new MsgSecurityHeaderSymmetric(this.context.tokenId),
      new MsgSequenceHeader(sequenceNumber, requestId),
      request,
    );

    return this.pushMessage(msg);
  }

  // ─── Private methods ────────────────────────────────────────────────────────────────

  private async routeFrames(): Promise<void> {
    try {
      for (;;) {
        const { done, value } = await this.reader.read();
        if (done) {
          break;
        }

        if (!value) {
          this.logger.error("Received empty frame");
        }

        const response = value.body as IOpcType;

        if (response instanceof ServiceFault) {
          this.pending.failAll(
            new Error(`ServiceFault: ${JSON.stringify(response)}`),
          );
        } else {
          this.pending.settle(value.sequenceHeader.requestId, response);
        }
      }
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      this.pending.failAll(error);
    }
  }

  private async pushMessage(msg: MsgBase): Promise<IOpcType> {
    // Register before writing to avoid a race.
    const responsePromise = this.pending.register(msg.sequenceHeader.requestId);
    await this.writer.write(msg);
    return responsePromise;
  }

  // ─── Constructor ────────────────────────────────────────────────────────────────
  constructor(
    private readonly context: SecureChannelContext,
    private readerTransform: TransformStream<MsgBase, MsgBase>,
    private writerTransform: TransformStream<MsgBase, MsgBase>,
  ) {
    this.writer = this.writerTransform.writable.getWriter();
    this.reader = this.readerTransform.readable.getReader();
    void this.routeFrames();
  }
}
