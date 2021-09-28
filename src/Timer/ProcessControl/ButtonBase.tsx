import { JSX } from "preact";
import { useCallback } from "preact/hooks";
import cn from "classnames";

import styles from "./ButtonBase.css";

type OnClick = () => void;

type ButtonBaseProps = {
  title: string;
  color?: "primary" | "secondary";
  className: string;
  onClick: OnClick;
};

export const ButtonBase = ({
  title,
  color = "primary",
  className,
  onClick,
}: ButtonBaseProps): JSX.Element => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      onClick();
      e.preventDefault();
    },
    [onClick]
  );

  return (
    <button
      className={cn(styles.btn, styles[color], className)}
      onClick={handleClick}
      type="button"
    >
      {title}
    </button>
  );
};
