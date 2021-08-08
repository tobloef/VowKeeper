import { nanoid } from "nanoid";

type ChallengeRank = {
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

export type SerializedProgressTrack = {
  name: string,
  rank: ChallengeRank,
  ticks: number,
}

export class ProgressTrack {
  name: string = "";
  rank: ChallengeRank;
  ticks: number = 0;

  public serialize(): SerializedProgressTrack {
    return {
      name: this.name,
      rank: this.rank,
      ticks: this.ticks,
    }
  }

  static deserialize(serialized: SerializedProgressTrack): ProgressTrack {
    const track = new ProgressTrack();

    track.name = serialized.name;
    track.rank = serialized.rank;
    track.ticks = serialized.ticks;

    return track;
  }

  public clone(): ProgressTrack {
    return ProgressTrack.deserialize(this.serialize());
  }

  public toReadableProgress(): string {
    const progress = Math.floor(this.ticks / 4);
    const ticks = this.ticks % 4;
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

  public toProgressScore(): number {
    return Math.floor(this.ticks / 4);
  }
}
