import { computed } from 'vue'

import { useResume } from '@/composables/resume'
import { RowData } from '@/models/data_table'

export const useProjectTable = () => {
  const resumeStore = useResume()

  const columns = [
    {
      code: 'epic',
      display: 'Epic',
      classes: ['w-[7rem]'] as string[],
    },
    {
      code: 'name',
      display: 'Project',
      classes: ['w-[10rem]'] as string[],
    },
    {
      code: 'org',
      display: 'Org',
      componentName: 'Organisation',
      breakpoint: 'lg', // same as breakpoint of Epic in `rolesColumns`
      classes: ['w-[13rem]'] as string[],
    },
    {
      code: 'link',
      display: 'Link',
      componentName: 'Link',
      breakpoint: 'lg',
      classes: ['w-[5rem]'] as string[],
    },
    {
      // Infinite expansion column
      code: 'technologies',
      display: 'Tech',
      componentName: 'TechStack',
    },
  ] as const
  type ProjectData = RowData<typeof columns[number]['code']>

  const data = computed(() => resumeStore.projects.map((project): ProjectData => ({
    isLast: project.isLast,
    data: {
      org: { org: project.epic.role?.org },
      epic: project.epic.name,
      name: project.name,
      technologies: { technologies: project.technologies },
      link: { dest: project.url, label: project.urlLabel, variant: 'plain' },
    },
  })))

  return {
    columns,
    data,
  }
}
