<script>
  import { Route } from 'tinro';
  import Log from './tools/Log.svelte';
  import Character from './tools/Character.svelte';
  import Notes from './tools/Notes.svelte';
  import Combat from './tools/Combat.svelte';
  import Map from './tools/Map.svelte';
  import Oracles from './tools/Oracles.svelte';
</script>

<div id="tools">
	<nav>
		<a href="/log">Log</a>
		<a href="/character">Character</a>
		<a href="/notes">Notes</a>
		<a href="/combat">Combat</a>
		<a href="/map">Map</a>
		<a href="/oracles">Oracles</a>
	</nav>
	<section>
		<Route path="/log">
			<Log/>
		</Route>
		<Route path="/character">
			<Character/>
		</Route>
		<Route path="/notes">
			<Notes/>
		</Route>
		<Route path="/combat">
			<Combat/>
		</Route>
		<Route path="/map">
			<Map/>
		</Route>
		<Route path="/oracles">
			<Oracles/>
		</Route>
	</section>
</div>

<style>
  #tools {
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    background: white;
    box-shadow: rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    display: flex;
    flex-direction: column;
  }

  nav {
    border-bottom: 1px solid lightgrey;
	  padding: 5px 10px;
  }

  nav a:not(:last-child) {
	  margin-right: 10px;
  }

  section {
    flex: 1;
	  padding: 10px;
  }
</style>