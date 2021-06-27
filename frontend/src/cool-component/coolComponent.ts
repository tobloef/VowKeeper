import CoolComponent from "./CoolComponent.svelte";
import type {NodeView} from "prosemirror-view";

export const coolComponentSpec = {
  attrs: {
    number: { default: 20 }
  },
  inline: true,
  atom: true,
  group: "inline",
  draggable: true,
  toDOM: node => [
    "coolComponent",
    {
      number: node.attrs.number
    }
  ],
  parseDOM: [
    {
      tag: "coolComponent",
      getAttrs: dom => ({
        number: dom.getAttribute("number")
      })
    }
  ]
};

export class CoolComponentView implements NodeView {
  dom;
  component;

  static create(node): CoolComponentView {
    const view = new CoolComponentView();

    view.dom = document.createElement("span");
    view.dom.style.display = "inline-flex";
    view.dom.style.verticalAlign = "bottom";
    view.component = new CoolComponent({
      target: view.dom,
      props: {
        number: node.attrs.number
      }
    });

    return view;
  }

  selectNode() {
    this.dom.classList.add("ProseMirror-selectednode")
  }

  deselectNode() {
    this.dom.classList.remove("ProseMirror-selectednode")
  }
}
