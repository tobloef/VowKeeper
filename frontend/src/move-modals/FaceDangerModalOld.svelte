<script lang="ts">
  import Modal from "../components/Modal.svelte";
  import Fa from "svelte-fa";
  import {faDiceD6} from "@fortawesome/pro-solid-svg-icons";
  import type {StatName} from "../mechanics/stat";
  import {formatNumber} from "../utils";
  import StatSelector from "../components/StatSelector.svelte";
  import {
    ActionRoll,
    makeActionRoll,
  } from "../mechanics/rolls";
  import type {Character} from "../mechanics/character";
  import ActionRollResult from "../components/ActionRollResult.svelte";
  import {
    ActionRollLogItem,
    logStore,
  } from "../stores/logStore";
  import {getCharacterStore} from "../stores/characterStore";
  import {RollResult} from "../mechanics/rolls";
  import {html} from "../htmlAction.js";

  export let onClose;
  export let character: Character;
  export let defaultAdds: {
    value: number,
    reason: string,
  } | undefined = undefined;

  let statNameToRoll: StatName | undefined;
  let adds: number = defaultAdds?.value ?? 0;
  let actionRollLogItem: ActionRollLogItem | undefined;
  let actionRoll: ActionRoll | undefined;
  let selectedResultIndex: number;

  $: actionRoll = actionRollLogItem?.props.roll;

  const onRoll = () => {
    actionRollLogItem = makeActionRoll(character, statNameToRoll, adds, "Face Danger");
  };

  const updateRoll = (newRoll: ActionRoll) => {
    actionRollLogItem = {
      ...actionRollLogItem,
      props: {
        ...actionRollLogItem.props,
        roll: newRoll,
      },
    };
    logStore.replaceItem(actionRollLogItem.id, actionRollLogItem);
  };

  const updateCharacter = (newCharacter) => {
    const characterStore = getCharacterStore(newCharacter.id);
    characterStore.set(newCharacter);
  };

  const resultOptions = [
    {
      optionHtml: "<span><b>Suffer -1 Momentum</b> - You are delayed, lose advantage, or face a new danger</span>",
      rollResultText: "",
      applyResult: () => {
      },
    },
    {
      optionHtml: "<span><b>Suffer -1 Supply</b> - You sacrifice resources</span>",
      rollResultText: "",
      applyResult: () => {
      },
    },
    {
      optionHtml: "<span><b>Endure 1 Harm</b> - You are tired or hurt</span>",
      rollResultText: "",
      applyResult: () => {
      },
    },
    {
      optionHtml: "<span><b>Endure 1 Stress</b> - You are dispirited or afraid</span>",
      rollResultText: "",
      applyResult: () => {
      },
    },
  ];
</script>

<Modal
  open={true}
  title="Move - Face Danger"
  onClose={onClose}
>
  <div class="content">
    {#if actionRoll === undefined}
      <section>
        <p class="explainer">
          When you attempt something risky or react to an imminent threat, envision your action and roll.
        </p>
      </section>

      <section>
        <h3>Stat</h3>
        <StatSelector
          bind:selectedStat={statNameToRoll}
        />
      </section>

      <section>
        <h3>Adds</h3>
        <div class="addsInputWrapper">
          <input
            type="number"
            bind:value={adds}
            class="addsInput"
            class:highlighted={defaultAdds !== undefined}
          />
          {#if defaultAdds !== undefined}
              <span class="addsExplainer deemphasized">
                ({formatNumber(defaultAdds.value)} from <i>{defaultAdds.reason}</i>)
              </span>
          {/if}
        </div>
      </section>

      <section>
        <div class="rollButtonWrapper">
          <button
            on:click={onRoll}
            disabled={statNameToRoll === undefined}
            class="nextStepButton"
          >
            <Fa icon={faDiceD6}/>
            Roll
          </button>
          {#if statNameToRoll === undefined}
            <span class="deemphasized rollDisabledExplainer">
              (Select stat first)
            </span>
          {/if}
        </div>
      </section>
    {/if}

    {#if actionRoll !== undefined}
      <section>
        <div class="rollResultContainer">
          <ActionRollResult
            roll={actionRoll}
            character={character}
            updateRoll={updateRoll}
            updateCharacter={updateCharacter}
            canBurnMomentum={true}
          />
        </div>
      </section>

      <section>
        <p class="explainer">
          {#if actionRoll.result === RollResult.StrongHit}
            On a strong hit, you are successful.
          {/if}
          {#if actionRoll.result === RollResult.WeakHit}
            On a weak hit, you succeed, but face a troublesome cost.
          {/if}
          {#if actionRoll.result === RollResult.Miss}
            On a miss, you fail, or your progress is undermined by a dramatic and costly turn of events.
          {/if}
        </p>
      </section>
      <section>
        {#if actionRoll.result === RollResult.StrongHit}
          <b>Take +1 momentum</b>
        {/if}
        {#if actionRoll.result === RollResult.WeakHit}

          <h3>Choose one:</h3>
          <div class="choiceList">
            {#each resultOptions as resultOption, i}
              <label>
                <input type="radio" bind:group={selectedResultIndex} value={i}>
                <span use:html={resultOption.optionHtml}></span>
              </label>
            {/each}
          </div>
        {/if}
        {#if actionRoll.result === RollResult.Miss}
          <b>Pay the Price</b>
        {/if}
      </section>

      <section>
        <button
          on:click={onClose}
          class="nextStepButton"
        >
          Finish
        </button>
      </section>
    {/if}
  </div>
</Modal>

<style>
  .content {
    width: 650px;
    height: 450px;
    display: flex;
    flex-direction: column;
  }

  p {
    margin: 0px;
  }

  h3 {
    margin-top: 0px;
    margin-bottom: 5px;
  }

  section {
    margin-bottom: 20px;
  }

  .explainer {
    font-style: italic;
  }

  .deemphasized {
    color: grey;
    font-style: italic;
  }

  .addsInput {
    width: 150px;
  }

  .addsInput.highlighted {
    color: darkorange;
    caret-color: black;
    font-weight: bold;
  }

  .nextStepButton {
    min-width: 6em;
    min-height: 1.75em;
		font-size: 1em;
  }

  .addsExplainer,
  .rollDisabledExplainer {
    margin-left: 5px;
  }

  .rollButtonWrapper {
    margin-top: 10px;
    display: flex;
  }

  .addsInputWrapper {
    display: flex;
  }

  .rollResultContainer {
    display: flex;
    background: hsl(0, 0%, 97%);
    border: 2px solid hsl(0, 0%, 25%);
    border-radius: 5px;
    padding: 25px 20px;
    justify-content: center;
    margin: 0px 75px;
  }

  .rollPage section:not(:last-child) {
    margin-bottom: 30px;
  }

  .resultPage section:not(:last-child) {
    margin-bottom: 30px;
  }

  .choiceList {
    display: flex;
    flex-direction: column;
  }

  .choiceList > :not(:last-child) {
    margin-bottom: 10px;
  }
</style>
