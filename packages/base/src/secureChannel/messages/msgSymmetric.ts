import { MsgHeader } from "./msgHeader";
import { MsgSecurityHeaderSymmetric } from "./msgSecurityHeaderSymmetric";
import { MsgSequenceHeader } from "./msgSequenceHeader";
import { IEncryptionAlgorithm } from "../../cryption/iEncryptionAlgorithm";
import { MsgBase } from "./msgBase";
import { BinaryReader } from "../../codecs/binary/binaryReader";
import { BinaryWriter } from "../../codecs/binary/binaryWriter";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.2
export class MsgSymmetric extends MsgBase {

    static decode(
        buffer: BinaryReader,
        header: MsgHeader,
        securityHeader: MsgSecurityHeaderSymmetric,
        encryptionAlgorithm: IEncryptionAlgorithm) {

        const headerLength = buffer.getPosition();

        buffer.rewind();
        const decryptedData = MsgBase.DecryptAndVerify(
            buffer.readRemainingBytes(),
            encryptionAlgorithm, 
            headerLength
        );
        
        buffer = new BinaryReader(decryptedData);
        const sequenceHeader = MsgSequenceHeader.decode(buffer);
        const body = buffer.readRemainingBytes();

        return new MsgSymmetric(header, securityHeader, sequenceHeader, body);
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

        const encryptedBody=super.Encrypt(buffer, encryptionAlgorithm, headerLength, bodyStartPos)
        buffer.writeBytesAt(encryptedBody, headerLength);

        // the size was written by encrypt
    }

    constructor(
        header: MsgHeader, // todo: move to base class
        public securityHeader: MsgSecurityHeaderSymmetric,
        sequenceHeader: MsgSequenceHeader,
        body: unknown) {
        super(header, sequenceHeader, body);
    }
}