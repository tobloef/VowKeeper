import {minMaxValidator, Stat} from "./Stat";
import {ChallengeRanks, ProgressTrack, SerializedProgressTrack} from "./Progress";
import {Asset, SerializedAsset} from "./Asset";
import {Modifier} from "./Modifier";
import {identity} from "../utils";

type SerializedCharacter = {
  name: string,
  experience: number,
  bondsTicks: number,
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
  debilities: {
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
  },
  assets: SerializedAsset[],
  vows: SerializedProgressTrack[],
}

export class Character {
  name = "";

  experience = 0;

  bonds = ProgressTrack.create({
    rank: ChallengeRanks.Epic,
  })

  stats = {
    edge: Stat.create({
      name: "Edge",
    }),
    heart: Stat.create({
      name: "Heart",
    }),
    iron: Stat.create({
      name: "Iron",
    }),
    shadow: Stat.create({
      name: "Shadow",
    }),
    wits: Stat.create({
      name: "Wits",
    }),
  };

  momentum = {
    current: Stat.create({
      name: "Momentum",
      baseValue: 2,
      validator: (character, value) => (
        minMaxValidator(
          this.momentum.min.getValue(),
          this.momentum.max.getValue()
        )(character, value)
      ),
    }),
    max: Stat.create({
      name: "Max Momentum",
      baseValue: 10,
      validator: minMaxValidator(-6, 10),
    }),
    min: Stat.create({
      name: "Min Momentum",
      baseValue: -6,
    }),
    reset: Stat.create({
      name: "Momentum Reset",
      baseValue: 2,
      validator: minMaxValidator(-6, 10),
    }),
  };

  statuses = {
    health: Stat.create({
      name: "Health",
      baseValue: 5,
      validator: minMaxValidator(0, 5),
      increaseValidator: (character, value) => {
        if (character.debilities.conditions.wounded) {
          return "Wounded: Cannot increase Health."
        }
        return undefined;
      },
    }),
    spirit: Stat.create({
      name: "Spirit",
      baseValue: 5,
      validator: minMaxValidator(0, 5),
      increaseValidator: (character, value) => {
        if (character.debilities.conditions.shaken) {
          return "Shaken: Cannot increase Spirit."
        }
        return undefined;
      },
    }),
    supply: Stat.create({
      name: "Supply",
      baseValue: 5,
      validator: minMaxValidator(0, 5),
      increaseValidator: (character, value) => {
        if (character.debilities.conditions.unprepared) {
          return "Unprepared: Cannot increase Supply."
        }
        return undefined;
      },
    }),
  };

  debilities = {
    conditions: {
      wounded: false,
      unprepared: false,
      shaken: false,
      encumbered: false,
    },
    banes: {
      maimed: false,
      corrupted: false,
    },
    burdens: {
      cursed: false,
      tormented: false,
    },
  };

  assets: Asset[] = [];

  vows: ProgressTrack[] = [];

  modifierRules = [
    {
      check: () => this.getMarkedDebilitiesCount() > 0,
      stat: this.momentum.max,
      modifier: Modifier.create({
        id: "debilities_max_momentum",
        getDescription: () => `Debilities: -${this.getMarkedDebilitiesCount()} Max Momentum`,
        apply: (prev) => prev - this.getMarkedDebilitiesCount(),
      }),
    },
    {
      check: () => this.getMarkedDebilitiesCount() === 1,
      stat: this.momentum.reset,
      modifier: Modifier.create({
        id: "debilities_1_momentum_reset",
        getDescription: () => `Debilities: -1 Momentum Reset`,
        apply: (prev) => prev - 1,
      }),
    },
    {
      check: () => this.getMarkedDebilitiesCount() >= 2,
      stat: this.momentum.reset,
      modifier: Modifier.create({
        id: "debilities_2_momentum_reset",
        getDescription: () => `Debilities: -2 Momentum Reset`,
        apply: (prev) => prev - 2,
      }),
    },
    {
      check: () => this.debilities.conditions.wounded,
      stat: this.statuses.health,
      modifier: Modifier.create({
        id: "wounded_health_increase",
        getDescription: () => `Wounded: Cannot increase Health`,
        apply: identity,
      }),
    },
    {
      check: () => this.debilities.conditions.shaken,
      stat: this.statuses.spirit,
      modifier: Modifier.create({
        id: "shaken_spirit_increase",
        getDescription: () => `Shaken: Cannot increase Spirit`,
        apply: identity,
      }),
    },
    {
      check: () => this.debilities.conditions.unprepared,
      stat: this.statuses.supply,
      modifier: Modifier.create({
        id: "unprepared_supply_increase",
        getDescription: () => `Unprepared: Cannot increase Supply`,
        apply: identity,
      }),
    },
  ]

