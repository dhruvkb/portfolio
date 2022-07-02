import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import type { RoleType } from 'reschume'

import type { RowData } from '@/models/data_table'
import { useResume } from '@/stores/resume'

export const useRoleTable = () => {
  const resumeStore = useResume()
  const { roles } = storeToRefs(resumeStore)

  const columns = [
    {
      code: 'org',
      display: 'Org',
      componentName: 'Brand',
      classes: ['w-[9rem]', 'sm:w-[13rem]'] as string[],
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
      code: 'name',
      display: 'Role',
    },
    {
      code: 'epics',
      display: 'Epics',
      breakpoint: 'lg', // same as breakpoint of Org in `projectsColumns`
      classes: ['w-[7rem]'] as string[],
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
      componentName: 'Period',
      classes: ['w-[3rem]', 'md:w-[11rem]'] as string[],
    },
  ] as const
  type RoleData = RowData<typeof columns[number]['code']>

  const roleTypes: Record<RoleType, string> = {
    'foss-contributor': 'FOSS',
    'part-timer': 'Part-timer',
    'full-timer': 'Full-timer',
    intern: 'Intern',
    contractor: 'Contractor',
  }

  const data = computed(() => roles.value.map((role): RoleData => ({
    isLast: role.isLast,
    data: {
      org: role.org,
      name: role.name,
      type: role.type ? roleTypes[role.type] : '',
      epics: role.epics.map((epic) => epic.name).join(', '),
      period: role.period,
      link: { dest: role.org.url, label: `Homepage for ${role.org.name}`, variant: 'plain' },
    },
  })))

  return {
    columns,
    data,
  }
}
