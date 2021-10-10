import { useCallback } from "preact/hooks";
import { usePropByColorScheme } from "../../../hooks/usePropByColorScheme";
import { useSettings } from "../../../Settings/useSettings";
import { SettingName, ColorSettingName } from "../../../Settings/types";
import { ETimerInterval } from "../../types";

type Opts = {
  timerInterval: ETimerInterval;
  ignoreColorSchemeChoise?: boolean;
};

export const useTabCircleColor = ({
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

  const circleColorAdvanced = getSetting(SettingName.colorTabCircleAdvanced);

  if (circleColorAdvanced) {
    if (timerInterval === ETimerInterval.Focus) {
      return [
        getColor(
          SettingName.colorTabCircleAdvancedFocusLight,
          SettingName.colorTabCircleAdvancedFocusDark
        ),
        getColor(
          SettingName.colorTabCircleAdvancedFocusBackgroundLight,
          SettingName.colorTabCircleAdvancedFocusBackgroundDark
        ),
      ];
    }

    if (timerInterval === ETimerInterval.ShortBreak) {
      return [
        getColor(
          SettingName.colorTabCircleAdvancedShortBreakLight,
          SettingName.colorTabCircleAdvancedShortBreakDark
        ),
        getColor(
          SettingName.colorTabCircleAdvancedShortBreakBackgroundLight,
          SettingName.colorTabCircleAdvancedShortBreakBackgroundDark
        ),
      ];
    }

    return [
      getColor(
        SettingName.colorTabCircleAdvancedLongBreakLight,
        SettingName.colorTabCircleAdvancedLongBreakDark
      ),
      getColor(
        SettingName.colorTabCircleAdvancedLongBreakBackgroundLight,
        SettingName.colorTabCircleAdvancedLongBreakBackgroundDark
      ),
    ];
  }

  return [
    getColor(SettingName.colorTabCircleLight, SettingName.colorTabCircleDark),
    getColor(
      SettingName.colorTabCircleBackgroundLight,
      SettingName.colorTabCircleBackgroundDark
    ),
  ];
};
