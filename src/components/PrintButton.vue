<script setup lang="ts">
  import { useIcon } from '@/composables/icon'

  const print = () => {
    if (window) window.print()
  }
  const { getIcon } = useIcon()
</script>

<template>
  <button
    class="group inline-flex flex-row gap-1 hover:underline"
    @click="print">
    <span class="text-xs font-semibold uppercase">
      Print
    </span>
    <component
      :is="getIcon('print')"
      class="inline text-red-500 transition-transform duration-100 group-hover:-translate-y-1" />
  </button>
</template>
