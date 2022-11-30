import { JSX } from "preact";
import { useCallback } from "preact/hooks";
import cn from "classnames";

import styles from "./InputColor.css";

export type onFocus = (e?: JSX.TargetedEvent<HTMLInputElement, Event>) => void;

export type OnChange = (
  newValue: string,
  e?: JSX.TargetedEvent<HTMLInputElement, Event>
) => void;

export type Props = Omit<JSX.HTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange?: OnChange;
  className?: string;
};

export const InputColor = ({
  className,
  onChange,
  ...props
}: Props): JSX.Element => {
  const handleChange = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = e.currentTarget.value;
      e.currentTarget.value = `${newValue}`;
      onChange?.(newValue, e);
    },
    [onChange]
  );

  return (
    <input
      {...props}
      className={cn(styles.inputColor, className)}
      onChange={handleChange}
      type="color"
    />
  );
};
