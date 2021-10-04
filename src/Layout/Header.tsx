import { JSX } from "preact";

import styles from "./Header.css";

type Props = {
  onClickMenu: () => void;
};

export const Header = ({ onClickMenu }: Props): JSX.Element => (
  <header className={styles.header}>
    <button onClick={onClickMenu} className={styles.menuButton}>
      <span className="vh">Open menu</span>
    </button>
  </header>
);
