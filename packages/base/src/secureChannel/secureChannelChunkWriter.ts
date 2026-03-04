
import { getLogger } from "../utils/logger/loggerProvider";
import { MsgBase } from "./messages/msgBase";
import { MsgHeader } from "./messages/msgHeader";
import { MsgSecurityHeaderSymmetric } from "./messages/msgSecurityHeaderSymmetric";
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
                    this.logger.debug("Received Final message");;

                    const securityAlgorithm = this.context.securityAlgorithm!;
                    const maxCipherTextSize = this.context.maxSendBufferSize - MsgHeader.Size - MsgSecurityHeaderSymmetric.Size;
                    const maxPlainTextSize = maxCipherTextSize / securityAlgorithm.GetEncryptedSize(maxCipherTextSize);
                    const maxPayloadSize = maxPlainTextSize
                        - securityAlgorithm.GetSignatureLength()
                        - 1
                        - MsgSecurityHeaderSymmetric.Size
                        + (securityAlgorithm.IsAuthenticated() ? 1 : 0);

                    const data = msgSymmetric.body as Uint8Array;
                    const chunkCount = data.byteLength / maxPayloadSize;
                    if (chunkCount > 1) {
                        this.logger.debug(`Message body exceeds max chunk size, splitting into ${chunkCount} chunks.`);
                        for (let i = 0; i < chunkCount; i++) {
                            const chunkMsg = new MsgSymmetric(
                                new MsgHeader(MsgTypeChunk, -1, msgSymmetric.header.secureChannelId),
                                msgSymmetric.securityHeader,
                                msgSymmetric.sequenceHeader,
                                data.subarray(i * maxPayloadSize, (i + 1) * maxPayloadSize)
                            );

                            this.logger.trace(`Enqueuing chunk ${i + 1}/${chunkCount} with size ${(chunkMsg.body as Uint8Array).byteLength} bytes.`);
                            controller.enqueue(chunkMsg);
                        }
                        msg.body = data.subarray(chunkCount * maxPayloadSize);
                    }

                    break;
                }

                default:
                    break;
            }
        }

        this.logger.trace(`Enqueuing message default message with body size ${(msg.body as Uint8Array).byteLength} bytes.`);
        controller.enqueue(msg);
    }

    constructor(private context: SecureChannelContext) {
        super({
            transform: (data, controller) => this.transform(data, controller),
        });
    }
}
