import { Decoder } from "../codecs/decoder";
import { Encoder } from "../codecs/encoder";
import { ILoggerFactory } from "../utils/logger/iLoggerFactory";

export abstract class Configuration {
    constructor(
        public applicationName:string,
        public applicationUri:string,
        public productName:string,
        public productUri:string,
        public encoder: Encoder,
        public decoder: Decoder, 
        public loggerFactory: ILoggerFactory
    ){}
}