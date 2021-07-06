import _ from "lodash";

export type OneToSix = 1 | 2 | 3 | 4 | 5 | 6;

export type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export StatType =
  | "edge"
  | "heart"
  | "iron"
  | "shadow"
  | "wits"

export type ActionRollResult =
  | "strong hit"
  | "weak hit"
  | "miss";

export type ActionRoll = {
  actionDie: OneToSix,
  stat: {
    type: StatType,
    value: number,
  },
  add: number,
  actionScore: number,
  result: ActionRollResult,
  isMatch: boolean,
  isMaxed: boolean,
  challengeDice: [
    {
      roll: OneToTen,
      isHit: boolean,
    },
    {
      roll: OneToTen,
      isHit: boolean,
    },
  ]
}

const rollD10 = (): OneToTen => _.random(1, 10);
const rollD6 = (): OneToSix => _.random(1, 6);

const actionRoll = (stat, adds): ActionRoll => {
  const challengeDice1: OneToTen = rollD10();
  const challengeDice2: OneToTen = rollD10();
  const actionDie: OneToSix = rollD6();
  const unboundedActionScore = actionDie + stat + adds;
  const actionScore: number = Math.min(unboundedActionScore, 10);

  const challengeDice1Hit: boolean = actionDie > challengeDice1;
  const challengeDice2Hit: boolean = actionDie > challengeDice2;

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
    actionDie,
    actionScore,
    result,
    isMatch,
    isMaxed,
    challengeDice: [
      {
        roll: challengeDice1,
        isHit: challengeDice1Hit,
      },
      {
        roll: challengeDice2,
        isHit: challengeDice2Hit,
      },
    ]
  }
}
