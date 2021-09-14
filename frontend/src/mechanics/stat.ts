import type {StatModifier} from "./stat-modifier";
import type {Character} from "./character";

type StatValidator = (character: Character, value: number) => string | null;

export const StatNames = ["edge", "heart", "iron", "shadow", "wits"];
export type StatName = typeof StatNames[number];

export type Stat = {
  name: StatName;
  baseValue: number;
  modifiers: StatModifier[];
  validator?: StatValidator;
  increaseValidator?: StatValidator;
  decreaseValidator?: StatValidator;
};

export const calculateValue = (stat: Stat): number => {
  return stat.modifiers.reduce((acc, mod) => mod.apply(acc), stat.baseValue);
}

export const validate = (stat: Stat, character: Character): string | null => {
  if (stat.validator === null) {
    return null;
  }

  return stat.validator(character, calculateValue(stat));
}

export const validateIncrease = (stat: Stat, character: Character): string | null => {
  if (stat.validator !== null) {
    const res = stat.validator(character, calculateValue(stat) + 1);
    if (res !== null) {
      return res;
    }
  }

  if (stat.increaseValidator !== null) {
    const res = stat.increaseValidator(character, calculateValue(stat) + 1);
    if (res !== null) {
      return res;
    }
  }

  return null;
}

export const validateDecrease = (stat: Stat, character: Character): string | null => {
  if (stat.validator !== null) {
    const res = stat.validator(character, calculateValue(stat) - 1);
    if (res !== null) {
      return res;
    }
  }

  if (stat.decreaseValidator !== null) {
    const res = stat.decreaseValidator(character, calculateValue(stat) - 1);
    if (res !== null) {
      return res;
    }
  }

  return null;
}

export const minMaxValidator = (min?: number, max?: number): StatValidator => (
  (character: Character, value: number) => {
    if (min !== null && value < min) {
      return `Minimum ${min}`;
    }
    if (max !== null && value > max) {
      return `Maximum ${max}`;
    }
    return null;
  }
);
