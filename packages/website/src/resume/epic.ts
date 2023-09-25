import type { Epic as RcvEpic } from 'recivi'

import { Project } from '@/resume/project'
import type { Role } from '@/resume/role'
import type { Featured } from '@/resume/featured'

export interface Epic extends Omit<RcvEpic, 'projects'> {}

export class Epic {
  /**
   * the role during which the epic was created or worked on; An epic may not
   * have an associated role.
   */
  role: Role | null

  /**
   * a list of projects that are part of this epic
   */
  projects: Project[]

  constructor(epicJson: RcvEpic, featured: Featured) {
    Object.assign(this, epicJson)
    this.projects =
      epicJson.projects?.map(
        (project) => new Project(this, project, featured)
      ) ?? []
    this.role = null
  }

  /**
   * whether this epic has at least one featured project
   */
  get someFeatured(): boolean {
    return this.projects.some((project) => project.isFeatured)
  }

  /**
   * Link the given role with this epic.
   * @param role - the role to link with this epic
   */
  associateRole(role: Role) {
    this.role = role
  }
}
