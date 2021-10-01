import { SettingsStorage } from "../intrefaces/SettingStorage";

const PREFIX_STORE_NAME = "settings";

const getFullName = (name: string) => `${PREFIX_STORE_NAME}.${name}`;

const getSetting = <T>(
  name: string,
  opts?: { signal?: AbortSignal }
): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    try {
      const setting = JSON.parse(localStorage.getItem(getFullName(name)) || "");
      resolve(setting);
    } catch (e) {
      reject(e);
    }
  }).then((value) => {
    if (opts?.signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    return Promise.resolve(value);
  });

const setSetting = <T>(
  name: string,
  value: T,
  opts?: { signal?: AbortSignal }
): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    try {
      localStorage.setItem(getFullName(name), JSON.stringify(value));
      resolve();
    } catch (e) {
      reject(e);
    }
  }).then(() => {
    if (opts?.signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
  });

export const settingsStorage: SettingsStorage = {
  getSetting,
  setSetting,
};
