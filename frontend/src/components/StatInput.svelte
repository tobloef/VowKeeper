<script lang="ts">
  import {Stat} from "../mechanics/Stat";
  import {formatNumber, noop} from "../utils";
  import Popup from "./Popup.svelte";

  const VALID_INPUT_REGEX = /^[+-]?[0-9]*$/;

  export let stat: Stat;
  export let showButtons: boolean = false;
  export let canEdit: boolean = true;
  export let showSign: boolean = true;
  export let vertical: boolean = false;
  export let label: string = undefined;
  export let onClick: (stat: Stat) => void = undefined;

  let prevInputValue;
  let prevSelectionStart;
  let prevSelectionEnd;
  let inputValue;
  let validationError;
  let statInputElement;

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

  $: validationError = stat.validate();
</script>

<div
  class="statInput"
  class:vertical
  class:error={validationError !== undefined}
  bind:this={statInputElement}
>
  <div class="wrapper">
    {#if showButtons}
      <button
        class="decrease"
        disabled={stat.validate(stat.baseValue - 1) !== undefined}
        on:click={() => stat.baseValue -= 1}
      >-
      </button>
    {/if}
    <div
      class="stat"
      class:modified={stat.modifiers.length > 0}
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
              stat.baseValue += 1;
              e.preventDefault();
              return;
            case "ArrowDown":
              stat.baseValue -= 1;
              e.preventDefault();
              return;
          }
        }}
        disabled={!canEdit}
        on:blur={() => {
          const newValue = Number(inputValue);
          if (Number.isNaN(newValue)) {
            stat.baseValue = 0;
          } else {
            stat.baseValue = newValue;
          }
        }}
      >
      <label
        class="name"
        class:clickable={onClick !== undefined}
        on:click={() => onClick !== undefined && onClick(stat)}
      >{label || stat.name}</label>
    </div>
    {#if showButtons}
      <button
        class="increase"
        disabled={stat.validate(stat.baseValue + 1) !== undefined}
        on:click={() => stat.baseValue += 1}
      >+
      </button>
    {/if}
  </div>
  {#if validationError !== undefined}
    <span class="errorText">{validationError}</span>
  {/if}
</div>

{#if stat.modifiers.length > 0}
  <Popup
    anchor={statInputElement}
    offsetY={-10}
  >
    <div class="modifiers">
      {#each stat.modifiers as modifier}
        <span>{modifier.description}</span>
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
