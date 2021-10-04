import { JSX } from "preact";
import { useCallback, useState } from "preact/hooks";

import { Timer } from "./Timer";
import { Settings, useSettings, SettingsContext } from "./Settings";

import { settingsStorage } from "./api/settingsStorage";
import { Layout, AnimateOpenPage } from "./Layout";
import { Menu } from "./Layout/Menu";

import iconCircleSrc from "./assets/icons/circle.svg";
import iconSettingsSrc from "./assets/icons/settings.svg";

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

  const { isReady: isReadySettings, ...settings } =
    useSettings(settingsStorage);

  const route = useCallback((newPage: string) => {
    setPage(newPage);
  }, []);

  if (!isReadySettings) {
    return <></>;
  }

  return (
    <SettingsContext.Provider value={settings}>
      <Layout page={page} sidebar={<Menu links={MenuLinks} route={route} />}>
        <>
          {page === Pages.timer && (
            <AnimateOpenPage>
              <Timer />
            </AnimateOpenPage>
          )}
          {page === Pages.settings && (
            <AnimateOpenPage>
              <Settings />
            </AnimateOpenPage>
          )}
        </>
      </Layout>
    </SettingsContext.Provider>
  );
};
