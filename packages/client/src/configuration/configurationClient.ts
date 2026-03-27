import {
  BinaryReader,
  BinaryWriter,
  Configuration,
  Decoder,
  Encoder,
  ILoggerFactory,
  LoggerFactory,
  registerBinaryDecoders,
  registerEncoders,
  registerTypeDecoders
} from "opcjs-base";

import type { SecurityConfiguration } from '../securityConfiguration.js'

export class ConfigurationClient extends Configuration {
  /**
   * Optional security restrictions applied during `Client.connect()`.
   * When not set, permissive defaults are used (SecurityPolicy None allowed,
   * all user-token types accepted).
   *
   * @see SecurityConfiguration
   */
  public securityConfiguration?: SecurityConfiguration
  public static getSimple(
    name: string,
    company: string,
    loggerFactory?: ILoggerFactory,
  ): ConfigurationClient {

    if (!loggerFactory) {
      loggerFactory = new LoggerFactory({
        defaultLevel: 'DEBUG', //todo: use enum
        categoryLevels: {
          "transport.*": "TRACE",
          "secureChannel.*": "TRACE",
        },
      });
    }
    const applicationUri = `urn:${company}:${name}`;
    const productUri = `urn:${company}:${name}:product`;

    const encoder = new Encoder();
    encoder.registerWriterFactory("binary", () => {
      return new BinaryWriter();
    });
    registerEncoders(encoder);

    const decoder = new Decoder();
    decoder.registerReaderFactory("binary", (data: unknown) => {
      return new BinaryReader(data as Uint8Array);
    });
    registerTypeDecoders(decoder);
    registerBinaryDecoders(decoder);

    return new ConfigurationClient(
      name,
      applicationUri,
      name,
      productUri,
      encoder,
      decoder,
      loggerFactory,
    );
  }

  constructor(
    applicationName: string,
    applicationUri: string,
    productName: string,
    productUri: string,
    encoder: Encoder,
    decoder: Decoder,
    loggerFactory: ILoggerFactory,
  ) {
    super(
      applicationName,
      applicationUri,
      productName,
      productUri,
      encoder,
      decoder,
      loggerFactory,
    );
  }
}
