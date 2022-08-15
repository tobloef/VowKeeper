<script lang="ts">
  import Editor from "./Editor.svelte";
  import Tools from "./Tools.svelte";
  import {Route} from "tinro";
</script>

<main>
  <div id="editor-wrapper">
    <Editor/>
  </div>
  <div id="tools-wrapper">
    <Tools/>
  </div>
</main>

<Route path="/" redirect="/log"/>

<style>
  main {
    background: rgb(248, 249, 250);
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    box-sizing: border-box;
    padding: 20px;
  }

  #editor-wrapper {
    flex: 1;
    height: 100%;
    margin-right: 20px;
    overflow: visible;
    display: flex;
    justify-content: center;
  }

  #tools-wrapper {
    width: 450px;
    height: 100%;
  }

  :global(.ProseMirror-selectednode) {
    outline: 1px solid -webkit-focus-ring-color;
  }

  :global(.ProseMirror.ProseMirror-focused) {
    outline: none;
  }

  :global(input) {
    font-size: 1em;
  }
</style>
