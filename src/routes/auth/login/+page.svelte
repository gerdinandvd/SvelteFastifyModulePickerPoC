<script lang="ts">
	export let form;
</script>

<div class="login-container">
	<form method="post" class="login-card">
		<label for="username">Username</label>
		<input type="text" placeholder="naam" name="username" required />

		<label for="password">Password</label>
		<input type="password" placeholder="wachtwoord" name="password" required />

		<button type="submit">Login</button>

		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
	</form>
</div>

<style>
	.error {
		color: red;
		margin-top: 0.5rem;
	}

	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background: #f5f5f5;
	}

	.login-card {
		display: flex;
		flex-direction: column;
		width: 300px;
		padding: 20px;
		border: 1px solid black;
		background-color: #fff;
	}

	.login-card input,
	.login-card button {
		margin-bottom: 10px;
		padding: 8px;
		font-size: 14px;
	}

	.login-card button {
		cursor: pointer;
	}
</style>
