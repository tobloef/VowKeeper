<script lang="ts">
  import FaceDanger from "../move-modals/FaceDangerModal.svelte";
  import {MoveType} from "../mechanics/moves";
  import {moveToModalComponent} from "../mechanics/moves";

  let moveInProgress: MoveType

  const makeMove = (moveType: MoveType) => {
    moveInProgress = moveType;
  }
</script>

<ul>
  <li><button on:click={() => makeMove(MoveType.FaceDanger)}>Face Danger</button></li>
</ul>

{#if moveInProgress !== null}
  <svelte:component
    this={moveToModalComponent(moveInProgress)}
    showModal={true}
  >
  </svelte:component>
{/if}
