import { APIRoute } from "astro"

export const get: APIRoute = async function get ({ params, request }) {
  return {
    body: JSON.stringify({
      message: 'Welcome to the carousel!',
      slides: [
        {
          title: "Hello World",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
          image: "hero-castle-lg.jpg"
        },
        {
          title: "Hello Octo",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
          image: "purple-octo-midjourney.png"
        },
        {
          title: "Hello Anon",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
          image: "purple-octo-midjourney-2.png"
        },
      ],
    }),
  }
}