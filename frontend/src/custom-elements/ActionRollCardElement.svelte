<script lang="ts">
  import {CustomElementType, getCustomElementStore, draggableElement} from "../customElements";
  import type {ActionRoll} from "../mechanics/rolls";
  import ActionRollCard from "../components/ActionRollCard.svelte";
  import {Character} from "../mechanics/Character";

  type ActionRollCardProps = {
    roll: ActionRoll,
    character: Character,
  }

  export let id: string;
  export let canDropInsert: boolean | undefined;

  let store = getCustomElementStore<ActionRollCardProps>(id);

  const type = CustomElementType.ActionRollCard;
</script>

<div use:draggableElement={{canDropInsert, id, type}}>
  <ActionRollCard
    roll={$store.roll}
    character={$store.character}
    move="Undertake a Journey"
  />
</div>
