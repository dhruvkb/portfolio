import type { APIRoute } from 'astro'

import { getCategories } from '@/utils/collections'
import { getOgImage } from '@/utils/og_image'

interface Props {
  category: string
}

export async function getStaticPaths() {
  const categories = await getCategories()
  return categories.map((category) => ({
    params: { name: category },
    props: { category },
  }))
}

export const GET: APIRoute<Props> = async function ({ props: { category } }) {
  return getOgImage({
    left: 'Writings',
    right: 'Tag',
    title: category,
    description: `Read posts tagged "${category}".`,
  })
}
