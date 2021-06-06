<script lang="ts">
  import EditorJS, {API, BlockAPI} from '@editorjs/editorjs';
  import Header from '@editorjs/header';
  import Image from '@editorjs/image';

  const editor = new EditorJS({
    holder: "editor",
    tools: {
      header: Header,
      image: Image,
    },
    placeholder: "Start writing..."
  });

  async function handleKeydown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === "s") {
      event.preventDefault();
      const data = await editor.save();
      console.log(data.blocks);
    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<main>
    <div id="editor"/>
</main>

<style>
    main {
        background: rgb(248, 249, 250);
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #editor {
        flex: 1;
        margin: 30px 0;
        width: 600px;
        background: white;
        padding: 30px 50px;
        box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        font-family: "Merriweather", serif;
    }
</style>