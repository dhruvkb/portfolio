import type { CollectionEntry } from 'astro:content'

import type { Period, Tech, Url, Date as RcvDate } from '@recivi/schema'

import type { Epic, Org, Institute } from '@/models/recivi'
import { roleTypeDisplay, certDisplay } from '@/utils/recivi'
import { certs, projects, roles } from '@/stores/recivi'

interface PostData {
  published: Date
  post: CollectionEntry<'posts'>
}

interface CertData {
  institute: Institute
  link: Url | undefined
  name: string
  issued: RcvDate
}

interface RoleData {
  org: Org
  name: string
  epic: Epic | undefined
  period: Period | undefined
  type: string | undefined
}

interface ProjectData {
  epic: Epic
  name: string
  link: Url | undefined
  org: Org | undefined
  tech: Tech[]
}

export type Data = PostData | CertData | RoleData | ProjectData

export type Row = {
  isLastSibling: boolean
  url?: string
  groupId: string | number | undefined
} & (
  | { type: 'post'; data: PostData }
  | { type: 'cert'; data: CertData }
  | { type: 'role'; data: RoleData }
  | { type: 'project'; data: ProjectData }
)

export type ColumnSpec = {
  name?: string
  isExpanding?: boolean
} & (
  | { type: 'post'; id: keyof PostData }
  | { type: 'cert'; id: keyof CertData }
  | { type: 'role'; id: keyof RoleData }
  | { type: 'project'; id: keyof ProjectData }
)

export const postColumns: ColumnSpec[] = [
  { type: 'post', id: 'published' },
  { type: 'post', id: 'post', name: 'post & tags', isExpanding: true },
]

export const certColumns: ColumnSpec[] = [
  { type: 'cert', id: 'institute' },
  { type: 'cert', id: 'link' },
  { type: 'cert', id: 'name', isExpanding: true },
  { type: 'cert', id: 'issued' },
]

export const roleColumns: ColumnSpec[] = [
  { type: 'role', id: 'org' },
  { type: 'role', id: 'name', isExpanding: true },
  { type: 'role', id: 'epic' },
  { type: 'role', id: 'period' },
]

export const projectColumns: ColumnSpec[] = [
  { type: 'project', id: 'epic' },
  { type: 'project', id: 'name' },
  { type: 'project', id: 'link' },
  { type: 'project', id: 'org' },
  { type: 'project', id: 'tech', isExpanding: true },
]

/**
 * Get the data for the posts table in a format that can be used by the `Table`
 * component.
 *
 * @param posts - the posts to include in the table
 * @returns the data for the posts table
 */
export function getPostsData(posts: CollectionEntry<'posts'>[]) {
  return posts.map((post, idx): Row => {
    const year = post.data.pubDate.getFullYear()
    return {
      type: 'post',
      data: {
        published: post.data.pubDate,
        post,
      },
      isLastSibling: year !== posts[idx + 1]?.data.pubDate.getFullYear(),
      groupId: year,
      url: `/writings/posts/${post.id.substring(5)}`,
    }
  })
}

export const certData = certs.map(
  (cert, idx): Row => ({
    type: 'cert',
    data: {
      name: certDisplay(cert),
      institute: cert.institute,
      link: cert.institute.url,
      issued: cert.issue,
    },
    isLastSibling: cert.institute !== certs[idx + 1]?.institute,
    groupId: cert.institute.id,
  })
)

export const projectData = projects.map(
  (project, idx): Row => ({
    type: 'project',
    data: {
      name: project.name,
      epic: project.epic,
      org: project.epic.role?.org,
      link: project.url,
      tech: project.technologies ?? [],
    },
    isLastSibling: project.epic !== projects[idx + 1]?.epic,
    groupId: project.epic.id,
    url: `/resume/epics/${project.epic.id}/`,
  })
)

export const roleData = roles.map(
  (role, idx): Row => ({
    type: 'role',
    data: {
      name: role.name,
      org: role.org,
      epic: role.epics[0],
      type: role.type && roleTypeDisplay(role.type),
      period: role.period,
    },
    isLastSibling: role.org !== roles[idx + 1]?.org,
    groupId: role.org.id,
    url: `/resume/orgs/${role.org.id}/`,
  })
)
