import { JSX } from "preact";
import { useCallback } from "preact/hooks";

import styles from "./Menu.css";

type LinkProps = {
  title: string;
  iconSrc?: string;
  url: string;
  route: (route: string) => void;
};

export const Link = ({
  title,
  iconSrc,
  url,
  route,
}: LinkProps): JSX.Element => {
  const handleClick = useCallback(() => route(url), [url]);

  return (
    <button className={styles.link} onClick={handleClick}>
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
  links: Omit<LinkProps, "route">[];
};

export const Menu = ({ links, route }: Props): JSX.Element => (
  <menu className={styles.menu}>
    {links.map((link) => (
      <Link {...link} route={route} key={link.title} />
    ))}
  </menu>
);
