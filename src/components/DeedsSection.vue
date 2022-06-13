<!--
Display a list of what I do and can do.
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
  <div class="px-page">
    <h1>What do I do?</h1>

    <p
      ref="deedsEl"
      class="mb-6 text-3xl leading-snug sm:text-4xl">
      I
      <template
        v-for="(deed, index) in deeds"
        :key="index">
        <span class="align-top font-mono text-sm font-semibold text-neutral-400 dark:text-neutral-600">[{{ index + 1 }}]</span>
        <span
          class="grad-text"
          :class="[deed.gradients, {'text-tx': index === activeDeed}]"
          @touchstart="() => {}">
          {{ deed.text }}
        </span>
        <span v-if="index < deeds.length - 2">; </span>
        <span v-else-if="index === deeds.length - 2"> and </span>
        <span v-else>.</span>
      </template>
    </p>

    <p
      class="text-3xl sm:text-4xl"
      title="This refers to both me, the person and this site.">
      I am a <strong>work in progress</strong><span class="align-top text-xs">🚧</span>.
    </p>
  </div>
</template>

<style>
  .grad-text {
    @apply hover:text-tx bg-clip-text bg-gradient-to-r box-decoration-clone transition-colors duration-200;
  }
</style>
