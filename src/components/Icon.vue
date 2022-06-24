<!--
Renders an icon composed of specified paths as an SVG. This icon must be purely
presentational as it is hidden from assistive technologies.
-->

<script setup lang="ts">
  import type { Path } from '@/models/icon'

  interface Props {
    paths: Path[]
  }
  defineProps<Props>()
</script>

<template>
  <svg
    class="h-[1em] w-[1em]"
    viewBox="0 0 24 24"
    aria-hidden="true">
    <path
      v-for="(path, index) in paths"
      :key="index"
      v-bind="path"
      :fill="path.fill ?? 'currentColor'" />
  </svg>
</template>
