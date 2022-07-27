<script setup lang="ts">
  import { useIcon } from '@/composables/icon'

  import Icon from '@/components/Icon.vue'

  const print = () => {
    if (window) window.print()
  }
  const { getIconPaths } = useIcon()
</script>

<template>
  <button
    class="group inline-flex flex-row gap-1 hover:underline"
    @click="print">
    <span class="text-xs font-semibold uppercase">
      Print
    </span>
    <Icon
      class="inline text-red-500 transition-transform duration-100 group-hover:-translate-y-1"
      :paths="getIconPaths('print')" />
  </button>
</template>
