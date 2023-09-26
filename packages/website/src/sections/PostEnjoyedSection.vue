<script setup lang="ts">
  import { useIcon } from '@/composables/icon'

  const { getIcon } = useIcon()
</script>

<template>
  <section aria-label="Enjoyed reading?">
    <h2
      class="section-heading"
      aria-label="Enjoyed reading?">
      thanks for reading
    </h2>

    <p class="mb-ln">
      You've reached the end of this post, so it looks like you enjoyed reading
      it. If you liked it or found it interesting, please
      <CopyLinkButton client:load /> and
      <Link
        class="ml-auto"
        :url="{
          dest: '/blog/feed.rss',
          label: 'Get RSS feed',
        }"
        :is-lowercase="false">
        <template #default>subscribe to RSS</template>
        <template #end>
          <component
            :is="getIcon('rss')"
            class="ml-1 inline-block text-red-500 transition-transform duration-100 group-hover:-translate-y-1 group-hover:translate-x-1"
            aria-hidden="true" />
        </template> </Link
      >. You can also read more such articles from my
      <Link
        :url="{
          dest: { name: 'blog' },
          label: 'Go to the \'Blog\' page',
        }"
        :arrow="null"
        >blog</Link
      >.
    </p>
  </section>
</template>
