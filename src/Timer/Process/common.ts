export const getСircumference = (radius: number): number =>
  radius * 2 * Math.PI;

export const getProgress = (circumference: number, percent: number): number =>
  circumference - percent * circumference;
