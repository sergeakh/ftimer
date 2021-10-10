import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import { Switch } from "../../ui/Switch/Switch";
import { Tabs } from "../../ui/Tabs";
import {
  SetSetting,
  GetSetting,
  SettingName,
  ColorSettingName,
} from "../types";
import { LocaleLabelName } from "../../locales/types";

import { useColorScheme } from "../../hooks/useColorScheme";
import { useTranslate } from "../../locales/useTranslate";

import { CircleColorLDSettings } from "./CircleColorLDSettings";

import styles from "../Settings.css";

type CommonCircleColorsProps = {
  colorCircleAdvanced:
    | SettingName.colorCircleAdvanced
    | SettingName.colorTabCircleAdvanced;
  colorCircleLight: ColorSettingName;
  colorCircleBackgroundLight: ColorSettingName;
  colorCircleDark: ColorSettingName;
  colorCircleBackgroundDark: ColorSettingName;
  colorCircleAdvancedFocusLight: ColorSettingName;
  colorCircleAdvancedFocusBackgroundLight: ColorSettingName;
  colorCircleAdvancedShortBreakLight: ColorSettingName;
  colorCircleAdvancedShortBreakBackgroundLight: ColorSettingName;
  colorCircleAdvancedLongBreakLight: ColorSettingName;
  colorCircleAdvancedLongBreakBackgroundLight: ColorSettingName;
  colorCircleAdvancedFocusDark: ColorSettingName;
  colorCircleAdvancedFocusBackgroundDark: ColorSettingName;
  colorCircleAdvancedShortBreakDark: ColorSettingName;
  colorCircleAdvancedShortBreakBackgroundDark: ColorSettingName;
  colorCircleAdvancedLongBreakDark: ColorSettingName;
  colorCircleAdvancedLongBreakBackgroundDark: ColorSettingName;
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const CommonCircleColors = ({
  colorCircleAdvanced,
  colorCircleLight,
  colorCircleBackgroundLight,
  colorCircleDark,
  colorCircleBackgroundDark,
  colorCircleAdvancedFocusLight,
  colorCircleAdvancedFocusBackgroundLight,
  colorCircleAdvancedShortBreakLight,
  colorCircleAdvancedShortBreakBackgroundLight,
  colorCircleAdvancedLongBreakLight,
  colorCircleAdvancedLongBreakBackgroundLight,
  colorCircleAdvancedFocusDark,
  colorCircleAdvancedFocusBackgroundDark,
  colorCircleAdvancedShortBreakDark,
  colorCircleAdvancedShortBreakBackgroundDark,
  colorCircleAdvancedLongBreakDark,
  colorCircleAdvancedLongBreakBackgroundDark,
  setSetting,
  getSetting,
}: CommonCircleColorsProps): JSX.Element => {
  const t = useTranslate();
  const colorScheme = useColorScheme();

  const handleChangeColorCircleAdvanced = useCallback(
    (value: boolean) => {
      setSetting(colorCircleAdvanced, value);
    },
    [colorCircleAdvanced]
  );

  const colorCircleAdvancedSetting = getSetting(colorCircleAdvanced);
  const colorCircleAdvancedTitle = t(
    LocaleLabelName.SettingsCircleColorsAdvancedSettingsLabel
  );

  return (
    <>
      <div className={styles.label}>
        <span className={styles.labelTitle}>{colorCircleAdvancedTitle}</span>
        <Switch
          onChange={handleChangeColorCircleAdvanced}
          aria-label={colorCircleAdvancedTitle}
          checked={colorCircleAdvancedSetting}
        />
      </div>
      {colorCircleAdvancedSetting ? (
        <Tabs
          tabs={[
            {
              title: t(LocaleLabelName.TimerProcessIntervalNameFocus),
              content: (
                <CircleColorLDSettings
                  colorScheme={colorScheme}
                  mainSettingNameLight={colorCircleAdvancedFocusLight}
                  mainSettingNameDark={colorCircleAdvancedFocusDark}
                  backgroundSettingNameLight={
                    colorCircleAdvancedFocusBackgroundLight
                  }
                  backgroundSettingNameDark={
                    colorCircleAdvancedFocusBackgroundDark
                  }
                  getSetting={getSetting}
                  setSetting={setSetting}
                />
              ),
            },
            {
              title: t(LocaleLabelName.TimerProcessIntervalNameShortBreak),
              content: (
                <CircleColorLDSettings
                  colorScheme={colorScheme}
                  mainSettingNameLight={colorCircleAdvancedShortBreakLight}
                  mainSettingNameDark={colorCircleAdvancedShortBreakDark}
                  backgroundSettingNameLight={
                    colorCircleAdvancedShortBreakBackgroundLight
                  }
                  backgroundSettingNameDark={
                    colorCircleAdvancedShortBreakBackgroundDark
                  }
                  getSetting={getSetting}
                  setSetting={setSetting}
                />
              ),
            },
            ...(getSetting(SettingName.longBreak)
              ? [
                  {
                    title: t(LocaleLabelName.TimerProcessIntervalNameLongBreak),
                    content: (
                      <CircleColorLDSettings
                        colorScheme={colorScheme}
                        mainSettingNameLight={colorCircleAdvancedLongBreakLight}
                        mainSettingNameDark={colorCircleAdvancedLongBreakDark}
                        backgroundSettingNameLight={
                          colorCircleAdvancedLongBreakBackgroundLight
                        }
                        backgroundSettingNameDark={
                          colorCircleAdvancedLongBreakBackgroundDark
                        }
                        getSetting={getSetting}
                        setSetting={setSetting}
                      />
                    ),
                  },
                ]
              : []),
          ]}
        />
      ) : (
        <CircleColorLDSettings
          colorScheme={colorScheme}
          mainSettingNameLight={colorCircleLight}
          mainSettingNameDark={colorCircleDark}
          backgroundSettingNameLight={colorCircleBackgroundLight}
          backgroundSettingNameDark={colorCircleBackgroundDark}
          getSetting={getSetting}
          setSetting={setSetting}
        />
      )}
    </>
  );
};
