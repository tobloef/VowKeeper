<script lang="ts">
  import ActionRollDice from "../ActionRollDice.svelte";
  import {considerBurningMomentum} from "../../mechanics/rolls";
  import type {ActionRoll} from "../../mechanics/rolls";
  import type {Character} from "../../mechanics/character";
  import Popup from "../Popup.svelte";
  import {formatNumber} from "../../utils";
  import {burnMomentum} from "../../mechanics/rolls";

  export let roll: ActionRoll;
  export let character: Character;
  export let updateRoll: (roll: ActionRoll) => void = undefined;
  export let updateCharacter: (character: Character) => void = undefined;
  export let canBurnMomentum = false;

  let momentumPopupAnchor;
  let statText;
  let resultIfBurnMomentum;
  let canUpgradeResult;

  $: statText = `+${roll.stat.name.toLowerCase()}`;

  $: {
    const result = considerBurningMomentum(roll);
    resultIfBurnMomentum = result.resultIfBurnMomentum;
    canUpgradeResult = result.canUpgradeResult;
  }
</script>

<div class="wrapper">
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
    <ActionRollDice
      roll={roll}
    />
    <div class="resultWrapper">
      <span class="result">{roll.result}</span>
      <div
        class="momentumWrapper"
      >
        {#if canUpgradeResult && canBurnMomentum && !roll.momentumBurned}
          <button
            class="burnMomentum"
            on:click={() => {
            	const {newRoll, newCharacter} = burnMomentum(roll, character);
            	updateRoll(newRoll);
            	updateCharacter(newCharacter);
            }}
            bind:this={momentumPopupAnchor}
          >
            Burn momentum
          </button>
        {/if}
        {#if roll.momentumBurned}
          <span><i>({roll.momentumAtRoll} Momentum burned)</i></span>
        {/if}
      </div>
    </div>
  </div>
</div>

<Popup
  anchor={momentumPopupAnchor}
  offsetY={-10}
>
  <span>Burn momentum ({formatNumber(roll.momentumAtRoll)}) for a {resultIfBurnMomentum}.</span>
</Popup>

<style>
  .wrapper {
    border: 1px solid hsl(0deg 0% 50%);
    padding: 5px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  }

  .resultWrapper {
    margin-left: 5px;
    width: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .result {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .burnMomentum {
    width: fit-content;
    cursor: pointer;
  }

  .momentumWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .momentumWrapper span {
    text-align: center;
    color: grey;
    font-size: 0.8em;
  }
</style>
