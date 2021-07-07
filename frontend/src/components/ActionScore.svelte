<script lang="ts">
  import D6 from "./D6.svelte";
  import type {ActionScore} from "../tools/rolls";

  export let actionScore: ActionScore;
</script>

<div class="popup">
    {#if actionScore.isMaxed}
        <span class="maxed">(Max 10)</span>
    {/if}
    <div>
        <D6 number={actionScore.actionDie} />
        <span class="plus">+</span>
        <div class="stat">
            <span class="value">{actionScore.stat.value}</span>
            <span class="type">{actionScore.stat.type}</span>
        </div>
        <span class="plus">+</span>
        <span class="add">{actionScore.adds}</span>
    </div>
</div>

<div class="wrapper">
    <svg
            height="100%"
            viewBox="0 0 33.69 33.69"
            xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <clipPath clipPathUnits="userSpaceOnUse" id="action_score">
                <path d="M31.5 517.64H297v64.82H31.5z"/>
            </clipPath>
        </defs>
        <g clip-path="url(#action_score)" transform="matrix(1.33333 0 0 -1.33333 -228.76 749.7)" fill="#fff">
            <path d="M195.9 549.63a11.7 11.7 0 10-23.4 0 11.7 11.7 0 0023.4 0z" stroke="#393536" stroke-width="1.87"
                  stroke-miterlimit="10"/>
        </g>
        <text
                x={actionScore.value >= 10 ? "16" : "17"}
                y="24.5"
                font-size="20"
                font-family="sans-serif"
                fill="#3e3e3f"
                font-weight="bold"
                text-anchor="middle"
                textLength="60%"
        >
            {actionScore.value}
        </text>
    </svg>
</div>

<style>
    .popup:not(.visible) {
        display: none;
    }

    .wrapper {
        height: 100%;
    }
</style>
