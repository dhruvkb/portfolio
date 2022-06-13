<!--
Renders an icon composed of specified paths as an SVG. This icon must be purely
presentational as it is hidden from assistive technologies.
-->

<script setup lang="ts">
  import { PropType } from 'vue'

  import { Path } from '@/models/icon'

  defineProps({
    paths: {
      type: Array as PropType<Path[]>,
      required: true,
    },
  })
</script>

<template>
  <svg
    class="h-4 w-4"
    viewBox="0 0 24 24"
    aria-hidden="true">
    <path
      v-for="(path, index) in paths"
      :key="index"
      v-bind="path"
      :fill="path.fill ?? 'currentColor'" />
  </svg>
</template>
