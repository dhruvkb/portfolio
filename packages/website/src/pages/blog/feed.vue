<page>
path: /blog/feed.rss
</page>

<script setup lang="ts">
  import { usePage } from 'iles'
  import { computed } from 'vue'

  import type { FeedOptions, FeedItem } from '@islands/feed'

  import { usePosts } from '@/composables/posts'

  const { site } = usePage()
  const options: FeedOptions = {
    title: site.title,
    description: site.description,
    id: site.url,
    link: site.url,
    language: 'en',
    image: `${site.url}/rss.png`,
    copyright: 'CC BY 4.0 - Dhruv Bhanushali',
  }

  const { sortedPostDocs } = usePosts()
  const items = computed(() =>
    // Slice `sortPostDocs.value` when it gets too long.
    sortedPostDocs.value.map(async (postDoc): Promise<FeedItem> => {
      const post = await postDoc.component()
      return {
        title: postDoc.title,
        link: `${site.url}${postDoc.href}`,
        date: postDoc.date,
        description: () => post.excerpt,
        content: post,
        author: [{ name: site.author, link: site.url }],
      }
    })
  )
</script>

<template>
  <RenderFeed
    format="rss"
    v-bind="{ options, items }" />
</template>
