<script lang="ts">
    import {getElementStore, dragElement, ElementType} from "../../stores";

    export type CoolComponentProps = {
      global: number,
    }

    export let id: string;

    const type = ElementType.CoolComponent;

    const store = getElementStore<CoolComponentProps>(id, {
      global: 0,
    });
</script>

<div
        id="wrapper"
        draggable="true"
        on:dragstart={() => dragElement.set({id, type})}
        on:dragend={() => dragElement.set(undefined)}
>
    <div class="counter">
        <button on:click={() => store.update((x) => ({
            ...x,
            global: x.global - 1,
        }))}>-</button>
        <span>Global: {$store.global}</span>
        <button on:click={() => store.update((x) => ({
            ...x,
            global: x.global + 1,
        }))}>+</button>
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

        user-select: none;
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
