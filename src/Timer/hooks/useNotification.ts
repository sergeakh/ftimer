import { useCallback, useEffect } from "preact/hooks";

import { isNotification, isNotificationGranted } from "../../utils/browser";
import { ETimerInterval } from "../types";
import { LocaleLabelName } from "../../locales/types";
import { useTranslate } from "../../locales/useTranslate";

import iconSrc from "../../assets/favicon/icon-512.png";
import iconEmptySrc from "../../assets/favicon/empty.png";
import { GetSetting, SettingName } from "../../Settings/types";

export const useNotification = (
  isFinish: boolean,
  timerInterval: ETimerInterval,
  getSetting: GetSetting
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

  const notificationFocus =
    timerInterval === ETimerInterval.Focus &&
    getSetting(SettingName.notificationFocus) &&
    isNotificationGranted() &&
    isNotification();
  const notificationShortBreak =
    timerInterval === ETimerInterval.ShortBreak &&
    getSetting(SettingName.notificationShortBreak) &&
    isNotificationGranted() &&
    isNotification();
  const notificationLongBreak =
    timerInterval === ETimerInterval.LongBreak &&
    getSetting(SettingName.notificationLongBreak) &&
    isNotificationGranted() &&
    isNotification();

  useEffect(() => {
    if (
      (notificationFocus || notificationShortBreak || notificationLongBreak) &&
      isFinish
    ) {
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
