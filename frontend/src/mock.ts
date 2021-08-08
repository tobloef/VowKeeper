import {Character} from "./mechanics/Character";
import {ChallengeRanks} from "./mechanics/Progress";
import {nanoid} from "nanoid";

export const mockCharacter: Character = Character.deserialize({
  name: "Kuno",
  experience: 2,
  stats: {
    edgeBaseValue: 3,
    heartBaseValue: 2,
    ironBaseValue: 2,
    shadowBaseValue: 1,
    witsBaseValue: 1,
  },
  statuses: {
    supplyBaseValue: 3,
    spiritBaseValue: 5,
    healthBaseValue: 4,
  },
  bondsTicks: 9,
  vows: [
    {
      name: "Avenge my brother",
      ticks: 2,
      rank: ChallengeRanks.Epic,
    },
    {
      name: "Find a new home for the refugees",
      ticks: 16,
      rank: ChallengeRanks.Dangerous,
    },
  ],
  debilities: {
    banes: {
      corrupted: false,
      maimed: false,
    },
    burdens: {
      cursed: false,
      tormented: false,
    },
    conditions: {
      encumbered: false,
      shaken: false,
      unprepared: false,
      wounded: false,
    }
  },
  assets: [],
  momentum: {
    resetBaseValue: 2,
    minBaseValue: -6,
    maxBaseValue: 10,
    currentBaseValue: 2,
  }
});
