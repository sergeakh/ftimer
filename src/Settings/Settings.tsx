import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import {
  MAX_DURATION,
  MAX_LONG_BREAK_EVERY,
  MIN_DURATION,
  MIN_LONG_BREAK_EVERY,
} from "./constants";

import { SettingName } from "./types";
import { Switch } from "../ui/Switch/Switch";

import { CircleColors } from "./CircleColors";

import { useSettings } from "./useSettings";

import styles from "./Settings.css";

const getClearedDurationValue = (value: string): number => {
  const newValue = +value.replace(/\D/g, "") || MIN_DURATION;

  if (newValue < MIN_DURATION) return MIN_DURATION;
  if (newValue > MAX_DURATION) return MAX_DURATION;

  return newValue;
};

const getClearedTimesValue = (value: string): number => {
  const newValue = +value.replace(/\D/g, "") || MIN_LONG_BREAK_EVERY;

  if (newValue < MIN_LONG_BREAK_EVERY) return MIN_LONG_BREAK_EVERY;
  if (newValue > MAX_LONG_BREAK_EVERY) return MAX_LONG_BREAK_EVERY;

  return newValue;
};

export const Settings = (): JSX.Element => {
  const { setSetting, getSetting } = useSettings();

  const handleChangeFocusDuration = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = getClearedDurationValue(e.currentTarget.value);
      e.currentTarget.value = `${newValue}`;
      setSetting(SettingName.focusDuration, newValue);
    },
    []
  );

  const handleChangeShortBreakDuration = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = getClearedDurationValue(e.currentTarget.value);
      e.currentTarget.value = `${newValue}`;
      setSetting(SettingName.shortBreakDuration, newValue);
    },
    []
  );

  const handleChangeLongBreak = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = e.currentTarget.checked;
      setSetting(SettingName.longBreak, newValue);
    },
    []
  );

  const handleChangeLongBreakDuration = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = getClearedDurationValue(e.currentTarget.value);
      e.currentTarget.value = `${newValue}`;
      setSetting(SettingName.longBreakDuration, newValue);
    },
    []
  );

  const handleChangeLongBreakEvery = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = getClearedTimesValue(e.currentTarget.value);
      e.currentTarget.value = `${newValue}`;
      setSetting(SettingName.longBreakEvery, newValue);
    },
    []
  );

  const handleChangeAutoStartBreak = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = e.currentTarget.checked;
      setSetting(SettingName.autoStartBreak, newValue);
    },
    []
  );

  const handleChangeAutoStartNextBreak = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = e.currentTarget.checked;
      setSetting(SettingName.autoStartNextFocus, newValue);
    },
    []
  );

  const handleFocus = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const input = e.currentTarget;
      const len = input.value.length;
      setTimeout(() => {
        input.setSelectionRange(len, len);
      }, 0);
    },
    []
  );

  return (
    <div className={styles.settings}>
      <h2 className={styles.title}>Settings</h2>
      <form>
        <label className={styles.label}>
          <span className={styles.labelTitle}>Focus Duration (mins)</span>
          <input
            className={styles.input}
            onChange={handleChangeFocusDuration}
            onFocus={handleFocus}
            type="text"
            value={getSetting(SettingName.focusDuration)}
            inputMode="numeric"
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelTitle}>Short Break Duration (mins)</span>
          <input
            className={styles.input}
            onChange={handleChangeShortBreakDuration}
            onFocus={handleFocus}
            type="text"
            value={getSetting(SettingName.shortBreakDuration)}
            inputMode="numeric"
          />
        </label>
        <div className={styles.label}>
          <span className={styles.labelTitle}>Long Break</span>
          <Switch
            className={styles.checkbox}
            onChange={handleChangeLongBreak}
            aria-label={"Long Break"}
            type="checkbox"
            checked={getSetting(SettingName.longBreak)}
          />
        </div>
        {getSetting(SettingName.longBreak) && (
          <>
            <label className={styles.label}>
              <span className={styles.labelTitle}>
                Long Break Duration (mins)
              </span>
              <input
                className={styles.input}
                onChange={handleChangeLongBreakDuration}
                onFocus={handleFocus}
                type="text"
                value={getSetting(SettingName.longBreakDuration)}
                inputMode="numeric"
              />
            </label>
            <label className={styles.label}>
              <span className={styles.labelTitle}>
                Long Break Every (times)
              </span>
              <input
                className={styles.input}
                onChange={handleChangeLongBreakEvery}
                onFocus={handleFocus}
                type="text"
                value={getSetting(SettingName.longBreakEvery)}
                inputMode="numeric"
              />
            </label>
          </>
        )}
        <h3 className={styles.subTitle}>Auto-Start</h3>
        <div className={styles.label}>
          <span className={styles.labelTitle}>Break</span>
          <Switch
            className={styles.checkbox}
            onChange={handleChangeAutoStartBreak}
            aria-label={"Break"}
            type="checkbox"
            checked={getSetting(SettingName.autoStartBreak)}
          />
        </div>
        <div className={styles.label}>
          <span className={styles.labelTitle}>Next Focus</span>
          <Switch
            className={styles.checkbox}
            onChange={handleChangeAutoStartNextBreak}
            aria-label={"Next Focus"}
            type="checkbox"
            checked={getSetting(SettingName.autoStartNextFocus)}
          />
        </div>
        <CircleColors getSetting={getSetting} setSetting={setSetting} />
      </form>
    </div>
  );
};
