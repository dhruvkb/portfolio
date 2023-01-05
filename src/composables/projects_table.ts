import { computed, ref, type Ref } from 'vue'

import type { RowData } from '@/models/data_table'
import type { Epic } from '@/models/project'

export const useProjectTable = (_epics: Epic[] | Ref<Epic[]>) => {
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

  const data = computed<ProjectData[][]>(() =>
    epics.value.map((epic) =>
      epic.projects.map((project) => ({
        epic: (({ id, name }) => ({ id, name }))(project.epic),
        name: project.name,
        org: project.epic.role?.org
          ? (({ id, name, shortName }) => ({ id, name, shortName }))(
              project.epic.role.org
            )
          : undefined,
        technologies: { technologies: project.technologies ?? [] },
        link: { dest: project.url, label: project.urlLabel, isPlain: true },
      }))
    )
  )

  return {
    columns,
    data,
  }
}
