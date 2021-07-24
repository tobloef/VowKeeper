<script lang="ts">
  import {customElementTypeToComponent} from "../customElements";
  import {logStore} from "../stores";
</script>

<div>
    <h1>Log</h1>
    <div class="list">
        {#each $logStore as {id, type}}
            <svelte:component
                    this={customElementTypeToComponent(type)}
                    {id}
                    canDropInsert={true}
            />
        {/each}
    </div>
</div>

<style>
    .list {
        display: flex;
        flex-direction: column;
        font-size: 1.25em;

        margin-bottom: 20px;
    }

    :global(.list > :not(:last-child)) {
        margin-bottom: 10px;
    }
</style>
