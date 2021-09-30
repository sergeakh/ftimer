import { useEffect, useMemo, useState } from "preact/hooks";

import { throttleAnimationFrame } from "../utils/throttleAnimationFrame";

export const useThrottleAnimationFrameValue = <T>(value: T): T => {
  const [throttledAnimationFrameValue, setThrottledAnimationFrameValue] =
    useState<T>(value);

  const handleTick = useMemo(
    () => throttleAnimationFrame(setThrottledAnimationFrameValue),
    []
  );

  useEffect(
    () => () => {
      handleTick.cancel();
    },
    []
  );

  useEffect(() => {
    handleTick(value);
  }, [value]);

  return throttledAnimationFrameValue;
};
