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

export class ProgressTrack {
  name: string = "";
  rank: ChallengeRank;
  ticks: number = 0;

  static create(props: {
    rank: ChallengeRank;
    name?: string;
    ticks?: number;
  }): ProgressTrack {
    return Object.assign(new ProgressTrack(), props);
  }

  public clone(): ProgressTrack {
    return ProgressTrack.create(this);
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
