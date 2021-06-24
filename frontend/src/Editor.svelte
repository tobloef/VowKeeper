<script>
  import { onMount } from "svelte";
  import { EditorState } from "prosemirror-state";
  import { EditorView } from "prosemirror-view";
  import { schema } from "prosemirror-schema-basic";
  // noinspection TypeScriptCheckImport
  import { exampleSetup, buildMenuItems } from "prosemirror-example-setup";
  import "prosemirror-menu/style/menu.css";
  import { Schema } from 'prosemirror-model';
  import {MenuItem} from "prosemirror-menu"

  const testNodeToDom = (node) => {
    return [
      "input",
	    {
	      "checked": node.attrs.isChecked,
        type: "checkbox",
		    class: "testNode"
	    }
    ]
  };

  const testNodeParseDom = [{
    tag: `input[type="checkbox"].testNode`,
    getAttrs: dom => {
      let checked = dom.getAttribute("checked")
      return {
        isChecked: checked,
      }
    }
  }]

  const testNodeSpec = {
    attrs: {
      isChecked: {
        default: false,
      }
    },
    inline: true,
	  group: "inline",
	  draggable: true,
	  toDOM: testNodeToDom,
	  parseDOM: testNodeParseDom,
  }

  const testNodeSchema = new Schema({
    nodes: schema.spec.nodes.addBefore("image", "testNode", testNodeSpec),
    marks: schema.spec.marks
  })

  const testNode = testNodeSchema.nodes.testNode;

  const insertTestNode = (isChecked) => (state, dispatch) => {
    const { $from: from } = state.selection;
    const index = from.index();
    if (!from.parent.canReplaceWith(index, index, testNode)) {
      return false;
    }
	  if (dispatch !== undefined) {
	    dispatch(state.tr.replaceSelectionWith(testNode.create({ isChecked })))
	  }
	  return true;
  }

  let menu = buildMenuItems(testNodeSchema)
  menu.insertMenu.content.push(new MenuItem({
    title: "Insert testNode (checked)",
    label: "Checked testNode",
    enable: state => insertTestNode(true)(state),
    run: insertTestNode(true)
  }))
  menu.insertMenu.content.push(new MenuItem({
    title: "Insert testNode (unchecked)",
    label: "Unchecked testNode",
    enable: state => insertTestNode(false)(state),
    run: insertTestNode(false)
  }))

  onMount(() => {
    const editorElement = document.querySelector("#editor");
    const state = EditorState.create({
      testNodeSchema,
      plugins: exampleSetup({
	      schema: testNodeSchema,
	      menuContent: menu.fullMenu,
      }),
    });
    const view = new EditorView(editorElement, {
      state,
    });
  });
</script>

<div id="editor">

</div>

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
</style>