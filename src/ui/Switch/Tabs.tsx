import { JSX } from "preact";
import { useCallback, useState } from "preact/hooks";
import cn from "classnames";

import styles from "./Tabs.css";

type TabProps = {
  title: string;
  index: number;
  isActive: boolean;
  setIndex: (newIndex: number) => void;
};

const Tab = ({ title, index, isActive, setIndex }: TabProps): JSX.Element => {
  const handleChange = useCallback(() => {
    setIndex(index);
  }, [index]);

  return (
    <li className={styles.li}>
      <button
        className={cn(styles.button, {
          [styles.active]: isActive,
        })}
        type="button"
        onClick={handleChange}
      >
        {title}
      </button>
    </li>
  );
};

type Tab = {
  title: string;
  content: JSX.Element;
};

type Props = {
  tabs: Tab[];
};

export const Tabs = ({ tabs }: Props): JSX.Element => {
  const [index, setIndex] = useState(0);

  return (
    <div className={styles.wrap}>
      <ul className={styles.ul}>
        {tabs.map((tab, i) => (
          <Tab
            key={tab.title}
            title={tab.title}
            index={i}
            isActive={i === index}
            setIndex={setIndex}
          />
        ))}
        <div
          className={styles.status}
          style={`width: calc(100% / ${tabs.length}); transform: translateX(${
            index * 100
          }%)`}
        ></div>
      </ul>
      <div className={styles.content}>{tabs[index].content}</div>
    </div>
  );
};
