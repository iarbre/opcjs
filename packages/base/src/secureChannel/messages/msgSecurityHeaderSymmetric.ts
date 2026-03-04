import { BinaryReader } from "../../codecs/binary/binaryReader";
import { BinaryWriter } from "../../codecs/binary/binaryWriter";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.2.3
export class MsgSecurityHeaderSymmetric {
    public static Size = 4;

    static decode(buffer: BinaryReader): MsgSecurityHeaderSymmetric {
        const tokenId = buffer.readUInt32();
        return new MsgSecurityHeaderSymmetric(tokenId);
    }

    encode(buffer: BinaryWriter) {
        buffer.writeUInt32(this.tokenId);
    }
    constructor(public tokenId: number) { }
}