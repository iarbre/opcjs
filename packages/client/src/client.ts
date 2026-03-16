import {
  NodeId,
  TcpConnectionHandler,
  SecureChannelFacade,
  SecureChannelContext,
  SecureChannelMesssageEncoder,
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
  Variant
} from "opcjs-base";
import { SessionHandler } from "./sessions/sessionHandler";
import { Session } from "./sessions/session";
import { AttributeService } from "./services/attributeService";
import { ReadValueResult } from "./readValueResult";
import { SubscriptionHandler } from "./subscriptionHandler";
import { SubscriptionService } from "./services/subscriptionService";
import { MonitoredItemService } from "./services/monitoredItemService";
import { UserIdentity } from "./userIdentity";
import { ConfigurationClient } from "./configurationClient";
import { ILogger } from "opcjs-base";
import { MethodService } from "./services/methodService";
import { CallMethodResult } from "./callMethodResult";
import { UaPrimitive } from "../../base/src/types/primitives";

export class Client {
  private endpointUrl: string;
  private attributeService?: AttributeService;
  private methodService?: MethodService;
  private session?: Session;
  private subscriptionHandler?: SubscriptionHandler;
  private logger: ILogger;

  getSession(): Session {
    if (!this.session) {
      throw new Error("No session available");
    }
    return this.session;
  }

  async connect(): Promise<void> {

    const wsOptions = { endpoint: this.endpointUrl }
    const ws = new WebSocketFascade(wsOptions);
    const webSocketReadableStream = new WebSocketReadableStream(ws, 1000);
    const webSocketWritableStream = new WebSocketWritableStream(ws);

    const scContext = new SecureChannelContext(this.endpointUrl);
    const tcpMessageInjector = new TcpMessageInjector();
    const tcpConnectionHandler = new TcpConnectionHandler(tcpMessageInjector, scContext);
    const tcpMessageDecoupler = new TcpMessageDecoupler(tcpConnectionHandler.onTcpMessage.bind(tcpConnectionHandler));
    const scMessageEncoder = new SecureChannelMesssageEncoder(scContext);
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

    // const response = await sc.send(request, wsWritable);

    //const channel = ChannelFactory.createChannel(this.endpointUrl);
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

    //this.channel = new SecureChannel(channel, this.configuration);
    this.logger.debug("Opening secure channel...");
    await sc.openSecureChannel();
    this.logger.debug("Secure channel established.");

    this.logger.debug("Creating session...");
    const sessionHandler = new SessionHandler(sc, this.configuration);
    this.session = await sessionHandler.createNewSession(this.identity);
    this.logger.debug("Session created.");

    this.logger.debug("Initializing services...");
    this.attributeService = new AttributeService(this.session.getAuthToken(), sc);
    this.methodService = new MethodService(this.session.getAuthToken(), sc);
    this.subscriptionHandler = new SubscriptionHandler(
      new SubscriptionService(this.session.getAuthToken(), sc),
      new MonitoredItemService(this.session.getAuthToken(), sc),
    );
  }

  async disconnect(): Promise<void> {
    this.logger.info("Disconnecting from OPC UA server...");
    // Implementation of disconnection logic goes here
    // if (this.channel) {
    //   await this.channel.disconnect();
    // }
  }

  async read(ids: NodeId[]): Promise<ReadValueResult[]> {
    const result = await this.attributeService?.ReadValue(ids);
    return result?.map((r) => new ReadValueResult(r.value, r.status)) || [];
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
    inputArguments: UaPrimitive[] = []
  ): Promise<CallMethodResult> {
    const request = new CallMethodRequest();
    request.objectId = objectId;
    request.methodId = methodId;
    request.inputArguments = inputArguments.map(arg => Variant.newFrom(arg));

    const responses = await this.methodService!.call([request]);
    const response = responses[0];

    return new CallMethodResult(response.value, response.status);
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
