import { JSX } from "preact";

import { useMemo } from "preact/hooks";
import { Menu } from "../Layout/Menu";

import iconCircleSrc from "../assets/icons/circle.svg";
import iconSettingsSrc from "../assets/icons/settings.svg";

import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher/ColorSchemeSwitcher";

import { pages } from "../constants";
import { LocaleLabelName } from "../locales/types";
import { useTranslate } from "../locales/useTranslate";

const menuLinks = [
  {
    title: LocaleLabelName.SidebarMenuTimerTitle,
    url: pages.timer,
    iconSrc: iconCircleSrc,
  },
  {
    title: LocaleLabelName.SidebarMenuSettingsTitle,
    url: pages.settings,
    iconSrc: iconSettingsSrc,
  },
];

type Props = {
  page: string;
  route: (newPage: string) => void;
};

export const Sidebar = ({ page, route }: Props): JSX.Element => {
  const t = useTranslate();

  const menuLinksWithTranslation = useMemo(
    () => menuLinks.map((link) => ({ ...link, title: t(link.title) })),
    [t]
  );

  return (
    <>
      <Menu links={menuLinksWithTranslation} route={route} currUrl={page} />
      <ColorSchemeSwitcher />
    </>
  );
};
