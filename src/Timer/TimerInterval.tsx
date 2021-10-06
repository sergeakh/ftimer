import { JSX } from "preact";

import { useCallback } from "preact/hooks";
import { ETimerInterval, SetTimerInterval } from "./types";

import styles from "./TimerInterval.css";

export const enum Status {
  Run = "Run",
  Another = "Another",
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
  const handleChange = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const value: ETimerInterval = e.currentTarget.value as ETimerInterval;

      onChangeTimerInterval(value);
    },
    [onChangeTimerInterval]
  );

  return (
    <div className={styles.wrapper}>
      {status === Status.Another && (
        <fieldset className={styles.switcher}>
          <legend className="vh">Timer Mode</legend>
          <input
            id={styles.focus}
            className="vh"
            type="radio"
            name="timer-type"
            value={ETimerInterval.Focus}
            checked={timerInterval === ETimerInterval.Focus}
            onChange={handleChange}
          />
          <label
            htmlFor={styles.focus}
            className={styles.switcherButton}
            title="Focus"
            aria-label="Focus"
          >
            F
          </label>
          <input
            id={styles.shortBreak}
            className="vh"
            type="radio"
            name="timer-type"
            value={ETimerInterval.ShortBreak}
            checked={timerInterval === ETimerInterval.ShortBreak}
            onChange={handleChange}
          />
          <label
            htmlFor={styles.shortBreak}
            className={styles.switcherButton}
            title="Short Break"
            aria-label="Short Break"
          >
            S
          </label>
          {isLongBreak && (
            <>
              <input
                id={styles.longBreak}
                className="vh"
                type="radio"
                name="timer-type"
                value={ETimerInterval.LongBreak}
                checked={timerInterval === ETimerInterval.LongBreak}
                onChange={handleChange}
              />
              <label
                htmlFor={styles.longBreak}
                className={styles.switcherButton}
                title="Long Break"
                aria-label="Long Break"
              >
                L
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
