import {
  NodeId,
  ISecureChannel,
  TcpConnectionHandler,
  SecureChannelFacade,
  SecureChannelContext,
  SecureChannelMessageEncoder,
  SecureChannelTypeDecoder,
  SecureChannelMessageDecoder,
  SecureChannelTypeEncoder,
  initLoggerProvider,
  TcpMessageInjector,
  TcpMessageDecoupler,
  getLogger,
  WebSocketFascade,
  WebSocketReadableStream,
  WebSocketWritableStream,
  SecureChannelChunkReader,
  SecureChannelChunkWriter,
  CallMethodRequest,
  Variant,
  BrowseDescription,
  BrowseDirectionEnum,
  BrowseResultMaskEnum,
  ReferenceDescription,
  ILogger,
} from 'opcjs-base'

import { SessionHandler } from './sessions/sessionHandler.js'
import { Session } from './sessions/session.js'
import { SessionInvalidError } from './sessions/sessionInvalidError.js'
import { SECURITY_POLICY_NONE_URI } from './securityConfiguration.js'
import { AttributeService } from './services/attributeService.js'
import { ReadValueResult } from './readValueResult.js'
import { SubscriptionHandler } from './subscriptionHandler.js'
import { SubscriptionService } from './services/subscriptionService.js'
import { MonitoredItemService } from './services/monitoredItemService.js'
import { UserIdentity } from './userIdentity.js'
import { ConfigurationClient } from './configurationClient.js'
import { MethodService } from './services/methodService.js'
import { CallMethodResult } from './callMethodResult.js'
import { BrowseService } from './services/browseService.js'
import { BrowseNodeResult } from './browseNodeResult.js'
import { MethodArgument } from './methodArgument.js'

/** NodeId of Server_ServerStatus (ns=0, i=2256) — a cheap server-side read used for session keep-alive. */
const SERVER_STATUS_NODE_ID = NodeId.newNumeric(0, 2256)
/**
 * How often to read the server when no subscription is active (ms).
 * Must be shorter than the server's revisedSessionTimeout (default: 60 000 ms).
 */
const KEEP_ALIVE_INTERVAL_MS = 25_000

export class Client {
  private endpointUrl: string
  private attributeService?: AttributeService
  private methodService?: MethodService
  private browseService?: BrowseService
  private session?: Session
  private subscriptionHandler?: SubscriptionHandler
  private logger: ILogger
  // Stored after connect() so that refreshSession() and disconnect() can use them.
  private secureChannel?: ISecureChannel
  private secureChannelFacade?: SecureChannelFacade
  private ws?: WebSocketFascade
  private sessionHandler?: SessionHandler
  private keepAliveTimer?: ReturnType<typeof setInterval>

  getSession(): Session {
    if (!this.session) {
      throw new Error('No session available')
    }
    return this.session
  }

  /**
   * (Re-)initialises all session-scoped services from the current `this.session`.
   * Called both after the initial `connect()` and after a session refresh.
   */
  private initServices(): void {
    const authToken = this.session!.getAuthToken()
    const sc = this.secureChannel!
    this.attributeService = new AttributeService(authToken, sc)
    this.methodService = new MethodService(authToken, sc)
    this.browseService = new BrowseService(authToken, sc)
    this.subscriptionHandler = new SubscriptionHandler(
      new SubscriptionService(authToken, sc),
      new MonitoredItemService(authToken, sc),
    )
  }

