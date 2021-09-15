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

<span>Adventure Moves</span>
<ul>
  <li><button on:click={() => makeMove(MoveType.FaceDanger)}>Face Danger</button></li>
  <li><button on:click={() => makeMove(MoveType.SecureAnAdvantage)}>Secure an Advantage</button></li>
</ul>

{#if moveInProgress !== undefined}
  <svelte:component
    this={moveToModalComponent(moveInProgress)}
    onClose={closeMoveModal}
    character={$characterStore}
  >
  </svelte:component>
{/if}
