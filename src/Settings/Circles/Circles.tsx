import { JSX } from "preact";

import { useCallback } from "preact/hooks";
import { SetSetting, GetSetting, SettingName } from "../types";

import { Switch } from "../../ui/Switch/Switch";
import { useTranslate } from "../../locales/useTranslate";
import { LocaleLabelName } from "../../locales/types";
import { usePropByColorScheme } from "../../hooks/usePropByColorScheme";

import { CommonCircleColors } from "./CommonCircleColors";

import { isMobile } from "../../utils/browser";

import styles from "../Settings.css";

type Props = {
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const Circles = ({ setSetting, getSetting }: Props): JSX.Element => {
  const t = useTranslate();
  const { getProp } = usePropByColorScheme({});

  const tabCircle = getSetting(SettingName.tabCircle);

  const handleChangeTabCircle = useCallback((value: boolean) => {
    setSetting(SettingName.tabCircle, value);
  }, []);

  const titleCircle = `${t(LocaleLabelName.SettingsCircleTitle)} (${getProp(
    t(LocaleLabelName.SidebarColorSchemeSwitcherOptionLightTitle),
    t(LocaleLabelName.SidebarColorSchemeSwitcherOptionDarkTitle)
  )})`;

  const titleTabCircle = t(LocaleLabelName.SettingsTabCircleTitle);

  const titleTabCircleLD = `${titleTabCircle} (${getProp(
    t(LocaleLabelName.SidebarColorSchemeSwitcherOptionLightTitle),
    t(LocaleLabelName.SidebarColorSchemeSwitcherOptionDarkTitle)
  )})`;

  return (
    <>
      <h3 className={styles.subTitle}>{titleCircle}</h3>
      <CommonCircleColors
        colorCircleAdvanced={SettingName.colorCircleAdvanced}
        colorCircleLight={SettingName.colorCircleLight}
        colorCircleBackgroundLight={SettingName.colorCircleBackgroundLight}
        colorCircleDark={SettingName.colorCircleDark}
        colorCircleBackgroundDark={SettingName.colorCircleBackgroundDark}
        colorCircleAdvancedFocusLight={
          SettingName.colorCircleAdvancedFocusLight
        }
        colorCircleAdvancedFocusBackgroundLight={
          SettingName.colorCircleAdvancedFocusBackgroundLight
        }
        colorCircleAdvancedShortBreakLight={
          SettingName.colorCircleAdvancedShortBreakLight
        }
        colorCircleAdvancedShortBreakBackgroundLight={
          SettingName.colorCircleAdvancedShortBreakBackgroundLight
        }
        colorCircleAdvancedLongBreakLight={
          SettingName.colorCircleAdvancedLongBreakLight
        }
        colorCircleAdvancedLongBreakBackgroundLight={
          SettingName.colorCircleAdvancedLongBreakBackgroundLight
        }
        colorCircleAdvancedFocusDark={SettingName.colorCircleAdvancedFocusDark}
        colorCircleAdvancedFocusBackgroundDark={
          SettingName.colorCircleAdvancedFocusBackgroundDark
        }
        colorCircleAdvancedShortBreakDark={
          SettingName.colorCircleAdvancedShortBreakDark
        }
        colorCircleAdvancedShortBreakBackgroundDark={
          SettingName.colorCircleAdvancedShortBreakBackgroundDark
        }
        colorCircleAdvancedLongBreakDark={
          SettingName.colorCircleAdvancedLongBreakDark
        }
        colorCircleAdvancedLongBreakBackgroundDark={
          SettingName.colorCircleAdvancedLongBreakBackgroundDark
        }
        setSetting={setSetting}
        getSetting={getSetting}
      />
      {!isMobile() && (
        <>
          <h3 className={styles.subTitle}>{titleTabCircleLD}</h3>
          <div className={styles.label}>
            <span className={styles.labelTitle}>{titleTabCircle}</span>
            <Switch
              onChange={handleChangeTabCircle}
              aria-label={titleTabCircle}
              checked={tabCircle}
            />
          </div>
          {tabCircle && (
            <CommonCircleColors
              colorCircleAdvanced={SettingName.colorTabCircleAdvanced}
              colorCircleLight={SettingName.colorTabCircleLight}
              colorCircleBackgroundLight={
                SettingName.colorTabCircleBackgroundLight
              }
              colorCircleDark={SettingName.colorTabCircleDark}
              colorCircleBackgroundDark={
                SettingName.colorTabCircleBackgroundDark
              }
              colorCircleAdvancedFocusLight={
                SettingName.colorTabCircleAdvancedFocusLight
              }
              colorCircleAdvancedFocusBackgroundLight={
                SettingName.colorTabCircleAdvancedFocusBackgroundLight
              }
              colorCircleAdvancedShortBreakLight={
                SettingName.colorTabCircleAdvancedShortBreakLight
              }
              colorCircleAdvancedShortBreakBackgroundLight={
                SettingName.colorTabCircleAdvancedShortBreakBackgroundLight
              }
              colorCircleAdvancedLongBreakLight={
                SettingName.colorTabCircleAdvancedLongBreakLight
              }
              colorCircleAdvancedLongBreakBackgroundLight={
                SettingName.colorTabCircleAdvancedLongBreakBackgroundLight
              }
              colorCircleAdvancedFocusDark={
                SettingName.colorTabCircleAdvancedFocusDark
              }
              colorCircleAdvancedFocusBackgroundDark={
                SettingName.colorTabCircleAdvancedFocusBackgroundDark
              }
              colorCircleAdvancedShortBreakDark={
                SettingName.colorTabCircleAdvancedShortBreakDark
              }
              colorCircleAdvancedShortBreakBackgroundDark={
                SettingName.colorTabCircleAdvancedShortBreakBackgroundDark
              }
              colorCircleAdvancedLongBreakDark={
                SettingName.colorTabCircleAdvancedLongBreakDark
              }
              colorCircleAdvancedLongBreakBackgroundDark={
                SettingName.colorTabCircleAdvancedLongBreakBackgroundDark
              }
              setSetting={setSetting}
              getSetting={getSetting}
            />
          )}
        </>
      )}
    </>
  );
};
