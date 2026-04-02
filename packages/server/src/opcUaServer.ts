
import { getLogger, initLoggerProvider } from 'opcjs-base'
import type { ILogger } from 'opcjs-base'

import type { IAddressSpace } from './addressSpace/iAddressSpace.js'
import { StubAddressSpace } from './addressSpace/stubAddressSpace.js'
import { ConfigurationServer, type ServerOptions } from './configuration/configurationServer.js'
import { AttributeService } from './services/attributeService.js'
import { DiscoveryService } from './services/discoveryService.js'
import { ServiceDispatcher } from './services/serviceDispatcher.js'
import { SessionService } from './services/sessionService.js'
import { SessionManager } from './sessions/sessionManager.js'
import { ConnectionHandler } from './transport/connectionHandler.js'
import { WebSocketListener } from './transport/webSocketListener.js'

/**
 * Entry point for an OPC UA server.
 *
 * Accepts a {@link ConfigurationServer} for full control, or a plain
 * {@link ServerOptions} bag which is converted via
 * {@link ConfigurationServer.fromOptions}.
 *
 * Uses WebSocket transport with SecurityPolicy None and anonymous
 * authentication.  Start with {@link start} and stop cleanly with {@link stop}.
 *
 * The address space can be replaced before calling {@link start} by assigning
 * to the {@link addressSpace} property.  Defaults to {@link StubAddressSpace}
 * which returns `BadNodeIdUnknown` for all reads until Phase 4 provides a real
 * implementation.
 */
export class OpcUaServer {
  private readonly config: ConfigurationServer
  private readonly logger: ILogger
  private running = false
  private listener?: WebSocketListener

  /** Address space used by the Attribute service. Swap out before {@link start}. */
  public addressSpace: IAddressSpace = new StubAddressSpace()

  constructor(optionsOrConfig: ServerOptions | ConfigurationServer) {
    this.config =
      optionsOrConfig instanceof ConfigurationServer
        ? optionsOrConfig
        : ConfigurationServer.fromOptions(optionsOrConfig)

    initLoggerProvider(this.config.loggerFactory)
    this.logger = getLogger('OpcUaServer')
  }

  /** Whether the server is currently running. */
  get isRunning(): boolean {
    return this.running
  }

  /** Application URI from the configuration. */
  get applicationUri(): string {
    return this.config.applicationUri
  }

  /** The OPC UA endpoint URL (available after {@link start} completes). */
  get endpointUrl(): string {
    const cfg = this.config
    return `opc.wss://${cfg.hostname}:${cfg.port}${cfg.endpointPath}`
  }

  /** Starts the server. Resolves when the listener is bound and ready. */
  async start(): Promise<void> {
    if (this.running) {
      return
    }
    this.logger.info(
      `Starting OPC UA server "${this.config.productName}" (${this.config.applicationUri})`,
    )

    const url = this.endpointUrl
    const sessionManager = new SessionManager(this.config)
    const sessionSvc = new SessionService(sessionManager, this.config, url)
    const attributeSvc = new AttributeService(this.addressSpace)
    const discoverySvc = new DiscoveryService(this.config, url)
    const dispatcher = new ServiceDispatcher(sessionManager, sessionSvc, attributeSvc, discoverySvc)

    this.listener = new WebSocketListener(this.config.port, this.config.endpointPath, ws => {
      new ConnectionHandler(ws, url, this.config, req => dispatcher.dispatch(req, 0))
    })

    await this.listener.start()

    this.running = true
    this.logger.info(`OPC UA server started at ${url}`)
  }

  /** Stops the server and releases all resources. */
  async stop(): Promise<void> {
    if (!this.running) {
      return
    }
    this.logger.info('Stopping OPC UA server')

    await this.listener?.stop()
    this.listener = undefined

    this.running = false
    this.logger.info('OPC UA server stopped')
  }
}

