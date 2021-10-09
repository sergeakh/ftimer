import { createContext } from "preact";

import { LocaleLabels } from "./types";

export const LocaleContext = createContext<LocaleLabels>({} as LocaleLabels);
