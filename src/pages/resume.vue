<page>
  title: Résumé
</page>

<script setup lang="ts">
  import PrintSection from '@/sections/PrintSection.vue'
  import ResumeSection from '@/sections/ResumeSection.vue'
</script>

<template>
  <!-- TODO: Merge into 'Works' page. -->
  <main class="flex flex-col gap-16 lg:gap-24">
    <PrintSection class="print:hidden" />
    <ResumeSection />
  </main>
</template>

<style>
  @import '@/styles/print.pcss';
</style>
