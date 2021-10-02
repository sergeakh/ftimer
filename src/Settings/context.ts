import { createContext } from "preact";

import { noop } from "../utils/common";

import { SetSetting, Settings } from "./types";
import { defaultSettings } from "./constants";

export type ISettingsContext = {
  settings: Settings;
  setSetting: SetSetting;
};

export const SettingsContext = createContext<ISettingsContext>({
  settings: defaultSettings,
  setSetting: noop,
});
