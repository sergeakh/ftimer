import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import { Select } from "../ui/Select";

import { SettingName, LocaleName, SetSetting, GetSetting } from "./types";
import { useTranslate } from "../locales/useTranslate";
import { LocaleLabelName } from "../locales/types";

import { langs } from "./constants";

import styles from "./Settings.css";

const langOptions = [
  { title: langs[LocaleName.RU], value: LocaleName.RU },
  { title: langs[LocaleName.EN], value: LocaleName.EN },
];

type Props = {
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const Language = ({ setSetting, getSetting }: Props): JSX.Element => {
  const t = useTranslate();

  const handleChangeLang = useCallback((value: string) => {
    setSetting(SettingName.locale, value as LocaleName);
  }, []);

  const label = t(LocaleLabelName.SettingsLanguageLabel);

  return (
    <div className={styles.label}>
      <span className={styles.labelTitle}>{label}</span>
      <Select
        onChange={handleChangeLang}
        value={getSetting(SettingName.locale)}
        options={langOptions}
      />
    </div>
  );
};
