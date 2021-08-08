<script lang="ts">
  import {Stat} from "../mechanics/Stat";
  import {formatNumber, noop} from "../utils";
  import Popup from "./Popup.svelte";
  import {Character} from "../mechanics/Character";

  const VALID_INPUT_REGEX = /^[+-]?[0-9]*$/;

  export let stat: Stat;
  export let character: Character;
  export let showButtons: boolean = false;
  export let canEdit: boolean = true;
  export let showSign: boolean = true;
  export let vertical: boolean = false;
  export let label: string = undefined;
  export let onClick: (stat: Stat) => void = undefined;
  export let onBaseValueChange: (newBaseValue: number) => void;

  let prevInputValue;
  let prevSelectionStart;
  let prevSelectionEnd;
  let inputValue;
  let validateResult;
  let validateIncreaseResult;
  let validateDecreaseResult;
  let statInputElement;
  let hasModifiers;

  const onInput = (e) => {
    inputValue = e.target.value;

    if (!VALID_INPUT_REGEX.test(inputValue)) {
      inputValue = prevInputValue;
      requestAnimationFrame(() => {
        e.target.selectionStart = prevSelectionStart;
        e.target.selectionEnd = prevSelectionEnd;
      })
    } else {
      prevInputValue = inputValue;
      prevSelectionStart = e.target.selectionStart;
      prevSelectionEnd = e.target.selectionEnd;
    }
  }

  $: prevInputValue = formatNumber(stat.getValue(), showSign);

  $: inputValue = formatNumber(stat.getValue(), showSign);

  $: validateResult = stat.validate(character);
  $: validateIncreaseResult = stat.validateIncrease(character);
  $: validateDecreaseResult = stat.validateDecrease(character);

  $: hasModifiers = stat.modifiers.length > 0;
</script>

<div
  class="statInput"
  class:vertical
  class:error={validateResult !== undefined}
  bind:this={statInputElement}
>
  <div class="wrapper">
    <button
      class="decrease"
      class:visible={showButtons}
      disabled={validateDecreaseResult !== undefined}
      on:click={() => onBaseValueChange(stat.baseValue - 1)}
    >
      -
    </button>
    <div
      class="stat"
      class:modified={hasModifiers}
    >
      <input
        value={inputValue}
        on:input={onInput}
        on:keydown={(e) => {
          switch (e.key) {
            case "Enter":
              e.target.blur();
              e.preventDefault();
              return;
            case "ArrowUp":
            	if (validateIncreaseResult === undefined) {
                onBaseValueChange(stat.baseValue + 1);
              }
              e.preventDefault();
              return;
            case "ArrowDown":
            	if (validateDecreaseResult === undefined) {
                onBaseValueChange(stat.baseValue - 1);
              }
              e.preventDefault();
              return;
          }
        }}
        disabled={!canEdit}
        on:blur={() => {
          const newValue = Number(inputValue);
          if (Number.isNaN(newValue)) {
            onBaseValueChange(0);
          } else {
            onBaseValueChange(newValue);
          }
        }}
      >
      <span
        class="name"
        class:clickable={onClick !== undefined}
        on:click={() => onClick !== undefined && onClick(stat)}
      >{label || stat.name}</span>
    </div>
    <button
      class="increase"
      class:visible={showButtons}
      disabled={validateIncreaseResult !== undefined}
      on:click={() => onBaseValueChange(stat.baseValue + 1)}
    >
      +
    </button>
  </div>
  {#if validateResult !== undefined}
    <span class="errorText">{validateResult}</span>
  {/if}
</div>

{#if hasModifiers}
  <Popup
    anchor={statInputElement}
    offsetY={-10}
  >
    <div class="modifiers">
      {#each stat.modifiers as modifier}
        <span>{modifier.getDescription()}</span>
      {/each}
    </div>
  </Popup>
{/if}

<style>
  .statInput {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    font-size: 1em;
    user-select: none;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #3e3e3f;
    border-radius: 3px;
    padding: 8px 5px;
    font-weight: bold;
    width: 4em;
  }

  .stat .name {
    font-size: 1em;
    margin-top: 2px;
  }

  .stat .name.clickable:hover {
    cursor: pointer;
    color: darkorange;
  }

  .stat .name:not(.clickable):hover {
    cursor: not-allowed;
  }

  .stat input {
    width: 90%;
    font-size: 1.4em;
    text-align: center;
    background: transparent;
    border: 1px solid transparent;
    box-sizing: border-box;
  }

  .stat input:not([disabled]):hover {
    border: 1px solid black;
    border-radius: 2px;
  }

  .stat input[disabled] {
    color: unset;
    pointer-events: none;
  }

  .stat.modified input {
    color: darkorange;
    caret-color: black;
    font-weight: bold;
  }

  .statInput.error .stat {
    border-color: red;
  }

  .errorText {
    color: red;
    text-align: center;
    margin-top: 5px;
  }

  button {
    font-size: 1.25em;
    width: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0.75em;
  }

  .increase {
    margin: 0px 0px 0px 0.25em;
  }

  .decrease {
    margin: 0px 0.25em 0px 0px;
  }

  .increase:not(.visible),
  .decrease:not(.visible) {
    display: none;
  }

  /* Vertical */

  .statInput.vertical button {
    width: 100%;
  }

  .statInput.vertical {
    flex-direction: column-reverse;
  }

  .statInput.vertical .increase {
    margin: 0px 0px 0.25em 0px;
  }

  .statInput.vertical .decrease {
    margin: 0.25em 0px 0px 0px;
  }

  .modifiers {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 5px 10px;
  }

  .modifiers > span {
    text-align: center;
  }

  .modifiers > span:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid grey;
    margin-bottom: 10px;
  }
</style>
