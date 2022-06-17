<script setup lang="ts">
  import ContactSection from '@/sections/ContactSection.vue'
  import DeedsSection from '@/sections/DeedsSection.vue'
  import FooterSection from '@/sections/FooterSection.vue'
  import HelloSection from '@/sections/HelloSection.vue'
  import ResumeSection from '@/sections/ResumeSection.vue'
</script>

<template>
  <div class="flex h-full flex-col gap-16 pts-8 pbs-8 lg:pts-12 lg:pbs-12">
    <HelloSection />
    <DeedsSection />
    <ResumeSection />
    <ContactSection />
    <FooterSection class="mt-auto" />
  </div>
</template>
