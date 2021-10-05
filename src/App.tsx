import { JSX } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

import { Timer } from "./Timer";
import { Settings, useSettings, SettingsContext } from "./Settings";

import { settingsStorage } from "./api/settingsStorage";
import { Layout } from "./Layout";
import { Menu } from "./Layout/Menu";

import iconCircleSrc from "./assets/icons/circle.svg";
import iconSettingsSrc from "./assets/icons/settings.svg";
import { initNoSleep } from "./utils/noSleep";

const Pages = {
  timer: "Timer",
  settings: "Settings",
};

const MenuLinks = [
  {
    title: Pages.timer,
    url: Pages.timer,
    iconSrc: iconCircleSrc,
  },
  {
    title: Pages.settings,
    url: Pages.settings,
    iconSrc: iconSettingsSrc,
  },
];

export const App = (): JSX.Element => {
  const [page, setPage] = useState(Pages.timer);
  const [isDepsLoading, setIsDepsLoading] = useState(true);

  const { isReady: isReadySettings, ...settings } =
    useSettings(settingsStorage);

  const route = useCallback((newPage: string) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    Promise.all([initNoSleep()]).then(() => {
      setIsDepsLoading(false);
    });
  }, []);

  if (!isReadySettings || isDepsLoading) {
    return <></>;
  }

  return (
    <SettingsContext.Provider value={settings}>
      <Layout
        page={page}
        sidebar={<Menu links={MenuLinks} route={route} currUrl={page} />}
      >
        <>
          {page === Pages.timer && <Timer />}
          {page === Pages.settings && <Settings />}
        </>
      </Layout>
    </SettingsContext.Provider>
  );
};
