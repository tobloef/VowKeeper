<script lang="ts">
  import Fa from "svelte-fa";
  import {
    faDiceD6,
  } from "@fortawesome/pro-solid-svg-icons";
  import {
    capitalizeFirstLetter,
    possessiveForm,
    formatNumber,
  } from "../utils"
  import {StatName} from "../mechanics/stat";
  import Modal from "./Modal.svelte";
  import {Character} from "../mechanics/character";
  import {calculateValue} from "../mechanics/stat";
  import {makeStatRoll} from "../mechanics/rolls";

  export let statName: StatName;
  export let character: Character;
  export let onClose: () => void;

  let adds: number = 0;

  const onRoll = () => {
    makeStatRoll(character, statName, adds);
    onClose();
  }
</script>

{#if statName !== undefined}
  <Modal
    title={`Roll ${capitalizeFirstLetter(statName)}`}
    closable={true}
    onClose={() => statName = undefined}
    open={statName !== undefined}
  >
    <div class="wrapper">
      <div class="smallBottomPadding">
        <span>
          {possessiveForm(character.name)} {capitalizeFirstLetter(statName)}:
          {formatNumber(calculateValue(character.stats[statName]))}
        </span>
      </div>

      <div class="addsWrapper bigBottomPadding">
        <span class="header">Adds</span>
        <div>
          <input
            type="number"
            bind:value={adds}
          />
        </div>
      </div>

      <div class="rollWrapper">
        <button
          on:click={onRoll}
        >
          <Fa icon={faDiceD6} /> Roll
        </button>
      </div>
    </div>
  </Modal>
{/if}

<style>
  .wrapper {
    width: 200px;
  }

  .smallBottomPadding {
    margin-bottom: 15px;
  }

  .bigBottomPadding {
    margin-bottom: 25px;
  }

  .rollWrapper button {
    min-width: 100px;
    min-height: 25px;
  }
</style>
