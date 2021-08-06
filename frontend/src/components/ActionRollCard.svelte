<script lang="ts">
  import ActionRollDice from "./ActionRollDice.svelte";
  import {ActionRoll, RollResult} from "../mechanics/rolls";
  import {Character} from "../mechanics/Character";
  import Popup from "./Popup.svelte";
  import {formatNumber} from "../utils";
  import {logStore} from "../stores";

  export let roll: ActionRoll;
  export let character: Character;
  export let move: string = undefined;
  export let isLatest: boolean = false;

  let resultIfBurnMomentum;
  let momentumPopupAnchor;
  let canUpgradeResult;
  let statText;
  let thisRollIsLatest;

  const burnMomentum = () => {
    character.burnMomentum();
    roll.result = resultIfBurnMomentum;
    roll.momentumBurned = true;
    roll.challengeDice[0].isHit = (
      roll.challengeDice[0].isHit ||
      roll.momentumAtRoll > roll.challengeDice[0].value
    );
    roll.challengeDice[1].isHit = (
      roll.challengeDice[1].isHit ||
      roll.momentumAtRoll > roll.challengeDice[1].value
    );
  }

  $: {
    const challengeDice1Hit: boolean = roll.momentumAtRoll > roll.challengeDice[0].value;
    const challengeDice2Hit: boolean = roll.momentumAtRoll > roll.challengeDice[1].value;
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
  <div class="content">
    <ActionRollDice
      roll={roll}
    />
    <div class="resultWrapper">
      <span class="result">{roll.result}</span>
      <div
        class="momentumWrapper"
        bind:this={momentumPopupAnchor}
      >
        {#if isLatest && canUpgradeResult}
          <button
            class="burnMomentum"
            on:click={burnMomentum}
          >
            Burn momentum
          </button>
        {/if}
        {#if roll.momentumBurned}
          <span><i>(Momentum burned)</i></span>
        {/if}
      </div>
    </div>
  </div>
</div>

<Popup
  anchor={momentumPopupAnchor}
  offsetY={-10}
>
  <span>Burn momentum ({formatNumber(roll.momentumAtRoll, true)}) for a {resultIfBurnMomentum}.</span>
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

  .momentumWrapper span {
    text-align: center;
    color: grey;
    font-size: 0.8em;
  }
</style>
