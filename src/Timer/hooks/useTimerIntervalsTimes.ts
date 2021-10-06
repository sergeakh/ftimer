import { useCallback, useEffect, useState } from "preact/hooks";

import { ETimerInterval } from "../types";

export const enum Status {
  Another,
  Finish,
}

type UseTimerIntervalsTimesResult = {
  init: () => void;
  focusTimes: number;
  shortBreakTimes: number;
  longBreakTimes: number;
};

export const useTimerIntervalsTimes = (
  status: Status,
  timerInterval: ETimerInterval
): UseTimerIntervalsTimesResult => {
  const [focusTimes, setFocusTimes] = useState(0);
  const [shortBreakTimes, setShortBreakTimes] = useState(0);
  const [longBreakTimes, setLongBreakTimes] = useState(0);

  const init = useCallback(() => {
    setFocusTimes(0);
    setShortBreakTimes(0);
    setLongBreakTimes(0);
  }, []);

  useEffect(() => {
    if (status !== Status.Finish) return;

    if (timerInterval === ETimerInterval.Focus) {
      setFocusTimes((prev) => prev + 1);
      return;
    }

    if (timerInterval === ETimerInterval.ShortBreak) {
      setShortBreakTimes((prev) => prev + 1);
      return;
    }

    if (timerInterval === ETimerInterval.LongBreak) {
      setLongBreakTimes((prev) => prev + 1);
    }
  }, [status]);

  return {
    init,
    focusTimes,
    shortBreakTimes,
    longBreakTimes,
  };
};