  public resetMomentum(): void {
    this.momentum.current.baseValue = this.momentum.reset.getValue();
  }

  private getMarkedDebilitiesCount(): number {
    const allDebilityValues = [
      ...Object.values(this.debilities.burdens),
      ...Object.values(this.debilities.conditions),
      ...Object.values(this.debilities.banes),
    ];
    return allDebilityValues.filter((v) => v).length;
  }

  public updateModifiers(): void {
    this.modifierRules.forEach(({check, stat, modifier}) => {
      stat.modifiers = stat.modifiers.filter((m) => m.id !== modifier.id);
      if (check()) {
        stat.modifiers = [...stat.modifiers, modifier];
      }
    })
  }

  public serialize(): SerializedCharacter {
    return {
      name: this.name,
      experience: this.experience,
      bondsTicks: this.bonds.ticks,
      stats: {
        edgeBaseValue: this.stats.edge.baseValue,
        heartBaseValue: this.stats.heart.baseValue,
        ironBaseValue: this.stats.iron.baseValue,
        shadowBaseValue: this.stats.shadow.baseValue,
        witsBaseValue: this.stats.wits.baseValue,
      },
      statuses: {
        healthBaseValue: this.statuses.health.baseValue,
        spiritBaseValue: this.statuses.spirit.baseValue,
        supplyBaseValue: this.statuses.supply.baseValue,
      },
      momentum: {
        currentBaseValue: this.momentum.current.baseValue,
        maxBaseValue: this.momentum.max.baseValue,
        minBaseValue: this.momentum.min.baseValue,
        resetBaseValue: this.momentum.reset.baseValue,
      },
      debilities: this.debilities,
      assets: this.assets.map((a) => a.serialize()),
      vows: this.vows.map((v) => v.serialize()),
    }
  }

  static deserialize(serialized: SerializedCharacter): Character {
    const char = new Character();

    char.name = serialized.name;
    char.experience = serialized.experience;
    char.bonds.ticks = serialized.bondsTicks;
    char.stats.edge.baseValue = serialized.stats.edgeBaseValue;
    char.stats.heart.baseValue = serialized.stats.heartBaseValue;
    char.stats.iron.baseValue = serialized.stats.ironBaseValue;
    char.stats.shadow.baseValue = serialized.stats.shadowBaseValue;
    char.stats.wits.baseValue = serialized.stats.witsBaseValue;
    char.statuses.health.baseValue = serialized.statuses.healthBaseValue;
    char.statuses.spirit.baseValue = serialized.statuses.spiritBaseValue;
    char.statuses.supply.baseValue = serialized.statuses.supplyBaseValue;
    char.momentum.current.baseValue = serialized.momentum.currentBaseValue;
    char.momentum.max.baseValue = serialized.momentum.maxBaseValue;
    char.momentum.min.baseValue = serialized.momentum.minBaseValue;
    char.momentum.reset.baseValue = serialized.momentum.resetBaseValue;
    char.debilities = serialized.debilities;
    char.assets = serialized.assets.map((a) => Asset.deserialize(a));
    char.vows = serialized.vows.map((v) => ProgressTrack.deserialize(v));

    return char;
  }

  public clone(): Character {
    return Character.deserialize(this.serialize());
  }
}
