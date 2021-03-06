// Copy LocaleLabelName from ./types. Hack for reduce const enum
const enum LocaleLabelName {
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
  TimerNotificationFinishLabel,
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
  SettingsCircleTitle,
  SettingsTabCircleTitle,
  SettingsCircleColorsAdvancedSettingsLabel,
  SettingsCircleColorsMainLabel,
  SettingsCircleColorsBackgroundLabel,
  SettingsNotifications,
  SettingsSounds,
  SettingsSoundsAlarmLabel,
  SettingsSoundsAlarmVolumeLabel,
}

export const labels = {
  [LocaleLabelName.TimerProcessIntervalNameFocus]: "Focus",
  [LocaleLabelName.TimerProcessIntervalNameFocusShort]: "F",
  [LocaleLabelName.TimerProcessIntervalNameShortBreak]: "Short Break",
  [LocaleLabelName.TimerProcessIntervalNameShortBreakShort]: "S",
  [LocaleLabelName.TimerProcessIntervalNameLongBreak]: "Long Break",
  [LocaleLabelName.TimerProcessIntervalNameLongBreakShort]: "L",
  [LocaleLabelName.TimerProcessIntervalNamePause]: "Pause",
  [LocaleLabelName.TimerProcessIntervalSwitcherName]: "Timer interval",
  [LocaleLabelName.TimerProcessControlButtonStartTitle]: "Start",
  [LocaleLabelName.TimerProcessControlButtonPauseTitle]: "Pause",
  [LocaleLabelName.TimerProcessControlButtonResumeTitle]: "Resume",
  [LocaleLabelName.TimerProcessControlButtonStopTitle]: "Stop",
  [LocaleLabelName.SidebarMenuTimerTitle]: "Timer",
  [LocaleLabelName.SidebarMenuSettingsTitle]: "Settings",
  [LocaleLabelName.SidebarColorSchemeSwitcherTitle]: "Color scheme",
  [LocaleLabelName.SidebarColorSchemeSwitcherOptionLightTitle]: "Light scheme",
  [LocaleLabelName.SidebarColorSchemeSwitcherOptionDarkTitle]: "Dark scheme",
  [LocaleLabelName.SidebarColorSchemeSwitcherOptionDarkTitle]: "Dark scheme",
  [LocaleLabelName.SidebarColorSchemeSwitcherOptionAutoTitle]: "Auto scheme",
  [LocaleLabelName.SettingsLanguageLabel]: "Language",
  [LocaleLabelName.SettingsDurationsTitle]: "Duration (mins)",
  [LocaleLabelName.SettingsDurationsLongBreakEveryLabel]:
    "Long Break Every (times)",
  [LocaleLabelName.SettingsAutoStartTitle]: "Auto-Start",
  [LocaleLabelName.SettingsAutoStartBreakLabel]: "Break",
  [LocaleLabelName.SettingsAutoStartNextFocusLabel]: "Next Focus",
  [LocaleLabelName.SettingsCircleTitle]: "Progress Circle",
  [LocaleLabelName.SettingsTabCircleTitle]: "Progress Tab Circle",
  [LocaleLabelName.SettingsCircleColorsAdvancedSettingsLabel]:
    "Advanced Settings",
  [LocaleLabelName.SettingsCircleColorsMainLabel]: "First Color",
  [LocaleLabelName.SettingsCircleColorsBackgroundLabel]: "Second Color",
  [LocaleLabelName.SettingsNotifications]: "Notifications",
  [LocaleLabelName.TimerNotificationFinishLabel]: "Completed",
  [LocaleLabelName.SettingsSounds]: "Sounds",
  [LocaleLabelName.SettingsSoundsAlarmLabel]: "Sound",
  [LocaleLabelName.SettingsSoundsAlarmVolumeLabel]: "Volume",
};
