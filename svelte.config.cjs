let vercel = require('@sveltejs/adapter-vercel');


/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		target: '#svelte',
		adapter: vercel(),

		ssr: true,
		hydrate: false,
		router: false,
	},
};
