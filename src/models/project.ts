import type { Project as IProject, Epic as IEpic } from 'reschume'

import { ResumeItem } from '@/models/resume'
import type { Role } from '@/models/role'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Project extends IProject {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Epic extends IEpic {}

export class Epic extends ResumeItem {
  role!: Role
  projects: Record<string, Project>

  constructor(epicJson: IEpic) {
    super(epicJson)

    this.children = epicJson.children
    this.projects = Object.fromEntries(
      this.children.map((projectJson) => {
        const project = new Project(projectJson, this)
        return [project.id, project]
      }),
    )
  }

  /**
   * Associate the given `Role` instance with this epic.
   * @param role - the role to relate with this epic
   */
  associateRole(role: Role) {
    this.role = role
  }
}

export class Project extends ResumeItem {
  isFirst: boolean
  isLast: boolean
  epic: Epic
  urlLabel: string

  constructor(projectJson: IProject, epic: Epic) {
    super(projectJson)

    this.url = projectJson.url
    this.urlLabel = typeof projectJson.urlLabel === 'string' ? projectJson.urlLabel : ''
    this.technologies = projectJson.technologies

    this.epic = epic

    const siblings = epic.children
    this.isFirst = siblings.indexOf(projectJson) === 0
    this.isLast = siblings.indexOf(projectJson) === siblings.length - 1
  }
}
