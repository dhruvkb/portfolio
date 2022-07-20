<!--
Displays a list of my past work experiences and projects in a tabular format.
Uses data from the 'resume' store in Pinia.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import { useProjectTable } from '@/composables/projects_table'
  import { useRoleTable } from '@/composables/roles_table'

  import Brand from '@/components/Brand.vue'
  import DataTable from '@/components/DataTable.vue'
  import Link from '@/components/Link.vue'
  import Period from '@/components/Period.vue'
  import TechStack from '@/components/TechStack.vue'

  const { columns: roleColumns, data: roleData } = useRoleTable()
  const { columns: projectColumns, data: projectData } = useProjectTable()

  const tables = computed(() => [
    {
      title: 'Roles',
      columns: roleColumns,
      rows: roleData.value,
    },
    {
      title: 'Projects',
      columns: projectColumns,
      rows: projectData.value,
    },
  ])
</script>

<template>
  <section aria-label="Résumé">
    <div class="px-page mb-6">
      <h2 aria-label="Résumé">
        Résumé
      </h2>
    </div>

    <!-- TODO: Revisit the idea of both tables being side by side. -->
    <div class="mb-12 grid grid-cols-1 gap-12">
      <DataTable
        v-for="(table, tableIndex) in tables"
        :key="tableIndex"
        v-bind="table">
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
    </div>

    <div class="px-page">
      <Link
        label="Résumé as PDF"
        dest="https://dhruvkb.github.io/resume/">
        Résumé
      </Link>
    </div>
  </section>
</template>
