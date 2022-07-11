<page>
  title: About
</page>

<script setup lang="ts">
  import ContactSection from '@/sections/ContactSection.vue'
  import IntroSection from '@/sections/IntroSection.vue'
</script>

<template>
  <main class="px-page py-page flex flex-col gap-16 lg:gap-24">
    <IntroSection />
    <ContactSection />
  </main>
</template>
