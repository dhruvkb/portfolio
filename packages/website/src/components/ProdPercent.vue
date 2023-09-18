<!--
Calculate an approximate percentage of my lifespan that I've spent programming
or working with computers.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  const age = computed(() => new Date().getFullYear() - 1997) // approximate
  const prodAge = computed(() => age.value - 12)

  const percent = computed(() => Math.ceil((prodAge.value / age.value) * 100))
</script>

<template>
  <span>~{{ percent }}% of my life</span>
</template>
