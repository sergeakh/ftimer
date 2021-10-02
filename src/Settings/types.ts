export enum SettingName {
  focusDuration = "focusDuration",
  shortBreakDuration = "shortBreakDuration",
  longBreakDuration = "longBreakDuration",
  longBreakEvery = "longBreakEvery",
  autoStartBreak = "autoStartBreak",
  autoStartNextFocus = "autoStartNextFocus",
  colorCircle = "colorCircle",
}

export type Settings = Readonly<{
  [SettingName.focusDuration]: number;
  [SettingName.shortBreakDuration]: number;
  [SettingName.longBreakDuration]: number;
  [SettingName.longBreakEvery]: number;
  [SettingName.autoStartBreak]: boolean;
  [SettingName.autoStartNextFocus]: boolean;
  [SettingName.colorCircle]: string;
}>;

export type SetSetting = <T extends SettingName>(
  name: T,
  value: Settings[T]
) => void;