  /**
   * Executes `fn` and, if it throws a `SessionInvalidError`, creates a fresh
   * session and retries the operation exactly once.
   *
   * This covers the reactive case: a service call reveals that the server has
   * already dropped the session (e.g. due to timeout). The new session is
   * established transparently before re-running the original operation.
   *
   * For any other error (e.g. transport-level failures when the SecureChannel
   * drops), this method attempts to reconnect the channel and reactivate the
   * existing session first — falling back to a brand-new session only when
   * reactivation fails — before retrying the operation once.
   */
  private async withSessionRefresh<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn()
    } catch (err) {
      if (err instanceof SessionInvalidError) {
        this.logger.info(`Session invalid (${err.statusCode.toString(16)}), refreshing session...`)
        this.session = await this.sessionHandler!.createNewSession(this.identity)
        this.initServices()
        this.logger.info('Session refreshed, retrying operation.')

        // Retry once with the new session.  If it fails again the error propagates.
        return await fn()
      }

      // Possibly a channel drop: attempt reconnect + ActivateSession on existing session
      // before giving up and creating a brand-new session (OPC UA Part 4 Session Auto Reconnect).
      this.logger.info('Service call failed, attempting channel reconnect and session reactivation...')
      try {
        await this.reconnectAndReactivate()
        this.initServices()
        this.logger.info('Reconnected successfully, retrying operation.')
      } catch (reconnectErr) {
        // Reconnect itself failed; surface the original error so the caller
        // gets a meaningful diagnostic (the reconnect error is logged separately).
        this.logger.warn('Channel reconnect failed:', reconnectErr)
        throw err
      }

      // Retry once after a successful reconnect.  If it fails again the error propagates.
      return await fn()
    }
  }

  /**
   * Starts a periodic keep-alive timer that reads Server_ServerStatus when no subscription is
   * active. OPC UA Part 4, Section 5.7.1 requires clients to keep the session alive; when no
   * subscription Publish loop is running this is the only mechanism that does so.
   */
  private startKeepAlive(): void {
    this.keepAliveTimer = setInterval(() => {
      if (this.subscriptionHandler?.hasActiveSubscription()) {
        // The subscription publish loop is already keeping the session alive.
        return
      }
      if (this.attributeService) {
        void this.attributeService.ReadValue([SERVER_STATUS_NODE_ID]).catch((err) => {
          this.logger.warn('Keep-alive read failed:', err)
        })
      }
    }, KEEP_ALIVE_INTERVAL_MS)
  }

  private stopKeepAlive(): void {
    clearInterval(this.keepAliveTimer)
    this.keepAliveTimer = undefined
  }

  async connect(): Promise<void> {
    const { ws, sc } = await this.openTransportAndChannel()

    this.secureChannel = sc
    this.secureChannelFacade = sc
    this.ws = ws

    this.logger.debug('Creating session...')
    this.sessionHandler = new SessionHandler(sc, this.configuration)
    this.session = await this.sessionHandler.createNewSession(this.identity)
    this.logger.debug('Session created.')

    this.logger.debug('Initializing services...')
    this.initServices()
    this.startKeepAlive()
  }

  /**
   * Builds the full WebSocket → TCP → SecureChannel pipeline and returns the
   * two objects needed to drive it: the raw WebSocket facade (for teardown)
   * and the SecureChannelFacade (for service requests/session management).
   *
   * Extracted from `connect()` so it can be reused by `reconnectAndReactivate()`.
   */
  private async openTransportAndChannel(): Promise<{ ws: WebSocketFascade; sc: SecureChannelFacade }> {
    const wsOptions = { endpoint: this.endpointUrl }
    const ws = new WebSocketFascade(wsOptions);
    const webSocketReadableStream = new WebSocketReadableStream(ws, 1000);
    const webSocketWritableStream = new WebSocketWritableStream(ws);

    const scContext = new SecureChannelContext(this.endpointUrl);
    const tcpMessageInjector = new TcpMessageInjector();
    const tcpConnectionHandler = new TcpConnectionHandler(tcpMessageInjector, scContext);
    const tcpMessageDecoupler = new TcpMessageDecoupler(tcpConnectionHandler.onTcpMessage.bind(tcpConnectionHandler));
    const scMessageEncoder = new SecureChannelMessageEncoder(scContext);
    const scTypeDecoder = new SecureChannelTypeDecoder(
      this.configuration.decoder,
    );
    const scMessageDecoder = new SecureChannelMessageDecoder(scContext);
    const scTypeEncoder = new SecureChannelTypeEncoder(
      this.configuration.encoder,
    );
    const scChunkWriter = new SecureChannelChunkWriter(scContext);
    const scChunkReader = new SecureChannelChunkReader(scContext);

    webSocketReadableStream.pipeTo(tcpMessageDecoupler.writable);
    tcpMessageDecoupler.readable.pipeTo(scMessageDecoder.writable);
    scMessageDecoder.readable.pipeTo(scChunkReader.writable);
    scChunkReader.readable.pipeTo(scTypeDecoder.writable);

    scTypeEncoder.readable.pipeTo(scChunkWriter.writable);
    scChunkWriter.readable.pipeTo(scMessageEncoder.writable);
    scMessageEncoder.readable.pipeTo(tcpMessageInjector.writable);
    tcpMessageInjector.readable.pipeTo(webSocketWritableStream);

    const sc = new SecureChannelFacade(scContext, scTypeDecoder, scTypeEncoder);

    let connected = false;
    while (!connected) {
      this.logger.debug(`Connecting to OPC UA server at ${this.endpointUrl}...`);
      await ws.connect();
      this.logger.debug("WebSocket connection established, now establishing TCP connection...");
      connected = await tcpConnectionHandler.connect(this.endpointUrl);

      if (!connected) {
        this.logger.info("Connection failed, retrying in 2 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
    this.logger.info("Connected to OPC UA server.");

    this.logger.debug("Opening secure channel...");
    await sc.openSecureChannel();
    this.logger.debug("Secure channel established.");

    // Enforce any channel-level security requirements before proceeding.
    this.enforceChannelSecurityConfig(sc);

    return { ws, sc };
  }

  /**
   * Validates the negotiated channel's security policy and mode against the
   * client's `SecurityConfiguration` (OPC UA Part 2, Security Administration).
   *
   * Throws if:
   * - `allowSecurityPolicyNone` is `false` and the channel uses SecurityPolicy None.
   * - `messageSecurityMode` is set and does not match the channel's actual mode.
   */
  private enforceChannelSecurityConfig(sc: SecureChannelFacade): void {
    const config = this.configuration.securityConfiguration
    if (!config) return

    const negotiatedPolicy = sc.getSecurityPolicy()
    const negotiatedMode = sc.getSecurityMode()

    if (config.allowSecurityPolicyNone === false && negotiatedPolicy === SECURITY_POLICY_NONE_URI) {
      throw new Error(
        'Connection refused: SecurityPolicy None is disabled by the client security configuration. ' +
        'Only SecurityPolicy None is currently supported by this client implementation.',
      )
    }

    if (config.messageSecurityMode !== undefined && config.messageSecurityMode !== negotiatedMode) {
      throw new Error(
        `Connection refused: negotiated MessageSecurityMode ${negotiatedMode} does not match ` +
        `the required mode ${config.messageSecurityMode} from the security configuration.`,
      )
    }
  }

  /**
   * Tears down the current (dead) channel and establishes a fresh one, then
   * attempts to recover the existing OPC UA session via ActivateSession before
   * falling back to a full CreateSession + ActivateSession.
   *
   * OPC UA Part 4, Section 5.7.1 / Session Client Auto Reconnect conformance unit:
   * When the SecureChannel drops but the server-side session has not yet timed
   * out, the client SHOULD reuse the existing session by calling ActivateSession
   * on the new channel.  Only if that fails should the client create a new session.
   */
  private async reconnectAndReactivate(): Promise<void> {
    this.logger.info('Tearing down dead channel before reconnect...')

    // Close the old channel and WebSocket (best effort — they may already be dead).
    try { this.secureChannelFacade?.close() } catch { /* already dead */ }
    try { this.ws?.close() } catch { /* already dead */ }
    this.secureChannelFacade = undefined
    this.secureChannel = undefined
    this.ws = undefined

    const { ws, sc } = await this.openTransportAndChannel()
    this.secureChannel = sc
    this.secureChannelFacade = sc
    this.ws = ws
    this.sessionHandler = new SessionHandler(sc, this.configuration)

    // Attempt to reactivate the existing session on the new channel.
    if (this.session) {
      const reactivated = await this.sessionHandler.tryActivateExistingSession(
        this.session.getAuthToken(),
        this.session.getSessionId(),
        this.session.getEndpoint(),
        this.identity,
      )
      if (reactivated !== null) {
        this.session = reactivated
        this.logger.info('Existing session successfully reactivated on new channel.')
        return
      }
      this.logger.info('ActivateSession for existing session failed; creating a fresh session...')
    }

    // Fall back: full CreateSession + ActivateSession.
    this.session = await this.sessionHandler.createNewSession(this.identity)
    this.logger.info('Fresh session established on new channel.')
  }

  /**
   * Gracefully disconnects from the OPC UA server.
   *
   * Sequence per OPC UA Part 4, Section 5.7.4:
   * 1. CloseSession (deleteSubscriptions=true) so the server frees all resources.
   * 2. Close the SecureChannel, which cancels the pending token-renewal timer.
   * 3. Close the WebSocket transport.
   *
   * CloseSession errors are swallowed so transport teardown always completes even
   * when the session has already expired on the server side.
   */
  async disconnect(): Promise<void> {
    this.logger.info('Disconnecting from OPC UA server...')
    this.stopKeepAlive()

    if (this.session && this.sessionHandler) {
      try {
        await this.sessionHandler.closeSession(true)
      } catch (err) {
        // Session may already be gone on the server; log and continue teardown.
        this.logger.warn('CloseSession failed (continuing teardown):', err)
      }
      this.session = undefined
    }

    this.secureChannelFacade?.close()
    this.secureChannelFacade = undefined
    this.secureChannel = undefined

    this.ws?.close()
    this.ws = undefined

    this.logger.info('Disconnected.')
  }

  async read(ids: NodeId[]): Promise<ReadValueResult[]> {
    return this.withSessionRefresh(async () => {
      const result = await this.attributeService?.ReadValue(ids)
      return result?.map(r => new ReadValueResult(r.value, r.statusCode)) ?? []
    })
  }

  /**
   * Method for calling a single method on the server.
   * @param objectId - NodeId of the Object that owns the method.
   * @param methodId - NodeId of the Method to invoke.
   * @param inputArguments - Input argument Variants (default: empty).
   * @returns The CallMethodResult for the invoked method.
   */
  async callMethod(
    objectId: NodeId,
    methodId: NodeId,
    inputArguments: MethodArgument[] = []
  ): Promise<CallMethodResult> {
    return this.withSessionRefresh(async () => {
      const request = new CallMethodRequest()
      request.objectId = objectId
      request.methodId = methodId
      request.inputArguments = inputArguments.map(arg => Variant.newFrom(arg))

      const responses = await this.methodService!.call([request])
      const response = responses[0]
      return new CallMethodResult(response.value, response.statusCode)
    })
  }

  async browse(
    nodeId: NodeId,
    recursive: boolean = false,
  ): Promise<BrowseNodeResult[]> {
    return this.withSessionRefresh(() => {
      const visited = new Set<string>()
      return this.browseRecursive(nodeId, recursive, visited)
    })
  }

  private async browseRecursive(
    nodeId: NodeId,
    recursive: boolean,
    visited: Set<string>,
  ): Promise<BrowseNodeResult[]> {
    const nodeKey = `${nodeId.namespace}:${nodeId.identifier}`;
    if (visited.has(nodeKey)) {
      return [];
    }
    visited.add(nodeKey);

    const description = new BrowseDescription();
    description.nodeId = nodeId;
    description.browseDirection = BrowseDirectionEnum.Forward;
    description.referenceTypeId = NodeId.newNumeric(0, 33); // HierarchicalReferences
    description.includeSubtypes = true;
    description.nodeClassMask = 0; // all node classes
    description.resultMask = BrowseResultMaskEnum.All;

    const browseResults = await this.browseService!.browse([description]);
    const browseResult = browseResults[0];
    const allReferences = [...(browseResult.references ?? [])];

    let continuationPoint = browseResult.continuationPoint;
    while (continuationPoint && continuationPoint.byteLength > 0) {
      const nextResults = await this.browseService!
        .browseNext([continuationPoint], false);
      const nextResult = nextResults[0];
      allReferences.push(...(nextResult.references ?? []));
      continuationPoint = nextResult.continuationPoint;
    }

    const results = allReferences.map((ref: ReferenceDescription) =>
      new BrowseNodeResult(
        ref.referenceTypeId,
        ref.isForward,
        ref.nodeId,
        ref.browseName,
        ref.displayName,
        ref.nodeClass,
        ref.typeDefinition,
      )
    );

    if (recursive) {
      for (const ref of allReferences) {
        const childNodeId = NodeId.newNumeric(
          ref.nodeId.nodeId.namespace,
          ref.nodeId.nodeId.identifier as number,
        );
        const childResults = await this.browseRecursive(
          childNodeId, true, visited,
        );
        results.push(...childResults);
      }
    }

    return results;
  }

  async subscribe(
    ids: NodeId[],
    callback: (data: { id: NodeId; value: unknown }[]) => void,
  ) {
    this.subscriptionHandler?.subscribe(ids, callback);
  }

  constructor(
    endpointUrl: string,
    private configuration: ConfigurationClient,
    private identity: UserIdentity,
  ) {
    this.endpointUrl = endpointUrl;
    initLoggerProvider(configuration.loggerFactory);
    this.logger = getLogger("Client");
  }
}
