export type Optional<T> = {
  [P in keyof T]?: T[P];
};

export const identity = <T>(x: T): T => x;

export const noop = () => {};

