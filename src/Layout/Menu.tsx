import { JSX } from "preact";
import { useCallback } from "preact/hooks";
import cn from "classnames";

import styles from "./Menu.css";

type LinkProps = {
  title: string;
  iconSrc?: string;
  url: string;
  isActive: boolean;
  route: (route: string) => void;
};

export const Link = ({
  title,
  iconSrc,
  url,
  isActive,
  route,
}: LinkProps): JSX.Element => {
  const handleClick = useCallback(
    (e: Event) => {
      if (isActive) e.preventDefault();
      route(url);
    },
    [url]
  );

  return (
    <button
      className={cn(styles.link)}
      disabled={isActive}
      onClick={handleClick}
    >
      {iconSrc && (
        <span
          className={styles.linkIcon}
          style={`background-image: url('${iconSrc}')`}
        ></span>
      )}

      <span className={styles.linkTitle}>{title}</span>
    </button>
  );
};

type Props = Pick<LinkProps, "route"> & {
  links: Omit<LinkProps, "route" | "isActive">[];
  currUrl: string;
};

export const Menu = ({ links, route, currUrl }: Props): JSX.Element => (
  <menu className={styles.menu}>
    {links.map((link) => (
      <Link
        {...link}
        route={route}
        key={link.title}
        isActive={link.url === currUrl}
      />
    ))}
  </menu>
);
