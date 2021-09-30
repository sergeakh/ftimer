import { useEffect, useMemo, useState } from "preact/hooks";

import { throttle } from "../utils/throttle";

export const useThrottleValue = <T>(value: T, ms: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  const handleTick = useMemo(() => throttle(setThrottledValue, ms), []);

  useEffect(
    () => () => {
      handleTick.cancel();
    },
    []
  );

  useEffect(() => {
    handleTick(value);
  }, [value]);

  return throttledValue;
};
