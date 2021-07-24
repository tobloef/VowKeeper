import {writable} from "svelte/store";
import {mockCharacter} from "./mock";

export const characterStore = writable(mockCharacter);

export const logStore = writable([]);
