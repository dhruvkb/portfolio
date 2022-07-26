<!--
Displays a list of my past work experiences and projects in a tabular format.
Uses data from the 'resume' store in Pinia.
-->

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  import { useResume } from '@/stores/resume'

  import { useProjectTable } from '@/composables/projects_table'
  import { useRoleTable } from '@/composables/roles_table'

  import Brand from '@/components/Brand.vue'
  import DataTable from '@/components/DataTable.vue'
  import Link from '@/components/Link.vue'
  import Period from '@/components/Period.vue'
  import TechStack from '@/components/TechStack.vue'

  import EpicCard from '@/cards/EpicCard.vue'
  import OrgCard from '@/cards/OrgCard.vue'

  const resumeStore = useResume()
  const { epics, orgs } = storeToRefs(resumeStore)
  const { columns: roleColumns, data: roleData } = useRoleTable(orgs)
  const { columns: projectColumns, data: projectData } = useProjectTable(epics)

  const sections = computed(() => [
    {
      code: 'role',
      title: 'Roles',
      columns: roleColumns,
      groups: roleData.value,
      items: Object.values(orgs.value),
    },
    {
      code: 'project',
      title: 'Projects',
      columns: projectColumns,
      groups: projectData.value,
      items: Object.values(epics.value),
    },
  ])
</script>

<template>
  <section aria-label="Works">
    <div class="px-page mb-6">
      <h2 aria-label="Works">
        Works
      </h2>
    </div>

    <template
      v-for="(section, sectionIndex) in sections"
      :key="sectionIndex">
      <DataTable
        class="mb-6 hidden sm:table"
        v-bind="section">
        <!-- Some of these templates will be unused, depending on the columns in the table. -->
        <template #org="{ data: org }">
          <Brand v-bind="org" />
        </template>
        <template #epic="{ data: epic }">
          <Brand v-bind="epic" />
        </template>
        <template #link="{ data: link }">
          <Link v-bind="link" />
        </template>
        <template #period="{ data: period }">
          <Period v-bind="period" />
        </template>
        <template #technologies="{ data: technologies }">
          <TechStack v-bind="technologies" />
        </template>
      </DataTable>

      <DataDeck
        class="mb-6 sm:hidden"
        v-bind="section">
        <template #project="{ item: epic }">
          <EpicCard :epic="epic" />
        </template>
        <template #role="{ item: org }">
          <OrgCard :org="org" />
        </template>
      </DataDeck>
    </template>
  </section>
</template>
