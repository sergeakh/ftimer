export const getProgress = (circumference: number, percent: number): number =>
  circumference - percent * circumference;
