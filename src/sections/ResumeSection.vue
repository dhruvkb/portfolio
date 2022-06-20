<!--
Displays a list of my past work experiences and projects in a tabular format.
Uses data from the 'resume' store in Pinia.
-->

<script setup lang="ts">
  import { useProjectTable } from '@/composables/projects_table'
  import { useRoleTable } from '@/composables/roles_table'

  import DataTable from '@/components/DataTable.vue'
  import Link from '@/components/Link.vue'

  const { columns: roleColumns, data: roleData } = useRoleTable()
  const { columns: projectColumns, data: projectData } = useProjectTable()
</script>

<template>
  <section aria-label="Résumé">
    <div class="px-page mb-6">
      <h1 aria-label="What have I done?">
        What have I done?
      </h1>
    </div>

    <!-- TODO: Revisit the idea of both tables being side by side. -->
    <div class="mb-6 grid grid-cols-1 gap-6">
      <DataTable
        title="Experience"
        :columns="roleColumns"
        :rows="roleData" />
      <DataTable
        title="Projects"
        :columns="projectColumns"
        :rows="projectData" />
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
