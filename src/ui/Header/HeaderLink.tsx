import { JSX } from "preact";
import { Link } from "preact-router/match";
import cn from "classnames";

import styles from "./HeaderLink.css";

type Props = {
  title: string;
  href: string;
  className?: string;
};

export const HeaderLink = ({ title, href, className }: Props): JSX.Element => (
  <Link className={cn(styles.link, className)} href={href}>
    <span className="vh">{title}</span>
  </Link>
);
