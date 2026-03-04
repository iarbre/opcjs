import { ILogger } from "./iLogger";

export interface ILoggerFactory {
  getLogger(category: string): ILogger;
}
