/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'light': '#f5f2ef',
				'navy': '#002659',
				'sunflower': '#fccc00',
				'dark': '#041914',
				'trueblue' : '#0c21ca'
			},
			spacing: {
				'gap': 'clamp(1em, 4vw, 2.5em)'
			},
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
	],
}