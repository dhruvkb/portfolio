<!--
Renders a hyperlink to my address for a contact medium alongside an icon
representing the medium.
-->

<script setup lang="ts">
  import { SimpleIcon } from 'simple-icons'
  import {
    siGithub,
    siLinkedin,
    siInstagram,
  } from 'simple-icons/icons'

  import { Icon as IconType, Path } from '@/models/icon'

  import Icon from '@/components/Icon.vue'
  import Link from '@/components/Link.vue'

  import envelope from '@/assets/icons/envelope.json'

  interface Props {
    text: string
    url?: string
    icon?: string
  }
  defineProps<Props>()

  const simpleIcons: Record<string, SimpleIcon> = {
    github: siGithub,
    linkedin: siLinkedin,
    instagram: siInstagram,
  }
  const customIcons: Record<string, IconType> = {
    envelope: envelope as IconType,
  }

  const getPaths = (icon: string): Path[] => customIcons[icon]?.paths ?? [{
    d: simpleIcons[icon].path,
    'fill-rule': 'nonzero',
  }]
</script>

<template>
  <component
    :is="url ? Link : 'span'"
    :dest="url"
    is-plain>
    <div class="flex flex-row items-center gap-2">
      <Icon
        v-if="icon"
        :paths="getPaths(icon)" />
      {{ text }}
    </div>
  </component>
</template>
