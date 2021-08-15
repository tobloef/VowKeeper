<script lang="ts">
  import Modal from "../components/Modal.svelte";
  import Fa from "svelte-fa";
  import {
    faFistRaised,
    faDiceD6,
    faHeart,
    faFastForward,
    faMoon,
    faBrain,
  } from "@fortawesome/free-solid-svg-icons";

  let showModal = true;

  let stat;
</script>

<Modal
  open={showModal}
  title="Move - Face Danger"
  onClose={() => showModal = false}
>
  <div class="wrapper">
    <span class="moveText">
      When you attempt something risky or react to an imminent threat, envision your action and roll.
    </span>
    <div class="statsWrapper">
      <span class="header">Roll with</span>
      <div>
        <div class="statOptions">
          <label>
            <input type="radio" bind:group={stat} value={"iron"}>
            <Fa icon={faFistRaised} fw={true} /> <b>Iron</b> - Aggressive action, forceful defense, strength, or endurance
          </label>
          <label>
            <input type="radio" bind:group={stat} value={"heart"}>
            <Fa icon={faHeart} fw={true} /> <b>Heart</b> - Charm, loyalty, or courage
          </label>
          <label>
            <input type="radio" bind:group={stat} value={"edge"}>
            <Fa icon={faFastForward} fw={true} /> <b>Edge</b> - Speed, agility, or precision
          </label>
          <label>
            <input type="radio" bind:group={stat} value={"shadow"}>
            <Fa icon={faMoon} fw={true} /> <b>Shadow</b> - Deception, stealth, or trickery
          </label>
          <label>
            <input type="radio" bind:group={stat} value={"wits"}>
            <Fa icon={faBrain} fw={true} /> <b>Wits</b> - Expertise, insight, or observation
          </label>
        </div>
      </div>
    </div>

    <div class="addsWrapper">
      <span class="header">Adds</span>
      <div>
        <input type="number" value={1} />
        <span class="addsExplainer deemphasized">
          (+1 from <i>{"Make Camp"}</i>)
        </span>
      </div>
    </div>

    <div class="rollWrapper">
      <button disabled={stat === undefined}>
        <Fa icon={faDiceD6} /> Roll
      </button>
      {#if stat === undefined}
        <span class="deemphasized">(Select stat first)</span>
      {/if}
    </div>
  </div>
</Modal>

<style>
  .wrapper {
    width: 600px;
  }

  .moveText {
    font-style: italic;
    margin-bottom: 20px;
    display: block;
  }

  .statOptions {
    display: flex;
    flex-direction: column;
  }

  .statOptions > *:not(:last-child) {
    margin-bottom: 10px;
  }

  .header {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
    font-size: 1.05em;
  }

  .deemphasized {
    color: darkgrey;
    font-style: italic;
  }

  .statsWrapper {
    margin-bottom: 20px;
  }

  .addsWrapper {
    margin-bottom: 20px;
  }

  .addsWrapper input {
    color: darkorange;
    caret-color: black;
    font-weight: bold;
  }

  .rollWrapper button {
    min-width: 100px;
    min-height: 25px;
  }
</style>
