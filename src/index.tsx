import "./configure";

import { JSX, render } from "preact";

import styles from "./main.css";

import { Timer } from "./Timer";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Error app launch");
}

rootEl.classList.add(styles.main);

const App = (): JSX.Element => <Timer />;

render(<App />, rootEl);
