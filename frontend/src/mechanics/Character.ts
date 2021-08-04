import {minMaxValidator, Stat} from "./Stat";
import {ChallengeRanks, ProgressTrack} from "./Progress";
import type {Asset} from "./Asset";
import type {Optional} from "../utils";
import {Modifier} from "./Modifier";
import { nanoid } from "nanoid";

export class Character {
  name = "";

  bonds = ProgressTrack.create({
    rank: ChallengeRanks.Epic,
  })

  experience = 0;

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
      validator: (stat) => (
        minMaxValidator(
          this.momentum.min.getValue(),
          this.momentum.max.getValue()
        )(stat)
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
    }),
    spirit: Stat.create({
      name: "Spirit",
      baseValue: 5,
      validator: minMaxValidator(0, 5),
    }),
    supply: Stat.create({
      name: "Supply",
      baseValue: 5,
      validator: minMaxValidator(0, 5),
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
        getDescription: () => `Debilities: -${this.getMarkedDebilitiesCount()} Max Momentum bla bla bla`,
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
        getDescription: () => `Debilities: -2 Momentum Reset bla bla bla`,
        apply: (prev) => prev - 2,
      }),
    },
  ]

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

  static create(props: Optional<Character> = {}): Character {
    return Object.assign(new Character(), props)
  }

  public clone(): Character {
    return Character.create({
      name: this.name,
      experience: this.experience,
      stats: {
        edge: this.stats.edge.clone(),
        heart: this.stats.heart.clone(),
        iron: this.stats.iron.clone(),
        shadow: this.stats.shadow.clone(),
        wits: this.stats.wits.clone(),
      },
      momentum: {
        current: this.momentum.current.clone(),
        min: this.momentum.min.clone(),
        max: this.momentum.max.clone(),
        reset: this.momentum.reset.clone(),
      },
      statuses: {
        health: this.statuses.health.clone(),
        spirit: this.statuses.spirit.clone(),
        supply: this.statuses.supply.clone(),
      },
      debilities: {
        conditions: {
          wounded: this.debilities.conditions.wounded,
          unprepared: this.debilities.conditions.unprepared,
          shaken: this.debilities.conditions.shaken,
          encumbered: this.debilities.conditions.encumbered,
        },
        banes: {
          maimed: this.debilities.banes.maimed,
          corrupted: this.debilities.banes.corrupted,
        },
        burdens: {
          cursed: this.debilities.burdens.cursed,
          tormented: this.debilities.burdens.tormented,
        },
      },
      assets: this.assets.map((a) => a.clone()),
      vows: this.vows.map((v) => v.clone()),
    });
  }
}
