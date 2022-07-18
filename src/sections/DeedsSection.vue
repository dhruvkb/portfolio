<!--
Displays a list of what I do and can do.
-->

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  import ReferenceIndex from '@/components/ReferenceIndex.vue'

  const deeds = [
    {
      text: 'write elegant code',
      gradients: ['from-violet-500', 'to-blue-500'],
    },
    {
      text: 'design accessible interfaces',
      gradients: ['from-blue-500', 'to-cyan-500'],
    },
    {
      text: 'deploy scalable apps',
      gradients: ['from-cyan-500', 'to-lime-500'],
    },
    {
      text: 'author helpful documentation',
      gradients: ['from-lime-500', 'to-yellow-500'],
    },
    {
      text: 'nurture FOSS communities',
      gradients: ['from-yellow-500', 'to-orange-500'],
    },
    {
      text: 'sneak easter eggs',
      gradients: ['from-orange-500', 'to-red-500'],
    },
  ]

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
      What do I do?
    </h2>

    <p class="body-text mb-6 max-w-screen-lg">
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
