export const enum SettingName {
  locale = "locale",
  focusDuration = "focusDuration",
  shortBreakDuration = "shortBreakDuration",
  longBreak = "longBreak",
  longBreakDuration = "longBreakDuration",
  longBreakEvery = "longBreakEvery",
  autoStartBreak = "autoStartBreak",
  autoStartNextFocus = "autoStartNextFocus",
  notificationFocus = "notificationFocus",
  notificationShortBreak = "notificationShortBreak",
  notificationLongBreak = "notificationLongBreak",
  colorScheme = "colorScheme",
  colorCircleAdvanced = "colorCircleAdvanced",
  colorCircleLight = "colorCircleLight",
  colorCircleBackgroundLight = "colorCircleBackgroundLight",
  colorCircleDark = "colorCircleDark",
  colorCircleBackgroundDark = "colorCircleBackgroundDark",
  colorCircleAdvancedFocusLight = "colorCircleAdvancedFocusLight",
  colorCircleAdvancedFocusBackgroundLight = "colorCircleAdvancedFocusBackgroundLight",
  colorCircleAdvancedShortBreakLight = "colorCircleAdvancedShortBreakLight",
  colorCircleAdvancedShortBreakBackgroundLight = "colorCircleAdvancedShortBreakBackgroundLight",
  colorCircleAdvancedLongBreakLight = "colorCircleAdvancedLongBreakLight",
  colorCircleAdvancedLongBreakBackgroundLight = "colorCircleAdvancedLongBreakBackgroundLight",
  colorCircleAdvancedFocusDark = "colorCircleAdvancedFocusDark",
  colorCircleAdvancedFocusBackgroundDark = "colorCircleAdvancedFocusBackgroundDark",
  colorCircleAdvancedShortBreakDark = "colorCircleAdvancedShortBreakDark",
  colorCircleAdvancedShortBreakBackgroundDark = "colorCircleAdvancedShortBreakBackgroundDark",
  colorCircleAdvancedLongBreakDark = "colorCircleAdvancedLongBreakDark",
  colorCircleAdvancedLongBreakBackgroundDark = "colorCircleAdvancedLongBreakBackgroundDark",
  tabCircle = "tabCircle",
  colorTabCircleAdvanced = "colorTabCircleAdvanced",
  colorTabCircleLight = "colorTabCircleLight",
  colorTabCircleBackgroundLight = "colorTabCircleBackgroundLight",
  colorTabCircleDark = "colorTabCircleDark",
  colorTabCircleBackgroundDark = "colorTabCircleBackgroundDark",
  colorTabCircleAdvancedFocusLight = "colorTabCircleAdvancedFocusLight",
  colorTabCircleAdvancedFocusBackgroundLight = "colorTabCircleAdvancedFocusBackgroundLight",
  colorTabCircleAdvancedShortBreakLight = "colorTabCircleAdvancedShortBreakLight",
  colorTabCircleAdvancedShortBreakBackgroundLight = "colorTabCircleAdvancedShortBreakBackgroundLight",
  colorTabCircleAdvancedLongBreakLight = "colorTabCircleAdvancedLongBreakLight",
  colorTabCircleAdvancedLongBreakBackgroundLight = "colorTabCircleAdvancedLongBreakBackgroundLight",
  colorTabCircleAdvancedFocusDark = "colorTabCircleAdvancedFocusDark",
  colorTabCircleAdvancedFocusBackgroundDark = "colorTabCircleAdvancedFocusBackgroundDark",
  colorTabCircleAdvancedShortBreakDark = "colorTabCircleAdvancedShortBreakDark",
  colorTabCircleAdvancedShortBreakBackgroundDark = "colorTabCircleAdvancedShortBreakBackgroundDark",
  colorTabCircleAdvancedLongBreakDark = "colorTabCircleAdvancedLongBreakDark",
  colorTabCircleAdvancedLongBreakBackgroundDark = "colorTabCircleAdvancedLongBreakBackgroundDark",
  soundName = "soundAlarmName",
  soundVolume = "soundAlarmVolume",
}

