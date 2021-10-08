export enum BaseSettingName {
  focusDuration = "focusDuration",
  shortBreakDuration = "shortBreakDuration",
  longBreak = "longBreak",
  longBreakDuration = "longBreakDuration",
  longBreakEvery = "longBreakEvery",
  autoStartBreak = "autoStartBreak",
  autoStartNextFocus = "autoStartNextFocus",
  colorScheme = "colorScheme",
  colorCircleAdvanced = "colorCircleAdvanced",
}

export enum ColorSettingName {
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

export type SettingName = ColorSettingName | BaseSettingName;

export const enum ColorScheme {
  Auto = "Auto",
  Light = "Light",
  Dark = "Dark",
}

export type Settings = Readonly<{
  [BaseSettingName.focusDuration]: number;
  [BaseSettingName.shortBreakDuration]: number;
  [BaseSettingName.longBreak]: boolean;
  [BaseSettingName.longBreakDuration]: number;
  [BaseSettingName.longBreakEvery]: number;
  [BaseSettingName.autoStartBreak]: boolean;
  [BaseSettingName.autoStartNextFocus]: boolean;
  [BaseSettingName.colorScheme]: ColorScheme;
  [BaseSettingName.colorCircleAdvanced]: boolean;
  [ColorSettingName.colorCircleLight]: string;
  [ColorSettingName.colorCircleBackgroundLight]: string;
  [ColorSettingName.colorCircleDark]: string;
  [ColorSettingName.colorCircleBackgroundDark]: string;
  [ColorSettingName.colorCircleAdvancedFocusLight]: string;
  [ColorSettingName.colorCircleAdvancedFocusBackgroundLight]: string;
  [ColorSettingName.colorCircleAdvancedShortBreakLight]: string;
  [ColorSettingName.colorCircleAdvancedShortBreakBackgroundLight]: string;
  [ColorSettingName.colorCircleAdvancedLongBreakLight]: string;
  [ColorSettingName.colorCircleAdvancedLongBreakBackgroundLight]: string;
  [ColorSettingName.colorCircleAdvancedFocusDark]: string;
  [ColorSettingName.colorCircleAdvancedFocusBackgroundDark]: string;
  [ColorSettingName.colorCircleAdvancedShortBreakDark]: string;
  [ColorSettingName.colorCircleAdvancedShortBreakBackgroundDark]: string;
  [ColorSettingName.colorCircleAdvancedLongBreakDark]: string;
  [ColorSettingName.colorCircleAdvancedLongBreakBackgroundDark]: string;
}>;

export type SetSetting = <T extends SettingName>(
  name: T,
  value: Settings[T]
) => void;

export type GetSetting = <T extends SettingName>(name: T) => Settings[T];
