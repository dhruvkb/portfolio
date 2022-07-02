<!--
Renders the tech stack of a project as a list of technologies alongside their
icons and logos.
-->

<script setup lang="ts">
  import type { Technology } from 'reschume'

  import { useIcon } from '@/composables/icon'

  import Icon from '@/components/Icon.vue'

  interface Props {
    technologies: Technology[]
  }
  defineProps<Props>()

  const { getIconPaths } = useIcon()
</script>

<template>
  <span>
    <span
      v-for="(technology) in technologies"
      :key="technology.name"
      class="mr-2 border-r border-neutral-200 pr-2 first-of-type:ml-0 last-of-type:mr-0 last-of-type:border-0 dark:border-neutral-900">
      <span
        class="inline-flex flex-row items-center gap-2">
        <Icon :paths="getIconPaths(technology.id)" />
        <span class="sr-only sm:not-sr-only">{{ technology.name }}</span>
      </span>
    </span>
  </span>
</template>
