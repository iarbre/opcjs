import { IReader } from './interfaces/iReader.js';
import { IOpcType } from '../types/iOpcType.js';

export class Decoder {
    private decoders: Map<number, (decoder: IReader) => unknown> = new Map();
    private readerFactories: Map<string, (data: unknown) => IReader> = new Map();
    private encodingIdMap: Map<number, { writerId: string, typeId: number }> = new Map();


    public registerReaderFactory(writerId: string, factory: (data: unknown) => IReader) {
        this.readerFactories.set(writerId, factory);
    }

    public registerEncodingId(encodingId: number, writerId: string, typeId: number,) {
        this.encodingIdMap.set(encodingId, { writerId, typeId });
    }

    public registerType(typeId: number, decoder: (decoder: IReader) => unknown): void {
        this.decoders.set(typeId, decoder);
    }

    public decode<T extends IOpcType>(data: unknown, encodingType: string): T {
        const readerFactory = this.readerFactories.get(encodingType);
        if (!readerFactory) {
            throw new Error(`No reader factory registered for encoding type ${encodingType}`);
        }
        const reader = readerFactory(data);
        const eid = reader.readExpandedNodeId();

        return this.decodeWithEncodingId<T>(eid.nodeId.identifier as number, reader);
    }

    public decodeWithEncodingId<T extends IOpcType>(encodingId: number, reader:IReader): T {
        const decodingInfo = this.encodingIdMap.get(encodingId);
        if (!decodingInfo) {
            throw new Error(`No encoding ID registered for type with encoding ID ${encodingId}`);
        }

        return this.decodeWithTypeId<T>(decodingInfo.typeId, reader);
    }

    public decodeWithTypeId<T extends IOpcType>(typeId: number, reader: IReader): T {

        const decodingFunction = this.decoders.get(typeId);
        if (!decodingFunction) {
            throw new Error(`No encoder registered for type with type ID ${typeId}`);
        }
        return decodingFunction(reader) as T;
    }
}