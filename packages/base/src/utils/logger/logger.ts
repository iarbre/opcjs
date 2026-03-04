import { LevelName } from "./levelName";
import { Levels } from "./levels";
import { LoggerConfig } from "./loggerConfig";
import { ILogger } from "./iLogger";

/**
 * Wildcard match:
 * - Exact match: "db"
 * - Prefix wildcard: "db.*" matches "db.conn", "db.query", etc.
 * Most specific wins (longest pattern).
 */
export function resolveCategoryLevel(
  category: string,
  defaultLevel: LevelName,
  categoryLevels?: Record<string, LevelName>
): LevelName {
  if (!categoryLevels) return defaultLevel;

  // Exact match first
  if (categoryLevels[category]) return categoryLevels[category];

  // Wildcards: find best (longest) prefix match for patterns ending with .*
  let bestPattern: string | null = null;
  for (const pattern of Object.keys(categoryLevels)) {
    if (!pattern.endsWith(".*")) continue;
    const prefix = pattern.slice(0, -2); // remove ".*"
    if (category === prefix || category.startsWith(prefix + ".")) {
      if (!bestPattern || pattern.length > bestPattern.length) bestPattern = pattern;
    }
  }
  if (bestPattern) return categoryLevels[bestPattern];

  return defaultLevel;
}

export class Logger implements ILogger {
  constructor(private category: string, private getConfig: () => Required<LoggerConfig>) { }

  private enabled(level: LevelName): boolean {
    const cfg = this.getConfig();
    const threshold = resolveCategoryLevel(this.category, cfg.defaultLevel, cfg.categoryLevels);
    return Levels[level] >= Levels[threshold];
  }

  /**
   * Lazy logging variant: pass a function so expensive string building runs only if enabled.
   */
  private emit(level: LevelName, msg: string | (() => string), ...args: unknown[]): void {
    if (!this.enabled(level)) return;

    const cfg = this.getConfig();
    const message = typeof msg === "function" ? msg() : msg;

    cfg.sink.log({
      time: new Date(),
      level,
      levelValue: Levels[level],
      category: this.category,
      message,
      args,
    });
  }

  trace(msg: string | (() => string), ...args: unknown[]): void {
    this.emit("TRACE", msg, ...args);
  }
  debug(msg: string | (() => string), ...args: unknown[]): void {
    this.emit("DEBUG", msg, ...args);
  }
  info(msg: string | (() => string), ...args: unknown[]): void {
    this.emit("INFO", msg, ...args);
  }
  warn(msg: string | (() => string), ...args: unknown[]): void {
    this.emit("WARN", msg, ...args);
  }
  error(msg: string | (() => string), ...args: unknown[]): void {
    this.emit("ERROR", msg, ...args);
  }
  fatal(msg: string | (() => string), ...args: unknown[]): void {
    this.emit("FATAL", msg, ...args);
  }
}
