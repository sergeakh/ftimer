import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import {
  MAX_DURATION,
  MAX_LONG_BREAK_EVERY,
  MIN_DURATION,
  MIN_LONG_BREAK_EVERY,
} from "./constants";

import { SettingName } from "./types";
import { Switch } from "../ui/Switch";
import { Input } from "../ui/Input";

import { LocaleLabelName } from "../locales/types";
import { Circles } from "./Circles";
import { Language } from "./Language";
import { Sounds } from "./Sounds";
import { Notifications } from "./Notifications";
import { useTranslate } from "../locales/useTranslate";
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
  const t = useTranslate();
  const { setSetting, getSetting } = useSettings();

  const handleChangeFocusDuration = useCallback((value: string) => {
    setSetting(SettingName.focusDuration, getClearedDurationValue(value));
  }, []);

  const handleChangeShortBreakDuration = useCallback((value: string) => {
    setSetting(SettingName.shortBreakDuration, getClearedDurationValue(value));
  }, []);

  const handleChangeLongBreak = useCallback((value: boolean) => {
    setSetting(SettingName.longBreak, value);
  }, []);

  const handleChangeLongBreakDuration = useCallback((value: string) => {
    setSetting(SettingName.longBreakDuration, getClearedDurationValue(value));
  }, []);

  const handleChangeLongBreakEvery = useCallback((value: string) => {
    setSetting(SettingName.longBreakEvery, getClearedTimesValue(value));
  }, []);

  const handleChangeAutoStartBreak = useCallback((value: boolean) => {
    setSetting(SettingName.autoStartBreak, value);
  }, []);

  const handleChangeAutoStartNextBreak = useCallback((value: boolean) => {
    setSetting(SettingName.autoStartNextFocus, value);
  }, []);

  const durFocusLabel = t(LocaleLabelName.TimerProcessIntervalNameFocus);
  const durShortBreakLabel = t(
    LocaleLabelName.TimerProcessIntervalNameShortBreak
  );
  const durLongBreakLabel = t(
    LocaleLabelName.TimerProcessIntervalNameLongBreak
  );
  const durLongBreakEveryLabel = t(
    LocaleLabelName.SettingsDurationsLongBreakEveryLabel
  );

  const autoStartBreakLabel = t(LocaleLabelName.SettingsAutoStartBreakLabel);
  const autoStartNextFocusLabel = t(
    LocaleLabelName.SettingsAutoStartNextFocusLabel
  );

  return (
    <div className={styles.settings}>
      <form>
        <Language setSetting={setSetting} getSetting={getSetting} />
        <h3 className={styles.subTitle}>
          {t(LocaleLabelName.SettingsDurationsTitle)}
        </h3>
        <div className={styles.label}>
          <span className={styles.labelTitle}>{durFocusLabel}</span>
          <Input
            aria-label={durFocusLabel}
            value={getSetting(SettingName.focusDuration)}
            onChange={handleChangeFocusDuration}
            inputMode="numeric"
          />
        </div>
        <div className={styles.label}>
          <span className={styles.labelTitle}>{durShortBreakLabel}</span>
          <Input
            aria-label={durShortBreakLabel}
            value={getSetting(SettingName.shortBreakDuration)}
            onChange={handleChangeShortBreakDuration}
            inputMode="numeric"
          />
        </div>
        <div className={styles.label}>
          <span className={styles.labelTitle}>{durLongBreakLabel}</span>
          <Switch
            onChange={handleChangeLongBreak}
            aria-label={durLongBreakLabel}
            checked={getSetting(SettingName.longBreak)}
          />
        </div>
        {getSetting(SettingName.longBreak) && (
          <>
            <div className={styles.label}>
              <span className={styles.labelTitle}>{durLongBreakLabel}</span>
              <Input
                aria-label={durLongBreakLabel}
                value={getSetting(SettingName.longBreakDuration)}
                onChange={handleChangeLongBreakDuration}
                inputMode="numeric"
              />
            </div>
            <div className={styles.label}>
              <span className={styles.labelTitle}>
                {durLongBreakEveryLabel}
              </span>
              <Input
                aria-label={durLongBreakEveryLabel}
                value={getSetting(SettingName.longBreakEvery)}
                onChange={handleChangeLongBreakEvery}
                inputMode="numeric"
              />
            </div>
          </>
        )}
        <h3 className={styles.subTitle}>
          {t(LocaleLabelName.SettingsAutoStartTitle)}
        </h3>
        <div className={styles.label}>
          <span className={styles.labelTitle}>{autoStartBreakLabel}</span>
          <Switch
            className={styles.checkbox}
            onChange={handleChangeAutoStartBreak}
            aria-label={autoStartBreakLabel}
            checked={getSetting(SettingName.autoStartBreak)}
          />
        </div>
        <div className={styles.label}>
          <span className={styles.labelTitle}>{autoStartNextFocusLabel}</span>
          <Switch
            className={styles.checkbox}
            onChange={handleChangeAutoStartNextBreak}
            aria-label={autoStartNextFocusLabel}
            checked={getSetting(SettingName.autoStartNextFocus)}
          />
        </div>
        <Sounds getSetting={getSetting} setSetting={setSetting} />
        <Notifications getSetting={getSetting} setSetting={setSetting} />
        <Circles getSetting={getSetting} setSetting={setSetting} />
      </form>
    </div>
  );
};
