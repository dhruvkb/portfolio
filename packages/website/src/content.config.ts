import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),

    pubDate: z.date(),
    categories: z.array(z.string()),

    isDraft: z.boolean().default(false),

    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    series: z.string().optional(),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),

    // This field specifies the order in which the page should appear
    // in the navigation. If not specified, the page will be skipped.
    index: z.number().optional(),

    banRobots: z.boolean().default(false),

    // This field is used for overriding the data in the OG image.
    ogImage: z
      .object({
        title: z.string().optional(),
      })
      .optional(),
  }),
})

export const collections = { posts, pages }
