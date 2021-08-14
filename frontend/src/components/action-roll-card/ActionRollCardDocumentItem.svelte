<script lang="ts">
  import ActionRollCard from "./ActionRollCard.svelte";
  import {getCharacterStore} from "../../stores/characterStore";
  import type {ActionRoll} from "../../mechanics/rolls";

  export let roll: ActionRoll;
  export let characterId: string;

  let characterStore;

  $: characterStore = getCharacterStore(characterId);
</script>

<ActionRollCard
  roll={roll}
  character={$characterStore}
/>
