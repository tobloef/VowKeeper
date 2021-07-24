import {Character} from "./mechanics/Character";
import {ChallengeRanks, ProgressTrack} from "./mechanics/Progress";

export const mockCharacter: Character = Character.create();

mockCharacter.name = "Kuno";
mockCharacter.experience.baseValue = 2;
mockCharacter.stats.edge.baseValue = 3;
mockCharacter.stats.heart.baseValue = 2;
mockCharacter.stats.iron.baseValue = 2;
mockCharacter.stats.shadow.baseValue = 1;
mockCharacter.stats.wits.baseValue = 1;
mockCharacter.statuses.supply.baseValue = 3;
mockCharacter.statuses.spirit.baseValue = 5;
mockCharacter.statuses.health.baseValue = 4;
mockCharacter.bonds = ProgressTrack.create({
  ticks: 9,
  rank: ChallengeRanks.Epic,
});
mockCharacter.vows = [
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
];
