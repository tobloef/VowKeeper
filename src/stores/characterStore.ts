import {writable, Writable} from "svelte/store";
import type {Character} from "../mechanics/character";
import {mockCharacter} from "../mock";
import {ModifierRules} from "../mechanics/stat-modifier";

export type CharacterStore = Writable<Character>;

const createCharacterStore = (initialValue: Character): CharacterStore => {
  let characterStore = writable<Character>(initialValue);

  characterStore.subscribe((newChar) => {
    let wasModified = false;

    for (const rule of ModifierRules) {
      wasModified = wasModified || rule(newChar);
    }

    if (wasModified) {
      characterStore.set(newChar);
    }
  })

  return characterStore;
};

let characterStores: { [key: string]: CharacterStore } = {
  [mockCharacter.id]: createCharacterStore(mockCharacter),
};

export const getCharacterStore = (characterId) => {
  return characterStores[characterId];
}

