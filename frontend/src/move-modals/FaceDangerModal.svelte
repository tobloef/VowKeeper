<script lang="ts">
  import Modal from "../components/Modal.svelte";
  import Fa from "svelte-fa";
  import {
    faDiceD6,
  } from "@fortawesome/pro-solid-svg-icons";
  import type {StatName} from "../mechanics/stat";
  import {formatNumber} from "../utils";
  import StatSelector from "../components/StatSelector.svelte";

  export let onClose;
  export let defaultAdds: {
    value: number,
    reason: string,
  } | null = null;

  let statToUse: StatName;
  let adds: number = defaultAdds?.value ?? 0;

  const onRoll = (statToUse: StatName, adds: number): void => {

  }
</script>

<Modal
  open={true}
  title="Move - Face Danger"
  onClose={onClose}
>
  <div class="wrapper">
    <section>
      <span class="moveText">
        When you attempt something risky or react to an imminent threat, envision your action and roll.
      </span>
    </section>

    <section>
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
    </section>

    <section>
      <div class="addsWrapper">
        <span class="header">Adds</span>
        <div>
          <input
            type="number"
            bind:value={adds}
            class:highlighted={defaultAdds !== null}
          />
          {#if defaultAdds !== null}
            <span class="addsExplainer deemphasized">
              ({formatNumber(defaultAdds.value)} from <i>{defaultAdds.reason}</i>)
            </span>
          {/if}
        </div>
      </div>
    </section>

    <section>
      <div class="rollWrapper">
        <button
          on:click={() => onRoll(statToUse, adds)}
          disabled={statToUse === null}
        >
          <Fa icon={faDiceD6} /> Roll
        </button>
        {#if statToUse === null}
          <span class="deemphasized rollDisabledExplainer">
            (Select stat first)
          </span>
        {/if}
      </div>
    </section>
  </div>
</Modal>

<style>
  .wrapper {
    width: 600px;
  }

  section:not(:last-child) {
    margin-bottom: 30px;
  }

  .moveText {
    font-style: italic;
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

  .addsWrapper input.highlighted {
    color: darkorange;
    caret-color: black;
    font-weight: bold;
  }

  .rollWrapper button {
    min-width: 100px;
    min-height: 25px;
  }

  .addsExplainer,
  .rollDisabledExplainer {
    margin-left: 3px;
  }
</style>
