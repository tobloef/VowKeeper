<script lang="ts">
  import { onMount } from "svelte";
  import { EditorState } from "prosemirror-state";
  import { EditorView } from "prosemirror-view";
  import { schema } from "prosemirror-schema-basic";
  import { baseKeymap } from "prosemirror-commands";
  // noinspection TypeScriptCheckImport
  import { exampleSetup } from "prosemirror-example-setup";
  import {
    undo,
    redo,
    history,
  } from "prosemirror-history";
  import { keymap } from "prosemirror-keymap";
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

<main>
	<h1>VowKeeper.io</h1>
	<div id="container">
		<div id="editor"/>
	</div>
</main>

<style>
  main {
    background: rgb(248, 249, 250);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0px 0px 30px 0px;
    box-sizing: border-box;

    font-family: "Merriweather", serif;
  }

  #container {
    width: 600px;
    background: white;
    box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    display: flex;
    flex-direction: column;
	  position: relative;
    flex: 1;
  }

  #editor {
    overflow-y: auto;
    flex: 1;
	  position: absolute;
	  top: 0;
	  left: 0;
	  height: 100%;
	  width: 100%;
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