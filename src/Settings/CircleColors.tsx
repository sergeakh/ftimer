import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import { Switch } from "../ui/Switch/Switch";
import { SettingName, SetSetting, GetSetting, ColorScheme } from "./types";

import { useColorScheme } from "../hooks/useColorScheme";

import styles from "./Settings.css";

type ColorCircleSettingProps = {
  label: string;
  settingName: SettingName;
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
        value={`${getSetting(settingName)}`}
        onChange={handleChangeColor}
      />
    </div>
  );
};

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
      setSetting(SettingName.colorCircleAdvanced, newValue);
    },
    []
  );

  const colorCircleAdvanced = getSetting(SettingName.colorCircleAdvanced);

  return (
    <>
      <h3 className={styles.subTitle}>Colors</h3>
      <div className={styles.label}>
        <span className={styles.labelTitle}>Circle Color Advanced</span>
        <Switch
          className={styles.checkbox}
          onChange={handleChangeColorCircleAdvanced}
          aria-label={"circle color advanced"}
          type="checkbox"
          checked={colorCircleAdvanced}
        />
      </div>
      {colorCircleAdvanced ? (
        <>
          {colorScheme === ColorScheme.Light ? (
            <>
              <ColorCircleSetting
                label="Circle Focus Light"
                settingName={SettingName.colorCircleAdvancedFocusLight}
                getSetting={getSetting}
                setSetting={setSetting}
              />
              <ColorCircleSetting
                label="Circle Background Focus Light"
                settingName={
                  SettingName.colorCircleAdvancedFocusBackgroundLight
                }
                getSetting={getSetting}
                setSetting={setSetting}
              />
              <ColorCircleSetting
                label="Circle Short Break Light"
                settingName={SettingName.colorCircleAdvancedShortBreakLight}
                getSetting={getSetting}
                setSetting={setSetting}
              />
              <ColorCircleSetting
                label="Circle Background Short Break Light"
                settingName={
                  SettingName.colorCircleAdvancedShortBreakBackgroundLight
                }
                getSetting={getSetting}
                setSetting={setSetting}
              />
              <ColorCircleSetting
                label="Circle Long Break Light"
                settingName={SettingName.colorCircleAdvancedLongBreakLight}
                getSetting={getSetting}
                setSetting={setSetting}
              />
              <ColorCircleSetting
                label="Circle Background Long Break Light"
                settingName={
                  SettingName.colorCircleAdvancedLongBreakBackgroundLight
                }
                getSetting={getSetting}
                setSetting={setSetting}
              />
            </>
          ) : (
            <>
              <ColorCircleSetting
                label="Circle Focus Dark"
                settingName={SettingName.colorCircleAdvancedFocusDark}
                getSetting={getSetting}
                setSetting={setSetting}
              />
              <ColorCircleSetting
                label="Circle Background Focus Dark"
                settingName={SettingName.colorCircleAdvancedFocusBackgroundDark}
                getSetting={getSetting}
                setSetting={setSetting}
              />
              <ColorCircleSetting
                label="Circle Short Break Dark"
                settingName={SettingName.colorCircleAdvancedShortBreakDark}
                getSetting={getSetting}
                setSetting={setSetting}
              />
              <ColorCircleSetting
                label="Circle Background Short Break Dark"
                settingName={
                  SettingName.colorCircleAdvancedShortBreakBackgroundDark
                }
                getSetting={getSetting}
                setSetting={setSetting}
              />
              <ColorCircleSetting
                label="Circle Long Break Dark"
                settingName={SettingName.colorCircleAdvancedLongBreakDark}
                getSetting={getSetting}
                setSetting={setSetting}
              />
              <ColorCircleSetting
                label="Circle Background Long Break Dark"
                settingName={
                  SettingName.colorCircleAdvancedLongBreakBackgroundDark
                }
                getSetting={getSetting}
                setSetting={setSetting}
              />
            </>
          )}
        </>
      ) : (
        <>
          <ColorCircleSetting
            label="Circle Light"
            settingName={SettingName.colorCircleLight}
            getSetting={getSetting}
            setSetting={setSetting}
          />
          <ColorCircleSetting
            label="Circle Background Light"
            settingName={SettingName.colorCircleBackgroundLight}
            getSetting={getSetting}
            setSetting={setSetting}
          />
          <ColorCircleSetting
            label="Circle Dark"
            settingName={SettingName.colorCircleDark}
            getSetting={getSetting}
            setSetting={setSetting}
          />
          <ColorCircleSetting
            label="Circle Background Dark"
            settingName={SettingName.colorCircleBackgroundDark}
            getSetting={getSetting}
            setSetting={setSetting}
          />
        </>
      )}
    </>
  );
};
