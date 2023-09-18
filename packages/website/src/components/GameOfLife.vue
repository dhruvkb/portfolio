<!--
Renders a game of life starting from a 404 pattern that eventually reaches an oscillating position.
Hopefully the user navigates away from it by that point.
-->

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  import { useResizeObserver, useMediaQuery } from '@vueuse/core'

  import { useGameOfLife } from '@/composables/game_of_life'

  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion)')

  const columns = ref(0)
  const rows = ref(0)
  const { board, updateLoop } = useGameOfLife(columns, rows)
  onMounted(() => {
    // Start the animation after 5 seconds.
    if (!prefersReducedMotion.value) setTimeout(updateLoop, 5000)
  })

  const boardEl = ref<HTMLElement | null>(null)
  useResizeObserver(boardEl, (entries) => {
    const [entry] = entries
    const { width, height } = entry.contentRect
    columns.value = Math.floor(width / 16)
    rows.value = Math.floor(height / 16)
  })

  const cellValue = (column: number, row: number): boolean =>
    !!(board.value && board.value[column][row])
</script>

<template>
  <div
    ref="boardEl"
    class="flex touch-none flex-col items-center justify-center"
    aria-hidden="true">
    <div class="bg-gradient-to-r from-red-500 to-fuchsia-500">
      <div
        v-for="row in rows"
        :key="row"
        :data-row="row"
        class="flex flex-row items-center">
        <div
          v-for="column in columns"
          :key="column"
          class="inline-block h-4 w-4 border border-bg"
          :class="cellValue(column - 1, row - 1) ? 'bg-tx' : 'bg-bg'"
          :data-cell="`${column}-${row}`" />
      </div>
    </div>
  </div>
</template>
