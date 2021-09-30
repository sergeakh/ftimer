import { JSX } from "preact";
import Router, { route, RouterProps } from "preact-router";
import { useCallback } from "preact/hooks";

import styles from "./App.css";

import { Timer } from "./Timer";
import { Setting } from "./Setting";

const paths = {
  root: "/",
  setting: "/setting",
};

export const App = (): JSX.Element => {
  const handleChange = useCallback(({ url }: RouterProps) => {
    if (!Object.values(paths).includes(url || "")) route("/");
  }, []);

  return (
    <div class={styles.app}>
      <Router onChange={handleChange}>
        <Timer path={paths.root} />
        <Setting path={paths.setting} />
      </Router>
    </div>
  );
};
