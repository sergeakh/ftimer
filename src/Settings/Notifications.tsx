import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import { Switch } from "../ui/Switch";

import { SettingName, SetSetting, GetSetting } from "./types";
import { useTranslate } from "../locales/useTranslate";
import { LocaleLabelName } from "../locales/types";

import { isNotification, isNotificationGranted } from "../utils/browser";

import styles from "./Settings.css";

const requestPermision = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

type Props = {
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const Notifications = ({
  setSetting,
  getSetting,
}: Props): JSX.Element => {
  const t = useTranslate();

  const handleChangeNotifications = useCallback(
    (setttingName: SettingName, value: boolean) => {
      if (isNotificationGranted()) {
        setSetting(setttingName, value);
      } else {
        requestPermision().then((permissed) => {
          setSetting(setttingName, permissed);
        });
      }
    },
    []
  );

  const handleChangeFocusNotifications = useCallback((value: boolean) => {
    handleChangeNotifications(SettingName.notificationFocus, value);
  }, []);

  const handleChangeShortBreakNotifications = useCallback((value: boolean) => {
    handleChangeNotifications(SettingName.notificationShortBreak, value);
  }, []);

  const handleChangeLongBreakNotifications = useCallback((value: boolean) => {
    handleChangeNotifications(SettingName.notificationLongBreak, value);
  }, []);

  const focusLabel = t(LocaleLabelName.TimerProcessIntervalNameFocus);
  const shortBreakLabel = t(LocaleLabelName.TimerProcessIntervalNameShortBreak);
  const longBreakLabel = t(LocaleLabelName.TimerProcessIntervalNameLongBreak);

  if (!isNotification()) return <></>;

  const notificationFocus =
    getSetting(SettingName.notificationFocus) && isNotificationGranted();
  const notificationShortBreak =
    getSetting(SettingName.notificationShortBreak) && isNotificationGranted();
  const notificationLongBreak =
    getSetting(SettingName.notificationLongBreak) && isNotificationGranted();

  return (
    <div>
      <h3 className={styles.subTitle}>
        {t(LocaleLabelName.SettingsNotifications)}
      </h3>
      <div className={styles.label}>
        <span className={styles.labelTitle}>{focusLabel}</span>
        <Switch
          onChange={handleChangeFocusNotifications}
          aria-label={focusLabel}
          checked={notificationFocus}
        />
      </div>
      <div className={styles.label}>
        <span className={styles.labelTitle}>{shortBreakLabel}</span>
        <Switch
          onChange={handleChangeShortBreakNotifications}
          aria-label={shortBreakLabel}
          checked={notificationShortBreak}
        />
      </div>
      {getSetting(SettingName.longBreak) && (
        <div className={styles.label}>
          <span className={styles.labelTitle}>{longBreakLabel}</span>
          <Switch
            onChange={handleChangeLongBreakNotifications}
            aria-label={longBreakLabel}
            checked={notificationLongBreak}
          />
        </div>
      )}
    </div>
  );
};
