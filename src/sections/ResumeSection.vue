<!--
Displays a list of my past work experiences and projects in a tabular format.
Uses data from the 'resume' store in Pinia.
-->

<script setup lang="ts">
  import { useIcon } from '@/composables/icon'
  import { useProjectTable } from '@/composables/projects_table'
  import { useRoleTable } from '@/composables/roles_table'

  import DataTable from '@/components/DataTable.vue'

  const { columns: roleColumns, data: roleData } = useRoleTable()
  const { columns: projectColumns, data: projectData } = useProjectTable()
  const { getIconPaths } = useIcon()

  const handlePrint = () => {
    if (window && window.print) window.print()
  }
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
        title="Roles"
        :columns="roleColumns"
        :rows="roleData" />
      <DataTable
        title="Projects"
        :columns="projectColumns"
        :rows="projectData" />
    </div>

    <div class="px-page">
      <button
        class="group flex flex-row gap-1 text-sm font-semibold uppercase"
        @click="handlePrint">
        Print/Save as PDF
        <Icon
          class="text-base text-red-500 transition-transform duration-100 group-hover:-translate-y-1"
          :paths="getIconPaths('print')" />
      </button>
    </div>
  </section>
</template>
