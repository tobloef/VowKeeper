import App from './App.svelte';
import {getCharacterStore} from "./stores/characterStore";
import {logStore} from "./stores/logStore";
import {deserializeCharacter, serializeCharacter} from "./mechanics/character";

const app = new App({
  target: document.body,
});

const characterId = "mock";

const characterKey = `character_${characterId}`;
const logKey = "log";

const existingCharacterJson = localStorage.getItem(characterKey);
const existingLogJson = localStorage.getItem(logKey);

const characterStore = getCharacterStore(characterId);

if (existingCharacterJson != null) {
  const existingCharacter = deserializeCharacter(JSON.parse(existingCharacterJson));
  characterStore.set(existingCharacter);
}

if (existingLogJson != null) {
  logStore.set(JSON.parse(existingLogJson));
}

logStore.subscribe((newLog) => {
  localStorage.setItem(logKey, JSON.stringify(newLog));
});

getCharacterStore(characterId).subscribe((newChar) => {
  const serializedCharacter = serializeCharacter(newChar);
  localStorage.setItem(characterKey, JSON.stringify(serializedCharacter));
});
