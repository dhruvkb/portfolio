<!--
Renders the name of a brand alongside its logo.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import { useIcon } from '@/composables/icon'

  import Icon from '@/components/Icon.vue'

  interface Props {
    id?: string
    name?: string
    shortName?: string
  }
  const props = defineProps<Props>()

  const { getIconPaths } = useIcon()

  const isVisible = computed(() => Boolean(props.id) && Boolean(props.name))
</script>

<template>
  <span
    v-if="isVisible"
    class="flex flex-row items-center gap-2">
    <span class="sr-only">{{ name }}</span>

    <Icon
      v-if="id"
      :paths="getIconPaths(id)" />

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
