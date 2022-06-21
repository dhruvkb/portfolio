<!--
Renders the period of activity of a role, with a dot that indicates if that role
is still active.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    start: string[],
    end?: string[]
  }
  const props = defineProps<Props>()

  const isActive = computed(() => !props.end)
  const description = computed(() => (isActive.value ? 'Active role' : 'Past role'))

  const readableDate = (period: string[]) => {
    const [shortMonth, yy] = period
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthNum = monthNames.indexOf(shortMonth)
    const yearNum = parseInt(`20${yy}`, 10)
    return new Date(yearNum, monthNum, 1).toLocaleString('default', { year: 'numeric', month: 'long' })
  }

  const descText = computed(() => {
    let period
    if (props.end) {
      period = `${readableDate(props.start)} to ${readableDate(props.end)}`
    } else {
      period = `${readableDate(props.start)} to present`
    }
    return `${description.value}: ${period}`
  })
</script>

<template>
  <span class="flex flex-row items-center justify-center md:justify-between">
    <span class="sr-only">{{ descText }}</span>

    <span
      class="hidden font-mono tracking-tighter md:inline"
      aria-hidden="true">
      <span :title="readableDate(start)">{{ start.join("'") }}</span>
      <span class="m-1 text-neutral-400 dark:text-neutral-600">&ndash;</span>
      <span
        v-if="end"
        :title="readableDate(end)">{{ end.join("'") }}</span>
    </span>

    <span
      class="block h-2 w-2"
      :title="description"
      aria-hidden="true">
      <span
        class="block h-full w-full rounded-full border border-curr"
        :class="{'text-red-500 bg-curr': isActive}"
        aria-hidden="true" />
      <span class="sr-only">{{ description }}</span>
    </span>
  </span>
</template>
