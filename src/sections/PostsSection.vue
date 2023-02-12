<!--
Renders a list of posts, either all of them or only the featured ones.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import { usePosts } from '@/composables/posts'

  interface Props {
    /**
     * only show featured posts; This is `false` by default and shows all posts.
     */
    showsFeatured?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showsFeatured: false,
  })

  const title = computed(() =>
    props.showsFeatured ? 'Featured posts' : 'All posts'
  )

  const { sortedPostDocs, featuredPostDocs } = usePosts()
  const docs = computed(() =>
    props.showsFeatured ? featuredPostDocs.value : sortedPostDocs.value
  )

  /**
   * Determine if the year of publication of this post is different from that of
   * the one preceding it.
   *
   * @param index - the index of the post
   * @return `true` if the publication years are different, `false` otherwise
   */
  const isYearBoundary = (index: number): boolean => {
    if (index === 0) return false
    return (
      docs.value[index].date.getFullYear() !==
      docs.value[index - 1].date.getFullYear()
    )
  }
</script>

<template>
  <section
    v-if="docs.length"
    :aria-label="title">
    <h2
      class="section-heading"
      :aria-label="title">
      {{ title }}
    </h2>

    <ul class="transition-colors hover:text-low">
      <li
        v-for="(doc, docIndex) of docs"
        :key="doc.index">
        <PostCard
          class="p-1 hover:bg-hl hover:text-reg"
          :class="[isYearBoundary(docIndex) ? 'border-t border-hl' : '']"
          :doc="doc"
          :show-index="!showsFeatured" />
      </li>
    </ul>
  </section>
</template>
