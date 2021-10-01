import { createContext } from "preact";

import { noop } from "../utils/common";

import {
  DEFAULT_FOCUS_DURATION,
  DEFAULT_SHORT_BREAK_DURATION,
  DEFAULT_LONG_BREAK_DURATION,
  DEFAULT_LONG_BREAK_EVERY,
} from "../constants/common";

export type Settings = {
  isReady: boolean;
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakEvery: number;
  setFocusDuration: (newFocusDuration: number) => void;
  setShortBreakDuration: (newShortBreakDuration: number) => void;
  setLongBreakDuration: (newLongBreakDuration: number) => void;
  setLongBreakEvery: (newLongBreakEvery: number) => void;
};

export const SettingsContext = createContext<Settings>({
  isReady: false,
  focusDuration: DEFAULT_FOCUS_DURATION,
  shortBreakDuration: DEFAULT_SHORT_BREAK_DURATION,
  longBreakDuration: DEFAULT_LONG_BREAK_DURATION,
  longBreakEvery: DEFAULT_LONG_BREAK_EVERY,
  setFocusDuration: noop,
  setShortBreakDuration: noop,
  setLongBreakDuration: noop,
  setLongBreakEvery: noop,
});
