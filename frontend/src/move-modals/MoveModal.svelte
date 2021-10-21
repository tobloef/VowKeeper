<script lang="ts">
  import Modal from "../components/Modal.svelte";
</script>

<Modal>
  <div class="slideWrapper">
    <slot></slot>
  </div>
</Modal>

<style>
  .slideWrapper {
    width: 650px;
    height: 450px;
    display: flex;
    flex-direction: column;
  }

  .slideWrapper :global(.move-explainer) {

  }
</style>
