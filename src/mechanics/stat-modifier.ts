import _ from "lodash";
import {Character, countMarkedDebilities} from "./character";
import type {Stat} from "./stat";

export type StatModifier = {
  id: string;
  getDescription: () => string;
  apply: (original: number) => number;
}

export type ModifierRule = (character: Character) => boolean;

const createModifierRule = ({
  getModifier,
  check,
  getStat,
}: {
  getModifier: (char: Character) => StatModifier,
  check: (char: Character) => boolean,
  getStat: (char: Character) => Stat,
}) => {
  return (character: Character): boolean => {
    const stat = getStat(character);
    const modifier = getModifier(character);

    const hasTheModifier = stat.modifiers.some((m) => m.id === modifier.id);
    const shouldApply = check(character);

    if (hasTheModifier && !shouldApply) {
      stat.modifiers = stat.modifiers.filter((m) => m.id !== modifier.id);
      return true;
    }

    if (!hasTheModifier && shouldApply) {
      stat.modifiers.push(modifier);
      return true;
    }

    return false;
  };
}

export const ModifierRules: ModifierRule[] = [
  createModifierRule({
    getModifier: (char) => ({
      id: "debilities_max_momentum",
      getDescription: () => `Debilities: -${countMarkedDebilities(char)} Max Momentum`,
      apply: (prev) => prev - countMarkedDebilities(char),
    }),
    getStat: (char) => char.momentum.max,
    check: (char) => countMarkedDebilities(char) > 0,
  }),

  createModifierRule({
    getModifier: (char) => ({
      id: "debilities_1_momentum_reset",
      getDescription: () => `Debilities: -1 Momentum Reset`,
      apply: (prev) => prev - 1,
    }),
    getStat: (char) => char.momentum.reset,
    check: (char) => countMarkedDebilities(char) === 1,
  }),

  createModifierRule({
    getModifier: (char) => ({
      id: "debilities_2+_momentum_reset",
      getDescription: () => `Debilities: -2 Momentum Reset`,
      apply: (prev) => prev - 2,
    }),
    getStat: (char) => char.momentum.reset,
    check: (char) => countMarkedDebilities(char) >= 2,
  }),

  createModifierRule({
    getModifier: (char) => ({
      id: "wounded_health_increase",
      getDescription: () => `Wounded: Cannot increase Health`,
      apply: (prev) => prev,
    }),
    getStat: (char) => char.statuses.health,
    check: (char) => char.debilities.conditions.wounded,
  }),

  createModifierRule({
    getModifier: (char) => ({
      id: "shaken_spirit_increase",
      getDescription: () => `Shaken: Cannot increase Spirit`,
      apply: (prev) => prev,
    }),
    getStat: (char) => char.statuses.spirit,
    check: (char) => char.debilities.conditions.shaken,
  }),

  createModifierRule({
    getModifier: (char) => ({
      id: "unprepared_supply_increase",
      getDescription: () => `Unprepared: Cannot increase Supply`,
      apply: (prev) => prev,
    }),
    getStat: (char) => char.statuses.supply,
    check: (char) => char.debilities.conditions.unprepared,
  }),
];
