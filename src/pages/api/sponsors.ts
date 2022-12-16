import { APIRoute } from "astro"

export const get: APIRoute = async function get ({ params, request }) {
  return {
    body: JSON.stringify({
      message: 'Welcome to our sponsors & partners!',
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