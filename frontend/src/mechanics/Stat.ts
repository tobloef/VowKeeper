import type {Modifier} from "./Modifier";
import type {Character} from "./Character";

type StatValidator = (character: Character, value: number) => string | undefined;

export class Stat {
  name: string = "";
  baseValue: number = 0;
  modifiers: Modifier[] = [];
  validator: StatValidator | undefined;
  increaseValidator: StatValidator | undefined;
  decreaseValidator: StatValidator | undefined;

  static create(props: {
    baseValue?: number,
    modifiers?: Modifier[],
    validator?: StatValidator,
    increaseValidator? : StatValidator,
    decreaseValidator? : StatValidator,
    name?: string,
  } = {}): Stat {
    return Object.assign(new Stat(), props);
  }

  public clone(): Stat {
    return Stat.create({
      baseValue: this.baseValue,
      modifiers: this.modifiers.map((m) => m.clone()),
      validator: this.validator,
      increaseValidator: this.increaseValidator,
      decreaseValidator: this.decreaseValidator,
      name: this.name,
    });
  }

  public getValue(): number {
    return this.modifiers.reduce((acc, m) => m.apply(acc), this.baseValue);
  }

  public validate(character: Character): string | undefined {
    if (this.validator === undefined) {
      return undefined;
    }

    return this.validator(character, this.getValue());
  }

  public validateIncrease(character: Character): string | undefined {
    if (this.validator !== undefined) {
      const res = this.validator(character, this.getValue() + 1);
      if (res !== undefined) {
        return res;
      }
    }

    if (this.increaseValidator !== undefined) {
      const res = this.increaseValidator(character, this.getValue() + 1);
      if (res !== undefined) {
        return res;
      }
    }

    return undefined;
  }

  public validateDecrease(character: Character): string | undefined {
    if (this.validator !== undefined) {
      const res = this.validator(character, this.getValue() - 1);
      if (res !== undefined) {
        return res;
      }
    }

    if (this.decreaseValidator !== undefined) {
      const res = this.decreaseValidator(character, this.getValue() - 1);
      if (res !== undefined) {
        return res;
      }
    }

    return undefined;
  }
}

export const minMaxValidator = (min?: number, max?: number): StatValidator => (
  (character: Character, value: number) => {
    if (min !== undefined && value < min) {
      return `Minimum ${min}`;
    }
    if (max !== undefined && value > max) {
      return `Maximum ${max}`;
    }
    return undefined;
  }
);
