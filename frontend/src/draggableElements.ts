import {get, writable} from 'svelte/store';
import {Extension, mergeAttributes, Node} from "@tiptap/core";
import {Plugin} from "prosemirror-state";
import ActionRollCardDocumentItem from "./components/action-roll-card/ActionRollCardDocumentItem.svelte";
import type {ActionRollLogItem} from "./stores/logStore";

export enum DraggableElementType {
  ActionRollCard,
}

const draggedElementStore = writable<undefined | {
  type: DraggableElementType,
  props: any,
}>(undefined)

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
      return ActionRollCardDocumentItem;
    default:
      throw new Error(`Invalid DraggableElementType "${type}".`);
  }
}

type Serializers =
  | ((type: DraggableElementType.ActionRollCard, props: ActionRollLogItem["props"]) => string)

type Deserializers =
  | ((type: DraggableElementType.ActionRollCard, serialized: string) => ActionRollLogItem["props"])

const serializeDraggableElementProps: Serializers = (type, props) => {
  switch (type) {
    case DraggableElementType.ActionRollCard:
      return JSON.stringify({
        roll: props.roll,
        characterId: props.characterId,
      });
    default:
      throw new Error(`Invalid DraggableElementType "${type}".`);
  }
}

const deserializeDraggableElementProps: Deserializers = (type, serialized) => {
  switch (type) {
    case DraggableElementType.ActionRollCard:
      const parsed = JSON.parse(serialized);
      return {
        roll: parsed.roll,
        characterId: parsed.characterId,
      };
    default:
      throw new Error(`Invalid DraggableElementType "${type}".`);
  }
}

export const draggableElement = (node, {type, props}) => {
  console.log("draggableElement", props);

  const handleDragStart = () => {
    draggedElementStore.set({type, props})
    console.log("handleDragStart", props);
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
    },
    update({ type: newType, props: newProps }) {
      type = newType;
      props = newProps;
    }
  }
};

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
