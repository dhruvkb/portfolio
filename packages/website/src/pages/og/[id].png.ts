import type { CollectionEntry } from 'astro:content'
import type { APIRoute } from 'astro'

import { getPages } from '@/utils/collections'
import { getOgImage } from '@/utils/og_image'

interface Props {
  page: CollectionEntry<'pages'>
}

export async function getStaticPaths() {
  const pages = await getPages()
  return pages.map((page) => ({
    params: { id: page.id },
    props: { page },
  }))
}

export const GET: APIRoute<Props> = async function ({ props: { page } }) {
  return getOgImage({
    title: page.data.ogImage?.title ?? page.data.title,
    description: page.data.description,
  })
}
