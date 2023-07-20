import { DateTime } from 'luxon';

export const paycekProfileCode = import.meta.env.PUBLIC_PAYCEK_PROFILE_CODE;
export const paycekSecret = import.meta.env.PUBLIC_PAYCEK_SECRET_KEY;

export const isDev = import.meta.env.PUBLIC_HOSTNAME === 'http://metafest.local:1188';
export const isProd = import.meta.env.PUBLIC_HOSTNAME === 'https://metafest.wtf';
export const isTest = !(isDev || isProd) ?? false;

export const HOSTNAME = import.meta.env.PUBLIC_HOSTNAME ?? 'https://metafest.wtf';

export const uri = isProd
	? 'https://metafest.wtf'
	: isTest
		? 'https://test.metafest.wtf'
		: 'http://metafest.local:1188';
export const currencySymbol = '€';
export const currencyTicker = 'EUR';

export const earlyBirdEnds = '2023-05-01';
export const eventStartDate = '2023-08-11';
export const earlyBirdEndsFormatted = DateTime.fromISO(earlyBirdEnds).toLocaleString(DateTime.DATE_SHORT);

export const STRIPE_DISCOUNT_KEY_STANDARD = isProd ? '9AQaH95IAalcbf24gg' : 'test_8wM6qfbXfgm1gi4bII';
export const STRIPE_DISCOUNT_KEY_PATRON = isProd ? '5kA8z14Ew64W5UIbIJ' : 'test_cN2bKzd1jd9P7Ly4gi';

export const FAQ_URL = 'https://meta-game.notion.site/MetaFest-FAQ-ff18e665f7964264854f3d7191a04959?pvs=4';

export const SITE = {
	name: 'MetaFest: Croatia',
	origin: HOSTNAME ?? 'https://metafest.wtf',
	basePathname: '/',
	trailingSlash: false,

	title: 'MetaFest Croatia',
	description: `A bit of a conference, a bit of a festival + a shitload of fun; Talks, workshops, games & music; a festival for DAOists & Regens.`,

	// googleAnalyticsId: 'G-4436889R1F',
	// googleSiteVerificationId: 'orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M',
};

export const BLOG = {
	disabled: false,
	postsPerPage: 4,

	blog: {
		disabled: false,
		pathname: 'blog', // blog main path, you can change this to "articles" (/articles)
	},

	post: {
		disabled: false,
		pathname: '', // empty for /some-post, value for /pathname/some-post
	},

	category: {
		disabled: false,
		pathname: 'category', // set empty to change from /category/some-category to /some-category
	},

	tag: {
		disabled: false,
		pathname: 'tag', // set empty to change from /tag/some-tag to /some-tag
	},
};
