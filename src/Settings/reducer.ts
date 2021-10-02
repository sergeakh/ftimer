import { Settings, SettingName } from "./types";

type Action = { name: SettingName; value: Settings[SettingName] };

export const reducer = (state: Settings, action: Action): Settings => {
  if (Object.values(SettingName).includes(action.name)) {
    return { ...state, [action.name]: action.value };
  }

  return state;
};
