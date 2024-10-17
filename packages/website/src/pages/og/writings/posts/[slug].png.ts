import type { CollectionEntry } from 'astro:content'
import type { APIRoute } from 'astro'

import { getPosts } from '@/utils/collections'
import { dateReadable } from '@/utils/date_fmt'
import { getOgImage } from '@/utils/og_image'

interface Props {
  post: CollectionEntry<'posts'>
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return posts.map((post) => ({
    params: { slug: post.slug.substring(5) },
    props: { post },
  }))
}

export const GET: APIRoute<Props> = async function ({ props: { post } }) {
  return getOgImage({
    left: 'Writings',
    right: dateReadable([
      post.data.pubDate.getFullYear(),
      post.data.pubDate.getMonth() + 1,
      post.data.pubDate.getDate(),
    ]),
    title: post.data.title ?? 'Untitled',
    description: post.data.description,
  })
}
