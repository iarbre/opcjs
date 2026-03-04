import { LevelName } from "./levelName";


export const Levels: Record<LevelName, number> = {
  TRACE: 10,
  DEBUG: 20,
  INFO: 30,
  WARN: 40,
  ERROR: 50,
  FATAL: 60,
  OFF: Number.POSITIVE_INFINITY,
};
