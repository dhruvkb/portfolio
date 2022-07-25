import type { Project as IProject, Epic as IEpic } from 'reschume'

import { ResumeItem } from '@/models/resume'
import type { Role } from '@/models/role'

import type { Overwrite } from '@/utils/types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Project extends IProject {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Epic extends Overwrite<IEpic, {projects: Project[]}> {}

export class Epic extends ResumeItem {
  role!: Role // populated in `associateRole`

  constructor(epicJson: IEpic) {
    super(epicJson)

    this.summary = epicJson.summary

    this.projects = epicJson.projects.map((projectJson) => new Project(projectJson, this))
  }

  get featuredProjects(): Project[] {
    return Object.values(this.projects).filter((project) => project.isFeatured)
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
  epic: Epic
  urlLabel: string
  isFeatured: boolean

  constructor(projectJson: IProject, epic: Epic) {
    super(projectJson)

    this.url = projectJson.url
    this.urlLabel = typeof projectJson.urlLabel === 'string' ? projectJson.urlLabel : ''
    this.technologies = projectJson.technologies

    this.isFeatured = typeof projectJson.isFeatured === 'boolean' ? projectJson.isFeatured : false
    this.summary = projectJson.summary
    this.highlights = projectJson.highlights

    this.epic = epic
  }
}
