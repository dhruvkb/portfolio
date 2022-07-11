<script setup lang="ts">
  import { usePage } from 'iles'

  import { useResume } from '@/stores/resume'

  import AsciiArt from '@/components/AsciiArt.vue'

  import FooterSection from '@/sections/FooterSection.vue'
  import HeaderSection from '@/sections/HeaderSection.vue'

  const { site } = usePage()
  const resumeStore = useResume()
  await resumeStore.initResume(site.resumeUrl)
</script>

<template>
  <AsciiArt />

  <HeaderSection class="py-page print:hidden" />

  <!-- Page content goes here -->
  <slot />

  <FooterSection class="py-page border-t border-neutral-200 dark:border-neutral-900 print:hidden" />
</template>
