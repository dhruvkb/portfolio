<page>
  title: About
</page>

<script setup lang="ts">
  import ContactSection from '@/sections/ContactSection.vue'
  import DeedsSection from '@/sections/DeedsSection.vue'
  import IntroSection from '@/sections/IntroSection.vue'
</script>

<template>
  <main class="mx-auto w-full max-w-text">
    <DeedsSection class="mb-para" />
    <IntroSection class="mb-para" />
    <ContactSection />
  </main>
</template>
