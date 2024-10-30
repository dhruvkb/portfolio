import type { CollectionEntry } from 'astro:content'

import { displayName, recivi } from '@/stores/recivi'
import { site } from '@/stores/site'
import { urlToDest } from '@/utils/recivi'
import type { PartialBy } from '@/types/extensions'

export type RawMetadata = PartialBy<
  Pick<
    CollectionEntry<'pages'>['data'],
    'title' | 'description' | 'banRobots' | 'path'
  >,
  'banRobots'
>

/**
 * describes the attributes of a `<meta>` tag; Some `<meta>` tags use a name-content
 * pair whereas others use a property-content pair so this type accepts both.
 */
export type MetaTag = { content: string } & (
  | { name: string }
  | { property: string }
)

function isDefined<T>(item: T | boolean): item is T {
  return Boolean(item)
}

function getTwitterId() {
  const twitterProfile = recivi.bio.profiles?.find((profile) =>
    ['twitter', 'x'].includes(profile.site.id)
  )
  if (!twitterProfile) {
    return undefined
  }
  if ('username' in twitterProfile) {
    return twitterProfile.username
  }
  return urlToDest(twitterProfile.url)
    .replace('https://twitter.com/', '')
    .replace('https://x.com', '')
}

/**
 * Get the title to render in the page tab. This consists of the two parts, the page
 * title and the site title, joined by a separator.
 *
 * @param rawMetadata - page data that is needed to generate the page title
 * @returns the complete of the page
 */
export function getPageTitle({ title }: { title: string }): string {
  return `${title} - ${site.title}`
}

/**
 * Get a list of objects to render as `<meta>` tags in the page head.
 *
 * @param rawMetadata - page data that is needed to generate the meta tags
 * @param origin - the scheme and domain name of the website, without a trailing slash
 * @returns a list of meta tags to render in the page head
 */
export function getMetadata(
  rawMetadata: RawMetadata,
  origin: string
): MetaTag[] {
  const { description, path, banRobots = false } = rawMetadata

  const pageUrl = `${origin}${path}`
  const pageTitle = getPageTitle(rawMetadata)
  const imageUrl = `${origin}/og${
    path === '/' ? '/index' : path.replace(/\/$/, '')
  }.png`
  const twitterId = getTwitterId()

  return [
    { name: 'author', content: displayName },
    { name: 'description', content: description },
    // Open Graph
    { property: 'og:type', content: 'article' },
    { property: 'og:site_name', content: site.title },
    { property: 'og:url', content: pageUrl },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: imageUrl },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    Boolean(twitterId) && { name: 'twitter:site', content: `@${twitterId}` },
    Boolean(twitterId) && { name: 'twitter:creator', content: `@${twitterId}` },
    { name: 'twitter:url', content: pageUrl },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    // Robots
    banRobots && { name: 'robots', content: 'noindex' },
  ].filter(isDefined)
}