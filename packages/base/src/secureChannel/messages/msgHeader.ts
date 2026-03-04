import { BinaryReader } from "../../codecs/binary/binaryReader";
import { BinaryWriter } from "../../codecs/binary/binaryWriter";
import { MsgType } from "./msgType";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.2.2
export class MsgHeader{
    public static Size = 12;

    static decode(buffer: BinaryReader): MsgHeader {
        const msgType = buffer.readUInt32();
        const messageSize = buffer.readUInt32();
        const secureChannelId = buffer.readUInt32();

        return new MsgHeader(msgType, messageSize, secureChannelId);
    }

    encode(buffer: BinaryWriter) {
        buffer.writeUInt32(this.msgType);
        buffer.writeUInt32(this.messageSize);
        buffer.writeUInt32(this.secureChannelId);
    }
    
    constructor(
        public msgType: MsgType,
        public messageSize: number, 
        public secureChannelId: number
    ) {}
}