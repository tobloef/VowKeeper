<script>
  import CoolComponent from "../node-views/cool-component/CoolComponent.svelte";

</script>

<div>
    <h1>Log</h1>
    <div class="list">
        <CoolComponent id="321" />
        <CoolComponent id="123" />
        <CoolComponent id="123" />
    </div>
</div>

<style>
    .list {
        display: flex;
        flex-direction: column;
    }
</style>
