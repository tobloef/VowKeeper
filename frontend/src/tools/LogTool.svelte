<script lang="ts">
  import {logStore} from "../stores";
  import {customElementTypeToComponent} from "../customElements";
  import {onDestroy, onMount} from "svelte";

  let logElement;
  let lockToBottom = true;

  const onLogResize = () => {
    if (lockToBottom) {
      logElement.scrollTop = logElement.scrollHeight
    }
  };

  const onLogScroll = () => {
    lockToBottom = logElement.scrollTop === logElement.scrollHeight - logElement.offsetHeight;
  }

  const logResizeObserver = new ResizeObserver(onLogResize);

  onMount(() => {
    logResizeObserver.observe(logElement);
  });

  onDestroy(() => {
    logResizeObserver.unobserve(logElement);
  });
</script>

<div
  class="log"
  bind:this={logElement}
  on:scroll={onLogScroll}
>
  {#each $logStore as { storeId, type }}
    <svelte:component
      this={customElementTypeToComponent(type)}
      id={storeId}
      canDropInsert={true}
    />
  {/each}
</div>

<style>
  .log {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    overflow-y: auto;
    padding: 10px 20px;
    height: 100%;
    box-sizing: border-box;
  }

  :global(.log > *:not(:last-child)) {
    margin-bottom: 10px;
  }
</style>
