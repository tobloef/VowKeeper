<script lang="ts">
  import Quill from "quill";
  import {onMount} from "svelte";
  import "quill/dist/quill.snow.css"
  import "./quill-snow-overrides.css"

  let editor;

  onMount(() => {
    editor = new Quill("#editor", {
      placeholder: "Write your story...",
      theme: "snow",
      modules: {
        toolbar: [['bold', 'italic'], ['link', 'image']]
      }
    });
  });

  async function handleKeydown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === "s") {

    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<main>
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
    }

    :root {
        --container-margin: 30px;
    }

    #container {
        flex: 1;
        margin: var(--container-margin) 0;
        width: 600px;
        background: white;
        box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        display: flex;
        flex-direction: column;
        height: calc(100% - var(--container-margin) * 2);
    }

    #editor {
        font-family: "Merriweather", serif;
        overflow-y: auto;
        flex: 1;
    }
</style>