const ua = navigator.userAgent;

export const isIOS = () =>
  [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes("Mac") && "ontouchend" in document);

export const isMobile = () => /Mobile|Android|iP(hone|od)/.test(ua);
