<script>
  import { Route } from "tinro";
</script>

<div id="tools">
	<nav>
		<a href="/character">Character</a>
		<a href="/oracles">Oracles</a>
	</nav>
	<section>
		<Route path="/character">
			My cool character.
		</Route>
		<Route path="/oracles">
			The oracles.
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
  }

  section {
	  flex: 1;
  }
</style>