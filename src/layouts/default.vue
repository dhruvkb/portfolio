<script setup lang="ts">
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { usePage } from 'iles'

  import { useResume } from '@/stores/resume'

  const { site } = usePage()
  const resumeStore = useResume()
  await resumeStore.initResume(site.resumeUrl)
</script>

<template>
  <!-- Page content goes here -->
  <slot />
</template>
