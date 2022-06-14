<!--
Renders the name of the organisation alongside the logo of the organisation.
-->

<script setup lang="ts">
  import { PropType } from 'vue'

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

  defineProps({
    organisation: {
      type: Object as PropType<Org>,
      required: true,
    },
  })

  const simpleIcons: Record<string, SimpleIcon> = {
    automattic: siAutomattic,
    creativecommons: siCreativecommons,
    fampay: siFampay,
    hackerearth: siHackerearth,
    wordpress: siWordpress,
  }
  const customIcons: Record<string, IconType> = {
    centerofci: centerofci as IconType,
    browserstack: browserstack as IconType,
    imgiitroorkee: imgiitroorkee as IconType,
  }

  const getPaths = (organisation: string): Path[] => customIcons[organisation]?.paths ?? [{
    d: simpleIcons[organisation].path,
    'fill-rule': 'nonzero',
  }]
</script>

<template>
  <span class="inline-flex flex-row items-center gap-2">
    <Icon :paths="getPaths(organisation.icon)" />
    <span class="hidden sm:inline">
      {{ organisation.name }}
    </span>
  </span>
</template>
