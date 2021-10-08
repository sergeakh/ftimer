import { useCallback } from "preact/hooks";
import { usePropByColorScheme } from "../../../hooks/usePropByColorScheme";
import { useSettings } from "../../../Settings/useSettings";
import { ColorSettingName, BaseSettingName } from "../../../Settings/types";
import { ETimerInterval } from "../../types";

type Opts = {
  timerInterval: ETimerInterval;
  ignoreColorSchemeChoise?: boolean;
};

export const useCircleColor = ({
  timerInterval,
  ignoreColorSchemeChoise = false,
}: Opts): [string, string] => {
  const { getSetting } = useSettings();

  const { getProp } = usePropByColorScheme({
    ignoreColorSchemeChoise,
  });

  const getColor = useCallback(
    (lightSetting: ColorSettingName, darkSetting: ColorSettingName) =>
      getProp(getSetting(lightSetting), getSetting(darkSetting)),
    [getProp]
  );

  const circleColorAdvanced = getSetting(BaseSettingName.colorCircleAdvanced);

  if (circleColorAdvanced) {
    if (timerInterval === ETimerInterval.Focus) {
      return [
        getColor(
          ColorSettingName.colorCircleAdvancedFocusLight,
          ColorSettingName.colorCircleAdvancedFocusDark
        ),
        getColor(
          ColorSettingName.colorCircleAdvancedFocusBackgroundLight,
          ColorSettingName.colorCircleAdvancedFocusBackgroundDark
        ),
      ];
    }

    if (timerInterval === ETimerInterval.ShortBreak) {
      return [
        getColor(
          ColorSettingName.colorCircleAdvancedShortBreakLight,
          ColorSettingName.colorCircleAdvancedShortBreakDark
        ),
        getColor(
          ColorSettingName.colorCircleAdvancedShortBreakBackgroundLight,
          ColorSettingName.colorCircleAdvancedShortBreakBackgroundDark
        ),
      ];
    }

    return [
      getColor(
        ColorSettingName.colorCircleAdvancedLongBreakLight,
        ColorSettingName.colorCircleAdvancedLongBreakDark
      ),
      getColor(
        ColorSettingName.colorCircleAdvancedLongBreakBackgroundLight,
        ColorSettingName.colorCircleAdvancedLongBreakBackgroundDark
      ),
    ];
  }

  return [
    getColor(
      ColorSettingName.colorCircleLight,
      ColorSettingName.colorCircleDark
    ),
    getColor(
      ColorSettingName.colorCircleBackgroundLight,
      ColorSettingName.colorCircleBackgroundDark
    ),
  ];
};
