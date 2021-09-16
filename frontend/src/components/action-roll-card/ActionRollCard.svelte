<script lang="ts">
  import type { ActionRoll } from "../../mechanics/rolls";
  import type { Character } from "../../mechanics/character";
  import ActionRollResult from "../ActionRollResult.svelte";
  import Divider from "../Divider.svelte";

  export let roll: ActionRoll;
  export let character: Character;
  export let updateRoll: (roll: ActionRoll) => void = undefined;
  export let updateCharacter: (character: Character) => void = undefined;
  export let canBurnMomentum = false;

  let statText;

  $: statText = `+${roll.stat.name.toLowerCase()}`;
</script>

<div class="actionRollCard">
  <div class="header">
    <span class="name">
      {character.name}
      rolls
      {#if roll.move !== undefined}
        <i>{roll.move}</i>
        ({statText})
      {/if}
      {#if roll.move === undefined}
        {statText}
      {/if}
    </span>
  </div>
  <div class="content">
    <ActionRollResult
      {roll}
      {character}
      {updateRoll}
      {updateCharacter}
      {canBurnMomentum}
    />
  </div>
  {#if roll.resultText !== undefined}
    <div class="result">
      <div class="dividerWrapper">
        <Divider>Result</Divider>
      </div>
      <span>{roll.resultText}</span>
    </div>
  {/if}
</div>

<style>
  .actionRollCard {
    border: 1px solid hsl(0, 0%, 50%);
    padding: 5px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-radius: 3px;
  }

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: grey;
    position: relative;
  }

  .header .name {
    position: relative;
    margin-bottom: 10px;
    top: 0px;
    left: 0px;
  }

  .content {
    display: flex;
    align-items: center;
    align-self: center;
  }

  .result {
    text-align: center;
  }

  .result .dividerWrapper {
    margin: 10px 0px 5px 0px;
  }
</style>
