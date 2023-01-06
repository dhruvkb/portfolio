<!--
Renders the tech stack of a project as a list of technologies alongside their
icons and logos.
-->

<script setup lang="ts">
  import type { Technology } from 'reschume'

  import { useIcon } from '@/composables/icon'

  interface Props {
    technologies: Technology[]
  }
  defineProps<Props>()

  const { getIcon } = useIcon()
</script>

<template>
  <span class="divide-x leading-none">
    <span
      v-for="technology in technologies"
      :key="technology.name"
      class="inline-flex flex-row items-center gap-2 border-neutral-200 px-2 first:pl-0 last:pr-0 dark:border-neutral-900">
      <component
        :is="getIcon(technology.id)"
        v-if="technology.id" />
      <span class="sr-only printing:not-sr-only md:not-sr-only">{{
        technology.name
      }}</span>
    </span>
  </span>
</template>
