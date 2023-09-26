<script setup lang="ts">
  import { usePage } from 'iles'

  import type { Post } from '@/composables/posts'
  import { readableDate, audibleDate } from '@/utils/date'

  const frontmatter = usePage().frontmatter as Post
</script>

<template>
  <header>
    <Link
      class="mb-para block"
      :url="{
        dest: { name: 'blog' },
        label: 'Go to the blog page',
      }"
      arrow="WEST"
      >all posts</Link
    >

    <div class="flex flex-row">
      <div class="flex flex-col items-start">
        <div class="text-red-500">
          <span aria-hidden="true">{{
            '='.repeat(frontmatter.title.length)
          }}</span>
          <h1 class="font-black">{{ frontmatter.title }}</h1>
          <span aria-hidden="true">{{
            '='.repeat(frontmatter.title.length)
          }}</span>
        </div>

        <nav>
          <ContentsTable />
        </nav>
      </div>

      <div class="ml-auto">
        <span class="text-low">published: </span>
        <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
        <span
          :title="audibleDate(frontmatter.date)"
          v-html="readableDate(frontmatter.date)" />
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </div>
  </header>
</template>
