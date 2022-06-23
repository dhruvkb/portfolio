<!--
Renders all media that can be used to contact me in a table, including
hyperlinks, where appropriate.
-->

<script setup lang="ts">

  import { SimpleIcon } from 'simple-icons'
  import {
    siGithub,
    siInstagram,
    siLinkedin,
  } from 'simple-icons/icons'

  import { ContactMedium } from '@/models/contact'
  import { Icon as IconType, Path } from '@/models/icon'

  import Icon from '@/components/Icon.vue'
  import Link from '@/components/Link.vue'

  import envelope from '@/assets/icons/envelope.json'

  import contactsJson from '@/data/contacts.json'

  const contactData: ContactMedium[] = contactsJson

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
  <section
    class="px-page"
    aria-label="Contact">
    <h1 aria-label="Let's talk">
      Let's talk
    </h1>

    <div class="mb-6 grid grid-cols-1 gap-y-4 text-lg sm:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="medium in contactData"
        :key="medium.name"
        class="sm:last-of-type:col-span-3 lg:last-of-type:col-span-1">
        <h2 class="font-semibold">
          {{ medium.name }}
        </h2>
        <div>
          <Icon
            class="mr-2 inline-block"
            :paths="getPaths(medium.icon)" />
          <component
            :is="medium.url ? Link : 'span'"
            :label="`${medium.name} profile`"
            :dest="medium.url"
            variant="plain">
            {{ medium.text }}
          </component>
        </div>
      </div>
    </div>

    <p class="text-sm leading-snug">
      I'm always open to collaborating on new and exciting ideas. To discuss a
      project, drop me a line!
    </p>
  </section>
</template>
