import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import type { RowData } from '@/models/data_table'
import { roleTypes } from '@/models/role'
import { useResume } from '@/stores/resume'

export const useRoleTable = () => {
  const resumeStore = useResume()
  const { roles } = storeToRefs(resumeStore)

  const columns = [
    {
      code: 'org',
      display: 'Org',
      classes: ['w-[9rem]', 'sm:w-[13rem]'] as string[],
    },
    {
      code: 'link',
      display: 'Link',
      breakpoint: 'lg',
      classes: ['w-[5rem]'] as string[],
    },
    {
      // Infinite expansion column
      code: 'name',
      display: 'Role',
    },
    {
      code: 'epic',
      display: 'Epic',
      breakpoint: 'lg', // same as breakpoint of Org in `projectsColumns`
      classes: ['w-[13rem]'] as string[],
    },
    {
      code: 'type',
      display: 'Type',
      breakpoint: 'xl',
      classes: ['w-[7rem]'] as string[],
    },
    {
      code: 'period',
      display: 'Period',
      breakpoint: 'sm',
      classes: ['w-[3rem]', 'md:w-[11rem]'] as string[],
    },
  ] as const
  type RoleData = RowData<typeof columns[number]['code']>

  const data = computed(() => roles.value.map((role): RoleData => ({
    isLast: role.isLast,
    data: {
      org: (({ id, name, shortName }) => ({ id, name, shortName }))(role.org),
      name: role.name,
      type: role.type ? roleTypes[role.type] : '',
      epic: (({ id, name }) => ({ id, name }))(role.epics[0] ?? {}),
      period: role.period,
      link: { dest: role.org.url, label: `Homepage for ${role.org.name}`, variant: 'plain' },
    },
  })))

  return {
    columns,
    data,
  }
}
