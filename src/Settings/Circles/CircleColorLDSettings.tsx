import { JSX } from "preact";

import {
  SetSetting,
  GetSetting,
  ColorScheme,
  ColorSettingName,
} from "../types";

import { CircleColorSettings } from "./CircleColorSettings";

type CircleColorLDSettingsProps = {
  colorScheme: ColorScheme;
  mainSettingNameLight: ColorSettingName;
  mainSettingNameDark: ColorSettingName;
  backgroundSettingNameLight: ColorSettingName;
  backgroundSettingNameDark: ColorSettingName;
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const CircleColorLDSettings = ({
  colorScheme,
  mainSettingNameLight,
  mainSettingNameDark,
  backgroundSettingNameLight,
  backgroundSettingNameDark,
  ...props
}: CircleColorLDSettingsProps): JSX.Element =>
  colorScheme === ColorScheme.Light ? (
    <>
      <CircleColorSettings
        mainSettingName={mainSettingNameLight}
        backgroundSettingName={backgroundSettingNameLight}
        {...props}
      />
    </>
  ) : (
    <>
      <CircleColorSettings
        mainSettingName={mainSettingNameDark}
        backgroundSettingName={backgroundSettingNameDark}
        {...props}
      />
    </>
  );
