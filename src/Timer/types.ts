export const enum ETimerInterval {
  Focus = "Focus",
  ShortBreak = "ShortBreak",
  LongBreak = "LongBreak",
}

export type SetTimerInterval = (newTimerInterval: ETimerInterval) => void;
