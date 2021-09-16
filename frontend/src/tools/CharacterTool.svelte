<script lang="ts">
  import {StatName, StatNames} from "../mechanics/stat";
  import {ChallengeRanks} from "../mechanics/progress";
  import ProgressTrack from "../components/ProgressTrackComponent.svelte";
  import StatInput from "../components/StatInput.svelte";
  import Divider from "../components/Divider.svelte";
  import {
    capitalizeFirstLetter,
  } from "../utils"
  import {calculateValue} from "../mechanics/stat";
  import StatRollModal from "../components/StatRollModal.svelte";
  import {getCharacterStore} from "../stores/characterStore";

  const characterStore = getCharacterStore("mock");

  let statNameToRoll: StatName | undefined;

  const debilityGroups = [
    {
      groupKey: "conditions",
      debilities: [
        "wounded",
        "shaken",
        "unprepared",
        "encumbered",
      ]
    },
    {
      groupKey: "banes",
      debilities: [
        "corrupted",
        "maimed",
      ]
    },
    {
      groupKey: "burdens",
      debilities: [
        "cursed",
        "tormented",
      ]
    },
  ];
</script>

<div class="character">
  <div class="header">
    <div class="name" id="name">
      <label for="name">Character</label>
      <input bind:value={$characterStore.name}>
    </div>

    <div class="experience" id="experience">
      <label for="experience">Experience</label>
      <input type="number" bind:value={$characterStore.experience}>
    </div>
  </div>

  <Divider text="Stats"/>

  <div class="stats stats-wrapper">
      {#each StatNames as statName}
      <StatInput
        stat={$characterStore.stats[statName]}
        onBaseValueChange={(newBaseValue) => $characterStore.stats[statName].baseValue = newBaseValue}
        character={$characterStore}
        showButtons={false}
        showSign={true}
        canEdit={true}
        onClick={() => statNameToRoll = statName}
      />
    {/each}
  </div>

  <Divider text="Status"/>

  <div class="statuses stats-wrapper">
    {#each ["health", "spirit", "supply"] as status}
      <StatInput
        stat={$characterStore.statuses[status]}
        onBaseValueChange={(newBaseValue) => $characterStore.statuses[status].baseValue = newBaseValue}
        character={$characterStore}
        showButtons={true}
        showSign={true}
        canEdit={true}
      />
    {/each}
  </div>

  <Divider text="Momentum"/>

  <div class="momentum stats-wrapper">
    <StatInput
      stat={$characterStore.momentum.current}
      onBaseValueChange={(newBaseValue) => $characterStore.momentum.current.baseValue = newBaseValue}
      character={$characterStore}
      showButtons={true}
      showSign={true}
      canEdit={true}
      label="Current"
    />
    <Divider vertical={true}/>
    <StatInput
      stat={$characterStore.momentum.max}
      onBaseValueChange={(newBaseValue) => $characterStore.momentum.max.baseValue = newBaseValue}
      character={$characterStore}
      showButtons={false}
      showSign={true}
      canEdit={true}
      label="Max"
    />
    <StatInput
      stat={$characterStore.momentum.reset}
      onBaseValueChange={(newBaseValue) => $characterStore.momentum.reset.baseValue = newBaseValue}
      character={$characterStore}
      showButtons={false}
      showSign={true}
      canEdit={true}
      label="Reset"
      onClick={() => {
        $characterStore.momentum.current.baseValue = calculateValue($characterStore.momentum.reset);
      }}
    />
  </div>

  <Divider text="Bonds"/>

  <div class="bonds">
    <ProgressTrack
      progressTrack={$characterStore.bonds}
      onTicksChange={(newTicks) => $characterStore.bonds.ticks = newTicks}
    />
  </div>

  <Divider text="Vows"/>

  <div>
    {#each $characterStore.vows as track}
      <div class="vow">
        <div class="header">
          <input bind:value={track.name}>
          <select bind:value={track.rank}>
            {#each Object.values(ChallengeRanks) as rank}
              <option value={rank}>{rank.name}</option>
            {/each}
          </select>
        </div>
        <ProgressTrack
          progressTrack={track}
          onTicksChange={(newTicks) => track.ticks = newTicks}
        />
      </div>
    {/each}
  </div>

  <Divider text="Debilities"/>

  <div class="debilities">
    {#each debilityGroups as { groupKey, debilities }}
      <div class="debilities-group" id={`debility_group_${groupKey}`}>
        <label for={`debility_group_${groupKey}`}>
          {capitalizeFirstLetter(groupKey)}
        </label>
        {#each debilities as debility}
          <div class="debility" id={`debility_group_${debility}`}>
            <label>
              <input
                type="checkbox"
                bind:checked={$characterStore.debilities[groupKey][debility]}
              >
              {capitalizeFirstLetter(debility)}
            </label>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

{#if statNameToRoll}
  <StatRollModal
    statName={statNameToRoll}
    character={$characterStore}
    onClose={() => statNameToRoll = undefined}
  />
{/if}

<style>
  .character {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }

  :global(.character > *) {
    width: 100%;
  }

  .stats-wrapper {
    align-items: flex-start;
  }

  .header {
    display: flex;
    flex-direction: row;
  }

  .experience {
    width: 100px;
    display: flex;
    flex-direction: column;
  }

  .name {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
  }

  .stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1em;
  }

  :global(.character .separator:not(.vertical)) {
    margin: 20px 0px 10px 0px;
  }

  .statuses {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1em;
  }

  .momentum {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    font-size: 1em;
  }

  :global(.momentum .separator) {
    align-self: stretch;
  }

  .bonds {
    margin: 10px 0px 5px;
  }

  .vow:not(:last-child) {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
  }

  .vow .header {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }

  .vow .header input {
    flex: 1;
    margin-right: 10px;
  }

  .debilities {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .debilities .debilities-group {
    display: flex;
    flex-direction: column;
  }

  .debilities .debilities-group > label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .debilities .debility {
    user-select: none;
  }

  .debilities .debility:not(:last-child) {
    margin-bottom: 5px;
  }
</style>
