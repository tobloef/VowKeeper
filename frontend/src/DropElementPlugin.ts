import {dragElement, ElementType} from "./stores";
import {coolComponentTag} from "./node-views/cool-component/CoolComponentView";
import {Extension} from "@tiptap/core";
import {Plugin} from "prosemirror-state";
import {get} from "svelte/store";

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
              if (get(dragElement) === undefined) {
                return false;
              }
              const {id, type} = get(dragElement);
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
