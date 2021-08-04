export class Modifier {
  id: string;
  getDescription: () => string;
  apply: (original: number) => number;

  static create(props: {
    id: string;
    getDescription: () => string;
    apply: (original: number) => number;
  }): Modifier {
    return Object.assign(new Modifier(), props);
  }

  public clone(): Modifier {
    return Modifier.create(this);
  }
}
