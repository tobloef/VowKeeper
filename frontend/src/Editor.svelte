<script>
  import { onMount } from "svelte";
  import { EditorState } from "prosemirror-state";
  import { EditorView } from "prosemirror-view";
  import { schema } from "prosemirror-schema-basic";
  // noinspection TypeScriptCheckImport
  import { exampleSetup } from "prosemirror-example-setup";
  import "prosemirror-menu/style/menu.css";

  onMount(() => {
    const editorElement = document.querySelector("#editor");
    const state = EditorState.create({
      schema,
      plugins: exampleSetup({ schema }),
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