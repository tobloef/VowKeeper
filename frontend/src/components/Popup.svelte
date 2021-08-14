<script lang="ts">
  import Portal from "svelte-portal/src/Portal.svelte";

  export let anchor;
  export let offsetY = 0;

  const EDGE_MARGIN = 5;

  let popup;
  let anchorRect;
  let popupRect;
  let isOpen = false;
  let isVisible = false;

  $: {
    if (isOpen) {
      requestAnimationFrame(() => {
        anchorRect = anchor?.getBoundingClientRect();
        popupRect = popup?.getBoundingClientRect();
        isVisible = true;
      })
    } else {
      isVisible = false;
    }
  }

  $: {
    anchor?.addEventListener("mouseenter", () => isOpen = true)
    anchor?.addEventListener("mouseleave", () => isOpen = false)
    anchor?.addEventListener("wheel", () => isOpen = false)
    anchor?.addEventListener("mousedown", () => isOpen = false)
  }

  $: leftSideX = anchorRect?.x + anchorRect?.width / 2 - popupRect?.width / 2;
  $: minX = document.body.getBoundingClientRect().x + EDGE_MARGIN;
  $: maxX = document.body.getBoundingClientRect().width - EDGE_MARGIN - popupRect?.width;
  $: popupX = Math.min(Math.max(leftSideX, minX), maxX);
  $: popupY = anchorRect?.y - popupRect?.height + offsetY;
  $: triangleOffset = leftSideX - popupX;
</script>

{#if isOpen}
  <Portal>
    <div
      class="popup"
      bind:this={popup}
      class:visible={isVisible}
      style="
          left: {popupX}px;
          top: {popupY}px;
          --triangleOffset: {triangleOffset}px;
      "
    >
      <slot></slot>
    </div>
  </Portal>
{/if}

<style>
  .popup {
    font-size: 0.9em;
    position: absolute;
    display: flex;
    flex-direction: column;
    background: white;
    border: 2px solid #3e3e3f;
    align-items: center;
    padding: 0.5em;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
    width: fit-content;
    z-index: 100;
  }

  .popup:not(.visible) {
    visibility: hidden;
  }

  .popup:after, .popup:before {
    /*noinspection CssUnresolvedCustomProperty*/
    left: calc(50% + var(--triangleOffset));
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .popup:after {
    border-color: transparent;
    border-top-color: white;
    border-width: 6px;
    margin-left: -6px;
    top: calc(100% - 1px)
  }

  .popup:before {
    border-color: transparent;
    border-top-color: #3e3e3f;
    border-width: 8px;
    margin-left: -8px;
    top: 100%;
  }
</style>
