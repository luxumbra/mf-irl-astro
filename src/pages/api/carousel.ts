import { APIRoute } from "astro"
import { SITE } from '~/config.mjs'

export const get: APIRoute = async function get ({ params, request }) {
  return {
    body: JSON.stringify({
      url: SITE.origin,
      message: 'Welcome to the Carousel api!',
      slides: [
        {
          title: "Hello World",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
          image: "hero-castle-lg.jpg"
        },
        {
          title: "Hello Octo",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
          image: "8.jpg"
        },
        {
          title: "Hello Anon",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
          image: "13.jpg"
        },
      ],
    }),
  }
}