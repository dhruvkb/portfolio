import { defineConfig, passthroughImageService } from 'astro/config'

import mdx from '@astrojs/mdx'
import alpinejs from '@astrojs/alpinejs'

import tailwindcss from '@tailwindcss/vite'

import { rehypeTailwind } from './src/plugins/rehype_tailwind'
import { watchPlugins } from './src/integrations/watch_plugins'
import { watchRecivi } from './src/integrations/watch_recivi'

import { site } from './src/stores/site'

// https://astro.build/config
export default defineConfig({
  site: site.baseUrl,
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    rehypePlugins: [rehypeTailwind],
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
  integrations: [mdx(), alpinejs(), watchPlugins(), watchRecivi()],
  vite: {
    plugins: [tailwindcss()],
  },
})
