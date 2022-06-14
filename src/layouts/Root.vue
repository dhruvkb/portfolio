<script setup lang="ts">
  import ContactSection from '@/components/ContactSection.vue'
  import DeedsSection from '@/components/DeedsSection.vue'
  import FooterSection from '@/components/FooterSection.vue'
  import HelloSection from '@/components/HelloSection.vue'
  import ResumeSection from '@/components/ResumeSection.vue'
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
