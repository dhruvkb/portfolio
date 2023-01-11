<page>
  title: Résumé
</page>

<script setup lang="ts">
  import ObtainSection from '@/sections/ObtainSection.vue'
  import ResumeSection from '@/sections/ResumeSection.vue'
</script>

<template>
  <!-- TODO: Merge into 'Works' page. -->
  <main>
    <ObtainSection class="mx-auto mb-para w-full max-w-text print:hidden" />
    <ResumeSection />
  </main>
</template>

<style>
  @import '@/styles/print.pcss';
</style>
