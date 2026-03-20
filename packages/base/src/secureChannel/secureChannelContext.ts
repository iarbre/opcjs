import { IEncryptionAlgorithm } from "../cryption/iEncryptionAlgorithm";
import { SecurityPolicyNone } from "../security/securityPolicyNone";

/**
 * Sequence numbers wrap when they reach this threshold (non-ECC legacy profiles).
 * Per OPC UA Part 6, Section 6.7.2.4: sequences reset before UInt32.MaxValue-1024.
 */
const SEQ_WRAP_THRESHOLD = 0xFFFFFFFF - 1024
/** After wrap-around, sequence numbers restart at 1 (non-ECC legacy profiles). */
const SEQ_WRAP_START = 1

/**
 * Shared mutable state for the OPC UA Secure Conversation layer.
 * Passed to both the chunk reader/writer and the secure channel facade so
 * they all operate on the same channel identity and sequence counters.
 */
export class SecureChannelContext {
  /**
   * Next outgoing sequence number. Starts at 1 for non-ECC legacy profiles
   * per OPC UA Part 6, Section 6.7.2.4.  The value 0 is used only as the
   * LastSequenceNumber sentinel in the OPN request ("no prior sequence").
   */
  sequenceNumber = 1
  /** Next outgoing request ID. The value 0 is reserved and must be skipped. */
  requestId = 1
  channelId = 0
  tokenId = 0
  maxSendBufferSize = 0x7FFFFFFF
  maxRecvBufferSize = 0x7FFFFFFF
  /** Pending chunk bodies keyed by requestId, for reassembling multi-chunk messages. */
  chunkBuffers = new Map<number, Uint8Array[]>()
  securityAlgorithm?: IEncryptionAlgorithm
  /** Last remote sequence number seen; undefined before the first received message. */
  lastRemoteSequenceNumber: number | undefined = undefined

  public readonly securityPolicy = new SecurityPolicyNone()

  /**
   * Returns the current outgoing sequence number then advances it with
   * UInt32 wrap-around per OPC UA Part 6, Section 6.7.2.4.  Only advances
   * the sequence counter — use when creating additional chunks for the same
   * message (each chunk needs its own sequence number but the same requestId).
   */
  nextSequenceNumber(): number {
    const seq = this.sequenceNumber
    if (this.sequenceNumber >= SEQ_WRAP_THRESHOLD) {
      this.sequenceNumber = SEQ_WRAP_START
    } else {
      this.sequenceNumber++
    }
    return seq
  }

  /**
   * Returns the next outgoing sequence number and request ID, then advances
   * both counters.  Call once per outgoing message; use {@link nextSequenceNumber}
   * for additional chunks of the same message.
   *
   * Handles UInt32 wrap-around per OPC UA Part 6, Section 6.7.2.4:
   * sequence numbers reset to 1 after reaching 0xFFFFFFFF-1024; request IDs
   * skip the reserved value 0 on wrap.
   */
  nextIds(): { sequenceNumber: number; requestId: number } {
    const result = { sequenceNumber: this.nextSequenceNumber(), requestId: this.requestId }

    // Advance request ID, skipping the reserved value 0.
    this.requestId++
    if (this.requestId === 0) {
      this.requestId = 1
    }

    return result
  }

  constructor(public readonly endpointUrl: string) {}
}
