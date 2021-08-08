<script lang="ts">
  import {ProgressTrack} from "../mechanics/Progress";
  import ProgressBox from "./ProgressBox.svelte";

  export let progressTrack: ProgressTrack;
  export let onTicksChange: (newTicks: number) => void;

  const getProgressBoxTicks = (ticks, i) => {
    return Math.min(Math.max(ticks - (4 * i), 0), 4);
  }

  $: onProgressBoxClick = (i) => {
    const ticks = getProgressBoxTicks(progressTrack.ticks, i);
    let newTicks = progressTrack.ticks;
    if (ticks === 4) {
      newTicks -= Math.max(progressTrack.rank.ticksPerProgress, 4);
    } else {
      newTicks += progressTrack.rank.ticksPerProgress;
    }
    onTicksChange(newTicks);
  }


</script>

<div class="progress-track">
  {#each Array(10) as _, i}
    <ProgressBox
      progress={getProgressBoxTicks(progressTrack.ticks, i)}
      onClick={() => onProgressBoxClick(i)}
    />
  {/each}
</div>

<style>
  .progress-track {
    display: flex;
    flex-direction: row;
  }

  :global(.progress-track :not(:last-child)) {
    margin-right: 5px;
  }
</style>
