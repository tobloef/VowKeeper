<script lang="ts">
  import {CustomElementType, getCustomElementStore, draggableElement} from "../customElements";
  import {getResult} from "../mechanics/rolls";
  import ActionRollCard from "../components/ActionRollCard.svelte";
  import {getCharacterStore, logStore} from "../stores";
  import type {ActionRollCardStoreProps} from "../stores"

  export let storeId: string;
  export let canDropInsert: boolean | undefined;

  let latestActionRollStoreId;

  const type = CustomElementType.ActionRollCard;
  const store = getCustomElementStore<ActionRollCardStoreProps>(storeId);
  const characterStore = getCharacterStore($store.characterStoreId);

  const burnMomentum = () => {
      console.debug("Burning momentum...");
      $store.roll.momentumBurned = true;
      $store.roll.challengeDice[0].isHit = (
        $store.roll.challengeDice[0].isHit ||
        $store.roll.momentumAtRoll > $store.roll.challengeDice[0].value
      );
      $store.roll.challengeDice[1].isHit = (
        $store.roll.challengeDice[1].isHit ||
        $store.roll.momentumAtRoll > $store.roll.challengeDice[1].value
      );
      $store.roll.result = getResult(
        $store.roll.challengeDice[0].isHit,
        $store.roll.challengeDice[1].isHit,
      );

      $characterStore.momentum.current.baseValue = $characterStore.momentum.reset.getValue();
  };

  $: latestActionRollStoreId = [...$logStore]
    .reverse()
    .find((item) => item.type === CustomElementType.ActionRollCard)
    ?.storeId;
</script>

<div use:draggableElement={{canDropInsert, storeId, type}}>
    <ActionRollCard
      roll={$store.roll}
      character={$characterStore}
      move={$store.roll.move}
      isLatest={storeId === latestActionRollStoreId}
      viewOnly={!canDropInsert}
      burnMomentum={burnMomentum}
    />
</div>
