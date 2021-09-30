import { JSX } from "preact";
import cn from "classnames";

import { useLayoutEffect, useRef } from "preact/hooks";
import { formatTime, normalizeTime } from "../../utils/common";
import { Status } from "./types";

import { getСircumference } from "./common";

import styles from "./Progress.css";

const RADIUS = 22;
const CIRCUMFERENCE = getСircumference(RADIUS);

type Props = {
  status: Status;
  timeLeft: number;
  timeout: number;
};

export const Progress = ({ status, timeLeft }: Props): JSX.Element => {
  const circleRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    if (!circleRef.current) return;

    const circle = circleRef.current;

    if (status === Status.Start) {
      circle.style.animationDuration = "";
      circle.style.animationPlayState = "";
      circle.style.strokeDashoffset = "";
    } else if (status === Status.Run) {
      circle.style.animationDuration = `${timeLeft}ms`;
      circle.style.animationPlayState = "running";
      circle.style.strokeDashoffset = `${CIRCUMFERENCE}`;
    } else if (status === Status.Pause) {
      circle.style.animationPlayState = `paused`;
    }
  }, [status]);

  return (
    <div className={styles.progress}>
      <svg viewBox="0 0 50 50" className={styles.svg}>
        <circle
          className={styles.circle}
          cx="50%"
          cy="50%"
          r={RADIUS}
          stroke="#00000011"
          stroke-width="3"
          fill="transparent"
        />
        <circle
          ref={circleRef}
          className={cn(styles.circle, {
            [styles.circleAnimation]: status !== Status.Start,
          })}
          cx="50%"
          cy="50%"
          r={RADIUS}
          stroke="#000"
          stroke-width="3"
          stroke-dasharray={CIRCUMFERENCE}
          fill="transparent"
        />
      </svg>
      <div className={styles.time}>{formatTime(normalizeTime(timeLeft))}</div>
    </div>
  );
};
