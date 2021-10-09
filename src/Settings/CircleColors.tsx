import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import { Switch } from "../ui/Switch/Switch";
import {
  SetSetting,
  GetSetting,
  ColorScheme,
  SettingName,
  ColorSettingName,
} from "./types";

import { CircelDemo } from "./CircleDemo";
import { Tabs } from "../ui/Tabs";
import { InputColor } from "../ui/InputColor";

import { useColorScheme } from "../hooks/useColorScheme";

import styles from "./Settings.css";
import { useTranslate } from "../locales/useTranslate";
import { LocaleLabelName } from "../locales/types";
import { usePropByColorScheme } from "../hooks/usePropByColorScheme";

type ColorCircleSettingProps = {
  label: string;
  settingName: ColorSettingName;
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const ColorCircleSetting = ({
  label,
  settingName,
  getSetting,
  setSetting,
}: ColorCircleSettingProps): JSX.Element => {
  const handleChangeColor = useCallback(
    (value: string) => {
      setSetting(settingName, value);
    },
    [settingName]
  );

  return (
    <div className={styles.label}>
      <span className={styles.labelTitle}>{label}</span>
      <InputColor
        aria-label={label}
        value={getSetting(settingName)}
        onChange={handleChangeColor}
      />
    </div>
  );
};

type ColorCircleSettingsProps = {
  mainSettingName: ColorSettingName;
  backgroundSettingName: ColorSettingName;
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const ColorCircleSettings = ({
  mainSettingName,
  backgroundSettingName,
  getSetting,
  setSetting,
}: ColorCircleSettingsProps): JSX.Element => {
  const t = useTranslate();

  return (
    <>
      <CircelDemo
        colorCircle={getSetting(mainSettingName)}
        colorBackgoundCircle={getSetting(backgroundSettingName)}
      />
      <ColorCircleSetting
        label={t(LocaleLabelName.SettingsColorsCircleMainLabel)}
        settingName={mainSettingName}
        getSetting={getSetting}
        setSetting={setSetting}
      />
      <ColorCircleSetting
        label={t(LocaleLabelName.SettingsColorsCircleBackgroundLabel)}
        settingName={backgroundSettingName}
        getSetting={getSetting}
        setSetting={setSetting}
      />
    </>
  );
};
type ColorCircleLightDarkSettingsProps = {
  colorScheme: ColorScheme;
  mainSettingNameLight: ColorSettingName;
  mainSettingNameDark: ColorSettingName;
  backgroundSettingNameLight: ColorSettingName;
  backgroundSettingNameDark: ColorSettingName;
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const ColorCircleLightDarkSettings = ({
  colorScheme,
  mainSettingNameLight,
  mainSettingNameDark,
  backgroundSettingNameLight,
  backgroundSettingNameDark,
  ...props
}: ColorCircleLightDarkSettingsProps): JSX.Element =>
  colorScheme === ColorScheme.Light ? (
    <>
      <ColorCircleSettings
        mainSettingName={mainSettingNameLight}
        backgroundSettingName={backgroundSettingNameLight}
        {...props}
      />
    </>
  ) : (
    <>
      <ColorCircleSettings
        mainSettingName={mainSettingNameDark}
        backgroundSettingName={backgroundSettingNameDark}
        {...props}
      />
    </>
  );

type Props = {
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const CircleColors = ({
  setSetting,
  getSetting,
}: Props): JSX.Element => {
  const t = useTranslate();
  const colorScheme = useColorScheme();
  const { getProp } = usePropByColorScheme({});

  const handleChangeColorCircleAdvanced = useCallback((value: boolean) => {
    setSetting(SettingName.colorCircleAdvanced, value);
  }, []);

  const title = `${t(LocaleLabelName.SettingsColorsTitle)} (${getProp(
    t(LocaleLabelName.SidebarColorSchemeSwitcherOptionLightTitle),
    t(LocaleLabelName.SidebarColorSchemeSwitcherOptionDarkTitle)
  )})`;
  const colorCircleAdvanced = getSetting(SettingName.colorCircleAdvanced);
  const colorCircleAdvancedTitle = t(
    LocaleLabelName.SettingsColorsAdvancedSettingsLabel
  );

  return (
    <>
      <h3 className={styles.subTitle}>{title}</h3>
      <div className={styles.label}>
        <span className={styles.labelTitle}>{colorCircleAdvancedTitle}</span>
        <Switch
          onChange={handleChangeColorCircleAdvanced}
          aria-label={colorCircleAdvancedTitle}
          checked={colorCircleAdvanced}
        />
      </div>
      {colorCircleAdvanced ? (
        <Tabs
          tabs={[
            {
              title: t(LocaleLabelName.TimerProcessIntervalNameFocus),
              content: (
                <ColorCircleLightDarkSettings
                  colorScheme={colorScheme}
                  mainSettingNameLight={
                    SettingName.colorCircleAdvancedFocusLight
                  }
                  mainSettingNameDark={SettingName.colorCircleAdvancedFocusDark}
                  backgroundSettingNameLight={
                    SettingName.colorCircleAdvancedFocusBackgroundLight
                  }
                  backgroundSettingNameDark={
                    SettingName.colorCircleAdvancedFocusBackgroundDark
                  }
                  getSetting={getSetting}
                  setSetting={setSetting}
                />
              ),
            },
            {
              title: t(LocaleLabelName.TimerProcessIntervalNameShortBreak),
              content: (
                <ColorCircleLightDarkSettings
                  colorScheme={colorScheme}
                  mainSettingNameLight={
                    SettingName.colorCircleAdvancedShortBreakLight
                  }
                  mainSettingNameDark={
                    SettingName.colorCircleAdvancedShortBreakDark
                  }
                  backgroundSettingNameLight={
                    SettingName.colorCircleAdvancedShortBreakBackgroundLight
                  }
                  backgroundSettingNameDark={
                    SettingName.colorCircleAdvancedShortBreakBackgroundDark
                  }
                  getSetting={getSetting}
                  setSetting={setSetting}
                />
              ),
            },
            {
              title: t(LocaleLabelName.TimerProcessIntervalNameLongBreak),
              content: (
                <ColorCircleLightDarkSettings
                  colorScheme={colorScheme}
                  mainSettingNameLight={
                    SettingName.colorCircleAdvancedLongBreakLight
                  }
                  mainSettingNameDark={
                    SettingName.colorCircleAdvancedLongBreakDark
                  }
                  backgroundSettingNameLight={
                    SettingName.colorCircleAdvancedLongBreakBackgroundLight
                  }
                  backgroundSettingNameDark={
                    SettingName.colorCircleAdvancedLongBreakBackgroundDark
                  }
                  getSetting={getSetting}
                  setSetting={setSetting}
                />
              ),
            },
          ]}
        />
      ) : (
        <ColorCircleLightDarkSettings
          colorScheme={colorScheme}
          mainSettingNameLight={SettingName.colorCircleLight}
          mainSettingNameDark={SettingName.colorCircleDark}
          backgroundSettingNameLight={SettingName.colorCircleBackgroundLight}
          backgroundSettingNameDark={SettingName.colorCircleBackgroundDark}
          getSetting={getSetting}
          setSetting={setSetting}
        />
      )}
    </>
  );
};
