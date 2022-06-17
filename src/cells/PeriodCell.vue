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
</script>

<template>
  <div class="flex flex-row items-center justify-center sm:justify-between">
    <span class="hidden font-mono tracking-tighter md:inline">
      <span>{{ start.join("'") }}</span>
      <span class="m-1 text-neutral-400 dark:text-neutral-600">&ndash;</span>
      <span v-if="!isActive">{{ end?.join("'") }}</span>
    </span>

    <div
      class="h-2 w-2"
      :title="description">
      <div
        class="h-full w-full rounded-full border border-curr"
        :class="{'text-red-500 bg-curr': isActive}"
        aria-hidden="true" />
      <span class="sr-only">{{ description }}</span>
    </div>
  </div>
</template>
