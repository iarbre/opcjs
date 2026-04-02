import { getLogger, initLoggerProvider, LoggerFactory, ConsoleSink } from 'opcjs-base'
import type { ILogger } from 'opcjs-base'
import type { ServerOptions } from './serverOptions.js'

/**
 * Entry point for an OPC UA server.
 *
 * Runs in Node.js (TCP transport) and in the browser (WebSocket transport).
 * Start the server with {@link start} and stop it cleanly with {@link stop}.
 */
export class OpcUaServer {
  private readonly _options: ServerOptions
  private readonly _logger: ILogger
  private _running = false

  constructor(options: ServerOptions) {
    this._options = options

    // Set up logging: use the provided factory or fall back to a console sink.
    const factory = options.loggerFactory ?? new LoggerFactory([new ConsoleSink()])
    initLoggerProvider(factory)
    this._logger = getLogger('OpcUaServer')
  }

  /** Whether the server is currently running. */
  get isRunning(): boolean {
    return this._running
  }

  /** Application URI as supplied in {@link ServerOptions}. */
  get applicationUri(): string {
    return this._options.applicationUri
  }

  /** Start the server. Resolves when the server is ready to accept connections. */
  async start(): Promise<void> {
    if (this._running) {
      return
    }
    this._logger.info(`Starting OPC UA server "${this._options.productName}" (${this._options.applicationUri})`)
    // TODO: initialise transport, address space, and session manager.
    this._running = true
    this._logger.info('OPC UA server started')
  }

  /** Stop the server and release all resources. */
  async stop(): Promise<void> {
    if (!this._running) {
      return
    }
    this._logger.info('Stopping OPC UA server')
    // TODO: close sessions, shut down transport.
    this._running = false
    this._logger.info('OPC UA server stopped')
  }
}
