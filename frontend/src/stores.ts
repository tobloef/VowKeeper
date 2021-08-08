import {Writable, writable} from "svelte/store";
import {mockCharacter} from "./mock";
import type {CustomElementType} from "./customElements";
import type {Character} from "./mechanics/Character";
import type {ActionRoll} from "./mechanics/rolls";

export type CharacterStore = Writable<Character> & {
  id: string,
};

const createCharacterStore = (id, initialValue: Character): CharacterStore => {
  const { subscribe, update, set } = writable<Character>(initialValue);

  return {
    id,
    subscribe,
    update,
    set,
  }
}

let characterStores: { [key: string]: CharacterStore } = {
  "mock": createCharacterStore("mock", mockCharacter),
};

export const getCharacterStore = (characterStoreId) => {
  return characterStores[characterStoreId];
}

export type LogItem = {
  id: string,
  storeId: string,
  type: CustomElementType,
}

export const logStore = writable<LogItem[]>([]);

export type ActionRollCardStoreProps = {
  characterStoreId: string,
  roll: ActionRoll,
}
