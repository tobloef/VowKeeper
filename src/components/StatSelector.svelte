<script lang="ts">
  import type {StatName} from "../mechanics/stat";
  import Fa from "svelte-fa";
  import {
    faBowArrow,
    faHeart,
    faSword,
    faHoodCloak,
    faHeadSideBrain,
  } from "@fortawesome/pro-solid-svg-icons";
  import {capitalizeFirstLetter} from "../utils";
  import {StatNames} from "../mechanics/stat";

  export let selectedStat: StatName;
  export let statDescriptions: {[key: StatName]: string} = {
    "edge": "Speed, agility, or precision",
    "heart": "Charm, loyalty, or courage",
    "iron": "Aggressive action, forceful defense, strength, or endurance",
    "shadow": "Deception, stealth, or trickery",
    "wits": "Expertise, insight, or observation",
  };
  export let statsToShow: StatName[] = undefined;

  const statIcons: {[key: StatName]: string} = {
    "edge": faBowArrow,
    "heart": faHeart,
    "iron": faSword,
    "shadow": faHoodCloak,
    "wits": faHeadSideBrain,
  }
</script>

<div>
  <div class="statOptions">
      {#each (statsToShow ?? StatNames) as statName}
        <label>
          <input type="radio" bind:group={selectedStat} value={statName}>
          <Fa icon={statIcons[statName]} fw={true} />
          <span class="stat">{capitalizeFirstLetter(statName)}</span>
          <span class="deemphasized"> - {statDescriptions[statName]}</span>
        </label>
      {/each}
  </div>
</div>

<style>
  .statOptions {
    display: flex;
    flex-direction: column;
  }

  .statOptions > *:not(:last-child) {
    margin-bottom: 10px;
  }

  .stat {
    font-weight: bold;
  }
</style>
