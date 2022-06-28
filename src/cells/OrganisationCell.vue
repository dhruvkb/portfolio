<!--
Renders the name of the organisation alongside the logo of the organisation.
-->

<script setup lang="ts">
  import { useIcon } from '@/composables/icon'
  import type { Org } from '@/models/role'

  import Icon from '@/components/Icon.vue'

  interface Props {
    org?: Org
  }
  defineProps<Props>()

  const { getIconPaths } = useIcon()
</script>

<template>
  <span v-if="org">
    <span class="sr-only">{{ org.name }}</span>

    <Icon
      class="mr-2 inline-block"
      :paths="getIconPaths(org.slug)" />

    <!-- Short name for small screens -->
    <span
      class="sm:hidden"
      aria-hidden="true">
      {{ org.shortName ?? org.name }}
    </span>

    <!-- Complete name for large screens -->
    <span
      class="hidden sm:inline"
      aria-hidden="true">
      {{ org.name }}
    </span>
  </span>
</template>
