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
				'secondary-alpha-30': '#0c17284d',
				'secondary-alpha-60': '#0c172899',
				accent: '#348e7bff',
				'accent-alpha-30': '#348e7b4d',
				'accent-alpha-60': '#1f897599',
        'accent-light': '#89c97cff',
				'accent-light-alpha-30': '#89c97c4d',
				'accent-light-alpha-60': '#89c97c99',
				'accent-light-alpha-90': '#89c97ce6',
				'accent-alt': '#1f4a2cff',
				'secondary-alt': '#1f282cff',
				tertiary: '#77c64e',
				'tertiary-alpha-30': '#77c64e4d',
				'tertiary-alpha-60': '#77c64e99',
				'off-white': '#cef4d0ff',
				'secondary-dark': '#060c14ff',
				'secondary-dark-alpha-30': '#060c144d',
				'secondary-dark-alpha-60': '#060c1499',
				'another-color': '#217470ff',
			},
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
				heading: ['"relicregular"', 'sans-serif'],
				alt: ['"Exo 2"', 'sans-serif'],
			},
			screens: {
				xxs: '400px',
				'2xl': '1440px',
				'3xl': '1920px',
				'4xl': '2560px',
			},
			transitionDelay: {
				'0': '0ms',
				'200': '200ms',
				'400': '400ms',
				'600': '600ms',
				'800': '800ms',
				'900': '900ms',
			},
		},
	},
	plugins: [formsPlugin, typographyPlugin, daisyui],
	darkMode: 'class',
};


