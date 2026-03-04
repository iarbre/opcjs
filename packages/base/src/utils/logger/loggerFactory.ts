import { LevelName } from "./levelName";
import { LoggerConfig } from "./loggerConfig";
import { ISink } from "./iSink";
import { ConsoleSink } from "./consoleSink";
import { ILoggerFactory } from "./iLoggerFactory";
import { ILogger } from "./iLogger";
import { Logger } from "./logger";


export class LoggerFactory implements ILoggerFactory {
  private config: Required<LoggerConfig>;
  private cache = new Map<string, Logger>();

  constructor(config?: Partial<LoggerConfig>) {
    const defaultLevel = config?.defaultLevel ?? "INFO";
    const includeTimestamp = config?.includeTimestamp ?? true;
    const sink = config?.sink ?? new ConsoleSink({ includeTimestamp });
    this.config = {
      defaultLevel,
      categoryLevels: config?.categoryLevels ?? {},
      sink,
      includeTimestamp,
    };
  }

  getLogger(category: string): ILogger {
    const existing = this.cache.get(category);
    if (existing) return existing;

    const logger = new Logger(category, () => this.config);
    this.cache.set(category, logger);
    return logger;
  }

  setDefaultLevel(level: LevelName): void {
    this.config.defaultLevel = level;
  }

  setCategoryLevel(categoryOrPattern: string, level: LevelName): void {
    // categoryOrPattern can be exact ("http") or wildcard ("db.*")
    this.config.categoryLevels[categoryOrPattern] = level;
  }

  removeCategoryLevel(categoryOrPattern: string): void {
    delete this.config.categoryLevels[categoryOrPattern];
  }

  setSink(sink: ISink): void {
    this.config.sink = sink;
  }
}
