import { type ResumeItemJson, ResumeItem } from '@/models/resume'
import type { Role } from '@/models/role'

export interface Technology {
  name: string
  icon: string
}

/* JSON models */

export interface ProjectJson extends ResumeItemJson {
  url: string
  urlLabel: string
  technologies: Technology[]
}

export interface EpicJson extends ResumeItemJson {
  children: ProjectJson[]
}

/* JS models: Use interface/class merging to avoid declaring variables again. */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Project extends ProjectJson {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Epic extends EpicJson {}

export class Epic extends ResumeItem {
  role!: Role
  projects: Record<string, Project>

  constructor(epicJson: EpicJson) {
    super(epicJson)

    this.children = epicJson.children
    this.projects = Object.fromEntries(
      this.children.map((projectJson) => {
        const project = new Project(projectJson, this)
        return [project.slug, project]
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

  constructor(projectJson: ProjectJson, epic: Epic) {
    super(projectJson)

    this.url = projectJson.url
    this.urlLabel = projectJson.urlLabel
    this.technologies = projectJson.technologies

    this.epic = epic

    const siblings = epic.children
    this.isFirst = siblings.indexOf(projectJson) === 0
    this.isLast = siblings.indexOf(projectJson) === siblings.length - 1
  }
}
