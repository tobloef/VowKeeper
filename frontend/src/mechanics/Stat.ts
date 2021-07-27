import type {Modifier} from "./Modifier";
import type {Character} from "./Character";

type StatValidator = (stat: Stat) => string | undefined;

export class Stat {
  baseValue: number = 0;
  modifiers: Modifier[] = [];
  validator: StatValidator = () => undefined;
  name: string = "";

  static create(props: {
    baseValue?: number,
    modifiers?: Modifier[],
    validator?: StatValidator,
    name?: string,
  } = {}): Stat {
    return Object.assign(new Stat(), props);
  }

  public clone(): Stat {
    return Stat.create({
      baseValue: this.baseValue,
      modifiers: this.modifiers.map((m) => m.clone()),
      validator: this.validator,
      name: this.name,
    });
  }

  public getValue(): number {
    return this.modifiers.reduce((acc, m) => m.apply(acc), this.baseValue);
  }

  public validate(character: Character, baseValueOverride?: number): string | undefined {
    if (this.validator === undefined) {
      return undefined;
    }

    if (baseValueOverride !== undefined) {
      const clonedStat = this.clone();
      clonedStat.baseValue = baseValueOverride;
      return this.validator(clonedStat);
    }

    return this.validator(this);
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
