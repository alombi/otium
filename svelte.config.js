/** @type {import('@sveltejs/kit').Config} */
import vercel from '@sveltejs/adapter-vercel';
import { resolve } from "path";
const config = {
	kit: {
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
