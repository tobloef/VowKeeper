<script lang="ts">
  import D6 from "./D6.svelte";
  import {darkGrey} from "../colors";
  import type {ActionScore} from "../mechanics/rolls";
  import Popup from "./Popup.svelte";

  export let actionScore: ActionScore;

  let popupOpen: boolean = false;
  let popupAnchor;
</script>

<div
        class="wrapper"
        on:mousemove={() => {
          popupOpen = true;
        }}
        on:mouseleave={() => popupOpen = false}
        on:wheel={() => popupOpen = false}
        on:mousedown={() => popupOpen = false}
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
    isOpen={popupOpen}
>
    <div class="explanation">
        {#if actionScore.isMaxed}
            <span class="maxed">(Max 10)</span>
        {/if}
        <div class="calculation">
            <div class="d6Wrapper">
                <D6 number={actionScore.actionDie} />
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
        height: 2.5em;
        margin-right: 0.5em;
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
        margin-top: 5px
    }
</style>
