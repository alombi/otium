import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
        vite: {
            define: {
                'process.env': process.env,
            },
        },
	}
};

export default config;