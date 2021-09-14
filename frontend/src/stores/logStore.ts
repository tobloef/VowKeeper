import {Writable, writable} from "svelte/store";
import type {ActionRoll} from "../mechanics/rolls";
import ActionRollCardLogItem from "../components/action-roll-card/ActionRollCardLogItem.svelte";

export enum LogItemType {
  ActionRoll,
}

export type ActionRollLogItem = {
  id: string,
  type: LogItemType.ActionRoll,
  props: {
    roll: ActionRoll,
    characterId: string,
  }
}

export type LogItem =
  | ActionRollLogItem;

const writableStore = writable<LogItem[]>([]);

export const logStore: (
  & Writable<LogItem[]>
  & { addItem: (newItem: LogItem) => void }
  & { replaceItem: (id: string, newItem: LogItem) => void }
) = {
  ...writableStore,
  addItem: (newItem: LogItem): void => {
    writableStore.update((prev: LogItem[]): LogItem[] => [
      ...prev,
      newItem,
    ])
  },
  replaceItem: (id: string, newItem: LogItem): void => {
    writableStore.update((prev: LogItem[]): LogItem[] => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) {
        return prev;
      }
      return [
        ...prev.slice(0, index),
        newItem,
        ...prev.slice(index + 1)
      ];
    });
  },
};

export const getLogItemComponent = (type: LogItemType) => {
  switch (type) {
    case LogItemType.ActionRoll:
      return ActionRollCardLogItem;
    default:
      throw new Error(`Invalid LogItemType "${type}".`);
  }
}
