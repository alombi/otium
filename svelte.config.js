import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: preprocess(),

	kit: {
		adapter:vercel(),
	}
};

export default config;