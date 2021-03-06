import { JSX } from "preact";
import cn from "classnames";

import { useCallback, useLayoutEffect, useRef } from "preact/hooks";
import {
  formatTime,
  normalizeTime,
  getСircumference,
} from "../../utils/common";
import { Status } from "./types";

import { CIRCLE_RESTORE_TIME } from "../constants";

import styles from "./Progress.css";

const RADIUS = 22;
const CIRCUMFERENCE = getСircumference(RADIUS);

type Props = {
  status: Status;
  colorBackgoundCircle: string;
  colorCircle: string;
  timeLeft: number;
  timeout: number;
};

const CIRCLE_TRANSITION = `${CIRCLE_RESTORE_TIME}ms stroke-dashoffset linear`;

export const Progress = ({
  status,
  colorCircle,
  colorBackgoundCircle,
  timeLeft,
  timeout,
}: Props): JSX.Element => {
  const circleRef = useRef<SVGCircleElement>(null);

  const handleAnimationEnd = useCallback(() => {
    if (!circleRef.current) return;

    circleRef.current.style.transition = CIRCLE_TRANSITION;
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (!circleRef.current) return;

    circleRef.current.style.transition = "";
  }, []);

  useLayoutEffect(() => {
    if (!circleRef.current) return;

    const circle = circleRef.current;

    if (status === Status.Start) {
      circle.style.animationPlayState = "paused";
    } else if (status === Status.Run) {
      circle.style.animationDuration = `${timeout}ms`;
      circle.style.animationPlayState = "running";
    } else if (status === Status.Pause) {
      circle.style.animationPlayState = "paused";
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
          stroke={colorBackgoundCircle}
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
          stroke={colorCircle}
          stroke-width="3"
          stroke-dasharray={CIRCUMFERENCE}
          stroke-dashoffset={status === Status.Start ? 0 : CIRCUMFERENCE}
          fill="transparent"
          onAnimationEnd={handleAnimationEnd}
          onTransitionEnd={handleTransitionEnd}
        />
      </svg>
      <div className={styles.time}>{formatTime(normalizeTime(timeLeft))}</div>
    </div>
  );
};
