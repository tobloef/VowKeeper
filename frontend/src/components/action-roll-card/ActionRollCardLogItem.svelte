<script lang="ts">
  import {DraggableElementType, draggableElement} from "../../draggableElements";
  import ActionRollCard from "./ActionRollCard.svelte";
  import {logStore} from "../../stores/logStore";
  import type {ActionRollLogItem} from "../../stores/logStore";
  import {getCharacterStore} from "../../stores/characterStore";

  export let logItem: ActionRollLogItem;

  $: {
    console.log("Result:", logItem.props.roll.result);
  }

  let characterStore;
  let latestActionRollLogItem;

  $: latestActionRollLogItem = [...$logStore]
    .reverse()
    .find((item) => item.type === DraggableElementType.ActionRollCard);

  $: characterStore = getCharacterStore(logItem.props.characterId)

  const updateRoll = (newRoll) => {
    logStore.replaceItem(
      logItem.id,
      {
        ...logItem,
        props: {
          ...logItem.props,
          roll: newRoll
        }
      }
    );
  }

  const updateCharacter = (newCharacter) => {
    const characterStore = getCharacterStore(newCharacter.id);
    characterStore.set(newCharacter);
  }
</script>

<div
  use:draggableElement={{
    props: logItem.props,
    type: DraggableElementType.ActionRollCard,
  }}
>
  <ActionRollCard
    roll={logItem.props.roll}
    updateRoll={updateRoll}
    character={$characterStore}
    updateCharacter={updateCharacter}
    canBurnMomentum={logItem.id === latestActionRollLogItem?.id}
  />
</div>
