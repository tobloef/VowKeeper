import {get, Writable, writable} from 'svelte/store';
import {Extension, mergeAttributes, Node} from "@tiptap/core";
import {Plugin} from "prosemirror-state";
import ActionRoll from "./custom-elements/ActionRoll.svelte";

const customElementStores: { [key: string]: Writable<any> } = {};

export enum CustomElementType {
  ActionRoll,
}

export const getCustomElementStore = <T>(id: string, defaultValue: T = {} as T): Writable<T> => {
  if (customElementStores[id] === undefined) {
    customElementStores[id] = writable(defaultValue);
  }
  return customElementStores[id];
}

const draggedCustomElementStore = writable<undefined | {
  id: string,
  type: CustomElementType,
}>(undefined)

export const draggableElement = <T>(node, { canDropInsert, id, type }) => {
  if (!canDropInsert) {
    return {};
  }

  const handleDragStart = () => {
    draggedCustomElementStore.set({id, type})
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
    case CustomElementType.ActionRoll:
      return "action-roll";
    default:
      throw new Error(`Invalid CustomElementType "${type}"`);
  }
}

export const customElementTypeToComponent = (type: CustomElementType) => {
  switch (type) {
    case CustomElementType.ActionRoll:
      return ActionRoll;
    default:
      throw new Error(`Invalid CustomElementType "${type}"`);
  }
}

// noinspection TypeScriptValidateTypes
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
              const {id, type} = get(draggedCustomElementStore);
              const tag = customElementTypeToTag(type);

              const dropPosition = this.editor.view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              }).pos;

              this.editor
                .chain()
                .focus()
                .insertContentAt(dropPosition, `<${tag} id=${id} />`)
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
      id: {},
      canDropInsert: {},
    }),

    parseHTML: () => [{
      tag,
    }],

    renderHTML: ({HTMLAttributes}) => [
      tag,
      mergeAttributes(HTMLAttributes)
    ],

    addNodeView: () => ({
      node,
    }) => {
      const dom = document.createElement("span");
      dom.style.display = "inline-flex";
      dom.style.verticalAlign = "bottom";
      new Component({
        target: dom,
        props: {
          id: node.attrs.id,
          canDropInsert: false,
        }
      });
      return {
        dom,
      }
    },
  });
};
