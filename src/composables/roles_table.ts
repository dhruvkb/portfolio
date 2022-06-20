import { computed } from 'vue'

import { RowData } from '@/models/data_table'
import { useResumeStore } from '@/stores/resume'

export const useRoleTable = () => {
  const resumeStore = useResumeStore()

  const columns = [
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
    {
      code: 'name',
      display: 'Role',
    },
    {
      code: 'type',
      display: 'Type',
      breakpoint: 'lg',
    },
    {
      code: 'epics',
      display: 'Epics',
      breakpoint: 'lg', // same as breakpoint of Org in `projectsColumns`
    },
    {
      code: 'period',
      display: 'Period',
      componentName: 'Period',
      classes: ['w-[4rem]', 'md:w-[13rem]'] as string[],
    },
  ] as const
  type RoleData = RowData<typeof columns[number]['code']>

  const data = computed(() => resumeStore.roles.map((role): RoleData => ({
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

  return {
    columns,
    data,
  }
}
