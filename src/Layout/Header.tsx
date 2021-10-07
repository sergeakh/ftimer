import { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";

import styles from "./Header.css";

type Props = {
  autoFocusMenu?: boolean;
  onClickMenu: () => void;
};

export const Header = ({
  autoFocusMenu = false,
  onClickMenu,
}: Props): JSX.Element => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (autoFocusMenu) {
      menuButtonRef.current?.focus();
    }
  }, [autoFocusMenu]);

  return (
    <header className={styles.header}>
      <button
        ref={menuButtonRef}
        onClick={onClickMenu}
        className={styles.menuButton}
      >
        <span className="vh">Open menu</span>
      </button>
    </header>
  );
};
