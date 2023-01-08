<script setup lang="ts">
  import PrintButton from '@/components/PrintButton.vue'
</script>

<template>
  <section aria-label="Print">
    <h2 aria-label="Résumé">Résumé</h2>

    <p class="body-text mb-6">
      To get a copy of my résumé, you can print this page.
    </p>
    <p class="mb-6 text-sm">
      For best results, use <strong>A4-sized</strong> paper and remove your custom margins.
    </p>

    <div class="flex flex-row items-center gap-4">
      <PrintButton client:load />

      <Link
        label="Résumé as PDF"
        dest="https://dhruvkb.dev/resume.pdf"
        >Download PDF</Link
      >
    </div>
  </section>
</template>
