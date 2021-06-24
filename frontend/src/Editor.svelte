<script>
  import { onMount } from "svelte";
  import { EditorState } from "prosemirror-state";
  import { EditorView } from "prosemirror-view";
  import { schema } from "prosemirror-schema-basic";
  import { exampleSetup, buildMenuItems } from "prosemirror-example-setup";
  import "prosemirror-menu/style/menu.css";
  import { Schema } from 'prosemirror-model';
  import {MenuItem} from "prosemirror-menu"

  const testNodeSpec = {
    attrs: { isChecked: { default: false } },
    inline: true,
    group: "inline",
    draggable: true,
    toDOM: node => [
      "input",
      {
        type: "checkbox",
        class: "testNode",
        checked: node.attrs.isChecked ? "" : undefined
      }
    ],
    parseDOM: [
      {
        tag: "input[type=checkbox]",
        getAttrs: dom => ({
          isChecked: dom.getAttribute("isChecked")
        })
      }
    ]
  };

  const testSchema = new Schema({
    nodes: schema.spec.nodes.addBefore("image", "test", testNodeSpec),
    marks: schema.spec.marks
  });

  let test = testSchema.nodes.test;

  function insertTest(isChecked) {
    return function(state, dispatch) {
      let { $from } = state.selection,
        index = $from.index();
      if (!$from.parent.canReplaceWith(index, index, test)) {
        return false;
      }
      if (dispatch) {
        dispatch(state.tr.replaceSelectionWith(test.create({ isChecked })));
      }
      return true;
    };
  }

  let menu = buildMenuItems(testSchema);
  [false, true].forEach(isChecked => {
    const name = `Test (${isChecked ? "Checked" : "Unchecked"})`;
    return menu.insertMenu.content.push(
      new MenuItem({
        title: `Insert ${name}`,
        label: name,
        enable(state) {
          return insertTest(isChecked)(state);
        },
        run: insertTest(isChecked)
      })
    );
  });

  onMount(() => {
    const editorElement = document.querySelector("#editor");
    const state = EditorState.create({
      schema: testSchema,
      plugins: exampleSetup({
	      schema: testSchema,
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