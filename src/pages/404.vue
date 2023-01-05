<page>
  title: 404 Not Found
</page>

<script setup lang="ts">
  import GameOfLife from '@/components/GameOfLife.vue'
  import Link from '@/components/Link.vue'
</script>

<template>
  <main class="px-page py-page flex flex-col gap-6">
    <section aria-label="Error">
      <h2 aria-label="404 Not Found">404 Not Found</h2>
      <p class="body-text mb-6">
        There's nothing here. You seem <strong>lost</strong>.
      </p>
      <Link
        label="Homepage"
        dest="/">
        Home
      </Link>
    </section>

    <div class="relative grow">
      <GameOfLife
        class="absolute inset-0 z-0"
        client:load />
    </div>
  </main>
</template>
