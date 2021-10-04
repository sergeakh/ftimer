import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import cn from "classnames";

import styles from "./AnimateOpenPage.css";

type Props = {
  children: JSX.Element[] | JSX.Element | false;
};

export const AnimateOpenPage = ({ children }: Props): JSX.Element => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={cn(styles.page, {
        [styles.visible]: visible,
      })}
    >
      {children}
    </div>
  );
};
