<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

  import { usePalette } from '@/composables/palette'

  interface Props {
    /**
     * whether to use ASCII art as the site title or the regular text version;
     * In both cases, the screen-reader will read the full name.
     */
    isAscii?: boolean
    /**
     * whether pressing the ← and → keys will change the gradient colors to a
     * different pair
     */
    changesColor?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    isAscii: false,
    changesColor: false,
  })

  /**
   * pair of fractions representing the x and y positions of the center of the
   * radial gradient, where `[0, 0]` is the top-left position.
   */
  const gradientCenter = ref<[number, number]>([0.5, 0.5])
  const handleMouseMove = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const height = target.clientHeight
    const width = target.clientWidth
    gradientCenter.value = [event.offsetX / width, event.offsetY / height]
  }
  const backgroundStyles = computed(() => {
    const [xPos, yPos] = gradientCenter.value
    return {
      '--gradient-shape': 'circle',
      '--gradient-size': 'closest-corner',
      '--gradient-pos': `${xPos * 100}% ${yPos * 100}%`,
    }
  })

  const { idx, paletteClasses } = usePalette()
  const handleKeypress = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') idx.value -= 1
    else if (event.key === 'ArrowRight') idx.value += 1
  }

  if (props.changesColor) {
    onMounted(() => {
      window.addEventListener('keydown', handleKeypress)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeypress)
    })
  } else {
    // If color change is not permitted, reset color to red-fuchsia pair.
    idx.value = 0
  }
</script>

<template>
  <div :class="paletteClasses">
    <pre
      v-if="isAscii"
      class="text-grad-rad -mt-ln inline-block cursor-crosshair text-tx printing:hidden"
      :style="backgroundStyles"
      aria-hidden="true"
      @mousemove="handleMouseMove"><code class="hidden sm:inline-block">
  __   __                                __       __
 /\ \ /\ \                              /\ \     /\ \
 \_\ \\ \ \___    _ __   __  __   __  __\ \ \/'\ \ \ \____
 /'_` \\ \  _ `\ /\`'__\/\ \/\ \ /\ \/\ \\ \ , /_ \ \ '__`\
/\ \L\ \\ \ \ \ \\ \ \/ \ \ \_\ \\ \ \_/ |\ \ \\`\ \ \ \L\ \
\ \___,_\\ \_\ \_\\ \_\  \ \____/ \ \___/  \ \_\ \_\\ \_,__/
 \/__,_ / \/_/\/_/ \/_/   \/___/   \/__/    \/_/\/_/ \/___/</code><code class="inline-block sm:hidden">
     ____                 __   __
 ___/ / /  ______ ___  __/ /__/ /
/ _  / _ \/ __/ // | |/ /  '_/ _ \
\_,_/_//_/_/  \_,_/|___/_/\_/_.__/</code></pre>

    <span
      v-else
      class="text-grad-lin inline-block font-sans text-tx printing:hidden"
      aria-hidden="true">
      <span class="font-black">dhruv</span>
      <span>kb</span>
    </span>

    <span
      class="sr-only text-black printing:not-sr-only printing:text-xl dark:text-white">
      <span class="font-black">Dhruv</span>
      <span> Bhanushali</span>
    </span>
  </div>
</template>
