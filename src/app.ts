import { defineApp } from 'iles'
import { createPinia } from 'pinia'
import { computed } from 'vue'

import '@/styles/index.pcss'

export default defineApp({
  head: ({ frontmatter, site }) => ({
    title: computed(() => `${frontmatter.title} · ${site.title}`),
    meta: [
      /*
       Automatically generated meta tags:
       - charset
       - description

       - og:url
       - og:site_name
       - og:title
       - og:description

       - twitter:domain
       - twitter:title
       - twitter:description
       - twitter:url
       */

      {
        key: 'dark',
        name: 'theme-color',
        content: '#000000',
        media: '(prefers-color-scheme: dark)',
      },
      {
        key: 'light',
        name: 'theme-color',
        content: '#ffffff',
        media: '(prefers-color-scheme: light)',
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover' },
      { property: 'author', content: site.author },

      // Google
      { name: 'google-site-verification', content: 'rDaR4bofozdONdJoKYHh4JKPdCXaVt9QpLiZEcqbr7I' },

      // Open-graph
      { property: 'og:image', content: 'https://dhruvkb.github.io/meta/cover.png' },
      { property: 'og:type', content: 'website' },

      // Twitter
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@dhruvkb_' },
      { property: 'twitter:creator', content: '@dhruvkb_' },
    ],
    link: [
      /*
       Automatically generated `link` tags:
       - sitemap
       */

      // Inter font
      { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },

      // Favicon
      { rel: 'icon', href: '/favicon.png' },
    ],
  }),
  enhanceApp: ({ app }) => {
    const pinia = createPinia()
    app.use(pinia)
  },
})
