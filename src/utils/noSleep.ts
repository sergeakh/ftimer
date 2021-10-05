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

let noSleep: INoSleep;

export const initNoSleep = async (): Promise<void> => {
  if (nativeWakeLock()) {
    noSleep = new NativeNoSleep();
    return;
  }

  try {
    const module = await import("nosleep.js");
    const NoSleep = module.default;
    noSleep = new NoSleep();
  } catch (err: any) {
    console.error(`${err.name}, ${err.message}`);
    throw err;
  }
};

export const getNoSleep = (): INoSleep => noSleep;
