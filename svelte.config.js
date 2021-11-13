/** @type {import('@sveltejs/kit').Config} */
import vercel from '@sveltejs/adapter-vercel';
import { resolve } from "path";
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter:vercel(),
		vite: {
			define: {
				'process.env': process.env,
		  	},
			resolve: {
				alias: {
					$components: resolve('./src/components')
				}
			}
		}
	}
};

export default config;
