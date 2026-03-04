import { LevelName } from "./levelName";
import { ISink } from "./iSink";


export interface LoggerConfig {
  defaultLevel: LevelName;
  categoryLevels?: Record<string, LevelName>; // supports "db.*" wildcards
  sink?: ISink;
  includeTimestamp?: boolean; // formatting preference
}
