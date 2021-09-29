import { useEffect, useState } from "preact/hooks";

import { noop } from "../../utils/common";
import { clearWorkerTimeout, setWorkerTimeout } from "../../utils/timer";

const UPDATE_TIMEOUT = 1000 / 60;

export const enum Status {
  Start,
  Run,
  Pause,
}

/**
 *
 * @param status
 * @param timeout - ms
 * @param handleFinish
 * @return {timeLeft} - ms
 */
export const useTimer = (
  status: Status,
  timeout: number,
  handleFinish: () => void
): number => {
  const [timeLeft, setTimeLeft] = useState(timeout);

  useEffect(() => {
    if (status !== Status.Start) return;

    setTimeLeft(timeout);
  }, [status, timeout]);

  useEffect(() => {
    if (status !== Status.Run) return noop;

    const endTime = Date.now() + timeLeft;

    let timerId = setWorkerTimeout(function go() {
      const now = Date.now();

      if (now < endTime) {
        setTimeLeft(endTime - now);

        timerId = setWorkerTimeout(go, UPDATE_TIMEOUT);
      } else {
        setTimeLeft(0);
        handleFinish();
      }
    }, UPDATE_TIMEOUT);

    return () => {
      clearWorkerTimeout(timerId);
    };
  }, [status, handleFinish]);

  return timeLeft;
};
