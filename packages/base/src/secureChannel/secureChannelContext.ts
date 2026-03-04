import { IEncryptionAlgorithm } from "../cryption/iEncryptionAlgorithm";
import { SecurityPolicyNone } from "../security/securityPolicyNone";

const INT32_MAX = 2147483647;  // 0x7FFFFFFF

/**
 * Shared mutable state for the OPC UA Secure Conversation layer.
 * Passed to both {@link SecureChannelReadable} and {@link SecureChannelWritable}
 * so they operate on the same channel identity and sequence counters.
 */
export class SecureChannelContext {
  sequenceNumber = 0;
  requestNumber = 1;
  channelId = 0;
  tokenId = 0;
  maxSendBufferSize = INT32_MAX;
  maxRecvBufferSize = INT32_MAX;
  chunkBuffers: Uint8Array[] = [];
  securityAlgorithm?: IEncryptionAlgorithm;

  public readonly securityPolicy = new SecurityPolicyNone();

  /**
   * Atomically increments and returns the next sequence number and request id.
   * Call once per outgoing message so both counters stay in sync.
   */
  nextIds(): { sequenceNumber: number; requestId: number } {
    return {
      sequenceNumber: this.sequenceNumber++,
      requestId: this.requestNumber++,
    };
  }

  constructor(public readonly endpointUrl: string) { }
}
