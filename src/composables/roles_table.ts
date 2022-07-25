import { computed, ref, type Ref } from 'vue'

import type { RowData } from '@/models/data_table'
import { type Org, roleTypes } from '@/models/role'

export const useRoleTable = (_orgs: Org[] | Ref<Org[]>) => {
  const orgs = ref(_orgs)
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

  const data = computed<RoleData[][]>(() => orgs.value
    .map((org) => org.roles
      .map((role) => ({
        org: (({ id, name, shortName }) => ({ id, name, shortName }))(role.org),
        name: role.name,
        type: role.type ? roleTypes[role.type] : '',
        epic: (({ id, name }) => ({ id, name }))(role.epics[0] ?? {}),
        period: role.period,
        link: { dest: role.org.url, label: `Homepage for ${role.org.name}`, variant: 'plain' },
      }))))

  return {
    columns,
    data,
  }
}
