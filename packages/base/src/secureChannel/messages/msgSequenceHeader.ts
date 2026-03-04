import { BinaryReader } from "../../codecs/binary/binaryReader";
import { BinaryWriter } from "../../codecs/binary/binaryWriter";

export class MsgSequenceHeader {
    public static Size = 8;
    
    static decode(buffer: BinaryReader): MsgSequenceHeader {
        const sequenceNumber = buffer.readUInt32();
        const requestId = buffer.readUInt32();
        return new MsgSequenceHeader(sequenceNumber, requestId);
    }

    encode(buffer: BinaryWriter) {
        buffer.writeUInt32(this.sequenceNumber);
        buffer.writeUInt32(this.requestId);
    }

    constructor(public sequenceNumber: number, public requestId: number) { }
}