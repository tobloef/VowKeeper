<script lang="typescript">
  import {onMount} from "svelte";
  import {EditorState, Plugin} from "prosemirror-state";
  import {EditorView} from "prosemirror-view";
  import {schema} from "prosemirror-schema-basic";
  // noinspection TypeScriptCheckImport
  import {exampleSetup, buildMenuItems} from "prosemirror-example-setup";
  import "prosemirror-menu/style/menu.css";
  import {Schema} from "prosemirror-model";
  import {MenuItem} from "prosemirror-menu"
  import OrderedMap = require("orderedmap");
  import {coolComponentSpec, CoolComponentView} from "./cool-component/coolComponent";
  import _ from "lodash";

  const mySchema = new Schema({
    nodes: (schema.spec.nodes as OrderedMap)
      .addBefore("image", "coolComponent", coolComponentSpec),
    marks: schema.spec.marks
  });

  const insertNode = (node, params = {}) => {
    return (state, dispatch) => {
      let {$from: from} = state.selection;
      let index = from.index();
      if (!from.parent.canReplaceWith(index, index, node)) {
        return false;
      }
      if (dispatch) {
        dispatch(
          state.tr.replaceSelectionWith(
            node.create(params)
          )
        );
      }
      return true;
    }
  }

  let menu = buildMenuItems(mySchema);
  menu.insertMenu.content.push(
    new MenuItem({
      title: `Insert Cool Component`,
      label: `Cool component`,
      enable: (state) => insertNode(mySchema.nodes.coolComponent)(state),
      run: (state, dispatch) => insertNode(
        mySchema.nodes.coolComponent,
        { number: _.random(1, 20) }
      )(state, dispatch)
    })
  );

  onMount(() => {
    const editorElement = document.querySelector("#editor");
    const state = EditorState.create({
      schema: mySchema,
      plugins: exampleSetup({
        schema: mySchema,
        menuContent: menu.fullMenu,
      }),
    });
    const view = new EditorView(editorElement, {
      state,
      nodeViews: {
        coolComponent: CoolComponentView.create,
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

  :global(#editor .ProseMirror p) {
      display: flex;
      align-items: flex-end;
  }
</style>
