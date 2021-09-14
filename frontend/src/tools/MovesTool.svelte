<script lang="ts">
  import {MoveType} from "../mechanics/moves";
  import {moveToModalComponent} from "../mechanics/moves";

  let moveInProgress: MoveType

  const makeMove = (moveType: MoveType) => {
    moveInProgress = moveType;
  }

  const closeMoveModal = () => {
    moveInProgress = null;
  }
</script>

<ul>
  <li><button on:click={() => makeMove(MoveType.FaceDanger)}>Face Danger</button></li>
</ul>

{#if moveInProgress !== null}
  <svelte:component
    this={moveToModalComponent(moveInProgress)}
    onClose={closeMoveModal}
  >
  </svelte:component>
{/if}
