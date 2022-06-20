import { computed } from 'vue'

import { RowData } from '@/models/data_table'
import { useResumeStore } from '@/stores/resume'

export const useProjectTable = () => {
  const resumeStore = useResumeStore()

  const columns = [
    {
      code: 'org',
      display: 'Org',
      componentName: 'Organisation',
      breakpoint: 'lg', // same as breakpoint of Epic in `rolesColumns`
      classes: ['w-[16rem]'] as string[],
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
    {
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
      link: { dest: project.url, label: project.urlLabel, isPlain: true },
    },
  })))

  return {
    columns,
    data,
  }
}
