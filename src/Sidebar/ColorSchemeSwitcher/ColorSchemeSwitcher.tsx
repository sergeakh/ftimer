import { JSX } from "preact";
import { useCallback, useLayoutEffect } from "preact/hooks";
import cn from "classnames";

import { ColorScheme, SettingName } from "../../Settings/types";

import { useSettings } from "../../Settings/useSettings";

import styles from "./ColorSchemeSwitcher.css";
import { useTranslate } from "../../locales/useTranslate";
import { LocaleLabelName } from "../../locales/types";

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

  useLayoutEffect(() => {
    setColorScheme(colorSchemes[getSetting(SettingName.colorScheme)]);
  }, []);

  const handleChange = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const value: ColorScheme = e.currentTarget
        .value as unknown as ColorScheme;

      setColorScheme(colorSchemes[value]);

      setSetting(SettingName.colorScheme, value);
    },
    []
  );

  const colorScheme = getSetting(SettingName.colorScheme);

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
          className={cn(styles.switcherButton, styles.light)}
          type="radio"
          name={optionName}
          value={ColorScheme.Light}
          checked={colorScheme === ColorScheme.Light}
          onChange={handleChange}
          title={lightTitle}
          aria-label={lightTitle}
        />
        <input
          className={cn(styles.switcherButton, styles.auto)}
          type="radio"
          name={optionName}
          value={ColorScheme.Auto}
          checked={colorScheme === ColorScheme.Auto}
          onChange={handleChange}
          title={autoTitle}
          aria-label={autoTitle}
        />
        <input
          className={cn(styles.switcherButton, styles.dark)}
          type="radio"
          name={optionName}
          value={ColorScheme.Dark}
          checked={colorScheme === ColorScheme.Dark}
          onChange={handleChange}
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
