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

  export let statDescriptions: {[key: StatName]: string};
  export let statsToShow: StatName[] = undefined;
  export let statToUse: StatName;

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
          <input type="radio" bind:group={statToUse} value={statName}>
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
