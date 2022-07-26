<script setup lang="ts">
  import { useIcon } from '@/composables/icon'

  const print = () => {
    if (window) window.print()
  }

  const { getIconPaths } = useIcon()
</script>

<template>
  <section aria-label="Print">
    <h2 aria-label="Résumé">
      Résumé
    </h2>

    <p class="body-text mb-6">
      To get a copy of my résumé, you can print this page.
    </p>
    <p class="mb-6 text-sm">
      For best results, use <strong>A4-sized</strong> paper and remove your custom margins.
    </p>

    <button
      class="group mr-4 inline-flex flex-row gap-1 hover:underline"
      @click="print">
      <span class="text-xs font-semibold uppercase">
        Print
      </span>
      <Icon
        class="inline text-red-500 transition-transform duration-100 group-hover:-translate-y-1"
        :paths="getIconPaths('print')" />
    </button>

    <Link
      arrow="down"
      label="Résumé as PDF"
      dest="https://dhruvkb.dev/resume.pdf"
      arrow-style="s">
      Download PDF
    </Link>
  </section>
</template>
