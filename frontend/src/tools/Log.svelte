<script>
  import D10 from "../dice/D10.svelte";

  let count = 0;
</script>

<div>
    <h1>Log</h1>

    <div>
        <button on:click={() => count += 10}>Add Dice</button>
        <button on:click={() => count = 0}>Clear Dice</button>
    </div>

    <div class="dice-log">
        {#each Array(count) as _, i}
            <D10 number={i + 1} />
        {/each}
    </div>
</div>

<style>
    .dice-log {
        display: flex;
        flex-direction: column;
    }

    :global(.dice-log > object) {
        width: 100px;
    }
</style>
