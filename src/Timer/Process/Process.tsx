import { JSX } from "preact";

import { useTimer, Status } from "./useTimer";

import { Progress } from "./Progress";

export { Status } from "./useTimer";

type Props = {
  status: Status;
  timeout: number;
  onFinish: () => void;
};

export const Process = ({ status, timeout, onFinish }: Props): JSX.Element => {
  const timeLeft = useTimer(status, timeout, onFinish);

  return <Progress timeLeft={timeLeft} timeout={timeout} />;
};
