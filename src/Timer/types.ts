export const enum ETimerInterval {
  Focus = "F",
  ShortBreak = "S",
  LongBreak = "L",
}

export type SetTimerInterval = (newTimerInterval: ETimerInterval) => void;
