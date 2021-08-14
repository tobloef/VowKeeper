<script lang="typescript">
  import {onDestroy, onMount} from "svelte";
  import {Editor} from "@tiptap/core"
  import StarterKit from "@tiptap/starter-kit"
  import {createNodeView, DraggableElementType, DraggableElement} from "./draggableElements";

  let documentElement;
  let editor;

  onMount(() => {
    editor = new Editor({
      element: documentElement,
      extensions: [
        StarterKit,
        createNodeView(DraggableElementType.ActionRollCard),
        DraggableElement
      ],
      content: localStorage.getItem("document") || '',
      autofocus: true,
      onTransaction: () => {
        // Force re-render so `editor.isActive` works as expected
        editor = editor
      },
      onUpdate: () => {
        const html = editor.getHTML();
        localStorage.setItem("document", html);
      },
    });

    const spacer = document.createElement("div");
    spacer.className = "spacer";
    documentElement.appendChild(spacer);
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
    {/if}
  </div>

  <div
    id="document"
    bind:this={documentElement}
  >
  </div>
</div>

<style>
  #editor {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 800px;
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
    box-sizing: border-box;
    background: white;
    box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    height: 100%;
    overflow: auto;
    padding: 10px 0px 10px 20px;
    display: flex;
  }


  :global(#document > .ProseMirror) {
    flex: 1;
    height: calc(100% - 10px * 2);
    width: calc(100% - 20px);
    min-width: 400px;
  }

  :global(#document > .spacer:after) {
    display: block;
    width: 20px;
    height: 1px;
    content: "";
  }

  :global(#document .dice) {
    width: 2.5em;
    align-items: flex-end;
    display: flex;
  }
</style>
