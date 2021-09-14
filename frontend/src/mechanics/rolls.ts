import _ from "lodash";
import type {Stat} from "./stat";
import type {ProgressTrack} from "./progress";
import type {Character} from "./character";
import {calculateValue, StatName} from "./stat";
import {progressTrackToScore} from "./progress";
import {ActionRollLogItem, LogItemType, logStore} from "../stores/logStore";
import {nanoid} from "nanoid";

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
  move?: string,
): ActionRoll => {
  const challengeDice1: number = rollD10();
  const challengeDice2: number = rollD10();
  const actionDie: number = rollD6();
  const momentumAtRoll = calculateValue(character.momentum.current);
  const actionDiceNegated = momentumAtRoll === -actionDie;

  const unboundedActionScore =
    (actionDiceNegated ? 0 : actionDie) +
    calculateValue(stat) +
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
      value: calculateValue(stat),
      name: stat.name,
    },
    actionScore: {
      actionDiceNegated,
      value: actionScore,
      actionDie,
      stat: {
        value: calculateValue(stat),
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
  const progressScore: number = progressTrackToScore(track);

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
    progressTrack: _.cloneDeep(track),
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

export const burnMomentum = (roll, character) => {
  let newRoll: ActionRoll = _.cloneDeep(roll);
  newRoll.momentumBurned = true;
  newRoll.challengeDice = [
    {
      value: newRoll.challengeDice[0].value,
      isHit: (
        newRoll.challengeDice[0].isHit ||
        newRoll.momentumAtRoll > newRoll.challengeDice[0].value
      ),
    },
    {
      value: newRoll.challengeDice[1].value,
      isHit: (
        newRoll.challengeDice[1].isHit ||
        newRoll.momentumAtRoll > newRoll.challengeDice[1].value
      ),
    }
  ]
  newRoll.result = getResult(
    newRoll.challengeDice[0].isHit,
    newRoll.challengeDice[1].isHit,
  );

  const newCharacter: Character = _.cloneDeep(character);
  newCharacter.momentum.current.baseValue = calculateValue(newCharacter.momentum.reset);

  return {
    newRoll,
    newCharacter,
  }
};

export const considerBurningMomentum = (roll) => {
  let resultIfBurnMomentum;

  const challengeDice1Hit: boolean = roll.momentumAtRoll > roll.challengeDice[0].value;
  const challengeDice2Hit: boolean = roll.momentumAtRoll > roll.challengeDice[1].value;
  if (challengeDice1Hit && challengeDice2Hit) {
    resultIfBurnMomentum = RollResult.StrongHit;
  } else if (challengeDice1Hit || challengeDice2Hit) {
    resultIfBurnMomentum = RollResult.WeakHit;
  } else {
    resultIfBurnMomentum = RollResult.Miss;
  }

  const canUpgradeResult = (
    (roll.result === RollResult.Miss && resultIfBurnMomentum !== RollResult.Miss) ||
    (roll.result === RollResult.WeakHit && resultIfBurnMomentum === RollResult.StrongHit)
  );

  return {
    resultIfBurnMomentum,
    canUpgradeResult,
  }
}

export const makeStatRoll = (character: Character, statName: StatName, adds: number): void => {
  const stat: Stat = character.stats[statName];
  const roll = rollActionRoll(stat, adds, character);

  const actionRollLogItem: ActionRollLogItem = {
    id: nanoid(),
    type: LogItemType.ActionRoll,
    props: {
      roll,
      characterId: character.id,
    },
  };

  logStore.addItem(actionRollLogItem);
}
