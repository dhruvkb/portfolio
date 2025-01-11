import type { APIRoute } from 'astro'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import rss from '@astrojs/rss'
import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx'
import { loadRenderers } from 'astro:container'
import { render } from 'astro:content'
import { getEntry } from 'astro:content'

import { site as siteStore } from '@/stores/site'
import { getPosts } from '@/utils/collections'

export const GET: APIRoute<Record<string, never>> = async function ({
  site,
  url,
}) {
  const posts = await getPosts()
  const items = []

  const renderers = await loadRenderers([getMDXRenderer()])
  const container = await AstroContainer.create({ renderers })
  for (const post of posts) {
    const { Content } = await render(post)
    const content = await container.renderToString(Content)
    // Astro's RSS feed uses trailing slashes.
    const link = new URL(
      `/writings/posts/${post.id.substring(5)}/`,
      url.origin
    ).toString()
    items.push({ ...post.data, link, content })
  }

  return await rss({
    title: siteStore.title,
    description: (await getEntry('pages', 'writings'))?.data.description ?? '',
    site: site ?? '',
    items,
    // TODO: Consider including an XSL stylesheet for the feed.
  })
}
