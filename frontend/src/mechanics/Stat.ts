import type {Modifier} from "./Modifier";
import type {Character} from "./Character";

type StatValidator = (stat: Stat, character: Character) => string | undefined;

export class Stat {
  name: string = "";
  baseValue: number = 0;
  modifiers: Modifier[] = [];
  validate: StatValidator = () => undefined;

  static create(props: {
    name: string,
    baseValue?: number,
    modifiers?: Modifier[],
    validate?: StatValidator,
  }): Stat {
    return Object.assign(new Stat(), props);
  }

  public clone(): Stat {
    return Stat.create({
      name: this.name,
      baseValue: this.baseValue,
      modifiers: this.modifiers.map((m) => m.clone()),
      validate: this.validate,
    });
  }

  public getValue(): number {
    return this.modifiers.reduce((acc, m) => m.apply(acc), this.baseValue);
  }
}

export const minMaxValidator = (min?: number, max?: number): StatValidator => (
  (stat: Stat) => {
    if (min !== undefined && stat.getValue() < min) {
      return `Minimum ${min}`;
    }
    if (max !== undefined && stat.getValue() > max) {
      return `Maximum ${min}`;
    }
    return undefined;
  }
);
