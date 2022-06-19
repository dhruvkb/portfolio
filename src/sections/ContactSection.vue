<!--
Renders all media that can be used to contact me in a table, including
hyperlinks, where appropriate.
-->

<script setup lang="ts">
  import { ContactMedium } from '@/models/contact'
  import { RowData } from '@/models/data_table'

  import DataTable from '@/components/DataTable.vue'

  import contactsJson from '@/data/contacts.json'

  const contactColumns = [
    { code: 'name', display: 'Medium' },
    { code: 'handle', display: 'Handle', componentName: 'Handle' },
  ] as const
  type ContactData = RowData<typeof contactColumns[number]['code']>

  const contactData: ContactMedium[] = contactsJson
  const contactMedia = contactData.map((medium): ContactData => ({
    isLast: medium.isLast ?? false,
    data: {
      name: medium.name,
      handle: { medium }, // Props will automatically use fields from object.
    },
  }))
</script>

<template>
  <section aria-label="Contact">
    <div class="px-page mb-6">
      <h1 aria-label="Let's talk">
        Let's talk
      </h1>

      <p class="text-3xl leading-snug sm:text-4xl">
        I'm always open to collaborating on new ideas.
        <strong>Hit me up!</strong>
      </p>
    </div>

    <DataTable
      class="mb-6"
      :columns="contactColumns"
      :rows="contactMedia" />
  </section>
</template>
