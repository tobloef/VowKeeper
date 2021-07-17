import {minMaxValidator, Stat} from "./Stat";
import {ChallengeRanks, ProgressTrack} from "./Progress";
import type {Asset} from "./Asset";
import type {Optional} from "../utils";

export class Character {
  name = "";

  bonds = ProgressTrack.create({
    rank: ChallengeRanks.Epic,
  })

  experience = Stat.create({
    validate: minMaxValidator(0, 50),
  });

  stats = {
    edge: Stat.create(),
    heart: Stat.create(),
    iron: Stat.create(),
    shadow: Stat.create(),
    wits: Stat.create(),
  };

  momentum = {
    value: Stat.create({
      baseValue: 2,
      validate: (stat, char) => (
        minMaxValidator(
          char.momentum.min.getValue(),
          char.momentum.max.getValue()
        )(stat, char)
      )
    }),
    max: Stat.create({
      baseValue: 10,
    }),
    min: Stat.create({
      baseValue: -6,
    }),
    reset: Stat.create({
      baseValue: 2,
      validate: minMaxValidator(0),
    }),
  };

  statuses = {
    health: Stat.create({
      baseValue: 5,
      validate: minMaxValidator(0, 5)
    }),
    spirit: Stat.create({
      baseValue: 5,
      validate: minMaxValidator(0, 5)
    }),
    supply: Stat.create({
      baseValue: 5,
      validate: minMaxValidator(0, 5)
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

  static create(props: Optional<Character> = {}): Character {
    return Object.assign(new Character(), props)
  }

  public clone(): Character {
    return Character.create({
      name: this.name,
      experience: this.experience.clone(),
      stats: {
        edge: this.stats.edge.clone(),
        heart: this.stats.heart.clone(),
        iron: this.stats.iron.clone(),
        shadow: this.stats.shadow.clone(),
        wits: this.stats.wits.clone(),
      },
      momentum: {
        value: this.momentum.value.clone(),
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
