<!--
Renders all media that can be used to contact me in a table, including
hyperlinks, where appropriate.
-->

<script setup lang="ts">
  import { useContacts } from '@/composables/contacts'
  import { useIcon } from '@/composables/icon'

  import Icon from '@/components/Icon.vue'
  import Link from '@/components/Link.vue'

  const { getIconPaths } = useIcon()
  const { contactMedia } = useContacts()
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
        v-for="medium in contactMedia"
        :key="medium.id"
        class="sm:last-of-type:col-span-3 lg:last-of-type:col-span-1">
        <h2 class="font-semibold">
          {{ medium.name }}
        </h2>
        <div>
          <Icon
            class="mr-2 inline-block"
            :paths="getIconPaths(medium.id)" />
          <component
            :is="medium.url ? Link : 'span'"
            :label="`${medium.name} profile`"
            :dest="medium.url"
            variant="plain">
            {{ medium.username }}
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
