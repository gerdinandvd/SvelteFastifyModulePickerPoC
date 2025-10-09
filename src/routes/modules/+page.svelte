<!-- <form action="http://localhost:3000/modules/" method="POST">
  <input type="text" name="name" placeholder="Module name" required />
  <button type="submit">Favorite</button>
</form> -->

<script>
	export let data;
</script>

<h1>Modules</h1>

<form method="POST">
	<div class="search-bar">
		<input name="module_request" type="search" placeholder="Zoek..." />
	</div>
</form>

<div class="container">
	{#if data.fetched_data && data.fetched_data.length > 0}
		{#each data.fetched_data as module}
			<a href="/modules/{module._id}" class="box">
				<h2>{module.name}</h2>
				<p>{module.basic_description}</p>
				<div class="text-bottom">
					<p>niveau: {module.level}</p>
					<p>studiepunten: {module.credits}</p>
				</div>
			</a>
		{/each}
	{:else}
		<p>Geen data gevonden of wordt geladen...</p>
	{/if}
</div>

<style>
	h1 {
		text-align: center;
	}
	.container {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.box {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex: 0 0 calc(33.333% - 10px);
		border: 1px solid #333;
		padding: 20px;
		text-align: left;
		box-sizing: border-box;
		text-decoration: none;
		color: inherit;
		min-height: 200px;
	}

	.text-bottom {
		margin-top: auto;
	}

	p,
	h2 {
		margin-top: 2px;
		margin-bottom: 2px;
	}

	.box:hover {
		background-color: lightblue;
	}

	.search-bar {
		width: 70%;
		margin: 20px auto;
	}

	.search-bar input {
		width: 100%;
		padding: 10px 14px;
		font-size: 16px;
		border-radius: 999px;
	}

	.search-bar input:focus {
		background-color: white;
		box-shadow: none;
	}
</style>
