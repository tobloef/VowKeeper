<script lang="ts">
  import {noop} from "../utils";

    export let name: string;
    export let value: number;
    export let onChange: (value: number) => void = noop;
    export let onNameClick: () => void = noop;
    export let showButtons: boolean = false;
    export let canIncrease: boolean = true;
    export let canDecrease: boolean = true;
    export let canEdit: boolean = true;
    export let showSign: boolean = true;

    const formatValue = (x, showSign) => {
      if (!showSign) {
        return String(x);
      }
      if (x > 0) {
        return `+${x}`;
      }
      return String(x);
    }

    let prevInputValue;
    let prevSelectionStart;
    let prevSelectionEnd;
    let inputValue;

    $: prevInputValue = formatValue(value, showSign);
    $: inputValue = formatValue(value, showSign);

    const onInput = (e) => {
      inputValue = e.target.value;
      if (!/^[+-]?[0-9]*$/.test(inputValue)) {
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
</script>

<div class="statInput">
    {#if showButtons}
        <button
                class="decrease"
                disabled={!canDecrease}
                on:click={() => onChange(value - 1)}
        >-</button>
    {/if}
    <div class="stat">
        <input
                value={inputValue}
                on:input={onInput}
                on:keydown={(e) => {
                  if (e.key === "Enter") {
                    e.target.blur();
                    e.preventDefault();
                  }
                }}
                disabled={!canEdit}
                on:blur={() => {
                  const newValue = Number(inputValue);
                  if (Number.isNaN(newValue)) {
                    onChange(0);
                  } else {
                    onChange(newValue);
                  }
                }}
        >
        <label
                class="name"
                on:click={onNameClick}
        >{name}</label>
    </div>
    {#if showButtons}
        <button
                class="increase"
                disabled={!canIncrease}
                on:click={() => onChange(value + 1)}
        >+</button>
    {/if}
</div>

<style>
    .statInput {
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
        padding: 5px;
        font-weight: bold;
    }

    .stat .name:hover {
        cursor: pointer;
        color: #ff8c00;
        /* text-shadow: 0 0 10px #ff8c00; */
    }

    .stat input {
        width: 2em;
        font-size: 1.5em;
        text-align: center;
        border: none;
        background: transparent;
    }

    .stat input[disabled] {
        color: unset;
        pointer-events: none;
    }

    button {
        font-size: 1.25em;
        width: 0.75em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .increase {
        margin-left: 0.25em;
    }

    .decrease {
        margin-right: 0.25em;
    }
</style>
