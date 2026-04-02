import {
  getLogger,
  SecureChannelChunkReader,
  SecureChannelChunkWriter,
  SecureChannelContext,
  SecureChannelMessageDecoder,
  SecureChannelMessageEncoder,
  SecureChannelTypeDecoder,
  SecureChannelTypeEncoder,
  TcpMessageDecoupler,
  TcpMessageInjector,
  WebSocketReadableStream,
  WebSocketWritableStream,
} from 'opcjs-base'
import type { WebSocket as WsWebSocket } from 'ws'

import type { ConfigurationServer } from '../configuration/configurationServer.js'
import { NodeWebSocketAdapter } from './nodeWebSocketAdapter.js'
import { TcpServerHandshakeTransform } from './tcpServerHandshakeTransform.js'
import { SecureChannelServer, type ServerServiceHandler } from '../secureChannel/secureChannelServer.js'

/**
 * Manages one accepted WebSocket connection and its full OPC UA processing
 * pipeline.
 *
 * Inbound pipeline (decoding):
 *   WsWebSocket → NodeWebSocketAdapter → WebSocketReadableStream
 *     → TcpMessageDecoupler
 *     → TcpServerHandshakeTransform   (intercepts Hello, replies with Ack)
 *     → SecureChannelMessageDecoder → SecureChannelChunkReader
 *     → SecureChannelTypeDecoder
 *
 * Outbound pipeline (encoding):
 *   SecureChannelTypeEncoder → SecureChannelChunkWriter
 *     → SecureChannelMessageEncoder → TcpMessageInjector
 *     → NodeWebSocketAdapter → WsWebSocket
 *
 * The same {@link WebSocketReadableStream} and {@link WebSocketWritableStream}
 * from `opcjs-base` are used here as in the client — both now accept the
 * {@link WebSocketLike} interface, which {@link NodeWebSocketAdapter} implements.
 */
export class ConnectionHandler {
  private readonly logger = getLogger('transport.ConnectionHandler')

  constructor(
    ws: WsWebSocket,
    endpointUrl: string,
    configuration: ConfigurationServer,
    serviceHandler: ServerServiceHandler,
  ) {
    this.logger.info('New connection handler created')

    // ── WebSocket adapter (normalises ws EventEmitter → WebSocketLike) ─────
    const adapter = new NodeWebSocketAdapter(ws)

    // ── Streams reused from base package ───────────────────────────────────
    const readable = new WebSocketReadableStream(adapter, 1000)
    const writable = new WebSocketWritableStream(adapter)

    // ── Per-connection secure channel context ──────────────────────────────
    const scContext = new SecureChannelContext(endpointUrl)
    // Initialise with the asymmetric (pass-through for SecurityPolicy None)
    // algorithm so the message decoder can process the incoming OPN frame.
    scContext.securityAlgorithm = scContext.securityPolicy.getAlgorithmAsymmetric(
      new Uint8Array(),
      new Uint8Array(),
    )

    // ── Outbound pipeline ──────────────────────────────────────────────────
    const tcpInjector = new TcpMessageInjector()
    const scTypeEncoder = new SecureChannelTypeEncoder(configuration.encoder)
    const scChunkWriter = new SecureChannelChunkWriter(scContext)
    const scMessageEncoder = new SecureChannelMessageEncoder(scContext)

    scTypeEncoder.readable.pipeTo(scChunkWriter.writable)
    scChunkWriter.readable.pipeTo(scMessageEncoder.writable)
    scMessageEncoder.readable.pipeTo(tcpInjector.writable)
    tcpInjector.readable.pipeTo(writable)

    // ── Inbound pipeline ───────────────────────────────────────────────────
    const scMessageDecoder = new SecureChannelMessageDecoder(scContext)
    const scChunkReader = new SecureChannelChunkReader(scContext)
    const scTypeDecoder = new SecureChannelTypeDecoder(configuration.decoder)

    // TcpMessageDecoupler passes Hello bytes through; TcpServerHandshakeTransform
    // intercepts them, sends Ack via the injector, and does not forward them.
    readable
      .pipeThrough(new TcpMessageDecoupler(() => {}))
      .pipeThrough(new TcpServerHandshakeTransform(tcpInjector, scContext))
      .pipeTo(scMessageDecoder.writable)
    scMessageDecoder.readable.pipeTo(scChunkReader.writable)
    scChunkReader.readable.pipeTo(scTypeDecoder.writable)

    // ── SecureChannelServer drives the request/response loop ───────────────
    new SecureChannelServer(scContext, scTypeDecoder, scTypeEncoder, serviceHandler)

    this.logger.debug('Connection pipeline established')
  }
}
