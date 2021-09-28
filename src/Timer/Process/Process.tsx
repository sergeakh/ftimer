import { JSX } from "preact";

import { useTimer, Status } from "./useTimer";

import { Progress } from "./Progress";

import { useTitleStatus, Status as TitleStatus } from "./useTitleStatus";

export { Status } from "./useTimer";

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

export const Process = ({ status, timeout, onFinish }: Props): JSX.Element => {
  const timeLeft = useTimer(status, timeout, onFinish);

  useTitleStatus(titleStatuses[status], timeLeft);

  return <Progress timeLeft={timeLeft} timeout={timeout} />;
};
