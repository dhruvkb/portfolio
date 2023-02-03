<!--
Displays a list of what I do and can do.
-->

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  import { usePalette } from '@/composables/palette'

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
      What do <span class="mx-ch normal-case">I</span> do?
    </h2>

    <div class="mb-ln">
      I
      <ul
        class="inline text-neutral-900 transition-colors hover:text-neutral-400 dark:text-neutral-200 dark:hover:text-neutral-600">
        <li
          v-for="(deed, index) in deeds"
          :key="index"
          class="group inline">
          <span
            class="text-neutral-400 transition-colors before:content-['['] after:content-[']'] group-hover:text-neutral-700 dark:text-neutral-600 dark:group-hover:text-neutral-400"
            aria-hidden="true"
            >{{ index + 1 }}</span
          >
          <span
            class="text-grad-lin transition-[color] group-hover:text-tx"
            :class="deed.gradients">
            {{ deed.text }}
          </span>
          <span
            v-if="index < deeds.length - 2"
            class="text-neutral-700 dark:text-neutral-400"
            >;
          </span>
          <span
            v-else-if="index === deeds.length - 2"
            class="text-neutral-700 dark:text-neutral-400">
            and
          </span>
          <span
            v-else
            class="text-neutral-700 dark:text-neutral-400"
            >.</span
          >
        </li>
      </ul>
    </div>

    <p>
      I, much like this site, am a
      <span
        class="text-neutral-400 before:content-['['] after:content-[']'] dark:text-neutral-600"
        aria-hidden="true"
        >🚧</span
      >
      work in progress.
    </p>
  </section>
</template>
