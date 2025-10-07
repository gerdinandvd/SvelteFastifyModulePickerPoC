<script>
	export let data;
	import heart_checked from '$lib/images/heart_checked.png';
	import heart_unchecked from '$lib/images/heart_unchecked.png';

	const icon = data.fetched_data.favored ? heart_checked : heart_unchecked;
</script>

<div class="card">
	<h1>{data.fetched_data.name}</h1>

	<div class="info-box">
		<div>
			<strong>Studiepunten:</strong>
			{data.fetched_data.credits} <br />
			<strong>Niveau:</strong>
			{data.fetched_data.level}
		</div>
		<div>
			<strong>Type:</strong>
			{data.fetched_data.type} <br />
			<strong>Thema:</strong>
			{data.fetched_data.theme}
		</div>
	</div>

	<div class="main-content">
		<p><strong>{data.fetched_data.basic_description}</strong></p>
		<p><em>{data.fetched_data.detailed_description || 'Nader toegevoegd...'}</em></p>

		<div>
			<span>Favoriet:</span>
			<form method="POST">
				<input type="hidden" name="is_favored" value={data.fetched_data.favored ? false : true} />
				<button type="submit">
					<img
						src={icon}
						alt={data.fetched_data.favored ? 'Unfavorite' : 'Favorite'}
						width="24"
						height="24"
					/>
				</button>
			</form>
		</div>
	</div>
</div>

<style>
	.card {
		width: 60vw;
		height: 80vh;
		margin: 20px auto;
		padding: 15px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-family: Arial, sans-serif;
	}

	.info-box {
		display: flex;
		justify-content: space-between;
		margin: 15px 0;
	}

	.main-content p {
		width: 70%;
		margin: 5px 0;
	}
</style>
