import { ExpandedNodeId } from "../types/expandedNodeId";
import { NodeId } from "../types/nodeId";
import { IOpcType } from "../types/iOpcType";
import { IWriter } from "./interfaces/iWriter";


export class Encoder {

    private encoders: Map<number, (encoder: IWriter, value: unknown) => void> = new Map();
    private writerFactories: Map<string, () => IWriter> = new Map();

    public registerWriterFactory(writerId: string, factory: () => IWriter) {
        this.writerFactories.set(writerId, factory);
    }

    public registerType(typeId: number, encoder: (encoder: IWriter, value: unknown) => void): void {
        this.encoders.set(typeId, encoder);
    }

    public encode<T extends IOpcType>(value: T, encodingType: string): unknown {
        const writerFactory = this.writerFactories.get(encodingType);
        if (!writerFactory) {
            throw new Error(`No writer factory registered for encoding type ${encodingType}`);
        }
        const writer = writerFactory();

        const encodingId = value.getBinaryEncodingId(); // todo: this will only work for binary encoding. We have to register encoding Ids like we do for decoder
        const eid = new ExpandedNodeId(new NodeId(0, encodingId)); // todo: this will only work for namespace 0. I guess we need an Encoder per namespace.
        writer.writeExpandedNodeId(eid);

        const typeId = value.getTypeId();
        const encodingFunction = this.encoders.get(typeId);
        if (!encodingFunction) {
            throw new Error(`No encoder registered for type with encoding ID ${typeId}`);
        }
        encodingFunction(writer, value);

        return writer.getData();
    }

    public encodeWithoutId<T extends IOpcType>(value: T, encodingType: string): unknown {
        const writerFactory = this.writerFactories.get(encodingType);
        if (!writerFactory) {
            throw new Error(`No writer factory registered for encoding type ${encodingType}`);
        }
        const writer = writerFactory();

        const typeId = value.getTypeId();
        const encodingFunction = this.encoders.get(typeId);
        if (!encodingFunction) {
            throw new Error(`No encoder registered for type with encoding ID ${typeId}`);
        }
        encodingFunction(writer, value);
        return writer.getData();
    }
}