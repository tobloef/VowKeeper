export type Optional<T> = {
  [P in keyof T]?: T[P];
};

export const identity = <T>(x: T): T => x;

export const noop = () => {
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatNumber = (x: number, showSign: boolean = true) => {
  if (!showSign || x <= 0) {
    return String(x);
  }
  return `+${x}`;
}

export const possessiveForm = (str) => {
  if (str.toLowerCase().endsWith("s")) {
    return str + '\'';
  }

  return str + '\'s'
};
