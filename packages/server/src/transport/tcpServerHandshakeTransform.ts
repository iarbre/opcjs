import {
  BinaryReader,
  BinaryWriter,
  MsgAck,
  MsgHello,
  TcpMessageInjector,
  TcpMsgHeader,
  type SecureChannelContext,
} from 'opcjs-base'

/** Maximum buffer size the server will advertise and accept, in bytes. */
const MAX_BUFFER_SIZE = 65_536

/** Hex value of the Hello message type constant (HEL + 'F' isoframe indicator). */
const MSG_TYPE_HELLO = 'H'.charCodeAt(0) |
  ('E'.charCodeAt(0) << 8) |
  ('L'.charCodeAt(0) << 16) |
  ('F'.charCodeAt(0) << 24)

/**
 * Server-side TCP handshake as a `TransformStream`.
 *
 * Placed immediately after {@link TcpMessageDecoupler} in the server inbound
 * pipeline. When a Hello message arrives it:
 * 1. Negotiates buffer sizes per OPC UA Part 6 §7.1.2.
 * 2. Sends an Acknowledge message through the {@link TcpMessageInjector}.
 * 3. Does **not** forward the Hello frame downstream.
 *
 * All other frames are passed through unchanged so the rest of the pipeline
 * (SecureChannelMessageDecoder, etc.) processes them normally.
 *
 * This approach avoids modifying `TcpMessageDecoupler`; Hello bytes are simply
 * enqueued by the decoupler and intercepted here.
 */
export class TcpServerHandshakeTransform extends TransformStream<Uint8Array, Uint8Array> {
  constructor(injector: TcpMessageInjector, context: SecureChannelContext) {
    super({
      transform(chunk, controller) {
        const reader = new BinaryReader(chunk)
        const header = TcpMsgHeader.decode(reader)

        if (header.messageType === MSG_TYPE_HELLO) {
          const hello = MsgHello.decode(header, reader)

          // Negotiate buffer sizes: take the minimum of client request and server max.
          context.maxRecvBufferSize = Math.min(hello.ReceiveBufferSize, MAX_BUFFER_SIZE)
          context.maxSendBufferSize = Math.min(hello.SendBufferSize, MAX_BUFFER_SIZE)

          const ack = new MsgAck(0, context.maxRecvBufferSize, context.maxSendBufferSize, 0, 0)
          const writer = new BinaryWriter()
          ack.encode(writer)
          injector.sendMessage(writer.getData())

          // Hello is handled; do not forward to the secure-channel decoder.
        } else {
          controller.enqueue(chunk)
        }
      },
    })
  }
}
