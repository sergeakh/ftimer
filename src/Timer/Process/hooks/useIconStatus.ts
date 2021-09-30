import { useCallback, useEffect } from "preact/hooks";
import { isMobile } from "../../../utils/browser";

import { getProgress, getСircumference } from "../common";

export const enum Status {
  Start,
  Run,
  Pause,
}

const RADIUS = 20;
const CIRCUMFERENCE = getСircumference(RADIUS);

const iconDefault =
  document.head.querySelector<HTMLLinkElement>("link[rel=icon]");
const iconDefaultHref = iconDefault?.href || "";

const icon = document.createElement("link");
icon.rel = "shortcut icon";

const createIcon = (
  timeLeft: number,
  timeout: number
): string => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <style>
    .circle {
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
    @media (prefers-color-scheme:dark){
      .circle1 {
        stroke:#ffffff33
      }
      .circle2 {
        stroke:#ffffff
      }
    }
    </style>
  <circle
    class="circle circle1"
    cx="25"
    cy="25"
    r="${RADIUS}"
    stroke="#00000033"
    stroke-width="10"
    fill="transparent"
  />
  <circle
    class="circle circle2"
    cx="25"
    cy="25"
    r="${RADIUS}"
    stroke="#000"
    stroke-width="10"
    stroke-dasharray="${CIRCUMFERENCE}"
    stroke-dashoffset="${getProgress(CIRCUMFERENCE, timeLeft / timeout)}"
    fill="transparent"
  />
</svg>`;

const createBlob = (svg: string): Blob =>
  new Blob([svg], { type: "image/svg+xml" });

export const useIconStatus = (
  status: Status,
  timeout: number,
  timeLeft: number
): void => {
  if (isMobile()) return;

  useEffect(() => {
    if (!iconDefault) return;
    if (!icon) return;

    if (status === Status.Start) {
      icon.remove();
      document.head.append(iconDefault);
    } else {
      iconDefault.remove();
      document.head.append(icon);
    }
  }, [status]);

  const showIcon = useCallback((href: string) => {
    if (icon) {
      const prevHref = icon.href;
      icon.href = href;
      URL.revokeObjectURL(prevHref);
    }
  }, []);

  useEffect(() => {
    if (!icon) return;

    if (status === Status.Start) {
      showIcon(iconDefaultHref);
      return;
    }

    showIcon(URL.createObjectURL(createBlob(createIcon(timeLeft, timeout))));
  }, [status, timeLeft]);
};
