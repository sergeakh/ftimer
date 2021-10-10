import { useCallback, useEffect } from "preact/hooks";
import { SettingName } from "../../../Settings/types";
import { useSettings } from "../../../Settings/useSettings";

import { isMobile } from "../../../utils/browser";
import { getСircumference, noop } from "../../../utils/common";
import { ETimerInterval } from "../../types";

import { getProgress } from "../common";
import { useTabCircleColor } from "./useTabCircleColor";

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
  circleColor: string,
  circleBackgroundColor: string,
  timeLeft: number,
  timeout: number
): string => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <style>
    .circle {
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
    </style>
  <circle
    class="circle circle1"
    cx="25"
    cy="25"
    r="${RADIUS}"
    stroke="${circleBackgroundColor}"
    stroke-width="10"
    fill="transparent"
  />
  <circle
    class="circle circle2"
    cx="25"
    cy="25"
    r="${RADIUS}"
    stroke="${circleColor}"
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
  timerInterval: ETimerInterval,
  timeLeft: number,
  timeout: number
): void => {
  if (isMobile()) return;

  const { getSetting } = useSettings();

  const tabCircle = getSetting(SettingName.tabCircle);

  const [circleColor, circleBackgroundColor] = useTabCircleColor({
    timerInterval,
    ignoreColorSchemeChoise: true,
  });

  const enabled = tabCircle && iconDefault && icon;

  useEffect(() => {
    if (!enabled) return;

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
    if (!enabled) return noop;

    if (status === Status.Start) {
      showIcon(iconDefaultHref);
      return noop;
    }

    showIcon(
      URL.createObjectURL(
        createBlob(
          createIcon(circleColor, circleBackgroundColor, timeLeft, timeout)
        )
      )
    );

    return () => {
      showIcon(iconDefaultHref);
    };
  }, [status, timeLeft]);
};
