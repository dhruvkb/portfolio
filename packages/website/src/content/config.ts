import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    // RSS fields
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    categories: z.array(z.string()),
    // Custom fields
    isFeatured: z.boolean().default(false),
    isDraft: z.boolean().default(false),
    isLiving: z.boolean().default(false), // digital garden
    assumedAudience: z.string().optional(),
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
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    path: z.string(),
    index: z.number().default(0),
    isDraft: z.boolean().default(false),
    isNav: z.boolean().default(true),
    banRobots: z.boolean().default(false),
    og: z
      .object({
        color: z.string().optional(),
      })
      .optional(),
  }),
})

export const collections = {
  posts,
  pages,
}
