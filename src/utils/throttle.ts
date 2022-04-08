type F = {
  cancel: () => void;
};

export function throttle<T extends (...args: any) => any>(
  f: T,
  ms: number
): T & F {
  let isThrottled = false;
  let savedArgs: any[] | null;
  let savedThis: any;
  let timerId: number;

  function wrap(this: any, ...args: any[]) {
    if (isThrottled) {
      savedArgs = args;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      savedThis = this;
      return;
    }

    f.call(this, ...args);

    isThrottled = true;

    timerId = setTimeout(() => {
      isThrottled = false;

      if (savedArgs) {
        wrap.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }, ms) as unknown as number;
  }

  wrap.cancel = () => clearTimeout(timerId);

  return wrap as T & F;
}
