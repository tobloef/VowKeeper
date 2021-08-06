<script lang="ts">
  import D6 from "./D6.svelte";
  import {darkGrey} from "../colors";
  import type {ActionScore} from "../mechanics/rolls";
  import Popup from "./Popup.svelte";

  export let actionScore: ActionScore;
  export let momentum: number;

  let popupAnchor;
</script>

<div
  class="wrapper"
  bind:this={popupAnchor}
>
  <svg
    height="100%"
    viewBox="0 0 33.69 33.69"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path d="M31.5 517.64H297v64.82H31.5z"/>
      </clipPath>
    </defs>
    <g transform="matrix(1.33333 0 0 -1.33333 -228.76 749.7)" fill="#fff">
      <path d="M195.9 549.63a11.7 11.7 0 10-23.4 0 11.7 11.7 0 0023.4 0z" stroke="#393536" stroke-width="1.87"
            stroke-miterlimit="10"/>
    </g>
    <text
      x={actionScore.value >= 10 ? "16" : "17"}
      y="24.5"
      font-size="20"
      font-family="sans-serif"
      fill={darkGrey}
      font-weight="bold"
      text-anchor="middle"
      textLength="60%"
    >
      {actionScore.value}
    </text>
  </svg>
</div>

<Popup
  anchor={popupAnchor}
  offsetY={-10}
>
  <div class="explanation">
    {#if actionScore.isMaxed}
      <span class="maxed">(Max 10)</span>
    {/if}
    <div class="calculation">
      <div class="d6Wrapper">
        <div class="d6">
          {#if actionScore.actionDiceNegated}
            <div class="cross">
              <svg
                viewBox="-10 -10 120 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="rgba(255,77,77,0.85)"
                  stroke-width="20"
                  stroke-linecap="round"
                  d="M4.15 4.15l92 92m0-92l-92 92"
                />
              </svg>
            </div>
          {/if}
          <D6
            number={actionScore.actionDie}
          />
        </div>
        {#if actionScore.actionDiceNegated}
          <span><i>({momentum} Momentum)</i></span>
        {/if}
      </div>
      <span class="plus">+</span>
      <div class="stat">
        <span class="value">{actionScore.stat.getValue()}</span>
        <span class="type">{actionScore.stat.name}</span>
      </div>
      <span class="plus">+</span>
      <span class="adds">{actionScore.adds}</span>
    </div>
  </div>
</Popup>

<style>
  .wrapper {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .explanation {
    padding: 0.1em 0.8em 0.5em 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .calculation {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .d6Wrapper {
    margin-right: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .d6Wrapper > span {
    color: darkgrey;
    margin-top: 10px;
  }

  .d6 {
    height: 2.5em;
    position: relative;
  }

  .d6 .cross {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .maxed {
    font-style: italic;
    color: darkgrey;
    margin-bottom: 0.4em;
  }

  .plus {
    font-size: 2em;
  }

  .adds {
    font-size: 1.8em;
    margin-left: 0.25em;
  }

  .stat {
    align-items: center;
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    margin: 0 0.35em;
    line-height: 1em;
  }

  .stat > .value {
    font-size: 1.5em;
    line-height: 1em;
  }

  .stat > .type {
    margin-top: 5px;
    font-weight: bold;
  }
</style>
