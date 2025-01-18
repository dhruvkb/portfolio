import type { CollectionEntry } from 'astro:content'
import type { APIRoute } from 'astro'

import { getPosts } from '@/utils/collections'
import { dateDisplay, getRcvDate } from '@/utils/date_fmt'
import { getOgImage } from '@/utils/og_image'

interface Props {
  post: CollectionEntry<'posts'>
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return posts.map((post) => ({
    params: { slug: post.id.substring(5) },
    props: { post },
  }))
}

export const GET: APIRoute<Props> = async function ({ props: { post } }) {
  return getOgImage({
    left: 'Writings',
    right: `
      <div class="flex">
        <div class="mr-3">First published</div>
        <div class="font-mono">${dateDisplay(getRcvDate(post.data.pubDate), false)}</div>
      </div>
    `,
    title: post.data.title,
    description: post.data.description,
  })
}
