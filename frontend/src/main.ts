import App from './App.svelte';
import {getCharacterStore} from "./stores/characterStore";
import {logStore} from "./stores/logStore";

const app = new App({
  target: document.body,
});

getCharacterStore("mock").subscribe((newChar) => console.log("newChar", newChar));
logStore.subscribe((newLog) => console.log("newLog", newLog));

export default app;
