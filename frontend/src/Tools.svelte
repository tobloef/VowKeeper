<script>
  import { Route, router, active } from 'tinro';
  import Log from './tools/Log.svelte';
  import Character from './tools/Character.svelte';
  import Notes from './tools/Notes.svelte';
  import Combat from './tools/Combat.svelte';
  import Map from './tools/Map.svelte';
  import Oracles from './tools/Oracles.svelte';
  import Fa from 'svelte-fa'
  import { faList } from '@fortawesome/free-solid-svg-icons'
  import { faUser } from '@fortawesome/free-solid-svg-icons'
  import { faStickyNote } from '@fortawesome/free-solid-svg-icons'
  import { faFistRaised } from '@fortawesome/free-solid-svg-icons'
  import { faMap } from '@fortawesome/free-solid-svg-icons'
  import { faDice } from '@fortawesome/free-solid-svg-icons'

  router.mode.hash();
</script>

<div id="tools">
	<nav>
		<a href="/#/log" use:active>
			<span><Fa icon={faList} />Log</span>
		</a>
		<a href="/#/character" use:active>
			<span><Fa icon={faUser} />Character</span>
		</a>
		<a href="/#/notes" use:active>
			<span><Fa icon={faStickyNote} />Notes</span>
		</a>
		<a href="/#/combat" use:active>
			<span><Fa icon={faFistRaised} />Combat</span>
		</a>
		<a href="/#/map" use:active>
			<span><Fa icon={faMap} />Map</span>
		</a>
		<a href="/#/oracles" use:active>
			<span><Fa icon={faDice} />Oracles</span>
		</a>
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

  :global(nav a.active span){
    font-weight: bold;
    color: black;
  }

  :global(nav svg){
    margin-right: 5px;
  }

  section {
    flex: 1;
	  padding: 10px;
  }
</style>