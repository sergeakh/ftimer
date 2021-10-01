type GetSetting = <T>(
  name: string,
  opts?: { signal?: AbortSignal }
) => Promise<T>;

type SetSetting = <T>(
  name: string,
  value: T,
  opts?: { signal?: AbortSignal }
) => Promise<void>;

export interface SettingsStorage {
  getSetting: GetSetting;
  setSetting: SetSetting;
}
