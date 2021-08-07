import {get, Writable, writable} from 'svelte/store';
import {Extension, mergeAttributes, Node} from "@tiptap/core";
import {Plugin} from "prosemirror-state";
import ActionRollCard from "./custom-elements/ActionRollCardElement.svelte";

const customElementStores: { [key: string]: Writable<any> } = {};

export enum CustomElementType {
  ActionRollCard,
}

export const getCustomElementStore = <T>(storeId: string, defaultValue: T = {} as T): Writable<T> => {
  if (customElementStores[storeId] === undefined) {
    customElementStores[storeId] = writable(defaultValue);
  }
  return customElementStores[storeId];
}

const draggedCustomElementStore = writable<undefined | {
  storeId: string,
  type: CustomElementType,
}>(undefined)

export const draggableElement = <T>(node, {canDropInsert, storeId, type}) => {
  if (!canDropInsert) {
    return {};
  }

  const handleDragStart = () => {
    draggedCustomElementStore.set({storeId, type})
  };

  const handleDragEnd = () => {
    draggedCustomElementStore.set(undefined)
  };

  node.style.userSelect = "none";
  node.setAttribute("draggable", "true");
  node.addEventListener("dragstart", handleDragStart);
  node.addEventListener("dragend", handleDragEnd);

  return {
    destroy() {
      node.style.userSelect = null;
      node.setAttribute("draggable", "false");
      node.removeEventListener("dragstart", handleDragStart);
      node.removeEventListener("dragend", handleDragEnd);
    }
  }
};

export const customElementTypeToTag = (type: CustomElementType): string => {
  switch (type) {
    case CustomElementType.ActionRollCard:
      return "action-roll-card";
    default:
      throw new Error(`Invalid CustomElementType "${type}"`);
  }
}

export const customElementTypeToComponent = (type: CustomElementType) => {
  switch (type) {
    case CustomElementType.ActionRollCard:
      return ActionRollCard;
    default:
      throw new Error(`Invalid CustomElementType "${type}"`);
  }
}

export const DropInsertCustomElement = Extension.create({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop: (view, event) => {
              if (get(draggedCustomElementStore) === undefined) {
                return false;
              }
              const {storeId, type} = get(draggedCustomElementStore);
              const tag = customElementTypeToTag(type);

              const dropPosition = this.editor.view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              }).pos;

              this.editor
                .chain()
                .focus()
                .insertContentAt(dropPosition, `<${tag} storeId=${storeId} />`)
                .run()

              return true;
            },
          },
        },
      })
    ]
  }
});

export const createNodeView = (type: CustomElementType) => {
  const Component = customElementTypeToComponent(type);
  const tag = customElementTypeToTag(type);

  return Node.create({
    name: Component.name,
    group: "inline",
    inline: true,
    draggable: true,

    addAttributes: () => ({
      storeId: {},
      canDropInsert: {},
    }),

    parseHTML: () => [{
      tag,
    }],

    renderHTML: ({HTMLAttributes}) => [
      tag,
      mergeAttributes(HTMLAttributes)
    ],

    addNodeView: () => ({node}) => {
      const dom = document.createElement("span");
      dom.style.display = "inline-flex";
      dom.style.verticalAlign = "bottom";

      const component = new Component({
        target: dom,
        props: {
          storeId: node.attrs.storeId,
          canDropInsert: false,
        }
      });

      const destroy = () => {
        component.$destroy();
      }

      return {
        dom,
        destroy,
      }
    },
  });
};
