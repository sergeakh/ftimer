import { useCallback, useEffect, useReducer, useState } from "preact/hooks";

import { noop } from "../utils/common";
import { SettingsStorage } from "../interfaces/SettingsStorage";

import { SettingName, SetSetting, Settings } from "./types";

import { defaultSettings } from "./constants";
import { ISettingsContext } from "./context";

type Action = { name: SettingName; value: Settings[SettingName] };

export const reducer = (state: Settings, action: Action): Settings => {
  if (Object.values(SettingName).includes(action.name)) {
    return { ...state, [action.name]: action.value };
  }

  return state;
};

function enumKeys<
  O extends Record<string, unknown>,
  K extends keyof O = keyof O
>(obj: O): K[] {
  return Object.keys(obj) as K[];
}

export const getSetting = <T extends SettingName>(
  name: T,
  setState: (value: Settings[T]) => void,
  settingsStorage: SettingsStorage,
  signal: AbortSignal
): Promise<void> =>
  settingsStorage
    .getSetting<Settings[T]>(name, { signal })
    .then((savedValue) => setState(savedValue));

type UseSettingsResult = ISettingsContext & {
  isReady: boolean;
};

export const useSettings = (
  settingsStorage: SettingsStorage
): UseSettingsResult => {
  const [isReady, setIsReady] = useState(false);
  const [settings, dispatch] = useReducer(reducer, defaultSettings);

  const setSetting: SetSetting = useCallback((name, value) => {
    dispatch({ name, value });

    settingsStorage.setSetting(name, value);
  }, []);

  useEffect(() => {
    if (isReady) return noop;

    const abortController = new AbortController();

    const requests = enumKeys(SettingName).map((name) =>
      getSetting<SettingName>(
        SettingName[name],
        (newValue) => dispatch({ name: SettingName[name], value: newValue }),
        settingsStorage,
        abortController.signal
      )
    );

    Promise.allSettled(requests)
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

  return {
    isReady,
    settings,
    setSetting,
  };
};
