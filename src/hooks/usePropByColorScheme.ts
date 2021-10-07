import { useCallback } from "preact/hooks";
import { ColorScheme } from "../Settings/types";
import { useColorScheme } from "./useColorScheme";

type Props = {
  ignoreColorSchemeChoise?: boolean;
};

type UsePropByColorSchemeResult = {
  getProp: (light: string, dark: string) => string;
};

export const usePropByColorScheme = ({
  ignoreColorSchemeChoise = false,
}: Props): UsePropByColorSchemeResult => {
  const colorScheme = useColorScheme({ ignoreColorSchemeChoise });

  const getProp = useCallback(
    (light: string, dark: string) => {
      if (colorScheme === ColorScheme.Dark) return dark;

      return light;
    },
    [colorScheme]
  );

  return { getProp };
};
