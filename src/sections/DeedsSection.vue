<!--
Displays a list of what I do and can do.
-->

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

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
  <section
    class="px-page"
    aria-label="Deeds">
    <h1 aria-label="What do I do?">
      What do I do?
    </h1>

    <p class="mb-6 text-3xl leading-snug sm:text-4xl">
      I
      <template
        v-for="(deed, index) in deeds"
        :key="index">
        <span
          class="align-top font-mono text-sm font-semibold text-neutral-400 dark:text-neutral-600"
          aria-hidden="true">[{{ index + 1 }}]</span>
        <span
          class="gradient-text hover:text-tx"
          :class="[deed.gradients, {'text-tx': index === activeDeed}]">
          {{ deed.text }}
        </span>
        <span v-if="index < deeds.length - 2">; </span>
        <span v-else-if="index === deeds.length - 2"> and </span>
        <span v-else>.</span>
      </template>
    </p>

    <p class="text-sm leading-snug">
      <span
        class="inline-block -translate-y-1/2 align-top text-xs"
        aria-hidden="true">
        🚧
      </span>This site, like myself, is a work in progress.
    </p>
  </section>
</template>
