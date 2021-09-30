import { JSX } from "preact";
import { useState, useCallback, useEffect } from "preact/hooks";
import NoSleep from "nosleep.js";

import { Process, ProcessStatus } from "./Process";
import { ProcessControl, ProcessControlStatus } from "./ProcessControl";

import { getMillisecondsFromMinutes } from "../utils/common";

import styles from "./Timer.css";
import { useAlarm } from "../hooks/useAlarm";

const noSleep = new NoSleep();

const TIMEOUT_PER_MIN = 1;
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

  const handleAlarmFinish = useCallback(() => {
    setStatus(Status.Start);
  }, []);

  useAlarm(status === Status.Finish, handleAlarmFinish);

  useEffect(() => {
    if (status === Status.Run) {
      noSleep.enable();
    }

    return () => {
      noSleep.disable();
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
