<page>
  title: Blog
</page>

<script setup lang="ts">
  import BlogSection from '@/sections/BlogSection.vue'
  import PostsSection from '@/sections/PostsSection.vue'
</script>

<template>
  <main class="mx-auto w-full max-w-text">
    <BlogSection class="mb-para" />
    <PostsSection
      class="mb-para"
      shows-featured />
    <PostsSection class="mb-para" />
  </main>
</template>
