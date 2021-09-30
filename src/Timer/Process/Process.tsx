import { JSX } from "preact";

import { useTimer } from "./hooks/useTimer";
import { Status } from "./types";

import { Progress } from "./Progress";

import { useTitleStatus, Status as TitleStatus } from "./hooks/useTitleStatus";
import { useIconStatus, Status as IconStatus } from "./hooks/useIconStatus";
import { useThrottleAnimationFrameValue } from "../../hooks/useThrottleAnimationFrameValue";
import { SEC } from "../../utils/common";

type Props = {
  status: Status;
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

export const Process = ({ status, timeout, onFinish }: Props): JSX.Element => {
  const timeLeft = useTimer(status, timeout, onFinish);
  const animationedTimeLeft = useThrottleAnimationFrameValue(timeLeft);

  useTitleStatus(titleStatuses[status], timeLeft);

  useIconStatus(iconStatuses[status], timeLeft - SEC, timeout);

  return (
    <Progress
      status={status}
      timeLeft={animationedTimeLeft}
      timeout={timeout}
    />
  );
};
