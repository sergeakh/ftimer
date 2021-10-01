import { useCallback, useEffect, useState } from "preact/hooks";

import { noop } from "../utils/common";

import { SettingsStorage } from "../intrefaces/SettingStorage";

import {
  DEFAULT_FOCUS_DURATION,
  DEFAULT_SHORT_BREAK_DURATION,
  DEFAULT_LONG_BREAK_DURATION,
  DEFAULT_LONG_BREAK_EVERY,
} from "../constants/common";
import { Settings } from "../contexts/settings";

export const enum SettingName {
  FocusDuration = "focusDur",
  ShortBreakDuration = "shortBreakDur",
  LongBreakDuration = "longBreakDur",
  LongBreakEvery = "longBreakEvery",
}

export const getSetting = <T>(
  name: SettingName,
  setState: (value: T) => void,
  settingsStorage: SettingsStorage,
  signal: AbortSignal
): Promise<void> =>
  settingsStorage
    .getSetting<T>(name, { signal })
    .then((savedValue) => setState(savedValue));

export const useSettings = (settingsStorage: SettingsStorage): Settings => {
  const [isReady, setIsReady] = useState(false);
  const [focusDuration, setLocalFocusDuration] = useState(
    DEFAULT_FOCUS_DURATION
  );
  const [shortBreakDuration, setLocalShortBreakDuration] = useState(
    DEFAULT_SHORT_BREAK_DURATION
  );
  const [longBreakDuration, setLocalLongBreakDuration] = useState(
    DEFAULT_LONG_BREAK_DURATION
  );
  const [longBreakEvery, setLocalLongBreakEvery] = useState(
    DEFAULT_LONG_BREAK_EVERY
  );

  useEffect(() => {
    if (isReady) return noop;

    const abortController = new AbortController();

    const reqFocusDur = getSetting<number>(
      SettingName.FocusDuration,
      setLocalFocusDuration,
      settingsStorage,
      abortController.signal
    );

    const reqShortBreakDur = getSetting<number>(
      SettingName.ShortBreakDuration,
      setLocalShortBreakDuration,
      settingsStorage,
      abortController.signal
    );

    const reqLongBreakDur = getSetting<number>(
      SettingName.LongBreakDuration,
      setLocalLongBreakDuration,
      settingsStorage,
      abortController.signal
    );

    const reqLongBreakEvery = getSetting<number>(
      SettingName.LongBreakEvery,
      setLocalLongBreakEvery,
      settingsStorage,
      abortController.signal
    );

    Promise.all([
      reqFocusDur,
      reqShortBreakDur,
      reqLongBreakDur,
      reqLongBreakEvery,
    ])
      .then(() => {
        setIsReady(true);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;

        setIsReady(true);
      });

    return () => {
      abortController.abort();
    };
  }, [isReady]);

  const setFocusDuration = useCallback((newFocusDuration: number) => {
    setLocalFocusDuration(newFocusDuration);

    settingsStorage.setSetting(SettingName.FocusDuration, newFocusDuration);
  }, []);

  const setShortBreakDuration = useCallback((newShortBreakDuration: number) => {
    setLocalShortBreakDuration(newShortBreakDuration);

    settingsStorage.setSetting(
      SettingName.ShortBreakDuration,
      newShortBreakDuration
    );
  }, []);

  const setLongBreakDuration = useCallback((newLongBreakDuration: number) => {
    setLocalLongBreakDuration(newLongBreakDuration);

    settingsStorage.setSetting(
      SettingName.LongBreakDuration,
      newLongBreakDuration
    );
  }, []);

  const setLongBreakEvery = useCallback((newLongBreakEvery: number) => {
    setLocalLongBreakEvery(newLongBreakEvery);

    settingsStorage.setSetting(SettingName.LongBreakEvery, newLongBreakEvery);
  }, []);

  return {
    isReady,
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakEvery,
    setFocusDuration,
    setShortBreakDuration,
    setLongBreakDuration,
    setLongBreakEvery,
  };
};
