<script>
	import {Route, router, active} from "tinro";
	import CharacterTool from "./tools/CharacterTool.svelte";
	import Fa from "svelte-fa";
	import {
		faList,
		faUser,
		faDice,
    faQuestion,
	} from "@fortawesome/free-solid-svg-icons";
	import {getCharacterStore} from "./stores/characterStore";
	import LogTool from "./tools/LogTool.svelte";
	import OraclesTool from "./tools/OraclesTool.svelte";
	import MovesTool from "./tools/MovesTool.svelte";

	router.mode.hash();
</script>

<div id="tools">
  <nav>
    <a href="/#/log" use:active>
      <span><Fa icon={faList}/>Log</span>
    </a>
    <a href="/#/character" use:active>
      <span><Fa icon={faUser}/>Character</span>
    </a>
    <a href="/#/moves" use:active>
      <span><Fa icon={faDice}/>Moves</span>
    </a>
    <a href="/#/oracles" use:active>
      <span><Fa icon={faQuestion}/>Oracles</span>
    </a>
  </nav>
  <section>
    <Route path="/log">
      <LogTool />
    </Route>
    <Route path="/character">
      <CharacterTool characterStore={getCharacterStore("mock")}/>
    </Route>
    <Route path="/moves">
      <MovesTool />
    </Route>
    <Route path="/oracles">
      <OraclesTool />
    </Route>
  </section>
</div>

<style>
  #tools {
    height: 100%;
    box-sizing: border-box;
    background: white;
    box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    display: flex;
    flex-direction: column;
  }

  nav {
    border-bottom: 1px solid lightgrey;
    padding: 5px 10px;
    display: flex;
    flex-wrap: wrap;
  }

  nav a {
    text-decoration: none;
    color: dimgrey;
  }

  nav span {
    display: inline-block;
    line-height: 1.5em;
  }

  nav a:not(:last-child) {
    margin-right: 15px;
  }

  :global(nav a.active span) {
    font-weight: bold;
    color: black;
  }

  :global(nav svg) {
    margin-right: 5px;
  }

  section {
    flex: 1;
    overflow-y: hidden;
  }
</style>
