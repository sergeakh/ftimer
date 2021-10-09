import { SettingName, Settings, ColorScheme, LocaleName } from "./types";

export const DEFAULT_LANG = LocaleName.EN;
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

export const langs = {
  [LocaleName.RU]: "RU",
  [LocaleName.EN]: "EN",
};

export const defaultSettings: Readonly<Settings> = {
  [SettingName.locale]: DEFAULT_LANG,
  [SettingName.focusDuration]: DEFAULT_FOCUS_DURATION,
  [SettingName.shortBreakDuration]: DEFAULT_SHORT_BREAK_DURATION,
  [SettingName.longBreak]: DEFAULT_LONG_BREAK,
  [SettingName.longBreakEvery]: DEFAULT_LONG_BREAK_EVERY,
  [SettingName.longBreakDuration]: DEFAULT_LONG_BREAK_DURATION,
  [SettingName.longBreakEvery]: DEFAULT_LONG_BREAK_EVERY,
  [SettingName.autoStartBreak]: DEFAULT_AUTO_START_BREAK,
  [SettingName.autoStartNextFocus]: DEFAULT_AUTO_START_NEXT_FOCUS,
  [SettingName.colorScheme]: DEFAULT_COLOR_SCHEME,
  [SettingName.colorCircleAdvanced]: DEFAULT_COLOR_CIRCLE_ADVANCED,
  [SettingName.colorCircleLight]: DEFAULT_COLOR_CIRCLE_LIGHT,
  [SettingName.colorCircleBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [SettingName.colorCircleDark]: DEFAULT_COLOR_CIRCLE_DARK,
  [SettingName.colorCircleBackgroundDark]: DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
  [SettingName.colorCircleAdvancedFocusLight]: DEFAULT_COLOR_CIRCLE_LIGHT,
  [SettingName.colorCircleAdvancedFocusBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [SettingName.colorCircleAdvancedShortBreakLight]: DEFAULT_COLOR_CIRCLE_LIGHT,
  [SettingName.colorCircleAdvancedShortBreakBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [SettingName.colorCircleAdvancedLongBreakLight]: DEFAULT_COLOR_CIRCLE_LIGHT,
  [SettingName.colorCircleAdvancedLongBreakBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [SettingName.colorCircleAdvancedFocusDark]: DEFAULT_COLOR_CIRCLE_DARK,
  [SettingName.colorCircleAdvancedFocusBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
  [SettingName.colorCircleAdvancedShortBreakDark]: DEFAULT_COLOR_CIRCLE_DARK,
  [SettingName.colorCircleAdvancedShortBreakBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
  [SettingName.colorCircleAdvancedLongBreakDark]: DEFAULT_COLOR_CIRCLE_DARK,
  [SettingName.colorCircleAdvancedLongBreakBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
};

export const MIN_LONG_BREAK_EVERY = 1;
export const MAX_LONG_BREAK_EVERY = 42;
export const MIN_DURATION = 1;
export const MAX_DURATION = 120;
