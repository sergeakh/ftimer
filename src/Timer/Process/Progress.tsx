import { JSX } from "preact";

import { formatTime } from "../../utils/common";

import styles from "./Progress.css";

const RADIUS = 22;
const CIRCUMFERENCE = RADIUS * 2 * Math.PI;

function getProgress(percent: number) {
  return CIRCUMFERENCE - percent * CIRCUMFERENCE;
}

type Props = {
  timeLeft: number;
  timeout: number;
};

export const Progress = ({ timeLeft, timeout }: Props): JSX.Element => (
  <div className={styles.progress}>
    <svg viewBox="0 0 50 50" className={styles.svg}>
      <circle
        className={styles.circle}
        cx="25"
        cy="25"
        r={`${RADIUS}`}
        stroke="#00000011"
        stroke-width="2"
        fill="transparent"
      />
      <circle
        className={styles.circle}
        cx="25"
        cy="25"
        r={`${RADIUS}`}
        stroke="#000"
        stroke-width="2"
        stroke-dasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
        stroke-dashoffset={getProgress(timeLeft / timeout)}
        fill="transparent"
      />
    </svg>
    <div className={styles.time}>{formatTime(timeLeft)}</div>
  </div>
);
