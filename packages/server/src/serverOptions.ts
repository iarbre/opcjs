import type { ILoggerFactory } from 'opcjs-base'

/** Options for constructing an {@link OpcUaServer}. */
export type ServerOptions = {
  /** Application URI identifying this server instance. */
  applicationUri: string
  /** Human-readable product name. */
  productName: string
  /** Optional logger factory. When omitted the server creates a console logger. */
  loggerFactory?: ILoggerFactory
}
