export const enum SettingName {
  locale = "locale",
  focusDuration = "focusDuration",
  shortBreakDuration = "shortBreakDuration",
  longBreak = "longBreak",
  longBreakDuration = "longBreakDuration",
  longBreakEvery = "longBreakEvery",
  autoStartBreak = "autoStartBreak",
  autoStartNextFocus = "autoStartNextFocus",
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
  | SettingName.colorCircleAdvancedLongBreakBackgroundDark;

export const enum LocaleName {
  RU = "ru",
  EN = "en",
}

export const enum ColorScheme {
  Auto = "Auto",
  Light = "Light",
  Dark = "Dark",
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
}>;

export type SetSetting = <T extends SettingName>(
  name: T,
  value: Settings[T]
) => void;

export type GetSetting = <T extends SettingName>(name: T) => Settings[T];
