import { JSX } from "preact";
import { useState, useCallback, useEffect } from "preact/hooks";

import { Process, ProcessStatus } from "./Process";
import { ProcessControl, ProcessControlStatus } from "./ProcessControl";

import { getMillisecondsFromMinutes, noop } from "../utils/common";

import styles from "./Timer.css";

const TIMEOUT_PER_MIN = 25;
const TIMEOUT = getMillisecondsFromMinutes(TIMEOUT_PER_MIN);

const enum Status {
  Start,
  Run,
  Pause,
  Finish,
}

const processControlStatuses = {
  [Status.Start]: ProcessControlStatus.Start,
  [Status.Run]: ProcessControlStatus.Run,
  [Status.Pause]: ProcessControlStatus.Pause,
  [Status.Finish]: ProcessControlStatus.Start,
};

const processStatuses = {
  [Status.Start]: ProcessStatus.Start,
  [Status.Run]: ProcessStatus.Run,
  [Status.Pause]: ProcessStatus.Pause,
  [Status.Finish]: ProcessStatus.Start,
};

export const Timer = (): JSX.Element => {
  const [status, setStatus] = useState<Status>(Status.Start);

  const handleStart = useCallback(() => {
    setStatus(Status.Run);
  }, []);

  const handlePause = useCallback(() => {
    setStatus(Status.Pause);
  }, []);

  const handleStop = useCallback(() => {
    setStatus(Status.Start);
  }, []);

  const handleProcessFinish = useCallback(() => {
    setStatus(Status.Finish);
  }, []);

  useEffect(() => {
    if (status !== Status.Finish) return noop;

    const timerId = setTimeout(() => {
      setStatus(Status.Start);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [status]);

  return (
    <div class={styles.timer}>
      <Process
        status={processStatuses[status]}
        timeout={TIMEOUT}
        onFinish={handleProcessFinish}
      />
      <ProcessControl
        status={processControlStatuses[status]}
        onStart={handleStart}
        onPause={handlePause}
        onStop={handleStop}
      />
    </div>
  );
};
