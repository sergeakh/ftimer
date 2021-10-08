// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop: () => void = () => {};

export const SEC = 1000;
const MS_PER_SEC = 1000;
const SEC_PER_MIN = 60;
const MS_PER_MIN = SEC_PER_MIN * MS_PER_SEC;

/**
 *
 * @param time - ms
 * @return {number}
 */
export const normalizeTime = (time: number): number =>
  Math.round(time / 1000) * 1000;

/**
 *
 * @param time - ms
 * @return {string}
 */
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / MS_PER_MIN);
  const seconds = Math.floor((time % MS_PER_MIN) / MS_PER_SEC);

  return [minutes, seconds].map((num) => `${num}`.padStart(2, "0")).join(":");
};

export const getMillisecondsFromMinutes = (minutes: number): number =>
  minutes * MS_PER_MIN;

export const getСircumference = (radius: number): number =>
  radius * 2 * Math.PI;
