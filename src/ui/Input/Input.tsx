import { JSX } from "preact";
import { useCallback } from "preact/hooks";
import cn from "classnames";

import styles from "./Input.css";

export type onFocus = (e?: JSX.TargetedEvent<HTMLInputElement, Event>) => void;

export type OnChange = (
  newValue: string,
  e?: JSX.TargetedEvent<HTMLInputElement, Event>
) => void;

export type Props = Omit<
  JSX.HTMLAttributes<HTMLInputElement>,
  "onChange" | "onFocus"
> & {
  onChange?: OnChange;
  onFocus?: onFocus;
};

export const Input = ({
  className,
  type = "text",
  onFocus,
  onChange,
  ...props
}: Props): JSX.Element => {
  const handleFocus = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const input = e.currentTarget;
      const len = input.value.length;

      setTimeout(() => {
        input.setSelectionRange(len, len);
        onFocus?.(e);
      }, 0);
    },
    [onFocus]
  );

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
      className={cn(styles.input, className)}
      onChange={handleChange}
      onFocus={handleFocus}
      type={type}
    />
  );
};
