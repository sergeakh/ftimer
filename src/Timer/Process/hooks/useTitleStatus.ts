import { useEffect } from "preact/hooks";
import { isMobile } from "../../../utils/browser";

import { formatTime, normalizeTime } from "../../../utils/common";
import { ETimerInterval } from "../../types";

import {
  useIntervalName,
  Status as IntervalNameStatus,
} from "./useTimerIntervalName";

const DEFAULT_TITLE = document.title;

export const enum Status {
  Start,
  Run,
  Pause,
}

const intervalNameStatuses = {
  [Status.Start]: IntervalNameStatus.Run,
  [Status.Run]: IntervalNameStatus.Run,
  [Status.Pause]: IntervalNameStatus.Pause,
};

export const setTitle = (title: string): void => {
  document.title = title;
};

export const getFirstPartTitle = (status: Status, timeLeft: number): string => {
  if (status === Status.Start) return "";

  return `${formatTime(normalizeTime(timeLeft))} `;
};

const getSecondPartTitle = (status: Status, timerIntervalName: string) => {
  if (status === Status.Start) return DEFAULT_TITLE;

  return ` - ${timerIntervalName}`;
};

export const useTitleStatus = (
  status: Status,
  timerInterval: ETimerInterval,
  timeLeft: number
): void => {
  if (isMobile()) return;

  const timerIntervalName = useIntervalName(
    intervalNameStatuses[status],
    timerInterval
  );

  useEffect(() => {
    setTitle(
      `${getFirstPartTitle(status, timeLeft)}${getSecondPartTitle(
        status,
        timerIntervalName
      )}`
    );

    return () => {
      setTitle(DEFAULT_TITLE);
    };
  }, [status, timeLeft]);
};