export type ColorSettingName =
  | SettingName.colorCircleLight
  | SettingName.colorCircleBackgroundLight
  | SettingName.colorCircleDark
  | SettingName.colorCircleBackgroundDark
  | SettingName.colorCircleAdvancedFocusLight
  | SettingName.colorCircleAdvancedFocusBackgroundLight
  | SettingName.colorCircleAdvancedShortBreakLight
  | SettingName.colorCircleAdvancedShortBreakBackgroundLight
  | SettingName.colorCircleAdvancedLongBreakLight
  | SettingName.colorCircleAdvancedLongBreakBackgroundLight
  | SettingName.colorCircleAdvancedFocusDark
  | SettingName.colorCircleAdvancedFocusBackgroundDark
  | SettingName.colorCircleAdvancedShortBreakDark
  | SettingName.colorCircleAdvancedShortBreakBackgroundDark
  | SettingName.colorCircleAdvancedLongBreakDark
  | SettingName.colorCircleAdvancedLongBreakBackgroundDark
  | SettingName.colorTabCircleLight
  | SettingName.colorTabCircleBackgroundLight
  | SettingName.colorTabCircleDark
  | SettingName.colorTabCircleBackgroundDark
  | SettingName.colorTabCircleAdvancedFocusLight
  | SettingName.colorTabCircleAdvancedFocusBackgroundLight
  | SettingName.colorTabCircleAdvancedShortBreakLight
  | SettingName.colorTabCircleAdvancedShortBreakBackgroundLight
  | SettingName.colorTabCircleAdvancedLongBreakLight
  | SettingName.colorTabCircleAdvancedLongBreakBackgroundLight
  | SettingName.colorTabCircleAdvancedFocusDark
  | SettingName.colorTabCircleAdvancedFocusBackgroundDark
  | SettingName.colorTabCircleAdvancedShortBreakDark
  | SettingName.colorTabCircleAdvancedShortBreakBackgroundDark
  | SettingName.colorTabCircleAdvancedLongBreakDark
  | SettingName.colorTabCircleAdvancedLongBreakBackgroundDark;

export const enum LocaleName {
  RU = "ru",
  EN = "en",
}

export const enum ColorScheme {
  Auto = "Auto",
  Light = "Light",
  Dark = "Dark",
}

export const enum SoundName {
  S0 = "0",
  S1 = "1",
  S2 = "2",
}

export type Settings = Readonly<{
  [SettingName.locale]: LocaleName;
  [SettingName.focusDuration]: number;
  [SettingName.shortBreakDuration]: number;
  [SettingName.longBreak]: boolean;
  [SettingName.longBreakDuration]: number;
  [SettingName.longBreakEvery]: number;
  [SettingName.autoStartBreak]: boolean;
  [SettingName.autoStartNextFocus]: boolean;
  [SettingName.notificationFocus]: boolean;
  [SettingName.notificationShortBreak]: boolean;
  [SettingName.notificationLongBreak]: boolean;
  [SettingName.colorScheme]: ColorScheme;
  [SettingName.colorCircleAdvanced]: boolean;
  [SettingName.colorCircleLight]: string;
  [SettingName.colorCircleBackgroundLight]: string;
  [SettingName.colorCircleDark]: string;
  [SettingName.colorCircleBackgroundDark]: string;
  [SettingName.colorCircleAdvancedFocusLight]: string;
  [SettingName.colorCircleAdvancedFocusBackgroundLight]: string;
  [SettingName.colorCircleAdvancedShortBreakLight]: string;
  [SettingName.colorCircleAdvancedShortBreakBackgroundLight]: string;
  [SettingName.colorCircleAdvancedLongBreakLight]: string;
  [SettingName.colorCircleAdvancedLongBreakBackgroundLight]: string;
  [SettingName.colorCircleAdvancedFocusDark]: string;
  [SettingName.colorCircleAdvancedFocusBackgroundDark]: string;
  [SettingName.colorCircleAdvancedShortBreakDark]: string;
  [SettingName.colorCircleAdvancedShortBreakBackgroundDark]: string;
  [SettingName.colorCircleAdvancedLongBreakDark]: string;
  [SettingName.colorCircleAdvancedLongBreakBackgroundDark]: string;
  [SettingName.tabCircle]: boolean;
  [SettingName.colorTabCircleAdvanced]: boolean;
  [SettingName.colorTabCircleLight]: string;
  [SettingName.colorTabCircleBackgroundLight]: string;
  [SettingName.colorTabCircleDark]: string;
  [SettingName.colorTabCircleBackgroundDark]: string;
  [SettingName.colorTabCircleAdvancedFocusLight]: string;
  [SettingName.colorTabCircleAdvancedFocusBackgroundLight]: string;
  [SettingName.colorTabCircleAdvancedShortBreakLight]: string;
  [SettingName.colorTabCircleAdvancedShortBreakBackgroundLight]: string;
  [SettingName.colorTabCircleAdvancedLongBreakLight]: string;
  [SettingName.colorTabCircleAdvancedLongBreakBackgroundLight]: string;
  [SettingName.colorTabCircleAdvancedFocusDark]: string;
  [SettingName.colorTabCircleAdvancedFocusBackgroundDark]: string;
  [SettingName.colorTabCircleAdvancedShortBreakDark]: string;
  [SettingName.colorTabCircleAdvancedShortBreakBackgroundDark]: string;
  [SettingName.colorTabCircleAdvancedLongBreakDark]: string;
  [SettingName.colorTabCircleAdvancedLongBreakBackgroundDark]: string;
  [SettingName.soundName]: SoundName;
  [SettingName.soundVolume]: number;
}>;

export type SetSetting = <T extends SettingName>(
  name: T,
  value: Settings[T]
) => void;

export type GetSetting = <T extends SettingName>(name: T) => Settings[T];
