<script setup lang="ts">
  import ContactSection from '@/sections/ContactSection.vue'
  import DeedsSection from '@/sections/DeedsSection.vue'
  import FooterSection from '@/sections/FooterSection.vue'
  import HelloSection from '@/sections/HelloSection.vue'
  import ResumeSection from '@/sections/ResumeSection.vue'
</script>

<template>
  <main class="flex h-full flex-col pts-8 pbs-8 lg:pts-12 lg:pbs-12">
    <HelloSection class="section" />
    <DeedsSection class="section" />
    <ResumeSection class="section" />
    <ContactSection class="section" />
    <FooterSection class="section mt-auto" />
  </main>
</template>

<style>
  .section {
    @apply py-8 lg:py-12 first:pt-0 lg:first:pt-0 last:pb-0 lg:last:pb-0;
    @apply border-b last:border-b-0;
    @apply border-neutral-200 dark:border-neutral-900;
  }
</style>
