<script lang="ts">
  import {MoveType} from "../mechanics/moves";
  import {moveToModalComponent} from "../mechanics/moves";
  import {getCharacterStore} from "../stores/characterStore";

  const characterStore = getCharacterStore("mock");

  let moveInProgress: MoveType

  const makeMove = (moveType: MoveType) => {
    moveInProgress = moveType;
  }

  const closeMoveModal = () => {
    moveInProgress = undefined;
  }
</script>

<div class="wrapper">
  <span>Adventure Moves</span>
  <ul>
    <li><button on:click={() => makeMove(MoveType.FaceDanger)}>Face Danger</button></li>
  </ul>
</div>

{#if moveInProgress !== undefined}
  <svelte:component
    this={moveToModalComponent(moveInProgress)}
    onClose={closeMoveModal}
    character={$characterStore}
  >
  </svelte:component>
{/if}

<style>
  .wrapper {
    padding: 15px;
  }
</style>