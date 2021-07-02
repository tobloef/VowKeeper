import {get, Writable, writable} from 'svelte/store';
import {coolComponentTag} from "./node-views/cool-component/CoolComponentView";
import {Extension} from "@tiptap/core";
import {Plugin} from "prosemirror-state";

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

export const draggedElement = writable<undefined | {
  id: string,
  type: ElementType,
}>(undefined)

export const draggableElement = <T>(node, { draggable, id, type }) => {
  if (!draggable) {
    return {};
  }

  const handleDragStart = () => {
    draggedElement.set({id, type})
  };

  const handleDragEnd = () => {
    draggedElement.set(undefined)
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

const elementTypeToTag = (type: ElementType): string | undefined => {
  switch (type) {
    case ElementType.CoolComponent:
      return coolComponentTag;
    default:
      return undefined;
  }
}

// noinspection TypeScriptValidateTypes
export const DropElement = Extension.create({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop: (view, event) => {
              if (get(draggedElement) === undefined) {
                return false;
              }
              const {id, type} = get(draggedElement);
              const tag = elementTypeToTag(type);

              if (tag === undefined) {
                return false;
              }

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
})
