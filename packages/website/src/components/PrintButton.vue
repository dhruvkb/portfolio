<script setup lang="ts">
  import { useIcon } from '@/composables/icon'

  const print = () => {
    if (window) window.print()
  }
  const { getIcon } = useIcon()
</script>

<template>
  <button
    type="button"
    class="group lowercase underline hover:italic hover:text-imp"
    aria-label="Print this page"
    @click="print">
    <span>Print</span>
    <component
      :is="getIcon('print')"
      class="ml-1 inline-block text-red-500 transition-transform duration-100 group-hover:-translate-y-1"
      aria-hidden="true" />
  </button>
</template>
