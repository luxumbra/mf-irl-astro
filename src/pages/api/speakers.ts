import { APIRoute } from "astro"

export const get: APIRoute = async function get ({ params, request }) {
  return {
    body: JSON.stringify({
      message: 'Welcome to the carousel!',
      speakers: [
        {
          name: "Speaker 1",
          image: "purple-octo-midjourney-2.png",
          url: "https://metagame.wtf/players/luxumbra"
        },
        {
          name: "Speaker 2",
          image: "purple-octo-midjourney.png",
          url: "https://metagame.wtf/players/luxumbra"
        },
        {
          name: "Speaker 3",
          image: "purple-octo-midjourney-2.png",
          url: "https://metagame.wtf/players/luxumbra"
        },
        {
          name: "Speaker 1",
          image: "purple-octo-midjourney-2.png",
          url: "https://metagame.wtf/players/luxumbra"
        },
        {
          name: "Speaker 2",
          image: "purple-octo-midjourney.png",
          url: "https://metagame.wtf/players/luxumbra"
        },
        {
          name: "Speaker 3",
          image: "purple-octo-midjourney-2.png",
          url: "https://metagame.wtf/players/luxumbra"
        },
      ],
    }),
  }
}