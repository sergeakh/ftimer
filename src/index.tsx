import "./configure";

import { JSX, render } from "preact";

import "./main.css";

import { Timer } from "./Timer";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Error app launch");
}

const App = (): JSX.Element => <Timer />;

render(<App />, rootEl);
