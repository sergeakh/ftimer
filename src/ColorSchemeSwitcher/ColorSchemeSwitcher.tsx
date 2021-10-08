import { JSX } from "preact";
import cn from "classnames";

import { useCallback, useLayoutEffect } from "preact/hooks";

import { ColorScheme, BaseSettingName } from "../Settings/types";

import { useSettings } from "../Settings/useSettings";

import styles from "./ColorSchemeSwitcher.css";

const html = document.documentElement;

const colorSchemes = {
  [ColorScheme.Auto]: "",
  [ColorScheme.Light]: "light",
  [ColorScheme.Dark]: "dark",
};

const setColorScheme = (colorScheme: string) => {
  html.dataset.colorScheme = colorScheme;
};

export const ColorSchemeSwitcher = (): JSX.Element => {
  const { getSetting, setSetting } = useSettings();

  useLayoutEffect(() => {
    setColorScheme(colorSchemes[getSetting(BaseSettingName.colorScheme)]);
  }, []);

  const handleChange = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const value: ColorScheme = e.currentTarget.value as ColorScheme;

      setColorScheme(colorSchemes[value]);

      setSetting(BaseSettingName.colorScheme, value);
    },
    []
  );

  const colorScheme = getSetting(BaseSettingName.colorScheme);

  return (
    <div className={styles.wrapper}>
      <fieldset className={styles.switcher}>
        <legend className="vh">Color Scheme</legend>
        <input
          className={cn(styles.switcherButton, styles.light)}
          type="radio"
          name="color-scheme"
          value={ColorScheme.Light}
          checked={colorScheme === ColorScheme.Light}
          onChange={handleChange}
          title="Light"
          aria-label="Light"
        />
        <input
          className={cn(styles.switcherButton, styles.auto)}
          type="radio"
          name="color-scheme"
          value={ColorScheme.Auto}
          checked={colorScheme === ColorScheme.Auto}
          onChange={handleChange}
          title="Auto"
          aria-label="Auto"
        />
        <input
          className={cn(styles.switcherButton, styles.dark)}
          type="radio"
          name="color-scheme"
          value={ColorScheme.Dark}
          checked={colorScheme === ColorScheme.Dark}
          onChange={handleChange}
          title="Dark"
          aria-label="Dark"
        />
        <div className={styles.wrapSwitcherStatus}>
          <div className={styles.switcherStatus}></div>
        </div>
      </fieldset>
    </div>
  );
};
