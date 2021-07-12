<script>
  import ActionScore from "../components/ActionScore.svelte";
  const {rollActionRoll} = require("./rolls");
</script>Combat

<ActionScore actionScore={rollActionRoll({type: "edge", value: 2}, 1).actionScore} />
