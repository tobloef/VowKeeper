<script lang="ts">
  import {CustomElementType, customElementTypeToComponent, getCustomElementStore} from "../customElements";
  import {nanoid} from "nanoid";
  import {rollActionRoll} from "../mechanics/rolls";
  import type {Stat} from "../mechanics/rolls";

  let log = [];

  const makeActionRoll = () => {
    const stat: Stat = {
      type: "iron",
      value: 4,
    };

    const id = nanoid();
    const actionRoll = rollActionRoll(stat, 1);
    getCustomElementStore(id, {
      roll: actionRoll,
    });
    log = [
      ...log,
      {
        id: id,
        type: CustomElementType.ActionRoll,
      }
    ]
  };
</script>

<div>
    <h1>Log</h1>
    <div class="list">
        <div>
            <button on:click={makeActionRoll}>Action Roll</button>
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
        font-size: 1.25em;
    }

    :global(.list > :not(:last-child)) {
        margin-bottom: 10px;
    }
</style>
