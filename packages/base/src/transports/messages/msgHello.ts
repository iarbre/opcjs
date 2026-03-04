
import { IWriter } from "../../codecs/interfaces/iWriter";
import { MsgBase } from "./msgBase";
import { MsgHeader } from "./msgHeader";
import { MsgTypeHello } from "./msgTypes";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/7.1.2.3
export class MsgHello extends MsgBase{

    constructor(
        public ProtocolVersion: number,
        public ReceiveBufferSize: number,
        public SendBufferSize: number,
        public MaxMessageSize: number,
        public MaxChunkCount: number,
        public EndpointUrl: string) {
            super(new MsgHeader(MsgTypeHello, 0));
    }

    encode(buffer: IWriter) {
        this.header.encode(buffer);
        buffer.writeUInt32(this.ProtocolVersion);
        buffer.writeUInt32(this.ReceiveBufferSize);
        buffer.writeUInt32(this.SendBufferSize);
        buffer.writeUInt32(this.MaxMessageSize);
        buffer.writeUInt32(this.MaxChunkCount);
        buffer.writeString(this.EndpointUrl);
    }
}