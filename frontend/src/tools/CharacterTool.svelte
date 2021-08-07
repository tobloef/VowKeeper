<script lang="ts">
  import {ChallengeRanks} from "../mechanics/Progress";
  import {Character} from "../mechanics/Character";
  import ProgressTrack from "../components/ProgressTrackComponent.svelte";
  import {Writable} from "svelte/store";
  import StatInput from "../components/StatInput.svelte";
  import Divider from "../components/Divider.svelte";
  import {nanoid} from "nanoid";
  import {rollActionRoll} from "../mechanics/rolls";
  import {CustomElementType, getCustomElementStore} from "../customElements";
  import {LogItem, logStore} from "../stores";
  import {capitalizeFirstLetter} from "../utils"

  export let characterStore: Writable<Character>;

  const createActionRollLogEntry = (stat): LogItem => {
    const storeId = nanoid();
    const roll = rollActionRoll(stat, 1, $characterStore); // TODO
    getCustomElementStore(storeId, {
      roll,
      character: $characterStore,
    });
    return {
      id: nanoid(),
      type: CustomElementType.ActionRollCard,
      storeId,
    };
  }

  const updateModifiers = () => {
    $characterStore.updateModifiers();
    $characterStore = $characterStore;
  }
</script>

<div class="character">
  <div class="header">
    <div class="name">
      <label>Character</label>
      <input bind:value={$characterStore.name}>
    </div>

    <div class="experience">
      <label>Experience</label>
      <input type="number" bind:value={$characterStore.experience}>
    </div>
  </div>

  <Divider text="Stats"/>

  <div class="stats stats-wrapper">
    {#each ["edge", "heart", "iron", "shadow", "wits"] as stat}
      <StatInput
        stat={$characterStore.stats[stat]}
        character={$characterStore}
        showButtons={false}
        showSign={true}
        canEdit={true}
        afterUpdate={updateModifiers}
        onClick={(stat) => {
          logStore.update((prevLog) => [
            ...prevLog,
            createActionRollLogEntry(stat),
          ]);
        }}
      />
    {/each}
  </div>

  <Divider text="Status"/>

  <div class="statuses stats-wrapper">
    {#each ["health", "spirit", "supply"] as status}
      <StatInput
        stat={$characterStore.statuses[status]}
        character={$characterStore}
        showButtons={true}
        showSign={true}
        canEdit={true}
        afterUpdate={updateModifiers}
      />
    {/each}
  </div>

  <Divider text="Momentum"/>

  <div class="momentum stats-wrapper">
    <StatInput
      stat={$characterStore.momentum.current}
      character={$characterStore}
      showButtons={true}
      showSign={true}
      canEdit={true}
      afterUpdate={updateModifiers}
      label="Current"
    />
    <Divider vertical={true}/>
    <StatInput
      stat={$characterStore.momentum.max}
      character={$characterStore}
      showButtons={false}
      showSign={true}
      canEdit={true}
      afterUpdate={updateModifiers}
      label="Max"
    />
    <StatInput
      stat={$characterStore.momentum.reset}
      character={$characterStore}
      showButtons={false}
      showSign={true}
      canEdit={true}
      afterUpdate={updateModifiers}
      label="Reset"
      onClick={() => {
      	$characterStore.resetMomentum();
      	$characterStore = $characterStore;
      }}
    />
  </div>

  <Divider text="Bonds"/>

  <div class="bonds">
    <ProgressTrack progressTrack={$characterStore.bonds}/>
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
        <ProgressTrack progressTrack={track}/>
      </div>
    {/each}
  </div>

  <Divider text="Debilities"/>

  <div class="debilities">
    {#each Object.entries($characterStore.debilities) as [groupKey, group]}
      <div class="debilities-group">
        <label>{capitalizeFirstLetter(groupKey)}</label>
        {#each Object.keys(group) as debilityKey}
          <div class="debility">
            <label>
              <input
                type="checkbox"
                bind:checked={$characterStore.debilities[groupKey][debilityKey]}
                on:change={updateModifiers}
              >
              {capitalizeFirstLetter(debilityKey)}
            </label>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

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
    align-items: center;
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
