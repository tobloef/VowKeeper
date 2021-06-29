<script lang="typescript">
  import {onDestroy, onMount} from "svelte";
  import {Editor} from "@tiptap/core"
  import StarterKit from "@tiptap/starter-kit"
  import CoolComponentView from "./cool-component/CoolComponentView";

  let documentElement;
  let editor;

  onMount(() => {
    editor = new Editor({
      element: documentElement,
      extensions: [
        StarterKit,
        CoolComponentView,
      ],
      content: '',
      onTransaction: () => {
        // Force re-render so `editor.isActive` works as expected
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
    coolComponent: () => editor.chain()
      .focus()
      .insertContent(`<cool-component number="${_.random(1, 20)}"></cool-component>`)
      .run(),
  };
</script>
<div id="editor">
    <div id="menu">
        {#if editor !== undefined}
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
            <button
                    on:click={menu.coolComponent}
            >
                Cool Component
            </button>
        {/if}
    </div>

    <div id="document" bind:this={documentElement}></div>
</div>

<style>
    #editor {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    #menu {
        background: white;
        box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        padding: 10px 20px;
    }

    #menu button.active {
        background: black;
        color: white;
    }

    #document {
        flex: 1;
        overflow-y: auto;
        box-sizing: border-box;
        background: white;
        box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        padding: 10px 20px;
    }
</style>
