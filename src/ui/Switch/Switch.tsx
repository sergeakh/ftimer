import { JSX } from "preact";

import styles from "./Switch.css";

type Props = JSX.HTMLAttributes<HTMLInputElement>;

export const Switch = (props: Props): JSX.Element => (
  <label className={styles.switch}>
    <input {...props} className="vh" type="checkbox" />
    <span className={styles.slider} />
  </label>
);
