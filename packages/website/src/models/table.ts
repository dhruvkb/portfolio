import type { Period, Tech, Url } from 'recivi'

import type { Epic, Org, Institute } from '@/models/recivi'
import { roleTypeDisplay } from '@/utils/recivi'
import { certs, projects, roles } from '@/stores/recivi'

export type ColumnName =
  | 'epic'
  | 'link'
  | 'name'
  | 'org'
  | 'period'
  | 'tech'
  | 'type'
  | 'field'
  | 'institute'

export interface ColumnSpec {
  name: ColumnName
  isExpanding?: boolean
  classNames?: string[]
}

export const certColumns: ColumnSpec[] = [
  { name: 'institute' },
  { name: 'link' },
  { name: 'name', isExpanding: true },
  { name: 'field' },
  { name: 'period' },
]

export const roleColumns: ColumnSpec[] = [
  { name: 'org' },
  { name: 'link' },
  { name: 'name', isExpanding: true },
  { name: 'epic', classNames: ['hidden', 'md:table-cell'] },
  { name: 'period' },
]

export const projectColumns: ColumnSpec[] = [
  { name: 'epic' },
  { name: 'name' },
  { name: 'link' },
  { name: 'org', classNames: ['hidden', 'md:table-cell'] },
  { name: 'tech', isExpanding: true },
]

export interface Data {
  epic?: Epic | undefined
  institute?: Institute
  org?: Org | undefined
  link: Url | undefined
  name: string
  field?: string
  type?: string | undefined
  period?: Period | undefined
  tech?: Tech[] | undefined
}

export interface Row {
  data: Data
  isLastSibling: boolean
}

export const certData = certs.map(
  (cert, idx): Row => ({
    data: {
      name: cert.name,
      institute: cert.institute,
      link: cert.institute.url,
      field: cert.field,
      period: cert.period,
    },
    isLastSibling: cert.institute !== certs[idx + 1]?.institute,
  })
)

export const projectData = projects.map(
  (project, idx): Row => ({
    data: {
      name: project.name,
      epic: project.epic,
      org: project.epic.role?.org,
      link: project.url,
      tech: project.technologies,
    },
    isLastSibling: project.epic !== projects[idx + 1]?.epic,
  })
)

export const roleData = roles.map(
  (role, idx): Row => ({
    data: {
      name: role.name,
      org: role.org,
      link: role.org.url,
      epic: role.epics[0],
      type: roleTypeDisplay(role.type),
      period: role.period,
    },
    isLastSibling: role.org !== roles[idx + 1]?.org,
  })
)
