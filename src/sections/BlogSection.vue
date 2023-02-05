<script setup lang="ts">
  import { useIcon } from '@/composables/icon'

  const { getIcon } = useIcon()
</script>

<template>
  <section aria-label="Blog">
    <h2 aria-label="Blog">Blog</h2>

    <p class="mb-ln">
      I don't write much so I started this blog with the express goal of
      motivating myself to write more often. Here I ramble about my exploits
      with software development, my side projects (only the interesting ones)
      and my work in open-source.
    </p>

    <p class="mb-ln">
      If you're into any of those things, you might enjoy my blog. If you do,
      consider subscribing to
      <Link
        dest="/blog/feed.rss"
        label="Get RSS feed"
        :is-lowercase="false">
        <template #default>my RSS feed</template>
        <template #end>
          <component
            :is="getIcon('rss')"
            class="inline-block text-red-500 transition-transform duration-100 group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden="true" />
        </template> </Link
      >.
    </p>
  </section>
</template>
