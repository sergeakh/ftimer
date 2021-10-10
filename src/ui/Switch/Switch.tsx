import { JSX } from "preact";
import { useCallback } from "preact/hooks";
import cn from "classnames";

import styles from "./Switch.css";

export type OnChange = (
  newValue: boolean,
  e?: JSX.TargetedEvent<HTMLInputElement, Event>
) => void;

export type Props = Omit<JSX.HTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange?: OnChange;
};

export const Switch = ({
  className,
  onChange,
  ...props
}: Props): JSX.Element => {
  const handleChange = useCallback(
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      const newValue = e.currentTarget.checked;
      e.currentTarget.checked = !newValue;
      onChange?.(newValue, e);
    },
    [onChange]
  );

  return (
    <label className={cn(styles.switch, className)}>
      <input
        {...props}
        onChange={handleChange}
        className="vh"
        type="checkbox"
      />
      <span className={styles.slider} />
    </label>
  );
};
