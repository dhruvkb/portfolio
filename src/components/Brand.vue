<!--
Renders the name of a brand alongside its logo.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import { useIcon } from '@/composables/icon'

  interface Props {
    id?: string
    name?: string
    shortName?: string
  }
  const props = defineProps<Props>()

  const { getIcon } = useIcon()

  const isVisible = computed(() => Boolean(props.id) && Boolean(props.name))
</script>

<template>
  <span
    v-if="isVisible"
    class="flex flex-row items-center gap-ch">
    <span class="sr-only">{{ name }}</span>

    <component
      :is="getIcon(id)"
      v-if="id"
      width="2ch"
      aria-hidden="true" />

    <!-- Short name for small screens -->
    <span
      class="sm:hidden"
      aria-hidden="true">
      {{ shortName ?? name }}
    </span>

    <!-- Complete name for large screens -->
    <span
      class="hidden sm:inline"
      aria-hidden="true">
      {{ name }}
    </span>
  </span>
</template>
