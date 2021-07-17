import {minMaxValidator, Stat} from "./Stat";
import {ChallengeRanks, ProgressTrack} from "./Progress";
import type {Asset} from "./Asset";

export class Character {
  name = "";

  bonds = ProgressTrack.create({
    name: "Bonds",
    rank: ChallengeRanks.Epic,
  })

  experience = Stat.create({
    name: "Experience",
    validate: minMaxValidator(0, 50),
  });

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
    value: Stat.create({
      name: "Momentum",
      baseValue: 2,
      validate: (stat, char) => (
        minMaxValidator(
          char.momentum.min.getValue(),
          char.momentum.max.getValue()
        )(stat, char)
      )
    }),
    max: Stat.create({
      name: "Maximum Momentum",
      baseValue: 10,
    }),
    min: Stat.create({
      name: "Minimum Momentum",
      baseValue: -6,
    }),
    reset: Stat.create({
      name: "Momentum Reset",
      baseValue: 2,
      validate: minMaxValidator(0),
    }),
  };

  statuses = {
    health: Stat.create({
      name: "Health",
      baseValue: 5,
      validate: minMaxValidator(0, 5)
    }),
    spirit: Stat.create({
      name: "Spirit",
      baseValue: 5,
      validate: minMaxValidator(0, 5)
    }),
    supply: Stat.create({
      name: "Supply",
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

  assets = [];

  static create(props?: {
    name: string,
    experience: Stat,
    stats: {
      edge: Stat,
      heart: Stat,
      iron: Stat,
      shadow: Stat,
      wits: Stat,
    },
    momentum: {
      value: Stat,
      min: Stat,
      max: Stat,
      reset: Stat,
    },
    statuses: {
      health: Stat,
      spirit: Stat,
      supply: Stat,
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
    assets: Asset[]
  }): Character {
    return Object.assign(new Character(), props ?? {})
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
      assets: this.assets.map((a) => a.clone())
    });
  }
}
