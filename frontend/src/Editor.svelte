<script lang="typescript">
  import {onMount} from "svelte";
  import {EditorState} from "prosemirror-state";
  import {EditorView} from "prosemirror-view";
  import {schema} from "prosemirror-schema-basic";
  // noinspection TypeScriptCheckImport
  import {exampleSetup, buildMenuItems} from "prosemirror-example-setup";
  import "prosemirror-menu/style/menu.css";
  import {Schema} from "prosemirror-model";
  import {MenuItem} from "prosemirror-menu"
  import OrderedMap = require("orderedmap");
  import CoolComponent from "./CoolComponent.svelte";

  const coolComponentSpec = {
    attrs: {number: {default: 30}},
    inline: true,
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

  const coolComponentSchema = new Schema({
    nodes: (schema.spec.nodes as OrderedMap).addBefore("image", "coolComponent", coolComponentSpec),
    marks: schema.spec.marks
  });

  let coolComponent = coolComponentSchema.nodes.coolComponent;

  const insertCoolComponent = (number) => {
    return (state, dispatch) => {
      let {$from: from} = state.selection,
        index = from.index();
      if (!from.parent.canReplaceWith(index, index, coolComponent)) {
        return false;
      }
      if (dispatch) {
        dispatch(state.tr.replaceSelectionWith(coolComponent.create({
          number
        })));
      }
      return true;
    };
  };

  let menu = buildMenuItems(coolComponentSchema);
  menu.insertMenu.content.push(
    new MenuItem({
      title: `Insert 10`,
      label: `Cool component (10)`,
      enable(state) {
        return insertCoolComponent(10)(state);
      },
      run: insertCoolComponent(10)
    })
  );
  menu.insertMenu.content.push(
    new MenuItem({
      title: `Insert 20`,
      label: `Cool component (20)`,
      enable(state) {
        return insertCoolComponent(20)(state);
      },
      run: insertCoolComponent(20)
    })
  );

  class CoolComponentView {
    dom;
    component;

    constructor(node) {
      console.log("node", node);
      this.dom = document.createElement("div");
      this.component = new CoolComponent({
        target: this.dom,
        props: {
          number: node.attrs.number
        }
      });
    }
  }

  onMount(() => {
    const editorElement = document.querySelector("#editor");
    const state = EditorState.create({
      schema: coolComponentSchema,
      plugins: exampleSetup({
        schema: coolComponentSchema,
        menuContent: menu.fullMenu,
      }),
    });
    const view = new EditorView(editorElement, {
      state,
      nodeViews: {
        coolComponent: (node) => new CoolComponentView(node),
      }
    });
  });
</script>

<div id="editor"></div>

<style>
  #editor {
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    background: white;
    box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }

  :global(#editor .ProseMirror-menubar-wrapper) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  :global(#editor .ProseMirror-menubar) {
    padding: 7px 5px;
  }

  :global(#editor div[contenteditable="true"].ProseMirror) {
    padding: 10px 20px;
    flex: 1;
    overflow: auto;
    min-height: 400px;
  }

  #hidden-components {
      display: none;
  }
</style>