<script>
    export let number;

    let local = 0;

    import { dice } from "../stores";
</script>

<div id="wrapper">
    <span>Parameter: {number}</span>
    <div class="counter">
        <button on:click={() => local--}>-</button>
        <span>Local: {local}</span>
        <button on:click={() => local++}>+</button>
    </div>
    <div class="counter">
        <button on:click={() => dice.update((x) => x - 1)}>-</button>
        <span>Global: {$dice}</span>
        <button on:click={() => dice.update((x) => x + 1)}>+</button>
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
