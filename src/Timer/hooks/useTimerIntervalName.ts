import { ETimerInterval } from "../types";

const timerIntervalNames = {
  [ETimerInterval.Focus]: "Focus",
  [ETimerInterval.ShortBreak]: "Short Break",
  [ETimerInterval.LongBreak]: "Long Break",
};

export const useIntervalName = (timerInterval: ETimerInterval): string =>
  timerIntervalNames[timerInterval];
