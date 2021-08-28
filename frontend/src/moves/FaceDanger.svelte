<script lang="ts">
  import Modal from "../components/Modal.svelte";
  import Fa from "svelte-fa";
  import {
    faDiceD6,
  } from "@fortawesome/free-solid-svg-icons";
  import type {StatName} from "../mechanics/stat";
  import {formatNumber} from "../utils";
  import StatSelector from "../components/StatSelector.svelte";

  export let showModal: boolean;
  export let onRoll: (statToUse: StatName, adds: number) => void;
  export let defaultAdds: {
    value: number,
    reason: string,
  } | undefined = undefined;

  let statToUse: StatName;
  let adds: number = defaultAdds?.value ?? 0;
</script>

<Modal
  open={showModal}
  title="Move - Face Danger"
  onClose={() => showModal = false}
>
  <div class="wrapper">
    <span class="moveText">
      When you attempt something risky or react to an imminent threat, envision your action and roll.
    </span>
    <div class="statsWrapper">
      <span class="header">Stat</span>
      <StatSelector
        bind:statToUse
        statDescriptions={{
        	"edge": "Speed, agility, or precision",
        	"heart": "Charm, loyalty, or courage",
        	"iron": "Aggressive action, forceful defense, strength, or endurance",
        	"shadow": "Deception, stealth, or trickery",
        	"wits": "Expertise, insight, or observation",
        }}
      />
    </div>

    <div class="addsWrapper">
      <span class="header">Adds</span>
      <div>
        <input
          type="number"
          bind:value={adds}
          class:highlighted={defaultAdds !== undefined}
        />
        {#if defaultAdds !== undefined}
          <span class="addsExplainer deemphasized">
            ({formatNumber(defaultAdds.value)} from <i>{defaultAdds.reason}</i>)
          </span>
        {/if}
      </div>
    </div>

    <div class="rollWrapper">
      <button
        on:click={() => onRoll(statToUse, adds)}
        disabled={statToUse === undefined}
      >
        <Fa icon={faDiceD6} /> Roll
      </button>
      {#if statToUse === undefined}
        <span class="deemphasized">(Select stat first)</span>
      {/if}
    </div>
  </div>
</Modal>

<style>
  .wrapper {
    width: 600px;
  }

  .moveText {
    font-style: italic;
    margin-bottom: 20px;
    display: block;
  }

  .header {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
    font-size: 1.1em;
  }

  .deemphasized {
    color: grey;
    font-style: italic;
  }

  .statsWrapper {
    margin-bottom: 20px;
  }

  .addsWrapper {
    margin-bottom: 20px;
  }

  .addsWrapper input.highlighted {
    color: darkorange;
    caret-color: black;
    font-weight: bold;
  }

  .rollWrapper button {
    min-width: 100px;
    min-height: 25px;
  }
</style>
