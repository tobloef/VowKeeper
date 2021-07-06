<script lang="ts" context="module">
  export type ActionRollProps = {
    roll: ActionRoll,
  }
</script>

<script lang="ts">
  import {CustomElementType, getCustomElementStore, draggableElement} from "../customElements";

  export let id: string;
  export let canDropInsert: boolean | undefined;

  let store = getCustomElementStore<ActionRollProps>(id);

  const type = CustomElementType.ActionRoll;
</script>

<div id="popup">
    <D6 />
    <span class="plus">+</span>
    <div class="stat">
        <span class="value">{$store.roll.stat.value}</span>
        <span class="type">{$store.roll.stat.type}</span>
    </div>
    <span class="plus">+</span>
    <span class="add">{$store.roll.add}</span>
</div>

<div id="wrapper" use:draggableElement={{canDropInsert, id, type}}>
    <ActionScore />
    <span class="vs">vs</span>
    <D10 />
    {#if $store.roll.isMatch}
        <span class="equals">=</span>
    {/if}
    <D10 />
</div>

<style>
    #wrapper {
        
    }
</style>
