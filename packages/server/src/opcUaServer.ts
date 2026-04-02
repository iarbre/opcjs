
import { getLogger, initLoggerProvider } from 'opcjs-base'
import type { ILogger } from 'opcjs-base'

import { ConfigurationServer, type ServerOptions } from './configuration/configurationServer.js'
import { WebSocketListener } from './transport/webSocketListener.js'
import { ConnectionHandler } from './transport/connectionHandler.js'
import type { ServerServiceHandler } from './secureChannel/secureChannelServer.js'

/**
 * Entry point for an OPC UA server.
 *
 * Accepts a {@link ConfigurationServer} for full control, or a plain
 * {@link ServerOptions} bag which is converted via
 * {@link ConfigurationServer.fromOptions}.
 *
 * Uses WebSocket transport with SecurityPolicy None and anonymous
 * authentication.  Start with {@link start} and stop cleanly with {@link stop}.
 */
export class OpcUaServer {
  private readonly config: ConfigurationServer
  private readonly logger: ILogger
  private running = false
  private listener?: WebSocketListener

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

    // Placeholder service handler — replaced by the full dispatcher in Phase 3.
    const placeholderServiceHandler: ServerServiceHandler = () =>
      Promise.reject(new Error('Service not yet implemented'))

    this.listener = new WebSocketListener(this.config.port, this.config.endpointPath, ws => {
      new ConnectionHandler(ws, url, this.config, placeholderServiceHandler)
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

