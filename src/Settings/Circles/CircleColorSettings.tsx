import { JSX } from "preact";

import { SetSetting, GetSetting, ColorSettingName } from "../types";

import { CircelDemo } from "./CircleDemo";
import { CircleColorSetting } from "./CircleColorSetting";

import { useTranslate } from "../../locales/useTranslate";
import { LocaleLabelName } from "../../locales/types";

type CircleColorSettingsProps = {
  mainSettingName: ColorSettingName;
  backgroundSettingName: ColorSettingName;
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const CircleColorSettings = ({
  mainSettingName,
  backgroundSettingName,
  getSetting,
  setSetting,
}: CircleColorSettingsProps): JSX.Element => {
  const t = useTranslate();

  return (
    <>
      <CircelDemo
        colorCircle={getSetting(mainSettingName)}
        colorBackgoundCircle={getSetting(backgroundSettingName)}
      />
      <CircleColorSetting
        label={t(LocaleLabelName.SettingsCircleColorsMainLabel)}
        settingName={mainSettingName}
        getSetting={getSetting}
        setSetting={setSetting}
      />
      <CircleColorSetting
        label={t(LocaleLabelName.SettingsCircleColorsBackgroundLabel)}
        settingName={backgroundSettingName}
        getSetting={getSetting}
        setSetting={setSetting}
      />
    </>
  );
};
