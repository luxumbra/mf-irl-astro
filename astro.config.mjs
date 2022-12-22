import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import glsl from 'vite-plugin-glsl';
import { remarkReadingTime } from './src/utils/frontmatter.mjs';
import { SITE } from './src/config.mjs';
import alpinejs from "@astrojs/alpinejs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) => SITE.googleAnalyticsId ? Array.isArray(items) ? items.map(item => item()) : [items()] : [];

// https://astro.build/config
export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'static',
  server: {
    port: 1144,
    host: true
  },
  integrations: [
    tailwind({
    config: {
      applyBaseStyles: false
    }
    }),
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    mdx(),
    ...whenExternalScripts(() => partytown({
    config: {
      forward: ['dataLayer.push']
    }
    })),
    alpinejs()
  ],
  experimental: {
    integrations: true,
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true
  },
  define: {
    global: "globalThis",
    process: {
      env: "development",
    },
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      glsl({
        include: [                   // Glob pattern, or array of glob patterns to import
          '**/*.glsl', '**/*.wgsl',
          '**/*.vert', '**/*.frag',
          '**/*.vs', '**/*.fs'
        ],
        defaultExtension: 'glsl',
      }),
    ],
  }
});