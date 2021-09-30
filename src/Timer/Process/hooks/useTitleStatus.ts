import { useEffect } from "preact/hooks";
import { isMobile } from "../../../utils/browser";

import { formatTime, normalizeTime } from "../../../utils/common";

export const enum Status {
  Start,
  Run,
  Pause,
}

const Statuses = {
  [Status.Start]: document.title,
  [Status.Run]: "- Working",
  [Status.Pause]: "- Pause",
};

export const setTitle = (title: string): void => {
  document.title = title;
};

export const getFirstPartTitle = (status: Status, timeLeft: number): string => {
  if (status === Status.Start) return "";

  return `${formatTime(normalizeTime(timeLeft))} `;
};

export const useTitleStatus = (status: Status, timeLeft: number): void => {
  if (isMobile()) return;

  useEffect(() => {
    setTitle(`${getFirstPartTitle(status, timeLeft)}${Statuses[status]}`);
  }, [status, timeLeft]);
};
