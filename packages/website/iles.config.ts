import { defineConfig } from 'iles'

import excerpt from '@islands/excerpt'
import feed from '@islands/feed'
import headings from '@islands/headings'
import icons from '@islands/icons'
import prism from '@islands/prism'

export default defineConfig({
  siteUrl: 'https://dhruvkb.dev',
  turbo: true,
  modules: [
    excerpt({ separator: 'blockquote' }),
    feed(),
    headings(),
    // https://github.com/ElMassimo/iles/blob/main/packages/icons/src/icons.ts
    icons({
      scale: 1,
    }),
    prism(),
  ],
  extendRoute(route_) {
    if (route_.path.includes('/posts/'))
      // Remove post index.
      route_.path = route_.path.replace(/\d{4}_/, '')
  },
  extendFrontmatter(frontmatter_, filename) {
    if (filename.includes('/posts/')) {
      // Use 'post' layout.
      frontmatter_.layout ||= 'post'
      // Inject `index` field.
      frontmatter_.index ||= parseInt(
        filename.split('/').at(-1)?.substring(0, 4) ?? '-1',
        10
      )
    }
  },
})
