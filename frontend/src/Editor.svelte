<script lang="typescript">
  import {onDestroy, onMount} from "svelte";
  import {Editor} from "@tiptap/core"
  import StarterKit from "@tiptap/starter-kit"

  let element;
  let editor;

  onMount(() => {
    editor = new Editor({
      element,
      extensions: [
        StarterKit,
      ],
      content: '<p>Hello World! 🌍️ </p>',
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      },
    })
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })

  const menu = {
    paragraph: () => editor.chain()
      .focus()
      .setParagraph()
      .run(),
    h1: () => editor.chain()
      .focus()
      .toggleHeading({level: 1})
      .run(),
    h2: () => editor.chain()
      .focus()
      .toggleHeading({level: 2})
      .run(),
  };
</script>

<menu>
    {#if editor}
        <button
            on:click={menu.h1}
            class:active={editor.isActive('heading', { level: 1 })}
        >
            H1
        </button>
        <button
            on:click={menu.h2}
            class:active={editor.isActive('heading', { level: 2 })}
        >
            H2
        </button>
        <button
            on:click={menu.paragraph}
            class:active={editor.isActive('paragraph')}
        >
            P
        </button>
    {/if}
</menu>

<div id="editor" bind:this={element}></div>

<style>
    #editor {
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        background: white;
        box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }
</style>
