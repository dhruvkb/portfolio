<page>
  title: 404 Not Found
</page>

<script setup lang="ts">
  import GameOfLife from '@/components/GameOfLife.vue'
  import Link from '@/components/Link.vue'
</script>

<template>
  <main class="flex flex-col gap-para">
    <section
      class="mx-auto w-full max-w-text"
      aria-label="Error">
      <h2
        class="section-heading"
        aria-label="404 Not Found">
        404 Not Found
      </h2>
      <p class="mb-ln">
        There's nothing here. You are lost and should head
        <Link
          :url="{ dest: { name: 'index' }, label: 'Go to the home page' }"
          :arrow="null"
          >home</Link
        >.
      </p>
    </section>

    <div class="relative grow">
      <GameOfLife
        class="absolute inset-0 z-0"
        client:load />
    </div>
  </main>
</template>
