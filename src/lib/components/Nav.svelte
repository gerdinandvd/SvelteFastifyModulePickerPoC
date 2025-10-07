<nav class="nav-bar">
	<a href="/">Home</a>
	<div class="nav-right">
		<a href="/modules">Modules</a>
		<a href="/about">Over mij</a>
	</div>
</nav>

<style>
	.nav-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		margin: 0;
		font-family: sans-serif;
		border-bottom: 2px solid #000;
	}

	.nav-bar a {
		text-decoration: none;
		color: #000;

		padding: 10px 20px;
		border-radius: 4px;
		font-size: 16px;
	}

	.nav-bar a:hover {
		background-color: #ccc;
	}

	.nav-right {
		display: flex;
	}
</style>
