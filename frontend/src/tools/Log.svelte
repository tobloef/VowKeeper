<script>
  import {CustomElementType, customElementTypeToComponent, getCustomElementStore} from "../customElements";
  import {nanoid} from "nanoid";
  import _ from "lodash";

  let log = [];

  const rollD10 = () => {
    const id = nanoid();
    const number = _.random(1, 6);
    getCustomElementStore(id, {
      number,
    });
    log = [
      ...log,
      {
        type: CustomElementType.D10,
        id: id,
      }
    ]
  };

  const rollD6 = () => {
    const id = nanoid();
    const number = _.random(1, 6);
    getCustomElementStore(id, {
      number,
    });
    log = [
      ...log,
      {
        type: CustomElementType.D6,
        id,
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
    }

    :global(.list > :not(:last-child)) {
        margin-bottom: 10px;
    }

    :global(.list > *) {
        width: 100px;
    }
</style>
