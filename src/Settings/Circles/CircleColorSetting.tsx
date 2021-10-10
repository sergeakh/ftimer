import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import { SetSetting, GetSetting, ColorSettingName } from "../types";

import { InputColor } from "../../ui/InputColor";

import styles from "../Settings.css";

type CircleColorSettingProps = {
  label: string;
  settingName: ColorSettingName;
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const CircleColorSetting = ({
  label,
  settingName,
  getSetting,
  setSetting,
}: CircleColorSettingProps): JSX.Element => {
  const handleChangeColor = useCallback(
    (value: string) => {
      setSetting(settingName, value);
    },
    [settingName]
  );

  return (
    <div className={styles.label}>
      <span className={styles.labelTitle}>{label}</span>
      <InputColor
        aria-label={label}
        value={getSetting(settingName)}
        onChange={handleChangeColor}
      />
    </div>
  );
};
