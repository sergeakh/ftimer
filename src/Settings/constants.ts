import sound0Src from "../assets/sounds/0.mp3";
import sound1Src from "../assets/sounds/1.mp3";
import sound2Src from "../assets/sounds/2.mp3";

import {
  SettingName,
  Settings,
  ColorScheme,
  LocaleName,
  SoundName,
} from "./types";

export const DEFAULT_LANG = LocaleName.EN;
export const DEFAULT_FOCUS_DURATION = 25;
export const DEFAULT_SHORT_BREAK_DURATION = 5;
export const DEFAULT_LONG_BREAK = false;
export const DEFAULT_LONG_BREAK_DURATION = 20;
export const DEFAULT_LONG_BREAK_EVERY = 4;
export const DEFAULT_AUTO_START_BREAK = false;
export const DEFAULT_AUTO_START_NEXT_FOCUS = false;
export const DEFAULT_NOTIFICATION_FOCUS = false;
export const DEFAULT_NOTIFICATION_BREAK = false;
export const DEFAULT_COLOR_SCHEME = ColorScheme.Auto;
export const DEFAULT_COLOR_CIRCLE_ADVANCED = false;
export const DEFAULT_COLOR_CIRCLE_LIGHT = "#000000";
export const DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT = "#eeeeee";
export const DEFAULT_COLOR_CIRCLE_DARK = "#ffffff";
export const DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK = "#222222";
export const DEFAULT_TAB_CIRCLE = false;
export const DEFAULT_SOUND_ALARM_NAME = SoundName.S0;
export const DEFAULT_SOUND_ALARM_VOLUME = 50;

export const sounds = {
  [SoundName.S0]: sound0Src,
  [SoundName.S1]: sound1Src,
  [SoundName.S2]: sound2Src,
};

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
  [SettingName.notificationFocus]: DEFAULT_NOTIFICATION_FOCUS,
  [SettingName.notificationShortBreak]: DEFAULT_NOTIFICATION_BREAK,
  [SettingName.notificationLongBreak]: DEFAULT_NOTIFICATION_BREAK,
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
  [SettingName.tabCircle]: DEFAULT_TAB_CIRCLE,
  [SettingName.colorTabCircleAdvanced]: DEFAULT_COLOR_CIRCLE_ADVANCED,
  [SettingName.colorTabCircleLight]: DEFAULT_COLOR_CIRCLE_LIGHT,
  [SettingName.colorTabCircleBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [SettingName.colorTabCircleDark]: DEFAULT_COLOR_CIRCLE_DARK,
  [SettingName.colorTabCircleBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
  [SettingName.colorTabCircleAdvancedFocusLight]: DEFAULT_COLOR_CIRCLE_LIGHT,
  [SettingName.colorTabCircleAdvancedFocusBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [SettingName.colorTabCircleAdvancedShortBreakLight]:
    DEFAULT_COLOR_CIRCLE_LIGHT,
  [SettingName.colorTabCircleAdvancedShortBreakBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [SettingName.colorTabCircleAdvancedLongBreakLight]:
    DEFAULT_COLOR_CIRCLE_LIGHT,
  [SettingName.colorTabCircleAdvancedLongBreakBackgroundLight]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_LIGHT,
  [SettingName.colorTabCircleAdvancedFocusDark]: DEFAULT_COLOR_CIRCLE_DARK,
  [SettingName.colorTabCircleAdvancedFocusBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
  [SettingName.colorTabCircleAdvancedShortBreakDark]: DEFAULT_COLOR_CIRCLE_DARK,
  [SettingName.colorTabCircleAdvancedShortBreakBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
  [SettingName.colorTabCircleAdvancedLongBreakDark]: DEFAULT_COLOR_CIRCLE_DARK,
  [SettingName.colorTabCircleAdvancedLongBreakBackgroundDark]:
    DEFAULT_COLOR_CIRCLE_BACKGROUND_DARK,
  [SettingName.soundName]: DEFAULT_SOUND_ALARM_NAME,
  [SettingName.soundVolume]: DEFAULT_SOUND_ALARM_VOLUME,
};

export const MIN_LONG_BREAK_EVERY = 1;
export const MAX_LONG_BREAK_EVERY = 42;
export const MIN_DURATION = 1;
export const MAX_DURATION = 120;
