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
    height: 100%;
    width: 900px;
    margin-right: 20px;
  }

  #tools-wrapper {
    height: 100%;
    min-width: 450px;
    flex: 1;
  }
</style>
