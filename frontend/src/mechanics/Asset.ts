export type SerializedAsset = {
  name: string,
}

export class Asset {
  name: string;

  static create(props: {
    name: string,
  }) {
    return Object.assign(new Asset(), props);
  }

  public serialize(): SerializedAsset {
    return {
      name: this.name,
    }
  }

  static deserialize(serialized: SerializedAsset): Asset {
    return Asset.create({
      name: serialized.name,
    });
  }

  public clone(): Asset {
    return Asset.deserialize(this.serialize());
  }
}
