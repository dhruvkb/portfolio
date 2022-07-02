<!--
Renders the period of activity of a role, with a dot that indicates if that role
is still active.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import type { Date as DateType } from 'reschume'

  interface Props {
    start: DateType,
    end?: DateType
  }
  const props = defineProps<Props>()

  const isActive = computed(() => !props.end)
  const description = computed(() => (isActive.value ? 'Active role' : 'Past role'))

  const audibleDate = (period: DateType) => {
    const [yyyy, mm = 1, dd = 1] = period

    const options: Intl.DateTimeFormatOptions = {}
    if (period.length >= 1) options.year = 'numeric'
    if (period.length >= 2) options.month = 'long'
    if (period.length >= 3) options.day = 'numeric'

    return new Date(yyyy, mm - 1, dd).toLocaleString('default', options)
  }

  const readableDate = (period: DateType) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const [yyyy, mm = undefined, dd = undefined] = period
    const dateText: (string | number)[] = [yyyy % 100]
    if (mm) dateText.push(monthNames[mm - 1])
    if (dd) dateText.push(dd)

    return dateText.reverse().join('<span class="text-neutral-400 dark:text-neutral-600">.</span>')
  }

  const descText = computed(() => {
    let period
    if (props.end) period = `${audibleDate(props.start)} to ${audibleDate(props.end)}`
    else period = `${audibleDate(props.start)} to present`
    return `${description.value}: ${period}`
  })
</script>

<template>
  <span class="flex flex-row items-center justify-center md:justify-between">
    <span class="sr-only">{{ descText }}</span>

    <span
      class="hidden font-mono tracking-tighter md:inline"
      aria-hidden="true">
      <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
      <span
        :title="audibleDate(start)"
        v-html="readableDate(start)" />
      <span class="m-1 text-neutral-400 dark:text-neutral-600">&ndash;</span>
      <span
        v-if="end"
        :title="audibleDate(end)"
        v-html="readableDate(end)" />
      <!-- eslint-enable vue/no-v-html -->
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
