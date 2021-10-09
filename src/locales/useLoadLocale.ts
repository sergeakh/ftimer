import { useCallback, useEffect, useState } from "preact/hooks";

import { LocaleName } from "../Settings/types";
import { noop } from "../utils/common";
import { LocaleLabels } from "./types";

const html = document.documentElement;

const setLang = (lang: string): void => {
  html.lang = lang;
};

type LocaleModule = {
  labels: LocaleLabels;
};

type UseLoadLocaleResult = {
  isReady: boolean;
  localeLabels: LocaleLabels;
};

export const useLoadLocale = (
  enabled: boolean,
  localeName: LocaleName | undefined
): UseLoadLocaleResult => {
  const [isReady, setIsReady] = useState(false);
  const [localeLabels, setLocaleLabels] = useState<LocaleLabels>(
    {} as LocaleLabels
  );

  const loadLocaleLabels = useCallback((load: Promise<LocaleModule>) => {
    const abortController = new AbortController();

    load.then(({ labels }) => {
      setLocaleLabels(labels);

      if (!abortController.signal.aborted) {
        setIsReady(true);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (!enabled || !localeName) return noop;

    setLang(localeName);

    if (localeName === LocaleName.EN) {
      return loadLocaleLabels(import("./en"));
    }

    if (localeName === LocaleName.RU) {
      return loadLocaleLabels(import("./ru"));
    }

    return noop;
  }, [enabled, localeName]);

  return {
    isReady,
    localeLabels,
  };
};
