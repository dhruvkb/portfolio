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
    <h2
      class="section-heading"
      aria-label="What do I do?">
      What do <span class="mx-ch normal-case">I</span> do?
    </h2>

    <div class="mb-ln">
      I
      <ul
        class="inline text-imp transition-colors selection:text-reg hover:text-low">
        <li
          v-for="(deed, index) in deeds"
          :key="index"
          class="group inline">
          <span
            class="text-low transition-colors before:content-['['] after:content-[']'] group-hover:text-reg"
            aria-hidden="true"
            >{{ index + 1 }}</span
          >
          <span
            class="bg-gradient-to-r box-decoration-clone bg-clip-text transition-[color] selection:text-imp group-hover:text-tx"
            :class="deed.gradients">
            {{ deed.text }}
          </span>
          <span
            v-if="index < deeds.length - 2"
            class="text-low"
            >;
          </span>
          <span
            v-else-if="index === deeds.length - 2"
            class="text-low">
            and
          </span>
          <span
            v-else
            class="text-low"
            >.</span
          >
        </li>
      </ul>
    </div>

    <p>
      I, much like this site, am a
      <span
        class="text-low before:content-['['] after:content-[']']"
        aria-hidden="true"
        >🚧</span
      >
      work in progress.
    </p>
  </section>
</template>
