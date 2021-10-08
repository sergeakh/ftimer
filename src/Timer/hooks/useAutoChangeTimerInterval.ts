import { useEffect } from "preact/hooks";
import { useSettings } from "../../Settings/useSettings";
import { BaseSettingName } from "../../Settings/types";
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
  const { getSetting } = useSettings();

  useEffect(() => {
    if (status !== Status.Finish) return;

    if (timerInterval === ETimerInterval.Focus) {
      if (
        getSetting(BaseSettingName.longBreak) &&
        focusTimes % getSetting(BaseSettingName.longBreakEvery) === 0
      ) {
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
