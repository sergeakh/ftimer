import { JSX } from "preact";
import { useCallback, useContext } from "preact/hooks";

import { Header, HeaderLink } from "../ui/Header";

import { PATHS } from "../constants";

import { SettingsContext } from "./context";
import {
  MAX_DURATION,
  MAX_LONG_BREAK_EVERY,
  MIN_DURATION,
  MIN_LONG_BREAK_EVERY,
} from "./constants";
import { SettingName } from "./types";
import { Switch } from "../ui/Switch/Switch";

import styles from "./Settings.css";

type Props = {
  path: string;
};

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

export const Settings = (props: Props): JSX.Element => {
  const { setSetting, settings } = useContext(SettingsContext);

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

  return (
    <>
      <Header>
        <HeaderLink
          title="Close Settings"
          href={PATHS.root}
          className={styles.linkClose}
        />
      </Header>
      <div className={styles.settings}>
        <h2 className={styles.title}>Settings</h2>
        <form>
          <label className={styles.label}>
            <span className={styles.labelTitle}>Focus Duration (mins)</span>
            <input
              className={styles.input}
              onChange={handleChangeFocusDuration}
              type="text"
              value={settings[SettingName.focusDuration]}
              inputMode="numeric"
            />
          </label>
          <label className={styles.label}>
            <span className={styles.labelTitle}>
              Short Break Duration (mins)
            </span>
            <input
              className={styles.input}
              onChange={handleChangeShortBreakDuration}
              type="text"
              value={settings[SettingName.shortBreakDuration]}
              inputMode="numeric"
            />
          </label>
          <label className={styles.label}>
            <span className={styles.labelTitle}>
              Long Break Duration (mins)
            </span>
            <input
              className={styles.input}
              onChange={handleChangeLongBreakDuration}
              type="text"
              value={settings[SettingName.longBreakDuration]}
              inputMode="numeric"
            />
          </label>
          <label className={styles.label}>
            <span className={styles.labelTitle}>Long Break Every (times)</span>
            <input
              className={styles.input}
              onChange={handleChangeLongBreakEvery}
              type="text"
              value={settings[SettingName.longBreakEvery]}
              inputMode="numeric"
            />
          </label>
          <h3 className={styles.subTitle}>Auto-Start</h3>
          <div className={styles.label}>
            <span className={styles.labelTitle}>Break</span>
            <Switch
              className={styles.checkbox}
              onChange={handleChangeAutoStartBreak}
              aria-label={"Break"}
              type="checkbox"
              checked={settings[SettingName.autoStartBreak]}
            />
          </div>
          <div className={styles.label}>
            <span className={styles.labelTitle}>Next Focus</span>
            <Switch
              className={styles.checkbox}
              onChange={handleChangeAutoStartNextBreak}
              aria-label={"Next Focus"}
              type="checkbox"
              checked={settings[SettingName.autoStartNextFocus]}
            />
          </div>
        </form>
      </div>
    </>
  );
};
