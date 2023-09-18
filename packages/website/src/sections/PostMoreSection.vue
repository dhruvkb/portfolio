<!--
Renders a list of posts, either the previous and next in chronological order or
all posts in the same series.

See also `@/sections/PostsSection.vue`.
-->

<script setup lang="ts">
  import type { Document } from 'iles'
  import { computed } from 'vue'

  import { useCurrPost, type Post } from '@/composables/posts'

  interface Props {
    /**
     * show posts from the same series; This is `false` by default and shows
     * adjacent posts.
     */
    showsSeries?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showsSeries: false,
  })

  const { currIndex, seriesName, adjacentPosts, seriesPosts } = useCurrPost()

  const title = computed(() =>
    props.showsSeries
      ? `More from the '${seriesName.value}' series`
      : 'Adjacent posts'
  )

  const items = computed(() =>
    props.showsSeries ? seriesPosts.value : adjacentPosts.value
  )

  const isCurr = (item: { doc: Document<Post> }) =>
    item.doc.index === currIndex.value
</script>

<template>
  <section
    v-if="items.length"
    :aria-label="title">
    <h2
      class="section-heading"
      :aria-label="title">
      {{ title }}
    </h2>

    <component
      :is="showsSeries ? 'ol' : 'ul'"
      class="transition-colors hover:text-low">
      <li
        v-for="item in items"
        :key="item.sNo">
        <PostCard
          class="hover:text-reg"
          :class="{ 'hover:bg-hl': !isCurr(item) }"
          :is-link="!isCurr(item)"
          :doc="item.doc">
          <template #start>
            {{ item.sNo }}<span class="text-low">.</span>
          </template>
          <template
            v-if="isCurr(item)"
            #excerpt>
            <span class="text-red-500">You are here.</span>
          </template>
        </PostCard>
      </li>
    </component>
  </section>
</template>
