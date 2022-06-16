import { ResumeItemJson, ResumeItem } from '@/models/resume'

export interface Technology {
  name: string
  icon: string
}

/* JSON models */

export interface ProjectJson extends ResumeItemJson {
  url: string
  technologies: Technology[]
}

export interface EpicJson extends ResumeItemJson {
  children: ProjectJson[]
}

/* JS models */

// Use interface/class merging to avoid declaring variables again.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Project extends ProjectJson {}

export interface Epic extends EpicJson {
  projects: Record<string, Project>
}

export class Project extends ResumeItem {
  isLast: boolean
  epic!: Epic

  constructor(projectJson: ProjectJson, epicJson: EpicJson) {
    super(projectJson)

    this.url = projectJson.url
    this.technologies = projectJson.technologies

    const siblings = epicJson.children
    this.isLast = siblings.indexOf(projectJson) === siblings.length - 1
  }

  /**
   * Set the given `Epic` instance as the parent of this project.
   * @param epic - the parent epic to link to the project
   */
  setEpic(epic: Epic) {
    this.epic = epic
  }
}
