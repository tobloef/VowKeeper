<script lang="ts">
  import {logStore} from "../stores";
  import {customElementTypeToComponent} from "../customElements";
</script>

<div class="log">
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
