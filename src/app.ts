import { defineApp } from 'iles'
import { createPinia } from 'pinia'

import '@/styles/index.pcss'

export default defineApp({
  head: ({ site }) => ({
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
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover',
      },
      { property: 'author', content: site.author },

      // Open-graph
      // TODO: Implement `@vercel/og`
      { property: 'og:image', content: 'https://dhruvkb.dev/og-image.png' },
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

      // Inter and JetBrains Mono fonts
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400..800;1,400..800&family=Inter:wght@400..900&display=swap',
      },

      // Favicon
      { rel: 'icon', href: '/favicon.png' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ef4444' },
    ],
  }),
  enhanceApp: ({ app }) => {
    const pinia = createPinia()
    app.use(pinia)
  },
})
