import { useState } from "preact/hooks";

import { ETimerInterval } from "../types";

export const useTimerInterval = (): [
  ETimerInterval,
  (newInterval: ETimerInterval) => void
] => {
  const [interval, setInterval] = useState<ETimerInterval>(
    ETimerInterval.Focus
  );

  return [interval, setInterval];
};
