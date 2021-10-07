import { JSX } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

import { Timer } from "./Timer";
import { Settings } from "./Settings";
import { useSettingsStorage } from "./Settings/useSettingsStorage";
import { SettingsContext } from "./Settings/context";

import { settingsStorage } from "./api/settingsStorage";
import { Layout } from "./Layout";
import { Menu } from "./Layout/Menu";

import iconCircleSrc from "./assets/icons/circle.svg";
import iconSettingsSrc from "./assets/icons/settings.svg";
import { initNoSleep } from "./utils/noSleep";
import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher/ColorSchemeSwitcher";

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
    useSettingsStorage(settingsStorage);

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
        sidebar={
          <>
            <Menu links={MenuLinks} route={route} currUrl={page} />
            <ColorSchemeSwitcher />
          </>
        }
      >
        <>
          {page === Pages.timer && <Timer />}
          {page === Pages.settings && <Settings />}
        </>
      </Layout>
    </SettingsContext.Provider>
  );
};
