<page>
  title: Home
</page>

<script setup lang="ts">
  import DeedsSection from '@/sections/DeedsSection.vue'
  import HelloSection from '@/sections/HelloSection.vue'
</script>

<template>
  <main class="px-page py-page flex flex-col justify-between gap-16 lg:gap-24">
    <HelloSection />
    <DeedsSection />
  </main>
</template>
