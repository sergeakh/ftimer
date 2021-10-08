import { useSettings } from "../Settings/useSettings";
import { ColorScheme, BaseSettingName } from "../Settings/types";

type Opts = {
  ignoreColorSchemeChoise?: boolean;
};

export const useColorScheme = (
  { ignoreColorSchemeChoise = false }: Opts = { ignoreColorSchemeChoise: false }
): ColorScheme => {
  const { getSetting } = useSettings();

  const colorScheme = getSetting(BaseSettingName.colorScheme);

  if (ignoreColorSchemeChoise === false) {
    if (colorScheme === ColorScheme.Light) {
      return ColorScheme.Light;
    }

    if (colorScheme === ColorScheme.Dark) {
      return ColorScheme.Dark;
    }
  }

  const preferDarkColorScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (preferDarkColorScheme) {
    return ColorScheme.Dark;
  }

  return ColorScheme.Light;
};
