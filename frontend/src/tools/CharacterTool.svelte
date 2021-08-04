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
  import {logStore} from "../stores";

  export let characterStore: Writable<Character>;

  const createActionRollLogEntry = (stat) => {
    const storeId = nanoid();
    const roll = rollActionRoll(stat, 1);
    getCustomElementStore(storeId, {
      roll,
      character: $characterStore,
    });
    return {
      type: CustomElementType.ActionRollCard,
      storeId,
    };
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
      <input type="number" value={$characterStore.experience.getValue()}>
    </div>
  </div>

  <Divider text="Stats"/>

  <div class="stats stats-wrapper">
    {#each ["edge", "heart", "iron", "shadow", "wits"] as stat}
      <StatInput
        stat={$characterStore.stats[stat]}
        showButtons={false}
        showSign={true}
        canEdit={true}
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
      showButtons={true}
      showSign={true}
      canEdit={true}
      label="Current"
    />
    <Divider vertical={true}/>
    <StatInput
      stat={$characterStore.momentum.max}
      showButtons={false}
      showSign={true}
      canEdit={true}
      label="Max"
    />
    <StatInput
      stat={$characterStore.momentum.reset}
      showButtons={false}
      showSign={true}
      canEdit={true}
      label="Reset"
    />
  </div>

  <Divider text="Bonds"/>

  <div>
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
        <div class="buttons">
          <button>Mark progress</button>
          <button>Progress Move</button>
        </div>
      </div>
    {/each}
  </div>

  <Divider text="Debilities"/>

  <div class="debilities">
    <div class="debilities-group">
      <label>Conditions</label>
      <div class="debility">
        <input type="checkbox" bind:checked={$characterStore.debilities.conditions.wounded}>
        <label>Wounded</label>
      </div>
      <div class="debility">
        <input type="checkbox" bind:checked={$characterStore.debilities.conditions.unprepared}>
        <label>Unprepared</label>
      </div>
      <div class="debility">
        <input type="checkbox" bind:checked={$characterStore.debilities.conditions.shaken}>
        <label>Shaken</label>
      </div>
      <div class="debility">
        <input type="checkbox" bind:checked={$characterStore.debilities.conditions.encumbered}>
        <label>Encumbered</label>
      </div>
    </div>

    <div class="debilities-group">
      <label>Banes</label>
      <div class="debility">
        <input type="checkbox" bind:checked={$characterStore.debilities.banes.maimed}>
        <label>Maimed</label>
      </div>
      <div class="debility">
        <input type="checkbox" bind:checked={$characterStore.debilities.banes.corrupted}>
        <label>Corrupted</label>
      </div>
    </div>

    <div class="debilities-group">
      <label>Burdens</label>
      <div class="debility">
        <input type="checkbox" bind:checked={$characterStore.debilities.burdens.cursed}>
        <label>Cursed</label>
      </div>
      <div class="debility">
        <input type="checkbox" bind:checked={$characterStore.debilities.burdens.tormented}>
        <label>Tormented</label>
      </div>
    </div>
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

  :global(.vow:not(:last-child)) {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
  }

  :global(.vow .header) {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }

  :global(.vow .buttons) {
    margin-top: 5px;
  }

  :global(.vow .buttons :not(:last-child)) {
    margin-right: 5px;
  }

  :global(.vow .header input) {
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

  .debilities .debility:not(:last-child) {
    margin-bottom: 5px;
  }
</style>
