import { defineConfig, passthroughImageService } from 'astro/config'

import mdx from '@astrojs/mdx'
import alpinejs from '@astrojs/alpinejs'

import tailwindcss from '@tailwindcss/vite'

import { watchRecivi } from './src/integrations/watch_recivi'

import { site } from './src/stores/site'

// https://astro.build/config
export default defineConfig({
  site: site.baseUrl,
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    smartypants: false, // https://daringfireball.net/projects/smartypants/
    shikiConfig: {
      defaultColor: false,
      themes: {
        dark: 'catppuccin-mocha',
        light: 'catppuccin-latte',
      },
    },
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [mdx(), alpinejs(), watchRecivi()],
  vite: {
    plugins: [tailwindcss()],
  },
})
