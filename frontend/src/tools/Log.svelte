<script>
  import {ElementType} from "../customElements";
  import {nanoid} from "nanoid";
  import CoolComponent from "../node-views/cool-component/CoolComponent.svelte";

  let log = [];

  const rollD10 = () => {
    log = [
      ...log,
      {
        type: ElementType.CoolComponent,
        id: nanoid(),
      }
    ]
  };

  const rollD6 = () => {
    log = [
      ...log,
      {
        type: ElementType.CoolComponent,
        id: nanoid(),
      }
    ]
  }
</script>

<div>
    <h1>Log</h1>
    <div class="list">
        <div>
            <button on:click={rollD6}>Roll D6</button>
            <button on:click={rollD10}>Roll D10</button>
        </div>
        {#each log as {id, type}}
            {#if type === ElementType.CoolComponent}
                <CoolComponent {id} draggable={true} />
            {/if}
        {/each}
    </div>
</div>

<style>
    .list {
        display: flex;
        flex-direction: column;
    }

    :global(.list > :not(:last-child)) {
        margin-bottom: 10px;
    }
</style>
