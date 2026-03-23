<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Page Not Found | Raconteur Creative</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-surface px-8">
	<div class="text-center max-w-2xl">
		<div class="mb-8">
			<span class="material-symbols-outlined text-9xl text-secondary">error</span>
		</div>
		<h1 class="font-headline text-6xl md:text-8xl text-on-surface mb-6">404</h1>
		<p class="text-2xl text-on-surface-variant mb-8 font-light">
			This page doesn't exist.
		</p>
		<a href="/" class="inline-flex items-center gap-3 bg-secondary text-on-secondary px-8 py-4 font-bold hover:opacity-90 transition-opacity">
			<span class="material-symbols-outlined">home</span>
			Back to Home
		</a>
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Manrope', sans-serif;
		background-color: #121416;
		color: #e2e2e5;
	}
</style>
