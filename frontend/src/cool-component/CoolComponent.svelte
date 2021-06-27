<script>
    export let number;

    import { dice } from "../stores";
</script>

<div id="wrapper">
    <span>Number: {number}</span>
    <div id="dice">
        <button on:click={() => dice.update((x) => x - 1)}>-</button>
        <span>Dice: {$dice}</span>
        <button on:click={() => dice.update((x) => x + 1)}>+</button>
    </div>
</div>

<style>
    #wrapper {
        background: whitesmoke;
        display: flex;
        flex-direction: column;
        width: fit-content;
    }

    #dice {
        display: flex;
        flex-direction: row;
    }
</style>
