<script lang="ts">
  import D10 from "./D10.svelte";

  export let number: number;

  const tensPart: number = Math.floor(number / 10);
  const onesPart: number = number % 10;
</script>

<div class="wrapper">
    <D10 number={tensPart} />
    <D10 number={onesPart} />
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
    }
</style>
