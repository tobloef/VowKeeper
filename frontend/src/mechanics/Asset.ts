export class Asset {
  name: string;

  static create(props: {
    name: string,
  }) {
    return Object.assign(new Asset(), props);
  }

  public clone(): Asset {
    return Asset.create({
      name: this.name,
    });
  }
}
