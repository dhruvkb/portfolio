<!--
Renders the tech stack of a project as a list of technologies alongside their
icons and logos.
-->

<script setup lang="ts">
  import type { Tech } from 'recivi'

  import { useIcon } from '@/composables/icon'

  interface Props {
    technologies: Tech[]
    isShort?: boolean
  }
  const props = defineProps<Props>()

  const { getIcon } = useIcon()

  const getName = (tech: Tech): string =>
    props.isShort && tech.shortName ? tech.shortName : tech.name
</script>

<template>
  <span class="divide-x">
    <span
      v-for="technology in technologies"
      :key="technology.name"
      class="inline-flex flex-row items-center gap-ch border-hl px-ch first:pl-0 last:pr-0">
      <component
        :is="getIcon(technology.id)"
        v-if="technology.id"
        aria-hidden="true" />
      <span class="sr-only printing:not-sr-only md:not-sr-only">{{
        getName(technology)
      }}</span>
    </span>
  </span>
</template>
