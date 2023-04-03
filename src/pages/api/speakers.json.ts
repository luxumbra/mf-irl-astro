import { APIRoute } from 'astro';
import { SITE } from '~/config.mjs';

export const get: APIRoute = async function get({ params, request }) {
  return {
    body: JSON.stringify({
      url: SITE.origin,
      message: 'Welcome to the Speakers api!',
      speakers: [
        {
          name: 'Speaker 1',
          image: 'purple-octo-midjourney-2.png',
          url: 'https://metagame.wtf/players/luxumbra',
        },
        {
          name: 'Speaker 2',
          image: 'purple-octo-midjourney.png',
          url: 'https://metagame.wtf/players/luxumbra',
        },
        {
          name: 'Speaker 3',
          image: 'purple-octo-midjourney-2.png',
          url: 'https://metagame.wtf/players/luxumbra',
        },
        {
          name: 'Speaker 1',
          image: 'purple-octo-midjourney-2.png',
          url: 'https://metagame.wtf/players/luxumbra',
        },
        {
          name: 'Speaker 2',
          image: 'purple-octo-midjourney.png',
          url: 'https://metagame.wtf/players/luxumbra',
        },
        {
          name: 'Speaker 3',
          image: 'purple-octo-midjourney-2.png',
          url: 'https://metagame.wtf/players/luxumbra',
        },
      ],
    }),
  };
};
