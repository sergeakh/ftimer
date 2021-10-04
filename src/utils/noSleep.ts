const nativeWakeLock = () => "wakeLock" in navigator;

interface INoSleep {
  get isEnabled(): boolean;

  enable(): Promise<void>;

  disable(): void;
}

class NativeNoSleep implements INoSleep {
  private enabled: boolean;

  private wakeLock: null | WakeLockSentinel;

  constructor() {
    this.enabled = false;
    this.wakeLock = null;

    const handleVisibilityChange = () => {
      if (this.wakeLock !== null && document.visibilityState === "visible") {
        this.enable();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleVisibilityChange);
  }

  get isEnabled() {
    return this.enabled;
  }

  enable() {
    return navigator.wakeLock
      .request("screen")
      .then((wakeLock) => {
        this.wakeLock = wakeLock;
        this.enabled = true;
        this.wakeLock.addEventListener("release", () => {
          // ToDo: Potentially emit an event for the page to observe since
          // Wake Lock releases happen when page visibility changes.
          // (https://web.dev/wakelock/#wake-lock-lifecycle)
          console.log("Wake Lock released.");
        });
      })
      .catch((err) => {
        this.enabled = false;
        console.error(`${err.name}, ${err.message}`);
        throw err;
      });
  }

  disable() {
    if (this.wakeLock) {
      this.wakeLock.release();
    }
    this.wakeLock = null;
    this.enabled = false;
  }
}

let noSleep: INoSleep = new NativeNoSleep();

export const initNoSleep = async (): Promise<void> => {
  if (!nativeWakeLock()) {
    import("nosleep.js")
      .then((module) => {
        const NoSleep = module.default;
        noSleep = new NoSleep();
      })
      .catch((err) => {
        console.error(`${err.name}, ${err.message}`);
        throw err;
      });
  }
};

export const getNoSleep = (): INoSleep => noSleep;
