import { SettingName, Settings } from "./types";

export const DEFAULT_FOCUS_DURATION = 25;
export const DEFAULT_SHORT_BREAK_DURATION = 5;
export const DEFAULT_LONG_BREAK_DURATION = 20;
export const DEFAULT_LONG_BREAK_EVERY = 4;
export const DEFAULT_AUTO_START_BREAK = false;
export const DEFAULT_AUTO_START_NEXT_FOCUS = false;

export const defaultSettings: Readonly<Settings> = {
  [SettingName.focusDuration]: DEFAULT_FOCUS_DURATION,
  [SettingName.shortBreakDuration]: DEFAULT_SHORT_BREAK_DURATION,
  [SettingName.longBreakDuration]: DEFAULT_LONG_BREAK_DURATION,
  [SettingName.longBreakEvery]: DEFAULT_LONG_BREAK_EVERY,
  [SettingName.autoStartBreak]: DEFAULT_AUTO_START_BREAK,
  [SettingName.autoStartNextFocus]: DEFAULT_AUTO_START_NEXT_FOCUS,
};

export const MIN_LONG_BREAK_EVERY = 1;
export const MAX_LONG_BREAK_EVERY = 42;
export const MIN_DURATION = 1;
export const MAX_DURATION = 120;
