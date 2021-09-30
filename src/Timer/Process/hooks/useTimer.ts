import { useEffect, useState } from "preact/hooks";

import { noop, SEC } from "../../../utils/common";
import { clearWorkerTimeout, setWorkerTimeout } from "../../../utils/timer";

import { Status } from "../types";

const getTimeout = (now: number, endTime: number) =>
  (endTime - now) % SEC || SEC;

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

        timerId = setWorkerTimeout(go, getTimeout(now, endTime));
      } else {
        setTimeLeft(0);
        handleFinish();
      }
    }, SEC);

    return () => {
      const now = Date.now();

      if (now < endTime) {
        setTimeLeft(endTime - Date.now());
      }

      clearWorkerTimeout(timerId);
    };
  }, [status, handleFinish]);

  return timeLeft;
};
