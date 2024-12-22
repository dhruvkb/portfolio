import { type CollectionEntry, getCollection } from 'astro:content'

export async function getPages(): Promise<CollectionEntry<'pages'>[]> {
  const pages: CollectionEntry<'pages'>[] = await getCollection('pages')
  return pages
}

/**
 * Get the list of posts, excluding the posts that have been marked as a draft.
 * Posts have numerical prefixes so they are always sorted.
 *
 * @returns a collection of posts
 */
export async function getPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts: CollectionEntry<'posts'>[] = await getCollection('posts')
  return posts
    .filter((item) => import.meta.env.DEV || !item.data.isDraft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()) // sort in reverse order
}

/**
 * Get the list of categories, sorted alphabetically. Categories are not a
 * collection but rather they are obtained by iterating through the collection
 * of posts.
 *
 * @returns a list of categories
 */
export async function getCategories(): Promise<string[]> {
  const posts = await getPosts()
  const tags = posts.flatMap((post) => post.data.categories)
  return [...new Set(tags)].sort()
}
