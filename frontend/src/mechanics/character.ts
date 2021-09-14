import {calculateValue, minMaxValidator, Stat} from "./stat";
import type {ProgressTrack} from "./progress";
import {ModifierRule, ModifierRules} from "./stat-modifier";

export type Character = {
  id: string,
  name: string,
  experience: number,
  bonds: ProgressTrack,
  stats: {
    edge: Stat,
    heart: Stat,
    iron: Stat,
    shadow: Stat,
    wits: Stat,
  },
  momentum: {
    current: Stat,
    max: Stat,
    min: Stat,
    reset: Stat,
  },
  statuses: {
    health: Stat,
    spirit: Stat,
    supply: Stat,
  },
  debilities: Debilities,
  vows: ProgressTrack[],
};

type Debilities = {
  conditions: {
    wounded: boolean,
    unprepared: boolean,
    shaken: boolean,
    encumbered: boolean,
  },
  banes: {
    maimed: boolean,
    corrupted: boolean,
  },
  burdens: {
    cursed: boolean,
    tormented: boolean,
  },
};

export const countMarkedDebilities = (character: Character): number => {
  const allDebilityValues = [
    ...Object.values(character.debilities.burdens),
    ...Object.values(character.debilities.conditions),
    ...Object.values(character.debilities.banes),
  ];
  return allDebilityValues.filter((v) => v).length;
}

type SerializedCharacter = {
  id: string,
  name: string,
  experience: number,
  bonds: ProgressTrack,
  stats: {
    edgeBaseValue: number,
    heartBaseValue: number,
    ironBaseValue: number,
    shadowBaseValue: number,
    witsBaseValue: number,
  },
  momentum: {
    currentBaseValue: number,
    maxBaseValue: number,
    minBaseValue: number,
    resetBaseValue: number,
  },
  statuses: {
    healthBaseValue: number,
    spiritBaseValue: number,
    supplyBaseValue: number,
  },
  debilities: Debilities,
  vows: ProgressTrack[],
}

export const serializeCharacter = (character: Character): SerializedCharacter => {
  return {
    id: character.id,
    name: character.name,
    experience: character.experience,
    stats: {
      ironBaseValue: character.stats.iron.baseValue,
      heartBaseValue: character.stats.heart.baseValue,
      edgeBaseValue: character.stats.edge.baseValue,
      shadowBaseValue: character.stats.shadow.baseValue,
      witsBaseValue: character.stats.wits.baseValue,
    },
    statuses: {
      healthBaseValue: character.statuses.health.baseValue,
      spiritBaseValue: character.statuses.spirit.baseValue,
      supplyBaseValue: character.statuses.supply.baseValue,
    },
    momentum: {
      currentBaseValue: character.momentum.current.baseValue,
      maxBaseValue: character.momentum.max.baseValue,
      minBaseValue: character.momentum.min.baseValue,
      resetBaseValue: character.momentum.reset.baseValue,
    },
    bonds: character.bonds,
    debilities: character.debilities,
    vows: character.vows,
  }
}

export const deserializeCharacter = (serialized: SerializedCharacter): Character => {
  return {
    id: serialized.id,
    name: serialized.name,
    experience: serialized.experience,
    bonds: serialized.bonds,
    stats: {
      iron: {
        name: "Iron",
        baseValue: serialized.stats.ironBaseValue,
        modifiers: [],
        validator: null,
        increaseValidator: null,
        decreaseValidator: null,
      },
      heart: {
        name: "Heart",
        baseValue: serialized.stats.heartBaseValue,
        modifiers: [],
        validator: null,
        increaseValidator: null,
        decreaseValidator: null,
      },
      edge: {
        name: "Edge",
        baseValue: serialized.stats.edgeBaseValue,
        modifiers: [],
        validator: null,
        increaseValidator: null,
        decreaseValidator: null,
      },
      shadow: {
        name: "Shadow",
        baseValue: serialized.stats.shadowBaseValue,
        modifiers: [],
        validator: null,
        increaseValidator: null,
        decreaseValidator: null,
      },
      wits: {
        name: "Wits",
        baseValue: serialized.stats.witsBaseValue,
        modifiers: [],
        validator: null,
        increaseValidator: null,
        decreaseValidator: null,
      },
    },
    statuses: {
      health: {
        name: "Health",
        baseValue: serialized.statuses.healthBaseValue,
        modifiers: [],
        validator: minMaxValidator(0, 5),
        increaseValidator: (character, value) => {
          if (character.debilities.conditions.wounded) {
            return "Wounded: Cannot increase Health."
          }
          return null;
        },
        decreaseValidator: null,
      },
      spirit: {
        name: "Spirit",
        baseValue: serialized.statuses.spiritBaseValue,
        modifiers: [],
        validator: minMaxValidator(0, 5),
        increaseValidator: (character, value) => {
          if (character.debilities.conditions.shaken) {
            return "Shaken: Cannot increase Spirit."
          }
          return null;
        },
        decreaseValidator: null,
      },
      supply: {
        name: "Supply",
        baseValue: serialized.statuses.supplyBaseValue,
        modifiers: [],
        validator: minMaxValidator(0, 5),
        increaseValidator: (character, value) => {
          if (character.debilities.conditions.unprepared) {
            return "Unprepared: Cannot increase Supply."
          }
          return null;
        },
        decreaseValidator: null,
      },
    },
    momentum: {
      current: {
        name: "Momentum",
        baseValue: serialized.momentum.currentBaseValue,
        validator: (character, value) => (
          minMaxValidator(
            calculateValue(character.momentum.min),
            calculateValue(character.momentum.max),
          )(character, value)
        ),
        modifiers: [],
      },
      max: {
        name: "Max Momentum",
        baseValue: serialized.momentum.maxBaseValue,
        validator: minMaxValidator(-6, 10),
        modifiers: [],
      },
      min: {
        name: "Min Momentum",
        baseValue: serialized.momentum.minBaseValue,
        modifiers: [],
      },
      reset: {
        name: "Momentum Reset",
        baseValue: serialized.momentum.resetBaseValue,
        validator: minMaxValidator(-6, 10),
        modifiers: [],
      },
    },
    vows: serialized.vows,
    debilities: serialized.debilities,
  }
}
