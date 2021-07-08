import _ from "lodash";

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
  actionDie: number,
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
      value: number,
      isHit: boolean,
    },
    {
      value: number,
      isHit: boolean,
    },
  ]
}

const rollD10 = (): number => _.random(1, 10);
const rollD6 = (): number => _.random(1, 6);

export const rollActionRoll = (stat: Stat, adds: number): ActionRoll => {
  const challengeDice1: number = rollD10();
  const challengeDice2: number = rollD10();
  const actionDie: number = rollD6();
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
