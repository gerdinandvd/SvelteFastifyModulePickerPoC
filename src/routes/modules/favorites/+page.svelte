<script>
	export let data;
</script>

{#if data && data.fetched_data && data.fetched_data.length > 0}
	<ul>
		{#each data.fetched_data as module}
			<li>
				<div class="bar">
					<a href={'/modules/' + module._id}>
						<h1>{module.name}</h1>
					</a>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p>Je hebt nog geen favorieten of het wordt geladen...</p>
	<p>
		Klik <a href="/modules">hier</a> om er één te kiezen.
	</p>
{/if}

<style>
	.bar {
		display: block;
		margin: 20px;
	}

	ul {
		list-style-type: none; /* Removes bullets */
		padding: 0; /* Removes padding */
		margin: 0; /* Removes margin */
	}

	.bar a {
		display: block;
		text-decoration: none;
		color: inherit;
		border: 2px solid #666;
		background-color: #ddd;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: background-color 0.2s ease;
	}

	.bar a:hover {
		background-color: #999;
	}
</style>
