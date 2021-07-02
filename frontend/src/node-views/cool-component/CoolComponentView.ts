import {Node, mergeAttributes} from '@tiptap/core'
import CoolComponent from "./CoolComponent.svelte";
import _ from "lodash";
import {nanoid} from "nanoid";

export const coolComponentTag = "cool-component";

export default Node.create({
  name: "CoolComponent",
  group: "inline",
  inline: true,
  draggable: true,

  addAttributes: () => ({
    id: {},
  }),

  parseHTML: () => [{
    tag: coolComponentTag,
  }],

  renderHTML: ({HTMLAttributes}) => [
    coolComponentTag,
    mergeAttributes(HTMLAttributes)
  ],

  addNodeView: () => ({
    node,
  }) => {
    const dom = document.createElement("span");
    dom.style.display = "inline-flex";
    dom.style.verticalAlign = "bottom";
    new CoolComponent({
      target: dom,
      props: {
        id: node.attrs.id
      }
    });
    return {
      dom,
    }
  },
})
