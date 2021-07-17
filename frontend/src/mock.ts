import {Character} from "./mechanics/Character";
import {Stat} from "./mechanics/Stat";
import {ChallengeRanks, ProgressTrack} from "./mechanics/Progress";

export const mockCharacter: Character = Character.create({
  name: "Kuno",
  experience: Stat.create({
    baseValue: 2,
  }),
  stats: {
    edge: Stat.create({
      baseValue: 3
    }),
    heart: Stat.create({
      baseValue: 2
    }),
    iron: Stat.create({
      baseValue: 2
    }),
    shadow: Stat.create({
      baseValue: 1
    }),
    wits: Stat.create({
      baseValue: 1
    }),
  },
  statuses: {
    supply: Stat.create({
      baseValue: 3,
    }),
    spirit: Stat.create({
      baseValue: 5,
    }),
    health: Stat.create({
      baseValue: 4,
    }),
  },
  bonds: ProgressTrack.create({
    ticks: 9,
    rank: ChallengeRanks.Epic,
  }),
  vows: [
    ProgressTrack.create({
      name: "Avenge my brother",
      ticks: 2,
      rank: ChallengeRanks.Epic,
    }),
    ProgressTrack.create({
      name: "Find a new home for the refugees",
      ticks: 16,
      rank: ChallengeRanks.Dangerous,
    }),
  ]
});
