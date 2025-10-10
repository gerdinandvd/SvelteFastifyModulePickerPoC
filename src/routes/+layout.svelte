<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<noscript>
	<em
		style="color: red; position: fixed; bottom: 0; left: 0; width: 100%; background: white; text-align: center;"
	>
		Javascript is uitgeschakeld, zet het aan voor de beste ervaring
	</em>
</noscript>
