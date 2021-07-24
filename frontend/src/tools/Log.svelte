<script lang="ts">
  import {CustomElementType, customElementTypeToComponent, getCustomElementStore} from "../customElements";
  import {nanoid} from "nanoid";
  import {rollActionRoll} from "../mechanics/rolls";
  import StatInput from "../components/StatInput.svelte";
  import type {Stat} from "../mechanics/Stat";

  let log = [];

  const makeActionRoll = () => {
    // TODO
    const stat: Stat = Stat.create({
      baseValue: 3,
    });

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

  let val: number = 3;
  let showButtons = true;
  let showSign = true;
  let canEdit = true;
</script>

<div>
    <h1>Log</h1>
    <input type="checkbox" bind:checked={showButtons}>
    <input type="checkbox" bind:checked={showSign}>
    <input type="checkbox" bind:checked={canEdit}>
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
    <StatInput
        name={"Iron"}
        value={val}
        onChange={(newVal) => val = newVal}
        showButtons={showButtons}
        showSign={showSign}
        canEdit={canEdit}
    />
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
