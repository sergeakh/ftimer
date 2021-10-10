import { JSX } from "preact";
import { useCallback, useLayoutEffect } from "preact/hooks";
import cn from "classnames";

import { ColorScheme, SettingName } from "../../Settings/types";

import { useSettings } from "../../Settings/useSettings";
import { useTranslate } from "../../locales/useTranslate";
import { LocaleLabelName } from "../../locales/types";

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
  const t = useTranslate();
  const { getSetting, setSetting } = useSettings();

  const colorScheme = getSetting(SettingName.colorScheme);

  useLayoutEffect(() => {
    setColorScheme(colorSchemes[colorScheme]);
  }, [colorScheme]);

  const handleChange = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const value: ColorScheme = e.currentTarget
        .value as unknown as ColorScheme;

      setColorScheme(colorSchemes[value]);

      setSetting(SettingName.colorScheme, value);
    },
    []
  );

  const lightTitle = t(
    LocaleLabelName.SidebarColorSchemeSwitcherOptionLightTitle
  );
  const darkTitle = t(
    LocaleLabelName.SidebarColorSchemeSwitcherOptionDarkTitle
  );
  const autoTitle = t(
    LocaleLabelName.SidebarColorSchemeSwitcherOptionAutoTitle
  );

  const optionName = `color-scheme-${styles.wrapper}`;

  return (
    <div className={styles.wrapper}>
      <fieldset className={styles.switcher}>
        <legend className="vh">Color Scheme</legend>
        <input
          id={styles.light}
          className={cn(styles.input, "vh")}
          type="radio"
          name={optionName}
          value={ColorScheme.Light}
          checked={colorScheme === ColorScheme.Light}
          onChange={handleChange}
          aria-label={lightTitle}
        />
        <label
          htmlFor={styles.light}
          className={cn(styles.switcherButton, styles.light)}
          title={lightTitle}
          aria-label={lightTitle}
        />
        <input
          id={styles.auto}
          className={cn(styles.input, "vh")}
          type="radio"
          name={optionName}
          value={ColorScheme.Auto}
          checked={colorScheme === ColorScheme.Auto}
          onChange={handleChange}
          aria-label={autoTitle}
        />
        <label
          htmlFor={styles.auto}
          className={cn(styles.switcherButton, styles.auto)}
          title={autoTitle}
          aria-label={autoTitle}
        />
        <input
          id={styles.dark}
          className={cn(styles.input, "vh")}
          type="radio"
          name={optionName}
          value={ColorScheme.Dark}
          checked={colorScheme === ColorScheme.Dark}
          onChange={handleChange}
          aria-label={darkTitle}
        />
        <label
          htmlFor={styles.dark}
          className={cn(styles.switcherButton, styles.dark)}
          title={darkTitle}
          aria-label={darkTitle}
        />
        <div className={styles.wrapSwitcherStatus}>
          <div className={styles.switcherStatus}></div>
        </div>
      </fieldset>
    </div>
  );
};
