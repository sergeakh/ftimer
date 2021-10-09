export const enum LocaleLabelName {
  TimerProcessIntervalNameFocus,
  TimerProcessIntervalNameFocusShort,
  TimerProcessIntervalNameShortBreak,
  TimerProcessIntervalNameShortBreakShort,
  TimerProcessIntervalNameLongBreak,
  TimerProcessIntervalNameLongBreakShort,
  TimerProcessIntervalNamePause,
  TimerProcessIntervalSwitcherName,
  TimerProcessControlButtonStartTitle,
  TimerProcessControlButtonPauseTitle,
  TimerProcessControlButtonResumeTitle,
  TimerProcessControlButtonStopTitle,
  SidebarMenuTimerTitle,
  SidebarMenuSettingsTitle,
  SidebarColorSchemeSwitcherTitle,
  SidebarColorSchemeSwitcherOptionLightTitle,
  SidebarColorSchemeSwitcherOptionDarkTitle,
  SidebarColorSchemeSwitcherOptionAutoTitle,
  SettingsLanguageLabel,
  SettingsDurationsTitle,
  SettingsDurationsLongBreakEveryLabel,
  SettingsAutoStartTitle,
  SettingsAutoStartBreakLabel,
  SettingsAutoStartNextFocusLabel,
  SettingsColorsTitle,
  SettingsColorsAdvancedSettingsLabel,
  SettingsColorsCircleMainLabel,
  SettingsColorsCircleBackgroundLabel,
}

export type LocaleLabels = Readonly<{
  [key in LocaleLabelName]?: string;
}>;
