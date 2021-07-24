export type Optional<T> = {
  [P in keyof T]?: T[P];
};

export const identity = <T>(x: T): T => x;

export const noop = () => {};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
