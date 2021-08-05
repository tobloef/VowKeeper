<script lang="ts">
  import {CustomElementType, getCustomElementStore, draggableElement} from "../customElements";
  import type {ActionRoll} from "../mechanics/rolls";
  import ActionRollCard from "../components/ActionRollCard.svelte";
  import {Character} from "../mechanics/Character";
  import {logStore} from "../stores";

  type ActionRollCardProps = {
    roll: ActionRoll,
    character: Character,
  }

  export let storeId: string;
  export let canDropInsert: boolean | undefined;

  let latestActionRollStoreId;

  let store = getCustomElementStore<ActionRollCardProps>(storeId);

  const type = CustomElementType.ActionRollCard;

  $: latestActionRollStoreId = [...$logStore]
    .reverse()
    .find((item) => item.type === CustomElementType.ActionRollCard)
    ?.storeId;
</script>

<div use:draggableElement={{canDropInsert, storeId, type}}>
  <ActionRollCard
    roll={$store.roll}
    character={$store.character}
    move="Undertake a Journey"
    isLatest={storeId === latestActionRollStoreId}
  />
</div>
