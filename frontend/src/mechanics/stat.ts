import type {StatModifier} from "./stat-modifier";
import type {Character} from "./character";

type StatValidator = (character: Character, value: number) => string | undefined;

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

export const validate = (stat: Stat, character: Character): string | undefined => {
  if (stat.validator === undefined) {
    return undefined;
  }

  return stat.validator(character, calculateValue(stat));
}

export const validateIncrease = (stat: Stat, character: Character): string | undefined => {
  if (stat.validator !== undefined) {
    const res = stat.validator(character, calculateValue(stat) + 1);
    if (res !== undefined) {
      return res;
    }
  }

  if (stat.increaseValidator !== undefined) {
    const res = stat.increaseValidator(character, calculateValue(stat) + 1);
    if (res !== undefined) {
      return res;
    }
  }

  return undefined;
}

export const validateDecrease = (stat: Stat, character: Character): string | undefined => {
  if (stat.validator !== undefined) {
    const res = stat.validator(character, calculateValue(stat) - 1);
    if (res !== undefined) {
      return res;
    }
  }

  if (stat.decreaseValidator !== undefined) {
    const res = stat.decreaseValidator(character, calculateValue(stat) - 1);
    if (res !== undefined) {
      return res;
    }
  }

  return undefined;
}

export const minMaxValidator = (min?: number, max?: number): StatValidator => (
  (character: Character, value: number) => {
    if (min !== undefined && value < min) {
      return `Minimum ${min}`;
    }
    if (max !== undefined && value > max) {
      return `Maximum ${max}`;
    }
    return undefined;
  }
);
