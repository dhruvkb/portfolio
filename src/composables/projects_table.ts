import { computed, ref, type Ref } from 'vue'

import type { RowData } from '@/models/data_table'
import type { Epic } from '@/models/project'

export const useProjectTable = (_epics: Record<string, Epic> | Ref<Record<string, Epic>>) => {
  const epics = ref(_epics)
  const columns = [
    {
      code: 'epic',
      display: 'Epic',
      classes: ['w-[9rem]', 'sm:w-[13rem]'] as string[],
    },
    {
      code: 'name',
      display: 'Project',
      classes: ['w-[10rem]'] as string[],
    },
    {
      code: 'org',
      display: 'Org',
      breakpoint: 'lg', // same as breakpoint of Epic in `rolesColumns`
      classes: ['w-[13rem]'] as string[],
    },
    {
      code: 'link',
      display: 'Link',
      breakpoint: 'lg',
      classes: ['w-[5rem]'] as string[],
    },
    {
      // Infinite expansion column
      code: 'technologies',
      display: 'Tech',
    },
  ] as const
  type ProjectData = RowData<typeof columns[number]['code']>

  const data = computed<ProjectData[][]>(() => Object.values(epics.value)
    .map((epic) => Object.values(epic.projects)
      .map((project) => ({
        epic: (({ id, name }) => ({ id, name }))(project.epic),
        name: project.name,
        org: (({ id, name, shortName }) => ({ id, name, shortName }))(project.epic.role?.org ?? {}),
        technologies: { technologies: project.technologies ?? [] },
        link: { dest: project.url, label: project.urlLabel, variant: 'plain' },
      }))))

  return {
    columns,
    data,
  }
}
