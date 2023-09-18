<!--
Renders all media that can be used to contact me in a table, including
hyperlinks, where appropriate.
-->

<script setup lang="ts">
  import Link from '@/components/Link.vue'
  import { useContacts } from '@/composables/contacts'
  import { useIcon } from '@/composables/icon'

  const { getIcon } = useIcon()
  const { contactMedia } = useContacts()
</script>

<template>
  <section aria-label="Contact">
    <h2
      id="contact"
      class="section-heading"
      aria-label="Contact">
      Contact
    </h2>

    <p class="mb-ln printing:hidden">
      I'm always open to collaborating on new and exciting ideas. If you have
      one, drop me and line and we will connect.
    </p>
    <p class="mb-1 not-printing:hidden">Let's connect.</p>

    <div class="printing:grid printing:grid-cols-2 printing:gap-y-1">
      <div
        v-for="medium in contactMedia"
        :key="medium.id">
        <div>
          <component
            :is="medium.url ? Link : 'span'"
            :dest="medium.url"
            :label="`${medium.name} profile`">
            <component
              :is="getIcon(medium.id)"
              class="mr-ch inline-block"
              aria-hidden="true" />
            <span>{{ medium.username }}</span>
          </component>
        </div>
      </div>
    </div>
  </section>
</template>
