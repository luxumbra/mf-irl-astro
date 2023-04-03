import { APIRoute } from 'astro';
import { SITE } from '~/config.mjs';

export const get: APIRoute = async function get({ params, request }) {
  return {
    body: JSON.stringify({
      url: SITE.origin,
      path: new URL(request.url).pathname,
      message: 'Welcome to the Carousel api!',
      slides: [
        {
          title: 'Fort Punta Christo',
          description:
            'The fortress overlooks the entrance to Pula Bay and out to Muzil and the Brijuni islands from the other side and has been host to a bunch of great festivals over the years.',
          image: 'hero-castle-lg.jpg',
        },
        {
          title: 'Enjoy live music',
          description:
            'There will be a great line-up featuring artists from inside & outside the Web3 community. Where better to see them than this amazing & unique venue.',
          image: '8.jpg',
        },
        {
          title: 'How good does this look?!',
          description:
            "This venue has witnessed some amazing events. MetaFest: IRL is gonna be one of them! Don't miss it",
          image: '9.jpg',
        },
        {
          title: 'A shit ton of fun',
          description:
            'The surrounding area of Pula & the Kristo peninsula is stunning and full of places to explore and things to do. ',
          image: '13.jpg',
        },
        {
          title: '... and shit tons more fun',
          description: 'Hire quads, kayaks and other stuff and go get off the beaten track. ',
          image: '10.jpg',
        },
        {
          title: 'How clear is this water?!',
          description: 'Go diving off the rocks around the coastline. ',
          image: '12.jpg',
        },
      ],
    }),
  };
};
