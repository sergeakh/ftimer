import { JSX } from "preact";

import styles from "./Header.css";

type Props = {
  children: JSX.Element[] | JSX.Element | false;
};

export const Header = ({ children }: Props): JSX.Element => (
  <div className={styles.header}>{children}</div>
);
