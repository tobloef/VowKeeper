import _ from "lodash";

export type OneToSix = 1 | 2 | 3 | 4 | 5 | 6;
export type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ZeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type StatType =
  | "edge"
  | "heart"
  | "iron"
  | "shadow"
  | "wits"

export type ActionRollResult =
  | "strong hit"
  | "weak hit"
  | "miss";

export type Stat = {
  type: StatType,
  value: number,
};

export type ActionScore = {
  value: number,
  actionDie: OneToSix,
  stat: Stat,
  adds: number,
  isMaxed: boolean,
}

export type ActionRoll = {
  actionScore: ActionScore,
  result: ActionRollResult,
  isMatch: boolean,
  challengeDice: [
    {
      value: OneToTen,
      isHit: boolean,
    },
    {
      value: OneToTen,
      isHit: boolean,
    },
  ]
}

const rollD10 = (): OneToTen => _.random(1, 10) as OneToTen;
const rollD6 = (): OneToSix => _.random(1, 6) as OneToSix;

export const rollActionRoll = (stat: Stat, adds: number): ActionRoll => {
  const challengeDice1: OneToTen = rollD10();
  const challengeDice2: OneToTen = rollD10();
  const actionDie: OneToSix = rollD6();
  const unboundedActionScore = actionDie + stat.value + adds;
  const actionScore: number = Math.min(unboundedActionScore, 10);

  const challengeDice1Hit: boolean = actionScore > challengeDice1;
  const challengeDice2Hit: boolean = actionScore > challengeDice2;

  let result: ActionRollResult;
  if (challengeDice1Hit && challengeDice2Hit) {
    result = "strong hit";
  } else if (challengeDice1Hit || challengeDice2Hit) {
    result = "weak hit";
  } else {
    result = "miss";
  }

  const isMatch: boolean = challengeDice1 === challengeDice2;
  const isMaxed: boolean = unboundedActionScore > actionScore;

  return {
    actionScore: {
      value: actionScore,
      actionDie,
      stat,
      adds,
      isMaxed,
    },
    result,
    isMatch,
    challengeDice: [
      {
        value: challengeDice1,
        isHit: challengeDice1Hit,
      },
      {
        value: challengeDice2,
        isHit: challengeDice2Hit,
      },
    ]
  }
}
