import {
  MainEventName,
  WorkerEventName,
  WorkerMessage,
  MessageSetTimeout,
  MessageClearTimeout,
} from "./types";

const worker = new Worker(new URL("./timer.worker.ts", import.meta.url));

type TimerObj = {
  getId: () => number;
  handleTick: (msg: { data: WorkerMessage }) => void;
};

export const setWorkerTimeout = (
  callback: () => void,
  timeout: number
): TimerObj => {
  const initId = Math.floor(Math.random() * 100000);
  let timerId = -1;

  const handleTick = ({ data }: { data: WorkerMessage }) => {
    if (
      data.event === WorkerEventName.SetTimeoutStart &&
      initId === data.initId
    ) {
      timerId = data.timerId;
    } else if (
      data.event === WorkerEventName.SetTimeoutEnd &&
      timerId === data.timerId
    ) {
      worker.removeEventListener("message", handleTick);
      callback();
    }
  };

  worker.addEventListener("message", handleTick);

  const msg: MessageSetTimeout = {
    event: MainEventName.SetTimeout,
    initId,
    timeout,
  };

  worker.postMessage(msg);

  return {
    handleTick,
    getId: () => timerId,
  };
};

export const clearWorkerTimeout = (timer: TimerObj): void => {
  const msg: MessageClearTimeout = {
    event: MainEventName.ClearTimeout,
    timerId: timer.getId(),
  };

  worker.removeEventListener("message", timer.handleTick);
  worker.postMessage(msg);
};
