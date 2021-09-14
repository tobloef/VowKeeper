<script lang="ts">
  import Portal from "svelte-portal/src/Portal.svelte";
  import Fa from "svelte-fa";
  import {
    faTimes,
  } from "@fortawesome/pro-solid-svg-icons";

  export let onClose: () => void;
  export let title: string;
</script>

<Portal>
  <div class="overlay" on:click={onClose}></div>
  <div class="wrapper">
    <div class="modal">
      <div class="header">
        <span class="title">{title}</span>
        {#if onClose !== undefined}
          <div
            class="closeButton"
            on:click={onClose}
          >
            <Fa
              icon={faTimes}
              size="lg"
            />
          </div>
        {/if}
      </div>
      <div class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</Portal>

<style>
  .overlay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
  }

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: white;
    border: 1px solid grey;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }

  .header {
    border-bottom: 1px solid grey;
    display: flex;
    padding: 15px;
    font-size: 1.1em;
    font-weight: bold;
  }

  .body {
    flex: 1;
    padding: 25px 30px;
    min-width: 140px;
    min-height: 80px;
  }

  .title {
    font-size: 1em;
    flex: 1;
  }

  .closeButton {
    height: 1em;
    cursor: pointer;
  }
</style>
