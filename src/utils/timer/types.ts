export const enum MainEventName {
  SetTimeout,
  ClearTimeout,
}

export const enum WorkerEventName {
  SetTimeoutStart,
  SetTimeoutEnd,
}

export type MessageSetTimeout = {
  event: MainEventName.SetTimeout;
  timeout: number;
  initId: number;
};

export type MessageClearTimeout = {
  event: MainEventName.ClearTimeout;
  timerId: number;
};

export type MessageSetTimeoutStart = {
  event: WorkerEventName.SetTimeoutStart;
  timerId: number;
  initId: number;
};

export type MessageSetTimeoutEnd = {
  event: WorkerEventName.SetTimeoutEnd;
  timerId: number;
};

export type MainMessage = MessageSetTimeout | MessageClearTimeout;

export type WorkerMessage = MessageSetTimeoutStart | MessageSetTimeoutEnd;
