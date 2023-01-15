import { APIRoute } from "astro"
import { SITE } from "~/config.mjs"

export const get: APIRoute = async function get ({ params, request }) {
  return {
    body: JSON.stringify({
      url: SITE.origin,
      message: 'Welcome to our sponsors & partners api!',
      sponsorList: [
        {
          name: "MetaCartel",
          logo: "metacartel.png",
          url: "https://metacartel.xyz"
        },
        {
          name: "MetaFam",
          logo: "metagame.png",
          url: "https://metagame.wtf"
        },
        {
          name: 'Sponsor 1',
          logo: 'metacartel.png',
          url: 'https://google.com',
        },
        {
          name: 'Sponsor 2',
          logo: 'metagame.png',
          url: 'https://google.com',
        },
        {
          name: 'Sponsor 1',
          logo: 'metacartel.png',
          url: 'https://google.com',
        },
        {
          name: 'Sponsor 2',
          logo: 'metagame.png',
          url: 'https://google.com',
        },
        {
          name: 'Sponsor 1',
          logo: 'metacartel.png',
          url: 'https://google.com',
        },
        {
          name: 'Sponsor 2',
          logo: 'metagame.png',
          url: 'https://google.com',
        },
        {
          name: 'Sponsor 1',
          logo: 'metacartel.png',
          url: 'https://google.com',
        },
        {
          name: 'Sponsor 2',
          logo: 'metagame.png',
          url: 'https://google.com',
        },
      ],
    }),
  }
}