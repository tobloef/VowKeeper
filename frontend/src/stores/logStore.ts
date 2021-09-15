import {Writable, writable} from "svelte/store";
import type {ActionRoll} from "../mechanics/rolls";
import ActionRollCardLogItem from "../components/action-roll-card/ActionRollCardLogItem.svelte";
import {nanoid} from "nanoid";

export enum LogItemType {
  ActionRoll,
}

type BaseLogItem = {
  id: string,
  dateCreated: Date,
  type: LogItemType,
  props: object
}

export type ActionRollLogItem = BaseLogItem & {
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

export const createLogItem = <T extends LogItem>(type: T['type'], props: T['props']): {
  dateCreated: Date;
  id: string;
  type: T["type"];
  props: T["props"];
} => ({
  id: nanoid(),
  type,
  dateCreated: new Date(),
  props,
})

