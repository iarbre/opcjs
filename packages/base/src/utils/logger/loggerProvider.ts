// logger.ts
/* eslint-disable no-console */

import { ILogger } from "./iLogger";
import { ILoggerFactory } from "./iLoggerFactory";
import { LoggerFactory } from "./loggerFactory";


export let loggerProviderInstance: ILoggerFactory | null = null;
export function getLogger(category: string): ILogger {
  if (!loggerProviderInstance) {
    loggerProviderInstance = new LoggerFactory();
  }
  return loggerProviderInstance.getLogger(category);
}

export function initLoggerProvider(provider: ILoggerFactory): void {
  loggerProviderInstance = provider;
}