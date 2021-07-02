<script lang="ts" context="module">
  import {ElementType, draggableElement} from "../../customElements";

  export type CoolComponentProps = {
    num: number,
  }

  const type = ElementType.CoolComponent;
</script>

<script lang="ts">
  import {getElementStore} from "../../customElements";

  export let id: string;
  export let draggable: boolean | undefined;

  let store = getElementStore<CoolComponentProps>(id, {
    num: 0,
  });
</script>

<div id="wrapper" use:draggableElement={{draggable, id, type}}>
    <div class="counter">
        <button on:click={() => store.update((x) => ({
            ...x,
            num: x.num - 1,
        }))}>-
        </button>
        <span>Number: {$store.num}</span>
        <button on:click={() => store.update((x) => ({
            ...x,
            num: x.num + 1,
        }))}>+
        </button>
    </div>
</div>

<style>
    #wrapper {
        background: whitesmoke;
        display: flex;
        flex-direction: column;
        width: fit-content;
        padding: 10px;
        border: 1px solid lightgrey;
    }

    .counter {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
    }

    .counter span {
        margin: 0px 5px;
        flex: 1;
    }
</style>
