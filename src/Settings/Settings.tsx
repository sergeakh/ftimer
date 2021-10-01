import { JSX } from "preact";
import { useCallback, useContext } from "preact/hooks";

import { Header, HeaderLink } from "../Header";

import { PATHS } from "../constants";

import styles from "./Settings.css";
import { SettingsContext } from "../contexts/settings";
import {
  MAX_DURATION,
  MAX_LONG_BREAK_EVERY,
  MIN_DURATION,
  MIN_LONG_BREAK_EVERY,
} from "../constants/common";

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
  const settings = useContext(SettingsContext);

  const handleChangeFocusDuration = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = getClearedDurationValue(e.currentTarget.value);
      e.currentTarget.value = `${newValue}`;
      settings.setFocusDuration(newValue);
    },
    []
  );

  const handleChangeShortBreakDuration = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = getClearedDurationValue(e.currentTarget.value);
      e.currentTarget.value = `${newValue}`;
      settings.setShortBreakDuration(newValue);
    },
    []
  );

  const handleChangeLongBreakDuration = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = getClearedDurationValue(e.currentTarget.value);
      e.currentTarget.value = `${newValue}`;
      settings.setLongBreakDuration(newValue);
    },
    []
  );

  const handleChangeLongBreakEvery = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = getClearedTimesValue(e.currentTarget.value);
      e.currentTarget.value = `${newValue}`;
      settings.setLongBreakEvery(newValue);
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
              value={settings.focusDuration}
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
              value={settings.shortBreakDuration}
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
              value={settings.longBreakDuration}
              inputMode="numeric"
            />
          </label>
          <label className={styles.label}>
            <span className={styles.labelTitle}>Long Break Every (times)</span>
            <input
              className={styles.input}
              onChange={handleChangeLongBreakEvery}
              type="text"
              value={settings.longBreakEvery}
              inputMode="numeric"
            />
          </label>
        </form>
      </div>
    </>
  );
};
