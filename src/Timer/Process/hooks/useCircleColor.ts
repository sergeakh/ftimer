import { useCallback } from "preact/hooks";
import { usePropByColorScheme } from "../../../hooks/usePropByColorScheme";
import { useSettings } from "../../../Settings/useSettings";
import { SettingName } from "../../../Settings/types";
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
    (lightSetting: SettingName, darkSetting: SettingName) =>
      getProp(
        getSetting(lightSetting) as string,
        getSetting(darkSetting) as string
      ),
    [getProp]
  );

  const circleColorAdvanced = getSetting(SettingName.colorCircleAdvanced);

  if (circleColorAdvanced) {
    if (timerInterval === ETimerInterval.Focus) {
      return [
        getColor(
          SettingName.colorCircleAdvancedFocusLight,
          SettingName.colorCircleAdvancedFocusDark
        ),
        getColor(
          SettingName.colorCircleAdvancedFocusBackgroundLight,
          SettingName.colorCircleAdvancedFocusBackgroundDark
        ),
      ];
    }

    if (timerInterval === ETimerInterval.ShortBreak) {
      return [
        getColor(
          SettingName.colorCircleAdvancedShortBreakLight,
          SettingName.colorCircleAdvancedShortBreakDark
        ),
        getColor(
          SettingName.colorCircleAdvancedShortBreakBackgroundLight,
          SettingName.colorCircleAdvancedShortBreakBackgroundDark
        ),
      ];
    }

    return [
      getColor(
        SettingName.colorCircleAdvancedLongBreakLight,
        SettingName.colorCircleAdvancedLongBreakDark
      ),
      getColor(
        SettingName.colorCircleAdvancedLongBreakBackgroundLight,
        SettingName.colorCircleAdvancedLongBreakBackgroundDark
      ),
    ];
  }

  return [
    getColor(SettingName.colorCircleLight, SettingName.colorCircleDark),
    getColor(
      SettingName.colorCircleBackgroundLight,
      SettingName.colorCircleBackgroundDark
    ),
  ];
};
