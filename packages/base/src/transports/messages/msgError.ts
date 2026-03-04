
import { IReader } from "../../codecs/interfaces/iReader";
import { IWriter } from "../../codecs/interfaces/iWriter";
import { UaString } from "../../types/primitives";
import { MsgBase } from "./msgBase";
import { MsgHeader } from "./msgHeader";
import { MsgTypeError } from "./msgTypes";

// https://reference.opcfoundation.org/Core/Part6/v105/docs/7.1.2.5
export class MsgError extends MsgBase{
    constructor(
        public error: number,
        public reason: UaString) {
            super(new MsgHeader(MsgTypeError, 0))
    }

    static decode(header:MsgHeader,buffer: IReader): MsgError {
        const msg = new MsgError(0, '');
        msg.header = header;
        msg.error = buffer.readUInt32();
        msg.reason = buffer.readString();
        return msg;
    }

    encode(buffer: IWriter) {
        this.header.encode(buffer);
        buffer.writeUInt32(this.error);
        buffer.writeString(this.reason);
    }
}