<script lang="ts">
  import D6 from "./D6.svelte";
  import {darkGrey} from "../colors";
  import type {ActionScore} from "../mechanics/rolls";
  import Portal from "svelte-portal/src/Portal.svelte";

  export let actionScore: ActionScore;

  let popupAnchor;
  let popup;

  let popupAnchorRect;
  let popupRect;

  let popupOpen: boolean = false;

  const updatePopupPosition = () => {
    popupAnchorRect = popupAnchor?.getBoundingClientRect();
    popupRect = popup?.getBoundingClientRect();
  }

  $: originalPopupX = popupAnchorRect?.x + popupAnchorRect?.width / 2 - popupRect?.width / 2;
  $: popupX = Math.max(10, originalPopupX);
  $: popupY = popupAnchorRect?.y - popupRect?.height - 10;
  $: triangleOffset = originalPopupX - popupX;
</script>

<div
        class="wrapper"
        on:mouseenter={() => {
          popupOpen = true;
          updatePopupPosition();
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

<Portal>
    <div
            class="popup"
            class:visible={popupOpen}
            bind:this={popup}
            style="
                left: {popupX}px;
                top: {popupY}px;
                --triangleOffset: {triangleOffset}px;
            "
    >
        {#if actionScore.isMaxed}
            <span class="maxed">(Max 10)</span>
        {/if}
        <div class="calculation">
            <div class="d6Wrapper">
                <D6 number={actionScore.actionDie} />
            </div>
            <span class="plus">+</span>
            <div class="stat">
                <span class="value">{actionScore.stat.value}</span>
                <span class="type">{actionScore.stat.type}</span>
            </div>
            <span class="plus">+</span>
            <span class="adds">{actionScore.adds}</span>
        </div>
    </div>
</Portal>

<style>
    .wrapper {
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
    }

    .popup {
        font-size: 0.9em;
        position: absolute;
        display: flex;
        flex-direction: column;
        background: white;
        border: 2px solid #3e3e3f;
        align-items: center;
        padding: 0.6em 1.3em 0.8em 1.3em;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.25);
    }

    .popup:not(.visible) {
        visibility: hidden;
    }

    .popup:after, .popup:before {
        /*noinspection CssUnresolvedCustomProperty*/
        left: calc(50% + var(--triangleOffset));
        border: solid transparent;
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .popup:after {
        border-color: transparent;
        border-top-color: white;
        border-width: 6px;
        margin-left: -6px;
        top: calc(100% - 1px)
    }

    .popup:before {
        border-color: transparent;
        border-top-color: #3e3e3f;
        border-width: 8px;
        margin-left: -8px;
        top: 100%;
    }

    .calculation {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.25em;
    }

    .d6Wrapper {
        height: 2.5em;
        margin-right: 0.5em;
    }

    .maxed {
        font-style: italic;
        color: darkgrey;
        margin-bottom: 0.2em;
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
        font-size: 1.8em;
        line-height: 1em;
    }
</style>
