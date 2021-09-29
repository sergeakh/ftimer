import {
  MainMessage,
  MainEventName,
  MessageSetTimeoutStart,
  MessageSetTimeoutEnd,
  WorkerEventName,
} from "./types";

onmessage = ({ data }: { data: MainMessage }) => {
  if (data.event === MainEventName.SetTimeout) {
    const id: number = setTimeout(() => {
      const msg: MessageSetTimeoutEnd = {
        event: WorkerEventName.SetTimeoutEnd,
        timerId: id,
      };
      postMessage(msg);
    }, data.timeout) as unknown as number;

    const msg: MessageSetTimeoutStart = {
      event: WorkerEventName.SetTimeoutStart,
      timerId: id,
      initId: data.initId,
    };
    postMessage(msg);
  } else if (data.event === MainEventName.ClearTimeout) {
    clearTimeout(data.timerId);
  }
};
