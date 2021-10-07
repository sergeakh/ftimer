import { useCallback, useContext } from "preact/hooks";
import { SettingsContext } from "./context";
import { GetSetting, SetSetting } from "./types";

type UseSettingsResult = {
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const useSettings = (): UseSettingsResult => {
  const { settings, setSetting } = useContext(SettingsContext);

  const getSetting: GetSetting = useCallback(
    (settingName) => settings[settingName],
    [settings]
  );

  return {
    setSetting,
    getSetting,
  };
};
