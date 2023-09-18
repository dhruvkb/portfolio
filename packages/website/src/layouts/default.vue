<script setup lang="ts">
  import { usePage } from 'iles'

  import FooterSection from '@/sections/FooterSection.vue'
  import HeaderSection from '@/sections/HeaderSection.vue'
  import { useResume } from '@/stores/resume'

  const { site } = usePage()
  const resumeStore = useResume()
  await resumeStore.loadResume(site.resumeUrl)
</script>

<template>
  <HeaderSection class="mx-auto mb-ln w-full max-w-text print:hidden" />

  <!-- Page content goes here -->
  <slot />

  <FooterSection
    class="mx-auto mt-ln w-full max-w-text border-t border-hl print:hidden" />

  <component
    :is="'script'"
    src="//gc.zgo.at/count.js"
    data-goatcounter="https://dhruvkb.goatcounter.com/count"
    async />
</template>
