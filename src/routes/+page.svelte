<script>
	// Raconteur Creative Redesign - Work in Progress
</script>

<svelte:head>
	<title>Raconteur Creative (Redesign)</title>
</svelte:head>

<main>
	<div class="container">
		<h1>Raconteur Creative</h1>
		<p class="subtitle">Website Redesign - Test Environment</p>
		<p>This is a test environment for the new RC design. The live site remains unchanged.</p>
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: #f5f5f5;
	}

	main {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.container {
		max-width: 600px;
		text-align: center;
	}

	h1 {
		font-size: 3rem;
		margin: 0 0 1rem;
		color: #222;
	}

	.subtitle {
		font-size: 1.25rem;
		font-weight: 600;
		color: #666;
		margin-bottom: 1rem;
	}

	p {
		color: #888;
		line-height: 1.6;
	}
</style>
