const ua = navigator.userAgent;

export const isIOS = (): boolean =>
  [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes("Mac") && "ontouchend" in document);

export const isMobile = (): boolean => /Mobile|Android|iP(hone|od)/.test(ua);

export const isNotification = (): boolean =>
  "Notification" in window && !!navigator.serviceWorker;
export const isNotificationGranted = (): boolean =>
  window?.Notification?.permission === "granted";
