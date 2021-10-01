import { JSX } from "preact";
import Router, { route, RouterProps } from "preact-router";
import { useCallback } from "preact/hooks";

import styles from "./App.css";

import { Timer } from "./Timer";
import { Settings } from "./Settings";
import { PATHS } from "./constants";

import { settingsStorage } from "./api/settingsStorage";
import { useSettings } from "./hooks/useSettings";
import { SettingsContext } from "./contexts/settings";

export const App = (): JSX.Element => {
  const settings = useSettings(settingsStorage);

  const handleChange = useCallback(({ url }: RouterProps) => {
    if (!Object.values(PATHS).includes(url || "")) route("/");
  }, []);

  if (!settings.isReady) {
    return <></>;
  }

  return (
    <div class={styles.app}>
      <SettingsContext.Provider value={settings}>
        <Router onChange={handleChange}>
          <Timer path={PATHS.root} />
          <Settings path={PATHS.settings} />
        </Router>
      </SettingsContext.Provider>
    </div>
  );
};
