<!--
Renders the name of the organisation alongside the logo of the organisation.
-->

<script setup lang="ts">
  import { SimpleIcon } from 'simple-icons'
  import {
    siAutomattic,
    siCreativecommons,
    siFampay,
    siHackerearth,
    siWordpress,
  } from 'simple-icons/icons'

  import { Icon as IconType, Path } from '@/models/icon'
  import { Org } from '@/models/role'

  import Icon from '@/components/Icon.vue'

  import browserstack from '@/assets/icons/browserstack.json'
  import centerofci from '@/assets/icons/centerofci.json'
  import imgiitroorkee from '@/assets/icons/imgiitroorkee.json'

  interface Props {
    org?: Org
  }
  defineProps<Props>()

  const simpleIcons: Record<string, SimpleIcon> = {
    automattic: siAutomattic,
    creative_commons: siCreativecommons,
    fampay: siFampay,
    hackerearth: siHackerearth,
    wordpress: siWordpress,
  }
  const customIcons: Record<string, IconType> = {
    center_of_ci: centerofci as IconType,
    browserstack: browserstack as IconType,
    img: imgiitroorkee as IconType,
  }

  const getPaths = (slug: string): Path[] => customIcons[slug]?.paths ?? [{
    d: simpleIcons[slug].path,
    'fill-rule': 'nonzero',
  }]
</script>

<template>
  <span
    v-if="org"
    class="inline-flex flex-row items-center gap-2">
    <Icon :paths="getPaths(org.slug)" />

    <!-- Short name for small screens -->
    <span class="sm:hidden">
      {{ org.shortName ?? org.name }}
    </span>

    <!-- Complete name for large screens -->
    <span class="hidden sm:inline">
      {{ org.name }}
    </span>
  </span>
</template>
