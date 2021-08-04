import {writable} from "svelte/store";
import {mockCharacter} from "./mock";
import type {CustomElementType} from "./customElements";

export const characterStore = writable(mockCharacter);

export type LogItem = {
  id: string,
  storeId: string,
  type: CustomElementType,
}

export const logStore = writable<LogItem[]>([]);
