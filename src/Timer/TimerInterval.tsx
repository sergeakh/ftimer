import { JSX } from "preact";

import { useCallback } from "preact/hooks";
import { ETimerInterval, SetTimerInterval } from "./types";

import styles from "./TimerInterval.css";
import { useTranslate } from "../locales/useTranslate";
import { LocaleLabelName } from "../locales/types";

export const enum Status {
  Run,
  Another,
}

type Props = {
  status: Status;
  isLongBreak: boolean;
  timerInterval: ETimerInterval;
  onChangeTimerInterval: SetTimerInterval;
};

export const TimerInterval = ({
  status,
  isLongBreak,
  timerInterval,
  onChangeTimerInterval,
}: Props): JSX.Element => {
  const t = useTranslate();

  const handleChange = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const value: ETimerInterval = e.currentTarget.value as ETimerInterval;

      onChangeTimerInterval(value);
    },
    [onChangeTimerInterval]
  );

  const optionName = `timer-interval-${styles.wrapper}`;

  const focusTitle = t(LocaleLabelName.TimerProcessIntervalNameFocus);
  const focusShortTitle = t(LocaleLabelName.TimerProcessIntervalNameFocusShort);
  const shortBreakTitle = t(LocaleLabelName.TimerProcessIntervalNameShortBreak);
  const shortBreakShortTitle = t(
    LocaleLabelName.TimerProcessIntervalNameShortBreakShort
  );
  const shortLongTitle = t(LocaleLabelName.TimerProcessIntervalNameLongBreak);
  const shortLongShortTitle = t(
    LocaleLabelName.TimerProcessIntervalNameLongBreakShort
  );

  return (
    <div className={styles.wrapper}>
      {status === Status.Another && (
        <fieldset className={styles.switcher}>
          <legend className="vh">
            {t(LocaleLabelName.TimerProcessIntervalSwitcherName)}
          </legend>
          <input
            id={styles.focus}
            className="vh"
            type="radio"
            name={optionName}
            value={ETimerInterval.Focus}
            checked={timerInterval === ETimerInterval.Focus}
            onChange={handleChange}
          />
          <label
            htmlFor={styles.focus}
            className={styles.switcherButton}
            title={focusTitle}
            aria-label={focusTitle}
          >
            {focusShortTitle}
          </label>
          <input
            id={styles.shortBreak}
            className="vh"
            type="radio"
            name={optionName}
            value={ETimerInterval.ShortBreak}
            checked={timerInterval === ETimerInterval.ShortBreak}
            onChange={handleChange}
          />
          <label
            htmlFor={styles.shortBreak}
            className={styles.switcherButton}
            title={shortBreakTitle}
            aria-label={shortBreakTitle}
          >
            {shortBreakShortTitle}
          </label>
          {isLongBreak && (
            <>
              <input
                id={styles.longBreak}
                className="vh"
                type="radio"
                name={optionName}
                value={ETimerInterval.LongBreak}
                checked={timerInterval === ETimerInterval.LongBreak}
                onChange={handleChange}
              />
              <label
                htmlFor={styles.longBreak}
                className={styles.switcherButton}
                title={shortLongTitle}
                aria-label={shortLongTitle}
              >
                {shortLongShortTitle}
              </label>
            </>
          )}

          <div className={styles.wrapSwitcherStatus}>
            <div className={styles.switcherStatus}></div>
          </div>
        </fieldset>
      )}
    </div>
  );
};
