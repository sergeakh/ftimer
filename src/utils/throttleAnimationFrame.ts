type F = {
  cancel: () => void;
};

export function throttleAnimationFrame<T extends (...args: any) => any>(
  f: T
): T & F {
  let isThrottled = false;
  let savedArgs: any[] | null;
  let savedThis: any;
  let timerId: number;

  function wrap(this: any, ...args: any[]) {
    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    f.call(this, ...args);

    isThrottled = true;

    timerId = requestAnimationFrame(() => {
      isThrottled = false;

      if (savedArgs) {
        wrap.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }) as unknown as number;
  }

  wrap.cancel = () => cancelAnimationFrame(timerId);

  return wrap as T & F;
}
