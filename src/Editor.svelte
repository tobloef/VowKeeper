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
    h3: () => editor.chain()
      .focus()
      .toggleHeading({level: 3})
      .run(),
    h4: () => editor.chain()
      .focus()
      .toggleHeading({level: 4})
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
        on:click={menu.h3}
        class:active={editor.isActive('heading', { level: 3 })}
      >
        H3
      </button>
      <button
        on:click={menu.h4}
        class:active={editor.isActive('heading', { level: 4 })}
      >
        H4
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
    box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }

  #menu {
    background: white;
    padding: 10px 20px;
    border-bottom: 1px solid lightgrey;
  }

  #menu button.active {
    background: black;
    color: white;
  }

  #document {
    flex: 1;
    box-sizing: border-box;
    background: white;
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

  :global(#document .actionRollCard) {
    max-width: 350px;
  }
</style>
