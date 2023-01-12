import { APIRoute } from "astro"
import { SITE } from '~/config.mjs'

export const get: APIRoute = async function get ({ params, request }) {
  return {
    body: JSON.stringify({
      url: SITE.origin,
      message: 'Welcome to the Carousel api!',
      slides: [
        {
          title: "Fort Punta Christo",
          description: "The fortress overlooks the entrance to Pula Bay and out to Muzil and the Brijuni islands from the other side and has been host to a bunch of great festivals over the years.",
          image: "hero-castle-lg.jpg"
        },
        {
          title: "Enjoy live music",
          description: "There will be a great line-up featuring artists from inside & outside the Web3 community. Where better to see them than this amazing & unique venue.",
          image: "8.jpg"
        },
        {
          title: "A shit ton of fun",
          description: "The surrounding area of Pula & the Kristo peninsula is stunning and full of places to explore and things to do. ",
          image: "13.jpg"
        },
      ],
    }),
  }
}