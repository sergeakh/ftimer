import { useCallback, useContext } from "preact/hooks";

import { LocaleContext } from "./context";
import { LocaleLabelName } from "./types";

export const useTranslate = (): ((label: LocaleLabelName) => string) => {
  const localeLabels = useContext(LocaleContext);

  const t = useCallback(
    (label: LocaleLabelName) => localeLabels[label] || "",
    [localeLabels]
  );

  return t;
};
