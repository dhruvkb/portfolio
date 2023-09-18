<script setup lang="ts">
  import PrintButton from '@/components/PrintButton.vue'
</script>

<template>
  <section aria-label="Download">
    <h2
      class="section-heading"
      aria-label="Résumé">
      Résumé
    </h2>

    <p class="hidden lg:block">
      Did you know you can <PrintButton client:load /> this webpage page as my
      résumé? For best results, use
      <span
        class="cursor-help underline decoration-dashed"
        title="297mm &times; 210mm"
        >A4-sized paper</span
      >, enable printing backgrounds and set all custom margins to zero. Or you
      can just
      <Link
        label="Résumé as PDF"
        dest="https://dhruvkb.dev/resume.pdf"
        :is-lowercase="false"
        >download the PDF</Link
      >, which is definitely the easier option.
    </p>

    <p class="lg:hidden">
      You can
      <Link
        label="Résumé as PDF"
        dest="https://dhruvkb.dev/resume.pdf"
        >download my résumé</Link
      >
      as a PDF. Visit from a desktop to see the live-preview.
    </p>
  </section>
</template>
