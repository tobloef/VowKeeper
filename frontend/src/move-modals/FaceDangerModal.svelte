<script lang="ts">
  import Modal from "../components/Modal.svelte";
  import Fa from "svelte-fa";
  import { faDiceD6 } from "@fortawesome/pro-solid-svg-icons";
  import type { StatName } from "../mechanics/stat";
  import { formatNumber } from "../utils";
  import StatSelector from "../components/StatSelector.svelte";
  import {
    ActionRoll,
    makeActionRoll,
  } from "../mechanics/rolls";
  import type { Character } from "../mechanics/character";
  import ActionRollResult from "../components/ActionRollResult.svelte";
  import {
    ActionRollLogItem,
    logStore,
  } from "../stores/logStore";
  import { getCharacterStore } from "../stores/characterStore";
  import { RollResult } from '../mechanics/rolls';

  export let onClose;
  export let character: Character;
  export let defaultAdds: {
    value: number,
    reason: string,
  } | undefined = undefined;

  let statNameToRoll: StatName | undefined;
  let adds: number = defaultAdds?.value ?? 0;
  let actionRollLogItem: ActionRollLogItem | undefined = undefined;
  let actionRoll: ActionRoll | undefined = undefined;

  $: actionRoll = actionRollLogItem?.props.roll;

  const onRoll = () => {
    actionRollLogItem = makeActionRoll(character, statNameToRoll, adds, "Face Danger");
  }

  const updateRoll = (newRoll: ActionRoll) => {
    actionRollLogItem = {
      ...actionRollLogItem,
      props: {
        ...actionRollLogItem.props,
        roll: newRoll,
      },
    };
    logStore.replaceItem(actionRollLogItem.id, actionRollLogItem);
  }

  const updateCharacter = (newCharacter) => {
    const characterStore = getCharacterStore(newCharacter.id);
    characterStore.set(newCharacter);
  }
</script>

<Modal
  open={true}
  title="Move - Face Danger"
  onClose={onClose}
>
  <div class="wrapper">
    {#if actionRoll === undefined}
      <div class="rollPage">
        <section>
          <span class="moveText">
            When you attempt something risky or react to an imminent threat, envision your action and roll.
          </span>
        </section>

        <section>
          <div class="statsWrapper">
            <span class="header">Stat</span>
            <StatSelector
              bind:selectedStat={statNameToRoll}
            />
          </div>
        </section>

        <section>
          <div class="addsWrapper">
            <span class="header">Adds</span>
            <div>
              <input
                type="number"
                bind:value={adds}
                class:highlighted={defaultAdds !== undefined}
              />
              {#if defaultAdds !== undefined}
                <span class="addsExplainer deemphasized">
                  ({formatNumber(defaultAdds.value)} from <i>{defaultAdds.reason}</i>)
                </span>
              {/if}
            </div>
          </div>
        </section>

        <section>
          <div class="rollWrapper">
            <button
              on:click={onRoll}
              disabled={statNameToRoll === undefined}
            >
              <Fa icon={faDiceD6} /> Roll
            </button>
            {#if statNameToRoll === undefined}
              <span class="deemphasized rollDisabledExplainer">
                (Select stat first)
              </span>
            {/if}
          </div>
        </section>
      </div>
    {/if}

    {#if actionRoll !== undefined}
      <div class="resultPage">
        <div class="result">
          <section class="rollResultContainer">
            <ActionRollResult
              roll={actionRoll}
              character={character}
              updateRoll={updateRoll}
              updateCharacter={updateCharacter}
              canBurnMomentum={true}
            />
          </section>

          <section>
            {#if actionRoll.result === RollResult.StrongHit}
              <span>
                On a strong hit, you are successful. Take +1 momentum.
              </span>
            {/if}
            {#if actionRoll.result === RollResult.WeakHit}
              <span>
                On a weak hit, you succeed, but face a troublesome cost. Choose one:
              </span>
              <ul class="choiceList">
                <li>You are delayed, lose advantage, or face a new danger: Suffer -1 momentum.</li>
                <li>You are tired or hurt: <i>Endure Harm</i> (1 harm).</li>
                <li>You are dispirited or afraid: <i>Endure Stress</i> (1 stress).</li>
                <li>You sacrifice resources: Suffer -1 supply.</li>
              </ul>
            {/if}
            {#if actionRoll.result === RollResult.Miss}
              <span>
                On a miss, you fail, or your progress is undermined by a dramatic and costly turn of events. <i>Pay the Price</i>.
              </span>
            {/if}
          </section>
        </div>

        <section class="finishWrapper">
          <button on:click={onClose}>Finish</button>
        </section>
      </div>
    {/if}
  </div>
</Modal>

<style>
  .wrapper {
    width: 600px;
    height: 375px;
    display: flex;
    flex-direction: column;
  }

  .moveText {
    font-style: italic;
    display: block;
  }

  .header {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
    font-size: 1.1em;
  }

  .deemphasized {
    color: grey;
    font-style: italic;
  }

  .addsWrapper input.highlighted {
    color: darkorange;
    caret-color: black;
    font-weight: bold;
  }

  .rollWrapper button {
    min-width: 100px;
    min-height: 25px;
  }

  .addsExplainer,
  .rollDisabledExplainer {
    margin-left: 3px;
  }

  .rollResultContainer {
    display: flex;
    background: hsl(0, 0%, 95%);
    border: 2px solid hsl(0, 0%, 25%);
    border-radius: 5px;
    padding: 25px 20px;
    justify-content: center;
    margin: 0px 75px;
  }

  .finishWrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .finishWrapper button {
    height: 2em;
    min-width: 100px;
  }

  .rollPage section:not(:last-child) {
    margin-bottom: 30px;
  }

  .resultPage section:not(:last-child) {
    margin-bottom: 40px;
  }

  .resultPage {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .result {
    flex: 1;
  }

  .choiceList {
    margin: 10px 0px;
  }

  .choiceList li:not(:last-child) {
    margin-bottom: 5px;
  }
</style>
