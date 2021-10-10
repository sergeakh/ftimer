import { useCallback, useEffect } from "preact/hooks";

import { isNotification, isNotificationGranted } from "../../utils/browser";
import { ETimerInterval } from "../types";
import { LocaleLabelName } from "../../locales/types";
import { useTranslate } from "../../locales/useTranslate";

import iconSrc from "../../assets/favicon/icon-512.png";
import iconEmptySrc from "../../assets/favicon/empty.png";

export const useNotification = (
  isFinish: boolean,
  timerInterval: ETimerInterval
): void => {
  const t = useTranslate();

  const getNotificationTitle = useCallback(() => {
    const completedLabel = t(LocaleLabelName.TimerNotificationFinishLabel);

    if (timerInterval === ETimerInterval.Focus) {
      return `${t(
        LocaleLabelName.TimerProcessIntervalNameFocus
      )} ${completedLabel}!`;
    }

    if (timerInterval === ETimerInterval.ShortBreak) {
      return `${t(
        LocaleLabelName.TimerProcessIntervalNameShortBreak
      )} ${completedLabel}!`;
    }

    if (timerInterval === ETimerInterval.LongBreak) {
      return `${t(
        LocaleLabelName.TimerProcessIntervalNameLongBreak
      )} ${completedLabel}!`;
    }

    return "";
  }, [timerInterval]);

  useEffect(() => {
    if (isNotification() && isNotificationGranted() && isFinish) {
      const title = getNotificationTitle();
      const opts = {
        icon: iconEmptySrc,
        badge: iconSrc,
      };

      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.showNotification) {
          registration?.showNotification(title, opts);
        } else {
          const notification = new Notification(title, opts);
        }
      });
    }
  }, [isFinish]);
};
