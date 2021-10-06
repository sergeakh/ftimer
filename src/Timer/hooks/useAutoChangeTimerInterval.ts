import { useContext, useEffect } from "preact/hooks";
import { SettingsContext } from "../../Settings";
import { ETimerInterval, SetTimerInterval } from "../types";

export const enum Status {
  Another,
  Finish,
}

export const useAutoChangeTimerInterval = (
  status: Status,
  focusTimes: number,
  timerInterval: ETimerInterval,
  setTimerInterval: SetTimerInterval
): void => {
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    if (status !== Status.Finish) return;

    if (timerInterval === ETimerInterval.Focus) {
      if (settings.longBreak && focusTimes % settings.longBreakEvery === 0) {
        setTimerInterval(ETimerInterval.LongBreak);
      } else {
        setTimerInterval(ETimerInterval.ShortBreak);
      }
    } else if (
      timerInterval === ETimerInterval.ShortBreak ||
      timerInterval === ETimerInterval.LongBreak
    ) {
      setTimerInterval(ETimerInterval.Focus);
    }
  }, [status]);
};
