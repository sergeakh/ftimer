import {
  BaseSettingName,
  ColorSettingName,
  Settings,
  ColorScheme,
} from "./types";

export const DEFAULT_FOCUS_DURATION = 25;
export const DEFAULT_SHORT_BREAK_DURATION = 5;
export const DEFAULT_LONG_BREAK = false;
export const DEFAULT_LONG_BREAK_DURATION = 20;
export const DEFAULT_LONG_BREAK_EVERY = 4;
export const DEFAULT_AUTO_START_BREAK = false;
export const DEFAULT_AUTO_START_NEXT_FOCUS = false;
export const DEFAULT_COLOR_SCHEME = ColorScheme.Auto;
export const DEFAULT_COLOR_CIRCLE_ADVANCED = false;
export const DEFAULT_COLOR_CIRCLE_LIGHT = "#000000";
export const DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT = "#eeeeee";
export const DEFAULT_COLOR_CIRCLE_DARK = "#ffffff";
export const DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK = "#222222";

export const defaultSettings: Readonly<Settings> = {
  [BaseSettingName.focusDuration]: DEFAULT_FOCUS_DURATION,
  [BaseSettingName.shortBreakDuration]: DEFAULT_SHORT_BREAK_DURATION,
  [BaseSettingName.longBreak]: DEFAULT_LONG_BREAK,
  [BaseSettingName.longBreakEvery]: DEFAULT_LONG_BREAK_EVERY,
  [BaseSettingName.longBreakDuration]: DEFAULT_LONG_BREAK_DURATION,
  [BaseSettingName.longBreakEvery]: DEFAULT_LONG_BREAK_EVERY,
  [BaseSettingName.autoStartBreak]: DEFAULT_AUTO_START_BREAK,
  [BaseSettingName.autoStartNextFocus]: DEFAULT_AUTO_START_NEXT_FOCUS,
  [BaseSettingName.colorScheme]: DEFAULT_COLOR_SCHEME,
  [BaseSettingName.colorCircleAdvanced]: DEFAULT_COLOR_CIRCLE_ADVANCED,
  [ColorSettingName.colorCircleLight]: DEFAULT_COLOR_CIRCLE_LIGHT,
  [ColorSettingName.colorCircleBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [ColorSettingName.colorCircleDark]: DEFAULT_COLOR_CIRCLE_DARK,
  [ColorSettingName.colorCircleBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
  [ColorSettingName.colorCircleAdvancedFocusLight]: DEFAULT_COLOR_CIRCLE_LIGHT,
  [ColorSettingName.colorCircleAdvancedFocusBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [ColorSettingName.colorCircleAdvancedShortBreakLight]:
    DEFAULT_COLOR_CIRCLE_LIGHT,
  [ColorSettingName.colorCircleAdvancedShortBreakBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [ColorSettingName.colorCircleAdvancedLongBreakLight]:
    DEFAULT_COLOR_CIRCLE_LIGHT,
  [ColorSettingName.colorCircleAdvancedLongBreakBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [ColorSettingName.colorCircleAdvancedFocusDark]: DEFAULT_COLOR_CIRCLE_DARK,
  [ColorSettingName.colorCircleAdvancedFocusBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
  [ColorSettingName.colorCircleAdvancedShortBreakDark]:
    DEFAULT_COLOR_CIRCLE_DARK,
  [ColorSettingName.colorCircleAdvancedShortBreakBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
  [ColorSettingName.colorCircleAdvancedLongBreakDark]:
    DEFAULT_COLOR_CIRCLE_DARK,
  [ColorSettingName.colorCircleAdvancedLongBreakBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
};

export const MIN_LONG_BREAK_EVERY = 1;
export const MAX_LONG_BREAK_EVERY = 42;
export const MIN_DURATION = 1;
export const MAX_DURATION = 120;
