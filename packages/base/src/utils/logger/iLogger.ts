
export interface ILogger {
  trace(msg: string | (() => string), ...args: unknown[]): void;
  debug(msg: string | (() => string), ...args: unknown[]): void;
  info(msg: string | (() => string), ...args: unknown[]): void;
  warn(msg: string | (() => string), ...args: unknown[]): void;
  error(msg: string | (() => string), ...args: unknown[]): void;
  fatal(msg: string | (() => string), ...args: unknown[]): void;
}
