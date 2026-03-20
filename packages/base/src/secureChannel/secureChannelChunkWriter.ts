
import { getLogger } from "../utils/logger/loggerProvider";
import { MsgBase } from "./messages/msgBase";
import { MsgHeader } from "./messages/msgHeader";
import { MsgSecurityHeaderSymmetric } from "./messages/msgSecurityHeaderSymmetric";
import { MsgSequenceHeader } from "./messages/msgSequenceHeader";
import { MsgSymmetric } from "./messages/msgSymmetric";
import {
    MsgTypeChunk,
    MsgTypeFinal,
} from "./messages/msgType";
import { SecureChannelContext } from "./secureChannelContext";


export class SecureChannelChunkWriter extends TransformStream<MsgBase, MsgBase> {
    private logger = getLogger("secureChannel.SecureChannelChunkWriter");

    private transform(
        msg: MsgBase,
        controller: TransformStreamDefaultController<MsgBase>,
    ): void {

        const msgSymmetric = msg as MsgSymmetric;
        if (msgSymmetric) {
            switch (msg.header.msgType) {

                case MsgTypeFinal: {
                    this.logger.debug("Received Final message");

                    const securityAlgorithm = this.context.securityAlgorithm!

                    // Available ciphertext space after fixed message framing.
                    const maxCipherTextSize =
                        this.context.maxSendBufferSize - MsgHeader.Size - MsgSecurityHeaderSymmetric.Size

                    // Convert to max payload per chunk: GetMaxPayload handles the
                    // cipher-block/padding/signature overhead; subtract the sequence
                    // header that sits in front of every chunk body.
                    const maxPayloadSize =
                        securityAlgorithm.GetMaxPayload(maxCipherTextSize) - MsgSequenceHeader.Size

                    const data = msgSymmetric.body as Uint8Array
                    const numChunks = Math.ceil(data.byteLength / maxPayloadSize)

                    if (numChunks > 1) {
                        this.logger.debug(`Message body exceeds max chunk size, splitting into ${numChunks} chunks.`)

                        // Emit the N-1 intermediate chunks, each with its own sequence number.
                        for (let i = 0; i < numChunks - 1; i++) {
                            const chunkMsg = new MsgSymmetric(
                                new MsgHeader(MsgTypeChunk, -1, msgSymmetric.header.secureChannelId),
                                msgSymmetric.securityHeader,
                                new MsgSequenceHeader(
                                    this.context.nextSequenceNumber(),
                                    msgSymmetric.sequenceHeader.requestId,
                                ),
                                data.subarray(i * maxPayloadSize, (i + 1) * maxPayloadSize),
                            )
                            this.logger.trace(
                                `Enqueuing chunk ${i + 1}/${numChunks} with size ${(chunkMsg.body as Uint8Array).byteLength} bytes.`,
                            )
                            controller.enqueue(chunkMsg)
                        }

                        // Update the final message to carry the last slice with a fresh sequence number.
                        msg.sequenceHeader = new MsgSequenceHeader(
                            this.context.nextSequenceNumber(),
                            msgSymmetric.sequenceHeader.requestId,
                        )
                        msg.body = data.subarray((numChunks - 1) * maxPayloadSize)
                    }

                    break
                }

                default:
                    break
            }
        }

        this.logger.trace(`Enqueuing final message with body size ${(msg.body as Uint8Array).byteLength} bytes.`)
        controller.enqueue(msg)
    }

    constructor(private context: SecureChannelContext) {
        super({
            transform: (data, controller) => this.transform(data, controller),
        })
    }
}
