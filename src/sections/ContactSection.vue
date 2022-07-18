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
  <section aria-label="Contact">
    <h2 aria-label="Contact">
      Contact
    </h2>

    <p class="body-text mb-12">
      Let's get in touch.
    </p>

    <div class="grid grid-cols-1 gap-y-4 text-lg sm:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="medium in contactMedia"
        :key="medium.id"
        class="sm:last-of-type:col-span-3 lg:last-of-type:col-span-1">
        <h3 class="font-medium">
          {{ medium.name }}
        </h3>
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
  </section>
</template>
