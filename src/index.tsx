/* eslint-disable import/first */
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  require("preact/debug");
}

import { JSX, render } from "preact";

import styles from "./main.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Error app launch");
}

rootEl.classList.add(styles.main);

const App = (): JSX.Element => <h1>FTimer</h1>;

render(<App />, rootEl);
