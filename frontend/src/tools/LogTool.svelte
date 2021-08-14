<script lang="ts">
  import {onDestroy, onMount} from "svelte";
  import Fa from "svelte-fa";
  import {
    faTrash,
  } from "@fortawesome/free-solid-svg-icons";
  import {logStore, getLogItemComponent} from "../stores/logStore";

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

  $: deleteLogItem = (id) => {
    if (confirm("Are you sure you want to delete this log entry?")) {
      logStore.update((prevLog) => prevLog.filter((item) => item.id !== id));
    }
  }
</script>

<div
  class="log"
  bind:this={logElement}
  on:scroll={onLogScroll}
>
  {#each $logStore as logItem (logItem.id)}
    <div class="log-item">
      <span
        class="delete-icon"
        on:click={() => deleteLogItem(logItem.id)}
      >
        <Fa
          icon={faTrash}
        />
      </span>
      <svelte:component
        this={getLogItemComponent(logItem.type)}
        {logItem}
      />
    </div>
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

  .log > *:not(:last-child) {
    margin-bottom: 10px;
  }

  .log-item {
    position: relative;
  }

  :global(.log-item .delete-icon) {
    position: absolute;
    top: 8px;
    right: 12px;
    cursor: pointer;
    color: hsl(0deg 100% 65%);
    z-index: 10;
    user-select: none;
  }

  :global(.log-item:not(:hover) .delete-icon) {
    display: none;
  }
</style>
