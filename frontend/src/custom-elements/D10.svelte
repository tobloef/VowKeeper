<script lang="ts" context="module">
  export type D10Props = {
    number: OneToTen,
  }
</script>

<script lang="ts">
  import {CustomElementType, getCustomElementStore, draggableElement} from "../customElements";

  export let id: string;
  export let canDropInsert: boolean | undefined;

  let store = getCustomElementStore<D10Props>(id, {
    number: _.random(1, 10)
  });

  const type = CustomElementType.D10;
</script>

<div
        use:draggableElement={{canDropInsert, id, type}}
        class="d10 dice"
>
    <D10
      number={$store.number}
    />
</div>
