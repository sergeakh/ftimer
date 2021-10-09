import { JSX } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

import { Timer } from "./Timer";
import { Settings } from "./Settings";
import { useSettingsStorage } from "./Settings/useSettingsStorage";
import { SettingsContext } from "./Settings/context";

import { settingsStorage } from "./api/settingsStorage";
import { Layout } from "./Layout";
import { initNoSleep } from "./utils/noSleep";
import { useLoadLocale } from "./locales/useLoadLocale";
import { LocaleContext } from "./locales/context";
import { SettingName } from "./Settings/types";
import { Sidebar } from "./Sidebar";

import { pages } from "./constants";

export const App = (): JSX.Element => {
  const [page, setPage] = useState(pages.timer);
  const [isDepsLoading, setIsDepsLoading] = useState(true);

  const { isReady: isReadySettings, ...settingsContextValue } =
    useSettingsStorage(settingsStorage);

  const route = useCallback((newPage: string) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    Promise.all([initNoSleep()]).then(() => {
      setIsDepsLoading(false);
    });
  }, []);

  const locale = useLoadLocale(
    isReadySettings,
    settingsContextValue.settings[SettingName.locale]
  );
  if (!isReadySettings || isDepsLoading || !locale.isReady) {
    return <></>;
  }

  return (
    <SettingsContext.Provider value={settingsContextValue}>
      <LocaleContext.Provider value={locale.localeLabels}>
        <Layout page={page} sidebar={<Sidebar page={page} route={route} />}>
          <>
            {page === pages.timer && <Timer />}
            {page === pages.settings && <Settings />}
          </>
        </Layout>
      </LocaleContext.Provider>
    </SettingsContext.Provider>
  );
};
