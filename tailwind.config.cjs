// const defaultTheme = require('tailwindcss/defaultTheme');
const daisyui = require('daisyui');
const formsPlugin = require('@tailwindcss/forms');
const typographyPlugin = require('@tailwindcss/typography');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#82d36eff',
				'primary-alpha-60': '#82d36e99',
				secondary: '#0c1728ff',
				'secondary-alpha-60': '#0c172899',
				accent: '#1f8975ff',
				'accent-alpha-60': '#1f897599',
        'accent-light': '#89c97cff',
				'accent-light-alpha-30': '#89c97c4d',
				'accent-alt': '#1f4a2cff',
				'secondary-alt': '#1f282cff'
			},
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
				heading: ['"relicregular"', 'sans-serif'],
				alt: ['"Exo 2"', 'sans-serif'],
			},
		},
	},
	plugins: [formsPlugin, typographyPlugin, daisyui],
	darkMode: 'class',
};


