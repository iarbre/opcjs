import { LogRecord } from "./logRecord";


export interface ISink {
  log(record: LogRecord): void;
}
