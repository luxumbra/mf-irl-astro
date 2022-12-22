export const SITE = {
	name: 'MetaFest:IRL',

	origin: 'https://metafest.wtf',
	basePathname: '/',
	trailingSlash: false,

	title: 'MetaFest: IRL - MetaGame 🐙',
	description: 'A bit of a conference, a bit of a festival + a shitload of fun',

	googleAnalyticsId: 'G-4436889R1F',
	googleSiteVerificationId: 'orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M',
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
