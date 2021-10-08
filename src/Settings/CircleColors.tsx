import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import { Switch } from "../ui/Switch/Switch";
import {
  ColorSettingName,
  SetSetting,
  GetSetting,
  ColorScheme,
  BaseSettingName,
} from "./types";

import { CircelDemo } from "./CircleDemo";
import { Tabs } from "../ui/Switch/Tabs";

import { useColorScheme } from "../hooks/useColorScheme";

import styles from "./Settings.css";

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
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = e.currentTarget.value;
      e.currentTarget.value = `${newValue}`;
      setSetting(settingName, newValue);
    },
    [settingName]
  );

  return (
    <div className={styles.label}>
      <span className={styles.labelTitle}>{label}</span>
      <input
        type="color"
        aria-label={label}
        className={styles.inputColor}
        value={getSetting(settingName)}
        onChange={handleChangeColor}
      />
    </div>
  );
};

type ColorCircleSettingsProps = {
  mainLabel: string;
  backgroundLabel: string;
  mainColorSettingName: ColorSettingName;
  backgroundColorSettingName: ColorSettingName;
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const ColorCircleSettings = ({
  mainLabel,
  backgroundLabel,
  mainColorSettingName,
  backgroundColorSettingName,
  getSetting,
  setSetting,
}: ColorCircleSettingsProps): JSX.Element => (
  <>
    <CircelDemo
      colorCircle={getSetting(mainColorSettingName)}
      colorBackgoundCircle={getSetting(backgroundColorSettingName)}
    />
    <ColorCircleSetting
      label={mainLabel}
      settingName={mainColorSettingName}
      getSetting={getSetting}
      setSetting={setSetting}
    />
    <ColorCircleSetting
      label={backgroundLabel}
      settingName={backgroundColorSettingName}
      getSetting={getSetting}
      setSetting={setSetting}
    />
  </>
);

type ColorCircleLightDarkSettingsProps = {
  colorScheme: ColorScheme;
  mainLabelLight: string;
  mainLabelDark: string;
  backgroundLabelLight: string;
  backgroundLabelDark: string;
  mainColorSettingNameLight: ColorSettingName;
  mainColorSettingNameDark: ColorSettingName;
  backgroundColorSettingNameLight: ColorSettingName;
  backgroundColorSettingNameDark: ColorSettingName;
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const ColorCircleLightDarkSettings = ({
  colorScheme,
  mainLabelLight,
  mainLabelDark,
  backgroundLabelLight,
  backgroundLabelDark,
  mainColorSettingNameLight,
  mainColorSettingNameDark,
  backgroundColorSettingNameLight,
  backgroundColorSettingNameDark,
  ...props
}: ColorCircleLightDarkSettingsProps): JSX.Element =>
  colorScheme === ColorScheme.Light ? (
    <>
      <ColorCircleSettings
        mainLabel={mainLabelLight}
        mainColorSettingName={mainColorSettingNameLight}
        backgroundLabel={backgroundLabelLight}
        backgroundColorSettingName={backgroundColorSettingNameLight}
        {...props}
      />
    </>
  ) : (
    <>
      <ColorCircleSettings
        mainLabel={mainLabelDark}
        mainColorSettingName={mainColorSettingNameDark}
        backgroundLabel={backgroundLabelDark}
        backgroundColorSettingName={backgroundColorSettingNameDark}
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
  const colorScheme = useColorScheme();

  const handleChangeColorCircleAdvanced = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = e.currentTarget.checked;
      setSetting(BaseSettingName.colorCircleAdvanced, newValue);
    },
    []
  );

  const colorCircleAdvanced = getSetting(BaseSettingName.colorCircleAdvanced);

  return (
    <>
      <h3 className={styles.subTitle}>Colors</h3>
      <div className={styles.label}>
        <span className={styles.labelTitle}>Circle Advanced</span>
        <Switch
          className={styles.checkbox}
          onChange={handleChangeColorCircleAdvanced}
          aria-label={"circle color advanced"}
          type="checkbox"
          checked={colorCircleAdvanced}
        />
      </div>
      {colorCircleAdvanced ? (
        <Tabs
          tabs={[
            {
              title: "Focus",
              content: (
                <ColorCircleLightDarkSettings
                  colorScheme={colorScheme}
                  mainLabelLight="Circle Focus Light"
                  mainLabelDark="Circle Focus Dark"
                  backgroundLabelLight="Circle Background Focus Light"
                  backgroundLabelDark="Circle Background Focus Dark"
                  mainColorSettingNameLight={
                    ColorSettingName.colorCircleAdvancedFocusLight
                  }
                  mainColorSettingNameDark={
                    ColorSettingName.colorCircleAdvancedFocusDark
                  }
                  backgroundColorSettingNameLight={
                    ColorSettingName.colorCircleAdvancedFocusBackgroundLight
                  }
                  backgroundColorSettingNameDark={
                    ColorSettingName.colorCircleAdvancedFocusBackgroundDark
                  }
                  getSetting={getSetting}
                  setSetting={setSetting}
                />
              ),
            },
            {
              title: "Short Break",
              content: (
                <ColorCircleLightDarkSettings
                  colorScheme={colorScheme}
                  mainLabelLight="Circle Short Break Light"
                  mainLabelDark="Circle Short Break Dark"
                  backgroundLabelLight="Circle Background Short Break Light"
                  backgroundLabelDark="Circle Background Short Break Dark"
                  mainColorSettingNameLight={
                    ColorSettingName.colorCircleAdvancedShortBreakLight
                  }
                  mainColorSettingNameDark={
                    ColorSettingName.colorCircleAdvancedShortBreakDark
                  }
                  backgroundColorSettingNameLight={
                    ColorSettingName.colorCircleAdvancedShortBreakBackgroundLight
                  }
                  backgroundColorSettingNameDark={
                    ColorSettingName.colorCircleAdvancedShortBreakBackgroundDark
                  }
                  getSetting={getSetting}
                  setSetting={setSetting}
                />
              ),
            },
            {
              title: "Long Break",
              content: (
                <ColorCircleLightDarkSettings
                  colorScheme={colorScheme}
                  mainLabelLight="Circle Long Break Light"
                  mainLabelDark="Circle Long Break Dark"
                  backgroundLabelLight="Circle Background Long Break Light"
                  backgroundLabelDark="Circle Background Long Break Dark"
                  mainColorSettingNameLight={
                    ColorSettingName.colorCircleAdvancedLongBreakLight
                  }
                  mainColorSettingNameDark={
                    ColorSettingName.colorCircleAdvancedLongBreakDark
                  }
                  backgroundColorSettingNameLight={
                    ColorSettingName.colorCircleAdvancedLongBreakBackgroundLight
                  }
                  backgroundColorSettingNameDark={
                    ColorSettingName.colorCircleAdvancedLongBreakBackgroundDark
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
          mainLabelLight="Circle Light"
          mainLabelDark="Circle Dark"
          backgroundLabelLight="Circle Background Light"
          backgroundLabelDark="Circle Background Dark"
          mainColorSettingNameLight={ColorSettingName.colorCircleLight}
          mainColorSettingNameDark={ColorSettingName.colorCircleDark}
          backgroundColorSettingNameLight={
            ColorSettingName.colorCircleBackgroundLight
          }
          backgroundColorSettingNameDark={
            ColorSettingName.colorCircleBackgroundDark
          }
          getSetting={getSetting}
          setSetting={setSetting}
        />
      )}
    </>
  );
};
