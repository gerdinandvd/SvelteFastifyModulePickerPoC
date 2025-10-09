<nav class="nav-bar">
	<a href="/">Home</a>

	<div class="nav-right">
		<div class="dropdown">
			<button class="dropbtn">Modules ▾</button>
			<div class="dropdown-content">
				<a href="/modules">modules</a>
				<a href="/modules/favorites">Favorieten</a>
			</div>
		</div>

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

	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropbtn {
		background: white;
		border: none;
		font: inherit;
		cursor: pointer;
		margin: 0 1em;
		padding: 10px 20px;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		background-color: white;
		min-width: 160px;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
		border-radius: 5px;
	}

	.dropdown-content a {
		color: black;
		padding: 10px 14px;
		display: block;
	}

	.dropdown-content a:hover {
		background-color: #555;
		color: white;
	}

	/* toon de dropdown bij hover */
	.dropdown:hover .dropdown-content {
		display: block;
	}
</style>
