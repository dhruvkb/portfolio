<!--
Displays a list of my past work experiences and projects in a tabular format.
Uses data from the 'resume' store in Pinia.
-->

<script setup lang="ts">
  import { computed } from 'vue'

  import { RowData } from '@/models/data_table'
  import { useResumeStore } from '@/stores/resume'

  import DataTable from '@/components/DataTable.vue'
  import Link from '@/components/Link.vue'

  const resumeStore = useResumeStore()

  const experienceColumns = [
    { code: 'org', display: 'Org', componentName: 'Organisation' },
    { code: 'name', display: 'Role' },
    { code: 'type', display: 'Type' },
    { code: 'epics', display: 'Epics', breakpoint: 'lg' },
    { code: 'period', display: 'Period', componentName: 'Period' },
  ] as const
  type RoleData = RowData<typeof experienceColumns[number]['code']>

  const roleData = computed(() => {
    const data: RoleData[] = []
    const { experience } = resumeStore
    Object.values(experience).forEach((org) => {
      Object.values(org.roles).forEach((role) => {
        data.push({
          isLast: role.isLast,
          data: {
            org: { organisation: org },
            name: role.name,
            type: role.type,
            epics: role.epics.map((epic) => epic.name).join(', '),
            period: role.period,
          },
        })
      })
    })
    return data
  })

  const projectsColumns = [
    { code: 'epic', display: 'Epic' },
    { code: 'name', display: 'Project' },
    { code: 'technologies', display: 'Tech', componentName: 'TechStack' },
  ] as const
  type ProjectData = RowData<typeof projectsColumns[number]['code']>

  const projectData = computed(() => {
    const data: ProjectData[] = []
    const { epics } = resumeStore
    Object.values(epics).forEach((epic) => {
      Object.values(epic.projects).forEach((project) => {
        data.push({
          isLast: project.isLast,
          data: {
            epic: epic.name,
            name: project.name,
            technologies: { technologies: project.technologies },
          },
        })
      })
    })
    return data
  })
</script>

<template>
  <div>
    <div class="px-page mb-6">
      <h1>What have I done?</h1>
    </div>

    <DataTable
      class="mb-6"
      title="Experience"
      :columns="experienceColumns"
      :rows="roleData" />
    <DataTable
      class="mb-6"
      title="Projects"
      :columns="projectsColumns"
      :rows="projectData" />
    <div class="px-page">
      <Link
        dest="https://dhruvkb.github.io/resume/">
        Résumé
      </Link>
    </div>
  </div>
</template>
