<script setup lang="ts">
  import ContactSection from '@/sections/ContactSection.vue'
  import DeedsSection from '@/sections/DeedsSection.vue'
  import FooterSection from '@/sections/FooterSection.vue'
  import HelloSection from '@/sections/HelloSection.vue'
  import ResumeSection from '@/sections/ResumeSection.vue'
</script>

<template>
  <main>
    <div class="flex min-h-screen flex-col justify-between gap-16 border-b border-neutral-200 pb-8 pts-8 dark:border-neutral-900 lg:gap-24 lg:pb-12 lg:pts-12">
      <HelloSection />
      <DeedsSection class="lg:self-end lg:text-right" />
    </div>

    <ResumeSection class="section py-8 lg:py-12" />
    <ContactSection class="section py-8 lg:py-12" />
    <FooterSection class="section pt-8 pbs-8 lg:pt-12 lg:pbs-12" />
  </main>
</template>

<style>
  .section {
    @apply border-b last:border-b-0 border-neutral-200 dark:border-neutral-900;
  }
</style>
