import { JSX } from "preact";
import {
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from "preact/hooks";
import cn from "classnames";

import styles from "./Sidebar.css";

const SIDEBAR_WIDTH = 260;
const SHOW_TRANSITION_TIME = 330;
const HIDE_TRANSITION_TIME = 130;

const getShowTransition = (time = SHOW_TRANSITION_TIME): string =>
  `all ${time}ms ease-out`;
const getHideTransition = (time = HIDE_TRANSITION_TIME): string =>
  `all ${time}ms ease-in`;

const lockGlobalScroll = () => {
  const offsetY = window.pageYOffset;
  document.body.style.top = `${-offsetY}px`;
  document.body.classList.add(styles.lockScroll);
};

const unlockGlobalScroll = () => {
  const offsetY = Math.abs(parseInt(document.body.style.top || "0", 10));
  document.body.classList.remove(styles.lockScroll);
  document.body.style.removeProperty("top");
  window.scrollTo(0, offsetY || 0);
};

type Props = {
  sidebarHidden: boolean;
  onSidebarShow: () => void;
  onSidebarHide: () => void;
  children: JSX.Element[] | JSX.Element | false;
};

export const Sidebar = ({
  sidebarHidden,
  onSidebarShow,
  onSidebarHide,
  children,
}: Props): JSX.Element => {
  const asideRef = useRef<HTMLElement>(null);
  const sidebarOverlayRef = useRef<HTMLDivElement>(null);
  const [sidebarHiddenLocal, setSidebarHiddenLocal] = useState(true);

  const sidebarShow = useCallback(() => {
    if (asideRef.current && !asideRef.current.style.transition) {
      asideRef.current.style.transition = getShowTransition();
    }

    lockGlobalScroll();
    setSidebarHiddenLocal(false);
  }, []);

  const sidebarHide = useCallback(() => {
    if (asideRef.current && !asideRef.current.style.transition) {
      asideRef.current.style.transition = getHideTransition();
    }

    unlockGlobalScroll();
    setSidebarHiddenLocal(true);
  }, []);

  const handleSidebarPointerDown: JSX.PointerEventHandler<HTMLElement> =
    useCallback((e) => {
      if (!asideRef.current) return;
      if (!sidebarOverlayRef.current) return;
      if (
        ["button", "a", "input"].includes(
          (e.target as HTMLElement)?.nodeName?.toLowerCase?.() || ""
        )
      )
        return;

      e.preventDefault();

      const aside = asideRef.current;
      const sidebarOverlay = sidebarOverlayRef.current;

      let left = 0;

      const shiftX = e.clientX - aside.getBoundingClientRect().left;

      function moveAt(pageX: number) {
        left = Math.min(pageX - shiftX, 0);
        aside.style.transform = `translateX(${left}px)`;
        sidebarOverlay.style.opacity = `${1 - Math.abs(left) / SIDEBAR_WIDTH}`;
      }

      moveAt(e.pageX);

      function onPointerMove(event: MouseEvent) {
        moveAt(event.pageX);
      }

      document.addEventListener("pointermove", onPointerMove);

      document.addEventListener("pointerup", function onPointerUp() {
        aside.style.transform = "";
        sidebarOverlay.style.opacity = "";

        if (SIDEBAR_WIDTH - Math.abs(left) < SIDEBAR_WIDTH / 2) {
          const transitionTime =
            (HIDE_TRANSITION_TIME * (SIDEBAR_WIDTH - Math.abs(left))) /
            SIDEBAR_WIDTH;

          if (transitionTime > 0) {
            aside.style.transition = getHideTransition(transitionTime);
          }

          onSidebarHide();
        } else {
          const transitionTime =
            (SHOW_TRANSITION_TIME * Math.abs(left)) / SIDEBAR_WIDTH;
          if (transitionTime > 0) {
            aside.style.transition = getShowTransition(transitionTime);
          }

          onSidebarShow();
        }

        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      });
    }, []);

  const handleSidebarDragStart = useCallback(
    (e: Event) => e.preventDefault(),
    []
  );

  const handleAsideTransitionEnd = useCallback(() => {
    if (asideRef.current) {
      asideRef.current.style.transition = "";
    }
  }, []);

  useLayoutEffect(() => {
    if (sidebarHidden) {
      sidebarHide();
    } else {
      sidebarShow();
    }
  }, [sidebarHidden]);

  useEffect(() => {
    handleAsideTransitionEnd();
  }, []);

  return (
    <div
      className={cn(styles.wrapSidebar, {
        [styles.wrapSidebarHidden]: sidebarHiddenLocal,
      })}
    >
      <div
        ref={sidebarOverlayRef}
        onClick={onSidebarHide}
        className={cn(styles.sidebarOverlay, {
          [styles.sidebarOverlayHidden]: sidebarHiddenLocal,
        })}
      ></div>
      <aside
        ref={asideRef}
        onTransitionEnd={handleAsideTransitionEnd}
        onPointerDown={handleSidebarPointerDown}
        onDragStart={handleSidebarDragStart}
        style={`width: ${SIDEBAR_WIDTH}px`}
        className={cn(styles.sidebar, {
          [styles.sidebarHidden]: sidebarHiddenLocal,
        })}
      >
        {children}
      </aside>
    </div>
  );
};
