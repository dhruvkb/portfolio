import type { APIRoute } from 'astro'

import { site as siteStore } from '@/stores/site'

export const GET: APIRoute = async function () {
  return new Response(
    JSON.stringify({
      name: siteStore.title,
      start_url: '/',
      icons: [
        { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
        {
          src: '/icon-512-maskable.png',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'maskable',
        },
      ],
    })
  )
}
