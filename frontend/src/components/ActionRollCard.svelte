<script lang="ts">
  import ActionRollDice from "./ActionRollDice.svelte";
  import {ActionRoll, RollResult} from "../mechanics/rolls";
  import {Character} from "../mechanics/Character";
  import Fa from "svelte-fa"
  import {
    faFire,
    faFireAlt,
    faBurn,
  } from "@fortawesome/free-solid-svg-icons";
  import Popup from "./Popup.svelte";
  import {formatNumber} from "../utils";

  export let roll: ActionRoll;
  export let character: Character;
  export let move: string = undefined;


  let resultIfBurnMomentum;
  let momentumPopupAnchor

  $: currentMomentum = character.momentum.current.getValue();


  $: {
    const challengeDice1Hit: boolean = currentMomentum > roll.challengeDice[0].value;
    const challengeDice2Hit: boolean = currentMomentum > roll.challengeDice[1].value;
    if (challengeDice1Hit && challengeDice2Hit) {
      resultIfBurnMomentum = RollResult.StrongHit;
    } else if (challengeDice1Hit || challengeDice2Hit) {
      resultIfBurnMomentum = RollResult.WeakHit;
    } else {
      resultIfBurnMomentum = RollResult.Miss;
    }
  }

  $: canUpgradeResult = (
    (roll.result === RollResult.Miss && resultIfBurnMomentum !== RollResult.Miss) ||
    (roll.result === RollResult.WeakHit && resultIfBurnMomentum === RollResult.StrongHit)
  )

  $: statText = `+${roll.stat.name.toLowerCase()}`;
</script>

<div class="wrapper">
  <div class="header">
    <span class="name">
      {character.name}
      rolls
      {#if move !== undefined}
        <i>{move}</i>
        ({statText})
      {/if}
      {#if move === undefined}
        {statText}
      {/if}
    </span>
  </div>
  <div class="dunno">
    <ActionRollDice
      roll={roll}
    />
    <div class="resultWrapper">
      <span class="result">{roll.result}</span>
      <div class="momentumWrapper" class:visible={canUpgradeResult} bind:this={momentumPopupAnchor}>
        <button class="burnMomentum">Burn momentum</button>
      </div>
    </div>
  </div>
</div>

<Popup anchor={momentumPopupAnchor} offsetY={-10}>
  <span>Burn momentum ({formatNumber(currentMomentum, true)}) for a {resultIfBurnMomentum}.</span>
</Popup>

<style>
  .wrapper {
    border: 1px solid black;
    padding: 5px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
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

  .dunno {
    display: flex;
    align-items: center;
  }

  .resultWrapper {
    margin-left: 15px;
    width: 150px;
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

  .momentumWrapper:not(.visible) {
    display: none;
  }
</style>
