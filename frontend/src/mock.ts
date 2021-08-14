import {Character, deserializeCharacter} from "./mechanics/character";
import {ChallengeRanks} from "./mechanics/progress";

export const mockCharacter: Character = deserializeCharacter({
  id: "mock",
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
  bonds: {
    ticks: 9,
    rank: ChallengeRanks.Epic,
    name: "Bonds",
  },
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
  momentum: {
    resetBaseValue: 2,
    minBaseValue: -6,
    maxBaseValue: 10,
    currentBaseValue: 2,
  }
});
