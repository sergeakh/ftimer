import { JSX } from "preact";
import {
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "preact/hooks";

import { Process, ProcessStatus } from "./Process";
import { ProcessControl, ProcessControlStatus } from "./ProcessControl";
import { TimerInterval, Status as TimerIntervalStatus } from "./TimerInterval";

import { getMillisecondsFromMinutes, noop } from "../utils/common";
import { useAlarm } from "../hooks/useAlarm";
import { ETimerInterval } from "./types";
import { SettingsContext } from "../Settings";
import { SettingName } from "../Settings/types";
import { useTimerInterval } from "./hooks/useTimerInterval";
import {
  useAutoChangeTimerInterval,
  Status as AutoChangeTimerIntervalStatus,
} from "./hooks/useAutoChangeTimerInterval";
import {
  useTimerIntervalsTimes,
  Status as TimerIntervalsTimesStatus,
} from "./hooks/useTimerIntervalsTimes";
import { useIntervalName } from "./hooks/useTimerIntervalName";

import { CIRCLE_RESTORE_TIME } from "./constants";

import { getNoSleep } from "../utils/noSleep";

import styles from "./Timer.css";

const enum Status {
  Start,
  AutoStart,
  Run,
  Pause,
  FinishStart,
  FinishEnd,
}

const processControlStatuses = {
  [Status.Start]: ProcessControlStatus.Start,
  [Status.AutoStart]: ProcessControlStatus.Another,
  [Status.Run]: ProcessControlStatus.Run,
  [Status.Pause]: ProcessControlStatus.Pause,
  [Status.FinishStart]: ProcessControlStatus.Another,
  [Status.FinishEnd]: ProcessControlStatus.Another,
};

const processStatuses = {
  [Status.Start]: ProcessStatus.Start,
  [Status.AutoStart]: ProcessStatus.Start,
  [Status.Run]: ProcessStatus.Run,
  [Status.Pause]: ProcessStatus.Pause,
  [Status.FinishStart]: ProcessStatus.Start,
  [Status.FinishEnd]: ProcessStatus.Start,
};

const timerIntervalsTimesStatuses = {
  [Status.Start]: TimerIntervalsTimesStatus.Another,
  [Status.AutoStart]: TimerIntervalsTimesStatus.Another,
  [Status.Run]: TimerIntervalsTimesStatus.Another,
  [Status.Pause]: TimerIntervalsTimesStatus.Another,
  [Status.FinishStart]: TimerIntervalsTimesStatus.Finish,
  [Status.FinishEnd]: TimerIntervalsTimesStatus.Another,
};

const timerIntervalStatuses = {
  [Status.Start]: TimerIntervalStatus.Another,
  [Status.AutoStart]: TimerIntervalStatus.Another,
  [Status.Run]: TimerIntervalStatus.Run,
  [Status.Pause]: TimerIntervalStatus.Run,
  [Status.FinishStart]: TimerIntervalStatus.Another,
  [Status.FinishEnd]: TimerIntervalStatus.Another,
};

const autoChangeTimerIntervalStatuses = {
  [Status.Start]: AutoChangeTimerIntervalStatus.Another,
  [Status.AutoStart]: AutoChangeTimerIntervalStatus.Another,
  [Status.Run]: AutoChangeTimerIntervalStatus.Another,
  [Status.Pause]: AutoChangeTimerIntervalStatus.Another,
  [Status.FinishStart]: AutoChangeTimerIntervalStatus.Another,
  [Status.FinishEnd]: AutoChangeTimerIntervalStatus.Finish,
};

export const Timer = (): JSX.Element => {
  const { settings } = useContext(SettingsContext);
  const [status, setStatus] = useState<Status>(Status.Start);

  const [timerInterval, setTimerInterval] = useTimerInterval();

  const noSleep = getNoSleep();

  useEffect(
    () => () => {
      if (noSleep.isEnabled) noSleep.disable();
    },
    []
  );

  useEffect(() => {
    if (status !== Status.Run) {
      noSleep.disable();
    }

    const enableNoSleep = () => {
      document.removeEventListener("click", enableNoSleep);

      if (status === Status.Run && !noSleep.isEnabled) {
        noSleep.enable();
      }
    };

    document.addEventListener("click", enableNoSleep);

    return () => {
      document.removeEventListener("click", enableNoSleep);
    };
  }, [status]);

  const initAlarm = useAlarm(status === Status.FinishStart);

  const handleStart = useCallback((audioInit = true) => {
    noSleep.enable();

    if (audioInit) {
      initAlarm();
    }

    setStatus(Status.Run);
  }, []);

  const handlePause = useCallback(() => {
    setStatus(Status.Pause);
  }, []);

  const handleStop = useCallback(() => {
    setStatus(Status.Start);
  }, []);

  const handleProcessFinish = useCallback(() => {
    setStatus(Status.FinishStart);
  }, []);

  const timerIntervalsTimes = useTimerIntervalsTimes(
    timerIntervalsTimesStatuses[status],
    timerInterval
  );

  useAutoChangeTimerInterval(
    autoChangeTimerIntervalStatuses[status],
    timerIntervalsTimes.focusTimes,
    timerInterval,
    setTimerInterval
  );

  const timerIntervalName = useIntervalName(timerInterval);

  const handleManualChangeTimerInterval: typeof setTimerInterval = useCallback(
    (newTimeInterval) => {
      timerIntervalsTimes.init();
      setTimerInterval(newTimeInterval);
    },
    [timerIntervalsTimes.init]
  );

  const timeout = useMemo(() => {
    if (timerInterval === ETimerInterval.Focus)
      return settings[SettingName.focusDuration];
    if (timerInterval === ETimerInterval.ShortBreak)
      return settings[SettingName.shortBreakDuration];
    if (timerInterval === ETimerInterval.LongBreak)
      return settings[SettingName.longBreakDuration];
    return 0;
  }, [timerInterval]);

  useEffect(() => {
    if (status === Status.FinishStart) {
      const timerId = setTimeout(() => {
        setStatus(Status.FinishEnd);
      }, CIRCLE_RESTORE_TIME);

      return () => {
        clearTimeout(timerId);
      };
    }

    return noop;
  }, [status]);

  useEffect(() => {
    if (status === Status.FinishEnd) {
      if (
        (timerInterval === ETimerInterval.Focus &&
          settings[SettingName.autoStartNextFocus]) ||
        ((timerInterval === ETimerInterval.ShortBreak ||
          timerInterval === ETimerInterval.LongBreak) &&
          settings[SettingName.autoStartBreak])
      ) {
        const timerId = setTimeout(() => {
          setStatus(Status.AutoStart);
        }, 500);

        return () => {
          clearTimeout(timerId);
        };
      }

      setStatus(Status.Start);
    }

    return noop;
  }, [status]);

  useEffect(() => {
    if (status === Status.AutoStart) {
      handleStart(false);
    }
  }, [status]);

  return (
    <div class={styles.timer}>
      <TimerInterval
        status={timerIntervalStatuses[status]}
        isLongBreak={settings[SettingName.longBreak]}
        timerInterval={timerInterval}
        onChangeTimerInterval={handleManualChangeTimerInterval}
      />
      <Process
        status={processStatuses[status]}
        timerIntervalName={timerIntervalName}
        timeout={
          status === Status.FinishStart || status === Status.FinishEnd
            ? 0
            : getMillisecondsFromMinutes(timeout)
        }
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
