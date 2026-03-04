import { LevelName } from "./levelName";


export interface LogRecord {
  time: Date;
  level: LevelName;
  levelValue: number;
  category: string;
  message: string;
  args: unknown[];
}
