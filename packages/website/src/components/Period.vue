<!--
Renders the period of activity of a role, with a dot that indicates if that role
is still active.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import type { Date as DateType } from 'reschume'

  import { audibleDate, readableDate } from '@/utils/date'

  interface Props {
    start: DateType
    end?: DateType
  }
  const props = defineProps<Props>()

  const isActive = computed(() => !props.end)
  const description = computed(() =>
    isActive.value ? 'Active role' : 'Past role'
  )

  const descText = computed(() => {
    let period
    if (props.end)
      period = `${audibleDate(props.start)} to ${audibleDate(props.end)}`
    else period = `${audibleDate(props.start)} to present`
    return `${description.value}: ${period}`
  })
</script>

<template>
  <span
    class="flex flex-row items-center justify-center gap-ch md:justify-between">
    <span class="sr-only">{{ descText }}</span>

    <span
      class="hidden font-mono tracking-tighter printing:inline md:inline"
      aria-hidden="true">
      <!-- eslint-disable vue/no-v-html HTML generated from trusted data -->
      <span
        :title="audibleDate(start)"
        v-html="readableDate(start)" />
      <span class="m-ch text-low">&ndash;</span>
      <span
        v-if="end"
        :title="audibleDate(end)"
        v-html="readableDate(end)" />
      <span
        v-else
        class="hidden printing:inline"
        >Present</span
      >
      <!-- eslint-enable vue/no-v-html -->
    </span>

    <span
      class="flex w-[2ch] items-center justify-center"
      :title="description"
      aria-hidden="true">
      <span
        class="block h-2 w-2 rounded-full border border-curr"
        :class="{ 'bg-curr text-red-500': isActive }"
        aria-hidden="true" />
      <span class="sr-only">{{ description }}</span>
    </span>
  </span>
</template>
