import { JSX } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import cn from "classnames";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

import styles from "./Layout.css";

type Props = {
  page: string;
  sidebar: JSX.Element[] | JSX.Element | false;
  children: JSX.Element[] | JSX.Element | false;
};

export const Layout = ({ children, sidebar, page }: Props): JSX.Element => {
  const [sidebarHidden, setSidebarHidden] = useState(true);

  const handleSidebarShow = useCallback(() => {
    setSidebarHidden(false);
  }, []);

  const handleSidebarHide = useCallback(() => {
    setSidebarHidden(true);
  }, []);

  useEffect(() => {
    if (!sidebarHidden) {
      handleSidebarHide();
    }
  }, [page]);

  return (
    <div class={styles.layout}>
      <Sidebar
        sidebarHidden={sidebarHidden}
        onSidebarShow={handleSidebarShow}
        onSidebarHide={handleSidebarHide}
      >
        {sidebar}
      </Sidebar>
      <section className={styles.mainSection}>
        <Header onClickMenu={handleSidebarShow}></Header>
        <main className={cn(styles.main)}>{children}</main>
      </section>
    </div>
  );
};
