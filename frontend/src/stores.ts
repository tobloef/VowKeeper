import {Writable, writable} from 'svelte/store';

const elementStores: { [key: string]: Writable<any> } = {};

export enum ElementType {
  CoolComponent,
}

export const getElementStore = <T>(id: string, defaultValue: T): Writable<T> => {
  if (elementStores[id] === undefined) {
    elementStores[id] = writable(defaultValue);
  }
  return elementStores[id];
}

export const dragElement = writable<undefined | {
  id: string,
  type: ElementType,
}>(undefined)
