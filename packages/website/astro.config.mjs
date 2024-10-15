import { defineConfig, passthroughImageService } from 'astro/config'

import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'

import { remarkMtime } from './src/plugins/remark_mtime'
import { rehypeTailwind } from './src/plugins/rehype_tailwind'
import { watchPlugins } from './src/integrations/watch_plugins'

import site from './src/data/site.json'

// https://astro.build/config
export default defineConfig({
  site: site.baseUrl,
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    remarkPlugins: [remarkMtime],
    rehypePlugins: [rehypeTailwind],
    smartypants: false, // https://daringfireball.net/projects/smartypants/
    shikiConfig: {
      defaultColor: false,
      themes:  {
        dark: 'catppuccin-mocha',
        light: 'catppuccin-latte',
      }
    },
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [tailwind({ applyBaseStyles: false }), mdx(), watchPlugins()],
})
