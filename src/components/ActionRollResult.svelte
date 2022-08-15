<script lang="ts">
  import ActionRollDice from "./ActionRollDice.svelte";
  import {
    ActionRoll,
    burnMomentum,
    considerBurningMomentum,
  } from "../mechanics/rolls";
  import { Character } from "../mechanics/character";
  import Popup from "./Popup.svelte";
  import { formatNumber } from "../utils";

  export let roll: ActionRoll;
  export let character: Character;
  export let updateRoll: (roll: ActionRoll) => void = undefined;
  export let updateCharacter: (character: Character) => void = undefined;
  export let canBurnMomentum: boolean;

  let momentumPopupAnchor;
  let resultIfBurnMomentum;
  let canUpgradeResult;

  $: {
    const result = considerBurningMomentum(roll);
    resultIfBurnMomentum = result.resultIfBurnMomentum;
    canUpgradeResult = result.canUpgradeResult;
  }

  const onBurnMomentum = () => {
	  const {newRoll, newCharacter} = burnMomentum(roll, character);
    updateCharacter(newCharacter);
    updateRoll(newRoll);
  };
</script>

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
				on:click={onBurnMomentum}
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

<Popup
	anchor={momentumPopupAnchor}
	offsetY={-10}
>
	<span>Burn momentum ({formatNumber(roll.momentumAtRoll)}) for a {resultIfBurnMomentum}.</span>
</Popup>

<style>
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