import { JSX } from "preact";
import { useCallback } from "preact/hooks";
import cn from "classnames";

import styles from "./Select.css";

export type Option = {
  title: string;
  value: string | number;
};

export type OnChange = (
  value: string,
  e?: JSX.TargetedEvent<HTMLSelectElement, Event>
) => void;

export type Props = Omit<JSX.HTMLAttributes<HTMLSelectElement>, "onChange"> & {
  options: Option[];
  className?: string;
  onChange?: OnChange;
};

export const Select = ({
  options,
  className,
  onChange,
  ...props
}: Props): JSX.Element => {
  const handleChange = useCallback(
    (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
      onChange?.(e.currentTarget.value, e);
    },
    [onChange]
  );

  return (
    <div className={cn(styles.select, className)}>
      <select
        className={styles.selectStandart}
        onChange={handleChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.title} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
      <span className={styles.focus}></span>
    </div>
  );
};
