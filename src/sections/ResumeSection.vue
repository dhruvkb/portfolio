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
    {
      code: 'org',
      display: 'Org',
      componentName: 'Organisation',
      classes: ['lg:w-[16rem]'] as string[],
    },
    {
      code: 'link',
      display: 'Link',
      componentName: 'Link',
      breakpoint: 'lg',
      classes: ['w-[6rem]'] as string[],
    },
    { code: 'name', display: 'Role' },
    { code: 'type', display: 'Type', breakpoint: 'lg' },
    { code: 'epics', display: 'Epics', breakpoint: 'lg' },
    {
      code: 'period',
      display: 'Period',
      componentName: 'Period',
      classes: ['w-[4rem]', 'md:w-[13rem]'] as string[],
    },
  ] as const
  type RoleData = RowData<typeof experienceColumns[number]['code']>

  const roleData = computed(() => resumeStore.roles.map((role): RoleData => ({
    isLast: role.isLast,
    data: {
      org: { org: role.org },
      name: role.name,
      type: role.type,
      epics: role.epics.map((epic) => epic.name).join(', '),
      period: role.period,
      link: { dest: role.org.url, label: `Homepage for ${role.org.name}`, isPlain: true },
    },
  })))

  const projectsColumns = [
    {
      code: 'org',
      display: 'Org',
      componentName: 'Organisation',
      classes: ['lg:w-[16rem]'] as string[],
    },
    {
      code: 'epic',
      display: 'Epic',
      classes: ['lg:w-[11rem]'] as string[],
    },
    {
      code: 'name',
      display: 'Project',
      classes: ['lg:w-[11rem]'] as string[],
    },
    {
      code: 'link',
      display: 'Link',
      componentName: 'Link',
      breakpoint: 'lg',
      classes: ['w-[6rem]'] as string[],
    },
    { code: 'technologies', display: 'Tech', componentName: 'TechStack' },
  ] as const
  type ProjectData = RowData<typeof projectsColumns[number]['code']>

  const projectData = computed(() => resumeStore.projects.map((project): ProjectData => ({
    isLast: project.isLast,
    data: {
      org: { org: project.epic.role?.org },
      epic: project.epic.name,
      name: project.name,
      technologies: { technologies: project.technologies },
      link: { dest: project.url, label: project.urlLabel, isPlain: true },
    },
  })))
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
        :columns="experienceColumns"
        :rows="roleData" />
      <DataTable
        title="Projects"
        :columns="projectsColumns"
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
