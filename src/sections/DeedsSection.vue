<!--
Displays a list of what I do and can do.
-->

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  import { usePalette } from '@/composables/palette'

  import ReferenceIndex from '@/components/ReferenceIndex.vue'

  const { getPaletteClasses } = usePalette()

  const deeds = [
    'write elegant code',
    'design accessible interfaces',
    'deploy scalable apps',
    'author helpful documentation',
    'nurture FOSS communities',
    'sneak easter eggs',
  ].map((deed, index) => ({
    text: deed,
    gradients: getPaletteClasses(index + 1),
  }))

  /* Animation logic */

  const activeDeed = ref<number | null>(null)
  const animationJob = () => {
    if (activeDeed.value === null) activeDeed.value = 0
    else activeDeed.value += 1

    if (activeDeed.value <= deeds.length) setTimeout(animationJob, 1000)
  }
  onMounted(animationJob)
</script>

<template>
  <section aria-label="Deeds">
    <h2 aria-label="What do I do?">
      What do <span class="normal-case">I</span> do?
    </h2>

    <p class="body-text mb-6 max-w-text">
      I
      <template
        v-for="(deed, index) in deeds"
        :key="index">
        <ReferenceIndex
          class="align-top"
          :index="index + 1" />
        <span
          class="gradient-text hover:text-tx"
          :class="[deed.gradients, { 'text-tx': index === activeDeed }]">
          {{ deed.text }}
        </span>
        <span v-if="index < deeds.length - 2">; </span>
        <span v-else-if="index === deeds.length - 2"> and </span>
        <span v-else>.</span>
      </template>
    </p>

    <p class="text-sm">
      <span
        class="inline-block -translate-y-1/2 align-top text-xs"
        aria-hidden="true">
        🚧
      </span>This site, like myself, is a work in progress.
    </p>
  </section>
</template>
