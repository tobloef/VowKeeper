<script lang="ts">
  import {ProgressTrack} from "../mechanics/Progress";
  import ProgressBox from "./ProgressBox.svelte";

  export let progressTrack: ProgressTrack;
</script>

<div class="progress-track">
  {#each Array(10) as _, i}
    <ProgressBox
      progress={Math.min(Math.max(progressTrack.ticks - (4 * i), 0), 4)}
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
