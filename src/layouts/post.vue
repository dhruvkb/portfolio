<!--
Renders a single post. This layout nests inside the default layout.
-->

<script setup lang="ts">
  import { usePage } from 'iles'
  import { computed } from 'vue'

  import { usePosts, type Post } from '@/composables/posts'
  import type { Arrow } from '@/constants/arrows'
  import { formatDate } from '@/utils/date'

  const frontmatter = usePage().frontmatter as Post

  const { allPostDocs } = usePosts()
  const furtherLinks = computed(() => {
    const { index } = frontmatter
    const allPosts = allPostDocs.value
    return [
      {
        name: 'Previous',
        doc: allPosts[index - 1],
        attrs: { arrow: 'WEST' as Arrow },
      },
      {
        name: 'Next',
        doc: allPosts[index + 1],
        attrs: { class: ['ml-auto'] },
      },
    ].filter((link) => link.doc)
  })
</script>

<template layout="default">
  <!-- The `.blog` class enables blog-specific styling. -->
  <main class="blog mx-auto w-full max-w-text">
    <aside class="mb-para">
      <Link
        dest="/blog"
        arrow="WEST"
        class="mb-para block"
        label="Go to all posts"
        >All posts</Link
      >
    </aside>

    <article class="mb-para">
      <div class="flex flex-row items-center">
        <!-- Title -->
        <h1>{{ frontmatter.title }}</h1>

        <!-- Date of publishing -->
        <div class="ml-auto">
          <span class="text-low">Date:</span>
          {{ formatDate(frontmatter.date) }}
        </div>
      </div>

      <div
        class="text-low"
        aria-hidden="true">
        {{ '='.repeat(frontmatter.title.length) }}
      </div>

      <ContentsTable class="mb-para" />

      <slot />
    </article>

    <div class="flex flex-row">
      <Link
        v-for="(link, linkIndex) in furtherLinks"
        :key="linkIndex"
        :dest="link.doc.href"
        v-bind="link.attrs"
        :label="`Read '${link.doc.title}'`"
        :is-lowercase="false">
        <span class="lowercase text-low">{{ link.name }}:</span>
        {{ link.doc.title }}
      </Link>
    </div>
  </main>
</template>

<style>
  @import '@/styles/blog.pcss';
</style>
