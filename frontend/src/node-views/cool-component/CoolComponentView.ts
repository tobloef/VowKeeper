import {Node, mergeAttributes} from '@tiptap/core'
import CoolComponent from "./CoolComponent.svelte";
import _ from "lodash";

export default Node.create({
  name: "CoolComponent",
  group: "inline",
  inline: true,
  draggable: true,

  addAttributes: () => ({
    number: {
      default: _.random(1, 20),
    },
  }),

  parseHTML: () => [{
    tag: "cool-component",
  }],

  renderHTML: ({HTMLAttributes}) => [
    "cool-component",
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
        number: node.attrs.number
      }
    });
    return {
      dom,
    }
  },
})
