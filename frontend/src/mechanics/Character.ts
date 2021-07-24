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
    name: "Experience",
    validator: minMaxValidator(0, 50),
    character: this,
  });

  stats = {
    edge: Stat.create({
      name: "Edge",
      character: this,
    }),
    heart: Stat.create({
      name: "Heart",
      character: this,
    }),
    iron: Stat.create({
      name: "Iron",
      character: this,
    }),
    shadow: Stat.create({
      name: "Shadow",
      character: this,
    }),
    wits: Stat.create({
      name: "Wits",
      character: this,
    }),
  };

  momentum = {
    value: Stat.create({
      name: "Momentum",
      baseValue: 2,
      validator: (stat) => (
        minMaxValidator(
          stat.character.momentum.min.getValue(),
          stat.character.momentum.max.getValue()
        )(stat)
      ),
      character: this,
    }),
    max: Stat.create({
      name: "Max Momentum",
      baseValue: 10,
      character: this,
    }),
    min: Stat.create({
      name: "Min Momentum",
      baseValue: -6,
      character: this,
    }),
    reset: Stat.create({
      name: "Momentum Reset",
      baseValue: 2,
      validator: minMaxValidator(0),
      character: this,
    }),
  };

  statuses = {
    health: Stat.create({
      name: "Health",
      baseValue: 5,
      validator: minMaxValidator(0, 5),
      character: this,
    }),
    spirit: Stat.create({
      name: "Spirit",
      baseValue: 5,
      validator: minMaxValidator(0, 5),
      character: this,
    }),
    supply: Stat.create({
      name: "Supply",
      baseValue: 5,
      validator: minMaxValidator(0, 5),
      character: this,
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
