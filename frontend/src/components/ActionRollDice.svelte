<script lang="ts">
  import D10 from "./D10.svelte";
  import ActionScore from "./ActionScore.svelte";
  import type {ActionRoll} from "../mechanics/rolls";

  export let roll: ActionRoll;
</script>

<div class="wrapper">
  <div class="actionScoreWrapper">
    <ActionScore actionScore={roll.actionScore}/>
  </div>
  <span class="vs">vs</span>
  <div class="challengeDiceWrapper">
    <D10
      number={roll.challengeDice[0].value}
      isHit={roll.challengeDice[0].isHit}
    />
  </div>
  {#if roll.isMatch}
    <div class="matchWrapper">
      <span class="match">Match!</span>
      <span class="equals">=</span>
    </div>
  {/if}
  <div class="challengeDiceWrapper">
    <D10
      number={roll.challengeDice[1].value}
      isHit={roll.challengeDice[1].isHit}
    />
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 4em;
    width: fit-content;
    padding: 0 3px 0 5px;
    font-size: 0.75em;
  }

  .actionScoreWrapper {
    height: 100%;
    padding: 0.75em 0;
    box-sizing: border-box;
  }

  .challengeDiceWrapper {
    height: 100%;
    margin-right: 0.2em;
  }

  .vs {
    font-weight: bold;
    margin: 0 0.5em;
  }

  .matchWrapper {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .equals {
    font-size: 2em;
    margin: 0 0.22em 0 0.1em;
    font-family: cursive;
  }

  .match {
    position: absolute;
    bottom: 3em;
    font-size: 0.75em;
  }
</style>
