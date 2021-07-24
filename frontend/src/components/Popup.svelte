<script lang="ts">
  import Portal from "svelte-portal/src/Portal.svelte";

  export let anchor;
  export let isOpen;

  let popup;
  let anchorRect;
  let popupRect;

  const updatePopupPosition = () => {
    if (!isOpen) {
      return;
    }
    anchorRect = anchor?.getBoundingClientRect();
    popupRect = popup?.getBoundingClientRect();
  }

  $: anchor?.addEventListener("mousemove", updatePopupPosition);
  $: originalPopupX = anchorRect?.x + anchorRect?.width / 2 - popupRect?.width / 2;
  $: popupX = Math.max(10, originalPopupX);
  $: popupY = anchorRect?.y - popupRect?.height - 10;
  $: triangleOffset = originalPopupX - popupX;
</script>

<Portal>
    <div
            class="popup"
            class:visible={isOpen}
            bind:this={popup}
            style="
                left: {popupX}px;
                top: {popupY}px;
                --triangleOffset: {triangleOffset}px;
            "
    >
        <slot></slot>
    </div>
</Portal>

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
        box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.25);
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
