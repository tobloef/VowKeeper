<script lang="ts">
  export let text;
  export let vertical = false;
</script>

<div class="separator" class:vertical>{text || ""}</div>

<style>
  .separator {
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: bold;
  }

  /* Horizontal */

  .separator:not(.vertical) {
    flex-direction: row;
  }

  .separator:not(.vertical)::before,
  .separator:not(.vertical)::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #000;
  }

  .separator:not(.vertical):not(:empty)::before {
    margin-right: 0.25em;
  }

  .separator:not(.vertical):not(:empty)::after {
    margin-left: 0.25em;
  }

  /* Vertical */

  .separator.vertical {
    flex-direction: column;
  }

  .separator.vertical::before,
  .separator.vertical::after {
    content: '';
    flex: 1;
    border-right: 1px solid #000;
  }

  .separator.vertical:not(:empty)::before {
    margin-bottom: 0.25em;
  }

  .separator.vertical:not(:empty)::after {
    margin-top: 0.25em;
  }
</style>
