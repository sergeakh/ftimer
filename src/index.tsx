import "./configure";
import "./main.css";

import { render } from "preact";

import { App } from "./App";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Error app launch");
}

render(<App />, rootEl);
