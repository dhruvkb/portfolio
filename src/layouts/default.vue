<script setup lang="ts">
  import { usePage } from 'iles'

  import { useResume } from '@/stores/resume'

  import FooterSection from '@/sections/FooterSection.vue'
  import HeaderSection from '@/sections/HeaderSection.vue'

  const { site } = usePage()
  const resumeStore = useResume()
  await resumeStore.loadResume(site.resumeUrl)
</script>

<template>
  <HeaderSection class="py-page print:hidden" />

  <!-- Page content goes here -->
  <slot />

  <FooterSection
    class="py-page border-t border-neutral-200 dark:border-neutral-900 print:hidden" />

  <component
    :is="'script'"
    src="//gc.zgo.at/count.js"
    data-goatcounter="https://dhruvkb.goatcounter.com/count"
    async />
</template>
