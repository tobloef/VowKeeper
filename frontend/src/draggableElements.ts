import {get, writable} from 'svelte/store';
import {Extension, mergeAttributes, Node} from "@tiptap/core";
import {Plugin} from "prosemirror-state";
import ActionRollCard from "./components/action-roll-card/ActionRollCard.svelte";
import type {ActionRollLogItem} from "./stores/logStore";
import {deserializeCharacter, serializeCharacter} from "./mechanics/character";

export enum DraggableElementType {
  ActionRollCard,
}

const draggedElementStore = writable<undefined | {
  type: DraggableElementType,
  props: any,
}>(undefined)

export const draggableElement = (node, {type, props}) => {
  const handleDragStart = () => {
    draggedElementStore.set({type, props})
  };

  const handleDragEnd = () => {
    draggedElementStore.set(undefined)
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

export const draggableElementTypeToTag = (type: DraggableElementType): string => {
  switch (type) {
    case DraggableElementType.ActionRollCard:
      return "action-roll-card";
    default:
      throw new Error(`Invalid DraggableElementType "${type}".`);
  }
}

const draggableElementTypeToComponent = (type: DraggableElementType) => {
  switch (type) {
    case DraggableElementType.ActionRollCard:
      return ActionRollCard;
    default:
      throw new Error(`Invalid DraggableElementType "${type}".`);
  }
}

type Serializer =
  | ((type: DraggableElementType.ActionRollCard, props: ActionRollLogItem["props"]) => string)

type Deserializer =
  | ((type: DraggableElementType.ActionRollCard, serialized: string) => ActionRollLogItem["props"])

const serializeDraggableElementProps: Serializer = (type, props) => {
  switch (type) {
    case DraggableElementType.ActionRollCard:
      return JSON.stringify({
        roll: props.roll,
        character: serializeCharacter(props.character),
      });
    default:
      throw new Error(`Invalid DraggableElementType "${type}".`);
  }
}

const deserializeDraggableElementProps: Deserializer = (type, serialized) => {
  switch (type) {
    case DraggableElementType.ActionRollCard:
      const parsed = JSON.parse(serialized);
      return {
        roll: parsed.roll,
        character: deserializeCharacter(parsed.character),
      };
    default:
      throw new Error(`Invalid DraggableElementType "${type}".`);
  }
}

export const DraggableElement = Extension.create({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop: (view, event) => {
              if (get(draggedElementStore) === undefined) {
                return false;
              }
              const {type, props} = get(draggedElementStore);
              const tag = draggableElementTypeToTag(type);
              const jsonProps = serializeDraggableElementProps(type, props);

              const dropPosition = this.editor.view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              }).pos;

              this.editor
                .chain()
                .focus()
                .insertContentAt(
                  dropPosition,
                  `<${tag} jsonProps='${jsonProps}' />`
                )
                .run()

              return true;
            },
          },
        },
      })
    ]
  }
});

export const createNodeView = (type: DraggableElementType) => {
  const Component = draggableElementTypeToComponent(type);
  const tag = draggableElementTypeToTag(type);

  return Node.create({
    name: Component.name,
    group: "inline",
    inline: true,
    draggable: true,

    addAttributes: () => ({
      jsonProps: {},
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

      const props = deserializeDraggableElementProps(type, node.attrs.jsonProps);

      const component = new Component({
        target: dom,
        props,
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
