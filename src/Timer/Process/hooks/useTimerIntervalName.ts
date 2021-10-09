import { LocaleLabelName } from "../../../locales/types";
import { useTranslate } from "../../../locales/useTranslate";
import { ETimerInterval } from "../../types";

export const enum Status {
  Run,
  Pause,
}

const timerIntervalNames = {
  [ETimerInterval.Focus]: LocaleLabelName.TimerProcessIntervalNameFocus,
  [ETimerInterval.ShortBreak]:
    LocaleLabelName.TimerProcessIntervalNameShortBreak,
  [ETimerInterval.LongBreak]: LocaleLabelName.TimerProcessIntervalNameLongBreak,
};

export const useIntervalName = (
  status: Status,
  timerInterval: ETimerInterval
): string => {
  const t = useTranslate();

  if (status === Status.Pause)
    return t(LocaleLabelName.TimerProcessIntervalNamePause);

  return t(timerIntervalNames[timerInterval]);
};
