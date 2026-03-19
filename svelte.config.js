import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	
	compilerOptions: {
		runes: false
	},
	
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x'
		}),
		prerender: { entries: [] }
	}
};

export default config;
