<script lang="ts">
  import {ChallengeRanks} from "../mechanics/Progress";
  import {Character} from "../mechanics/Character";
  import ProgressTrack from "../components/ProgressTrackComponent.svelte";
  import {Writable} from "svelte/store";

  export let characterStore: Writable<Character>;
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

    <div class="stats">
        <div class="edge">
            <label>Edge</label>
            <input type="number" value={$characterStore.stats.edge.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.stats.edge.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.stats.edge.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
        <div>
            <label>Heart</label>
            <input type="number" value={$characterStore.stats.heart.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.stats.heart.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.stats.heart.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
        <div>
            <label>Iron</label>
            <input type="number" value={$characterStore.stats.iron.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.stats.iron.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.stats.iron.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
        <div>
            <label>Shadow</label>
            <input type="number" value={$characterStore.stats.shadow.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.stats.shadow.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.stats.shadow.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
        <div>
            <label>Wits</label>
            <input type="number" value={$characterStore.stats.wits.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.stats.wits.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.stats.wits.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
    </div>

    <div>
        <label>Bonds</label>
        <ProgressTrack progressTrack={$characterStore.bonds} />
    </div>

    <div>
        <div>
            <label>Momentum</label>
            <input type="number" value={$characterStore.momentum.value.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.momentum.value.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.momentum.value.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
        <div>
            <label>Maximum Momentum</label>
            <input type="number" value={$characterStore.momentum.max.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.momentum.max.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.momentum.max.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
        <div>
            <label>Momentum Reset</label>
            <input type="number" value={$characterStore.momentum.reset.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.momentum.reset.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.momentum.reset.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
    </div>

    <div>
        <div>
            <label>Health</label>
            <input type="number" value={$characterStore.statuses.health.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.statuses.health.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.statuses.health.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
        <div>
            <label>Spirit</label>
            <input type="number" value={$characterStore.statuses.spirit.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.statuses.spirit.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.statuses.spirit.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
        <div>
            <label>Supply</label>
            <input type="number" value={$characterStore.statuses.supply.getValue()}>
            <button on:click={characterStore.update((character) => {
                character.statuses.supply.baseValue += 1;
                return character;
            })}>+</button>
            <button on:click={characterStore.update((character) => {
                character.statuses.supply.baseValue -= 1;
                return character;
            })}>-</button>
        </div>
    </div>

    <div>
        {#each $characterStore.vows as track}
            <div>
                <input bind:value={track.name}>
                <select bind:value={track.rank}>
                    {#each Object.values(ChallengeRanks) as rank}
                        <option value={rank}>{rank.name}</option>
                    {/each}
                </select>
                <ProgressTrack progressTrack={track} />
            </div>
        {/each}
    </div>

    <div>
        <label>Debilities</label>
        <div>
            <label>Conditions</label>
            <div>
                <input type="checkbox" bind:checked={$characterStore.debilities.conditions.wounded}>
                <label>Wounded</label>
            </div>
            <div>
                <input type="checkbox" bind:checked={$characterStore.debilities.conditions.unprepared}>
                <label>Unprepared</label>
            </div>
            <div>
                <input type="checkbox" bind:checked={$characterStore.debilities.conditions.shaken}>
                <label>Shaken</label>
            </div>
            <div>
                <input type="checkbox" bind:checked={$characterStore.debilities.conditions.encumbered}>
                <label>Encumbered</label>
            </div>
        </div>
        <div>
            <label>Banes</label>
            <div>
                <input type="checkbox" bind:checked={$characterStore.debilities.banes.maimed}>
                <label>Maimed</label>
            </div>
            <div>
                <input type="checkbox" bind:checked={$characterStore.debilities.banes.corrupted}>
                <label>Corrupted</label>
            </div>
        </div>
        <div>
            <label>Burdens</label>
            <div>
                <input type="checkbox" bind:checked={$characterStore.debilities.burdens.cursed}>
                <label>Cursed</label>
            </div>
            <div>
                <input type="checkbox" bind:checked={$characterStore.debilities.burdens.tormented}>
                <label>Tormented</label>
            </div>
        </div>
    </div>
</div>

<style>
    :global(.character div) {
        border: 1px solid black;
        padding: 5px;
    }
</style>
