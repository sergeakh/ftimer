import { JSX } from "preact";

import { useTimer } from "./hooks/useTimer";

import { Status } from "./types";

import { Progress } from "./Progress";

import { useTitleStatus, Status as TitleStatus } from "./hooks/useTitleStatus";
import { useIconStatus, Status as IconStatus } from "./hooks/useIconStatus";
import { useThrottleAnimationFrameValue } from "../../hooks/useThrottleAnimationFrameValue";
import { useCircleColor } from "./hooks/useCircleColor";

import { SEC } from "../../utils/common";
import { ETimerInterval } from "../types";

type Props = {
  status: Status;
  timerInterval: ETimerInterval;
  timeout: number;
  onFinish: () => void;
};

const titleStatuses = {
  [Status.Start]: TitleStatus.Start,
  [Status.Run]: TitleStatus.Run,
  [Status.Pause]: TitleStatus.Pause,
};

const iconStatuses = {
  [Status.Start]: IconStatus.Start,
  [Status.Run]: IconStatus.Run,
  [Status.Pause]: IconStatus.Pause,
};

export const Process = ({
  status,
  timerInterval,
  timeout,
  onFinish,
}: Props): JSX.Element => {
  const timeLeft = useTimer(status, timeout, onFinish);
  const animationedTimeLeft = useThrottleAnimationFrameValue(timeLeft);

  const [circleColor, colorBackgoundCircle] = useCircleColor({ timerInterval });

  useTitleStatus(titleStatuses[status], timerInterval, timeLeft);

  useIconStatus(iconStatuses[status], timerInterval, timeLeft - SEC, timeout);

  return (
    <Progress
      status={status}
      timeLeft={animationedTimeLeft}
      timeout={timeout}
      colorCircle={circleColor}
      colorBackgoundCircle={colorBackgoundCircle}
    />
  );
};
