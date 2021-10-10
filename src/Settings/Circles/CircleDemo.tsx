import { JSX } from "preact";

import { getСircumference } from "../../utils/common";

import styles from "./CircleDemo.css";

const RADIUS = 22;
const CIRCUMFERENCE = getСircumference(RADIUS);

type Props = {
  colorBackgoundCircle: string;
  colorCircle: string;
};

export const CircelDemo = ({
  colorCircle,
  colorBackgoundCircle,
}: Props): JSX.Element => (
  <div className={styles.progress}>
    <svg viewBox="0 0 50 50" className={styles.svg}>
      <circle
        className={styles.circle}
        cx="50%"
        cy="50%"
        r={RADIUS}
        stroke={colorBackgoundCircle}
        stroke-width="5"
        fill="transparent"
      />
      <circle
        className={styles.circle}
        cx="50%"
        cy="50%"
        r={RADIUS}
        stroke={colorCircle}
        stroke-width="5"
        stroke-dasharray={CIRCUMFERENCE}
        stroke-dashoffset={CIRCUMFERENCE / 3}
        fill="transparent"
      />
    </svg>
  </div>
);
