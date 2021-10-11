import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import { Select } from "../ui/Select";

import { SettingName, SoundName, SetSetting, GetSetting } from "./types";
import { useTranslate } from "../locales/useTranslate";
import { LocaleLabelName } from "../locales/types";

import { sounds } from "./constants";

import styles from "./Settings.css";

const playSound = (src: string, volume = 50) => {
  const audio = new Audio(src);
  audio.volume = volume / 100;
  audio.play();
};

const options = [
  { title: SoundName.S0, value: SoundName.S0 },
  { title: SoundName.S1, value: SoundName.S1 },
  { title: SoundName.S2, value: SoundName.S2 },
];

type Props = {
  setSetting: SetSetting;
  getSetting: GetSetting;
};

export const Sounds = ({ setSetting, getSetting }: Props): JSX.Element => {
  const t = useTranslate();

  const handleChangeSound = useCallback(
    (value: string) => {
      const newValue = value as SoundName;
      playSound(sounds[newValue], getSetting(SettingName.soundVolume));
      setSetting(SettingName.soundName, newValue);
    },
    [getSetting]
  );

  const handleChangeVolume = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = +e.currentTarget.value;
      setSetting(SettingName.soundVolume, newValue);
    },
    []
  );

  return (
    <div>
      <h3 className={styles.subTitle}>{t(LocaleLabelName.SettingsSounds)}</h3>
      <div className={styles.label}>
        <span className={styles.labelTitle}>
          {t(LocaleLabelName.SettingsSoundLabel)}
        </span>
        <Select
          onChange={handleChangeSound}
          value={getSetting(SettingName.soundName)}
          options={options}
        />
      </div>
      <div className={styles.label}>
        <span className={styles.labelTitle}>
          {t(LocaleLabelName.SettingsSoundVolumeLabel)}
        </span>
        <input
          type="range"
          min="0"
          max="100"
          onChange={handleChangeVolume}
          value={getSetting(SettingName.soundVolume)}
        />
      </div>
    </div>
  );
};
