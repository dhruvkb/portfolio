import { ResumeNode, ResumeNodeJson } from '@/models/resume'

export interface Technology {
  name: string
  icon: string
}

export interface ProjectJson extends ResumeNodeJson {
  url: string
  technologies: Technology[]
}

export class Project extends ResumeNode implements ProjectJson {
  url: string
  technologies: Technology[]

  isLast: boolean

  constructor(project: ProjectJson, isLast = false) {
    super(project)

    this.url = project.url
    this.technologies = project.technologies

    this.isLast = isLast
  }

  /** the names of all technologies involved in the project */
  technologyNames(): string {
    return this.technologies.map((tech) => tech.name).join(', ')
  }

  /** the icon of the main technology used to build the project */
  primaryTechnologyIcon(): string {
    return this.technologies[0].icon
  }
}

export interface Epic extends ResumeNodeJson {
  projects: Record<string, Project>
}
