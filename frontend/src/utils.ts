export type Optional<T> = {
  [P in keyof T]?: T[P];
};

export const identity = (x) => x;
