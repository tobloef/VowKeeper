<script lang="ts">
  import Editor from "./Editor.svelte";
  import Tools from "./Tools.svelte";
  import { Route } from "tinro";
</script>

<main>
	<div id="tools-wrapper">
		<Tools/>
	</div>
	<div id="editor-wrapper">
		<Editor/>
	</div>
</main>

<Route path="/" redirect="/character"/>

<style>
  main {
    background: rgb(248, 249, 250);
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    box-sizing: border-box;
    font-family: "Merriweather", serif;
    padding: 20px;
  }

  #editor-wrapper {
    height: 100%;
    width: 800px;
  }

  #tools-wrapper {
    height: 100%;
    min-width: 400px;
    flex: 1;
    margin-right: 20px;
  }
</style>