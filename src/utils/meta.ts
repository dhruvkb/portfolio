import { recivi } from '@/stores/recivi'
import { site } from '@/stores/site'

export interface RawMetadata {
  title: string
  description: string
  banRobots?: boolean
}

/**
 * describes the attributes of a `<meta>` tag; Some `<meta>` tags use a name-content
 * pair whereas others use a property-content pair so this type accepts both.
 */
export type MetaTag = { content: string } & (
  | { name: string }
  | { property: string }
)

/**
 * Get the title to render in the page tab. This consists of the two parts, the page
 * title and the site title, joined by a separator.
 *
 * @param rawMetadata - page data that is needed to generate the page title
 * @returns the complete of the page
 */
export function getPageTitle(title: string): string {
  return `${title} - ${site.title}`
}

/**
 * Get a list of objects to render as `<meta>` tags in the page head.
 *
 * @param rawMetadata - page data that is needed to generate the meta tags
 * @param path - the path of the page, with a leading slash
 * @param origin - the scheme and domain name of the website, without a trailing slash
 * @returns a list of meta tags to render in the page head
 */
export function getMetadata(
  rawMetadata: RawMetadata,
  path: string,
  origin: string
): MetaTag[] {
  const { title, description, banRobots = false } = rawMetadata

  const pageUrl = `${origin}${path}`
  const pageTitle = getPageTitle(title)
  const imageUrl = `${origin}/og${
    path === '/' ? '/index' : path.replace(/\/$/, '')
  }.png`

  const metaTags = [
    { name: 'author', content: recivi.bio.name },
    { name: 'description', content: description },
    // Open Graph
    { property: 'og:type', content: 'article' },
    { property: 'og:site_name', content: site.title },
    { property: 'og:url', content: pageUrl },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: imageUrl },
  ]
  // Fediverse
  if (site.fediverse) {
    metaTags.push({ property: 'fediverse:creator', content: site.fediverse })
  }
  // Robots
  if (banRobots) {
    metaTags.push({ name: 'robots', content: 'noindex' })
  }

  return metaTags
}
