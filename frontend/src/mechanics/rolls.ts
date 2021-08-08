import _ from "lodash";
import type {Stat} from "./Stat";
import type {ProgressTrack} from "./Progress";
import type {Character} from "./Character";

export enum RollResult {
  StrongHit = "Strong Hit",
  WeakHit = "Weak Hit",
  Miss = "Miss",
}

export type ActionScore = {
  value: number,
  actionDie: number,
  stat: {
    name: string,
    value: number,
  },
  adds: number,
  isMaxed: boolean,
  actionDiceNegated: boolean,
}

export type ActionRoll = {
  move: string,
  stat: {
    name: string,
    value: number,
  },
  actionScore: ActionScore,
  result: RollResult,
  isMatch: boolean,
  momentumAtRoll: number,
  momentumBurned: boolean,
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

export const getResult = (dice1Hit, dice2Hit) => {
  if (dice1Hit && dice2Hit) {
    return RollResult.StrongHit;
  } else if (dice1Hit || dice2Hit) {
    return RollResult.WeakHit;
  } else {
    return RollResult.Miss;
  }
}

export const rollActionRoll = (
  stat: Stat,
  adds: number,
  character: Character,
  move: string,
): ActionRoll => {
  const challengeDice1: number = rollD10();
  const challengeDice2: number = rollD10();
  const actionDie: number = rollD6();
  const momentumAtRoll = character.momentum.current.getValue();
  const actionDiceNegated = momentumAtRoll === -actionDie;

  const unboundedActionScore =
    (actionDiceNegated ? 0 : actionDie) +
    stat.getValue() +
    adds;
  const actionScore: number = Math.min(unboundedActionScore, 10);

  const challengeDice1Hit: boolean = actionScore > challengeDice1;
  const challengeDice2Hit: boolean = actionScore > challengeDice2;

  const result = getResult(challengeDice1Hit, challengeDice2Hit)

  const isMatch: boolean = challengeDice1 === challengeDice2;
  const isMaxed: boolean = unboundedActionScore > actionScore;

  return {
    move,
    stat: {
      value: stat.getValue(),
      name: stat.name,
    },
    actionScore: {
      actionDiceNegated,
      value: actionScore,
      actionDie,
      stat: {
        value: stat.getValue(),
        name: stat.name,
      },
      adds,
      isMaxed,
    },
    momentumAtRoll,
    momentumBurned: false,
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

export type ProgressRoll = {
  progressTrack,
  progressScore: number,
  result: RollResult,
  challengeDice: [
    {
      value: number,
      isHit: boolean,
    },
    {
      value: number,
      isHit: boolean,
    },
  ],
};

export const rollProgressRoll = (track: ProgressTrack): ProgressRoll => {
  const challengeDice1: number = rollD10();
  const challengeDice2: number = rollD10();
  const progressScore: number = track.toProgressScore();

  const challengeDice1Hit: boolean = progressScore > challengeDice1;
  const challengeDice2Hit: boolean = progressScore > challengeDice2;

  let result: RollResult;
  if (challengeDice1Hit && challengeDice2Hit) {
    result = RollResult.StrongHit;
  } else if (challengeDice1Hit || challengeDice2Hit) {
    result = RollResult.WeakHit;
  } else {
    result = RollResult.Miss;
  }

  return {
    progressTrack: track.clone(),
    progressScore,
    result,
    challengeDice: [
      {
        value: challengeDice1,
        isHit: challengeDice1Hit,
      },
      {
        value: challengeDice2,
        isHit: challengeDice2Hit,
      },
    ],
  };
}
