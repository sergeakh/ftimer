/* eslint-disable import/first */
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  require("preact/debug");
}

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

export {};
