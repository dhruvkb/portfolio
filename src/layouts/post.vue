<!--
Renders a single post. This layout nests inside the default layout.
-->

<script setup lang="ts">
  import PostEnjoyedSection from '@/sections/PostEnjoyedSection.vue'
  import PostHeaderSection from '@/sections/PostHeaderSection.vue'
  import PostMoreSection from '@/sections/PostMoreSection.vue'

  const symbols = {
    dashes: '-',
    equals: '=',
    tildes: '~',
  }
  const styles = Object.fromEntries(
    Object.entries(symbols).map(([key, value]) => [
      `--${key}`,
      `'${value.repeat(88)}'`,
    ])
  )
</script>

<template layout="default">
  <main class="blog-main mx-auto w-full max-w-text">
    <PostHeaderSection class="mb-para" />

    <article
      class="blog-content mb-para"
      :style="styles">
      <slot />
    </article>

    <PostEnjoyedSection class="mb-para" />
    <PostMoreSection
      class="mb-para"
      shows-series />
    <PostMoreSection />
  </main>
</template>

<style>
  @import '@/styles/blog.pcss';
  @import '@/styles/prism.pcss';
</style>
