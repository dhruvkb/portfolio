<!--
Renders a de-emphasised number enclosed in square brackets.
-->

<script setup lang="ts">
  interface Props {
    index: number
  }
  defineProps<Props>()
</script>

<template>
  <span
    class="text-neutral-400 before:content-['['] after:content-[']'] dark:text-neutral-600"
    aria-hidden="true"
    >{{ index }}</span
  >
</template>
