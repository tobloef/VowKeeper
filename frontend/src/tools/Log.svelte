<script lang="ts">
  import {logStore} from "../stores";
  import {customElementTypeToComponent} from "../customElements";
</script>

<div>
  <h1>Log</h1>
  <div class="log">
    {#each $logStore as { storeId, type }}
      <svelte:component
        this={customElementTypeToComponent(type)}
        id={storeId}
        canDropInsert={true}
      />
    {/each}
  </div>
</div>

<style>
  .log {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  :global(.log > *:not(:last-child)) {
    margin-bottom: 10px;
  }
</style>
