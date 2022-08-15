<script lang="ts">
  import MoveModal from "./MoveModal.svelte";
  import type {ActionRollLogItem} from "../stores/logStore";
  import {RollResult} from "../mechanics/rolls";


  type Slides =
    | "StatRoll"
    | RollResult

  let currentSlide: Slides = "StatRoll";
  let actionRollLogItem: ActionRollLogItem;
</script>

<MoveModal>
  {#if currentSlide === "StatRoll"}
    <section>
      <p class="move-explainer">
        When you attempt something risky or react to an imminent threat, envision your action and roll.
      </p>
    </section>

    <section>
      <h3>Stat</h3>
      <Selector
        bind:value={statToRoll}
        options={}
      />
    </section>

    <section>
      <h3>Adds</h3>
      <AddsInput
        bind:adds={adds}
      />
    </section>

    <section class="move-footer">
      <NextButton
        icon={}
        disabled={statToRoll === undefined}
        on:click={() => {
        	actionRollLogItem = makeActionRoll(character, statNameToRoll, adds, "Face Danger");
        	currentSlide = actionRollLogItem.props.roll.result;
        }}
        disabledText="Select stat first"
      />
    </section>

  {/if}

  {#if currentSlide === RollResult.StrongHit}
    <section class="move-rollResult">
      <ActionRollResult
        roll={actionRoll}
        character={character}
        updateRoll={updateRoll}
        updateCharacter={updateCharacter}
        canBurnMomentum={true}
      />
    </section>

    <section>
      <p class="move-explainer">
        On a strong hit, you are successful.
      </p>
    </section>

    <section>
      <NextButton
        text="Take +1 Momentum"
        icon={}
        on:click={() => {

        }}
      />
    </section>
  {/if}

  {#if currentSlide === RollResult.WeakHit}
    <section className="move-rollResult">
      <ActionRollResult
        roll={actionRoll}
        character={character}
        updateRoll={updateRoll}
        updateCharacter={updateCharacter}
        canBurnMomentum={true}
      />
    </section>

    <section>
      <p className="move-explainer">
        On a weak hit, you succeed, but face a troublesome cost.
      </p>
    </section>

    <section>
      <h3>Choose one:</h3>
      <Selector
        bind:value={}
        options={}
      />
    </section>

    <section>
      <NextButton
        text={}
        icon={}
        on:click={() => {

        }}
      />
    </section>
  {/if}
  {#if currentSlide === RollResult.Miss}
    <section class="move-rollResult">
      <ActionRollResult
        roll={actionRoll}
        character={character}
        updateRoll={updateRoll}
        updateCharacter={updateCharacter}
        canBurnMomentum={true}
      />
    </section>

    <section>
      <p class="move-explainer">
        On a miss, you fail, or your progress is undermined by a dramatic and costly turn of events.
      </p>
    </section>

    <section>
      <NextButton
        text="Move: Pay the Price"
        icon={}
        on:click={() => {

        }}
      />
    </section>
  {/if}
</MoveModal>
