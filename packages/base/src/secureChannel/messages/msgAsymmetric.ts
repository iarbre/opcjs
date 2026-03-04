import { BinaryReader } from "../../codecs/binary/binaryReader";
import { BinaryWriter } from "../../codecs/binary/binaryWriter";
import { IEncryptionAlgorithm } from "../../cryption/iEncryptionAlgorithm";
import { MsgBase } from "./msgBase";
import { MsgHeader } from "./msgHeader";
import { MsgSecurityHeaderAsymmetric } from "./msgSecurityHeaderAsymmetric";
import { MsgSequenceHeader } from "./msgSequenceHeader";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.2
export class MsgAsymmetric extends MsgBase {
    constructor(
        header: MsgHeader,
        public securityHeader: MsgSecurityHeaderAsymmetric,
        sequenceHeader: MsgSequenceHeader,
        body: unknown) {
        super(header, sequenceHeader, body);
    }

    static decode(
        buffer: BinaryReader,
        header: MsgHeader,
        headerSecurity: MsgSecurityHeaderAsymmetric,
        encryptionAlgorithm: IEncryptionAlgorithm) {

        const headerLength = buffer.getPosition();
        buffer.rewind();
        const decryptedData = MsgBase.DecryptAndVerify(
            buffer.readRemainingBytes(), encryptionAlgorithm, headerLength);
        buffer = new BinaryReader(decryptedData);
        const sequenceHeader = MsgSequenceHeader.decode(buffer);
        const body = buffer.readRemainingBytes();

        return new MsgAsymmetric(
            header,
            headerSecurity,
            sequenceHeader,
            body
        );
    }

    public override encode(
        buffer: BinaryWriter,
        encryptionAlgorithm: IEncryptionAlgorithm) {

        this.header.encode(buffer);
        this.securityHeader.encode(buffer);
        const headerLength = buffer.getLength();
        this.sequenceHeader.encode(buffer);
        const bodyStartPos = buffer.getLength();
        buffer.writeBytes(this.body as Uint8Array); // todo: will not work for non-binary body

        const encryptedBody = super.Encrypt(buffer, encryptionAlgorithm, headerLength, bodyStartPos);
        buffer.writeBytesAt(encryptedBody, headerLength);

        // the size was written by encrypt
    }
}