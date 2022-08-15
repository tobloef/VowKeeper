export type ChallengeRank = {
  name: string,
  ticksPerProgress: number,
}

export const ChallengeRanks = {
  Troublesome: {
    name: "Troublesome",
    ticksPerProgress: 3 * 4,
  },
  Dangerous: {
    name: "Dangerous",
    ticksPerProgress: 2 * 4,
  },
  Formidable: {
    name: "Formidable",
    ticksPerProgress: 1 * 4,
  },
  Extreme: {
    name: "Extreme",
    ticksPerProgress: 2,
  },
  Epic: {
    name: "Epic",
    ticksPerProgress: 1,
  },
}

export type ProgressTrack = {
  name: string;
  rank: ChallengeRank;
  ticks: number;
}

export const progressTrackToReadable = (track: ProgressTrack): string => {
  const progress = Math.floor(track.ticks / 4);
  const ticks = track.ticks % 4;
  let str = "";
  if (progress > 0) {
    str += `${progress} progress`;
  }
  if (progress > 0 && ticks > 0) {
    str += " and ";
  }
  if (ticks > 0) {
    str += `${ticks} ticks`;
  }
  return str;
}

export const progressTrackToScore = (track: ProgressTrack): number => {
  return Math.floor(track.ticks / 4);
}
