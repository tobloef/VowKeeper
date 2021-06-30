<script>
  import D10 from "../dice/D10.svelte";
  import D6 from "../dice/D6.svelte";

  let d10Count = 0;
  let d6Count = 0;
</script>

<div>
    <h1>Log</h1>

    <div>
        <button on:click={() => d10Count += 10}>Add D10</button>
        <button on:click={() => d6Count += 6}>Add D6</button>
        <button on:click={() => {
          d10Count = 0;
          d6Count = 0;
        }}>Clear Dice</button>
    </div>

    <div class="dice-log">
        {#each Array(d10Count) as _, i}
            <D10 number={i + 1} />
        {/each}
        {#each Array(d6Count) as _, i}
            <D6 number={i + 1} />
        {/each}
    </div>
</div>

<style>
    .dice-log {
        display: flex;
        flex-direction: column;
    }

    :global(.dice-log > svg) {
        width: 100px;
    }
</style>
