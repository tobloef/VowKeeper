<script lang="ts" context="module">
  export type D6Props = {
    number: OneToSix,
  }
</script>

<script lang="ts">
  import {CustomElementType, getCustomElementStore, draggableElement} from "../customElements";

  export let id: string;
  export let canDropInsert: boolean | undefined;

  let store = getCustomElementStore<D6Props>(id, {
    number: _.random(1, 6)
  });

  const type = CustomElementType.D6;
</script>

<div
        class="d6 dice"
        use:draggableElement={{canDropInsert, id, type}}
>
    <D6
        number={$store.number}
    />
</div>
